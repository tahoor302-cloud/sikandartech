# SUPER MIMIC — Redesign Handoff

This archive is the **complete, working SUPER MIMIC storefront** as of 1 October 2026: source code, catalog data, every image and video, tests and build scripts. Hand it to a designer or developer (or another AI chat) as the starting point for a redesign.

## 1. Run it

```bash
npm install
npm run dev            # http://localhost:3000
npm test               # 159 catalog / query tests
npm run build && npm start
```

Requirements: Node 20+. No database or API keys are needed, because the catalog is local JSON.

## 2. Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4: tokens live in `app/globals.css`
- GSAP + ScrollTrigger + Flip for animation; Lenis for smooth scroll

## 3. Current design language (what a redesign would replace)

- **Palette:** ivory `#F4EFE6`, ivory-2, champagne / champagne-deep (gold accents), graphite, mist, ink `#0F0E0D`, charcoal.
- **Fonts:** Cormorant Garamond for display and wordmark; Manrope for UI and body; IBM Plex Mono for eyebrow labels.
- **Feel:** quiet luxury. Large serif headlines, generous spacing, hairline borders, slow ease-out motion, masked text reveals.
- **Logo:** the official Supermimic logo is in `public/brand/` (`supermimic-logo*.png`, black and white versions). The component is `components/ui/logo.tsx`. Keep the artwork as-is: do not redraw or distort it.

## 4. Site map

| Route | File |
|---|---|
| `/` home | `app/page.tsx` → `components/home/home-view.tsx` |
| `/products`, `/category/[slug]`, `/category/[slug]/[sub]`, `/collections/[slug]` | `components/collection/collection-view.tsx` |
| `/product/[id]` (ID format SM-000001) | `components/products/product-view.tsx` |
| `/cart`, `/checkout`, `/wishlist`, `/account`, `/about`, `/search`, `/info/[slug]` | `components/pages/*` |
| `/catalog-audit` (internal catalog report) | `components/pages/audit-view.tsx` |

**Homepage sections, in order (`home-view.tsx`):**

1. Hero: full-screen video `public/media/hero/film.mp4/.webm` with a Sound toggle, "SUPER MIMIC" headline and two buttons
2. Featured collection ("The Originals Edit")
3. Signature scroll (pinned "Four principles" sequence)
4. New arrivals
5. Category showcase ("Shop by object"), which includes the **3D cloning scroll-scrub film** (`components/home/clone-scrub.tsx`, `public/media/clone/`)
6. Trending now
7. Editorial story
8. Category rails
9. Featured objects
10. All-products CTA ("122 objects. One house.")
11. Brand statement
12. Membership

**Global layer:** `components/layout/providers.tsx` holds the navbar, footer, cart drawer, search overlay, quick view, page-transition curtain, custom cursor, and the **full-screen opening film** (`components/intro/intro-video.tsx`, `public/media/intro/intro.mp4`). The opening film plays once per browser session, can be skipped, and fades to the site.

## 5. Content and data

- **122 products, 0 invalid**, across shoes, bags, watches, clothing and accessories. The data lives in `data/products.json`, built from `data/source/*.json` by `npm run catalog:build`.
- **Product IDs:** every product has a permanent ID (SM-000001 …) recorded in `data/id-registry.json`. Never renumber them.
- **Prices are hidden site-wide:** `site.showPrices = false` in `data/site.ts`. The currency is USD.
- **Site settings:** navigation, copy, hero, intro and shipping text are in `data/site.ts` and `data/pages.ts`.
- **Product images:** in `public/media/products/<slug>/`. Each product has a primary photo per colour, plus angle, detail and editorial shots.

## 6. Rules to keep in any redesign

- **Authorised content only.** Do not add replica or branded listings, trademarked logos, or third-party catalog content. `data/source-exclusions.json` lists everything that was excluded and why.
- **Typography QA.** No overlapping, clipped or merged text at desktop, laptop, tablet or mobile, including 320px-wide phones. Long text must wrap.
- **Media.** Keep videos at their current quality, with no player controls on the decorative videos.

## 7. Notes

- `preview/` is a static preview build used for the hosted demo. It is not needed for the real site.
- Large originals (source videos, raw reference PDFs) and the AI upscaler weights are not included, to keep the archive small. Everything the site needs to run is included.
- See `README.md` for the full architecture, the catalog pipeline and the import guide.
