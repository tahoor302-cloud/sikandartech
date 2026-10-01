#!/usr/bin/env python3
"""
Restores resolution of product photos with Real-ESRGAN (compact, x4) and writes
WebP files with the long edge capped (default 1600 px).

  python3 scripts/media/enhance_batch.py <src_dir_or_files...> --out <dir> [--max 1600] [--min-gain 1.2]

Files are skipped when the source is already at or near the target size.
A 15% Lanczos blend is mixed back in to keep the result faithful to the source (no
invented texture), then written as WebP q90. Originals are never overwritten unless
--out points at the same folder.
"""
import argparse, os, sys, time, glob
from PIL import Image
import numpy as np
sys.path.insert(0, os.path.dirname(__file__))
from upscale import Compact, load_state_dict

HERE = os.path.dirname(__file__)
WEIGHTS = os.path.join(HERE, "models", "realesr-general-x4v3.pth")
_model = None

def model():
    global _model
    if _model is None: _model = Compact(load_state_dict(WEIGHTS))
    return _model

def enhance(im, max_edge=1600, blend=0.15):
    im = im.convert("RGB")
    rgb = np.asarray(im, dtype=np.float32) / 255.0
    sr = model().upscale(rgb)
    out = Image.fromarray((sr * 255 + 0.5).astype(np.uint8))
    if blend > 0:
        base = im.resize(out.size, Image.LANCZOS)
        out = Image.blend(out, base, blend)
    if max(out.size) > max_edge:
        s = max_edge / max(out.size)
        out = out.resize((round(out.width * s), round(out.height * s)), Image.LANCZOS)
    return out

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("inputs", nargs="+"); ap.add_argument("--out", required=True); ap.add_argument("--root", default=None)
    ap.add_argument("--max", type=int, default=1600); ap.add_argument("--min-gain", type=float, default=1.2)
    a = ap.parse_args()
    files = []
    for p in a.inputs: files += sorted(glob.glob(os.path.join(p, "**/*.webp"), recursive=True)) if os.path.isdir(p) else [p]
    root = a.root or os.path.commonpath([os.path.dirname(f) for f in files])
    for i, f in enumerate(files):
        dst = os.path.join(a.out, os.path.relpath(f, root))
        if os.path.exists(dst): continue
        im = Image.open(f)
        if a.max / max(im.size) < a.min_gain: print("skip (already large)", f); continue
        t = time.time()
        out = enhance(im, a.max)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        out.save(dst, "WEBP", quality=90, method=5)
        print(f"[{i+1}/{len(files)}] {os.path.relpath(f, root)} {im.size} -> {out.size} {time.time()-t:.0f}s", flush=True)
