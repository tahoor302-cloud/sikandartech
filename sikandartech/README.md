# SikandarTech.com

Static website (HTML + CSS + vanilla JS, no framework and no build step needed to run) for SikandarTech:
advanced tech and gadgets sourced from China. White theme, self-hosted fonts, scroll and pointer motion
that respects `prefers-reduced-motion`.

## Pages
- `index.html`: home. Cinematic hero, featured product showcase, editorial categories, product showroom,
  drone story (sticky, scroll-driven), Guangzhou → world route network, about/founder, community, final CTA + contact.
- `products.html`: full catalogue (680 products, 24 categories) with category sidebar, search,
  availability filter, quick view, save and quote list. Shareable links: `?cat=audio`, `?q=drone`,
  `?status=coming`, `#product-id`.
- `ugc.html`: community feed (portrait video/image cards with muted autoplay, one-sound-at-a-time,
  progress, product tag and "Shop this") and the "Share your setup" submission form.

## How buying works
SikandarTech sells on quotation, so there are no online prices or checkout. The bag icon is a
**quote list**: visitors add products and quantities and send the whole list as one WhatsApp message.
The heart icon saves products. Both are stored in the visitor's browser (localStorage).

## Files
- `script.js`: **site settings** (`CONTACT` block: WhatsApp, WeChat, phone, email, socials; `MEDIA` block:
  hero photo override), header/menu, scroll reveals, contact form
- `shop-core.js`: product art/cards, product popup, saved items, quote list drawer, toasts
- `home.js`, `shop.js`, `ugc.js`: page scripts
- `ugc-data.js`: community posts (`UGC_ITEMS`) and the upload backend URL (`UGC_ENDPOINT`)
- `catalog.js` / `icons.js`: generated product data and icons (do not edit by hand)
- `catalog-src/*.txt`: the product list, one line per product: `Name | icon | status | description | spec; spec; spec`
  (status: `A` available now, `C` coming soon, `E` emerging technology)
- `style.css`: design system and all styles
- `fonts/`: Unbounded, Inter, JetBrains Mono (SIL Open Font License, see `fonts/LICENSE-*`)

## Editing products
1. Edit the `.txt` files in `catalog-src/`.
2. Get the icon set once (Tabler Icons, MIT): `npm pack @tabler/icons && tar xzf tabler-icons-*.tgz && mv package/icons/outline catalog-src/tabler-outline && rm -rf package tabler-icons-*.tgz`
3. Run `python3 catalog-src/build.py` to regenerate `catalog.js` and `icons.js`.

## Photos
Products and categories show illustrations until real photos are added. See **`IMAGE-PROMPTS.md`** for
the exact prompts, file names and sizes.
- Product photo: `images/products/<product-id>.jpg`, then run the build.
- Category photo: `images/categories/<category-id>.jpg`, then run the build.
- Hero photo: `images/hero/hero.png` (or .webp/.jpg), then run the build.
- About photo: `images/about.jpg` (4:5).

## Community uploads
`UGC_ENDPOINT` in `ugc-data.js` is empty, so the "Share your setup" form does **not** upload anything:
it validates the form, says clearly that nothing was uploaded, and offers to send the details on WhatsApp.
To accept uploads on the site, point `UGC_ENDPOINT` at a backend that accepts the form as
`multipart/form-data` (fields: `name`, `handle`, `contact`, `product`, `caption`, `media`,
`consent_rights`, `consent_usage`) and returns HTTP 2xx. Approved posts are added to `UGC_ITEMS`.

## Hosting
Upload the folder contents to any static host (Netlify, Vercel, GitHub Pages, cPanel) and point
`sikandartech.com` to it.
