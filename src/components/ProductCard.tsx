import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Product, collections, formatPrice } from "@/data/products";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
  variant?: "default" | "large";
}

export const ProductCard = ({ product, index = 0, variant = "default" }: ProductCardProps) => {
  const { addItem, removeItem, isInWishlist } = useWishlist();
  const [loaded, setLoaded] = useState(false);
  const inWishlist = isInWishlist(product.id);
  const collection = collections.find((c) => c.id === product.collection);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) removeItem(product.id);
    else addItem(product);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.06, 0.4), ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group h-full"
    >
      <Link to={`/product/${product.slug}`} className="block h-full">
        <div
          className={cn(
            "relative overflow-hidden furniture-tile mb-4 rounded-sm transition-all duration-500",
            "group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-18px_hsl(var(--foreground)/0.35)]",
            variant === "large" ? "aspect-[3/4]" : "aspect-[4/5]",
          )}
        >
          {/* Loading skeleton */}
          {!loaded && <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden="true" />}

          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            className={cn(
              "w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.04]",
              loaded ? "opacity-100" : "opacity-0",
            )}
          />

          {/* Badges — single top-left stack so nothing overlaps the wishlist button */}
          <div className="absolute top-3 left-3 flex flex-col items-start gap-1.5">
            {product.discountPercent && product.discountPercent > 0 && (
              <span className="px-2.5 py-1 text-[10px] font-bold tracking-[0.12em] uppercase bg-primary text-primary-foreground rounded-sm shadow-sm">
                {product.discountPercent}% OFF
              </span>
            )}
            {product.new && (
              <span className="px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] uppercase bg-foreground text-background rounded-sm shadow-sm">
                New
              </span>
            )}
          </div>

          <button
            onClick={handleWishlistToggle}
            aria-label="Save to wishlist"
            className={cn(
              "absolute top-3 right-3 p-2 rounded-full bg-background/95 backdrop-blur shadow-sm transition-all duration-300",
              "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0",
              inWishlist && "opacity-100 translate-y-0",
            )}
          >
            <Heart className={cn("w-4 h-4 transition-colors", inWishlist ? "fill-primary text-primary" : "text-foreground")} />
          </button>

          <div className="absolute inset-x-3 bottom-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
            <span className="block text-center px-4 py-2.5 text-[11px] font-medium tracking-[0.2em] uppercase bg-background/95 backdrop-blur text-foreground rounded-sm shadow">
              View Details
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          {collection && (
            <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-muted-foreground/70">
              {collection.name} · {product.productCode}
            </p>
          )}
          <h3 className="font-serif text-lg md:text-xl text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Star className="w-3.5 h-3.5 fill-primary text-primary" />
            <span className="font-medium text-foreground">{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>
          <div className="flex items-baseline gap-2 flex-wrap pt-1">
            <span className="text-base font-semibold text-foreground">{formatPrice(product.price)}</span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-xs text-muted-foreground line-through">{formatPrice(product.mrp)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
};
