
## Goal

Make every furniture category strictly self-contained — Sofas show only sofas, Beds only beds, Wardrobes only wardrobes, Modular Kitchens only kitchens. Front page leads with Modular Kitchen and removes sofa/bed imagery. Kitchen designs carry full dimension details. Product detail pages surface many related pieces from the same category so users can browse variations.

## What Changes for the User

### Home page (`/`)
- **Hero slider** replaced with a Modular Kitchen–only rotation (5 curated kitchen banners: island, L-shape, U-shape, parallel, handleless). No sofa or bed slides.
- **Featured Collections grid** replaced with 4 large tiles: `Modular Kitchen`, `Sofas`, `Beds`, `Modular Wardrobes` — each tile uses an image strictly from that category and links to its dedicated section.
- **Premium Collections strip** replaced with a single full-width "The Modular Kitchen" showcase (kitchen image only). Sofa and bed cover imagery removed from all home sections.
- Trending / New Arrivals / Best Sellers / Offers carousels remain but are drawn from the mixed catalog (as today) — they don't visually dominate the front page.

### Category pages (`/products?collection=<slug>`)
Four fully-populated dedicated sections, each showing only its own type:

| Section | Slug | Count | What appears |
|---|---|---|---|
| Sofas | `sofas` | 54 designs | Only sofa/sectional/loveseat/armchair photos |
| Beds | `beds` | 54 designs | Only bed/headboard/platform/canopy photos |
| Modular Wardrobes | `wardrobes` | 54 designs | Only wardrobe/closet/sliding-door photos |
| Modular Kitchen | `modular-kitchen` | 36 designs | Only kitchen layouts with chimney / fridge / cabinets |

The existing filter chip bar on `/products` continues to work; picking a chip narrows to that category only.

### Product detail page (`/product/:slug`)
- The existing "Related Products" section becomes **more prominent**: shows up to 16 related pieces from the same category (currently only a handful) so users can browse many variations of the design they clicked.
- **Kitchen designs** get a new **Dimensions block** in the info panel showing Length, Width, Height, Depth in cm (e.g. `L 3600 × W 2400 × H 2400 × D 600 cm`) plus a full paragraph describing the layout, cabinet configuration, chimney/hob/sink placement, and appliance provisions.
- Non-kitchen products keep the current single-line dimension string.

## What Changes in the Code (technical)

### `src/data/products.ts` — rebuilt
- **Curated image pools**: 12–18 vetted Unsplash IDs per category, each manually confirmed to depict only that furniture type. Pools: `SOFAS`, `BEDS`, `WARDROBES`, `KITCHENS`. Images rotate deterministically across the 50+ variants so each card shows a category-appropriate photo (some repetition of photos across variant names is acceptable and unavoidable at 50+ items; visual variety comes from the pool size).
- **Generators**:
  - `generateSofas()` → 54 sofa products (names like "Alba 3-Seater Modern Sofa", "Cove L-Sectional", "Bosco Boucle Armchair", etc.) with 6 style buckets × 9 fabric/finish variants.
  - `generateBeds()` → 54 beds (upholstered king/queen, platform, canopy, storage, fluted headboard, slat, etc.).
  - `generateWardrobes()` → 54 wardrobes (2/3/4-door sliding, hinged, mirrored, walk-in, fluted, walnut, ivory, etc.).
  - `generateKitchens()` → 36 kitchen designs across L-shape, U-shape, straight, parallel, island, peninsula, handleless, shaker layouts.
- **New optional field on `Product`**: `kitchenDims?: { lengthCm: number; widthCm: number; heightCm: number; depthCm: number }` — only populated for kitchen products.
- **Extended `longDescription`** for kitchens: layout narrative + cabinet count + chimney/hob/sink/fridge provision copy.
- Existing categories (`tv-units`, `dining`, `wooden-cabinets`, `bookshelves`, `decorative-lights`, `study`) keep their current products so other pages and legacy links don't break.
- `getRelatedProducts()` widened from its current small cap to return up to 16 items from the same collection.

### `src/data/heroSlides.ts` — rewritten
- All 5 slides become kitchen slides with strictly kitchen images. CTAs all point to `/products?collection=modular-kitchen` and `/about` (consult). No sofa/bed slides remain.

### `src/pages/Index.tsx` — edited
- `homepageCategoryIds` reduced to `["modular-kitchen", "sofas", "beds", "wardrobes"]` so the Featured Collections grid renders exactly these 4 dedicated tiles (kitchen tile first).
- `premiumCollections` array replaced with one kitchen-only entry rendered as a full-width band (no sofa/bed cards).
- No other section removed — carousels, reviews, why-us, FAQ, contact stay.

### `src/pages/ProductDetail.tsx` — small edits
- When `product.collection === "modular-kitchen"` and `product.kitchenDims` exists, render a new **Dimensions** panel (label chips for L / W / H / D in cm) above the existing details accordion.
- Related-products carousel already filters by same collection via `getRelatedProducts` — no logic change needed once the helper returns more items.

### Files touched
- `src/data/products.ts` (rebuild data + generators + kitchen dims field)
- `src/data/heroSlides.ts` (kitchen-only slides)
- `src/pages/Index.tsx` (featured tiles + premium band)
- `src/pages/ProductDetail.tsx` (kitchen dimensions block)

No route, auth, database, or backend changes. No new dependencies.

## Out of Scope
- Uploading real product photography (using curated Unsplash pools; you can later swap image URLs in `src/data/products.ts`).
- Reworking cart / checkout / admin flows.
- Adding a separate route per category — the existing `/products?collection=<slug>` pattern already gives each category its own dedicated page.
