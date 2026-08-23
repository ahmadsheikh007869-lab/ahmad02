import hero1 from "@/assets/hero-kitchen-1.jpg";
import hero2 from "@/assets/hero-kitchen-2.jpg";
import hero3 from "@/assets/hero-kitchen-3.jpg";
import hero4 from "@/assets/hero-kitchen-4.jpg";
import hero5 from "@/assets/hero-kitchen-5.jpg";

export interface HeroSlide {
  eyebrow: string;
  title: string;
  italicPart?: string;
  subtitle: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Made-to-Order",
    title: "Modular Kitchens",
    italicPart: "built around you",
    subtitle:
      "Layouts from straight-line to island — designed, delivered and installed anywhere in India.",
    image: hero1,
    ctaLabel: "Design Your Kitchen",
    ctaHref: "/products?collection=modular-kitchen",
    secondaryLabel: "Book a Consult",
    secondaryHref: "/about",
  },
  {
    eyebrow: "Island Kitchens",
    title: "The Island Kitchen",
    italicPart: "in warm oak",
    subtitle:
      "Statement islands with quartz tops, tall pantry columns and 90cm auto-clean chimneys.",
    image: hero2,
    ctaLabel: "Explore Island Kitchens",
    ctaHref: "/products?collection=modular-kitchen",
  },
  {
    eyebrow: "L-Shape & U-Shape",
    title: "Handleless Kitchens",
    italicPart: "modern, matte, minimal",
    subtitle:
      "Push-to-open shutters, soft-close tandem drawers and integrated appliance columns.",
    image: hero3,
    ctaLabel: "See Layouts",
    ctaHref: "/products?collection=modular-kitchen",
  },
  {
    eyebrow: "Compact Kitchens",
    title: "Small Space,",
    italicPart: "full kitchen",
    subtitle:
      "Compact straight-line and parallel kitchens engineered for apartments — from 2.4m runs.",
    image: hero4,
    ctaLabel: "Compact Kitchens",
    ctaHref: "/products?collection=modular-kitchen",
  },
  {
    eyebrow: "Premium Finishes",
    title: "Shaker & Walnut",
    italicPart: "kitchens",
    subtitle:
      "Shaker ivory, walnut woodgrain and high-gloss finishes — each installed in 21 days.",
    image: hero5,
    ctaLabel: "View Finishes",
    ctaHref: "/products?collection=modular-kitchen",
    secondaryLabel: "Book a Consult",
    secondaryHref: "/about",
  },
];
