import listHero from "@/assets/hero-kitchen-3.jpg";
import { useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  products, collections, getCollectionBySlug, searchProducts,
} from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SortOption = "featured" | "newest" | "price-asc" | "price-desc" | "discount";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCollection = searchParams.get("collection") || "all";
  const activeSort = (searchParams.get("sort") as SortOption) || "featured";
  const q = searchParams.get("q") || "";

  const items = useMemo(() => {
    let result = q ? searchProducts(q) : [...products];

    if (activeCollection !== "all") {
      const c = collections.find((c) => c.slug === activeCollection);
      if (c) result = result.filter((p) => p.collection === c.id);
    }

    switch (activeSort) {
      case "newest":
        result = result.filter((p) => p.new).concat(result.filter((p) => !p.new));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        result.sort((a, b) => (b.discountPercent || 0) - (a.discountPercent || 0));
        break;
      default:
        result = result.filter((p) => p.featured).concat(result.filter((p) => !p.featured));
    }
    return result;
  }, [activeCollection, activeSort, q]);

  const currentCollection = activeCollection !== "all" ? getCollectionBySlug(activeCollection) : null;

  const handleFilter = (slug: string) => {
    const np = new URLSearchParams(searchParams);
    if (slug === "all") np.delete("collection");
    else np.set("collection", slug);
    setSearchParams(np);
  };

  const handleSort = (v: string) => {
    const np = new URLSearchParams(searchParams);
    if (v === "featured") np.delete("sort");
    else np.set("sort", v);
    setSearchParams(np);
  };

  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/products" },
          ...(q
            ? [{ label: `Search: ${q}` }]
            : currentCollection
              ? [{ label: currentCollection.name }]
              : []),
        ]}
      />

      {/* Hero */}
      <section className="relative h-[36vh] md:h-[46vh] overflow-hidden">
        <img
          src={currentCollection?.heroImage || listHero}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-foreground/10" />
        <div className="absolute inset-0 container-full h-full flex flex-col justify-end pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-background">
            <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-background/60 mb-2">
              {q ? "Search Results" : currentCollection ? "Collection" : "Shop"}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl mb-2">
              {q ? `“${q}”` : currentCollection ? currentCollection.name : "All Furniture"}
            </h1>
            {currentCollection && !q && (
              <p className="text-background/70 max-w-lg text-sm md:text-base">{currentCollection.description}</p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-4 border-b border-border sticky top-16 md:top-[7.5rem] bg-background/95 backdrop-blur z-40">
        <div className="container-full">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-2 px-2 min-w-0 flex-1">

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFilter("all")}
                className={cn(
                  "rounded-sm whitespace-nowrap text-xs tracking-[0.15em] uppercase",
                  activeCollection === "all"
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "",
                )}
              >
                All
              </Button>
              {collections.map((c) => (
                <Button
                  key={c.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleFilter(c.slug)}
                  className={cn(
                    "rounded-sm whitespace-nowrap text-xs tracking-[0.15em] uppercase",
                    activeCollection === c.slug
                      ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                      : "",
                  )}
                >
                  {c.name}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground tracking-[0.1em] uppercase">Sort</span>
              <Select value={activeSort} onValueChange={handleSort}>
                <SelectTrigger className="w-[180px] rounded-sm text-xs h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {sortOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value} className="text-xs">{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 md:py-14">
        <div className="container-full">
          {items.length > 0 ? (
            <>
              <p className="text-sm text-muted-foreground mb-8">
                {items.length} {items.length === 1 ? "piece" : "pieces"}
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                {items.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-24">
              <p className="font-serif text-2xl text-muted-foreground mb-3">No pieces found</p>
              <Button asChild variant="outline" className="rounded-sm">
                <Link to="/products">View All Furniture</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
