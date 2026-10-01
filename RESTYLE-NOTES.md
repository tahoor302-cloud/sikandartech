# Studio restyle (from the campaign reel)

Reference: WhatsApp_Video_2026-09-30_at_8_24_21_PM.mp4 — pearl studio backdrop, one geometric sans,
minimal header (menu + SUPERMIMIC wordmark + tagline left, search + bag right), edge arrows on the
hero, frosted outlined pill CTA, floating chat button bottom-right.

## What changed
- app/layout.tsx, app/globals.css — Jost replaces Cormorant/Manrope/Plex Mono; lighter pearl palette
  (new token `pearl`); pill buttons (`btn-light` is now the frosted outline pill); rounder fields.
- components/ui/logo.tsx — new `Wordmark` (typographic header lockup). The official emblem `Logo`
  artwork is untouched and still used in footer/brand statement.
- components/navigation/navbar.tsx — rewritten: transparent over hero, frosted pearl after scroll,
  one full-screen menu at every width (mega-menu removed). Text colour follows the hero scene tone.
- components/navigation/mobile-menu.tsx — light panel, all breakpoints.
- components/hero/hero.tsx — centred layout, tone-aware text, prev/next arrows + dots (shown when
  `heroScenes` has more than one scene), single pill CTA. data/site.ts: new `HERO_TONE_EVENT`,
  tagline "Looks real. Feels yours."
- components/layout/chat-button.tsx (new) + providers.tsx — floating contact button. No live chat
  backend: the panel says so and links to email/contact.
- footer.tsx, brand-statement.tsx, all-products-cta.tsx — dark bands converted to pearl.

## Hero images (added)
- public/media/hero/studio-01..04.webp — the four studio looks, cut from the supplied 2x2 sheet
  (16:9, 2040x1148). `heroScenes` in data/site.ts now lists these four (tone "light"); the header,
  text and arrows turn dark automatically. The old dark film (film.mp4/.webm) is no longer in the
  rotation but the files are untouched.
- Desktop: model centred, tagline + pill CTA bottom-left. Phone: picture sits between header and
  CTA so the model's head/feet are never covered; dots under the CTA.
- The Sound button only shows if a video scene has its own audio (none now).
- The source panels were ~1370 px wide and are upscaled 1.5x, so they are slightly soft on large
  screens. Upscaling them to 2K/4K in Higgsfield would sharpen them (uses credits).
- `preview/` (static demo build) was not rebuilt. Not run through `next build` (no network here).

## Hero film (exact reference animation)
- public/media/hero/studio-film.mp4/.webm + studio-film-poster.webp — the supplied WhatsApp reel with the
  baked-in UI (header, arrows, chat bubble, slide dashes, end CTA pill) removed, 1920x1080, audio kept
  (muted until Sound is turned on). Source was 720p, so it is upscaled; an AI upscale would sharpen it.
- heroScenes[0] is the film (durationMs 14500, ctaDelayMs 8900, loop false): it plays once, holds the last
  frame, the "Explore collection" pill fades in at ~8.9 s at upper-left like the reel, then the four
  stills follow. Per-scene `durationMs`, `ctaDelayMs`, `loop` are new optional fields in data/site.ts.
- The old dark film (film.mp4/.webm) is untouched and unused.
