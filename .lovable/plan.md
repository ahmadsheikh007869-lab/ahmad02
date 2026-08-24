# Replace the featured modular kitchen product photo

Swap only the central image on the featured modular kitchen product card (currently "LuxeCraft U-Shape Modular Kitchen") for a newly generated, premium classic modular kitchen catalog photograph.

## What changes

- Generate one new high-resolution, photorealistic kitchen image:
  - Classic luxury U-shaped modular kitchen, full layout clearly visible
  - Panel-style wooden cabinet doors, warm walnut with cream/beige tones
  - Marble/quartz countertop, brass/gold hardware, built-in appliances
  - Luxury showroom setting, warm professional lighting, realistic shadows and reflections
  - No people, text, watermarks, or logos
- Replace the existing asset used by that product so the card, carousels and product page all pick up the new photo automatically.
- Keep the image in the same aspect ratio/dimensions so it fills the existing image area identically.

## What stays exactly the same

Card layout, borders, discount and "New" badges, price, MRP, rating, review count, product code, buttons, typography, product name, category, and every surrounding UI element.

## Technical notes

- Asset: regenerate `src/assets/kitchen-luxecraft-ushape.jpg` (4:5-friendly framing, high resolution). The import in `src/data/products.ts` stays untouched, so no code changes are required beyond the asset swap.
- If a second gallery image looks mismatched on the detail page, only the primary slot is touched; secondary images stay as-is unless you ask otherwise.
