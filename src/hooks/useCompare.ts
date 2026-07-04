import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

interface CompareState {
  items: Product[];
  toggle: (p: Product) => { added: boolean; full: boolean };
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
}

export const MAX_COMPARE = 4;

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (p) => {
        const items = get().items;
        if (items.some((x) => x.id === p.id)) {
          set({ items: items.filter((x) => x.id !== p.id) });
          return { added: false, full: false };
        }
        if (items.length >= MAX_COMPARE) return { added: false, full: true };
        set({ items: [...items, p] });
        return { added: true, full: false };
      },
      remove: (id) => set({ items: get().items.filter((x) => x.id !== id) }),
      clear: () => set({ items: [] }),
      has: (id) => get().items.some((x) => x.id === id),
    }),
    { name: "rf-compare" },
  ),
);
