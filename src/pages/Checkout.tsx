import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/data/products";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, getSubtotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", postalCode: "", country: "India", notes: "",
  });

  const subtotal = getSubtotal();
  const shipping = subtotal > 15000 ? 0 : 499;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-narrow py-28 text-center">
          <h1 className="font-serif text-4xl mb-4">No Items to Checkout</h1>
          <p className="text-muted-foreground mb-8">Your cart is empty.</p>
          <Button asChild size="lg" className="rounded-sm px-10 py-6 text-sm tracking-[0.2em] uppercase btn-premium">
            <Link to="/products">Start Shopping <ArrowRight className="ml-3 w-4 h-4" /></Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast({
      title: "Order request submitted",
      description: "Our team will call you shortly to confirm and process payment.",
    });
    clearCart();
    setIsSubmitting(false);
    navigate("/");
  };

  return (
    <Layout>
      <div className="container-full py-6 border-b border-border">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link to="/cart" className="hover:text-foreground">Your Cart</Link>
          <span>/</span>
          <span className="text-foreground">Checkout</span>
        </div>
      </div>

      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container-full py-4 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 text-primary shrink-0" />
          <p>
            <span className="font-medium">Online payments coming soon.</span>{" "}
            <span className="text-muted-foreground">
              Submit your details below — we'll call to confirm and process payment via UPI, card, EMI or bank transfer.
            </span>
          </p>
        </div>
      </div>

      <section className="py-10 md:py-16">
        <div className="container-full">
          <h1 className="font-serif text-4xl md:text-5xl mb-10">Checkout</h1>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-8"
            >
              <div>
                <h2 className="font-serif text-xl mb-5">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="First name" className="rounded-sm h-12" />
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Last name" className="rounded-sm h-12" />
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="rounded-sm h-12" />
                  <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} required placeholder="Phone" className="rounded-sm h-12" />
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl mb-5">Shipping Address</h2>
                <div className="space-y-4">
                  <Input name="address" value={formData.address} onChange={handleChange} required placeholder="Street address" className="rounded-sm h-12" />
                  <div className="grid sm:grid-cols-3 gap-4">
                    <Input name="city" value={formData.city} onChange={handleChange} required placeholder="City" className="rounded-sm h-12" />
                    <Input name="postalCode" value={formData.postalCode} onChange={handleChange} required placeholder="Pincode" className="rounded-sm h-12" />
                    <Input name="country" value={formData.country} onChange={handleChange} required placeholder="Country" className="rounded-sm h-12" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl mb-5">Order Notes</h2>
                <Textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Preferred delivery time, assembly notes, etc."
                  className="rounded-sm min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full rounded-sm py-6 text-sm tracking-[0.2em] uppercase btn-premium"
              >
                {isSubmitting ? "Submitting…" : (<>Submit Order Request <ArrowRight className="ml-3 w-4 h-4" /></>)}
              </Button>
            </motion.form>

            <div className="lg:col-span-5">
              <div className="bg-linen p-8 rounded-sm lg:sticky lg:top-32">
                <h2 className="font-serif text-2xl mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-14 h-16 bg-muted/30 overflow-hidden rounded-sm">
                        <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.quantity}</p>
                        <p className="text-sm mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3 mb-4 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
                </div>

                <div className="border-t border-border pt-4 flex justify-between font-serif text-xl">
                  <span>Total</span><span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
