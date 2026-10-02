#!/usr/bin/env python3
"""Write one image prompt per product that has no photo yet.

Usage:  python3 catalog-src/make-prompts.py
Output: PRODUCT-PHOTO-PROMPTS.md (readable checklist) and product-photo-prompts.csv (bulk tools).
Re-run after adding photos: products that already have images/products/<id>.* drop off the list.
"""
import csv
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)

src = open(os.path.join(SITE, "catalog.js"), encoding="utf-8").read()
cats = json.loads(re.search(r"const CATEGORIES = (\[.*?\]);\n", src, re.S).group(1))
prods = json.loads(re.search(r"const PRODUCTS = (\[.*?\]);\n", src, re.S).group(1))

STYLE = (
    "Premium studio product photography, seamless light off-white background, soft diffused light, "
    "gentle contact shadow, subtle warm orange rim light, realistic materials and reflections, "
    "three-quarter view, centered, the product fills about 65% of the frame, ultra sharp, photorealistic, "
    "square 1:1, full-bleed image filling the entire frame. "
    "Generic unbranded design: no text, no letters, no numbers, no logos, no brand names, no watermark, "
    "no people, no hands, no smartphones or mobile phones anywhere."
)

# Things that cannot be photographed well on their own get a short staging hint.
SCENES = [
    (r"glasses|eyewear", "resting on a small light stone block"),
    (r"smart (blinds|curtains)|curtain", "shown installed on a window in a bright minimal room, no people"),
    (r"smart (clothing|helmet)|haptic (vest|suit)|vest|suit|clothing", "shown on a plain grey mannequin form, no head, no people"),
    (r"lock|doorbell|intercom|\baccess\b|access control", "shown mounted on a light grey door or wall section"),
    (r"lawn mower", "on a small patch of neat green grass"),
    (r"pool cleaner", "at the bottom of clear blue pool water"),
    (r"window[- ]clean", "attached to a clean glass window pane"),
    (r"scooter|bike|bicycle|motorcycle|hoverboard|skateboard|mobility", "full product visible, side three-quarter view"),
    (r"treadmill|rowing|exercise bike|strength|cockpit|chair|mattress|sleep pad", "full product visible in a bright minimal room"),
    (r"router|access point|switch|server|nas|firewall|gateway", "on a clean light desk surface"),
    (r"drone", "hovering slightly above the floor"),
    (r"robot", "standing on a light grey floor"),
    (r"television|tv\b|display(?! glasses)|(?<!posture )(?<!quality )monitors?\b|projector|signage|whiteboard", "screen showing a soft abstract colour gradient"),
]

# Extra direction for products that generators often get wrong (fake text, look-alike brands).
EXTRAS = [
    (r"watch", "The watch face shows a simple glowing abstract ring graphic, no digits and no clock numbers."),
    (r"earbud|hearing aid", "Original generic design that does not resemble any famous brand's product."),
    (r"glove", "Displayed on a plain grey hand-shaped mannequin form, not a real hand."),
    (r"motion controllers", "A matching left and right pair."),
    (r"pet tracker", "Attached to a small plain pet collar."),
    (r"e-reader|e-ink|e-book", "The screen shows a simple soft abstract pattern, no book page, no comic, no writing, no page numbers."),
]

def extras(name):
    return " ".join(t for pat, t in EXTRAS if re.search(pat, name, re.I))

def scene(name):
    for pat, hint in SCENES:
        if re.search(pat, name, re.I):
            return hint
    return ""

def clean(text):
    # Drop any sentence that mentions a phone so the prompt never asks for one
    parts = re.split(r"(?<=[.!?])\s+", text)
    return " ".join(p for p in parts if not re.search(r"(?<!head)(?<!speaker)(?<!micro)phone", p, re.I)).strip()

photo_dir = os.path.join(SITE, "images", "products")
have = {os.path.splitext(f)[0] for f in os.listdir(photo_dir) if f.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))} if os.path.isdir(photo_dir) else set()
cat_by = {c["id"]: c for c in cats}

rows = []
for i, p in enumerate(prods):
    if p["id"] in have:
        continue
    name = p["name"]
    desc = clean(p["desc"]) or {"lte-smartwatches": "Smartwatches with built-in LTE for calls, messages and GPS without another device."}.get(p["id"], "")
    visible = [s for s in p["specs"] if not re.search(r"app|voice|ai\b|software|sdk|cloud|warranty|phone", s, re.I)]
    parts = [f"Studio product photo: {name}."]
    if desc:
        parts.append(desc)
    if visible:
        parts.append("Show design details that suggest: " + ", ".join(visible[:3]).lower() + ".")
    if extras(name):
        parts.append(extras(name))
    hint = scene(name)
    if hint:
        parts.append(hint[0].upper() + hint[1:] + ".")
    parts.append(STYLE)
    rows.append({
        "code": "ST-" + str(i + 1).zfill(4),
        "file": p["id"] + ".jpg",
        "product": name,
        "category": cat_by[p["cat"]]["name"],
        "prompt": " ".join(parts),
    })

with open(os.path.join(SITE, "product-photo-prompts.csv"), "w", newline="", encoding="utf-8") as f:
    w = csv.DictWriter(f, fieldnames=["code", "file", "product", "category", "prompt"])
    w.writeheader()
    w.writerows(rows)

out = [
    "# SikandarTech: product photo prompts (complete listing)",
    "",
    f"**{len(rows)} products still need a photo** ({len(have)} done). One prompt per product, ready to copy.",
    "",
    "How to use:",
    "1. Set the generator to **square 1:1** and download in the highest resolution available (1024 px or more).",
    "2. Save each image with the **exact file name** shown (any of .jpg / .png / .webp works).",
    "3. Send them in the chat in groups of 4-5 (or put them in `images/products/` and run `python3 catalog-src/build.py`).",
    "",
    "The same list is in `product-photo-prompts.csv` for bulk tools (columns: code, file, product, category, prompt).",
    "Re-run `python3 catalog-src/make-prompts.py` to refresh the list after adding photos.",
    "",
]
current = None
for r in rows:
    if r["category"] != current:
        current = r["category"]
        n = sum(1 for x in rows if x["category"] == current)
        out += ["---", "", f"## {current} ({n})", ""]
    out += [f"### {r['code']} · {r['product']}", f"- [ ] File: `{r['file']}`", "", "```", r["prompt"], "```", ""]

open(os.path.join(SITE, "PRODUCT-PHOTO-PROMPTS.md"), "w", encoding="utf-8").write("\n".join(out))
print(f"{len(rows)} prompts written ({len(have)} products already have photos)")
