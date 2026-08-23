import kitchenShowcase from "@/assets/hero-kitchen-1.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Star, MessageCircle, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Layout } from "@/components/Layout";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductCarousel } from "@/components/ProductCarousel";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  collections,
  getProductsByCollection,
  getTrendingProducts,
  getNewProducts,
  getBestSellers,
  getOffers,
} from "@/data/products";
import { reviews } from "@/data/reviews";
import { faqs } from "@/data/faqs";
import { whyUs } from "@/data/whyUs";
import { CONTACT, whatsappUrl } from "@/config/contact";

// Home page leads with Modular Kitchen, then the three dedicated category sections.
const homepageCategoryIds = [
  "modular-kitchen", "sofas", "beds", "wardrobes",
  "tv-units", "dining-tables", "wooden-cabinets", "coffee-tables",
  "recliners", "dressing-tables", "bar-units", "pooja-units",
];
const featuredCats = homepageCategoryIds
  .map((id) => collections.find((c) => c.id === id))
  .filter((c): c is NonNullable<typeof c> => Boolean(c));

const kitchenShowcase = {
  title: "The Modular Kitchen",
  subtitle: "Layouts, cabinetry & appliance provisions — made to order",
  href: "/products?collection=modular-kitchen",
  image: kitchenShowcase,
};

const ContactForm = () => {
  const [state, setState] = useState({ name: "", phone: "", message: "" });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Thanks — we'll be in touch shortly.");
        setState({ name: "", phone: "", message: "" });
      }}
      className="space-y-3"
    >
      <input
        required
        placeholder="Your name"
        value={state.name}
        onChange={(e) => setState({ ...state, name: e.target.value })}
        className="w-full h-12 px-4 bg-muted/60 border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm rounded-sm"
      />
      <input
        required
        type="tel"
        placeholder="Phone number"
        value={state.phone}
        onChange={(e) => setState({ ...state, phone: e.target.value })}
        className="w-full h-12 px-4 bg-muted/60 border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm rounded-sm"
      />
      <textarea
        required
        placeholder="Tell us about your project"
        rows={4}
        value={state.message}
        onChange={(e) => setState({ ...state, message: e.target.value })}
        className="w-full px-4 py-3 bg-muted/60 border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm rounded-sm resize-none"
      />
      <Button type="submit" size="lg" className="w-full rounded-sm text-sm tracking-[0.2em] uppercase">
        Request Consultation <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </form>
  );
};

const Index = () => {
  const trending = getTrendingProducts();
  const arrivals = getNewProducts();
  const bestSellers = getBestSellers();
  const offers = getOffers(40);

  return (
    <Layout>
      {/* 1. Hero Slider */}
      <HeroSlider />

      {/* 2. Featured Categories */}
      <section className="py-16 md:py-24">
        <div className="container-full">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-2">Shop by Category</p>
            <h2 className="font-serif text-3xl md:text-5xl">Featured Collections</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {featuredCats.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
              >
                <Link
                  to={`/products?collection=${c.slug}`}
                  className="group block relative overflow-hidden furniture-tile aspect-[4/5] rounded-sm hover-lift"
                >
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 text-background">
                    <p className="font-serif text-xl md:text-2xl leading-tight">{c.name}</p>
                    <p className="text-[11px] tracking-[0.2em] uppercase text-background/70 mt-1">
                      {getProductsByCollection(c.id).length} pieces
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Trending */}
      {trending.length > 0 && (
        <div className="bg-linen">
          <ProductCarousel eyebrow="Right Now" title="Trending Products" viewAllHref="/products" products={trending} />
        </div>
      )}

      {/* 4. New Arrivals */}
      {arrivals.length > 0 && (
        <ProductCarousel eyebrow="Fresh In" title="New Arrivals" viewAllHref="/products" products={arrivals} />
      )}

      {/* 5. Best Sellers */}
      {bestSellers.length > 0 && (
        <div className="bg-linen">
          <ProductCarousel eyebrow="Most Loved" title="Best Sellers" viewAllHref="/products" products={bestSellers} />
        </div>
      )}

      {/* 6. Modular Kitchen Showcase */}
      <section className="py-16 md:py-24">
        <div className="container-full">
          <div className="text-center mb-10">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-2">Made to Order</p>
            <h2 className="font-serif text-3xl md:text-5xl">The Modular Kitchen</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Link
              to={kitchenShowcase.href}
              className="group block relative overflow-hidden rounded-sm aspect-[21/9] md:aspect-[21/8] furniture-tile"
            >
              <img
                src={kitchenShowcase.image}
                alt={kitchenShowcase.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/40 to-transparent" />
              <div className="absolute inset-y-0 left-0 flex flex-col justify-center pl-6 md:pl-16 max-w-xl text-background">
                <p className="text-[11px] tracking-[0.3em] uppercase text-background/70 mb-3">{kitchenShowcase.subtitle}</p>
                <h3 className="font-serif text-3xl md:text-5xl leading-[1.05] mb-5">{kitchenShowcase.title}</h3>
                <span className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase border-b border-background/60 pb-1 self-start group-hover:text-primary group-hover:border-primary transition-colors">
                  Design Your Kitchen <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>


      {/* 7. Today's Offers */}
      {offers.length > 0 && (
        <div className="bg-linen">
          <ProductCarousel
            eyebrow="Ends Midnight"
            title="Today's Offers"
            viewAllHref="/products"
            products={offers.slice(0, 12)}
          />
        </div>
      )}

      {/* 8. Customer Reviews */}
      <section className="py-16 md:py-24">
        <div className="container-full">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-2">Loved by Homes</p>
            <h2 className="font-serif text-3xl md:text-5xl">Customer Reviews</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.slice(0, 6).map((r, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="p-7 bg-linen rounded-sm border border-border/60 flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="font-serif text-lg text-foreground leading-relaxed flex-1">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-5 pt-5 border-t border-border/60">
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.city} · {r.product}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Why Choose Us */}
      <section className="py-16 md:py-24 bg-linen">
        <div className="container-full">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-2">The Nordhaven Promise</p>
            <h2 className="font-serif text-3xl md:text-5xl">Why Choose Us</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {whyUs.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="p-6 md:p-8 bg-background rounded-sm border border-border/60"
              >
                <w.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-serif text-xl mb-2">{w.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="text-center mb-10">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-2">Good to Know</p>
            <h2 className="font-serif text-3xl md:text-5xl">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border/60 rounded-sm px-5">
                <AccordionTrigger className="text-left font-serif text-lg hover:no-underline py-5">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 11. Contact */}
      <section id="contact" className="py-16 md:py-24 bg-foreground text-background">
        <div className="container-full grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">Talk to Us</p>
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Design your dream home with us</h2>
            <p className="text-background/70 mb-8 max-w-md leading-relaxed">
              Book a free consultation — in-store, at home or over video call. Our designers will send a 3D layout within 48 hours.
            </p>
            <div className="space-y-3">
              <a href={`tel:${CONTACT.phoneTel}`} className="flex items-center gap-3 text-sm text-background/80 hover:text-background transition-colors">
                <span className="w-10 h-10 grid place-items-center rounded-sm bg-background/10"><Phone className="w-4 h-4" /></span>
                {CONTACT.phone}
              </a>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-background/80 hover:text-background transition-colors">
                <span className="w-10 h-10 grid place-items-center rounded-sm bg-background/10"><MessageCircle className="w-4 h-4" /></span>
                Chat on WhatsApp
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-sm text-background/80 hover:text-background transition-colors">
                <span className="w-10 h-10 grid place-items-center rounded-sm bg-background/10"><Mail className="w-4 h-4" /></span>
                {CONTACT.email}
              </a>
            </div>
          </div>
          <div className="bg-background text-foreground p-7 md:p-10 rounded-sm">
            <h3 className="font-serif text-2xl mb-5">Send us an enquiry</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
