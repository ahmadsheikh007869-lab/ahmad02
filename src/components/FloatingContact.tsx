import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { CONTACT, whatsappUrl } from "@/config/contact";
import { cn } from "@/lib/utils";

export const FloatingContact = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  if (pathname === "/checkout") return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6 print:hidden">
      {/* Dedicated always-visible WhatsApp pill */}
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative grid place-items-center w-13 h-13 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 active:scale-95 transition-transform motion-reduce:transition-none"
        style={{ width: 56, height: 56 }}
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping motion-reduce:hidden" />
        <MessageCircle className="w-6 h-6 relative" />
      </a>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-32 right-0 w-64 bg-background border border-border rounded-md shadow-xl overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">
                  Contact us
                </p>
                <p className="text-sm font-medium">{CONTACT.phone}</p>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close" className="p-1 hover:bg-accent rounded-sm">
                <X className="w-4 h-4" />
              </button>
            </div>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors"
            >
              <span className="grid place-items-center w-9 h-9 rounded-full bg-primary/10 text-primary">
                <Phone className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm font-medium">Call now</p>
                <p className="text-xs text-muted-foreground">Speak to our team</p>
              </div>
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 hover:bg-accent transition-colors border-t border-border"
            >
              <span className="grid place-items-center w-9 h-9 rounded-full bg-[#25D366]/15 text-[#25D366]">
                <MessageCircle className="w-4 h-4" />
              </span>
              <div>
                <p className="text-sm font-medium">Chat on WhatsApp</p>
                <p className="text-xs text-muted-foreground">Instant reply</p>
              </div>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Contact options"
        className={cn(
          "grid place-items-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 active:scale-95 transition-transform motion-reduce:transition-none",
        )}
        style={{ width: 56, height: 56 }}
      >
        <Phone className="w-6 h-6" />
      </button>
    </div>
  );
};
