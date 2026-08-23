import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, Loader2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import { CONTACT, whatsappUrl } from "@/config/contact";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5074347573604!2d77.6033!3d12.9752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzMwLjciTiA3N8KwMzYnMTEuOSJF!5e0!3m2!1sen!2sin!4v1700000000000";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  email: z.string().trim().email("Enter a valid email").max(120).or(z.literal("")),
  subject: z.string().trim().min(3, "Add a short subject").max(120),
  message: z.string().trim().min(10, "Message is a little short").max(1000),
});

const ContactNumberButton = () => (
  <Popover>
    <PopoverTrigger asChild>
      <button className="inline-flex items-center gap-2 text-primary hover:underline font-medium">
        <Phone className="w-4 h-4" /> {CONTACT.phone}
      </button>
    </PopoverTrigger>
    <PopoverContent className="w-56 p-2" align="start">
      <a href={`tel:${CONTACT.phoneTel}`} className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-accent">
        <Phone className="w-4 h-4 text-primary" />
        <div><p className="text-sm font-medium">Call now</p><p className="text-xs text-muted-foreground">{CONTACT.phone}</p></div>
      </a>
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-accent">
        <MessageCircle className="w-4 h-4 text-[#25D366]" />
        <div><p className="text-sm font-medium">WhatsApp</p><p className="text-xs text-muted-foreground">Chat instantly</p></div>
      </a>
    </PopoverContent>
  </Popover>
);

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(flat).map(([k, v]) => [k, v?.[0]])) as typeof errors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    const msg =
      `Hello Nordhaven,%0A%0A` +
      `*Name:* ${encodeURIComponent(parsed.data.name)}%0A` +
      `*Phone:* ${encodeURIComponent(parsed.data.phone)}%0A` +
      (parsed.data.email ? `*Email:* ${encodeURIComponent(parsed.data.email)}%0A` : "") +
      `*Subject:* ${encodeURIComponent(parsed.data.subject)}%0A%0A` +
      `${encodeURIComponent(parsed.data.message)}`;
    toast.success("Message ready", { description: "Opening WhatsApp to send your enquiry…" });
    window.setTimeout(() => {
      window.location.href = `https://wa.me/${CONTACT.whatsapp}?text=${msg}`;
    }, 600);
  };

  return (
    <Layout>
      <section className="bg-linen">
        <div className="container-full py-16 md:py-24 text-center max-w-3xl mx-auto">
          <p className="text-[11px] tracking-[0.35em] uppercase text-primary mb-4">Get in touch</p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-4">We'd love to hear from you</h1>
          <p className="text-muted-foreground text-lg">
            Questions about a piece, a bulk order, or your dream interior — our team responds within an hour during business hours.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-full grid lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h2 className="font-serif text-2xl mb-4">Nordhaven Studio</h2>
              <p className="text-muted-foreground leading-relaxed">
                Visit our flagship showroom for a hands-on experience of every finish, fabric and material. Walk-ins welcome.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-full bg-primary/10 text-primary shrink-0">
                  <Phone className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Phone</p>
                  <ContactNumberButton />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-full bg-[#25D366]/15 text-[#25D366] shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">WhatsApp</p>
                  <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                    {CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-full bg-primary/10 text-primary shrink-0">
                  <Mail className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</p>
                  <a href={`mailto:${CONTACT.email}`} className="text-primary font-medium hover:underline">{CONTACT.email}</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-full bg-primary/10 text-primary shrink-0">
                  <MapPin className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Studio</p>
                  <p>{CONTACT.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="grid place-items-center w-9 h-9 rounded-full bg-primary/10 text-primary shrink-0">
                  <Clock className="w-4 h-4" />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Business hours</p>
                  {CONTACT.hours.map((h) => (
                    <p key={h.days}><span className="text-muted-foreground">{h.days}:</span> {h.time}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="aspect-[4/3] rounded-sm overflow-hidden border border-border">
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Nordhaven Studio location"
              />
            </div>
          </motion.div>

          {/* Right column - form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 bg-background border border-border rounded-sm p-6 md:p-10 space-y-4 h-fit"
            noValidate
          >
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-primary mb-1">Send an enquiry</p>
              <h2 className="font-serif text-3xl">Tell us what you're looking for</h2>
              <p className="text-xs text-muted-foreground mt-2">
                Your message opens WhatsApp with these details prefilled for the fastest response.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Input placeholder="Full name" value={form.name} onChange={(e) => set("name")(e.target.value)} className="rounded-sm h-11" />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              <div>
                <Input
                  placeholder="Mobile number"
                  value={form.phone}
                  onChange={(e) => set("phone")(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  inputMode="tel"
                  className="rounded-sm h-11"
                />
                {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <Input placeholder="Email (optional)" type="email" value={form.email} onChange={(e) => set("email")(e.target.value)} className="rounded-sm h-11" />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <Input placeholder="Subject" value={form.subject} onChange={(e) => set("subject")(e.target.value)} className="rounded-sm h-11" />
              {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
            </div>
            <div>
              <Textarea placeholder="Tell us about your project…" value={form.message} onChange={(e) => set("message")(e.target.value)} rows={5} className="rounded-sm" />
              {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full rounded-sm py-6" disabled={submitting}>
              {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Opening WhatsApp…</> : <><Send className="w-4 h-4 mr-2" /> Send via WhatsApp</>}
            </Button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
