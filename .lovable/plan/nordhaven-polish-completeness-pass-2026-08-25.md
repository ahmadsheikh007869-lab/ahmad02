# Nordhaven — Polish & Completeness Pass

Keeps the current warm oak/cream palette, serif+Inter typography and layout language. Only polish, missing content and credits are added.

## 1. Footer additions
- New bottom strip: "Designed & Developed by Mohd Ahmad — Full-Stack Developer" linking to a portfolio/LinkedIn URL (placeholder constant, easy to swap).
- Quick links row: About, Contact, Privacy Policy, Terms.
- Social icons: GitHub, LinkedIn, Instagram (replacing the current Instagram/Facebook pair), pointing at placeholder profile URLs.

## 2. Privacy & Terms pages
New `/privacy` and `/terms` routes with concise demo-appropriate copy in the existing page layout, so footer links are no longer dead.

## 3. About page
Adds a short brand story block (2–3 lines, premium modular furniture positioning) and a tasteful note card: "This is a demo project built to showcase full-stack e-commerce development skills." Existing hero, philosophy, values and CTA stay.

## 4. Contact / phone number
- Replace `527717` with `+91-98765-43210` in the single contact config, so header, footer, contact page, floating button, WhatsApp and `tel:` links all update.
- Label it "Demo Contact" in the Contact page and footer.
- Contact page already has a Name/Email/Phone/Message form — verified working, left as is apart from the label.

## 5. Trust badges on homepage
A compact 4-up strip: Secure Payment, Free Delivery, Easy Returns, 5-Year Warranty — icon + label, thin dividers, placed directly under the hero. Existing "Why Choose Us" section stays (longer-form), so the new strip is styled deliberately lighter to avoid feeling duplicated.

## 6. Demo Login / Admin labelling
Header top bar: "Login" becomes "Demo Login" and "Admin" becomes "Demo Admin", each with a tooltip explaining it is a demo auth flow. Same treatment in the mobile menu. Routes stay functional.

## 7. Product cards
- Hover: subtle scale-up of the image plus a soft elevation shadow on the card (transform-based, GPU-friendly).
- Loading skeleton: a shimmering placeholder behind each product image until `onLoad` fires, so grids no longer show blank boxes.
- Discount badge consistency: one shared badge style, single placement (top-left), and the duplicate "% OFF" text in the price row is removed so badges never collide with the NEW tag or wishlist button.

## 8. Breadcrumbs
Product detail already has a breadcrumb trail; it is upgraded to the shared breadcrumb component pattern (Home > Category > Product) with proper `nav`/`aria-label` semantics, and the same trail is added to the category listing page (Home > Category).

## 9. Performance & responsiveness
- Audit product thumbnails for broken/placeholder image entries and remap any found to valid category images.
- `loading="lazy"` + `decoding="async"` on all below-the-fold imagery; hero image marked eager/high priority.
- Route-level code splitting via `React.lazy` for non-critical pages (About, Contact, Cart, Checkout, Auth, Account, Admin, Privacy, Terms) with a light suspense fallback.
- Verify hamburger nav on small screens and 2-column mobile product grid (both already implemented) with a mobile-viewport screenshot pass, and fix anything that overflows.

## 10. SEO & favicon
- `index.html` title: "Nordhaven — Premium Modular Furniture | Designed by Mohd Ahmad", matching description plus og/twitter title and description.
- Favicon: regenerate `public/favicon.png` from the existing "N" brand mark so the tab icon matches the header logo.

## Technical notes
- Files touched: `src/components/Footer.tsx`, `src/components/Header.tsx`, `src/components/ProductCard.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx`, `src/pages/Products.tsx`, `src/pages/ProductDetail.tsx`, `src/pages/Index.tsx`, `src/App.tsx`, `src/config/contact.ts`, `index.html`, plus new `src/pages/Privacy.tsx`, `src/pages/Terms.tsx`, `src/components/TrustBadges.tsx` and a small `src/config/developer.ts` for the credit/social URLs.
- No data-model, backend or auth logic changes.
- Placeholder social/portfolio URLs live in one config file for a one-line swap later.
