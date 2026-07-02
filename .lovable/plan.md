
# Rizwan Furniture — Urban Ladder-Inspired Rebuild

Rebrand the existing Maison store into **Rizwan Furniture**: a premium, minimalist furniture e-commerce site with a monochromatic warm-oak palette, horizontal carousels on the homepage, and a fully-featured product detail page. Placeholders will be styled so real 4K product photos can be swapped in later without touching layout.

## 1. Brand & Design System

- Rename Maison → **Rizwan Furniture** across header, footer, meta tags, page titles.
- Refined monochromatic palette in `index.css` (HSL tokens):
  - Background: soft cream `#FAF7F2`
  - Surface / cards: warm ivory `#F2EDE4`
  - Foreground: deep espresso `#2A1F17`
  - Accent (CTAs, discount tags): light oak `#B08A5B`
  - Muted borders: `#E5DDD1`
- Typography: keep Cormorant Garamond for display headings, Inter for body/UI. Tight tracking on nav.
- Reusable pieces: rounded-sm CTAs, oak-underline nav hovers, subtle card hover-lift.

## 2. Header (Urban Ladder-style)

Replace current `Header.tsx` with three-row layout:
- Top bar: contact number + "Shop via Video Call" link.
- Main bar: **Rizwan Furniture** logo (left) · centered **search input** with icon (functional — filters `/products` by query param) · right-side icons for **Profile**, **Orders**, **Wishlist**, **Cart** (all with tooltips, cart/wishlist badges preserved).
- Category nav row: Home Interiors · Modular Kitchen · Wardrobes · Beds · Living · Dining · Study — each links to `/products?category=<slug>`.
- Mobile: collapsible drawer with search on top, categories listed below.

## 3. Product Data

Extend `src/data/products.ts`:
- Add categories matching the nav (tv-units, wardrobes, beds, modular-kitchen, dining, study, sofas-lounge).
- ~6–8 mock products per section with: name, price, mrp, discountPercent, category, image (placeholder styled tile), short description, dimensions, material.
- Keep the demo behavior: all product cards route to the single detail page (per project memory).

## 4. Homepage Sections (horizontal carousels)

Rebuild `pages/Index.tsx`:
1. **Hero banner** — full-width premium sofa scene, headline "FullHouse Fiesta — up to 70% OFF", subcopy, **SHOP NOW** CTA.
2. Reusable `<ProductCarousel title="…" products={…} />` built on existing shadcn `carousel.tsx` with visible left/right arrow buttons, snap scrolling, 4-up desktop / 2-up tablet / 1.2-up mobile. Each card shows image, title, **offer price**, struck-through MRP, and **XX% OFF** tag.
3. Sections in order: Explore TV Units · Explore Wardrobes · Explore Beds · Modular Kitchens & Dining · Explore Study Tables · Explore Lounge Chairs & Sofas.
4. Trust strip (Free delivery / Warranty / Video-call shopping) above footer.

## 5. Product Detail Page

Rewrite `pages/ProductDetail.tsx`:
- **Left**: main 4K image with interactive **magnifier lens** — a square overlay follows the cursor and a zoomed panel renders to the right (desktop) / below (mobile). Implemented with a small custom component using CSS background-position (no new deps). Thumbnail rail underneath.
- **Right column**:
  - Breadcrumbs, title, star rating, review count.
  - Price block: **Today's Deal Price**, MRP struck-through, **% OFF** tag, "No-cost EMI from ₹X/mo" line with a small calculator popover.
  - Quantity selector (+/-), **Pincode availability check** input with mock validation and delivery ETA response.
  - CTAs: **Buy Readymade** (adds to cart → /checkout) and **Book Now** (opens booking dialog for custom orders).
  - Payment options row: UPI (GPay / PhonePe / Paytm), Net Banking, Cards — as icon chips.
  - **Call to Order / WhatsApp** panel with phone number + WhatsApp deep link.
  - Trust badges row: Safe & Swift Delivery · Warranty · Shop via Video Call.
- **Below the fold**: Accordion (shadcn) with Description · Specifications (Width/Height/Depth/Material) · Care & Maintenance · Ratings & Reviews (mock reviews list with star average).
- Related products carousel at the bottom.

## 6. Supporting Pages

- `pages/Products.tsx`: category + search filtering via query params, sort dropdown, grid of cards.
- `pages/Cart.tsx` & `pages/Checkout.tsx`: keep existing behavior; restyle to match new palette and rename Maison → Rizwan Furniture.
- Footer: rename brand, adjust column copy for furniture categories, keep newsletter form.

## 7. SEO / Meta

- `index.html`: title "Rizwan Furniture — Premium Modern Furniture", meta description, og:title / og:description / twitter:card.

## Technical Notes

- Everything stays frontend-only. No backend changes; cart/wishlist remain Zustand+localStorage.
- Carousels use existing `embla-carousel-react` via `components/ui/carousel.tsx` — no new deps.
- Magnifier is a self-contained component (`components/ImageZoom.tsx`) using pointer events + CSS `background-image` + `background-position` on a square lens preview panel.
- Pincode check, EMI calc, Book Now dialog, WhatsApp link are UI-only mocks with toast feedback.
- Images are styled placeholder tiles (subtle gradient + product silhouette label) sized at 4:3 / 1:1 so real HD photos drop in as `<img src>` swaps later.
- All new colors go into `index.css` + `tailwind.config.ts` as HSL tokens; no hardcoded color classes in components.

## Rollout Order

1. Brand tokens + Header + Footer + meta.
2. Product data expansion + `ProductCarousel` component + Homepage rebuild.
3. `ImageZoom` component + Product Detail rewrite.
4. Products listing filters + Cart/Checkout restyle.

## Open Question

Would you like me to (a) implement the entire scope in one pass, or (b) ship it phase-by-phase (starting with brand + header + homepage carousels) so you can review before I move to the detail page and beyond?
