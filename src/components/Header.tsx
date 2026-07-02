import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, Search, User, Package, X, Phone, Video } from "lucide-react";
import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/hooks/useWishlist";
import { CartIcon } from "@/components/CartIcon";
import { collections } from "@/data/products";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const { items } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500 bg-background",
        scrolled ? "shadow-sm border-b border-border" : "border-b border-border/60",
      )}
    >
      {/* Top utility bar */}
      <div className="hidden md:block bg-foreground text-background/80 text-[11px]">
        <div className="container-full flex items-center justify-between h-8">
          <div className="flex items-center gap-5">
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-background transition-colors">
              <Phone className="w-3 h-3" /> +91 98765 43210
            </a>
            <span className="opacity-60">Free delivery over ₹15,000</span>
          </div>
          <a href="#" className="flex items-center gap-2 hover:text-background transition-colors">
            <Video className="w-3 h-3" /> Shop via Video Call
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-full">
        <div className="flex items-center gap-4 md:gap-8 h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 text-foreground hover:text-primary transition-colors"
          >
            <span className="w-9 h-9 rounded-sm bg-primary text-primary-foreground grid place-items-center font-serif text-xl">
              R
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-serif text-xl md:text-2xl tracking-tight">Rizwan</span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Furniture</span>
            </span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for sofas, wardrobes, beds…"
              className="w-full h-11 pl-11 pr-24 bg-muted/60 border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm rounded-sm transition-colors"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1.5 h-8 px-4 text-[11px] tracking-[0.15em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm transition-colors"
            >
              Search
            </button>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-1 ml-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/products" className="hidden md:flex flex-col items-center px-3 py-2 hover:bg-accent transition-colors rounded-sm">
                  <User className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 tracking-wider uppercase text-muted-foreground">Profile</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">Sign in</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/products" className="hidden md:flex flex-col items-center px-3 py-2 hover:bg-accent transition-colors rounded-sm">
                  <Package className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 tracking-wider uppercase text-muted-foreground">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">Track your orders</TooltipContent>
            </Tooltip>

            {/* Wishlist */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="relative p-2 hover:bg-accent transition-colors rounded-sm">
                  <Heart className="w-5 h-5" />
                  <AnimatePresence>
                    {items.length > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-semibold rounded-full flex items-center justify-center"
                      >
                        {items.length > 9 ? "9+" : items.length}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-xs">
                {items.length === 0 ? (
                  <p className="text-sm">Your wishlist is empty</p>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {items.length} saved {items.length === 1 ? "item" : "items"}
                    </p>
                    {items.slice(0, 3).map((item) => (
                      <p key={item.id} className="text-xs text-muted-foreground truncate">
                        {item.name}
                      </p>
                    ))}
                    {items.length > 3 && (
                      <p className="text-xs text-muted-foreground">+{items.length - 3} more</p>
                    )}
                  </div>
                )}
              </TooltipContent>
            </Tooltip>

            <CartIcon />

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-accent transition-colors rounded-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Category nav row */}
        <nav className="hidden md:block border-t border-border/60">
          <ul className="flex items-center gap-8 h-11 overflow-x-auto no-scrollbar">
            {collections.map((c) => (
              <li key={c.id} className="shrink-0">
                <Link
                  to={`/products?collection=${c.slug}`}
                  className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground hover:text-primary transition-colors link-underline py-2"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li className="shrink-0 ml-auto">
              <Link
                to="/about"
                className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground hover:text-primary transition-colors link-underline"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border overflow-hidden bg-background"
          >
            <div className="container-full py-6 space-y-6">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search furniture…"
                  className="w-full h-11 pl-11 pr-4 bg-muted/60 outline-none text-sm rounded-sm"
                />
              </form>

              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground/60 mb-3">
                  Categories
                </p>
                <ul className="space-y-1">
                  {collections.map((c) => (
                    <li key={c.id}>
                      <Link
                        to={`/products?collection=${c.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-sm hover:text-primary transition-colors"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-border space-y-1">
                {[
                  { to: "/products", label: "Shop All" },
                  { to: "/about", label: "About" },
                  { to: "/cart", label: "Shopping Cart" },
                ].map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                  >
                    {l.label}
                  </Link>
                ))}
                <a href="tel:+919876543210" className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" /> +91 98765 43210
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
