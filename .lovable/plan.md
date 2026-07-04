# Phase 3 — Product Detail, Booking & Contact

Scope is homepage-plus-detail experience polish. No backend/DB — bookings are stored in `localStorage` and confirmed via WhatsApp deep-link (per your flow).

## 1. Switch every contact number to 6394249533

Update `src/config/contact.ts` once — everything else already reads from it:

- `phone` → `+91 63942 49533`
- `phoneTel` → `+916394249533`
- `whatsapp` → `916394249533`

Sweep the codebase for any remaining hardcoded `9876543210` (currently in `ProductDetail.tsx`) and replace with `CONTACT` helpers.

## 2. Product Detail Page upgrades (`src/pages/ProductDetail.tsx`)

Keep existing structure; add:

- **Fullscreen image lightbox** — click main image → shadcn `Dialog` with keyboard arrows and swipe.
- **Rich specs table** — extend `Product` with optional `specs` block (Material, Board, Laminate, Hardware, Handle, Glass, Finish, Color, Available Colors, W×H×L, Thickness, Weight, Manufacturing/Delivery/Installation time, Warranty, Care, Customisable Y/N). Fall back to sensible defaults per category so all 100 products render cleanly.
- **Action bar**: Book Now · Order Now · Buy Now · Add to Cart · Wishlist · Compare · Share. Share = native Web Share API with copy-link fallback. Compare toggles product into a `useCompare` zustand store (see §5). All actions have hover/tap micro-animations.
- **Related / Similar / Frequently Bought Together** — three carousels driven by `collection` + `style` + price bucket.
- **Recently Viewed** — carousel at the bottom, powered by `useRecentlyViewed` (§5). Push current product on mount.
- **Reviews** — existing static list + a review-submission form (name, rating, text) stored in `localStorage` per product; new reviews appear instantly.
- **Pricing block** already shows MRP strike-through, discount %, offer tag — add a subtle "Limited-time offer — ends midnight" strip when `discountPercent >= 30`.
- Keep pincode checker, EMI dialog, payment badges, trust badges — these already satisfy the spec.

## 3. Booking flow (`src/components/BookingDialog.tsx` — new)

Reusable dialog opened from Book Now / Order Now on the detail page and from product cards' Book Now.

- Fields: Full Name (required, ≥2 chars), Mobile Number (required, /^[6-9]\d{9}$/). zod schema, inline errors.
- Auto-captured: product name, id, price, ISO booking date, `crypto.randomUUID()` bookingId.
- On submit:
  1. Validate → toast error on fail.
  2. Persist `{ bookingId, name, phone, product, price, ts }` to `localStorage["rf.bookings"]`.
  3. Toast success "Booking confirmed — redirecting to WhatsApp…".
  4. After ~700 ms, `window.location.href` = pre-filled `https://wa.me/916394249533?text=…` with the exact message template from the brief.

## 4. Floating contact stack (`src/components/FloatingContact.tsx` — new)

Rendered inside `Layout`, so it appears on every page.

- One primary FAB (bottom-right) — clicking opens a small popover with two clearly labelled actions:
  - **Call** → `tel:+916394249533`
  - **WhatsApp** → `https://wa.me/916394249533`
- Second, always-visible WhatsApp pill just above the FAB for one-tap access on mobile (spec calls for a dedicated WhatsApp button too).
- Framer-motion entrance + subtle pulse ring on WhatsApp; respects `prefers-reduced-motion`.
- Hidden on `/checkout` to avoid overlapping the sticky order summary on mobile.

## 5. New client stores / hooks

- `src/hooks/useCompare.ts` — zustand + `persist`, max 4 items, `toggle/clear/has`.
- `src/hooks/useRecentlyViewed.ts` — zustand + `persist`, max 8, dedupes, most-recent-first.
- `src/components/CompareBar.tsx` — fixed bottom strip (like Amazon/Pepperfry) when ≥2 products selected: thumbnails + "Compare (N)" → opens a Dialog with a side-by-side spec table.

## 6. Contact page (`src/pages/Contact.tsx` — new, routed at `/contact`)

Two-column premium layout:

- Left: brand paragraph, business hours (Mon–Sat 10:00–20:00, Sun 11:00–18:00), phone (click → Call/WhatsApp popover), WhatsApp button, email placeholder (`hello@rizwanfurniture.com`), address, embedded Google Maps `<iframe>` (Bengaluru placeholder; single `MAP_EMBED_URL` constant near the top so it's a one-line swap).
- Right: contact form (name, phone, email, subject, message) with zod validation → toast + reset. No backend; add a note "Your message opens WhatsApp with these details" and pre-fill wa.me on submit as the effective delivery.
- Add `/contact` to `src/App.tsx` routes and link it from Header (desktop utility bar) and Footer.

## 7. Small polish

- `ProductCard.tsx` — add small Compare toggle + Share icon next to wishlist heart; Book Now button opens `BookingDialog`.
- `ScrollToTop` already handles route scroll — no change.
- All new images use `loading="lazy"` `decoding="async"`.
- Verify with `bun run build` and a Playwright pass on `/`, `/product/arc-pendant-light`, `/contact` at 375 / 768 / 1440.

## Out of scope (next phase)

- Real auth, real payments, server-side booking storage.
- 360° product view (spec says optional — skipping).
- Real product photography.

## Technical notes

- No new deps — zustand, framer-motion, zod, shadcn Dialog/Popover already present.
- No hardcoded numbers/colors — everything reads from `CONTACT` and `index.css` tokens.
- New components typed and under 200 lines each.
