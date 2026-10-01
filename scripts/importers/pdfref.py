"""Shared helpers for importing owner-supplied reference PDFs (one title + one photo per page)."""
import glob, hashlib, json, os, re, subprocess, sys
from PIL import Image
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "media"))
from enhance_batch import enhance  # Real-ESRGAN compact, NumPy

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
slug = lambda s: re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", s.lower().replace("&", "and"))).strip("-")

def sha256(path): return hashlib.sha256(open(path, "rb").read()).hexdigest()

def page_text(pdf, p):
    return subprocess.run(["pdftotext", "-f", str(p), "-l", str(p), "-layout", pdf, "-"], capture_output=True, text=True).stdout

def page_images(pdf, tmp, key):
    subprocess.run(["pdfimages", "-p", "-png", pdf, os.path.join(tmp, key)], check=True)
    imgs = {}
    for f in sorted(glob.glob(os.path.join(tmp, key + "-*"))):
        imgs.setdefault(int(os.path.basename(f).split("-")[1]), f)
    return imgs

def ahash(path, n=16):
    im = Image.open(path).convert("L").resize((n, n), Image.LANCZOS)
    px = list(im.tobytes()); avg = sum(px) / len(px)
    return [1 if v > avg else 0 for v in px]

def hamming(a, b): return sum(x != y for x, y in zip(a, b))

def trim_white(im, thresh=244):
    """Remove plain white page margins around the photo (the product itself is untouched)."""
    g = im.convert("L"); w, h = g.size; px = g.load()
    row = lambda y: sum(px[x, y] for x in range(0, w, 2)) / len(range(0, w, 2))
    col = lambda x: sum(px[x, y] for y in range(0, h, 2)) / len(range(0, h, 2))
    t, b, l, r = 0, h - 1, 0, w - 1
    while t < h // 4 and row(t) > thresh: t += 1
    while b > h * 3 // 4 and row(b) > thresh: b -= 1
    while l < w // 4 and col(l) > thresh: l += 1
    while r > w * 3 // 4 and col(r) > thresh: r -= 1
    return im.crop((l, t, r + 1, b + 1))

def strip_border_lines(im, frac=0.15, thresh=200):
    """Some reference pages place the photo in a white frame whose thin separator lines (and a
    sliver of the neighbouring layout) end up inside the extracted image. Crop past any bright
    line found in the outer 10% on each side. The product area is not modified."""
    import numpy as np
    a = np.asarray(im.convert("L"), dtype=np.float32); h, w = a.shape
    cm, rm = a.mean(0), a.mean(1)
    kx, ky = max(2, int(w * frac)), max(2, int(h * frac))
    # a separator line is a THIN bright band (<= 5 px) that is clearly brighter than the pixels on
    # both sides of it (photo inside, border or neighbouring sliver outside)
    def thin(v, i, n):
        if v[i] < thresh: return False
        around = [v[k] for k in range(max(0, i - 6), min(n, i + 7)) if abs(k - i) >= 3]
        if not around: return False
        diff = v[i] - max(around)
        return diff > 50 or (v[i] >= 235 and diff > 12)
    left = max([i + 1 for i in range(kx) if thin(cm, i, w)], default=0)
    right = min([i for i in range(w - kx, w) if thin(cm, i, w)], default=w)
    top = max([i + 1 for i in range(ky) if thin(rm, i, h)], default=0)
    bottom = min([i for i in range(h - ky, h) if thin(rm, i, h)], default=h)
    if left or top or right < w or bottom < h:
        # one extra pixel for antialiased line edges
        l, t = left + (1 if left else 0), top + (1 if top else 0)
        r, b = right - (1 if right < w else 0), bottom - (1 if bottom < h else 0)
        return im.crop((l, t, r, b))
    return im

def pad_to_ratio(im, ratio=4 / 5, blur=24):
    """Extend the studio background so the photo fits the storefront's 4:5 frame without cropping
    the product. The added strips are edge-replicated and softly blurred; the photo is untouched."""
    import numpy as np
    from PIL import ImageFilter
    im = im.convert("RGB"); w, h = im.size
    if abs(w / h - ratio) < 0.01: return im
    nw, nh = (w, round(w / ratio)) if w / h > ratio else (round(h * ratio), h)
    px, py = (nw - w) // 2, (nh - h) // 2
    edge = Image.fromarray(np.pad(np.asarray(im), ((py, nh - h - py), (px, nw - w - px), (0, 0)), mode="edge"))
    soft = edge.filter(ImageFilter.GaussianBlur(blur))
    layer = soft.copy(); layer.paste(im, (px, py))
    mask = Image.new("L", (nw, nh), 0); mask.paste(255, (px + 3, py + 3, px + w - 3, py + h - 3))
    mask = mask.filter(ImageFilter.GaussianBlur(3))
    return Image.composite(layer, soft, mask)

def save_product_photo(src_path, product_slug, color_id, max_edge=1600, cache=True):
    """Trim → Real-ESRGAN x4 restore → WebP. Returns (src_url, width, height)."""
    dest_dir = os.path.join(ROOT, "public/media/products", product_slug)
    os.makedirs(dest_dir, exist_ok=True)
    dest = os.path.join(dest_dir, f"01-primary-{color_id}.webp")
    cache_file = os.path.join(ROOT, "data/imports/image-cache.json")
    cache_map = json.load(open(cache_file)) if os.path.exists(cache_file) else {}
    rel = os.path.relpath(dest, os.path.join(ROOT, "public"))
    base = strip_border_lines(trim_white(Image.open(src_path).convert("RGB")))
    key = sha256(src_path) + f":{max_edge}:{base.size[0]}x{base.size[1]}:pad45:v4"
    if cache and os.path.exists(dest) and cache_map.get(rel) == key:
        im = Image.open(dest)
    else:
        im = pad_to_ratio(enhance(base, max_edge))
        im.save(dest, "WEBP", quality=90, method=5)
        cache_map[rel] = key
        json.dump(cache_map, open(cache_file, "w"), indent=1, sort_keys=True)
    return f"/media/products/{product_slug}/01-primary-{color_id}.webp", im.width, im.height
