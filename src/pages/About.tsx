import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=80"
          alt="Nordhaven showroom"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 to-foreground/60" />
        <div className="relative container-full h-full flex flex-col justify-end pb-16 text-background">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-background/60 mb-4">Our Story</p>
            <h1 className="font-serif text-5xl md:text-7xl leading-[0.95]">
              Furniture that
              <br />
              <span className="italic">feels like home</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-32">
        <div className="container-narrow text-center">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-5">Our Philosophy</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.25]">
            At Nordhaven we believe great homes are built one considered piece at a time — in a warm oak palette that ages beautifully.
          </h2>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-linen">
        <div className="container-full">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { n: "01", t: "Craftsmanship", d: "Every piece is designed and built in-house by artisans trained in modern joinery and finishing." },
              { n: "02", t: "Modularity", d: "Our modular systems adapt to any room — expand, reconfigure and reuse for years." },
              { n: "03", t: "Fair Pricing", d: "Direct-to-home model keeps prices honest without compromising on materials." },
            ].map((v) => (
              <div key={v.n} className="text-center">
                <span className="text-[11px] font-semibold tracking-[0.3em] text-primary/60 block mb-4">{v.n}</span>
                <h3 className="font-serif text-2xl mb-4">{v.t}</h3>
                <div className="w-8 h-px bg-primary/40 mx-auto mb-4" />
                <p className="text-muted-foreground leading-[1.8]">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 text-center">
        <div className="container-narrow">
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Design your home with us</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Talk to a Nordhaven interior designer — free consultation, in-store, at home or over video call.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="rounded-sm px-10 py-6 text-sm tracking-[0.2em] uppercase">
              <a href="tel:+919876543210"><Phone className="mr-2 w-4 h-4" /> Call to Book</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-sm px-10 py-6 text-sm tracking-[0.2em] uppercase">
              <Link to="/products">Shop Furniture <ArrowRight className="ml-3 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
