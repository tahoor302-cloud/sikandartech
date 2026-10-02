# SikandarTech.com

Static website (HTML + CSS + JS, no build step needed to run) for SikandarTech: advanced tech and gadgets sourced from China.

## Pages
- `index.html`: home (hero, about, services, shop-by-category, Future Tech 2026, process, markets, why us, contact)
- `products.html`: full catalogue with category sidebar, search, availability filter, product detail popup and WhatsApp quote buttons. Links like `products.html?cat=audio`, `?q=drone`, `?status=coming` and `#product-id` can be shared.

## Files
- `script.js`: contact details (`CONTACT` block at the top), mobile menu, home category grid
- `shop.js`: catalogue page logic
- `catalog.js` / `icons.js`: generated product data and icons (do not edit by hand)
- `catalog-src/*.txt`: the product list, one line per product: `Name | icon | status | description | spec; spec; spec`
  - status: `A` available now, `C` coming soon, `E` emerging technology
- `style.css`: styling

## Editing products
1. Edit the `.txt` files in `catalog-src/`.
2. Get the icon set once (Tabler Icons, MIT): `npm pack @tabler/icons && tar xzf tabler-icons-*.tgz && mv package/icons/outline catalog-src/tabler-outline && rm -rf package tabler-icons-*.tgz`
3. Run `python3 catalog-src/build.py` to regenerate `catalog.js` and `icons.js`.

## Product photos
Each product shows an illustrated picture until a real photo is added. To add one, save it as
`images/products/<product-id>.jpg` (or `.webp` / `.png`) and re-run the build. The product id is the
name in lowercase with dashes, e.g. `smart-rings.jpg`, `robot-dogs.jpg` (it also appears in the page URL
when a product is opened).

## Contact details
WhatsApp, WeChat, China phone, email and TikTok are in the `CONTACT` block at the top of `script.js`. Empty WeChat/phone/TikTok values hide that item.

## About photo
`images/about.jpg` (4:5). The "ST" placeholder shows if the file is missing.

## Hosting
Upload the folder contents to any static host (Netlify, Vercel, GitHub Pages, cPanel) and point `sikandartech.com` to it.
