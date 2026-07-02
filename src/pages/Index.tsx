import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Video, Phone } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCarousel } from "@/components/ProductCarousel";
import { getProductsByCollection } from "@/data/products";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <Layout>
      {/* Hero Banner */}
      <section className="relative h-[80vh] md:h-[88vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2000&q=80"
            alt="Premium modern sofa collection"
            className="w-full h-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        </div>

        <div className="relative container-full h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl text-background"
          >
            <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-background/70 mb-5">
              Rizwan Furniture Presents
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6">
              FullHouse Fiesta
              <br />
              <span className="italic font-normal text-primary-foreground/90">up to 70% off</span>
            </h1>
            <p className="text-base md:text-lg text-background/80 max-w-lg mb-9 leading-relaxed">
              Redesign every room with premium modular furniture in a warm oak finish —
              curated for modern homes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-sm px-10 py-6 text-sm tracking-[0.2em] uppercase btn-premium"
              >
                <Link to="/products">
                  Shop Now <ArrowRight className="ml-3 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-sm px-10 py-6 text-sm tracking-[0.2em] uppercase bg-transparent text-background border-background/40 hover:bg-background hover:text-foreground"
              >
                <Link to="/products?collection=sofas">Explore Sofas</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border">
        <div className="container-full grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            { icon: Truck, label: "Safe & Swift Delivery", sub: "Pan-India in 7–14 days" },
            { icon: ShieldCheck, label: "5-Year Warranty", sub: "On all modular units" },
            { icon: Video, label: "Shop via Video Call", sub: "Book a live tour" },
            { icon: Phone, label: "Call to Order", sub: "+91 98765 43210" },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-3 md:gap-4 py-5 px-4 md:px-6">
              <t.icon className="w-5 h-5 text-primary shrink-0" />
              <div>
                <p className="text-xs md:text-sm font-medium text-foreground leading-tight">{t.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{t.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 1: TV Units */}
      <ProductCarousel
        eyebrow="Home Interiors"
        title="Explore TV Units"
        viewAllHref="/products?collection=tv-units"
        products={getProductsByCollection("tv-units")}
      />

      {/* Section 2: Wardrobes */}
      <div className="bg-linen">
        <ProductCarousel
          eyebrow="Storage"
          title="Explore Wardrobes"
          viewAllHref="/products?collection=wardrobes"
          products={getProductsByCollection("wardrobes")}
        />
      </div>

      {/* Section 3: Beds */}
      <ProductCarousel
        eyebrow="Bedroom"
        title="Explore Beds"
        viewAllHref="/products?collection=beds"
        products={getProductsByCollection("beds")}
      />

      {/* Section 4: Modular Kitchen & Dining */}
      <div className="bg-linen">
        <ProductCarousel
          eyebrow="Culinary Living"
          title="Modular Kitchens & Dining"
          viewAllHref="/products?collection=modular-kitchen"
          products={[
            ...getProductsByCollection("modular-kitchen"),
            ...getProductsByCollection("dining"),
          ]}
        />
      </div>

      {/* Section 5: Study */}
      <ProductCarousel
        eyebrow="Work from Home"
        title="Explore Study Tables"
        viewAllHref="/products?collection=study"
        products={getProductsByCollection("study")}
      />

      {/* Section 6: Sofas & Lounge */}
      <div className="bg-linen">
        <ProductCarousel
          eyebrow="Living Room"
          title="Explore Lounge Chairs & Sofas"
          viewAllHref="/products?collection=sofas"
          products={getProductsByCollection("sofas")}
        />
      </div>

      {/* Editorial CTA */}
      <section className="relative h-[55vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=80"
            alt="Design consultation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/55" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl text-background"
          >
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-background/60 mb-4">
              Complimentary Service
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-5">
              Design your home with us
            </h2>
            <p className="text-background/70 mb-8 max-w-lg mx-auto">
              Book a free consultation with a Rizwan interior designer — in-store, at home or over video call.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-sm px-10 py-6 text-sm tracking-[0.2em] uppercase bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href="tel:+919876543210">
                Call to Book <Phone className="ml-3 w-4 h-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
