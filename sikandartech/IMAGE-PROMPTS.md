# SikandarTech: photo prompts

Generate these images, save each one with the exact file name shown, and put it in the folder shown.
Then send them back (or drop them in the folders and run `python3 catalog-src/build.py`). The website
swaps the illustration for your photo automatically.

**Rules for every image**
- No smartphones or mobile phones anywhere in the picture.
- No brand logos, no text, no watermarks, no people's faces.
- Generic product designs (not a copy of a specific brand's product).
- Same look for all photos so the site feels consistent (use the style line below).

**Style line** (add to the end of every prompt):
> premium studio product photography, seamless off-white background (#F5F5F3), soft diffused top light, gentle contact shadow, subtle warm orange rim light (#FF5A1F), crisp realistic materials and reflections, centered composition, generous empty space around the product, no text, no logos, no smartphones, photorealistic, 8k

---

## 1. Hero (1 image) — most important

| File | Folder | Size |
|---|---|---|
| `hero.png` (transparent background) or `hero.webp` | `images/hero/` | 2000 × 2000, 1:1 |

> Premium over-ear wireless noise-cancelling headphones, matte graphite black ear cups with brushed metal sliders and a thin glowing orange accent ring around each ear cup, cushioned headband, three-quarter front view floating slightly above the ground, dramatic studio lighting with soft reflections + style line

If you can export a transparent PNG, do that. After adding it, set `hero: "images/hero/hero.png"` in the `MEDIA` block at the top of `script.js` (or tell me and I'll do it).

---

## 2. Featured and showroom products (12 images)

Folder: `images/products/` · Size: 1600 × 1600 (1:1) · File name = product id below

| File name | Prompt (add the style line) |
|---|---|
| `noise-cancelling-headphones.jpg` | Over-ear noise-cancelling headphones, matte graphite finish, folded slightly open, three-quarter view |
| `ai-smartwatches.jpg` | Modern smartwatch with a square AMOLED screen showing an abstract health ring graphic, graphite aluminium case, sport band, three-quarter view |
| `professional-camera-drones.jpg` | Professional foldable camera drone with a large gimbal camera, arms unfolded, matte grey, slight top-down three-quarter view |
| `mechanical-keyboards.jpg` | Compact 75% mechanical keyboard, aluminium case, off-white and grey keycaps with one orange accent key, low angle three-quarter view |
| `robot-vacuum-mop-systems.jpg` | Round robot vacuum and mop next to its self-emptying docking station, white and graphite, three-quarter view |
| `portable-power-stations.jpg` | Portable power station with carry handle, AC and USB ports on the front, small display, graphite and orange accents, three-quarter view |
| `compact-travel-drones.jpg` | Small lightweight foldable travel drone, folded arms, palm-sized, light grey, three-quarter view |
| `smart-rings.jpg` | Two smart rings in titanium and matte black, standing upright, macro close-up showing sensor bumps inside |
| `handheld-gaming-pcs.jpg` | Handheld gaming PC with a 7-inch screen showing an abstract colourful game scene, controls on both sides, three-quarter view |
| `4k-laser-projectors.jpg` | Compact 4K laser projector, fabric-wrapped speaker sides, glowing lens, three-quarter view |
| `robotic-vacuum-cleaners.jpg` | Slim round robot vacuum with lidar turret on top, side brush visible, three-quarter view on the floor plane |
| `action-cameras.jpg` | Rugged waterproof action camera with front and rear screens, black, small mount attached, three-quarter view |

---

## 3. Category tiles (24 images)

Folder: `images/categories/` · Size: 1600 × 1200 (4:3, landscape) · Keep the **bottom-left third** fairly empty: the category name is written there.

| File name | Prompt (add the style line) |
|---|---|
| `ai-gadgets.jpg` | Arrangement of AI gadgets: AI smart glasses, a pocket AI voice recorder and a small AI translator device |
| `computers.jpg` | Slim modern laptop half open next to a compact mini PC |
| `tablets.jpg` | Tablet with stylus next to an E-ink reader showing abstract text lines |
| `xr.jpg` | Sleek VR / mixed-reality headset with two motion controllers |
| `wearables.jpg` | Smartwatch, smart ring and fitness band arranged together |
| `audio.jpg` | Over-ear headphones, wireless earbuds with open case and a small Bluetooth speaker |
| `cameras.jpg` | Mirrorless camera with lens next to a small action camera and a 360 camera |
| `drones-robotics.jpg` | Camera drone in flight pose next to a small quadruped robot dog |
| `gaming.jpg` | Game controller, mechanical keyboard corner and gaming mouse with soft RGB glow |
| `smart-home.jpg` | Smart speaker, video doorbell, smart bulb and a small security camera |
| `kitchen-appliances.jpg` | Modern air fryer, espresso machine and smart kettle on a light counter |
| `power.jpg` | Portable power station with a folding solar panel and a power bank |
| `networking.jpg` | Wi-Fi 7 router with antennas next to a mesh Wi-Fi node |
| `storage.jpg` | Portable SSD, memory cards and a small 2-bay NAS |
| `displays.jpg` | Ultra-short-throw projector in front of a light wall showing an abstract image, plus a slim TV edge |
| `automotive.jpg` | Folded electric scooter next to a dashcam and a tyre inflator |
| `health-fitness.jpg` | Massage gun, smart scale and heart-rate chest strap |
| `maker.jpg` | Enclosed 3D printer printing an orange part, desktop laser engraver beside it |
| `future-tech.jpg` | Futuristic white humanoid robot torso and a transparent display panel, clean lab look |
| `security.jpg` | Hardware security key, fingerprint door lock and encrypted USB drive |
| `travel-outdoor.jpg` | Satellite messenger, handheld GPS and thermal monocular on a light surface |
| `office-education.jpg` | 4K webcam, conference speakerphone and ergonomic split keyboard |
| `care-beauty.jpg` | High-speed hair dryer, electric toothbrush and LED face mask |
| `accessories.jpg` | GaN charger, braided USB-C cables, tracker tag and a laptop stand |

---

## 4. Any other product (optional, up to 687)

Every product in the catalogue can get its own photo the same way: save it as
`images/products/<product-id>.jpg` (1600 × 1600). The product id is the product name in lowercase
with dashes, for example `robot-dogs.jpg`, `smart-air-fryers.jpg`, `vr-treadmills.jpg`.
It also appears in the page address when you open a product, e.g. `products.html#robot-dogs`.
Do **not** make photos for anything with "smartphone", "mobile" or "phone" in the name.

## Community (UGC) videos

These must be real customer content shared with permission, not generated. Add them in `ugc-data.js`
(instructions are at the top of that file). Use MP4 (H.264) or WebM, portrait 9:16, up to 60 s.
