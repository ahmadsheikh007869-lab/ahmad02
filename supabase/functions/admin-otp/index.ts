import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const AUTHORIZED_WHATSAPP = "916394249533";
const OTP_TTL_MINUTES = 5;
const MAX_OTP_ATTEMPTS = 5;

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function randomCode(len = 6): string {
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  return Array.from(bytes).map((b) => (b % 10).toString()).join("");
}

function randomRecovery(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}`.toUpperCase();
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsErr } = await supabase.auth.getClaims(token);
    if (claimsErr || !claimsData?.claims?.sub) {
      return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = claimsData.claims.sub as string;

    // Verify user is admin+
    const { data: roleRows } = await admin
      .from("user_roles").select("role").eq("user_id", userId);
    const isAdmin = (roleRows ?? []).some((r) =>
      ["super_admin","admin","manager","sales_executive","customer_support"].includes(r.role),
    );
    const isSuper = (roleRows ?? []).some((r) => r.role === "super_admin");
    if (!isAdmin) {
      return new Response(JSON.stringify({ ok: false, error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const action = body?.action as string;

    if (action === "request") {
      const code = randomCode(6);
      const codeHash = await sha256(code);
      const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60_000).toISOString();

      // Invalidate previous OTPs
      await admin.from("admin_otps")
        .update({ consumed_at: new Date().toISOString() })
        .eq("user_id", userId).is("consumed_at", null);

      await admin.from("admin_otps").insert({
        user_id: userId,
        code_hash: codeHash,
        expires_at: expiresAt,
      });

      const msg = encodeURIComponent(
        `Nordhaven — Admin OTP: ${code}\nValid for ${OTP_TTL_MINUTES} minutes.\nDo not share.`,
      );
      const whatsappUrl = `https://wa.me/${AUTHORIZED_WHATSAPP}?text=${msg}`;

      return new Response(JSON.stringify({ ok: true, whatsappUrl, ttlMinutes: OTP_TTL_MINUTES }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "verify") {
      const code = String(body?.code ?? "");
      if (!/^\d{6}$/.test(code)) {
        return new Response(JSON.stringify({ ok: false, error: "Invalid code format" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const codeHash = await sha256(code);
      const { data: rows } = await admin.from("admin_otps")
        .select("*").eq("user_id", userId).is("consumed_at", null)
        .order("created_at", { ascending: false }).limit(1);
      const otp = rows?.[0];
      if (!otp) return new Response(JSON.stringify({ ok: false, error: "No pending OTP" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
      if (new Date(otp.expires_at).getTime() < Date.now()) {
        return new Response(JSON.stringify({ ok: false, error: "OTP expired" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (otp.attempts >= MAX_OTP_ATTEMPTS) {
        return new Response(JSON.stringify({ ok: false, error: "Too many attempts" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (otp.code_hash !== codeHash) {
        await admin.from("admin_otps").update({ attempts: otp.attempts + 1 }).eq("id", otp.id);
        return new Response(JSON.stringify({ ok: false, error: "Incorrect OTP" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      await admin.from("admin_otps").update({ consumed_at: new Date().toISOString() }).eq("id", otp.id);
      await admin.from("audit_logs").insert({
        actor_id: userId, actor_email: claimsData.claims.email as string, action: "admin_otp_verified",
      });
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "verify_recovery") {
      const code = String(body?.code ?? "").trim().toUpperCase();
      if (!code) return new Response(JSON.stringify({ ok: false, error: "Missing code" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
      const codeHash = await sha256(code);
      const { data: rows } = await admin.from("recovery_codes")
        .select("*").eq("user_id", userId).is("used_at", null);
      const match = (rows ?? []).find((r) => r.code_hash === codeHash);
      if (!match) return new Response(JSON.stringify({ ok: false, error: "Invalid recovery code" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
      await admin.from("recovery_codes").update({ used_at: new Date().toISOString() }).eq("id", match.id);
      await admin.from("audit_logs").insert({
        actor_id: userId, actor_email: claimsData.claims.email as string, action: "recovery_code_used",
      });
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "generate_recovery_codes") {
      if (!isSuper) return new Response(JSON.stringify({ ok: false, error: "Super Admin only" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
      const codes = Array.from({ length: 10 }, () => randomRecovery());
      // Replace existing unused codes
      await admin.from("recovery_codes").delete().eq("user_id", userId).is("used_at", null);
      const rows = await Promise.all(codes.map(async (c) => ({
        user_id: userId, code_hash: await sha256(c),
      })));
      await admin.from("recovery_codes").insert(rows);
      await admin.from("audit_logs").insert({
        actor_id: userId, actor_email: claimsData.claims.email as string, action: "recovery_codes_generated",
      });
      return new Response(JSON.stringify({ ok: true, codes }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: false, error: "Unknown action" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("admin-otp error", e);
    return new Response(JSON.stringify({ ok: false, error: "Server error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
