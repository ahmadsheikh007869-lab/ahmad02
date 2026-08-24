import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { ShieldCheck, KeyRound, Loader2, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";

interface Booking {
  id: string;
  customer_name: string;
  customer_phone: string;
  product_name: string;
  product_price: number;
  status: string;
  booking_date: string;
  created_at: string;
}

interface LoginRow {
  id: string;
  email: string | null;
  status: string;
  ip_address: string | null;
  browser: string | null;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, roles, loading, isAdminOrHigher, isSuperAdmin } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [logins, setLogins] = useState<LoginRow[]>([]);
  const [recoveryCodes, setRecoveryCodes] = useState<string[] | null>(null);
  const [genLoading, setGenLoading] = useState(false);
  // Server-verified two-factor session state: null = still checking.
  const [twoFactorOk, setTwoFactorOk] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/admin/login", { replace: true });
    if (!isAdminOrHigher) return navigate("/", { replace: true });
    let active = true;
    supabase.functions.invoke("admin-otp", { body: { action: "status" } }).then(({ data }) => {
      if (!active) return;
      const verified = Boolean(data?.verified);
      setTwoFactorOk(verified);
      if (!verified) navigate("/admin/login", { replace: true });
    });
    return () => { active = false; };
  }, [loading, user, isAdminOrHigher, navigate]);

  useEffect(() => {
    if (!isAdminOrHigher || twoFactorOk !== true) return;
    supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(100)
      .then(({ data }) => setBookings((data as Booking[]) ?? []));
    supabase.from("login_history").select("*").order("created_at", { ascending: false }).limit(20)
      .then(({ data }) => setLogins((data as LoginRow[]) ?? []));
  }, [isAdminOrHigher, twoFactorOk]);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("bookings").update({ status: status as "pending" | "confirmed" | "in_progress" | "completed" | "cancelled" }).eq("id", id);
    if (error) return toast.error(error.message);
    setBookings((b) => b.map((x) => x.id === id ? { ...x, status } : x));
    toast.success("Updated");
  };

  const genRecovery = async () => {
    setGenLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-otp", {
      body: { action: "generate_recovery_codes" },
    });
    setGenLoading(false);
    if (error || !data?.ok) return toast.error("Could not generate");
    setRecoveryCodes(data.codes);
    toast.success("Save these codes — they won't be shown again");
  };

  const signOut = async () => {
    await supabase.functions.invoke("admin-otp", { body: { action: "sign_out" } }).catch(() => undefined);
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading || !user || !isAdminOrHigher || twoFactorOk !== true) return null;

  return (
    <Layout>
      <div className="container-full py-10 space-y-10">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h1 className="font-serif text-3xl">Admin panel</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {user.email} · <span className="uppercase tracking-widest text-[10px]">{roles.join(", ")}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline"><Link to="/account">My account</Link></Button>
            <Button variant="outline" onClick={signOut}><LogOut className="w-4 h-4 mr-2" />Sign out</Button>
          </div>
        </div>

        {isSuperAdmin && (
          <section className="border border-border rounded-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-primary" />
                <h2 className="font-serif text-lg">Recovery codes</h2>
              </div>
              <Button size="sm" variant="outline" onClick={genRecovery} disabled={genLoading}>
                {genLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate 10 codes"}
              </Button>
            </div>
            {recoveryCodes ? (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {recoveryCodes.map((c) => (
                  <code key={c} className="bg-linen text-sm px-3 py-2 rounded-sm text-center tracking-wider">{c}</code>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Generate one-time codes for emergency access when OTP is unavailable. Existing codes will be replaced.
              </p>
            )}
          </section>
        )}

        <section>
          <h2 className="font-serif text-xl mb-4">Bookings ({bookings.length})</h2>
          {bookings.length === 0 ? (
            <p className="text-sm text-muted-foreground">No bookings yet.</p>
          ) : (
            <div className="overflow-x-auto border border-border rounded-sm">
              <table className="w-full text-sm">
                <thead className="bg-linen text-xs uppercase tracking-widest">
                  <tr>
                    <th className="text-left p-3">Customer</th>
                    <th className="text-left p-3">Product</th>
                    <th className="text-right p-3">Price</th>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id} className="border-t border-border">
                      <td className="p-3">
                        <div className="font-medium">{b.customer_name}</div>
                        <div className="text-xs text-muted-foreground">{b.customer_phone}</div>
                      </td>
                      <td className="p-3">{b.product_name}</td>
                      <td className="p-3 text-right">{formatPrice(b.product_price)}</td>
                      <td className="p-3 text-xs">{new Date(b.created_at).toLocaleString()}</td>
                      <td className="p-3">
                        <select
                          value={b.status}
                          onChange={(e) => updateStatus(b.id, e.target.value)}
                          className="text-xs border border-border rounded-sm px-2 py-1 bg-background"
                        >
                          {["pending","confirmed","in_progress","completed","cancelled"].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {isSuperAdmin && (
          <section>
            <h2 className="font-serif text-xl mb-4">Recent login activity</h2>
            <div className="overflow-x-auto border border-border rounded-sm">
              <table className="w-full text-sm">
                <thead className="bg-linen text-xs uppercase tracking-widest">
                  <tr>
                    <th className="text-left p-3">When</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Browser</th>
                  </tr>
                </thead>
                <tbody>
                  {logins.map((l) => (
                    <tr key={l.id} className="border-t border-border">
                      <td className="p-3 text-xs">{new Date(l.created_at).toLocaleString()}</td>
                      <td className="p-3">{l.email}</td>
                      <td className="p-3">
                        <span className={l.status === "success" ? "text-green-700" : "text-destructive"}>{l.status}</span>
                      </td>
                      <td className="p-3 text-xs truncate max-w-xs">{l.browser}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
