import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

interface RecentState {
  items: Product[];
  push: (p: Product) => void;
  clear: () => void;
}

const LIMIT = 8;

export const useRecentlyViewed = create<RecentState>()(
  persist(
    (set, get) => ({
      items: [],
      push: (p) => {
        const filtered = get().items.filter((x) => x.id !== p.id);
        set({ items: [p, ...filtered].slice(0, LIMIT) });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "rf-recently-viewed" },
  ),
);
