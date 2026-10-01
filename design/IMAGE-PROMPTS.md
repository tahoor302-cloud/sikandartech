# SUPERMIMIC — Website ki saari tasveerein (links + exact prompts)

Is file mein website ki har missing tasveer hai: file ka exact naam, ready download link (jahan hai), exact prompt aur reference image.

## Pehle yeh padh lein

**Kul kaam (241 missing files):**

| Kya | Kitni | Kya karna hai |
|---|---|---|
| A. Pehle se bani hui (aapke Higgsfield account mein) | 129 | Sirf download karein, generate nahi karna |
| B. Hero ke naye looks (ek hi model) | 7 | Generate karein (Section B) |
| C. Reference-PDF wale products ki main photo | 96 | Generate karein, ya agar asli photo hai to woh bhejein (Section C) |
| D. Hero product tasveerein (`public/media/hero/<product>.webp`) | 14 | Kuch nahi: product photos aane ke baad main khud bana dunga |
| E. Bade logo (`supermimic-logo.png`, `supermimic-logo-white.png`) | 2 | AI se mat banwayein; apni asli logo file bhejein |

**Bhejne ka tareeqa:**
- Har tasveer ka naam bilkul wahi rakhein jo yahan likha hai. Format PNG ya JPG kuch bhi ho; main khud WebP mein badal kar sahi size kar dunga.
- Har product ki tasveerein uske folder ke naam ke saath bhejein (masalan `meridian-runner/01-primary-noir.png`), behtar hai ek zip mein.
- **Size:** product photos 4:5 portrait (kam az kam 1792 × 2240); hero looks 16:9 landscape (kam az kam 2048 × 1152).

**Har tasveer mein check karein:** koi logo, brand ka naam, monogram, swoosh ya likhai na ho. Kisi mashhoor brand ke design ki copy bhi nahi chahiye (jaise taale wala Birkin jaisa bag); har cheez sadi aur generic ho.

**Reference image kaise lagayein:** "Reference image" mein jis file ka naam likha hai, wohi file reference / image-to-image mein lagayein. Masalan kisi product ki doosre rang wali photo ke liye usi product ki pehli photo. Is se product ki shape same rehti hai aur sirf rang ya angle badalta hai.

---

## A. Ready-made tasveerein: sirf download karein (129)

Yeh sab 29 Sep 2026 ko aapke Higgsfield account mein bani thin. Do raaste hain:
1. **Asaan:** Higgsfield app → History / Library → 29 Sep ki generations → sab select karke download.
2. Ya neeche diye har link ko browser mein khol kar save karein. Section C ki product list mein jis file ke saath "Download" link hai, woh bhi isi section ki hai (123 product photos).

**Banners aur hero scenes (6):**
- `public/media/editorial/banner-essentials.webp` — https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_023238_1f0ff7a9-5d14-4ab3-acf0-648a16f48f51.png
- `public/media/editorial/banner-street.webp` — https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_023238_1a7c7b71-2876-4e6e-bd6c-160c2862fa76.png
- `public/media/editorial/banner-watches.webp` — https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_023142_63d98dd7-6f8a-4991-966d-df498db1c1f1.png
- `public/media/hero/scene-01.webp` — https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_023045_a4942bc6-be78-486b-bf76-9cae3307a3f9.png
- `public/media/hero/scene-02.webp` — https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_023045_8bf0a6bd-5030-487c-8ffd-01a4206ed017.png
- `public/media/hero/scene-03.webp` — https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_023143_60486905-28cb-47e9-98fb-86acc75ca5b2.png

Download karte waqt naam badal kar upar wala naam rakhein (link wala lamba naam nahi).

---

## B. Hero ke naye looks: ek hi model (7)

**Reference:** aapki Picture 2 ka sabse left wala pose, crop karke sirf sar se kamar tak (sneakers aur bag reference mein na aayein).

**Zaroori:**
- Tool mein "Edit / Image-to-image" ho to wohi use karein, chehra 100% same rahega.
- Face reference ki strength sab se zyada rakhein; "seed" ka option ho to saaton mein ek hi seed rakhein.
- Saaton mein sunglasses rakhein (reference mein aankhein chhupi hain; hata diye to chehra badal jayega).
- Pose, camera aur background saaton mein same hain, taake scroll animation smooth lage.

**Negative prompt** (agar alag box ho, saaton mein yahi):
```
different face, different person, changed hairstyle, straight hair, curly hair, short hair, blonde hair, different body shape, logo, swoosh, brand name, monogram, padlock, text, watermark, extra fingers, cropped feet, cropped head
```

**01 — Eyewear** · file name: `look-01-eyewear`

```
Use the woman in the reference image. Keep her face, facial features, skin tone, hair and body exactly the same: long dark-brown wavy hair with a middle part falling past her shoulders, same slim figure and height. Do not change her face, hair or figure in any way. She wears thin gold-frame round aviator sunglasses with dark green lenses (no logo, no marks on lenses or frame) and a fine layered gold chain necklace.
Outfit: fitted cream ribbed tank top, black relaxed cargo trousers with gathered ankles, plain white leather low-top sneakers with no stripes, no logos and no marks.
Full-body fashion photo, head to toe fully visible. She stands facing the camera, standing straight, arms relaxed at her sides, centered in the frame and filling the middle third, with large empty space on the left and right. Background: plain warm greige studio wall and smooth light-grey polished concrete floor, soft even daylight, gentle shadow at her feet. Camera at waist height, 50mm lens. 16:9 landscape, photorealistic, high resolution. No text, no logos, no brand marks, no watermark anywhere.
```

**02 — Knitwear** · file name: `look-02-knitwear`

```
Use the woman in the reference image. Keep her face, facial features, skin tone, hair and body exactly the same: long dark-brown wavy hair with a middle part falling past her shoulders, same slim figure and height. Do not change her face, hair or figure in any way. She wears thin gold-frame round aviator sunglasses with dark green lenses (no logo, no marks on lenses or frame) and a fine layered gold chain necklace.
Outfit: soft oatmeal fine-knit crewneck sweater, beige high-waisted pleated wide-leg trousers, plain white leather low-top sneakers with no stripes, no logos and no marks.
Full-body fashion photo, head to toe fully visible. She stands facing the camera, standing straight, arms relaxed at her sides, centered in the frame and filling the middle third, with large empty space on the left and right. Background: plain warm greige studio wall and smooth light-grey polished concrete floor, soft even daylight, gentle shadow at her feet. Camera at waist height, 50mm lens. 16:9 landscape, photorealistic, high resolution. No text, no logos, no brand marks, no watermark anywhere.
```

**03 — Shirts** · file name: `look-03-shirts`

```
Use the woman in the reference image. Keep her face, facial features, skin tone, hair and body exactly the same: long dark-brown wavy hair with a middle part falling past her shoulders, same slim figure and height. Do not change her face, hair or figure in any way. She wears thin gold-frame round aviator sunglasses with dark green lenses (no logo, no marks on lenses or frame) and a fine layered gold chain necklace.
Outfit: ivory silk long-sleeve button-up shirt with a pointed collar, tucked in; charcoal-grey wide-leg wool trousers with a slim tan leather belt with a plain buckle; black leather loafers with no hardware and no logos.
Full-body fashion photo, head to toe fully visible. She stands facing the camera, standing straight, arms relaxed at her sides, centered in the frame and filling the middle third, with large empty space on the left and right. Background: plain warm greige studio wall and smooth light-grey polished concrete floor, soft even daylight, gentle shadow at her feet. Camera at waist height, 50mm lens. 16:9 landscape, photorealistic, high resolution. No text, no logos, no brand marks, no watermark anywhere.
```

**04 — Sneakers** · file name: `look-04-sneakers`

```
Use the woman in the reference image. Keep her face, facial features, skin tone, hair and body exactly the same: long dark-brown wavy hair with a middle part falling past her shoulders, same slim figure and height. Do not change her face, hair or figure in any way. She wears thin gold-frame round aviator sunglasses with dark green lenses (no logo, no marks on lenses or frame) and a fine layered gold chain necklace.
Outfit: fitted cream ribbed tank top, straight-leg light-blue jeans cropped at the ankle, and clean white smooth-leather low-top sneakers with tonal white laces and a white rubber sole: completely plain, no stripes, no swoosh, no logos, no tags, no text.
Full-body fashion photo, head to toe fully visible. She stands facing the camera, standing straight, arms relaxed at her sides, centered in the frame and filling the middle third, with large empty space on the left and right. Background: plain warm greige studio wall and smooth light-grey polished concrete floor, soft even daylight, gentle shadow at her feet. Camera at waist height, 50mm lens. 16:9 landscape, photorealistic, high resolution. No text, no logos, no brand marks, no watermark anywhere.
```

**05 — Watches** · file name: `look-05-watches`

```
Use the woman in the reference image. Keep her face, facial features, skin tone, hair and body exactly the same: long dark-brown wavy hair with a middle part falling past her shoulders, same slim figure and height. Do not change her face, hair or figure in any way. She wears thin gold-frame round aviator sunglasses with dark green lenses (no logo, no marks on lenses or frame) and a fine layered gold chain necklace.
Outfit: ivory silk button-up shirt with the sleeves rolled once, tucked into dark-indigo straight-leg jeans, plain white leather low-top sneakers with no logos. On her left wrist: a round gold watch with a plain white dial, simple stick hour markers and a plain polished gold link bracelet, with no logo, no crown symbol, no brand name and no text on the dial. Her left forearm is slightly forward so the watch is clearly visible.
Full-body fashion photo, head to toe fully visible. She stands facing the camera, standing straight, right arm relaxed at her side, centered in the frame and filling the middle third, with large empty space on the left and right. Background: plain warm greige studio wall and smooth light-grey polished concrete floor, soft even daylight, gentle shadow at her feet. Camera at waist height, 50mm lens. 16:9 landscape, photorealistic, high resolution. No text, no logos, no brand marks, no watermark anywhere.
```

**06 — Bags** · file name: `look-06-bags`

```
Use the woman in the reference image. Keep her face, facial features, skin tone, hair and body exactly the same: long dark-brown wavy hair with a middle part falling past her shoulders, same slim figure and height. Do not change her face, hair or figure in any way. She wears thin gold-frame round aviator sunglasses with dark green lenses (no logo, no marks on lenses or frame) and a fine layered gold chain necklace.
Outfit: fitted cream ribbed tank top, black relaxed cargo trousers with gathered ankles, plain white leather low-top sneakers with no logos. In her right hand she holds a simple black smooth-leather rectangular tote with two rounded top handles and clean edge stitching: no lock, no padlock, no key, no charms, no straps across the front, no metal plaque, no logo.
Full-body fashion photo, head to toe fully visible. She stands facing the camera, standing straight, left arm relaxed at her side, centered in the frame and filling the middle third, with large empty space on the left and right. Background: plain warm greige studio wall and smooth light-grey polished concrete floor, soft even daylight, gentle shadow at her feet. Camera at waist height, 50mm lens. 16:9 landscape, photorealistic, high resolution. No text, no logos, no brand marks, no watermark anywhere.
```

**07 — Accessories** · file name: `look-07-accessories`

```
Use the woman in the reference image. Keep her face, facial features, skin tone, hair and body exactly the same: long dark-brown wavy hair with a middle part falling past her shoulders, same slim figure and height. Do not change her face, hair or figure in any way. She wears thin gold-frame round aviator sunglasses with dark green lenses (no logo, no marks on lenses or frame) and a fine layered gold chain necklace.
Outfit: relaxed beige single-breasted blazer worn open over a cream ribbed tank top, black straight trousers, a slim tan leather belt with a plain gold buckle, and black leather loafers with no hardware and no logos. In her right hand, a small plain black leather card wallet with no logo.
Full-body fashion photo, head to toe fully visible. She stands facing the camera, standing straight, arms relaxed at her sides, centered in the frame and filling the middle third, with large empty space on the left and right. Background: plain warm greige studio wall and smooth light-grey polished concrete floor, soft even daylight, gentle shadow at her feet. Camera at waist height, 50mm lens. 16:9 landscape, photorealistic, high resolution. No text, no logos, no brand marks, no watermark anywhere.
```

---

## C. Product photos (219: 123 ke download links + 96 naye prompts)

- Jis file ke saath **Download** link hai, woh Section A ki hai: pehle link try karein; link na chale tab hi prompt use karein.
- Jis file ke saath sirf **Generate with** hai, woh nayi banwani hai. Agar aapke paas us product ki asli photo (aapki PDFs wali) bina logo ke hai, to woh bhi bhej sakte hain.
- Har product ki **pehli photo pehle** banayein, phir baaki photos mein usi ko reference lagayein.

### Meridian Runner  ·  SM-000001  ·  shoes / sneakers
Folder: `public/media/products/meridian-runner/`

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020820_2de82ea9-4401-41b6-a85f-d6d64f8c037e.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp` (this product's first photo)

```
The exact same Meridian Runner as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Noir (#1C1B19). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-stone.webp`** — primary · stone
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021001_397e4f00-1d13-4602-987f-03de375bc938.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp` (this product's first photo)

```
The exact same Meridian Runner as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Stone (#A9A298). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020820_185ca6bb-9b83-4f4f-a46d-9967e4868bee.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
The exact same Meridian Runner as in the reference image (same design, colour and materials), photographed from a different angle: Rear three-quarter view showing the heel and outsole edge, toe pointing left. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020820_bd1babff-8470-4c0a-a17c-0983f036cf80.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
Close-up detail of the exact same Meridian Runner as in the reference image: Padded heel collar and Removable OrthoLite® insole. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020820_44afda89-968d-4332-b776-d41522f17af3.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
The exact same Meridian Runner as in the reference image (same design, colour and materials), side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Halcyon Low  ·  SM-000002  ·  shoes / sneakers
Folder: `public/media/products/halcyon-low/`

**`01-primary-sand.webp`** — primary · sand
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020913_cbd48514-679d-4156-9db8-1cb417c8f372.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp` (this product's first photo)

```
The exact same Halcyon Low as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Sand (#CDBB9C). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020913_2543883c-858b-47d3-b673-3b1e37d5bea1.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp` (this product's first photo)

```
The exact same Halcyon Low as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Noir (#1C1B19). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020820_a1d1be96-bf6e-49b5-ae2f-e281ea7c2cac.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
The exact same Halcyon Low as in the reference image (same design, colour and materials), photographed from a different angle: Rear three-quarter view showing the heel and outsole edge, toe pointing left. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020820_ee1b0215-6cfa-4043-99e9-90e01fdee210.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
Close-up detail of the exact same Halcyon Low as in the reference image: Perforated toe box and Leather-wrapped laces tips. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020820_dde0ea57-ddb1-438e-8b6f-1c7460723a3a.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
The exact same Halcyon Low as in the reference image (same design, colour and materials), side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Atlas Chelsea Boot  ·  SM-000003  ·  shoes / boots
Folder: `public/media/products/atlas-chelsea-boot/`

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020526_8a855727-8e96-463d-8b18-8bc3294b3928.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a single black hand-burnished calf leather Chelsea boot, rounded toe, black ribbed elastic side gusset, rear pull tab, stacked leather heel, slim black rubber sole, visible welt stitching. Side profile, toe pointing right. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-cognac.webp`** — primary · cognac
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021001_e7bcba9b-e06e-4754-a0a9-af09b9a7d366.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp` (this product's first photo)

```
The exact same Atlas Chelsea Boot as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Cognac (#8A5A36). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020913_53c9891d-61ce-416f-a866-8ca4baf5f84e.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Atlas Chelsea Boot as in the reference image (same design, colour and materials), photographed from a different angle: Rear three-quarter view showing the heel and outsole edge, toe pointing left. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020913_20a1ee6f-3916-48c8-a598-fae2fd58eebd.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
Close-up detail of the exact same Atlas Chelsea Boot as in the reference image: Rear pull tab and Elastic side gussets. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021001_046f8d9b-2dae-4391-aa75-59dcf447fbd9.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Atlas Chelsea Boot as in the reference image (same design, colour and materials), side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Vesper Loafer  ·  SM-000004  ·  shoes / loafers
Folder: `public/media/products/vesper-loafer/`

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020526_1bdf6856-52a3-4d52-ad29-19a62c4a5501.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a single black polished calf leather penny loafer, hand-sewn moccasin apron stitching, slim saddle strap with slot, thin leather sole and stacked heel. Side three-quarter view, toe pointing right. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-cognac.webp`** — primary · cognac
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021001_8de57d6d-19b0-40d8-979c-83b25ae9ee83.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp` (this product's first photo)

```
The exact same Vesper Loafer as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Cognac (#8A5A36). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-bordeaux.webp`** — primary · bordeaux
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021053_677433ed-36c4-4d8e-9047-9d42122256fb.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp` (this product's first photo)

```
The exact same Vesper Loafer as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Bordeaux (#5A2630). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020913_4ff5ca41-126e-4cf4-8695-38cda4372940.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Vesper Loafer as in the reference image (same design, colour and materials), photographed from a different angle: Rear three-quarter view showing the heel and outsole edge, toe pointing left. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021001_572a945a-c4c9-431c-a8a2-ca3acc442b20.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
Close-up detail of the exact same Vesper Loafer as in the reference image: Hand-stitched apron and Saddle strap. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021001_4f5bbc5d-fb8d-44f2-8af9-065e600ae99e.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Vesper Loafer as in the reference image (same design, colour and materials), side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Solace Slide  ·  SM-000005  ·  shoes / sandals
Folder: `public/media/products/solace-slide/`

**`01-primary-sand.webp`** — primary · sand
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020626_c8854ced-2031-4e0d-afcb-af2aa9c6ec23.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a single sand-beige padded nappa leather single-strap slide sandal on a contoured cork footbed with a lightweight rubber sole. Three-quarter view from above. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021053_2db396b3-b791-426b-b732-c79e5c9f557b.png
- If the link no longer works, generate with:
- Reference image: `01-primary-sand.webp` (this product's first photo)

```
The exact same Solace Slide as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Noir (#1C1B19). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-moss.webp`** — primary · moss
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021054_5ab4c24d-a5b8-437b-9586-fd40b68fbe13.png
- If the link no longer works, generate with:
- Reference image: `01-primary-sand.webp` (this product's first photo)

```
The exact same Solace Slide as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Moss (#5E5D47). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021053_2f8053da-3543-4bac-ad5a-58f0d11f954f.png
- If the link no longer works, generate with:
- Reference image: `01-primary-sand.webp`

```
The exact same Solace Slide as in the reference image (same design, colour and materials), photographed from a different angle: Rear three-quarter view showing the heel and outsole edge, toe pointing left. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021053_e4a6f7b5-12dc-426c-ac39-73b96210768b.png
- If the link no longer works, generate with:
- Reference image: `01-primary-sand.webp`

```
Close-up detail of the exact same Solace Slide as in the reference image: Anatomical footbed and Padded strap. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021053_2083ef7c-7de5-411a-8bb9-c416dfc0f1ef.png
- If the link no longer works, generate with:
- Reference image: `01-primary-sand.webp`

```
The exact same Solace Slide as in the reference image (same design, colour and materials), side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Orbit Trainer  ·  SM-000006  ·  shoes / sneakers
Folder: `public/media/products/orbit-trainer/`

**`01-primary-graphite.webp`** — primary · graphite
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020627_ca07e20e-f04b-4946-a7e6-d4c2fea697e8.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a single chunky street trainer in graphite grey: layered suede, nubuck and technical mesh panels, exaggerated sculpted thick sole unit, heel and tongue pull loops. Side profile, toe pointing right. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-ivory.webp`** — primary · ivory
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021144_56a6f225-b854-451f-b59b-96136d656ce2.png
- If the link no longer works, generate with:
- Reference image: `01-primary-graphite.webp` (this product's first photo)

```
The exact same Orbit Trainer as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Ivory (#ECE5D8). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-moss.webp`** — primary · moss
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021144_36521abc-54d4-4875-a231-4ce6809aa1b8.png
- If the link no longer works, generate with:
- Reference image: `01-primary-graphite.webp` (this product's first photo)

```
The exact same Orbit Trainer as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Moss (#5E5D47). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021144_33d6de53-8102-4976-922e-b72ab274bbec.png
- If the link no longer works, generate with:
- Reference image: `01-primary-graphite.webp`

```
The exact same Orbit Trainer as in the reference image (same design, colour and materials), photographed from a different angle: Rear three-quarter view showing the heel and outsole edge, toe pointing left. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021144_d6de8abe-1e29-46f7-becf-8e6b1844783d.png
- If the link no longer works, generate with:
- Reference image: `01-primary-graphite.webp`

```
Close-up detail of the exact same Orbit Trainer as in the reference image: Padded tongue and Layered panelling. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021251_b580d3ed-276b-4984-a273-fd699a426a34.png
- If the link no longer works, generate with:
- Reference image: `01-primary-graphite.webp`

```
The exact same Orbit Trainer as in the reference image (same design, colour and materials), side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Nimbus Knit  ·  SM-000007  ·  shoes / sneakers
Folder: `public/media/products/nimbus-knit/`

**`01-primary-stone.webp`** — primary · stone
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020526_c9f4d7b6-4168-4a6a-bbc5-365bdd125d59.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a single sock-fit knit running shoe in stone grey seamless recycled knit, responsive foam midsole, rubber outsole pods, heel pull loop. Side profile, toe pointing right. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021350_350f23e8-1274-40ca-be95-d4ea400a9a8f.png
- If the link no longer works, generate with:
- Reference image: `01-primary-stone.webp` (this product's first photo)

```
The exact same Nimbus Knit as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Noir (#1C1B19). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021145_79c0ee7f-81c5-416a-93c4-1a58113fdd5a.png
- If the link no longer works, generate with:
- Reference image: `01-primary-stone.webp`

```
The exact same Nimbus Knit as in the reference image (same design, colour and materials), photographed from a different angle: Rear three-quarter view showing the heel and outsole edge, toe pointing left. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021251_69118a8e-2bcc-462b-ba38-d1c60091f1e9.png
- If the link no longer works, generate with:
- Reference image: `01-primary-stone.webp`

```
Close-up detail of the exact same Nimbus Knit as in the reference image: Sock-fit collar and Heel pull loop. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021251_147e148e-c639-443a-a8f5-f8ca553a0631.png
- If the link no longer works, generate with:
- Reference image: `01-primary-stone.webp`

```
The exact same Nimbus Knit as in the reference image (same design, colour and materials), side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Ridge Court  ·  SM-000008  ·  shoes / sneakers
Folder: `public/media/products/ridge-court/`

**`01-primary-ivory.webp`** — primary · ivory
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020526_08b29a79-ca1b-4153-85dc-1469936864f6.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a single retro low-top court shoe in tumbled ivory leather with a suede heel tab, waxed laces and a gum rubber outsole. Side three-quarter view, toe pointing right. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-bordeaux.webp`** — primary · bordeaux
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021351_4f2121ab-d5e9-4d8a-a887-efcb0a9617a0.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp` (this product's first photo)

```
The exact same Ridge Court as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Bordeaux (#5A2630). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021251_e2ad299d-16a9-4083-b3f5-75ad947073eb.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
The exact same Ridge Court as in the reference image (same design, colour and materials), photographed from a different angle: Rear three-quarter view showing the heel and outsole edge, toe pointing left. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021350_56822d68-fead-41db-88c2-6b3717ed3204.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
Close-up detail of the exact same Ridge Court as in the reference image: Padded collar and Suede heel tab. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021351_196c7de5-c3ce-41b4-87e7-21188d7ea2a4.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
The exact same Ridge Court as in the reference image (same design, colour and materials), side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Chronos 38 Automatic  ·  SM-000009  ·  watches / automatic
Folder: `public/media/products/chronos-38-automatic/`

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021445_e59aea04-2cbd-4fa5-8afb-9e379487f584.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp` (this product's first photo)

```
The exact same Chronos 38 Automatic as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Noir (#1C1B19). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021350_273f459a-78a4-4273-82bd-2890f87fdbb1.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
The exact same Chronos 38 Automatic as in the reference image (same design, colour and materials), photographed from a different angle: Side three-quarter view of the case showing the crown and case profile, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021445_fa5004cc-222f-4849-b07e-5d87170d8f62.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
Close-up detail of the exact same Chronos 38 Automatic as in the reference image: Display caseback and Applied indices. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021446_fda658cb-ae83-44eb-8234-32ac8d2d1469.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
The exact same Chronos 38 Automatic as in the reference image (same design, colour and materials), front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Lumen Tank  ·  SM-000010  ·  watches / quartz
Folder: `public/media/products/lumen-tank/`

**`01-primary-champagne.webp`** — primary · champagne
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020526_429dd7df-582e-4e83-998a-dc6ae29620fa.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a rectangular dress wristwatch with a brushed gold-tone case, cream dial with black Roman numerals and a railroad minute track, blued steel hands, blue cabochon crown, dark brown alligator-embossed leather strap. Front view, watch standing upright. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021543_9f5afc85-5bcd-4793-93e7-d05c3cb4244c.png
- If the link no longer works, generate with:
- Reference image: `01-primary-champagne.webp` (this product's first photo)

```
The exact same Lumen Tank as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Noir (#1C1B19). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021445_82a67d74-8d2f-489b-9aa2-54f2c5cbef6f.png
- If the link no longer works, generate with:
- Reference image: `01-primary-champagne.webp`

```
The exact same Lumen Tank as in the reference image (same design, colour and materials), photographed from a different angle: Side three-quarter view of the case showing the crown and case profile, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021445_f7906ae7-2841-4fa6-b5ac-184c05244685.png
- If the link no longer works, generate with:
- Reference image: `01-primary-champagne.webp`

```
Close-up detail of the exact same Lumen Tank as in the reference image: Brushed case flanks and Blued hands. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021542_a3399ae6-64c8-4e79-9794-f9db60ff129d.png
- If the link no longer works, generate with:
- Reference image: `01-primary-champagne.webp`

```
The exact same Lumen Tank as in the reference image (same design, colour and materials), front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Aurum GMT  ·  SM-000011  ·  watches / automatic
Folder: `public/media/products/aurum-gmt/`

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021644_05f78c78-dba3-4e7c-b6d8-c5eb7eb8e807.png
- If the link no longer works, generate with:
- Reference image: `01-primary-midnight.webp` (this product's first photo)

```
The exact same Aurum GMT as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Noir (#1C1B19). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021643_6643558e-60d7-42ef-a70b-cf30fdefa4eb.png
- If the link no longer works, generate with:
- Reference image: `01-primary-midnight.webp`

```
The exact same Aurum GMT as in the reference image (same design, colour and materials), photographed from a different angle: Side three-quarter view of the case showing the crown and case profile, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021542_c3daa68c-e915-4a7b-b4c7-0d78b2666ad2.png
- If the link no longer works, generate with:
- Reference image: `01-primary-midnight.webp`

```
Close-up detail of the exact same Aurum GMT as in the reference image: Independent GMT hand and Ceramic bezel insert. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021542_2f0e6758-3903-4a5b-95ab-4ea7723166a8.png
- If the link no longer works, generate with:
- Reference image: `01-primary-midnight.webp`

```
The exact same Aurum GMT as in the reference image (same design, colour and materials), front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Obsidian Diver 42  ·  SM-000012  ·  watches / sport
Folder: `public/media/products/obsidian-diver-42/`

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020526_2fbf481e-82d5-4959-9fe6-db17e17be520.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a 42 mm steel dive wristwatch, matte black dial with large luminous round markers, black unidirectional bezel with minute scale, screw-down crown, black rubber strap. Front view, watch standing upright. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-moss.webp`** — primary · moss
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021812_7b6ca05c-0638-4b75-9754-228c44ae78ae.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp` (this product's first photo)

```
The exact same Obsidian Diver 42 as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Moss (#5E5D47). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021643_06133db8-2001-43b6-8bee-98ab12cc0edb.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Obsidian Diver 42 as in the reference image (same design, colour and materials), photographed from a different angle: Side three-quarter view of the case showing the crown and case profile, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021644_fc3bf9a9-322b-4e3e-8c1d-efc8d2907b04.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
Close-up detail of the exact same Obsidian Diver 42 as in the reference image: Helium escape valve and Screw-down caseback. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021812_adddd3d2-3463-4694-86ba-77d6f581e97f.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Obsidian Diver 42 as in the reference image (same design, colour and materials), front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Axis Skeleton  ·  SM-000013  ·  watches / automatic
Folder: `public/media/products/axis-skeleton/`

**`01-primary-steel.webp`** — primary · steel
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020626_2073ca0b-1fea-4aab-8c92-943c6ad76665.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a 41 mm stainless steel skeleton automatic wristwatch with an open-worked dial revealing hand-finished bridges, gears and balance wheel, black calf leather strap. Front view, watch standing upright. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-gold.webp`** — primary · gold
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021907_08e47471-a2f8-4c5f-bc53-a5e2645c5b33.png
- If the link no longer works, generate with:
- Reference image: `01-primary-steel.webp` (this product's first photo)

```
The exact same Axis Skeleton as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Gold (#C9A96A). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021813_461e42ff-f11f-4413-80d0-203a59b80be8.png
- If the link no longer works, generate with:
- Reference image: `01-primary-steel.webp`

```
The exact same Axis Skeleton as in the reference image (same design, colour and materials), photographed from a different angle: Side three-quarter view of the case showing the crown and case profile, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021813_981589ef-9169-43ca-acdf-03cc98a58a60.png
- If the link no longer works, generate with:
- Reference image: `01-primary-steel.webp`

```
Close-up detail of the exact same Axis Skeleton as in the reference image: Hand-finished bridges and Exhibition caseback. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021813_e57e51cb-d170-4d40-929e-543ffcbfadf6.png
- If the link no longer works, generate with:
- Reference image: `01-primary-steel.webp`

```
The exact same Axis Skeleton as in the reference image (same design, colour and materials), front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Linea Dress 36  ·  SM-000014  ·  watches / quartz
Folder: `public/media/products/linea-dress-36/`

**`01-primary-ivory.webp`** — primary · ivory
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020626_ecd3c643-34d8-4608-8624-e4b525898ca7.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
an ultra-thin 36 mm stainless steel dress wristwatch with a plain ivory paper-textured dial, dauphine hands, fine baton markers and a taupe suede strap. Front view, watch standing upright. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-champagne.webp`** — primary · champagne
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021908_92f6aa2d-8c82-4676-a958-b5202ec9ca1b.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp` (this product's first photo)

```
The exact same Linea Dress 36 as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Champagne (#C8B28A). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021908_0f36be36-1fee-47a5-af75-ed0066a1e952.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
The exact same Linea Dress 36 as in the reference image (same design, colour and materials), photographed from a different angle: Side three-quarter view of the case showing the crown and case profile, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022011_ad7bdd02-98bf-45d9-8d20-1ef6e9dd0954.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
Close-up detail of the exact same Linea Dress 36 as in the reference image: 6.8 mm case and Dauphine hands. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_021908_04daccf9-5ca6-46e1-b4b2-0934ea1a25a5.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
The exact same Linea Dress 36 as in the reference image (same design, colour and materials), front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Maison Tote  ·  SM-000015  ·  bags / totes
Folder: `public/media/products/maison-tote/`

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022011_f7777cc1-6eef-4097-a363-c562965aa170.png
- If the link no longer works, generate with:
- Reference image: `01-primary-cognac.webp` (this product's first photo)

```
The exact same Maison Tote as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Noir (#1C1B19). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-sand.webp`** — primary · sand
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022110_a255b257-9c13-4573-a9a9-f9b2823b7452.png
- If the link no longer works, generate with:
- Reference image: `01-primary-cognac.webp` (this product's first photo)

```
The exact same Maison Tote as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Sand (#CDBB9C). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022011_3f17b47d-db7a-4330-a3cc-84022844d5e1.png
- If the link no longer works, generate with:
- Reference image: `01-primary-cognac.webp`

```
The exact same Maison Tote as in the reference image (same design, colour and materials), photographed from a different angle: Back three-quarter view showing the reverse side and handle attachments. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022011_48c5fbb8-3dc3-49cc-a68f-9a5d900085b9.png
- If the link no longer works, generate with:
- Reference image: `01-primary-cognac.webp`

```
Close-up detail of the exact same Maison Tote as in the reference image: Interior zip pocket and Laptop sleeve. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022011_c51964bf-145e-4d4b-8712-01fb35404848.png
- If the link no longer works, generate with:
- Reference image: `01-primary-cognac.webp`

```
The exact same Maison Tote as in the reference image (same design, colour and materials), front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Arc Crossbody  ·  SM-000016  ·  bags / crossbody
Folder: `public/media/products/arc-crossbody/`

**`01-primary-bordeaux.webp`** — primary · bordeaux
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022110_6a154dfb-c671-4931-93ae-6a3e2c602590.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp` (this product's first photo)

```
The exact same Arc Crossbody as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Bordeaux (#5A2630). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-ivory.webp`** — primary · ivory
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022215_7b207790-bfb7-4edf-b2a7-8c869d389ee5.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp` (this product's first photo)

```
The exact same Arc Crossbody as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Ivory (#ECE5D8). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022109_41cb4d8b-e837-47f7-904e-2c68d9642809.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Arc Crossbody as in the reference image (same design, colour and materials), photographed from a different angle: Back three-quarter view showing the reverse side and handle attachments. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022215_ccefbdaf-d27e-4961-ab67-f10a147becac.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
Close-up detail of the exact same Arc Crossbody as in the reference image: Turn-lock closure and Card slot. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022109_d8f36fe7-1a05-4fcc-a3b1-8fc343f10fbd.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Arc Crossbody as in the reference image (same design, colour and materials), front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Voyage Weekender  ·  SM-000017  ·  bags / travel
Folder: `public/media/products/voyage-weekender/`

**`01-primary-cognac.webp`** — primary · cognac
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020716_86afdaaf-7674-40f1-87d7-352087bf5168.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a cabin-sized weekender holdall in tan waxed cotton canvas with cognac full-grain leather trims, rolled leather handles and a solid brass zip. Three-quarter view. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-graphite.webp`** — primary · graphite
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022313_9321fd75-e1c0-4949-b870-aa283e1297f5.png
- If the link no longer works, generate with:
- Reference image: `01-primary-cognac.webp` (this product's first photo)

```
The exact same Voyage Weekender as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Graphite (#4A4845). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022215_643491e4-8d71-406d-a94f-234767a8a756.png
- If the link no longer works, generate with:
- Reference image: `01-primary-cognac.webp`

```
The exact same Voyage Weekender as in the reference image (same design, colour and materials), photographed from a different angle: Back three-quarter view showing the reverse side and handle attachments. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022215_33b79058-3459-4b0c-8c27-d47aa1e88cd9.png
- If the link no longer works, generate with:
- Reference image: `01-primary-cognac.webp`

```
Close-up detail of the exact same Voyage Weekender as in the reference image: Shoe compartment and Detachable shoulder strap. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022215_1762d513-afe4-47a0-9fb7-ff7c0a553383.png
- If the link no longer works, generate with:
- Reference image: `01-primary-cognac.webp`

```
The exact same Voyage Weekender as in the reference image (same design, colour and materials), front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Cadence Mini  ·  SM-000018  ·  bags / clutches
Folder: `public/media/products/cadence-mini/`

**`01-primary-champagne.webp`** — primary · champagne
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020544_40c2cb96-4d52-48b4-9fb1-84320d019791.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a pleated champagne-gold nappa leather mini clutch with a slim gold metal frame closure and a detachable fine gold chain. Front three-quarter view. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022313_601c861a-a4e3-45c9-a743-c78a6b4cbfa3.png
- If the link no longer works, generate with:
- Reference image: `01-primary-champagne.webp` (this product's first photo)

```
The exact same Cadence Mini as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Noir (#1C1B19). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022313_b735339a-cc38-4963-a377-b39268f63ce1.png
- If the link no longer works, generate with:
- Reference image: `01-primary-champagne.webp`

```
The exact same Cadence Mini as in the reference image (same design, colour and materials), photographed from a different angle: Back three-quarter view showing the reverse side and handle attachments. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022313_ad0d0f9d-a874-43f1-8cb2-0b22691f6a13.png
- If the link no longer works, generate with:
- Reference image: `01-primary-champagne.webp`

```
Close-up detail of the exact same Cadence Mini as in the reference image: Detachable chain and Magnetic frame. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022313_635f8a3f-f06d-4725-9735-26a4e8df90c5.png
- If the link no longer works, generate with:
- Reference image: `01-primary-champagne.webp`

```
The exact same Cadence Mini as in the reference image (same design, colour and materials), front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Strata Backpack  ·  SM-000019  ·  bags / backpacks
Folder: `public/media/products/strata-backpack/`

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020544_16726171-13db-44b5-a940-833934ce29f0.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a minimalist black ballistic nylon backpack with clean architectural lines, black leather trims, a leather top handle and water-resistant zips. Front three-quarter view. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-moss.webp`** — primary · moss
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022412_767fcda2-116d-4894-bb56-fb58fe737b70.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp` (this product's first photo)

```
The exact same Strata Backpack as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Moss (#5E5D47). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-stone.webp`** — primary · stone
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022412_f328d982-3a6f-40f1-aa5d-4222ea92ddfc.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp` (this product's first photo)

```
The exact same Strata Backpack as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Stone (#A9A298). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022412_076c78b3-c729-479f-ae7c-728ca1c03b2b.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Strata Backpack as in the reference image (same design, colour and materials), photographed from a different angle: Back three-quarter view showing the reverse side and handle attachments. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022519_5bac686a-650c-4936-a11c-096f38f4682e.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
Close-up detail of the exact same Strata Backpack as in the reference image: Padded laptop compartment and Hidden back pocket. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022412_528455f2-56ca-4a44-81ad-d07189f42ee9.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Strata Backpack as in the reference image (same design, colour and materials), front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Pleat Envelope  ·  SM-000020  ·  bags / clutches
Folder: `public/media/products/pleat-clutch/`

**`01-primary-ivory.webp`** — primary · ivory
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020716_a0b42420-36ea-43c2-bab1-59b99bcbc666.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a flat ivory box-calf leather envelope clutch with a folded triangular flap and hidden closure. Front view, slightly angled. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022624_349f6d30-6bb9-4dbe-9b01-009d65dc2ae6.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp` (this product's first photo)

```
The exact same Pleat Envelope as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Noir (#1C1B19). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022519_492380c2-385b-48d4-94fe-2009bbea239a.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
The exact same Pleat Envelope as in the reference image (same design, colour and materials), photographed from a different angle: Back three-quarter view showing the reverse side and handle attachments. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022520_5090be73-4fec-409e-a419-a49333f9a3b9.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
Close-up detail of the exact same Pleat Envelope as in the reference image: Hidden magnetic closure and Interior card slots. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022519_01c50006-a824-43a9-ac6c-e6bcb05c8ff5.png
- If the link no longer works, generate with:
- Reference image: `01-primary-ivory.webp`

```
The exact same Pleat Envelope as in the reference image (same design, colour and materials), front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Fold Card Holder  ·  SM-000021  ·  accessories / wallets
Folder: `public/media/products/fold-card-holder/`

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020544_ebf5693b-0835-41c3-a172-a0aae7412c7d.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a slim black vegetable-tanned leather bifold card holder, slightly open with two cards peeking out, hand-stitched edges. Three-quarter view from above. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-cognac.webp`** — primary · cognac
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022624_257c923a-7376-428a-95e5-8a30fb59513b.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp` (this product's first photo)

```
The exact same Fold Card Holder as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Cognac (#8A5A36). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-moss.webp`** — primary · moss
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022728_7e1c4ccd-1c73-4680-8f5d-a2444a9540bf.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp` (this product's first photo)

```
The exact same Fold Card Holder as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Moss (#5E5D47). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022624_3b3bc814-6aaa-4e57-b9c8-486ace1dbd21.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Fold Card Holder as in the reference image (same design, colour and materials), photographed from a different angle: Side view, lying flat. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022624_1eac9add-7755-4c7d-a10a-7b7f4cc8fe4b.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
Close-up detail of the exact same Fold Card Holder as in the reference image: Hand-stitched edges and Embossed monogram. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022728_06d0605c-f0fe-4281-a794-a32ae14d6a3f.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Fold Card Holder as in the reference image (same design, colour and materials), three-quarter view from above. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Ledger Wallet  ·  SM-000022  ·  accessories / wallets
Folder: `public/media/products/ledger-wallet/`

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020717_1feb087a-49c7-4018-a6e2-d64a7d7953de.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a black pebbled calf leather bifold wallet, slightly open showing card slots, hand-painted edges. Three-quarter view from above. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-cognac.webp`** — primary · cognac
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022833_575a4ae8-4d8e-47aa-8522-7606dd2a83cd.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp` (this product's first photo)

```
The exact same Ledger Wallet as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Cognac (#8A5A36). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022728_1d4ab57d-6bd8-475d-bb7f-c38173083703.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Ledger Wallet as in the reference image (same design, colour and materials), photographed from a different angle: Side view, lying flat. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022728_80293b72-7044-4ab1-8f7c-ae6ab91f732f.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
Close-up detail of the exact same Ledger Wallet as in the reference image: RFID-shielded and Hand-painted edges. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022728_a317f7a9-adf6-4799-bb04-e7d8cf8d667e.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Ledger Wallet as in the reference image (same design, colour and materials), three-quarter view from above. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Line Belt  ·  SM-000023  ·  accessories / belts
Folder: `public/media/products/line-belt/`

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020544_f09498cd-5381-4bee-aa3e-28379155e73a.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a 30 mm black full-grain leather belt neatly coiled with a brushed champagne brass minimal pin buckle. Three-quarter view from above. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-cognac.webp`** — primary · cognac
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022936_51bedae2-6b64-441c-8001-8875d8afc2ab.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp` (this product's first photo)

```
The exact same Line Belt as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Cognac (#8A5A36). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022833_e4b0b100-dee3-4925-816d-878fba4cbb58.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Line Belt as in the reference image (same design, colour and materials), photographed from a different angle: Side view, lying flat. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022833_084323a9-e0df-479a-a5c6-f3ab23cd8e76.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
Close-up detail of the exact same Line Belt as in the reference image: Reversible and Hand-finished edges. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022833_1baeb7e9-c588-4add-83e1-576e09e83ff7.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Line Belt as in the reference image (same design, colour and materials), three-quarter view from above. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Aura Sunglasses  ·  SM-000024  ·  accessories / sunglasses
Folder: `public/media/products/aura-sunglasses/`

**`01-primary-noir.webp`** — primary · noir
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_020544_b9addb81-b738-446f-bdd4-809f07c758c6.png
- If the link no longer works, generate with:
- Reference image: none needed (this is the first photo of the product)

```
a pair of soft-square black polished acetate sunglasses with dark polarised lenses and small metal hinge details, temples open. Front three-quarter view. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`01-primary-cognac.webp`** — primary · cognac
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022937_95b83b47-a288-4f03-8b03-76927348dcc6.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp` (this product's first photo)

```
The exact same Aura Sunglasses as in the reference image: identical shape, proportions, details, camera angle, framing, background and lighting. Change only the colour to Cognac (#8A5A36). The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`02-angle.webp`** — angle
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022937_0bd95428-51c6-463e-92a8-8ad7f1b72eab.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Aura Sunglasses as in the reference image (same design, colour and materials), photographed from a different angle: Side view, lying flat. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

**`03-detail.webp`** — detail
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_023045_d1f60159-4900-44fd-8665-589739f51ddd.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
Close-up detail of the exact same Aura Sunglasses as in the reference image: Hard case included and Polarised lenses. The product itself carries no logo, no monogram, no brand name and no text of any kind. Extreme macro close-up on a seamless warm ivory studio background, soft diffused light, shallow depth of field, ultra sharp focus on material texture and stitching, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

**`04-editorial.webp`** — editorial
- Download (ready-made, no need to generate): https://d8j0ntlcm91z4.cloudfront.net/user_3Jy6vonGMMTMeU3Kbu6AR5Irh57/hf_20260929_022936_c8e7079e-c567-49a8-999d-1f44c6738229.png
- If the link no longer works, generate with:
- Reference image: `01-primary-noir.webp`

```
The exact same Aura Sunglasses as in the reference image (same design, colour and materials), three-quarter view from above. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a dark textured black stone plinth in a dark warm-brown studio, a single warm spotlight from above, soft haze, deep shadows, moody luxury editorial still life, 85mm lens, vertical 4:5 composition. No text, no logos, no brand marks, no people.
```

### Structured Taupe Satchel  ·  SM-000025  ·  bags / top-handle
Folder: `public/media/products/structured-taupe-satchel/`

**`01-primary-taupe.webp`** — primary · taupe
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Structured Taupe Satchel — A structured trapezoid satchel in taupe with a rolled top handle, a front flap with a square gold turn-lock and a hanging key-bell charm. Gold feet protect the base. Colour: Taupe (#8C7E70). Details: Rolled top handle; Front flap with gold turn-lock; Hanging key-bell charm; Protective metal feet. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Quilted Chain Bag  ·  SM-000026  ·  bags / shoulder
Folder: `public/media/products/black-quilted-chain-bag/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Quilted Chain Bag — Diamond-quilted black flap bag with a rectangular gold push-lock and a chunky gold chain strap that can be worn on the shoulder or across the body. Colour: Noir (#151413). Details: Diamond quilting; Gold push-lock flap; Chunky gold chain strap. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Burgundy Crescent Hobo  ·  SM-000027  ·  bags / hobo
Folder: `public/media/products/burgundy-crescent-hobo/`

**`01-primary-burgundy.webp`** — primary · burgundy
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Burgundy Crescent Hobo — A smooth burgundy crescent-shaped hobo with a slim shoulder strap and a sculpted gold hook detail at the centre front. Colour: Burgundy (#5E1A24). Details: Crescent silhouette; Slim shoulder strap; Gold hook detail. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Ivory Structured Tote  ·  SM-000028  ·  bags / totes
Folder: `public/media/products/ivory-structured-tote/`

**`01-primary-ivory.webp`** — primary · ivory
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Ivory Structured Tote — An understated ivory tote with a structured body, slim shoulder handles fixed with buckled tabs, and a hanging leather tag. Colour: Ivory (#E8E1D3). Details: Slim shoulder handles; Buckled handle tabs; Hanging tag; Structured body. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Ivory Structured Clasp Bag  ·  SM-000029  ·  bags / top-handle
Folder: `public/media/products/ivory-structured-clasp-bag/`

**`01-primary-ivory.webp`** — primary · ivory
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Ivory Structured Clasp Bag — A structured ivory top-handle bag with a flap closing through a gold turn-lock clasp and belted strap, a rolled handle and a hanging key-bell. Colour: Ivory (#E6DDCB). Details: Rolled top handle; Gold turn-lock clasp; Belted front strap; Hanging key-bell. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Chocolate Crescent Shoulder Bag  ·  SM-000030  ·  bags / shoulder
Folder: `public/media/products/chocolate-crescent-shoulder-bag/`

**`01-primary-chocolate.webp`** — primary · chocolate
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Chocolate Crescent Shoulder Bag — A slouchy crescent shoulder bag in rich chocolate brown, with a slim integrated strap and a clean, hardware-light front. Colour: Chocolate (#5A3620). Details: Crescent silhouette; Integrated slim strap; Minimal hardware. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Trunk-Inspired Mini Case  ·  SM-000031  ·  bags / top-handle
Folder: `public/media/products/black-trunk-inspired-mini-case/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Trunk-Inspired Mini Case — A structured black mini case inspired by travel trunks: gold corner caps, a gold lock plate with clasp, framed edges and a rolled top handle. Colour: Noir (#161514). Details: Gold corner caps; Gold lock plate; Framed edges; Rolled top handle. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Taupe Woven Hobo  ·  SM-000032  ·  bags / hobo
Folder: `public/media/products/taupe-woven-hobo/`

**`01-primary-taupe.webp`** — primary · taupe
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Taupe Woven Hobo — A generous, slouchy hobo in taupe with an all-over woven lattice and a wide woven shoulder strap. Colour: Taupe (#8E7D6B). Details: All-over woven lattice; Wide woven strap; Slouchy shape. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Emerald Structured Top-Handle  ·  SM-000033  ·  bags / top-handle
Folder: `public/media/products/emerald-structured-top-handle/`

**`01-primary-emerald.webp`** — primary · emerald
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Emerald Structured Top-Handle — A structured trapezoid bag in deep emerald with a rolled top handle, a front flap and a sculpted gold clasp. Gold feet sit at the base. Colour: Emerald (#1E4A33). Details: Rolled top handle; Sculpted gold clasp; Front flap; Metal feet. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Cream Ruched Hobo  ·  SM-000034  ·  bags / hobo
Folder: `public/media/products/cream-ruched-hobo/`

**`01-primary-cream.webp`** — primary · cream
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Cream Ruched Hobo — A soft cream hobo with ruched gathers across the body and a slim shoulder strap attached with gold links. Colour: Cream (#DDCBAE). Details: Ruched body; Slim shoulder strap; Gold link attachments. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Navy Quilted Shoulder Bag  ·  SM-000035  ·  bags / shoulder
Folder: `public/media/products/navy-quilted-shoulder-bag/`

**`01-primary-navy.webp`** — primary · navy
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Navy Quilted Shoulder Bag — Diamond-quilted navy flap bag with a faceted gold clasp and a gold chain-and-leather strap. Colour: Navy (#1D2A48). Details: Diamond quilting; Faceted gold clasp; Chain-and-leather strap. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Cognac Saddle Crossbody  ·  SM-000036  ·  bags / crossbody
Folder: `public/media/products/cognac-saddle-crossbody/`

**`01-primary-cognac.webp`** — primary · cognac
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Cognac Saddle Crossbody — A rounded saddle-shape crossbody in cognac with a front strap fastening through a gold buckle, and an adjustable crossbody strap. Colour: Cognac (#8A4F28). Details: Saddle silhouette; Gold buckle front strap; Adjustable crossbody strap. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Patent Top-Handle  ·  SM-000037  ·  bags / top-handle
Folder: `public/media/products/black-patent-top-handle/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Patent Top-Handle — A high-shine black patent top-handle bag with a rolled handle, an angled flap and a polished silver clasp. Colour: Noir (#0F0F0F). Materials: Patent finish. Details: High-shine patent finish; Rolled top handle; Polished silver clasp; Angled flap. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Dusty-Pink Quilted Shoulder Bag  ·  SM-000038  ·  bags / shoulder
Folder: `public/media/products/dusty-pink-quilted-shoulder-bag/`

**`01-primary-dusty-pink.webp`** — primary · dusty-pink
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Dusty-Pink Quilted Shoulder Bag — A soft, puffy shoulder bag in dusty pink with chevron quilting and a chunky gold chain strap. Colour: Dusty Pink (#C29087). Details: Chevron quilting; Puffed body; Chunky gold chain strap. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Deep-Green Woven Hobo  ·  SM-000039  ·  bags / hobo
Folder: `public/media/products/deep-green-woven-hobo/`

**`01-primary-deep-green.webp`** — primary · deep-green
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Deep-Green Woven Hobo — A rounded hobo in deep green with an all-over woven lattice and a knotted, woven top handle. Colour: Deep Green (#1F4332). Details: All-over woven lattice; Knotted woven handle; Rounded shape. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Ivory Saddle Crossbody  ·  SM-000040  ·  bags / crossbody
Folder: `public/media/products/ivory-saddle-crossbody/`

**`01-primary-ivory.webp`** — primary · ivory
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Ivory Saddle Crossbody — An ivory saddle crossbody with a front flap strap fastening through a sculpted gold buckle, on a slim shoulder strap. Colour: Ivory (#E4DCCB). Details: Saddle silhouette; Sculpted gold buckle; Slim strap. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Cobalt Structured Top-Handle  ·  SM-000041  ·  bags / top-handle
Folder: `public/media/products/cobalt-structured-top-handle/`

**`01-primary-cobalt.webp`** — primary · cobalt
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Cobalt Structured Top-Handle — A structured cobalt-blue top-handle bag with a rolled handle, a front flap and an organic, sculptural silver clasp. Colour: Cobalt (#1F3C9A). Details: Rolled top handle; Sculptural silver clasp; Front flap. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Caramel Drawstring Bucket Bag  ·  SM-000042  ·  bags / bucket
Folder: `public/media/products/caramel-drawstring-bucket-bag/`

**`01-primary-caramel.webp`** — primary · caramel
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Caramel Drawstring Bucket Bag — A caramel bucket bag with a drawstring closure through gold eyelets, gold bar details and a shoulder strap. Colour: Caramel (#A0612C). Details: Drawstring closure; Gold eyelets; Gold bar details; Shoulder strap. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Charcoal Crescent Hobo  ·  SM-000043  ·  bags / hobo
Folder: `public/media/products/charcoal-crescent-hobo/`

**`01-primary-charcoal.webp`** — primary · charcoal
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Charcoal Crescent Hobo — A rounded charcoal crescent hobo with a gathered, wrapped top handle finished with a gold collar. Colour: Charcoal (#4A4846). Details: Crescent silhouette; Wrapped top handle; Gold handle collar. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Champagne Frame Clutch  ·  SM-000044  ·  bags / clutches
Folder: `public/media/products/champagne-frame-clutch/`

**`01-primary-champagne.webp`** — primary · champagne
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Champagne Frame Clutch — A soft champagne frame clutch with a gold frame and push clasp, sized for evening essentials. Colour: Champagne (#CDB896). Details: Gold frame; Push clasp; Evening size. Front three-quarter view. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Ivory Tailored Blazer  ·  SM-000045  ·  clothing / blazers
Folder: `public/media/products/ivory-tailored-blazer/`

**`01-primary-ivory.webp`** — primary · ivory
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Ivory Tailored Blazer — Cut close to the body with a nipped waist and structured shoulders, the Ivory Tailored Blazer closes with a single button and opens into wide peak lapels. Flap pockets and a welt breast pocket keep the front clean and considered. Colour: Ivory (#EDE6D6). Details: Peak lapels; Single-button closure; Flap pockets; Welt breast pocket; Fitted waist. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Satin Evening Gown  ·  SM-000046  ·  clothing / dresses
Folder: `public/media/products/black-satin-evening-gown/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Satin Evening Gown — A liquid black satin gown on fine spaghetti straps. The soft cowl neckline flows into a gathered, draped waist and a floor-sweeping skirt with a front slit that moves as you walk. Colour: Noir (#16140F). Materials: Satin. Details: Cowl neckline; Spaghetti straps; Gathered drape at the waist; Front slit; Floor length. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Burgundy Satin Blouse  ·  SM-000048  ·  clothing / shirts
Folder: `public/media/products/burgundy-satin-blouse/`

**`01-primary-burgundy.webp`** — primary · burgundy
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Burgundy Satin Blouse — Deep burgundy satin with a lustrous, fluid drape. A classic pointed collar, concealed placket and long sleeves with deep buttoned cuffs make it equally right tucked into tailoring or worn loose. Colour: Burgundy (#6E1C24). Materials: Satin. Details: Pointed collar; Button front; Deep buttoned cuffs; Curved hem; Long sleeves. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Charcoal Double-Breasted Blazer  ·  SM-000049  ·  clothing / blazers
Folder: `public/media/products/charcoal-double-breasted-blazer/`

**`01-primary-charcoal.webp`** — primary · charcoal
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Charcoal Double-Breasted Blazer — A double-breasted charcoal blazer with broad peak lapels, a six-button front and a crisp white pocket square at the breast pocket. The cut is structured through the shoulder and clean through the body. Colour: Charcoal (#3C3B3A). Details: Peak lapels; Six-button double-breasted front; Breast pocket with pocket square; Flap pockets; Structured shoulders. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Emerald Draped Evening Dress  ·  SM-000051  ·  clothing / dresses
Folder: `public/media/products/emerald-draped-evening-dress/`

**`01-primary-emerald.webp`** — primary · emerald
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Emerald Draped Evening Dress — A jewel-toned emerald gown with an asymmetric one-shoulder neckline. Gathered draping wraps across the bodice and hip before falling into a column skirt with a soft side slit. Colour: Emerald (#1F4A36). Details: One-shoulder neckline; Gathered bodice and hip; Side slit; Floor length. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Navy Tuxedo Blazer  ·  SM-000052  ·  clothing / blazers
Folder: `public/media/products/navy-tuxedo-blazer/`

**`01-primary-navy.webp`** — primary · navy
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Navy Tuxedo Blazer — A single-button navy tuxedo jacket with glossy satin peak lapels. The waist is shaped and the shoulder structured, with flap pockets for a clean evening line. Colour: Navy (#1D2740). Details: Satin peak lapels; Single-button closure; Flap pockets; Shaped waist. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Leather Moto Jacket  ·  SM-000053  ·  clothing / jackets
Folder: `public/media/products/black-leather-moto-jacket/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Leather Moto Jacket — A clean, minimal moto jacket in black leather. A centre-front zip, snap-tab band collar, zipped chest pocket and zipped hand pockets, with zipped cuffs to push back or close. Colour: Noir (#161514). Materials: Leather. Details: Centre-front zip; Snap-tab band collar; Zipped chest pocket; Zipped hand pockets; Zipped cuffs. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Light Blue Oxford Shirt  ·  SM-000054  ·  clothing / shirts
Folder: `public/media/products/light-blue-oxford-shirt/`

**`01-primary-sky.webp`** — primary · sky
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Light Blue Oxford Shirt — The classic oxford in a pale sky blue. A point collar, full button front, single chest pocket and buttoned barrel cuffs, finished with a gently curved hem. Colour: Light Blue (#A9C4E6). Details: Point collar; Button front; Chest pocket; Barrel cuffs; Curved hem. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Burgundy Velvet Tuxedo Blazer  ·  SM-000055  ·  clothing / blazers
Folder: `public/media/products/burgundy-velvet-tuxedo-blazer/`

**`01-primary-burgundy.webp`** — primary · burgundy
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Burgundy Velvet Tuxedo Blazer — Rich burgundy velvet with contrasting satin peak lapels. A single-button front, jetted pockets and a softly shaped waist make it the statement jacket for evening. Colour: Burgundy (#4E1620). Materials: Velvet. Details: Satin peak lapels; Single-button closure; Jetted pockets; Shaped waist. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Cream Ribbed Turtleneck  ·  SM-000056  ·  clothing / knitwear
Folder: `public/media/products/cream-ribbed-turtleneck/`

**`01-primary-cream.webp`** — primary · cream
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Cream Ribbed Turtleneck — A soft cream turtleneck with a generous folded roll collar and ribbed cuffs and hem. Easy, warm and quietly elegant under a coat or blazer. Colour: Cream (#ECE3D0). Details: Folded turtleneck collar; Ribbed cuffs and hem; Relaxed fit. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Structured Overcoat  ·  SM-000057  ·  clothing / coats
Folder: `public/media/products/black-structured-overcoat/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Structured Overcoat — A long, single-breasted black overcoat with notch lapels and a concealed front. Flap pockets and a sharp shoulder give it a strong, architectural silhouette. Colour: Noir (#141312). Details: Notch lapels; Concealed front closure; Flap pockets; Below-knee length. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Ivory Silk Bow Blouse  ·  SM-000058  ·  clothing / shirts
Folder: `public/media/products/ivory-silk-bow-blouse/`

**`01-primary-ivory.webp`** — primary · ivory
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Ivory Silk Bow Blouse — A fluid ivory silk blouse with a soft tie-neck bow, full bishop sleeves and multi-button cuffs. Pearl-like buttons run down the front. Colour: Ivory (#EFE8D8). Materials: Silk. Details: Tie-neck bow; Bishop sleeves; Multi-button cuffs; Button front. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Emerald Velvet Dress  ·  SM-000059  ·  clothing / dresses
Folder: `public/media/products/emerald-velvet-dress/`

**`01-primary-emerald.webp`** — primary · emerald
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Emerald Velvet Dress — Deep emerald velvet with a square neckline, a fitted bodice and full puffed sleeves gathered at the cuff. The skirt falls in soft flares to mid-calf. Colour: Emerald (#173A2C). Materials: Velvet. Details: Square neckline; Puff sleeves with fitted cuffs; Fitted bodice; Flared midi skirt. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Charcoal Double-Breasted Suit  ·  SM-000060  ·  clothing / suits
Folder: `public/media/products/charcoal-double-breasted-suit/`

**`01-primary-charcoal.webp`** — primary · charcoal
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Charcoal Double-Breasted Suit — A charcoal two-piece: a six-button double-breasted jacket with peak lapels and flap pockets, paired with straight-leg trousers with a sharp front crease. Colour: Charcoal (#3A3938). Details: Double-breasted jacket; Peak lapels; Flap pockets; Straight-leg trousers; Pressed front crease. Shown on an invisible ghost mannequin, front view, full length, no head, no person, no hanger. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### White Leather Court Sneaker  ·  SM-000061  ·  shoes / sneakers
Folder: `public/media/products/white-leather-court-sneaker/`

**`01-primary-white.webp`** — primary · white
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
White Leather Court Sneaker — A minimal low-top court sneaker in white leather with tonal laces, a cupsole and a tan heel tab. Colour: White (#F1EFEA). Materials: Leather. Details: Low-top profile; Tonal laces; Cupsole; Tan heel tab. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Graphite Performance Runner  ·  SM-000062  ·  shoes / sneakers
Folder: `public/media/products/graphite-performance-runner/`

**`01-primary-graphite.webp`** — primary · graphite
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Graphite Performance Runner — A graphite engineered-knit upper on a thick cushioned white midsole with a red outsole accent. Colour: Graphite (#7D7F82). Details: Knit upper; Cushioned midsole; Red outsole accent. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Technical Trail Runner  ·  SM-000063  ·  shoes / sneakers
Folder: `public/media/products/black-technical-trail-runner/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Technical Trail Runner — Layered black overlays on a mesh upper, a chunky sculpted midsole and a deep-lug outsole for grip. Colour: Black (#171717). Details: Layered overlays; Mesh upper; Chunky midsole; Lugged outsole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Burgundy Leather Court Sneaker  ·  SM-000064  ·  shoes / sneakers
Folder: `public/media/products/burgundy-leather-court-sneaker/`

**`01-primary-burgundy.webp`** — primary · burgundy
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Burgundy Leather Court Sneaker — Smooth burgundy leather, tonal laces and a clean white cupsole — a richer take on the everyday court shoe. Colour: Burgundy (#5E1E22). Materials: Leather. Details: Low-top profile; Tonal laces; White cupsole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Navy & White Heritage Sneaker  ·  SM-000065  ·  shoes / sneakers
Folder: `public/media/products/navy-and-white-heritage-sneaker/`

**`01-primary-navy-white.webp`** — primary · navy-white
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Navy & White Heritage Sneaker — A retro court silhouette with navy overlays on a white base, a perforated toe and a cream vintage-look sole. Colour: Navy & White (#1D2A48). Details: Navy overlays; Perforated toe; Cream sole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Forest Green Trail Sneaker  ·  SM-000066  ·  shoes / sneakers
Folder: `public/media/products/forest-green-trail-sneaker/`

**`01-primary-forest.webp`** — primary · forest
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Forest Green Trail Sneaker — Green mesh and suede-look overlays on a protective toe cap and a lugged, grippy outsole. Colour: Forest Green (#46573F). Details: Mesh upper; Protective toe cap; Lugged outsole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Tan Suede Chukka Boot  ·  SM-000067  ·  shoes / boots
Folder: `public/media/products/tan-suede-chukka-boot/`

**`01-primary-tan.webp`** — primary · tan
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Tan Suede Chukka Boot — A two-eyelet chukka in soft tan suede with a rounded toe and a light crepe-style sole. Colour: Tan (#A06E3F). Materials: Suede. Details: Two-eyelet lacing; Rounded toe; Crepe-style sole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Lug-Sole Lace-Up Boot  ·  SM-000068  ·  shoes / boots
Folder: `public/media/products/black-lug-sole-lace-up-boot/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Lug-Sole Lace-Up Boot — A polished black lace-up boot with a cap toe, speed hooks and a deep chunky lug sole. Colour: Black (#161514). Details: Cap toe; Speed hooks; Chunky lug sole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Brown Chelsea Boot  ·  SM-000069  ·  shoes / boots
Folder: `public/media/products/brown-chelsea-boot/`

**`01-primary-brown.webp`** — primary · brown
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Brown Chelsea Boot — A sleek Chelsea boot in dark brown polished leather with elastic side gores and a pull tab. Colour: Brown (#4E2E1E). Materials: Leather. Details: Elastic side gores; Pull tab; Almond toe. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Heeled Chelsea Boot  ·  SM-000070  ·  shoes / boots
Folder: `public/media/products/black-heeled-chelsea-boot/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Heeled Chelsea Boot — A polished black ankle boot with a pointed toe, a stacked block heel and an inside zip. Colour: Black (#141414). Details: Block heel; Side zip; Pointed toe. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Honey Hiking Boot  ·  SM-000071  ·  shoes / boots
Folder: `public/media/products/honey-hiking-boot/`

**`01-primary-honey.webp`** — primary · honey
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Honey Hiking Boot — A classic hiker in honey-toned nubuck with a padded collar, speed-hook lacing and a lugged outsole. Colour: Honey (#B7732E). Details: Padded collar; Speed-hook lacing; Lugged outsole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Cream Shearling Winter Boot  ·  SM-000072  ·  shoes / boots
Folder: `public/media/products/cream-shearling-winter-boot/`

**`01-primary-cream.webp`** — primary · cream
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Cream Shearling Winter Boot — A soft cream suede-look boot with a fluffy shearling-look cuff and a light rubber sole. Colour: Cream (#E3D8C5). Details: Shearling-look cuff; Pull-on; Rubber sole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Combat Boot  ·  SM-000073  ·  shoes / boots
Folder: `public/media/products/black-combat-boot/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Combat Boot — A high lace-up combat boot in black leather with a padded collar and a chunky lug sole. Colour: Black (#151515). Details: High lace-up; Padded collar; Lug sole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Tall Brown Leather Riding Boot  ·  SM-000074  ·  shoes / boots
Folder: `public/media/products/tall-brown-leather-riding-boot/`

**`01-primary-brown.webp`** — primary · brown
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Tall Brown Leather Riding Boot — A tall riding boot in polished brown leather with a buckled strap at the top and a low stacked heel. Colour: Brown (#5B361F). Materials: Leather. Details: Knee height; Buckled top strap; Low stacked heel. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Penny Loafer  ·  SM-000075  ·  shoes / loafers
Folder: `public/media/products/black-penny-loafer/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Penny Loafer — A classic penny loafer in high-shine black with a moc-toe seam and a saddle strap. Colour: Black (#121212). Details: Saddle strap; Moc-toe seam; Low heel. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Burgundy Tassel Loafer  ·  SM-000076  ·  shoes / loafers
Folder: `public/media/products/burgundy-tassel-loafer/`

**`01-primary-burgundy.webp`** — primary · burgundy
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Burgundy Tassel Loafer — A burgundy loafer with a polished finish, a moc-toe seam and tassel detailing at the vamp. Colour: Burgundy (#5A1620). Details: Tassel detail; Moc-toe seam; High-shine finish. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Brown Double-Monk Dress Shoe  ·  SM-000077  ·  shoes / formal
Folder: `public/media/products/brown-double-monk-dress-shoe/`

**`01-primary-brown.webp`** — primary · brown
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Brown Double-Monk Dress Shoe — A brown dress shoe with two buckled monk straps, a stitched cap toe and a slim leather-look sole. Colour: Brown (#5A3220). Details: Double monk straps; Cap toe; Slim sole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Cap-Toe Derby  ·  SM-000078  ·  shoes / formal
Folder: `public/media/products/black-cap-toe-derby/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Cap-Toe Derby — A polished black derby with open lacing and a stitched cap toe on a slim sole. Colour: Black (#121212). Details: Open lacing; Stitched cap toe; Slim sole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Taupe Suede Driving Loafer  ·  SM-000079  ·  shoes / loafers
Folder: `public/media/products/taupe-suede-driving-loafer/`

**`01-primary-taupe.webp`** — primary · taupe
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Taupe Suede Driving Loafer — An unstructured driving loafer in taupe suede with a moc-toe seam and a flexible sole. Colour: Taupe (#8B7B6C). Materials: Suede. Details: Moc-toe seam; Unstructured shape; Flexible sole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Ivory Shearling Mule  ·  SM-000080  ·  shoes / slippers
Folder: `public/media/products/ivory-shearling-mule/`

**`01-primary-ivory.webp`** — primary · ivory
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Ivory Shearling Mule — An open-toe mule with a plush ivory shearling-look strap on a cushioned footbed. Colour: Ivory (#EFE6D6). Details: Plush strap; Open toe; Cushioned footbed. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Minimal Black Slide  ·  SM-000081  ·  shoes / slippers
Folder: `public/media/products/minimal-black-slide/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Minimal Black Slide — A clean black slide with a single wide strap on a contoured footbed. Colour: Black (#161616). Details: Wide single strap; Contoured footbed; Slip-on. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Woven Tan Leather Sandal  ·  SM-000082  ·  shoes / sandals
Folder: `public/media/products/woven-tan-leather-sandal/`

**`01-primary-tan.webp`** — primary · tan
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Woven Tan Leather Sandal — A flat slide sandal with a wide hand-woven-look tan leather strap and a low stacked heel. Colour: Tan (#A5652F). Materials: Leather. Details: Woven strap; Square toe; Low stacked heel. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### White Premium Leather Sneaker  ·  SM-000083  ·  shoes / sneakers
Folder: `public/media/products/white-premium-leather-sneaker/`

**`01-primary-white.webp`** — primary · white
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
White Premium Leather Sneaker — A tonal white leather sneaker with perforated toe, stitched overlays and a silver heel tab. Colour: White (#F3F3F1). Materials: Leather. Details: Perforated toe; Stitched overlays; Silver heel tab. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Technical Runner  ·  SM-000084  ·  shoes / sneakers
Folder: `public/media/products/black-technical-runner/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Technical Runner — Layered black mesh and synthetic overlays with metallic silver accents on a sculpted, chunky sole. Colour: Black (#141414). Details: Layered overlays; Metallic accents; Sculpted sole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Taupe Retro Mesh & Suede Runner  ·  SM-000085  ·  shoes / sneakers
Folder: `public/media/products/taupe-retro-mesh-and-suede-runner/`

**`01-primary-taupe.webp`** — primary · taupe
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Taupe Retro Mesh & Suede Runner — A retro running silhouette mixing taupe suede overlays with cream mesh on a cushioned sole. Colour: Taupe (#9D9080). Details: Suede overlays; Mesh panels; Cushioned sole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black & White High-Top Sneaker  ·  SM-000086  ·  shoes / sneakers
Folder: `public/media/products/black-and-white-high-top-sneaker/`

**`01-primary-black-white.webp`** — primary · black-white
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black & White High-Top Sneaker — A high-top sneaker with black overlays on a white base, a padded collar and a white cupsole. Colour: Black & White (#1A1A1A). Details: High-top collar; Colour-blocked panels; White cupsole. Side three-quarter view, toe pointing right. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Dive Automatic  ·  SM-000087  ·  watches / diver
Folder: `public/media/products/black-dive-automatic/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Dive Automatic — A steel dive watch with a glossy black dial, bold luminous dot and baton markers, and a black unidirectional-style bezel with a minute track. A date window at three and a three-link steel bracelet complete the tool-watch look. Colour: Black (#15161A). Details: Black rotating-style bezel; Luminous-style markers; Date window at 3 o'clock; Three-link steel bracelet. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Champagne Gold Fluted Dress Watch  ·  SM-000088  ·  watches / dress
Folder: `public/media/products/champagne-gold-fluted-dress-watch/`

**`01-primary-gold.webp`** — primary · gold
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Champagne Gold Fluted Dress Watch — Warm gold tone from end to end: a sunburst champagne dial with slim baton markers, a finely fluted bezel, a date window at three and a semi-round three-link gold-tone bracelet. Colour: Champagne Gold (#C9A45C). Details: Champagne sunburst dial; Fluted bezel; Date window at 3 o'clock; Gold-tone three-link bracelet. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Rose Gold Chronograph  ·  SM-000089  ·  watches / chronograph
Folder: `public/media/products/rose-gold-chronograph/`

**`01-primary-rose-gold.webp`** — primary · rose-gold
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Rose Gold Chronograph — A rose-gold-tone case with pump-style pushers frames a black dial with three sub-dials, applied Roman and baton markers and matching rose-tone hands, on a stitched black leather strap. Colour: Rose Gold (#C88E6E). Details: Three sub-dials; Pump-style pushers; Applied markers; Stitched black leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Blue & Black GMT Sport  ·  SM-000090  ·  watches / gmt
Folder: `public/media/products/blue-and-black-gmt-sport/`

**`01-primary-blue-black.webp`** — primary · blue-black
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Blue & Black GMT Sport — A black dial with luminous-style markers and a fourth, arrow-tipped hand, set inside a two-tone blue and black 24-hour bezel. Date at three, steel three-link bracelet. Colour: Blue & Black (#1B2A4A). Details: Two-tone 24-hour bezel; Arrow-tipped fourth hand; Date window at 3 o'clock; Steel bracelet. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Midnight Blue Dress Watch  ·  SM-000091  ·  watches / dress
Folder: `public/media/products/midnight-blue-dress-watch/`

**`01-primary-midnight.webp`** — primary · midnight
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Midnight Blue Dress Watch — Pure and understated: a deep midnight-blue sunburst dial with slim baton markers and hands, a thin polished steel case and a navy alligator-embossed strap. Colour: Midnight Blue (#1C2C55). Details: Midnight-blue sunburst dial; Slim baton markers; Thin polished case; Navy embossed strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Open-Worked Black Skeleton  ·  SM-000092  ·  watches / skeleton
Folder: `public/media/products/open-worked-black-skeleton/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Open-Worked Black Skeleton — An open-worked dial reveals gears, bridges and jewels inside a polished steel case, with Arabic numeral chapter ring and a black textured leather strap. Colour: Black (#18181A). Details: Open-worked dial; Visible gear train; Numeral chapter ring; Black textured leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Rectangular Art-Deco Dress Watch  ·  SM-000093  ·  watches / dress
Folder: `public/media/products/rectangular-art-deco-dress-watch/`

**`01-primary-silver.webp`** — primary · silver
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Rectangular Art-Deco Dress Watch — A rectangular steel case with gadrooned top and bottom edges, a silvered dial with black Arabic numerals and a railway minute track, on a black leather strap. Colour: Silver (#D8D6D0). Details: Rectangular case; Gadrooned case edges; Arabic numerals; Black leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Emerald Integrated-Bracelet Watch  ·  SM-000094  ·  watches / sport
Folder: `public/media/products/emerald-integrated-bracelet-watch/`

**`01-primary-emerald.webp`** — primary · emerald
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Emerald Integrated-Bracelet Watch — A rounded-octagonal steel case flows directly into a flat-link integrated bracelet. The embossed emerald-green dial carries applied baton markers. Colour: Emerald (#1F5A3F). Details: Cushion-octagonal case; Integrated flat-link bracelet; Embossed emerald dial; Applied baton markers. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Silver Chronograph  ·  SM-000095  ·  watches / chronograph
Folder: `public/media/products/silver-chronograph/`

**`01-primary-silver.webp`** — primary · silver
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Silver Chronograph — A crisp white dial with three contrasting black sub-dials, a black tachymeter-style bezel and screw-style pushers, on a steel three-link bracelet. Colour: Silver (#E3E1DC). Details: White dial with black sub-dials; Tachymeter-style bezel; Screw-style pushers; Steel bracelet. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Rose Gold Diamond Bezel  ·  SM-000096  ·  watches / jewellery
Folder: `public/media/products/rose-gold-diamond-bezel/`

**`01-primary-rose-gold.webp`** — primary · rose-gold
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Rose Gold Diamond Bezel — A rose-gold-tone case framed by a stone-set bezel, a mother-of-pearl dial with stone markers and a date window, on a matching five-link bracelet. Colour: Rose Gold (#D4A083). Details: Stone-set bezel; Mother-of-pearl-effect dial; Stone hour markers; Five-link bracelet. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Dial Pilot Watch  ·  SM-000097  ·  watches / pilot
Folder: `public/media/products/black-dial-pilot-watch/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Dial Pilot Watch — A legible black dial with large Arabic numerals and gold-tone hands in a steel case, paired with a contrast-stitched brown leather strap. Colour: Black (#141414). Details: Large Arabic numerals; Gold-tone hands; Contrast-stitched strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Moonphase Dress Watch  ·  SM-000098  ·  watches / complication
Folder: `public/media/products/moonphase-dress-watch/`

**`01-primary-silver.webp`** — primary · silver
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Moonphase Dress Watch — A silver-white dial with slim markers and a moonphase aperture at six, in a polished rose-gold-tone case on a black leather strap. Colour: Silver (#E5E2DA). Details: Moonphase display; Silver-white dial; Rose-gold-tone case; Black leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black & Gold Chronograph  ·  SM-000099  ·  watches / chronograph
Folder: `public/media/products/black-and-gold-chronograph/`

**`01-primary-black-gold.webp`** — primary · black-gold
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black & Gold Chronograph — Black case and dial with gold-tone accents on the sub-dials, markers and bezel scale, on a black rubber strap for everyday wear. Colour: Black & Gold (#1A1712). Details: Gold-tone accents; Three sub-dials; Scaled bezel; Black rubber strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Emerald Diamond-Set Watch  ·  SM-000100  ·  watches / jewellery
Folder: `public/media/products/emerald-diamond-set-watch/`

**`01-primary-emerald.webp`** — primary · emerald
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Emerald Diamond-Set Watch — A green sunburst dial with applied markers and a date window, framed by a stone-set bezel in a gold-tone case with a matching three-link bracelet. Colour: Emerald & Gold (#2A5A3A). Details: Emerald sunburst dial; Stone-set bezel; Date window; Gold-tone bracelet. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Blue Dive Automatic  ·  SM-000101  ·  watches / diver
Folder: `public/media/products/blue-dive-automatic/`

**`01-primary-blue.webp`** — primary · blue
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Blue Dive Automatic — A deep blue dial with luminous-style markers and a matching blue rotating-style bezel, a date window at three and a steel three-link bracelet. Colour: Blue (#1E3566). Details: Blue rotating-style bezel; Luminous-style markers; Date window at 3 o'clock; Steel bracelet. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Rose Gold Rectangular Watch  ·  SM-000102  ·  watches / dress
Folder: `public/media/products/rose-gold-rectangular-watch/`

**`01-primary-rose-gold.webp`** — primary · rose-gold
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Rose Gold Rectangular Watch — A slim rectangular rose-gold-tone case, a white dial with black Roman numerals and blued-style hands, on a black leather strap. Colour: Rose Gold (#C99273). Details: Rectangular case; Roman numerals; Blued-style hands; Black leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Rose Gold Integrated Bracelet  ·  SM-000103  ·  watches / sport
Folder: `public/media/products/rose-gold-integrated-bracelet/`

**`01-primary-rose-gold.webp`** — primary · rose-gold
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Rose Gold Integrated Bracelet — A rose-gold-tone case with a broad polished bezel, a textured black dial with applied markers, and an integrated black strap. Colour: Rose Gold (#C38867). Details: Broad polished bezel; Textured black dial; Applied markers; Integrated black strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Olive Field Watch  ·  SM-000104  ·  watches / field
Folder: `public/media/products/olive-field-watch/`

**`01-primary-olive.webp`** — primary · olive
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Olive Field Watch — A rugged, legible field watch: olive-green dial with large Arabic numerals and a 24-hour track, steel case and a matching olive canvas strap. Colour: Olive (#5B6340). Details: Olive dial; Large Arabic numerals; 24-hour inner track; Olive canvas strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Burgundy Dress Watch  ·  SM-000105  ·  watches / dress
Folder: `public/media/products/burgundy-dress-watch/`

**`01-primary-burgundy.webp`** — primary · burgundy
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Burgundy Dress Watch — A burgundy dial that darkens towards the edge, slim applied markers and dauphine-style hands, in a polished steel case on a dark brown leather strap. Colour: Burgundy (#5A1726). Details: Burgundy fumé-style dial; Applied markers; Polished steel case; Brown leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Ice Blue Fluted-Bezel Watch  ·  SM-000106  ·  watches / dress
Folder: `public/media/products/ice-blue-fluted-bezel-watch/`

**`01-primary-ice-blue.webp`** — primary · ice-blue
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Ice Blue Fluted-Bezel Watch — A pale ice-blue sunburst dial with baton markers and a date window, framed by a fluted bezel, on a five-link steel bracelet. Colour: Ice Blue (#A9C9DC). Details: Ice-blue sunburst dial; Fluted bezel; Date window; Five-link steel bracelet. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Rose Gold Open-Worked Watch  ·  SM-000107  ·  watches / skeleton
Folder: `public/media/products/rose-gold-open-worked-watch/`

**`01-primary-rose-gold.webp`** — primary · rose-gold
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Rose Gold Open-Worked Watch — A rose-gold-tone case frames an open-worked dial with visible gears and bridges, on a black leather strap. Colour: Rose Gold (#C4896A). Details: Open-worked dial; Visible movement; Rose-gold-tone case; Black leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Rose Gold Chronograph II  ·  SM-000108  ·  watches / chronograph
Folder: `public/media/products/rose-gold-chronograph-ii/`

**`01-primary-salmon.webp`** — primary · salmon
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Rose Gold Chronograph II — A salmon-pink dial with three black sub-dials inside a black scaled bezel and rose-gold-tone case, on a navy leather strap. Colour: Salmon (#E4AE98). Details: Salmon dial; Black sub-dials; Scaled black bezel; Navy leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Emerald Gold Diver  ·  SM-000109  ·  watches / diver
Folder: `public/media/products/emerald-gold-diver/`

**`01-primary-emerald.webp`** — primary · emerald
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Emerald Gold Diver — An emerald-green dial and matching rotating-style bezel with gold-tone numerals, in a steel and gold-tone case on a two-tone three-link bracelet. Colour: Emerald & Gold (#1F5A36). Details: Emerald dial and bezel; Gold-tone accents; Date window; Two-tone bracelet. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Diamond Pavé Rectangular Watch  ·  SM-000110  ·  watches / jewellery
Folder: `public/media/products/diamond-pav-rectangular-watch/`

**`01-primary-pave.webp`** — primary · pave
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Diamond Pavé Rectangular Watch — A rectangular case and bracelet fully pavé-set with sparkling stones, a pavé dial and rose-gold-tone hands — a high-jewellery evening piece. Colour: Pavé Gold (#E7DFCB). Details: Fully pavé-set case; Pavé bracelet; Pavé dial; Rectangular case. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Burgundy Leather Dress Watch  ·  SM-000111  ·  watches / dress
Folder: `public/media/products/burgundy-leather-dress-watch/`

**`01-primary-burgundy.webp`** — primary · burgundy
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Burgundy Leather Dress Watch — A rich burgundy dial with a small seconds sub-dial and applied markers, in a steel case on a matching burgundy leather strap. Colour: Burgundy (#6D1E2B). Details: Burgundy dial; Small seconds sub-dial; Applied markers; Burgundy leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Full Pavé Gold Watch  ·  SM-000112  ·  watches / jewellery
Folder: `public/media/products/full-pav-gold-watch/`

**`01-primary-pave.webp`** — primary · pave
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Full Pavé Gold Watch — A round gold-tone watch with stones set across the bezel, dial and bracelet, with stone hour markers and a date window. Colour: Pavé Gold (#E2D6B6). Details: Pavé-set bezel and bracelet; Pavé dial; Stone hour markers; Date window. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Sport Automatic  ·  SM-000113  ·  watches / sport
Folder: `public/media/products/black-sport-automatic/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Sport Automatic — A clean black dial with slim baton markers and a date window in a brushed steel case, on a black rubber strap. Colour: Black (#18191B). Details: Black dial; Baton markers; Date window; Black rubber strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Blue GMT Sport II  ·  SM-000114  ·  watches / gmt
Folder: `public/media/products/blue-gmt-sport-ii/`

**`01-primary-blue.webp`** — primary · blue
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Blue GMT Sport II — A blue dial with luminous-style markers and an arrow-tipped fourth hand, inside a blue and black 24-hour bezel, on a steel three-link bracelet. Colour: Blue (#1E3D7A). Details: Blue dial; Two-tone 24-hour bezel; Arrow-tipped fourth hand; Steel bracelet. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Silver Moonphase Watch  ·  SM-000115  ·  watches / complication
Folder: `public/media/products/silver-moonphase-watch/`

**`01-primary-silver.webp`** — primary · silver
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Silver Moonphase Watch — A silver dial with applied markers, a moonphase display at six and a date window at three, in a steel case on a brown leather strap. Colour: Silver (#E6E4DF). Details: Moonphase display; Date window; Silver dial; Brown leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Skeleton Tourbillon Style  ·  SM-000116  ·  watches / skeleton
Folder: `public/media/products/black-skeleton-tourbillon-style/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Skeleton Tourbillon Style — A tonneau-shaped case with an open-worked, tourbillon-inspired dial showing layered bridges and gears, on a black leather strap. Colour: Black (#161616). Details: Tonneau case; Open-worked dial; Tourbillon-inspired design; Black leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Blue Roman-Numeral Dress Watch  ·  SM-000117  ·  watches / dress
Folder: `public/media/products/blue-roman-numeral-dress-watch/`

**`01-primary-blue.webp`** — primary · blue
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Blue Roman-Numeral Dress Watch — A royal-blue sunburst dial with applied Roman numerals in a polished rose-gold-tone case, on a blue leather strap. Colour: Blue (#1F3A7A). Details: Blue sunburst dial; Roman numerals; Rose-gold-tone case; Blue leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Diver II  ·  SM-000118  ·  watches / diver
Folder: `public/media/products/black-diver-ii/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Diver II — A black dial with luminous-style dot markers and a matching black rotating-style bezel, a date window at three and a steel three-link bracelet. Colour: Black (#141518). Details: Black rotating-style bezel; Luminous-style markers; Date window; Steel bracelet. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Rose Gold Chronograph III  ·  SM-000119  ·  watches / chronograph
Folder: `public/media/products/rose-gold-chronograph-iii/`

**`01-primary-salmon.webp`** — primary · salmon
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Rose Gold Chronograph III — A salmon dial with three matching sub-dials in a rose-gold-tone case with pump-style pushers, on a brown leather strap. Colour: Salmon (#E2A98F). Details: Salmon dial; Three sub-dials; Pump-style pushers; Brown leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Green Textured Dial Sport Watch  ·  SM-000120  ·  watches / sport
Folder: `public/media/products/green-textured-dial-sport-watch/`

**`01-primary-green.webp`** — primary · green
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Green Textured Dial Sport Watch — A faceted steel case with an integrated bracelet and a textured green dial with applied baton markers. Colour: Green (#2F5F45). Details: Faceted steel case; Integrated bracelet; Textured green dial; Applied markers. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Gold Pavé Bracelet Watch  ·  SM-000121  ·  watches / jewellery
Folder: `public/media/products/gold-pav-bracelet-watch/`

**`01-primary-pave.webp`** — primary · pave
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Gold Pavé Bracelet Watch — A small round gold-tone watch with a pavé dial, stone-set bezel and a stone-set bracelet for evening. Colour: Pavé Gold (#E5D8B5). Details: Pavé dial; Stone-set bezel; Stone-set bracelet; Petite case. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

### Black Minimal Chronograph  ·  SM-000122  ·  watches / chronograph
Folder: `public/media/products/black-minimal-chronograph/`

**`01-primary-noir.webp`** — primary · noir
- Generate with:
- Reference image: none needed (this is the first photo of the product)

```
Black Minimal Chronograph — A restrained black dial with slim markers and a single small sub-dial, in a polished steel case on a black leather strap. Colour: Black (#121212). Details: Black dial; Small sub-dial; Polished steel case; Black leather strap. Front view, watch standing upright. The product itself carries no logo, no monogram, no brand name and no text of any kind. Placed on a seamless warm ivory studio sweep background, soft diffused key light from upper left, gentle natural contact shadow, ultra sharp focus, realistic material texture and stitching, accurate proportions, 85mm lens, high-end luxury e-commerce catalog photography. No text, no logos, no brand marks, no people. Product centered with generous negative space, vertical 4:5 composition.
```

---

## D. Hero product tasveerein (14): aapko kuch nahi karna

`public/media/hero/<product>.webp` repo ki script (`scripts/media/hero-composites.py`) product ki editorial photo se khud banati hai. Product photos aate hi main bana dunga.

## E. Logo (2): asli file chahiye

`public/brand/supermimic-logo.png` aur `public/brand/supermimic-logo-white.png` (bade size, ~1348px chaudai). Yeh aapka official logo hai: AI se dobara mat banwayein, warna shape badal jayegi. Apni asli logo PNG (transparent background) bhej dein, main dono versions bana dunga.
