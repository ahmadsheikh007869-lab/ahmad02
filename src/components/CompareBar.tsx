import { useState } from "react";
import { X, Scale } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCompare } from "@/hooks/useCompare";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { formatPrice } from "@/data/products";

export const CompareBar = () => {
  const { items, remove, clear } = useCompare();
  const [open, setOpen] = useState(false);

  if (items.length < 2) return null;

  const rows: Array<{ label: string; key: keyof typeof items[number] }> = [
    { label: "Category", key: "collection" },
    { label: "Price", key: "price" },
    { label: "Material", key: "material" },
    { label: "Finish", key: "finish" },
    { label: "Color", key: "color" },
    { label: "Style", key: "style" },
    { label: "Dimensions", key: "dimensions" },
    { label: "Rating", key: "rating" },
  ];

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-30 bg-background border-t border-border shadow-2xl print:hidden"
        >
          <div className="container-full py-3 flex items-center gap-3 overflow-x-auto">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground shrink-0">
              Compare
            </span>
            <div className="flex items-center gap-2">
              {items.map((p) => (
                <div key={p.id} className="relative shrink-0 group">
                  <img src={p.images[0]} alt="" className="w-14 h-14 object-cover rounded-sm border border-border" />
                  <button
                    onClick={() => remove(p.id)}
                    aria-label="Remove from compare"
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-foreground text-background grid place-items-center text-xs"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>
              <Button size="sm" onClick={() => setOpen(true)} className="rounded-sm">
                <Scale className="w-4 h-4 mr-2" /> Compare ({items.length})
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl">Product comparison</DialogTitle>
            <DialogDescription>Side-by-side specs to help you choose.</DialogDescription>
          </DialogHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left text-xs uppercase tracking-widest text-muted-foreground py-3 w-32"></th>
                  {items.map((p) => (
                    <th key={p.id} className="text-left p-3 min-w-[180px] align-top">
                      <Link to={`/product/${p.slug}`} className="block group">
                        <img src={p.images[0]} alt="" className="w-full aspect-square object-cover rounded-sm mb-2" />
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.productCode}</p>
                        <p className="font-serif text-base leading-snug group-hover:text-primary transition-colors">{p.name}</p>
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-t border-border">
                    <td className="py-3 text-xs uppercase tracking-widest text-muted-foreground">{r.label}</td>
                    {items.map((p) => (
                      <td key={p.id} className="py-3 px-3">
                        {r.key === "price"
                          ? formatPrice(p.price)
                          : String((p as unknown as Record<string, unknown>)[r.key as string] ?? "—")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
