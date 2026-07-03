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
  collection: string;
  productCode: string;
  price: number;
  mrp?: number;
  discountPercent?: number;
  description: string;
  longDescription: string;
  materials: string;
  material: string;   // primary material tag (Wood, Metal, Glass…)
  finish: string;     // Matte Oak, Walnut, Whitewash…
  color: string;      // Oak, Walnut, Charcoal, Ivory…
  style: string;      // Modern, Scandinavian, Industrial…
  dimensions?: string;
  images: string[];
  featured?: boolean;
  new?: boolean;
  bestSeller?: boolean;
  trending?: boolean;
  rating: number;
  reviewCount: number;
}

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/* ------------------------------------------------------------------ */

export const collections: Collection[] = [
  {
    id: "beds",
    name: "Beds",
    slug: "beds",
    description: "Upholstered and solid-wood beds designed for restful modern homes.",
    image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=1600&q=80",
    heroImage: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=2000&q=80",
  },
  {
    id: "wardrobes",
    name: "Wardrobes",
    slug: "wardrobes",
    description: "Minimalist sliding-door and hinged wardrobes with a premium finish.",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1600&q=80",
  },
  {
    id: "modular-kitchen",
    name: "Modular Kitchens",
    slug: "modular-kitchen",
    description: "Sleek modular kitchens, cabinetry and sink configurations.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80",
  },
  {
    id: "tv-units",
    name: "TV Units",
    slug: "tv-units",
    description: "Modular TV units and living room storage in a warm oak finish.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&q=80",
  },
  {
    id: "dining",
    name: "Dining",
    slug: "dining",
    description: "Dining tables and seating built for everyday gatherings.",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1600&q=80",
  },
  {
    id: "wooden-cabinets",
    name: "Wooden Cabinets",
    slug: "wooden-cabinets",
    description: "Storage cabinets, sideboards and display units in solid wood.",
    image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1600&q=80",
  },
  {
    id: "bookshelves",
    name: "Bookshelves",
    slug: "bookshelves",
    description: "Open and modular bookshelves for the modern reading room.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80",
  },
  {
    id: "decorative-lights",
    name: "Decorative Lights",
    slug: "decorative-lights",
    description: "Pendant, floor and wall lighting to accent your interiors.",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1600&q=80",
  },
  // Retained so legacy links still resolve
  {
    id: "study",
    name: "Study",
    slug: "study",
    description: "Sleek study tables and minimal home-office setups.",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1600&q=80",
  },
  {
    id: "sofas",
    name: "Sofas",
    slug: "sofas",
    description: "Lounge chairs and sofas in monochromatic modern silhouettes.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80",
  },
];

/* ------------------------------------------------------------------ */
/*  Product factory                                                    */
/* ------------------------------------------------------------------ */

let __codeCounter = 1000;
const nextCode = (prefix: string) => `${prefix}-${++__codeCounter}`;

interface PArgs {
  id: string;
  name: string;
  collection: string;
  price: number;
  mrp: number;
  images: string[];
  material?: string;
  finish?: string;
  color?: string;
  style?: string;
  dimensions?: string;
  description?: string;
  materials?: string;
  featured?: boolean;
  new?: boolean;
  bestSeller?: boolean;
  trending?: boolean;
  rating?: number;
  reviewCount?: number;
}

const p = (args: PArgs): Product => {
  const discountPercent = Math.round(((args.mrp - args.price) / args.mrp) * 100);
  const codePrefix = args.collection.slice(0, 3).toUpperCase();
  return {
    id: args.id,
    name: args.name,
    slug: args.id,
    collection: args.collection,
    productCode: nextCode(codePrefix),
    price: args.price,
    mrp: args.mrp,
    discountPercent,
    description: args.description ?? "Premium modern furniture crafted in a warm oak finish.",
    longDescription:
      "Rizwan Furniture designs each piece with a monochromatic warm-oak palette, honest materials and a build quality meant to last decades. Every join, edge and finish is inspected by hand before it leaves our workshop.",
    materials: args.materials ?? "Engineered oak, solid hardwood frame, matte PU finish",
    material: args.material ?? "Engineered Wood",
    finish: args.finish ?? "Matte Oak",
    color: args.color ?? "Oak",
    style: args.style ?? "Modern",
    dimensions: args.dimensions ?? "180 × 60 × 75 cm",
    images: args.images,
    featured: args.featured,
    new: args.new,
    bestSeller: args.bestSeller,
    trending: args.trending,
    rating: args.rating ?? +(4.2 + Math.random() * 0.7).toFixed(1),
    reviewCount: args.reviewCount ?? Math.floor(60 + Math.random() * 340),
  };
};

/* ------------------------------------------------------------------ */
/*  Image sets                                                         */
/* ------------------------------------------------------------------ */

const IMG = {
  tv: [
    "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1600&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&q=80",
    "https://images.unsplash.com/photo-1583845112203-29329902332e?w=1600&q=80",
    "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1600&q=80",
    "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=1600&q=80",
  ],
  wd: [
    "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1600&q=80",
    "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1600&q=80",
    "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=1600&q=80",
    "https://images.unsplash.com/photo-1616627988056-1bde15c19f43?w=1600&q=80",
    "https://images.unsplash.com/photo-1616627451515-4d0b17e2f8f6?w=1600&q=80",
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1600&q=80",
  ],
  bd: [
    "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=1600&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1600&q=80",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1600&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600&q=80",
    "https://images.unsplash.com/photo-1631049035182-249067d7618e?w=1600&q=80",
  ],
  kt: [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80",
    "https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=1600&q=80",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1600&q=80",
  ],
  dn: [
    "https://images.unsplash.com/photo-1615873968403-89e068629265?w=1600&q=80",
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&q=80",
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1600&q=80",
    "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=1600&q=80",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&q=80",
    "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=1600&q=80",
  ],
  st: [
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1600&q=80",
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1600&q=80",
    "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=1600&q=80",
    "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=1600&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80",
    "https://images.unsplash.com/photo-1593642532871-8b12e02d091c?w=1600&q=80",
  ],
  sf: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80",
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1600&q=80",
    "https://images.unsplash.com/photo-1550226891-ef816aed4a98?w=1600&q=80",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1600&q=80",
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1600&q=80",
    "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1600&q=80",
  ],
  wc: [
    "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1600&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
    "https://images.unsplash.com/photo-1598928636135-d146006ff4be?w=1600&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1600&q=80",
    "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=1600&q=80",
    "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=1600&q=80",
  ],
  bs: [
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=80",
    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=1600&q=80",
    "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=1600&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=80",
    "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?w=1600&q=80",
    "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=1600&q=80",
  ],
  dl: [
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1600&q=80",
    "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1600&q=80",
    "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=1600&q=80",
    "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=1600&q=80",
    "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=1600&q=80",
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1600&q=80",
  ],
};

const pick = (arr: string[], i: number, j = i + 1) => [arr[i % arr.length], arr[j % arr.length]];

/* Palette for varied descriptors */
const FINISHES = ["Matte Oak", "Walnut", "Whitewash", "Espresso", "Natural Teak", "Charcoal Ash"];
const COLORS   = ["Oak", "Walnut", "Ivory", "Charcoal", "Warm Beige", "Slate"];
const STYLES   = ["Modern", "Scandinavian", "Contemporary", "Industrial Loft", "Mid-Century", "Minimalist"];
const MATERIALS = ["Engineered Wood", "Solid Sheesham", "Solid Oak", "Solid Teak", "Rubberwood", "Metal + Wood"];

const v = <T,>(list: T[], i: number) => list[i % list.length];

/* ------------------------------------------------------------------ */
/*  Products (10 per category)                                          */
/* ------------------------------------------------------------------ */

type CatSpec = {
  cid: string;
  prefix: string;
  imgs: string[];
  names: string[];
  basePrice: number;
  priceStep: number;
  discount: number; // % base
};

const CATS: CatSpec[] = [
  {
    cid: "beds", prefix: "bd", imgs: IMG.bd,
    names: [
      "Aspen Upholstered King Bed", "Bower Queen Storage Bed", "Cove Low Platform Bed",
      "Drift Canopy King Bed", "Eddon Fluted Headboard Bed", "Forge Solid Oak Bed",
      "Grove Ivory Panel Bed", "Haven Walnut Queen Bed", "Iris Slat King Bed",
      "Juno Boucle Headboard Bed",
    ],
    basePrice: 32999, priceStep: 6000, discount: 45,
  },
  {
    cid: "wardrobes", prefix: "wd", imgs: IMG.wd,
    names: [
      "Marlow 3-Door Sliding Wardrobe", "Kyra Hinged Wardrobe", "Orion Walk-in Closet",
      "Selene Mirrored Wardrobe", "Thera 2-Door Wardrobe", "Uma Fluted-Front Wardrobe",
      "Vela 4-Door Sliding Wardrobe", "Wren Compact Wardrobe", "Xara Walnut Wardrobe",
      "Yara Loft Wardrobe",
    ],
    basePrice: 28999, priceStep: 7500, discount: 48,
  },
  {
    cid: "modular-kitchen", prefix: "kt", imgs: IMG.kt,
    names: [
      "Astra L-Shape Modular Kitchen", "Basel Straight-Line Kitchen", "Copen Island Modular Kitchen",
      "Dune Parallel Modular Kitchen", "Elm Base Cabinetry Set", "Fjord Under-Counter Sink Station",
      "Grove U-Shape Kitchen", "Halden Compact Kitchen", "Ivo Handleless Kitchen",
      "Juno Fluted Kitchen Island",
    ],
    basePrice: 89999, priceStep: 22000, discount: 42,
  },
  {
    cid: "tv-units", prefix: "tv", imgs: IMG.tv,
    names: [
      "Aster Wall-Mount TV Unit", "Halden Floor TV Console", "Linden Media Wall System",
      "Noor Compact TV Cabinet", "Odin Storage TV Unit", "Verse Modular TV Rack",
      "Wren Walnut TV Console", "Xen Slim TV Panel", "Yara Fluted TV Unit",
      "Zara Live-Edge TV Console",
    ],
    basePrice: 18999, priceStep: 5500, discount: 44,
  },
  {
    cid: "dining", prefix: "dn", imgs: IMG.dn,
    names: [
      "Harvest 6-Seater Dining Table", "Indie Round 4-Seater Dining", "Juno Extendable Dining Table",
      "Kettle 8-Seater Dining Set", "Linen Upholstered Dining Chairs (Set of 2)", "Marlo Dining Bench",
      "Nord 4-Seater Oak Table", "Ora Marble-Top Dining", "Pia Round Pedestal Table",
      "Quest Live-Edge Dining Table",
    ],
    basePrice: 18999, priceStep: 8500, discount: 46,
  },
  {
    cid: "wooden-cabinets", prefix: "wc", imgs: IMG.wc,
    names: [
      "Amber Oak Sideboard", "Bran Fluted Storage Cabinet", "Cedar Display Cabinet",
      "Dune Utility Cabinet", "Elm Tall Storage Unit", "Fern Ivory Cabinet",
      "Grove Louvered Cabinet", "Havn Walnut Sideboard", "Ivo Compact Cabinet",
      "Juno Glass-Front Cabinet",
    ],
    basePrice: 15999, priceStep: 4500, discount: 43,
  },
  {
    cid: "bookshelves", prefix: "bs", imgs: IMG.bs,
    names: [
      "Atlas Open Bookshelf", "Bower Ladder Shelf", "Copen Modular Bookshelf",
      "Dune Tall Bookcase", "Eddon Wall Bookshelf", "Forge 5-Tier Bookshelf",
      "Grove Corner Bookcase", "Halden Reading Wall", "Ivo Cube Bookshelf",
      "Juno Live-Edge Shelf",
    ],
    basePrice: 9999, priceStep: 3500, discount: 40,
  },
  {
    cid: "decorative-lights", prefix: "dl", imgs: IMG.dl,
    names: [
      "Arc Pendant Light", "Bower Rattan Pendant", "Copen Linear Chandelier",
      "Dune Paper Floor Lamp", "Eddon Brass Sconce", "Forge Industrial Pendant",
      "Grove Cluster Pendant", "Halden Marble Table Lamp", "Ivo Wall Sconce Set",
      "Juno Sculptural Floor Lamp",
    ],
    basePrice: 3999, priceStep: 1600, discount: 38,
  },
];

const generated: Product[] = [];
CATS.forEach((cat) => {
  cat.names.forEach((name, i) => {
    const price = cat.basePrice + i * cat.priceStep;
    const mrp = Math.round(price / (1 - cat.discount / 100));
    generated.push(
      p({
        id: `${cat.prefix}-${i + 1}-${name.split(" ")[0].toLowerCase()}`,
        name,
        collection: cat.cid,
        price,
        mrp,
        images: pick(cat.imgs, i, i + 1),
        material: v(MATERIALS, i),
        finish: v(FINISHES, i),
        color: v(COLORS, i),
        style: v(STYLES, i),
        featured: i === 0,
        new: i === 2 || i === 6,
        bestSeller: i === 1 || i === 4,
        trending: i === 0 || i === 3 || i === 8,
      }),
    );
  });
});

// Retain legacy sample products so any hardcoded slug (e.g. arc-pendant-light) resolves
const legacy: Product[] = [
  p({
    id: "arc-pendant-light",
    name: "Arc Pendant Light — Signature",
    collection: "decorative-lights",
    price: 6999,
    mrp: 12999,
    images: pick(IMG.dl, 0, 1),
    material: "Brass + Glass",
    finish: "Brushed Brass",
    color: "Warm Brass",
    style: "Contemporary",
    dimensions: "60 × 60 × 120 cm",
    featured: true, trending: true, bestSeller: true,
  }),
];

// Legacy sofas + study kept short so existing pages still work
const legacySofas: Product[] = [
  "Alba 3-Seater Modern Sofa", "Bosco Sculptural Lounge Chair", "Cove Modular Sectional Sofa",
  "Drift Boucle Armchair", "Eddon 2-Seater Loveseat", "Forge Leather Recliner",
].map((n, i) => p({
  id: `sf-${i + 1}-${n.split(" ")[0].toLowerCase()}`,
  name: n, collection: "sofas",
  price: 24999 + i * 8000, mrp: 46999 + i * 14000,
  images: pick(IMG.sf, i, i + 1),
  material: v(MATERIALS, i), finish: v(FINISHES, i), color: v(COLORS, i), style: v(STYLES, i),
  bestSeller: i === 0,
}));

const legacyStudy: Product[] = [
  "Atlas Compact Study Desk", "Brook Writing Desk", "Crest Executive Desk",
  "Dune Portable Laptop Table", "Elm Study Table & Chair Set", "Forge L-Shaped Corner Desk",
].map((n, i) => p({
  id: `st-${i + 1}-${n.split(" ")[0].toLowerCase()}`,
  name: n, collection: "study",
  price: 6999 + i * 4500, mrp: 12999 + i * 8000,
  images: pick(IMG.st, i, i + 1),
  material: v(MATERIALS, i), finish: v(FINISHES, i), color: v(COLORS, i), style: v(STYLES, i),
}));

export const products: Product[] = [...legacy, ...generated, ...legacySofas, ...legacyStudy];

/* ------------------------------------------------------------------ */
/*  Selectors                                                          */
/* ------------------------------------------------------------------ */

export const getProductsByCollection = (slug: string): Product[] =>
  products.filter((p) => p.collection === slug);

export const getFeaturedProducts = (): Product[] => products.filter((p) => p.featured);
export const getNewProducts = (): Product[] => products.filter((p) => p.new);
export const getTrendingProducts = (): Product[] => products.filter((p) => p.trending);
export const getBestSellers = (): Product[] => products.filter((p) => p.bestSeller);
export const getOffers = (min = 40): Product[] =>
  products.filter((p) => (p.discountPercent ?? 0) >= min);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getCollectionBySlug = (slug: string): Collection | undefined =>
  collections.find((c) => c.slug === slug);

export const getRelatedProducts = (productId: string, limit = 6): Product[] => {
  const product = products.find((p) => p.id === productId);
  if (!product) return [];
  return products.filter((p) => p.collection === product.collection && p.id !== productId).slice(0, limit);
};

export const searchProducts = (query: string): Product[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, p.description, p.collection, p.productCode, p.material, p.finish, p.color, p.style]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
};

/** Format an INR price with ₹ and locale grouping. */
export const formatPrice = (value: number): string =>
  `₹${value.toLocaleString("en-IN")}`;
