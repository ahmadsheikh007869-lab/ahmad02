import { Link } from "react-router-dom";
import { ArrowRight, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { collections } from "@/data/products";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="border-b border-background/10">
        <div className="container-full py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <Link to="/" className="flex items-center gap-3 text-background">
                <span className="w-11 h-11 rounded-sm bg-primary text-primary-foreground grid place-items-center font-serif text-2xl">
                  R
                </span>
                <span className="flex flex-col leading-none">
                  <span className="font-serif text-2xl md:text-3xl">Rizwan Furniture</span>
                  <span className="text-[11px] tracking-[0.25em] uppercase text-background/50 mt-1">
                    Premium modern homes
                  </span>
                </span>
              </Link>
              <p className="mt-4 text-sm text-background/50 leading-relaxed max-w-xs">
                Modular furniture and interior solutions crafted in a warm oak finish.
              </p>
            </div>

            <div className="max-w-sm w-full">
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-background/40 mb-3">
                Get design ideas & offers
              </p>
              <form className="flex gap-0">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 h-12 px-4 text-sm bg-background/5 border border-background/15 text-background placeholder:text-background/30 focus:outline-none focus:border-background/40 transition-colors rounded-sm"
                />
                <button
                  type="submit"
                  className="h-12 px-5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ml-2 rounded-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container-full py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {collections.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/products?collection=${c.slug}`}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-sm text-background/60 hover:text-background transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="text-sm text-background/60 hover:text-background transition-colors">Our Story</Link></li>
              <li><Link to="/cart" className="text-sm text-background/60 hover:text-background transition-colors">Shopping Cart</Link></li>
              <li><a href="#" className="text-sm text-background/60 hover:text-background transition-colors">Interior Design Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">
              Support
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-background/60 hover:text-background transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="text-sm text-background/60 hover:text-background transition-colors">Warranty Policy</a></li>
              <li><a href="#" className="text-sm text-background/60 hover:text-background transition-colors">Assembly & Care</a></li>
              <li><a href="#" className="text-sm text-background/60 hover:text-background transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-background/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors">
                  <Phone className="w-4 h-4" /> +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:hello@rizwanfurniture.com" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors">
                  <Mail className="w-4 h-4" /> hello@rizwanfurniture.com
                </a>
              </li>
              <li className="flex items-center gap-3 pt-2">
                <a href="#" className="p-2 border border-background/15 rounded-sm hover:bg-background/10 transition-colors" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 border border-background/15 rounded-sm hover:bg-background/10 transition-colors" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-full py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Rizwan Furniture. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-background/40 hover:text-background/70 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-background/40 hover:text-background/70 transition-colors">Terms of Service</a>
            <a href="#" className="text-xs text-background/40 hover:text-background/70 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
