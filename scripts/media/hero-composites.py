#!/usr/bin/env python3
"""
Builds 16:9 hero frames from a product's OWN editorial photograph, so every hero
scene shows exactly the product its caption links to.

  python3 scripts/media/hero-composites.py   (reads data/hero-plan.json)

Frame = blurred, darkened cover of the editorial image + the sharp image placed at
~70% of the width with feathered edges (the hero copy sits on the left).
"""
import json, os
from PIL import Image, ImageFilter, ImageEnhance, ImageDraw

ROOT = os.path.join(os.path.dirname(__file__), "..", "..")
W, H = 1920, 1080
plan = json.load(open(os.path.join(ROOT, "data", "hero-plan.json")))
products = {p["sourceId"]: p for p in json.load(open(os.path.join(ROOT, "data", "products.json")))}

def feather_mask(w, h, edge):
    m = Image.new("L", (w, h), 255)
    d = ImageDraw.Draw(m)
    for i in range(edge):
        a = int(255 * (i / edge) ** 1.6)
        d.line([(i, 0), (i, h)], fill=a)
        d.line([(w - 1 - i, 0), (w - 1 - i, h)], fill=a)
    return m

for s in plan["scenes"]:
    if s.get("image"):  # a pre-made campaign frame
        continue
    p = products[s["sourceId"]]
    ed = next((i for i in p["images"] if i["kind"] == "editorial"), p["images"][0])
    src = Image.open(os.path.join(ROOT, "public", ed["src"].lstrip("/"))).convert("RGB")
    # background: cover + blur + darken
    scale = max(W / src.width, H / src.height) * 1.08
    bg = src.resize((int(src.width * scale), int(src.height * scale)), Image.LANCZOS)
    top = int((bg.height - H) * 0.42)
    bg = bg.crop(((bg.width - W) // 2, top, (bg.width - W) // 2 + W, top + H))
    bg = ImageEnhance.Brightness(bg.filter(ImageFilter.GaussianBlur(38))).enhance(0.5)
    # foreground: full-height sharp image
    fh = H
    fw = int(src.width * fh / src.height)
    fg = src.resize((fw, fh), Image.LANCZOS)
    x = int(W * s.get("focusX", 0.70) - fw / 2)
    bg.paste(fg, (x, 0), feather_mask(fw, fh, 170))
    # gentle left vignette for text legibility
    vig = Image.new("L", (W, H), 0)
    dv = ImageDraw.Draw(vig)
    for i in range(W // 2):
        dv.line([(i, 0), (i, H)], fill=int(120 * (1 - i / (W / 2)) ** 1.5))
    bg = Image.composite(Image.new("RGB", (W, H), (8, 7, 6)), bg, vig)
    out = os.path.join(ROOT, "public", "media", "hero", f"{p['slug']}.webp")
    bg.save(out, "WEBP", quality=84, method=6)
    print("wrote", os.path.relpath(out, ROOT), os.path.getsize(out) // 1024, "KB")
