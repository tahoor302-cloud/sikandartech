#!/usr/bin/env python3
"""
Restores the opening film's image quality frame by frame with Real-ESRGAN (realesr-general-x4v3),
without altering its content, timing, frame rate or audio.

  python3 scripts/media/intro-enhance.py FRAMES_IN FRAMES_OUT --part 0 --parts 2

Frames are upscaled 4x then resized (Lanczos) to exactly 2x the source (848x480 -> 1696x960).
Resumable: frames already written are skipped. Reassemble with scripts/media/intro-enhance.sh.
"""
import argparse, os, sys, numpy as np
from PIL import Image
sys.path.insert(0, os.path.dirname(__file__))
from upscale import load_state_dict, Compact  # noqa

ap = argparse.ArgumentParser()
ap.add_argument("src"); ap.add_argument("dst")
ap.add_argument("--part", type=int, default=0); ap.add_argument("--parts", type=int, default=1)
ap.add_argument("--weights", default=os.path.join(os.path.dirname(__file__), "models/realesr-general-x4v3.pth"))
a = ap.parse_args()
os.makedirs(a.dst, exist_ok=True)
model = Compact(load_state_dict(a.weights))
frames = sorted(f for f in os.listdir(a.src) if f.endswith(".png"))[a.part::a.parts]
for i, f in enumerate(frames):
    out = os.path.join(a.dst, f)
    if os.path.exists(out): continue
    im = Image.open(os.path.join(a.src, f)).convert("RGB")
    rgb = np.asarray(im, dtype=np.float32) / 255.0
    up = np.clip(model.upscale(rgb), 0, 1)
    big = Image.fromarray((up * 255 + 0.5).astype(np.uint8))
    big.resize((im.width * 2, im.height * 2), Image.LANCZOS).save(out + ".tmp.png")
    os.replace(out + ".tmp.png", out)
    print(f"{a.part}: {i + 1}/{len(frames)} {f}", flush=True)
