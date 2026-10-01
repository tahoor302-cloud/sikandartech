#!/usr/bin/env python3
"""
Imports the Watch Reference 36 and Footwear Reference 28 PDFs using the hand-verified
mapping in data/imports/reference-pdfs-2.json.

  python3 scripts/importers/reference_pdfs_2.py && npm run catalog:build

Checks every mapped title against its page text (renamed titles are checked under their
original name), skips excluded pages, restores each photo with Real-ESRGAN and writes
data/source/super-mimic-watches-ref.json and data/source/super-mimic-footwear-ref.json.
"""
import json, os, re, sys, tempfile
sys.path.insert(0, os.path.dirname(__file__))
from pdfref import ROOT, slug, sha256, page_images, page_text, save_product_photo

cfg = json.load(open(os.path.join(ROOT, "data/imports/reference-pdfs-2.json")))
SIZES = {"men": [str(s) for s in range(39, 47)], "women": [str(s) for s in range(36, 42)], "unisex": [str(s) for s in range(36, 46)]}
renamed = {(r["pdf"], r["page"]): r for r in cfg["renamed"]}
excluded = {(e["pdf"], e["page"]) for e in cfg["excluded"]}

def title_on(pdf, p):
    m = re.search(r"\d{2} / \d{2}\s+(.+?)\n", page_text(pdf, p))
    return m.group(1).strip() if m else None

errors = []
with tempfile.TemporaryDirectory() as tmp:
    pdfs = {}
    for key, meta in cfg["pdfs"].items():
        path = os.path.join(ROOT, meta["file"])
        pdfs[key] = {"path": path, "images": page_images(path, tmp, key), "sha": sha256(path)}
        mapped = {it["page"] for it in cfg[key]} | {p for (k, p) in excluded if k == key}
        if mapped != set(range(1, meta["pages"] + 1)):
            errors.append(f"{key}: pages not accounted for: {sorted(set(range(1, meta['pages'] + 1)) - mapped)}")
        for it in cfg[key]:
            expect = renamed.get((key, it["page"]), {}).get("from", it["title"])
            got = title_on(path, it["page"])
            if got != expect: errors.append(f"{key} p{it['page']}: expected '{expect}', page says '{got}'")
    if errors:
        print("Mapping check failed:\n  " + "\n  ".join(errors)); sys.exit(1)

    def build(key, source, prefix, category, line):
        records = []
        for it in cfg[key]:
            s = slug(it["title"]); cid, cname, chex = it["color"]
            src_url, iw, ih = save_product_photo(pdfs[key]["images"][it["page"]], s, cid)
            print(f"  {prefix}{it['page']:02d} {it['title']} → {iw}×{ih}", flush=True)
            if key == "watches":
                sizes, size_label = ["One size"], "One size"
                specs = {"Style": it["type"], "Dial / colour": cname, "Case": it["case"], "Strap": it["strap"]}
                materials = ""
            else:
                sizes, size_label = SIZES[it["sizes"]], "EU"
                specs = {"Style": it["type"], "Colour": cname, "Fit": {"men": "Men's EU sizing", "women": "Women's EU sizing", "unisex": "Unisex EU sizing"}[it["sizes"]]}
                materials = it.get("materials", "")
            code = f"{prefix}{it['page']:02d}"
            prov = {"pdf": os.path.basename(cfg["pdfs"][key]["file"]), "pdfSha256": pdfs[key]["sha"], "titlePage": it["page"], "photoPage": it["page"],
                    "priceStatus": "proposed", "copyStatus": "written for Super Mimic from the reference photo",
                    "imageProcessing": "white margin trimmed; Real-ESRGAN x4 (compact) restore, 15% Lanczos blend; WebP q90"}
            if (key, it["page"]) in renamed: prov["originalTitle"] = renamed[(key, it["page"])]["from"]
            records.append({
                "sourceId": code, "slug": s, "title": it["title"], "line": line, "category": category,
                "subcategory": it["sub"], "productType": it["type"], "collection": "originals",
                "price": it["price"], "currency": "USD",
                "shortDescription": it["short"], "description": it["description"], "details": it["details"],
                "materials": materials, "care": [], "specifications": specs,
                "sizeLabel": size_label, "sizes": sizes, "colors": [{"id": cid, "name": cname, "hex": chex}],
                "variants": [{"sku": f"SM-{code}-{sz.upper().replace(' ', '')}", "color": cid, "size": sz, "price": it["price"]} for sz in sizes],
                "images": [{"src": src_url, "kind": "primary", "color": cid, "alt": it["title"], "width": iw, "height": ih}],
                "featured": False, "newArrival": True, "trending": False, "createdAt": "2026-09-30T00:00:00.000Z",
                "provenance": prov,
            })
        out = {"source": source, "authorised": "Owner-supplied reference PDF, described by the owner as original reference designs. Prices (USD), sizes and copy were proposed for launch and need owner review.", "importedAt": "2026-09-30T00:00:00.000Z", "records": records}
        json.dump(out, open(os.path.join(ROOT, "data/source", f"{source}.json"), "w"), indent=2, ensure_ascii=False)
        print(f"✓ {len(records)} records → data/source/{source}.json")

    build("watches", "super-mimic-watches-ref", "WAT-REF-", "watches", "Super Mimic Horology")
    build("footwear", "super-mimic-footwear-ref", "SHO-REF-", "shoes", "Super Mimic Atelier")
