#!/usr/bin/env python3
"""
Torch-free Real-ESRGAN (SRVGGNetCompact, realesr-general-x4v3) inference in NumPy.

  python3 scripts/media/upscale.py --weights realesr-general-x4v3.pth in.png out.png [--max 1600]

Real-ESRGAN (BSD-3-Clause, Xintao Wang et al.). Weights: github.com/xinntao/Real-ESRGAN releases v0.2.5.0.
The model restores resolution only; the product itself is not edited. Output is resized
(Lanczos) so the long edge is at most --max pixels.
"""
import argparse, pickle, zipfile, numpy as np
from PIL import Image


# ---------- load a PyTorch .pth (zip) without torch ----------
class _Storage:
    def __init__(self, dtype): self.dtype = dtype

def load_state_dict(path):
    z = zipfile.ZipFile(path)
    prefix = z.namelist()[0].split("/")[0]
    dtypes = {"FloatStorage": np.float32, "HalfStorage": np.float16, "DoubleStorage": np.float64, "LongStorage": np.int64}

    def rebuild_tensor(storage, offset, size, stride, *args):
        arr = storage
        if not size: return arr[offset:offset + 1].reshape(())
        n = 1 + sum((s - 1) * st for s, st in zip(size, stride))
        flat = arr[offset:offset + n]
        return np.lib.stride_tricks.as_strided(flat, shape=size, strides=[st * flat.itemsize for st in stride]).copy()

    class U(pickle.Unpickler):
        def find_class(self, mod, name):
            if name == "_rebuild_tensor_v2": return rebuild_tensor
            if name in dtypes: return dtypes[name]
            if name == "OrderedDict":
                import collections; return collections.OrderedDict
            if name == "_rebuild_parameter": return lambda data, *a: data
            return super().find_class(mod, name)
        def persistent_load(self, pid):
            _, dtype, key, _loc, _numel = pid
            dt = dtype if isinstance(dtype, type) else np.float32
            return np.frombuffer(z.read(f"{prefix}/data/{key}"), dtype=dt)

    sd = U(z.open(f"{prefix}/data.pkl")).load()
    for k in ("params_ema", "params"):
        if isinstance(sd, dict) and k in sd: return sd[k]
    return sd


# ---------- network ----------
def conv3x3(x, w, b):
    """x: (H, W, Cin) float32; w: (Cout, Cin, 3, 3)."""
    H, W, C = x.shape
    p = np.pad(x, ((1, 1), (1, 1), (0, 0)), mode="edge")
    cols = np.empty((H, W, 9, C), dtype=np.float32)
    i = 0
    for dy in range(3):
        for dx in range(3):
            cols[:, :, i, :] = p[dy:dy + H, dx:dx + W, :]; i += 1
    wm = w.transpose(2, 3, 1, 0).reshape(9 * C, -1)  # (ky,kx,cin) → cout
    return (cols.reshape(H * W, 9 * C) @ wm + b).reshape(H, W, -1)

def prelu(x, a): return np.where(x >= 0, x, x * a)

class Compact:
    def __init__(self, sd, scale=4):
        self.scale = scale
        keys = sorted({int(k.split(".")[1]) for k in sd if k.startswith("body.")})
        self.layers = [(sd[f"body.{i}.weight"].astype(np.float32), sd.get(f"body.{i}.bias")) for i in keys]

    def run(self, rgb):  # rgb float32 [0,1] (H,W,3)
        x = rgb
        for w, b in self.layers:
            if w.ndim == 4: x = conv3x3(x, w, b.astype(np.float32))
            else: x = prelu(x, w.astype(np.float32))
        H, W, C = x.shape; r = self.scale
        x = x.reshape(H, W, C // (r * r), r, r).transpose(0, 3, 1, 4, 2).reshape(H * r, W * r, C // (r * r))
        base = np.repeat(np.repeat(rgb, r, axis=0), r, axis=1)
        return x + base

    def upscale(self, rgb, tile=160, pad=12):
        H, W, _ = rgb.shape; r = self.scale
        out = np.zeros((H * r, W * r, 3), dtype=np.float32)
        for y in range(0, H, tile):
            for x in range(0, W, tile):
                y0, x0 = max(0, y - pad), max(0, x - pad)
                y1, x1 = min(H, y + tile + pad), min(W, x + tile + pad)
                o = self.run(rgb[y0:y1, x0:x1])
                ty, tx = (y - y0) * r, (x - x0) * r
                hh, ww = min(tile, H - y) * r, min(tile, W - x) * r
                out[y * r:y * r + hh, x * r:x * r + ww] = o[ty:ty + hh, tx:tx + ww]
        return np.clip(out, 0, 1)


def upscale_image(model, im, max_edge=1600):
    rgb = np.asarray(im.convert("RGB"), dtype=np.float32) / 255.0
    out = Image.fromarray((model.upscale(rgb) * 255 + 0.5).astype(np.uint8))
    if max(out.size) > max_edge:
        s = max_edge / max(out.size)
        out = out.resize((round(out.width * s), round(out.height * s)), Image.LANCZOS)
    return out


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--weights", required=True); ap.add_argument("src"); ap.add_argument("dst"); ap.add_argument("--max", type=int, default=1600)
    a = ap.parse_args()
    m = Compact(load_state_dict(a.weights))
    upscale_image(m, Image.open(a.src), a.max).save(a.dst)
