import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  title: string;
  eyebrow?: string;
  viewAllHref?: string;
  products: Product[];
}

export const ProductCarousel = ({ title, eyebrow, viewAllHref, products }: ProductCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-14 md:py-20">
      <div className="container-full">
        <div className="flex items-end justify-between mb-8 md:mb-10 gap-4">
          <div>
            {eyebrow && (
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-2">
                {eyebrow}
              </p>
            )}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[0.95]">
              {title}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            {viewAllHref && (
              <Link
                to={viewAllHref}
                className="hidden md:inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => emblaApi?.scrollPrev()}
                disabled={!canPrev}
                aria-label="Previous"
                className={cn(
                  "w-11 h-11 border border-border rounded-sm grid place-items-center bg-background transition-all",
                  canPrev ? "hover:bg-primary hover:text-primary-foreground hover:border-primary" : "opacity-30 cursor-not-allowed",
                )}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => emblaApi?.scrollNext()}
                disabled={!canNext}
                aria-label="Next"
                className={cn(
                  "w-11 h-11 border border-border rounded-sm grid place-items-center bg-background transition-all",
                  canNext ? "hover:bg-primary hover:text-primary-foreground hover:border-primary" : "opacity-30 cursor-not-allowed",
                )}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden -mx-2" ref={emblaRef}>
          <div className="flex">
            {products.map((product, i) => (
              <div
                key={product.id}
                className="px-2 shrink-0 basis-[80%] sm:basis-[45%] lg:basis-[30%] xl:basis-[24%]"
              >
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>

        {viewAllHref && (
          <div className="mt-8 md:hidden text-center">
            <Link
              to={viewAllHref}
              className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-primary"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
