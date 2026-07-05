import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, ShieldCheck, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTACT } from "@/config/contact";

type Step = "credentials" | "otp";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [useRecovery, setUseRecovery] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState<string | null>(null); // wa.me link

  const logAttempt = async (status: string) => {
    try {
      await supabase.from("login_history").insert({
        email,
        status,
        user_agent: navigator.userAgent,
        browser: navigator.userAgent.split(") ").pop() ?? "unknown",
      });
    } catch { /* ignore */ }
  };

  const submitCreds = async () => {
    const parsed = z.object({
      email: z.string().trim().email().max(255),
      password: z.string().min(6).max(72),
    }).safeParse({ email, password });
    if (!parsed.success) return toast.error("Invalid credentials format");

    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
    if (error || !data.user) {
      await logAttempt("failed_password");
      setLoading(false);
      return toast.error("Invalid email or password");
    }

    // Verify user has admin+ role
    const { data: roleRows } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id);
    const allowed = (roleRows ?? []).some((r) =>
      ["super_admin", "admin", "manager", "sales_executive", "customer_support"].includes(r.role),
    );
    if (!allowed) {
      await supabase.auth.signOut();
      await logAttempt("failed_not_admin");
      setLoading(false);
      return toast.error("This account has no admin access");
    }

    // Request OTP
    const { data: otpRes, error: otpErr } = await supabase.functions.invoke("admin-otp", {
      body: { action: "request" },
    });
    setLoading(false);
    if (otpErr || !otpRes?.ok) {
      await logAttempt("otp_request_failed");
      return toast.error("Could not generate OTP");
    }
    setOtpSent(otpRes.whatsappUrl);
    setStep("otp");
    toast.success("OTP generated — deliver via WhatsApp to authorised number");
  };

  const submitOtp = async () => {
    setLoading(true);
    const body = useRecovery
      ? { action: "verify_recovery", code: recoveryCode.trim() }
      : { action: "verify", code: otp.trim() };
    const { data, error } = await supabase.functions.invoke("admin-otp", { body });
    setLoading(false);
    if (error || !data?.ok) {
      await logAttempt(useRecovery ? "failed_recovery" : "failed_otp");
      return toast.error(data?.error ?? "Verification failed");
    }
    await logAttempt("success");
    toast.success("Verified — welcome");
    navigate("/admin");
  };

  return (
    <Layout>
      <div className="container-full max-w-md py-16">
        <div className="text-center mb-8">
          <ShieldCheck className="w-10 h-10 mx-auto text-primary mb-3" />
          <h1 className="font-serif text-3xl">Admin panel</h1>
          <p className="text-xs tracking-widest uppercase text-muted-foreground mt-2">
            Restricted access · Two-factor required
          </p>
        </div>

        {step === "credentials" && (
          <div className="space-y-3">
            <Input placeholder="Admin email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-sm" />
            <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="h-11 rounded-sm" />
            <Button onClick={submitCreds} disabled={loading} className="w-full h-11 rounded-sm">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Continue"}
            </Button>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            {otpSent && !useRecovery && (
              <a
                href={otpSent}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-primary text-primary rounded-sm py-3 hover:bg-primary/5 transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Deliver OTP via WhatsApp to {CONTACT.phone}
              </a>
            )}

            {!useRecovery ? (
              <>
                <Input
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="h-11 rounded-sm text-center text-lg tracking-[0.4em]"
                  inputMode="numeric"
                />
                <Button onClick={submitOtp} disabled={loading || otp.length !== 6} className="w-full h-11 rounded-sm">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify & enter panel"}
                </Button>
                <button
                  onClick={() => setUseRecovery(true)}
                  className="w-full text-xs text-muted-foreground hover:text-primary underline text-center"
                >
                  Use a recovery code instead
                </button>
              </>
            ) : (
              <>
                <Input
                  placeholder="Recovery code"
                  value={recoveryCode}
                  onChange={(e) => setRecoveryCode(e.target.value)}
                  className="h-11 rounded-sm text-center tracking-widest"
                />
                <Button onClick={submitOtp} disabled={loading || !recoveryCode} className="w-full h-11 rounded-sm">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify with recovery code"}
                </Button>
                <button
                  onClick={() => setUseRecovery(false)}
                  className="w-full text-xs text-muted-foreground hover:text-primary underline text-center"
                >
                  Back to OTP
                </button>
              </>
            )}

            <p className="text-[11px] text-center text-muted-foreground">
              OTP expires in 5 minutes. Only the phone {CONTACT.phone} is authorised.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminLogin;
