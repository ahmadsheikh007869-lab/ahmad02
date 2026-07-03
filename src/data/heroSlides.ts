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
    eyebrow: "Rizwan Furniture Presents",
    title: "FullHouse Fiesta",
    italicPart: "up to 70% off",
    subtitle:
      "Redesign every room with premium modular furniture in a warm oak finish — curated for modern homes.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2000&q=80",
    ctaLabel: "Shop the Sale",
    ctaHref: "/products",
    secondaryLabel: "Explore Sofas",
    secondaryHref: "/products?collection=sofas",
  },
  {
    eyebrow: "Bedroom Collection",
    title: "Rest, Redefined",
    italicPart: "in solid oak",
    subtitle:
      "Handcrafted beds and wardrobes engineered for a decade of daily use — starting at ₹32,999.",
    image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=2000&q=80",
    ctaLabel: "Shop Beds",
    ctaHref: "/products?collection=beds",
    secondaryLabel: "See Wardrobes",
    secondaryHref: "/products?collection=wardrobes",
  },
  {
    eyebrow: "Made-to-Order",
    title: "Modular Kitchens",
    italicPart: "built around you",
    subtitle:
      "Layouts from straight-line to island, delivered and installed anywhere in India.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=2000&q=80",
    ctaLabel: "Design Your Kitchen",
    ctaHref: "/products?collection=modular-kitchen",
    secondaryLabel: "Book a Consult",
    secondaryHref: "/about",
  },
  {
    eyebrow: "Editor's Pick",
    title: "Luxury Wooden",
    italicPart: "interiors",
    subtitle:
      "Live-edge tables, fluted panels and hand-finished cabinetry for statement rooms.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=2000&q=80",
    ctaLabel: "Explore Collection",
    ctaHref: "/products?collection=wooden-cabinets",
  },
  {
    eyebrow: "Festive Offers",
    title: "Home Reset Sale",
    italicPart: "flat 40% off",
    subtitle:
      "TV units, bookshelves, dining and lighting — refreshed pricing across every category.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2000&q=80",
    ctaLabel: "See Today's Offers",
    ctaHref: "/products?sort=discount",
  },
];
