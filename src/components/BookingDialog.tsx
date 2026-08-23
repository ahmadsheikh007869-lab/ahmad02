import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product, formatPrice } from "@/data/products";
import { CONTACT } from "@/config/contact";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
});

interface Props {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
}

interface Booking {
  bookingId: string;
  name: string;
  phone: string;
  productId: string;
  productName: string;
  productCode: string;
  price: number;
  ts: string;
}

const persistBooking = (b: Booking) => {
  try {
    const raw = localStorage.getItem("rf.bookings");
    const list: Booking[] = raw ? JSON.parse(raw) : [];
    list.unshift(b);
    localStorage.setItem("rf.bookings", JSON.stringify(list.slice(0, 50)));
  } catch {
    /* ignore */
  }
};

const buildWaMessage = (b: Booking) =>
  `Hello Nordhaven,%0A%0AI have submitted my booking.%0A%0A` +
  `*Customer Name:* ${encodeURIComponent(b.name)}%0A` +
  `*Product:* ${encodeURIComponent(b.productName)} (${encodeURIComponent(b.productCode)})%0A` +
  `*Price:* ${encodeURIComponent(formatPrice(b.price))}%0A` +
  `*Phone:* ${encodeURIComponent(b.phone)}%0A` +
  `*Booking ID:* ${encodeURIComponent(b.bookingId)}%0A%0A` +
  `Please contact me regarding my furniture order.`;

export const BookingDialog = ({ product, open, onOpenChange, title = "Book this piece" }: Props) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ name, phone });
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({ name: flat.name?.[0], phone: flat.phone?.[0] });
      return;
    }
    setErrors({});
    setSubmitting(true);

    const booking: Booking = {
      bookingId: (crypto?.randomUUID?.() ?? `RF-${Date.now()}`).slice(0, 18).toUpperCase(),
      name: parsed.data.name,
      phone: parsed.data.phone,
      productId: product.id,
      productName: product.name,
      productCode: product.productCode,
      price: product.price,
      ts: new Date().toISOString(),
    };
    persistBooking(booking);

    // Persist to backend (best-effort; localStorage is source of truth for guest UX)
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      await supabase.from("bookings").insert({
        user_id: sessionData.session?.user.id ?? null,
        customer_name: booking.name,
        customer_phone: booking.phone,
        product_id: booking.productId,
        product_name: booking.productName,
        product_price: booking.price,
      });
    } catch {
      /* non-blocking */
    }

    toast.success("Booking confirmed", {
      description: "Redirecting you to WhatsApp to complete your order…",
    });

    window.setTimeout(() => {
      window.location.href = `https://wa.me/${CONTACT.whatsapp}?text=${buildWaMessage(booking)}`;
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!submitting) onOpenChange(v); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">{title}</DialogTitle>
          <DialogDescription>
            Enter your details — we'll confirm on WhatsApp within minutes.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-sm border border-border bg-linen p-3 flex gap-3 items-center">
          <img src={product.images[0]} alt="" className="w-14 h-14 object-cover rounded-sm" />
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">{product.productCode}</p>
            <p className="text-sm font-medium truncate">{product.name}</p>
            <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 pt-1" noValidate>
          <div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              autoComplete="name"
              className="rounded-sm h-11"
              aria-invalid={!!errors.name}
              disabled={submitting}
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>
          <div>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              placeholder="Mobile number (10 digits)"
              autoComplete="tel"
              inputMode="tel"
              className="rounded-sm h-11"
              aria-invalid={!!errors.phone}
              disabled={submitting}
            />
            {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
          </div>
          <Button type="submit" size="lg" className="w-full rounded-sm py-6" disabled={submitting}>
            {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending…</> : "Confirm booking on WhatsApp"}
          </Button>
          <p className="text-[11px] text-muted-foreground text-center pt-1">
            By continuing you agree to be contacted about this order.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
