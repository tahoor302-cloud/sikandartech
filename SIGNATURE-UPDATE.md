# Signature scroll update (only this section changed)

Changed files:
- data/site.ts — `signatureStages`: 4 → 8 chapters (Eyewear, Sneaker, Handbag, Watch, Tailoring, Shoulder bag, Footwear, Statement), images now /media/signature/stage-01..08.webp
- components/home/signature-scroll.tsx — same pinned timeline, curtain (clip-path) reveals and one-at-a-time sequence; chapter headings now rise word-by-word; lead text "Eight objects, one standard."; list spacing gap-4 → gap-3 so 8 items fit
- public/media/signature/stage-01..08.webp — new images (1000x1250)

Nothing else was touched (diff against the previous build: only these files + the new folder).
Eyewear (stage-01) is a catalog photo; replace public/media/signature/stage-01.webp with a new 4:5 image any time.
