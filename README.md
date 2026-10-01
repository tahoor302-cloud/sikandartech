# SUPER MIMIC — Storefront

A luxury, cinematic commerce experience built with **Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger + Flip · Lenis**.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

> **Catalog status:** built from five source files in `data/source/`: the Super Mimic master (24), and four owner-supplied reference PDFs (clothing 16, bags 20, watches 36, footwear 26). `/catalog-audit` shows every count, every exclusion and why. **Store currency: USD.** Master prices were converted from PKR at 1 USD = 280 PKR, rounded to $5. Prices, sizes and copy for the PDF products are flagged `priceStatus: "proposed"` in each record's `provenance` for owner review.
>
> **Photography:** every product ships with original photorealistic studio imagery (WebP, 896×1120) generated for this catalog: a main shot per colourway, an alternate angle, a macro detail and a dark editorial still, plus four 16:9 hero campaign frames and three editorial banners (136 images in all). `data/media-manifest.json` maps product ID → name → price → images, and `scripts/media/manifest.txt` records the source generation for every file.

---

## 1. Reference analysis → how it's structured here

The reference WeShop storefront renders entirely client-side (JavaScript only), so its catalog couldn't be read automatically during this build. WeShop stores generally present a flat catalogue grouped into album-style categories. Each product post has a title, a price, an image gallery, and colours and sizes listed in free text. Super Mimic keeps that information model but normalises it into structured data:

| Reference concept | Super Mimic model |
|---|---|
| Store albums / groups | `Category` → `subcategory` from `data/taxonomy.json` (shoes · bags · watches · accessories live) + rule-based `Collection` (Originals, Street, Performance, Essentials, New Arrivals, Featured, All) |
| Product post | `Product`: name, brand line, category, collection, price, currency, description, details, specs, materials, care |
| Image gallery | `images[]` typed as `primary` (per colour) · `angle` · `detail` · `editorial` |
| Colours / sizes in text | `colors[]`, `sizes[]`, and a full `variants[]` matrix (sku, price, stock, availability) |

The UI never reads JSON directly. It goes through `lib/catalog` (see §4).

## 2. Design system

**Palette:** ivory `#F4EFE6`, ivory-2 `#EDE6DA`, bone `#E4DBCC`, beige `#D6C9B4`, champagne `#C8B28A` (light `#E3D4B4`, deep `#9A8057`), mist `#8C857A`, graphite `#3B3936`, charcoal `#242321`, ink `#0F0E0D`. Gold is used only for hairlines, progress and state. It never fills large areas.

**Type:** Cormorant Garamond (display, 300 weight, italics for accent), Manrope (UI and body), IBM Plex Mono (indices and eyebrows). The wordmark is wide-tracked Cormorant caps. Tokens live in `app/globals.css` under `@theme` (e.g. `text-display-xl`, `ease-luxe`, `--spacing-section`).

**Mark:** two mirrored champagne arcs forming an "S" (`components/ui/logo.tsx`). *Mimicry as symmetry.*

**Motion tokens** (`lib/motion.ts`): UI 320 ms · content 800 ms · hero 1.4–1.6 s. Easing: `power3.out`, `power4.out`, `expo.out`. Only `transform`, `opacity`, `clip-path` and `filter` are animated. `prefers-reduced-motion` disables smooth scroll, parallax, pinning and reveals.

## 3. Page architecture

```
/                       Home: hero → featured collection → signature pinned scroll → new arrivals
                              → editorial story → category showcase → featured (Flip tabs)
                              → brand statement → membership → footer
/collections            Collection index           /collections/[slug]   Collection landing + filters
/categories             Category index             /categories/[slug]    Category landing + filters
/products               All products: server-side pagination, filters, sort, search (?q=, ?page=)
/category/[slug]        Category (e.g. /category/shoes)   /category/[slug]/[sub]  Subcategory (/category/shoes/sneakers)
/product/[id]           PDP by permanent ID (/product/SM-000001); slugs and source IDs 301 to it
/catalog-audit          Data-quality report + JSON/CSV export (dev, or CATALOG_AUDIT=1; noindex)
/search?q=              Results                    /cart  /checkout (demo)  /wishlist  /account  /about
/info/[slug]            shipping · returns · privacy · terms · contact
/api/products           GET list, or a page with ?page=&per=   /api/products/[id]   /api/search?q=   /api/catalog-audit?format=json|issues.csv|ledger.csv
```

```
app/                     routes (server components fetch data → client "views")
components/
  animations/            smooth-scroll (Lenis), reveal, mask-text, parallax, clip-image,
                         scrub-words, magnetic, cursor, page-transition
  navigation/            navbar (+ mega menu), mobile-menu
  hero/                  hero, hero-media (Ken Burns / video layers)
  home/                  homepage sections
  product-card/          product-card, wishlist-button
  products/              product-grid (batch reveal + Flip), purchase-panel, quick-view, product-view
  product-gallery/       gallery (rail + stack, hover zoom, lightbox, mobile swipe)
  collection/            collection-view, filters, sort-select
  cart/  search/  pages/  layout/  ui/
data/                    products.json, categories.json, collections.json, site.ts, pages.ts
lib/                     types, catalog/, filters, product helpers, store/ (cart, wishlist, ui), motion
hooks/                   use-gsap, use-media, use-lock-scroll, use-escape, use-ambient-sound
scripts/                 build-catalog, import-catalog, lib/catalog-pipeline, media/ (photo record, hero composites)
tests/                   catalog integrity + contamination + scale tests
```

## 4. Catalog pipeline (source → permanent IDs → validated storefront)

```
data/source/*.json ─┐                         ┌─ data/products.json      (valid products only)
data/taxonomy.json ─┼─ npm run catalog:build ─┼─ data/categories.json    (only non-empty categories, with counts)
data/id-registry.json (append-only) ◀──────────┼─ data/catalog-report.json (/catalog-audit, exportable)
data/hero-plan.json ┘                         └─ data/hero.json          (hero captions/links from real products)
```

- **Permanent IDs:** each `source:sourceId` gets `SM-000001`, `SM-000002`, … in `data/id-registry.json`. IDs never change and are never reused, even if a record is removed (it's listed as *retired*). `sourceId` stays on every product.
- **One record in → one product out:** `normalize()` deep-copies a single source record, so no field can come from another product. Variant IDs are `<ID>-<colour>-<size>`. At runtime the catalog is deep-frozen.
- **Validation** (`scripts/lib/catalog-pipeline.mjs`): required title, price, description, category; category and subcategory must exist in the taxonomy; every image must sit in that product's own `/media/products/<slug>/` folder (or be an https URL) and exist on disk; image and variant colours and sizes must belong to the product; IDs, source IDs, slugs, SKUs and image paths must be unique. Records with errors are **held back** from the storefront and listed on `/catalog-audit`.
- **Tests:** `npm test` runs 61 tests. They cover a field-by-field source→product trace for every record, contamination checks, ID stability, validator rejections, and a 5,000-record in-memory scale test for pagination, filters and ID search.
- **End-to-end QA:** `tests/e2e/preview-qa.mjs` (Playwright) checks every category and subcategory, two PDPs per category, search, sort, filters, pagination, the bag and the audit, on desktop and mobile. 74 checks.
- **Excluded sources** are declared in `data/source-exclusions.json` and shown on `/catalog-audit`.
- `npm run build` runs `catalog:check` first and fails if any record is invalid.

**Import an authorised dataset:**

```bash
npm run catalog:import path/to/export.csv -- --source my-feed --authorised "Owner / licence"   # CSV: one row per variant (data/import-template.csv)
npm run catalog:build
npm test
```

| Column | Required | Rule |
|---|---|---|
| `source_id` | yes | stable ID from your system |
| `name`, `price`, `currency` | yes | exact values; no defaults are applied |
| `category` | yes | shoes · bags · watches · jewelry · clothing · accessories · fragrance · travel · other |
| `subcategory` | recommended | must exist under the category in `data/taxonomy.json` |
| `description` / `short_description` | one of | written for that product |
| `image_primary` (per colour row) | yes | `/media/products/<handle>/…` (put the files in `public/`) or an https URL you own |
| `image_angle`, `image_detail`, `image_editorial` | optional | hover, detail and lifestyle shots |
| `color`, `color_hex`, `size`, `sku`, `stock` | per variant | colours and sizes must belong to the product |
| `product_type`, `collection`, `line`, `materials`, `details`, `care`, `spec:*`, `featured`, `new_arrival`, `trending`, `created_at` | optional | lists are separated with `;` |

## 5. Catalog & data layer

- `lib/types.ts` is the contract (`Product`, `ProductVariant`, `ProductImage`, `Category`, `Collection`, `ProductQuery`, `CartLine`).
- `lib/catalog/source.ts` defines `CatalogSource`. It has two implementations:
  - `local.ts` reads `/data/*.json` (default)
  - `api.ts` reads a remote backend. Set `CATALOG_SOURCE=api` and `CATALOG_API_URL=…`, then map fields in `normalize()`.
- `lib/catalog/client.ts` is browser access through `/api/*`, so the full catalog is never shipped to the client (quick view, search and wishlist fetch on demand).
- Filtering and sorting (`lib/filters.ts`) are pure functions shared by server, API and UI. Collection filters are URL-synced (`?category=watches&color=noir&size=42&max=50000&sort=price-asc`).

**Import your authorised catalog:**

```bash
npm run catalog:import path/to/export.csv    # one row per variant, see data/import-template.csv
npm run catalog:import path/to/export.json   # already in Product shape
```

Rows sharing a `handle` merge into one product. Extra `spec:<Name>` columns become specifications. The importer validates categories, prices and images.

## 6. Media

**Reference-PDF imports** (`scripts/importers/reference_pdfs.py`, `reference_pdfs_2.py`, mappings in `data/imports/*.json`, original PDFs in `data/imports/originals/`): every page title is checked against the PDF text before import; duplicated/mis-titled pages and pages showing third-party logos are recorded in `data/source-exclusions.json`.

**Image restoration** (`scripts/media/upscale.py`, `enhance_batch.py`): a torch-free NumPy implementation of Real-ESRGAN (compact, `realesr-general-x4v3`, BSD-3-Clause, weights in `scripts/media/models/`). Photos are trimmed of PDF page margins and separator lines, upscaled ×4, blended 15% with a Lanczos resize to stay faithful, capped at 1600 px (1800 px for the original master shots) and saved as WebP q90.

## 6b. Media files

- **Product images:** `public/media/products/<slug>/` holds `01-primary-<colour>.webp` (one per colourway, used on cards and when a colour is selected), `02-angle.webp` (the card hover image), `03-detail.webp` and `04-editorial.webp`. To replace any shot with your own photography, overwrite the file or change its `src` in `products.json`. `next/image` serves responsive AVIF/WebP with lazy loading. For a CDN, add its host to `remotePatterns` in `next.config.ts`.
- **Hero film / UGC:** edit `heroScenes` in `data/site.ts`. Set `type: "video"`, `src` (16:9 MP4/WebM, ≤ 8 MB, muted), `mobileSrc` (9:16) and `poster`. Only the active scene's video plays, and it pauses when the tab is hidden.
- **Sound:** `heroAudio.src` accepts a licensed ambient track. If it's empty, a very soft generative WebAudio pad is used. Sound never autoplays and only starts on the SOUND ON toggle.

## 7. Commerce hooks to connect

| Where | What to replace |
|---|---|
| `components/products/purchase-panel.tsx` → `add()` | Cart API (Shopify Storefront, Medusa, custom) |
| `components/pages/checkout-view.tsx` → `placeOrder()` | Payment/order provider (Safepay, PayFast, Stripe, COD workflow) |
| `components/home/membership.tsx`, footer form | Email service (Klaviyo, Mailchimp, Resend) |
| `components/pages/account-view.tsx` | Auth (NextAuth, Clerk, Shopify customer accounts) |
| `lib/store/*` | Local persisted stores. Swap for server carts when ready |
| `data/site.ts`, `data/pages.ts` | Shipping thresholds, policies, contact. **The template copy needs review.** |

## 8. Performance notes

- Server components fetch data. Pages are statically generated with `generateStaticParams`.
- There is one rAF loop: Lenis is driven by `gsap.ticker`. ScrollTrigger reveals are batched for large grids. `gsap.matchMedia` limits pinning and parallax to desktop.
- Overlays animate `translate`/`opacity`/`clip-path` only. Hidden panels are set `visibility:hidden` so they cost nothing and can't be focused.
- Fonts come through `next/font` (self-hosted, `display: swap`). Images use `next/image` with `sizes`.

## 9. Preview build

`preview/` contains a static hash-router harness that renders the same components with lightweight stand-ins for `next/link`, `next/image` and `next/navigation`. It was used to verify the UI in a sandbox without Next.js. It isn't needed for production, so you can delete the folder.
