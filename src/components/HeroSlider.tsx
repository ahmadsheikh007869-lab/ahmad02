import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/heroSlides";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export const HeroSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", duration: 40 },
    reduceMotion ? [] : [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-[82vh] md:h-[88vh] overflow-hidden bg-foreground">
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {heroSlides.map((slide, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover",
                  selected === i && !reduceMotion && "animate-ken-burns",
                )}
                loading={i === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/45 to-transparent" />
              <div className="relative container-full h-full flex items-center">
                <AnimatePresence mode="wait">
                  {selected === i && (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="max-w-2xl text-background"
                    >
                      <p className="text-[11px] font-semibold tracking-[0.35em] uppercase text-background/70 mb-5">
                        {slide.eyebrow}
                      </p>
                      <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6">
                        {slide.title}
                        {slide.italicPart && (
                          <>
                            <br />
                            <span className="italic font-normal text-background/85">
                              {slide.italicPart}
                            </span>
                          </>
                        )}
                      </h1>
                      <p className="text-base md:text-lg text-background/80 max-w-lg mb-9 leading-relaxed">
                        {slide.subtitle}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button asChild size="lg" className="rounded-sm px-10 py-6 text-sm tracking-[0.2em] uppercase btn-premium">
                          <Link to={slide.ctaHref}>
                            {slide.ctaLabel} <ArrowRight className="ml-3 w-4 h-4" />
                          </Link>
                        </Button>
                        {slide.secondaryLabel && slide.secondaryHref && (
                          <Button
                            asChild
                            variant="outline"
                            size="lg"
                            className="rounded-sm px-10 py-6 text-sm tracking-[0.2em] uppercase bg-transparent text-background border-background/40 hover:bg-background hover:text-foreground"
                          >
                            <Link to={slide.secondaryHref}>{slide.secondaryLabel}</Link>
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous slide"
        className="hidden md:grid absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 place-items-center bg-background/10 hover:bg-background/25 text-background backdrop-blur-sm rounded-full transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next slide"
        className="hidden md:grid absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 place-items-center bg-background/10 hover:bg-background/25 text-background backdrop-blur-sm rounded-full transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              selected === i ? "w-10 bg-background" : "w-4 bg-background/40 hover:bg-background/70",
            )}
          />
        ))}
      </div>
    </section>
  );
};
