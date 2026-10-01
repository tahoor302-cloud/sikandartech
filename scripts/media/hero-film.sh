#!/usr/bin/env bash
# Builds the hero film from the owner-supplied campaign clip (full length, not trimmed).
#   bash scripts/media/hero-film.sh data/imports/originals/hero-film-source.mp4
# 24 fps → 60 fps with motion-compensated interpolation (smooth playback), soundtrack kept.
# Outputs public/media/hero/film.mp4 (H.264/AAC), film.webm (VP9/Opus) and film-poster.webp.
set -euo pipefail
SRC="$1"; OUT="$(dirname "$0")/../../public/media/hero"; TMP="$(mktemp -d)"
ffmpeg -v error -y -i "$SRC" -vf "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1,format=yuv420p" \
  -c:v libx264 -profile:v high -crf 20 -preset slow -c:a aac -b:a 128k -movflags +faststart "$OUT/film.mp4"
ffmpeg -v error -y -i "$OUT/film.mp4" -c:v libvpx-vp9 -b:v 0 -crf 33 -row-mt 1 -deadline good -cpu-used 2 -c:a libopus -b:a 96k "$OUT/film.webm"
ffmpeg -v error -y -i "$OUT/film.mp4" -vframes 1 "$TMP/poster.png"
python3 -c "from PIL import Image; Image.open('$TMP/poster.png').save('$OUT/film-poster.webp','WEBP',quality=85)"
rm -rf "$TMP"; echo "✓ $OUT/film.mp4"
