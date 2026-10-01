#!/usr/bin/env python3
"""
Imports the owner-supplied reference PDFs (one title + one photo per page) into
catalog source files, using the hand-verified mapping in data/imports/reference-pdfs.json.

  python3 scripts/importers/reference_pdfs.py && npm run catalog:build

- Extracts each page's photo losslessly (pdfimages -p) and saves it as WebP at its
  native resolution (no upscaling, no retouching) under public/media/products/<slug>/.
- Verifies the mapping: every page title is checked against the PDF text, and the
  pages declared as duplicates are confirmed by perceptual hash before being skipped.
- Writes data/source/super-mimic-clothing.json and data/source/super-mimic-bags-ref.json.
"""
import json, os, re, sys, tempfile
sys.path.insert(0, os.path.dirname(__file__))
from pdfref import ROOT, slug, sha256, page_images, ahash, hamming, save_product_photo, page_text

cfg = json.load(open(os.path.join(ROOT, "data/imports/reference-pdfs.json")))

def page_titles(pdf, pages):
    out = {}
    for p in range(1, pages + 1):
        m = re.search(r"(\d{2}) ([A-Z][^\n]+)", page_text(pdf, p))
        out[p] = m.group(2).strip() if m else None
    return out

errors = []
with tempfile.TemporaryDirectory() as tmp:
    pdfs = {}
    for key, meta in cfg["pdfs"].items():
        path = os.path.join(ROOT, meta["file"])
        pdfs[key] = {"path": path, "titles": page_titles(path, meta["pages"]), "images": page_images(path, tmp, key), "sha": sha256(path)}
        if len(pdfs[key]["images"]) != meta["pages"]:
            errors.append(f"{key}: expected {meta['pages']} page photos, found {len(pdfs[key]['images'])}")

    # 1. declared duplicates must really be duplicates
    for r in cfg["reconciliation"]:
        if r["status"] != "duplicate": continue
        for p in range(r["pages"][0], r["pages"][1] + 1):
            d = hamming(ahash(pdfs["clothing"]["images"][p]), ahash(pdfs["bags"]["images"][p]))
            if d > 12: errors.append(f"clothing p{p} is declared a duplicate of bags p{p} but differs (hash distance {d})")
    # 2. every mapped title must appear in its PDF (on its own page, or — for remapped items — on page ref)
    for key in ("clothing", "bags"):
        for it in cfg[key]:
            if pdfs[key]["titles"].get(it["ref"]) != it["title"]:
                errors.append(f"{key} ref {it['ref']}: title '{it['title']}' not found on page {it['ref']} (found '{pdfs[key]['titles'].get(it['ref'])}')")
    if errors:
        print("Mapping check failed:\n  " + "\n  ".join(errors)); sys.exit(1)

    def build(key, source, prefix, category, line, sizes, size_label, collection_default):
        records = []
        for it in cfg[key]:
            s = slug(it["title"])
            cid, cname, chex = it["color"]
            src_url, iw, ih = save_product_photo(pdfs[key]["images"][it["page"]], s, cid)
            code = f"{prefix}{it['ref']:02d}"
            records.append({
                "sourceId": f"{prefix}{it['ref']:02d}",
                "slug": s,
                "title": it["title"],
                "line": line,
                "category": category,
                "subcategory": it["sub"],
                "productType": it["type"],
                "collection": it.get("collection", collection_default),
                "price": it["price"],
                "currency": "USD",
                "shortDescription": it["short"],
                "description": it["description"],
                "details": it["details"],
                "materials": it["materials"],
                "care": [],
                "specifications": {"Colour": cname, "Style": it["type"]},
                "sizeLabel": size_label,
                "sizes": sizes,
                "colors": [{"id": cid, "name": cname, "hex": chex}],
                "variants": [{"sku": f"SM-{code}-{sz.upper().replace(' ', '')}", "color": cid, "size": sz, "price": it["price"]} for sz in sizes],
                "images": [{"src": src_url, "kind": "primary", "color": cid, "alt": it["title"], "width": iw, "height": ih}],
                "featured": False, "newArrival": True, "trending": False,
                "createdAt": "2026-09-30T00:00:00.000Z",
                "provenance": {"pdf": os.path.basename(cfg["pdfs"][key]["file"]), "pdfSha256": pdfs[key]["sha"], "titlePage": it["ref"], "photoPage": it["page"], "priceStatus": "proposed", "imageProcessing": "white margin trimmed; Real-ESRGAN x4 (compact) restore, 15% Lanczos blend; WebP q90", "copyStatus": "written for Super Mimic from the reference photo"},
            })
        out = {"source": source, "authorised": "Owner-supplied reference PDF, described by the owner as original designs with studio product photography. Prices, sizes and copy were proposed for launch and need owner review.", "importedAt": "2026-09-30T00:00:00.000Z", "records": records}
        path = os.path.join(ROOT, "data/source", f"{source}.json")
        json.dump(out, open(path, "w"), indent=2, ensure_ascii=False)
        print(f"✓ {len(records)} records → data/source/{source}.json")

    build("clothing", "super-mimic-clothing", "CLO-REF-", "clothing", "Super Mimic Atelier", ["XS", "S", "M", "L", "XL"], "Size", "originals")
    build("bags", "super-mimic-bags-ref", "BAG-REF-", "bags", "Super Mimic Maison", ["One size"], "One size", "originals")
