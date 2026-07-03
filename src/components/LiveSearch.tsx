import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { searchProducts, formatPrice, collections } from "@/data/products";
import { cn } from "@/lib/utils";

interface LiveSearchProps {
  className?: string;
  onNavigate?: () => void;
  autoFocus?: boolean;
  placeholder?: string;
}

export const LiveSearch = ({
  className,
  onNavigate,
  autoFocus,
  placeholder = "Search sofas, wardrobes, beds…",
}: LiveSearchProps) => {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 120);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const results = useMemo(() => searchProducts(debounced).slice(0, 8), [debounced]);
  const catMap = useMemo(() => Object.fromEntries(collections.map((c) => [c.id, c.name])), []);

  const submit = () => {
    const q = query.trim();
    setOpen(false);
    onNavigate?.();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  const openResult = (slug: string) => {
    setOpen(false);
    setQuery("");
    onNavigate?.();
    navigate(`/product/${slug}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (open && results[activeIndex]) {
        e.preventDefault();
        openResult(results[activeIndex].slug);
      } else {
        submit();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapRef} className={cn("relative w-full", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActiveIndex(0);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        autoFocus={autoFocus}
        placeholder={placeholder}
        className="w-full h-11 pl-11 pr-24 bg-muted/60 border border-transparent focus:border-primary/40 focus:bg-background outline-none text-sm rounded-sm transition-colors"
      />
      {query && (
        <button
          type="button"
          aria-label="Clear"
          onClick={() => {
            setQuery("");
            setOpen(false);
          }}
          className="absolute right-24 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      )}
      <button
        type="button"
        onClick={submit}
        className="absolute right-1.5 top-1.5 h-8 px-4 text-[11px] tracking-[0.15em] uppercase bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm transition-colors"
      >
        Search
      </button>

      {open && debounced.trim() && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-background border border-border rounded-sm shadow-xl z-50 overflow-hidden">
          {results.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-sm font-medium text-foreground">No results found</p>
              <p className="text-xs text-muted-foreground mt-1">
                Try a category or material — like "oak", "wardrobe" or "modular"
              </p>
            </div>
          ) : (
            <ul className="max-h-[70vh] overflow-y-auto">
              {results.map((r, i) => (
                <li key={r.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => openResult(r.slug)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 text-left border-b border-border/60 last:border-0 transition-colors",
                      activeIndex === i ? "bg-accent" : "hover:bg-accent/60",
                    )}
                  >
                    <img
                      src={r.images[0]}
                      alt=""
                      loading="lazy"
                      className="w-14 h-14 object-cover rounded-sm shrink-0 bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{r.name}</p>
                      <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                        {catMap[r.collection] ?? r.collection} · {r.productCode}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-foreground">{formatPrice(r.price)}</p>
                      {r.mrp && r.mrp > r.price && (
                        <p className="text-[11px] text-muted-foreground line-through">
                          {formatPrice(r.mrp)}
                        </p>
                      )}
                    </div>
                  </button>
                </li>
              ))}
              <li>
                <Link
                  to={`/products?q=${encodeURIComponent(query.trim())}`}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className="block p-3 text-center text-[11px] font-medium tracking-[0.2em] uppercase text-primary hover:bg-accent"
                >
                  View all results
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
