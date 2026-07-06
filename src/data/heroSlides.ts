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
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=2000&q=80",
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
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80",
    ctaLabel: "Explore Island Kitchens",
    ctaHref: "/products?collection=modular-kitchen",
  },
  {
    eyebrow: "L-Shape & U-Shape",
    title: "Handleless Kitchens",
    italicPart: "modern, matte, minimal",
    subtitle:
      "Push-to-open shutters, soft-close tandem drawers and integrated appliance columns.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=80",
    ctaLabel: "See Layouts",
    ctaHref: "/products?collection=modular-kitchen",
  },
  {
    eyebrow: "Compact Kitchens",
    title: "Small Space,",
    italicPart: "full kitchen",
    subtitle:
      "Compact straight-line and parallel kitchens engineered for apartments — from 2.4m runs.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2000&q=80",
    ctaLabel: "Compact Kitchens",
    ctaHref: "/products?collection=modular-kitchen",
  },
  {
    eyebrow: "Premium Finishes",
    title: "Shaker & Walnut",
    italicPart: "kitchens",
    subtitle:
      "Shaker ivory, walnut woodgrain and high-gloss finishes — each installed in 21 days.",
    image: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=2000&q=80",
    ctaLabel: "View Finishes",
    ctaHref: "/products?collection=modular-kitchen",
    secondaryLabel: "Book a Consult",
    secondaryHref: "/about",
  },
];
