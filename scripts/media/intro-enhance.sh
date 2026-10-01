#!/usr/bin/env bash
# Reassembles the enhanced opening-film frames. Audio is copied bit-for-bit; frame count,
# frame rate (24fps) and timing are unchanged. Source: data/imports/originals/intro-source.mp4
set -e
SRC=${1:-data/imports/originals/intro-source.mp4}
FRAMES=${2:?enhanced frames dir}
OUT=${3:-public/media/intro/intro.mp4}
ffmpeg -loglevel error -y -framerate 24 -i "$FRAMES/f%04d.png" -i "$SRC" \
  -map 0:v -map 1:a -c:v libx264 -preset slow -crf 18 -tune film -profile:v high -pix_fmt yuv420p \
  -color_primaries bt709 -color_trc bt709 -colorspace bt709 \
  -c:a copy -movflags +faststart "$OUT"
