"use client";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/components/ui/link";
import { Magnetic } from "@/components/animations/magnetic";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { HeroMedia } from "./hero-media";
import { heroScenes, site, HERO_TONE_EVENT } from "@/data/site";
import { useGsap } from "@/hooks/use-gsap";
import { INTRO_DONE_EVENT } from "@/components/intro/intro-video";
import { gsap, EASE, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SCENE_MS = 6500;

/**
 * Studio hero, after the campaign reel: a clean full-bleed film on a pearl backdrop, previous/next
 * arrows on the edges (when there is more than one scene), and one frosted pill CTA at the foot.
 * Text colour follows each scene's `tone` — "light" scenes get dark type, "dark" scenes light type.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // The Sound toggle only appears when a video scene carries its own soundtrack.
  const filmAudio = heroScenes.some((s) => s.type === "video" && s.audio);
  const [filmOn, setFilmOn] = useState(false);
  const sound = { on: filmOn, toggle: () => setFilmOn((v) => !v) };
  const media = useRef<HTMLDivElement>(null);
  const scene = heroScenes[index];
  // Some scenes (the film) hold the CTA back until a given moment, then fade it in.
  const [ctaOn, setCtaOn] = useState(!heroScenes[0].ctaDelayMs);
  const dark = scene.tone === "dark";
  const many = heroScenes.length > 1;
  const go = (d: number) => setIndex((i) => (i + d + heroScenes.length) % heroScenes.length);

  // Tell the header which colour to use over this scene.
  useEffect(() => { window.dispatchEvent(new CustomEvent(HERO_TONE_EVENT, { detail: scene.tone })); }, [scene.tone]);

  useEffect(() => {
    if (paused || !many) return;
    const t = setTimeout(() => go(1), scene.durationMs ?? SCENE_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused, many]);

  useEffect(() => {
    if (!scene.ctaDelayMs) return setCtaOn(true);
    setCtaOn(false);
    const t = setTimeout(() => setCtaOn(true), scene.ctaDelayMs);
    return () => clearTimeout(t);
  }, [scene.id, scene.ctaDelayMs]);

  // Pause the montage when the tab is hidden
  useEffect(() => {
    const vis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => document.removeEventListener("visibilitychange", vis);
  }, []);

  const root = useGsap<HTMLElement>((_, el) => {
    const reduce = prefersReducedMotion();
    const q = gsap.utils.selector(el);
    if (reduce) return void gsap.set(q("[data-hero-in]"), { opacity: 1, y: 0 });
    // While the opening film is on screen, hold the entrance and play it as the site is revealed.
    const held = document.documentElement.classList.contains("intro-active");
    const tl = gsap.timeline({ delay: 0.25, paused: held, defaults: { ease: EASE.expo } });
    const play = () => tl.play();
    if (held) window.addEventListener(INTRO_DONE_EVENT, play, { once: true });
    tl.fromTo(q("[data-hero-media]"), { opacity: 0 }, { opacity: 1, duration: 1.2, ease: EASE.out }, 0)
      .fromTo(q("[data-hero-in]"), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1.1, stagger: 0.09, ease: EASE.out }, 1.0);

    // Scroll: content drifts up and fades, media eases in (desktop only)
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.to(q("[data-hero-content]"), { yPercent: -12, opacity: 0, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(media.current, { scale: 1.05, yPercent: 6, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
    });
    return () => { window.removeEventListener(INTRO_DONE_EVENT, play); mm.revert(); };
  });

  const ink = dark ? "text-pearl" : "text-ink";

  return (
    <section ref={root} className={cn("relative h-[100svh] min-h-[620px] w-full overflow-hidden transition-colors duration-700", dark ? "bg-charcoal" : "bg-[#e8ddd8]", ink)} aria-label="Supermimic — campaign">
      <div ref={media} className="absolute inset-x-0 top-[60px] bottom-[116px] will-change-transform [mask-image:linear-gradient(to_bottom,transparent,black_4%)] md:inset-y-0 md:[mask-image:none]">
        <div data-hero-media className="absolute inset-0">
          <HeroMedia scenes={heroScenes} index={index} soundOn={filmAudio && filmOn} />
        </div>
      </div>

      {dark && <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(27,26,24,.38)_0%,transparent_20%,transparent_62%,rgba(27,26,24,.5)_100%)]" />}

      {/* Prev / next, as in the reel */}
      {many && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Previous scene" className="absolute left-2 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center opacity-80 transition-opacity hover:opacity-100 sm:left-5"><ArrowLeft width={26} height={26} strokeWidth={1} /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next scene" className="absolute right-2 top-1/2 z-10 grid size-12 -translate-y-1/2 place-items-center opacity-80 transition-opacity hover:opacity-100 sm:right-5"><ArrowRight width={26} height={26} strokeWidth={1} /></button>
        </>
      )}

      <div data-hero-content className="shell relative flex h-full flex-col items-center justify-end pb-14 text-center md:block md:pb-0 md:text-left">
        <h1 className="sr-only">{site.name}</h1>
        <div data-hero-in className="md:absolute md:left-[7.4%] md:top-[19.5%]">
          <div className={cn("transition-[opacity,translate] duration-[900ms] ease-luxe", ctaOn ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0")}>
            <Magnetic><Link href="/collections/all" className="btn btn-light" tabIndex={ctaOn ? 0 : -1}>Explore collection <ArrowRight width={14} height={14} /></Link></Magnetic>
          </div>
        </div>
      </div>

      {/* Foot rail: scene dots (if several) and the Sound toggle */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="shell flex items-end justify-center gap-6 pb-3 md:justify-between md:pb-7">
          {many ? (
            <div data-hero-in className="flex items-center gap-2">
              {heroScenes.map((s, i) => (
                <button key={s.id} onClick={() => setIndex(i)} aria-label={`Show scene ${i + 1}`} aria-current={i === index} className="grid h-6 w-6 place-items-center">
                  <span className={cn("block h-[5px] rounded-full bg-current transition-all duration-500", i === index ? "w-6 opacity-90" : "w-[5px] opacity-35")} />
                </button>
              ))}
            </div>
          ) : <span />}
          {filmAudio && (
            <button data-hero-in onClick={sound.toggle} aria-pressed={sound.on} className="group/s flex items-center gap-2.5 opacity-80 transition-opacity hover:opacity-100">
              <span className="flex h-3 items-end gap-[2px]" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={cn("w-px bg-current transition-all duration-500", sound.on ? "motion-safe:animate-[eq_1.1s_ease-in-out_infinite]" : "h-px")} style={{ height: sound.on ? undefined : 1, animationDelay: `${i * 0.15}s` }} />
                ))}
              </span>
              <span className="eyebrow text-[10px]">Sound {sound.on ? "on" : "off"}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
