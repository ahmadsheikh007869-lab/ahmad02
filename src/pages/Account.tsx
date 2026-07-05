import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";

interface Booking {
  id: string;
  product_name: string;
  product_price: number;
  status: string;
  booking_date: string;
  customer_phone: string;
}

const Account = () => {
  const navigate = useNavigate();
  const { user, loading, isAdminOrHigher } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("bookings")
      .select("id, product_name, product_price, status, booking_date, customer_phone")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setBookings((data as Booking[]) ?? []));
  }, [user]);

  const signOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate("/");
  };

  if (loading || !user) return null;

  return (
    <Layout>
      <div className="container-full max-w-4xl py-12">
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="font-serif text-3xl">My account</h1>
            <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
          </div>
          <div className="flex gap-2">
            {isAdminOrHigher && (
              <Button asChild variant="outline"><Link to="/admin">Admin panel</Link></Button>
            )}
            <Button variant="outline" onClick={signOut}>Sign out</Button>
          </div>
        </div>

        <h2 className="font-serif text-xl mb-4">Your bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-sm text-muted-foreground">No bookings yet. <Link to="/products" className="underline">Browse products →</Link></p>
        ) : (
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b.id} className="border border-border rounded-sm p-4 flex justify-between items-center flex-wrap gap-3">
                <div>
                  <p className="font-medium">{b.product_name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(b.booking_date).toLocaleDateString()} · {b.customer_phone}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(b.product_price)}</p>
                  <span className="text-[10px] tracking-widest uppercase text-muted-foreground">{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Account;
