export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  heroImage?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  collection: string;      // category id
  price: number;           // deal price
  mrp?: number;            // original / crossed-out price
  discountPercent?: number;
  description: string;
  longDescription: string;
  materials: string;
  dimensions?: string;
  images: string[];
  featured?: boolean;
  new?: boolean;
  rating?: number;
  reviewCount?: number;
}

/* ------------------------------------------------------------------ */
/*  Categories match the top-nav for Rizwan Furniture                 */
/* ------------------------------------------------------------------ */

export const collections: Collection[] = [
  {
    id: "tv-units",
    name: "Home Interiors",
    slug: "tv-units",
    description: "Modular TV units and living room storage in a warm oak finish.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=2000&q=80",
  },
  {
    id: "modular-kitchen",
    name: "Modular Kitchen",
    slug: "modular-kitchen",
    description: "Sleek modular kitchens, cabinetry and sink configurations.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=2000&q=80",
  },
  {
    id: "wardrobes",
    name: "Wardrobes",
    slug: "wardrobes",
    description: "Minimalist sliding-door and hinged wardrobes with a premium finish.",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=2000&q=80",
  },
  {
    id: "beds",
    name: "Beds",
    slug: "beds",
    description: "Upholstered and solid-wood beds designed for restful modern homes.",
    image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=2000&q=80",
  },
  {
    id: "sofas",
    name: "Living",
    slug: "sofas",
    description: "Lounge chairs and sofas in monochromatic modern silhouettes.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=2000&q=80",
  },
  {
    id: "dining",
    name: "Dining",
    slug: "dining",
    description: "Dining tables and seating built for everyday gatherings.",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=2000&q=80",
  },
  {
    id: "study",
    name: "Study",
    slug: "study",
    description: "Sleek study tables and minimal home-office setups.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=2000&q=80",
  },
];

/* ------------------------------------------------------------------ */
/*  Products (INR pricing, MRP + offer price)                          */
/* ------------------------------------------------------------------ */

const p = (
  id: string,
  name: string,
  collection: string,
  price: number,
  mrp: number,
  images: string[],
  extras: Partial<Product> = {},
): Product => {
  const discountPercent = Math.round(((mrp - price) / mrp) * 100);
  return {
    id,
    name,
    slug: id,
    collection,
    price,
    mrp,
    discountPercent,
    description: extras.description ?? "Premium modern furniture crafted in a warm oak finish.",
    longDescription:
      extras.longDescription ??
      "Rizwan Furniture designs each piece with a monochromatic warm-oak palette, honest materials and a build quality meant to last decades. Every join, edge and finish is inspected by hand before it leaves our workshop.",
    materials: extras.materials ?? "Engineered oak, solid hardwood frame, matte PU finish",
    dimensions: extras.dimensions ?? "180 × 60 × 75 cm (W × D × H)",
    images,
    featured: extras.featured,
    new: extras.new,
    rating: extras.rating ?? 4.6,
    reviewCount: extras.reviewCount ?? 128,
  };
};

// Reusable high-quality furniture image sets (Unsplash — placeholders, easy to swap)
const IMG = {
  tv1: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&q=80",
  tv2: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
  tv3: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&q=80",
  tv4: "https://images.unsplash.com/photo-1583845112203-29329902332e?w=1600&q=80",
  tv5: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1600&q=80",
  tv6: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=1600&q=80",

  wd1: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1600&q=80",
  wd2: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1600&q=80",
  wd3: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=1600&q=80",
  wd4: "https://images.unsplash.com/photo-1616627988056-1bde15c19f43?w=1600&q=80",
  wd5: "https://images.unsplash.com/photo-1616627451515-4d0b17e2f8f6?w=1600&q=80",
  wd6: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1600&q=80",

  bd1: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=1600&q=80",
  bd2: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80",
  bd3: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80",
  bd4: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=80",
  bd5: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1600&q=80",
  bd6: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80",

  kt1: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80",
  kt2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
  kt3: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
  kt4: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
  kt5: "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1600&q=80",
  kt6: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1600&q=80",

  dn1: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1600&q=80",
  dn2: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=80",
  dn3: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1600&q=80",
  dn4: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=1600&q=80",
  dn5: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&q=80",
  dn6: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=1600&q=80",

  st1: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1600&q=80",
  st2: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1600&q=80",
  st3: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=1600&q=80",
  st4: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=1600&q=80",
  st5: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80",
  st6: "https://images.unsplash.com/photo-1593642532871-8b12e02d091c?w=1600&q=80",

  sf1: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80",
  sf2: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1600&q=80",
  sf3: "https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=1600&q=80",
  sf4: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&q=80",
  sf5: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1600&q=80",
  sf6: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1600&q=80",
};

export const products: Product[] = [
  // ---------- TV Units / Home Interiors ----------
  p("arc-pendant-light", "Aster Wall-Mount TV Unit", "tv-units", 24999, 54999, [IMG.tv1, IMG.tv2], {
    description: "Wall-mounted TV unit with tempered glass and warm oak veneer.",
    featured: true,
    dimensions: "180 × 40 × 45 cm",
    materials: "Engineered oak, tempered glass, matte laminate",
  }),
  p("halden-tv-console", "Halden Floor TV Console", "tv-units", 32499, 64999, [IMG.tv2, IMG.tv3]),
  p("linden-media-wall", "Linden Media Wall System", "tv-units", 58999, 119999, [IMG.tv3, IMG.tv4], { new: true }),
  p("noor-tv-cabinet", "Noor Compact TV Cabinet", "tv-units", 18999, 32999, [IMG.tv4, IMG.tv5]),
  p("odin-tv-storage", "Odin Storage TV Unit", "tv-units", 42999, 79999, [IMG.tv5, IMG.tv6]),
  p("verse-modular-tv", "Verse Modular TV Rack", "tv-units", 27999, 49999, [IMG.tv6, IMG.tv1]),

  // ---------- Wardrobes ----------
  p("marlow-sliding-wardrobe", "Marlow 3-Door Sliding Wardrobe", "wardrobes", 54999, 119999, [IMG.wd1, IMG.wd2], {
    featured: true, dimensions: "220 × 60 × 220 cm",
  }),
  p("kyra-hinged-wardrobe", "Kyra Hinged Wardrobe", "wardrobes", 38999, 74999, [IMG.wd2, IMG.wd3]),
  p("orion-walk-in", "Orion Walk-in Closet", "wardrobes", 89999, 189999, [IMG.wd3, IMG.wd4], { new: true }),
  p("selene-mirror-wardrobe", "Selene Mirrored Wardrobe", "wardrobes", 62999, 129999, [IMG.wd4, IMG.wd5]),
  p("thera-2door-wardrobe", "Thera 2-Door Wardrobe", "wardrobes", 26999, 48999, [IMG.wd5, IMG.wd6]),
  p("uma-fluted-wardrobe", "Uma Fluted-Front Wardrobe", "wardrobes", 74999, 139999, [IMG.wd6, IMG.wd1]),

  // ---------- Beds ----------
  p("aspen-king-bed", "Aspen Upholstered King Bed", "beds", 44999, 89999, [IMG.bd1, IMG.bd2], {
    featured: true, dimensions: "200 × 180 × 110 cm",
  }),
  p("bower-queen-bed", "Bower Queen Storage Bed", "beds", 38999, 76999, [IMG.bd2, IMG.bd3]),
  p("cove-platform-bed", "Cove Low Platform Bed", "beds", 32999, 62999, [IMG.bd3, IMG.bd4]),
  p("drift-canopy-bed", "Drift Canopy King Bed", "beds", 68999, 129999, [IMG.bd4, IMG.bd5], { new: true }),
  p("eddon-fluted-bed", "Eddon Fluted Headboard Bed", "beds", 46999, 89999, [IMG.bd5, IMG.bd6]),
  p("forge-oak-bed", "Forge Solid Oak Bed", "beds", 54999, 109999, [IMG.bd6, IMG.bd1]),

  // ---------- Modular Kitchen ----------
  p("astra-l-kitchen", "Astra L-Shape Modular Kitchen", "modular-kitchen", 189999, 349999, [IMG.kt1, IMG.kt2], {
    featured: true, dimensions: "300 × 240 cm layout",
  }),
  p("basel-straight-kitchen", "Basel Straight-Line Kitchen", "modular-kitchen", 124999, 229999, [IMG.kt2, IMG.kt3]),
  p("copen-island-kitchen", "Copen Island Modular Kitchen", "modular-kitchen", 249999, 449999, [IMG.kt3, IMG.kt4], { new: true }),
  p("dune-parallel-kitchen", "Dune Parallel Modular Kitchen", "modular-kitchen", 169999, 319999, [IMG.kt4, IMG.kt5]),
  p("elm-kitchen-cabinetry", "Elm Base Cabinetry Set", "modular-kitchen", 79999, 149999, [IMG.kt5, IMG.kt6]),
  p("fjord-sink-station", "Fjord Under-Counter Sink Station", "modular-kitchen", 34999, 62999, [IMG.kt6, IMG.kt1]),

  // ---------- Dining ----------
  p("harvest-dining-6", "Harvest 6-Seater Dining Table", "dining", 58999, 109999, [IMG.dn1, IMG.dn2], {
    featured: true, dimensions: "180 × 90 × 76 cm",
  }),
  p("indie-round-dining-4", "Indie Round 4-Seater Dining", "dining", 38999, 72999, [IMG.dn2, IMG.dn3]),
  p("juno-extendable-dining", "Juno Extendable Dining Table", "dining", 74999, 139999, [IMG.dn3, IMG.dn4], { new: true }),
  p("kettle-8-seater-dining", "Kettle 8-Seater Dining Set", "dining", 98999, 179999, [IMG.dn4, IMG.dn5]),
  p("linen-dining-chairs", "Linen Upholstered Dining Chairs (Set of 2)", "dining", 18999, 34999, [IMG.dn5, IMG.dn6]),
  p("marlo-dining-bench", "Marlo Dining Bench", "dining", 16999, 29999, [IMG.dn6, IMG.dn1]),

  // ---------- Study ----------
  p("atlas-study-desk", "Atlas Compact Study Desk", "study", 12999, 24999, [IMG.st1, IMG.st2], {
    featured: true, dimensions: "120 × 60 × 75 cm",
  }),
  p("brook-writing-desk", "Brook Writing Desk", "study", 18999, 34999, [IMG.st2, IMG.st3]),
  p("crest-executive-desk", "Crest Executive Desk", "study", 32999, 59999, [IMG.st3, IMG.st4], { new: true }),
  p("dune-laptop-table", "Dune Portable Laptop Table", "study", 6999, 12999, [IMG.st4, IMG.st5]),
  p("elm-study-set", "Elm Study Table & Chair Set", "study", 24999, 46999, [IMG.st5, IMG.st6]),
  p("forge-corner-desk", "Forge L-Shaped Corner Desk", "study", 28999, 54999, [IMG.st6, IMG.st1]),

  // ---------- Sofas / Lounge ----------
  p("alba-3-seater-sofa", "Alba 3-Seater Modern Sofa", "sofas", 44999, 89999, [IMG.sf1, IMG.sf2], {
    featured: true, dimensions: "215 × 92 × 85 cm",
  }),
  p("bosco-lounge-chair", "Bosco Sculptural Lounge Chair", "sofas", 24999, 46999, [IMG.sf2, IMG.sf3]),
  p("cove-modular-sofa", "Cove Modular Sectional Sofa", "sofas", 89999, 169999, [IMG.sf3, IMG.sf4], { new: true }),
  p("drift-armchair", "Drift Boucle Armchair", "sofas", 22999, 42999, [IMG.sf4, IMG.sf5]),
  p("eddon-2-seater", "Eddon 2-Seater Loveseat", "sofas", 32999, 64999, [IMG.sf5, IMG.sf6]),
  p("forge-leather-recliner", "Forge Leather Recliner", "sofas", 54999, 99999, [IMG.sf6, IMG.sf1]),
];

/* ------------------------------------------------------------------ */
/*  Selectors                                                          */
/* ------------------------------------------------------------------ */

export const getProductsByCollection = (collectionSlug: string): Product[] =>
  products.filter((product) => product.collection === collectionSlug);

export const getFeaturedProducts = (): Product[] =>
  products.filter((product) => product.featured);

export const getNewProducts = (): Product[] => products.filter((product) => product.new);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug);

export const getCollectionBySlug = (slug: string): Collection | undefined =>
  collections.find((collection) => collection.slug === slug);

export const getRelatedProducts = (productId: string, limit = 6): Product[] => {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];
  return products
    .filter((p) => p.collection === product.collection && p.id !== productId)
    .slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.collection.toLowerCase().includes(q),
  );
};

/** Format an INR price with ₹ and locale grouping. */
export const formatPrice = (value: number): string =>
  `₹${value.toLocaleString("en-IN")}`;
