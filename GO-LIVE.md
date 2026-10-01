# Go-live checklist

1. Merge the three zips into one `super-mimic` folder (part1 site, part2 videos, restyled — "replace").
2. `npm install`
3. `npm run typecheck`  → must print nothing. If it lists errors, send them back.
4. `npm test`           → catalog tests (should all pass).
5. `npm run dev`        → open http://localhost:3000 and click through:
   home · /products · a product page · cart · search · menu · phone width (F12 → device toolbar).
6. `npm run build`      → must finish without errors, then `npm start` to test the production build.
7. Deploy (Next.js needs a Node host — it will NOT run as plain files in public_html):
   - Easiest: push the folder to GitHub, import it on vercel.com (free), then add the domain
     supermimic.net in Vercel → Domains and point DNS as Vercel shows.
   - Or: `npx vercel` from the folder.

Before launch also set in data/site.ts: contactEmail, social links (currently placeholders).
To skip the dark opening film: set `intro.enabled` to false in data/site.ts.
