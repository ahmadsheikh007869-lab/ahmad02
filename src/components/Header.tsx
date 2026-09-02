import { Link } from "react-router-dom";
import { Heart, Menu, User, Package, X, Phone, MessageCircle, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/hooks/useAuth";
import { CartIcon } from "@/components/CartIcon";
import { LiveSearch } from "@/components/LiveSearch";
import { collections } from "@/data/products";
import { CONTACT } from "@/config/contact";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const homepageCategoryIds = [
  "beds",
  "wardrobes",
  "modular-kitchen",
  "tv-units",
  "dining-tables",
  "wooden-cabinets",
  "bookshelves",
  "decorative-lights",
];

const primaryCategories = collections.filter((c) => homepageCategoryIds.includes(c.id));

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { items } = useWishlist();
  const { user, isAdminOrHigher } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 hover:text-background transition-colors cursor-default">
              <Phone className="w-3 h-3" /> {CONTACT.phone}
              <span className="opacity-50">({CONTACT.label})</span>
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-2 hover:text-background transition-colors cursor-default"
            >
              <MessageCircle className="w-3 h-3" /> WhatsApp
            </a>
            <span className="opacity-60">Free delivery over $999</span>
          </div>
          <div className="flex items-center gap-5">
            {user ? (
              <>
                <Link to="/account" className="hover:text-background transition-colors">My Account</Link>
                {isAdminOrHigher && <Link to="/admin" className="hover:text-background transition-colors">Admin</Link>}
              </>
            ) : (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/auth" className="hover:text-background transition-colors">Demo Login</Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Demo account flow — sign up with any email to explore</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link to="/admin/login" className="hover:text-background transition-colors">Demo Admin</Link>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Demo admin console — requires an admin role</TooltipContent>
                </Tooltip>
              </>
            )}
          </div>
        </div>
      </div>


      {/* Main bar */}
      <div className="container-full">
        <div className="flex items-center gap-4 md:gap-8 h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 shrink-0 text-foreground hover:text-primary transition-colors">
            <span className="w-9 h-9 md:w-10 md:h-10 rounded-sm bg-primary grid place-items-center shrink-0">
              <img src="/favicon.png" alt="Velmora Home logo" width={40} height={40} className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-serif text-xl md:text-2xl tracking-tight">Velmora Home</span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Furniture</span>
            </span>

          </Link>

          <div className="flex-1 max-w-2xl hidden md:block">
            <LiveSearch />
          </div>

          <div className="flex items-center gap-1 ml-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={user ? "/account" : "/auth"}
                  className="hidden md:flex flex-col items-center px-3 py-2 hover:bg-accent transition-colors rounded-sm"
                >
                  <User className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 tracking-wider uppercase text-muted-foreground">{user ? "Account" : "Sign in"}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">{user ? "My account" : "Sign in"}</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to={user ? "/account" : "/auth"}
                  className="hidden md:flex flex-col items-center px-3 py-2 hover:bg-accent transition-colors rounded-sm"
                >
                  <Package className="w-5 h-5" />
                  <span className="text-[10px] mt-0.5 tracking-wider uppercase text-muted-foreground">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom">Track your orders</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button className="relative p-2 hover:bg-accent transition-colors rounded-sm" aria-label="Wishlist">
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
                  <p className="text-sm">{items.length} saved {items.length === 1 ? "item" : "items"}</p>
                )}
              </TooltipContent>
            </Tooltip>

            <CartIcon />

            {/* WhatsApp quick action (desktop) */}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="hidden lg:inline-flex items-center gap-2 ml-2 px-3 py-2 text-[11px] tracking-[0.15em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm transition-colors cursor-default"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" /> Chat
            </a>

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

        <nav className="hidden md:block border-t border-border/60">
          <ul className="flex items-center gap-8 h-11 overflow-x-auto no-scrollbar">
            {primaryCategories.map((c) => (
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
              <LiveSearch onNavigate={() => setMobileMenuOpen(false)} />

              <div>
                <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-muted-foreground/60 mb-3">
                  Categories
                </p>
                <ul className="space-y-1">
                  {primaryCategories.map((c) => (
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
                <Link to={user ? "/account" : "/auth"} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-sm text-muted-foreground">
                  <LogIn className="w-4 h-4" /> {user ? "My Account" : "Login / Sign up"}
                </Link>
                <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center gap-2 py-2 text-sm text-muted-foreground cursor-default">
                  <Phone className="w-4 h-4" /> {CONTACT.phone}
                </a>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-2 py-2 text-sm text-primary cursor-default"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
