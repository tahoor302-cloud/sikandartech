# SikandarTech.com

A simple static website (HTML + CSS + JS, no build step) for Sikandar Tech: sourcing advanced tech and gadgets from China.

## Files
- `index.html`: page sections (Header, Hero, About, Services, Products, How It Works, Why Us, Contact, Footer)
- `products.js`: product list (70 products, 11 categories). Add or edit products here.
- `script.js`: product filter/search, WhatsApp quote links, mobile menu
- `style.css`: styling

## Before going live
1. Put the real WhatsApp number in `script.js` (`WHATSAPP_NUMBER`, digits only with country code, e.g. `923001234567`).
2. Replace the placeholder number and email in the Contact section of `index.html`.
3. Optional: swap the emoji icons for real product photos.

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server -d sikandartech`.

## Hosting
Upload the folder contents to any static host (Netlify, Vercel, GitHub Pages, cPanel) and point `sikandartech.com` to it.
