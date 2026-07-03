# Phase 2 — Premium Homepage

Scope confirmed: **homepage + header/footer only**, 12 products × 8 core categories, Call/WhatsApp wired to a placeholder constant you can edit.

## 1. Config & data

- `src/config/contact.ts` — single source of truth: `PHONE = "+91 98765 43210"`, `WHATSAPP = "919876543210"`, `EMAIL`. Header buttons and Footer read from here; edit one line to change everywhere.
- `src/data/products.ts` — expand to **96 products** across 8 categories, each with distinct name / material / finish / color / style / price / MRP / rating / reviewCount / isNew / isBestSeller / isTrending flags:
  - Beds, Wardrobes, Modular Kitchens, TV Units, Dining Tables, Wooden Cabinets, Bookshelves, Decorative Lights.
- `src/data/categories.ts` — the 8 categories with icon + tile gradient for the Featured Categories grid.
- `src/data/heroSlides.ts` — 5 hero slides (Premium Beds, Modular Kitchens, Wardrobes, Wooden Interiors, Festive Offers) with headline, sub, CTA, background gradient.
- `src/data/reviews.ts`, `src/data/faqs.ts`, `src/data/whyUs.ts` — content for those sections.

## 2. Header (`src/components/Header.tsx`)

Sticky, three-row on desktop, condensed on mobile:

- **Top bar**: "Free shipping on ₹10,000+" · Call button (`tel:`) · WhatsApp button (`wa.me`) · Login · My Account (both open a "Coming soon" toast for now).
- **Main bar**: Logo · **Live search** (see §3) · Wishlist · Cart.
- **Category bar**: horizontal nav of the 8 categories → smooth-scrolls to that carousel on `/`, or navigates to `/products?category=slug` elsewhere.
- **Mobile**: hamburger → `Sheet` drawer with the same links, search, contact buttons.
- Sticky with subtle shadow on scroll (IntersectionObserver on a sentinel div).

## 3. Live search (`src/components/LiveSearch.tsx`)

- Controlled input; on each keystroke filters `products` by name / category / code / material / finish / color / style (case-insensitive substring match).
- Dropdown panel (Radix Popover) shows up to 8 results with thumbnail tile, name, category, price. "No results found" empty state. Enter → `/products?q=...`. Click result → product detail.
- Debounced 120ms, keyboard nav (↑/↓/Enter/Esc).

## 4. Homepage sections (`src/pages/Index.tsx`)

Ordered exactly:

1. **Hero slider** — new `HeroSlider.tsx` using existing `embla-carousel-react` + `embla-carousel-autoplay`. Auto-advance 6s, loop, prev/next arrows, pagination dots, touch/swipe, Ken-Burns background, fade-up headline.
2. **Featured Categories** — 8-tile responsive grid (4/3/2 cols), oak-gradient tile with category name and item count, hover-lift, links to `/products?category=slug`.
3. **Trending Products** — carousel of `isTrending` items.
4. **New Arrivals** — carousel of `isNew` items.
5. **Best Sellers** — carousel of `isBestSeller` items.
6. **Premium Collections** — 3 large editorial cards (Bedroom, Kitchen, Living) linking to filtered listings.
7. **Today's Offers** — carousel of items with `discountPercent >= 20`, with a slim countdown strip (ends midnight, purely visual).
8. **Customer Reviews** — 3-up testimonial grid on desktop / carousel on mobile, with avatar initial, star rating, quote.
9. **Why Choose Us** — 4 feature tiles (Handcrafted, 10-yr Warranty, Free Delivery, Design Consult).
10. **FAQ** — shadcn `Accordion`, 6 questions.
11. **Contact** — split panel: left copy + Call/WhatsApp/Email buttons, right simple inquiry form (name/phone/message → toast "We'll be in touch"; no backend).
12. **Footer** — 4-column (Brand, Shop, Support, Contact) + newsletter input + social icons + legal row. Reads phone/email from `contact.ts`.

All carousels use the existing `ProductCarousel`. Responsive slidesPerView 5 desktop / 3 tablet / 2 mobile (updated from current values), snap scrolling, arrows on hover, touch-drag.

## 5. Product card polish (`ProductCard.tsx`)

Add: product code line, star rating + review count, share button (Web Share API + copy-link fallback), Quick View (opens a Dialog with image + summary + Book Now/Buy Now), Book Now button alongside existing View Details. Keep wishlist button. All hover animations via existing `hover-lift` and `image-reveal` utilities.

## 6. UX polish

- Skeleton loaders on hero and each carousel for a 300ms artificial delay on first mount so the pattern is in place for future async data.
- Route-level `Suspense` fallback (skeleton hero).
- `loading="lazy"` and `decoding="async"` on every non-hero tile.
- Reduce-motion respected via `prefers-reduced-motion` in autoplay/Ken-Burns.

## 7. Responsive verification

Manually check breakpoints 375 / 768 / 1024 / 1440 with Playwright screenshots after build. Fix overflow, spacing, and font-size regressions before closing the phase.

## Out of scope (next phases)

- Category listing pages, filters, sorting UI → Phase 3.
- Real auth, backend, checkout logic → Phase 5+.
- Real product photography — placeholder oak-gradient tiles remain; swappable via a single `image` field per product.

## Technical notes

- No new deps; `embla-carousel-autoplay` is already available via `embla-carousel-react` peer. If missing, add with `bun add embla-carousel-autoplay`.
- No hardcoded colors — all tokens from `index.css` (`--oak`, `--cream`, `--espresso`, etc.).
- All new components typed, under 200 lines each, colocated in `src/components/`.
- Verify with `bun run build` and a Playwright pass on `/` at 3 viewports.
