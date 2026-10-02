# SikandarTech.com

A simple static website (HTML + CSS + JS, no build step) for Sikandar Tech: sourcing advanced tech and gadgets from China.

## Files
- `index.html`: page sections (Header, Hero, About, Services, Products, How It Works, Why Us, Contact, Footer)
- `products.js`: product list (70 products, 11 categories). Add or edit products here.
- `script.js`: product filter/search, WhatsApp quote links, mobile menu
- `style.css`: styling

## Contact details
All contact info (WhatsApp, WeChat, China phone, email) is in the `CONTACT` block at the top of `script.js`. Empty WeChat/phone rows are hidden automatically.

## Optional
- Swap the emoji icons for real product photos.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server -d sikandartech`.

## Hosting
Upload the folder contents to any static host (Netlify, Vercel, GitHub Pages, cPanel) and point `sikandartech.com` to it.
