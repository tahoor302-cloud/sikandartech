#!/usr/bin/env python3
"""
Final step of the opening-film restoration. Works directly on the YUV planes (no RGB
round-trip, so no range clipping) and keeps the enhanced frames' fine detail while restoring
the supplied film's original tone, colour and haze exactly:

    out = enhanced - blur(enhanced) + blur(source upscaled)

  python3 scripts/media/intro-tone-match.py SOURCE.mp4 ENH_FRAMES_DIR OUT.mp4 [--sigma 3]
Audio is copied bit-for-bit from SOURCE; 24fps / 240 frames / timing unchanged.
"""
import argparse, subprocess, cv2, numpy as np
ap = argparse.ArgumentParser(); ap.add_argument("source"); ap.add_argument("frames"); ap.add_argument("out"); ap.add_argument("--sigma", type=float, default=3.0)
a = ap.parse_args()
W, H = 1696, 960
FS = W * H * 3 // 2
src = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-i", a.source, "-vf", f"scale={W}:{H}:flags=lanczos", "-pix_fmt", "yuv420p", "-f", "rawvideo", "-"], stdout=subprocess.PIPE)
enh = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-framerate", "24", "-i", f"{a.frames}/f%04d.png",
                        "-vf", "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p", "-f", "rawvideo", "-"], stdout=subprocess.PIPE)
enc = subprocess.Popen(["ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "yuv420p", "-s", f"{W}x{H}", "-r", "24", "-i", "-",
                        "-i", a.source, "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-tune", "film",
                        "-profile:v", "high", "-pix_fmt", "yuv420p", "-color_primaries", "bt709", "-color_trc", "bt709", "-colorspace", "bt709",
                        "-color_range", "tv", "-c:a", "copy", "-movflags", "+faststart", a.out], stdin=subprocess.PIPE)

def planes(buf):
    y = np.frombuffer(buf, np.uint8, W * H).reshape(H, W)
    u = np.frombuffer(buf, np.uint8, W * H // 4, W * H).reshape(H // 2, W // 2)
    v = np.frombuffer(buf, np.uint8, W * H // 4, W * H * 5 // 4).reshape(H // 2, W // 2)
    return y, u, v

n = 0
while True:
    sb = src.stdout.read(FS); eb = enh.stdout.read(FS)
    if len(sb) < FS or len(eb) < FS: break
    out = []
    for i, (s, e) in enumerate(zip(planes(sb), planes(eb))):
        sg = a.sigma if i == 0 else a.sigma / 2
        s = s.astype(np.float32); e = e.astype(np.float32)
        o = e - cv2.GaussianBlur(e, (0, 0), sg) + cv2.GaussianBlur(s, (0, 0), sg)
        out.append(np.clip(o + 0.5, 0, 255).astype(np.uint8).tobytes())
    enc.stdin.write(b"".join(out)); n += 1
enc.stdin.close(); enc.wait()
print("frames", n)
