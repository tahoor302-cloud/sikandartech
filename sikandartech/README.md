# SikandarTech.com

Static website (HTML + CSS + vanilla JS, no framework and no build step needed to run) for SikandarTech:
advanced tech and gadgets sourced from China. White theme, self-hosted fonts, scroll and pointer motion
that respects `prefers-reduced-motion`.

## Pages
Every important page has its own crawlable URL, metadata, canonical link and structured data.
- `index.html`: home (hero, featured products, categories, showroom, drone story, route network, about, community, contact).
- `shop/`: full catalogue with search (typo tolerant), availability filter, sorting, quick view, save and quote list.
  Filtered views use the query string (`?q=drone`, `?status=coming`, `?sort=az`) and are marked `noindex`.
- `category/<category-id>/`: one page per category (24), with the category's products in the HTML.
- `product/<product-id>/`: one page per product (647): photo, highlights, quantity + quote list, overview,
  specifications, sourcing & shipping, FAQ, related products, printable spec sheet, Product/Breadcrumb data.
- `ugc.html`: community feed and the "Share your setup" form.
- `shipping-returns/`, `privacy/`, `terms/`: policy pages. Text marked **[TO COMPLETE: …]** (yellow on the
  page) needs your business details before launch.
- `404.html`: not-found page with search.
- `products.html` and `product.html` only redirect old links (`?cat=`, `?id=`) to the new URLs.

Pages under `shop/`, `category/`, `product/` and the policy folders are **generated**: do not edit them by hand.
Run `python3 catalog-src/build.py` after any change to products, `catalog-src/pages.py` (page templates,
header, footer, policy text) or photos. The build also rewrites the shared header and footer inside
`index.html` and `ugc.html` (between the `@header` / `@footer` markers) and regenerates `sitemap.xml`.

## How buying works
SikandarTech sells on quotation, so there are no online prices or checkout. The bag icon is a
**quote list**: visitors add products and quantities and send the whole list as one WhatsApp message.
The heart icon saves products. Both are stored in the visitor's browser (localStorage).

## Files
- `script.js`: **site settings** (`CONTACT` block: WhatsApp, WeChat, phone, email, socials), header/menu, scroll reveals, contact form
- `product-info.js`: product detail content (spec labels, sourcing details, ideal-for, FAQ)
- `product.js`: product detail page
- `shop-core.js`: product art/cards, product popup, saved items, quote list drawer, toasts
- `home.js`, `shop.js`, `ugc.js`: page scripts
- `ugc-data.js`: community posts (`UGC_ITEMS`) and the upload backend URL (`UGC_ENDPOINT`)
- `catalog.js` / `icons.js`: generated product data and icons (do not edit by hand)
- `catalog-src/pages.py`: page generator (templates, header, footer, policy pages, sitemap)
- `catalog-src/*.txt`: the product list, one line per product: `Name | icon | status | description | spec; spec; spec`
  (status: `A` available now, `C` coming soon, `E` emerging technology)
- `style.css`: design system and all styles
- `fonts/`: Unbounded, Inter, JetBrains Mono (SIL Open Font License, see `fonts/LICENSE-*`)

## Editing products
1. Edit the `.txt` files in `catalog-src/`.
2. Get the icon set once (Tabler Icons, MIT): `npm pack @tabler/icons && tar xzf tabler-icons-*.tgz && mv package/icons/outline catalog-src/tabler-outline && rm -rf package tabler-icons-*.tgz`
3. Run `python3 catalog-src/build.py` to regenerate `catalog.js`, `icons.js`, all generated pages and `sitemap.xml`.

## Photos
All remaining product prompts: `PRODUCT-PHOTO-PROMPTS.md` / `product-photo-prompts.csv` (regenerate with `python3 catalog-src/make-prompts.py`).
Every product and category now has a photo. See **`IMAGE-PROMPTS.md`** for the original prompts.
- Product photo: `images/products/<product-id>.webp` (1200×1200), then run the build.
- Category photo: `images/categories/<category-id>.jpg`, then run the build.
- Hero photo: `images/hero/hero.webp` (referenced directly in `index.html`).
- About photo: `images/about.jpg` (4:5).

## Community uploads
`UGC_ENDPOINT` in `ugc-data.js` is empty, so the "Share your setup" form does **not** upload anything:
it validates the form, says clearly that nothing was uploaded, and offers to send the details on WhatsApp.
To accept uploads on the site, point `UGC_ENDPOINT` at a backend that accepts the form as
`multipart/form-data` (fields: `name`, `handle`, `contact`, `product`, `caption`, `media`,
`consent_rights`, `consent_usage`) and returns HTTP 2xx. Approved posts are added to `UGC_ITEMS`.

## Hosting (GitHub Pages)
`.github/workflows/deploy-sikandartech.yml` publishes this folder to the `gh-pages` branch on every push
(build sources, screenshots and prompt files are left out). One-time setup in GitHub:
**Settings → Pages → Build and deployment → Source: Deploy from a branch → `gh-pages` / `(root)`**.
The site is then live at `https://tahoor302-cloud.github.io/supermimic/`.

Custom domain `sikandartech.com`: add the domain in Settings → Pages → Custom domain, add a `CNAME`
file containing `sikandartech.com` to this folder (so deploys keep it), and at the domain registrar create
`A` records for `@` → 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 and a `CNAME`
record for `www` → `tahoor302-cloud.github.io`. Then tick "Enforce HTTPS".

`sitemap.xml` (only canonical, indexable URLs) is generated by the build; `robots.txt` points to it.
