"use client";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/components/ui/link";
import { Media } from "@/components/ui/media";
import { Magnetic } from "@/components/animations/magnetic";
import { ArrowRight } from "@/components/ui/icons";
import { heroLooks as looks, heroMenu, site, HERO_TONE_EVENT } from "@/data/site";
import { useGsap } from "@/hooks/use-gsap";
import { INTRO_DONE_EVENT } from "@/components/intro/intro-video";
import { gsap, EASE, ScrollTrigger, prefersReducedMotion, isTouch } from "@/lib/motion";
import { cn, clamp, pad2 } from "@/lib/utils";

const MOBILE_MS = 4800;
const SHOWN = "100%", HIDDEN = "-24%"; // --reveal values for the feathered radial mask (see .look-frame)

/**
 * Lookbook hero: one model, one look per category.
 * Desktop: the stage pins and the scroll scrubs through the looks. Each new look dissolves outward
 * through a soft-edged circle from the model's centre while a band of warm light passes across the frame, the outgoing look
 * eases back, the category menu on the left tracks the look and the right-edge rail fills.
 * The pointer adds a little depth (image and type drift in opposite directions).
 * Phones: looks advance on a timer (or by swipe) with the same soft circular reveal.
 * Reduced motion: no pin, no timer; the first look stays and the menu still works.
 */
export function HeroLookbook() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const chips = useRef<HTMLDivElement>(null);
  const look = looks[active];
  const n = looks.length;

  // Phones: keep the active category chip in view as the looks rotate.
  useEffect(() => {
    const row = chips.current, chip = row?.querySelector<HTMLElement>(`[data-chip="${looks[active].menu}"]`);
    if (row && chip && row.offsetParent) row.scrollTo({ left: chip.offsetLeft - (row.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  // The frames are light, so the header uses dark type over the hero.
  useEffect(() => { window.dispatchEvent(new CustomEvent(HERO_TONE_EVENT, { detail: "light" })); }, []);

  const root = useGsap<HTMLElement>((_, el) => {
    const q = gsap.utils.selector(el);
    const frames = q("[data-look]") as HTMLElement[];
    const imgs = frames.map((f) => f.querySelectorAll<HTMLElement>("[data-look-img]"));
    const sweep = (q("[data-sweep]") as HTMLElement[])[0];
    const reduce = prefersReducedMotion();

    // Entrance (held while the opening film is on screen)
    if (reduce) gsap.set(q("[data-hero-in]"), { opacity: 1, y: 0 });
    else {
      const held = document.documentElement.classList.contains("intro-active");
      const intro = gsap.timeline({ delay: 0.2, paused: held, defaults: { ease: EASE.expo } });
      intro.fromTo(frames[0], { "--reveal": "8%" }, { "--reveal": SHOWN, duration: 1.8, ease: "power3.inOut" }, 0)
        .fromTo(imgs[0], { scale: 1.12 }, { scale: 1, duration: 2.2, ease: EASE.out }, 0)
        .fromTo(q("[data-hero-in]"), { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.06 }, 0.7);
      if (held) window.addEventListener(INTRO_DONE_EVENT, () => intro.play(), { once: true });
    }
    if (reduce || n < 2) return;

    const mm = gsap.matchMedia();

    // ——— Desktop: pinned scroll scrub ———
    mm.add("(min-width: 1024px)", () => {
      frames.forEach((f, i) => gsap.set(f, { zIndex: i, "--reveal": i === 0 ? SHOWN : HIDDEN }));
      const tl = gsap.timeline({ defaults: { ease: "none" } });
      for (let i = 1; i < n; i++) {
        const t = i - 1;
        tl.fromTo(frames[i], { "--reveal": HIDDEN }, { "--reveal": SHOWN, duration: 1, ease: "power2.inOut" }, t)
          .fromTo(imgs[i], { scale: 1.14 }, { scale: 1, duration: 1, ease: "power2.out" }, t)
          .to(imgs[i - 1], { scale: 0.94, duration: 1, ease: "power2.in" }, t)
          .fromTo(sweep, { xPercent: -140 }, { xPercent: 420, duration: 1 }, t)
          .fromTo(sweep, { opacity: 0 }, { opacity: 1, duration: 0.5 }, t)
          .to(sweep, { opacity: 0, duration: 0.5 }, t + 0.5);
      }
      tl.to({}, { duration: 0.35 }); // hold the last look before the page moves on

      const fill = (time: number) => bars.current.forEach((b, i) => b && gsap.set(b, { scaleY: i === 0 ? 1 : clamp(time - i + 1, 0, 1) }));
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${window.innerHeight * (n - 1) * 0.85}`,
        pin: stage.current,
        scrub: 0.9,
        animation: tl,
        anticipatePin: 1,
        onUpdate: (self) => {
          const time = self.progress * tl.duration();
          setActive(Math.min(n - 1, Math.floor(time + 0.5)));
          fill(time);
        },
      });
      fill(0);

      // Pointer depth: the frame and the type drift apart a few pixels.
      let off = () => {};
      if (!isTouch()) {
        const ix = gsap.quickTo(q("[data-depth-img]"), "x", { duration: 1.2, ease: EASE.out });
        const iy = gsap.quickTo(q("[data-depth-img]"), "y", { duration: 1.2, ease: EASE.out });
        const tx = gsap.quickTo(q("[data-depth-type]"), "x", { duration: 1.2, ease: EASE.out });
        const ty = gsap.quickTo(q("[data-depth-type]"), "y", { duration: 1.2, ease: EASE.out });
        const move = (e: PointerEvent) => {
          const dx = e.clientX / window.innerWidth - 0.5, dy = e.clientY / window.innerHeight - 0.5;
          ix(dx * -14); iy(dy * -10); tx(dx * 10); ty(dy * 6);
        };
        el.addEventListener("pointermove", move);
        off = () => el.removeEventListener("pointermove", move);
      }
      return () => { off(); st.kill(); };
    });

    // ——— Phones and tablets: timed rotation + swipe ———
    mm.add("(max-width: 1023px)", () => {
      let cur = 0, timer = 0;
      frames.forEach((f, i) => gsap.set(f, { zIndex: i === 0 ? 2 : 0, "--reveal": SHOWN }));
      const go = (dir: number) => {
        const next = (cur + dir + n) % n;
        frames.forEach((f, i) => gsap.set(f, { zIndex: i === next ? 2 : i === cur ? 1 : 0 }));
        gsap.fromTo(frames[next], { "--reveal": HIDDEN }, { "--reveal": SHOWN, duration: 1.6, ease: "power3.inOut", overwrite: true });
        gsap.fromTo(imgs[next], { scale: 1.12 }, { scale: 1, duration: 2, ease: EASE.out, overwrite: true });
        cur = next;
        setActive(next);
      };
      const start = () => { window.clearInterval(timer); timer = window.setInterval(() => { if (!document.hidden) go(1); }, MOBILE_MS); };
      let x0 = 0;
      const down = (e: TouchEvent) => { x0 = e.touches[0].clientX; };
      const up = (e: TouchEvent) => { const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 45) { go(dx < 0 ? 1 : -1); start(); } };
      const media = stage.current!;
      media.addEventListener("touchstart", down, { passive: true });
      media.addEventListener("touchend", up, { passive: true });
      start();
      return () => { window.clearInterval(timer); media.removeEventListener("touchstart", down); media.removeEventListener("touchend", up); };
    });

    return () => mm.revert();
  });

  return (
    <section ref={root} className="relative bg-[#ddd6cd] text-ink" aria-label="Supermimic — the lookbook">
      <div ref={stage} className="relative h-[100svh] min-h-[620px] w-full overflow-hidden">
        {/* Frames */}
        <div data-depth-img className="absolute inset-x-0 top-[60px] bottom-[208px] lg:inset-[-12px]">
          {looks.map((l, i) => (
            <div key={l.id} data-look className="look-frame absolute inset-0" style={{ zIndex: i === 0 ? 2 : 0 }} aria-hidden={i !== active}>
              <div data-look-img className="absolute inset-0 hidden will-change-transform lg:block">
                <Media src={l.src} alt={l.alt} fill priority={i === 0} sizes="100vw" className="object-cover object-center" />
              </div>
              <div data-look-img className="absolute inset-0 will-change-transform lg:hidden">
                <Media src={l.portrait} alt={l.alt} fill priority={i === 0} sizes="100vw" className="object-cover object-[50%_30%]" />
              </div>
            </div>
          ))}
          {/* Light band that crosses the frame during each change */}
          <div data-sweep aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/4 opacity-0 bg-[linear-gradient(100deg,transparent_0%,rgba(255,248,232,0.55)_45%,rgba(240,223,180,0.35)_55%,transparent_100%)] mix-blend-screen blur-[6px]" />
        </div>

        {/* Desktop: category menu (left) */}
        <nav data-depth-type aria-label="Shop by category" className="absolute left-[var(--spacing-gutter)] top-1/2 z-30 hidden -translate-y-1/2 lg:block">
          <p data-hero-in className="eyebrow mb-6 text-mist">The Edit · {pad2(active + 1)} / {pad2(n)}</p>
          <ul className="space-y-[0.55rem]">
            {heroMenu.map((m) => {
              const on = m.id === look.menu;
              return (
                <li key={m.id} data-hero-in>
                  <Link href={m.href} className={cn("group/m flex items-center gap-3 text-[15px] uppercase tracking-[0.14em] transition-colors duration-500", on ? "text-ink" : "text-ink/45 hover:text-ink")}>
                    <span aria-hidden className={cn("h-px bg-champagne-deep transition-[width] duration-700 ease-luxe", on ? "w-8" : "w-0 group-hover/m:w-4")} />
                    {m.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Wordmark, tagline and CTA: right on desktop, foot panel on phones */}
        <div className="absolute inset-x-0 bottom-0 z-30 lg:inset-x-auto lg:bottom-auto lg:right-[calc(var(--spacing-gutter)+2.5rem)] lg:top-1/2 lg:-translate-y-1/2">
          <div data-depth-type className="flex flex-col items-center px-5 pb-6 text-center lg:items-end lg:px-0 lg:pb-0 lg:text-right">
            {/* Phones: category chips that follow the look */}
            <div ref={chips} data-hero-in className="no-scrollbar -mx-5 mb-4 flex w-[calc(100%+2.5rem)] gap-2 overflow-x-auto px-5 lg:hidden">
              {heroMenu.slice(1).map((m) => (
                <Link key={m.id} href={m.href} data-chip={m.id} className={cn("shrink-0 rounded-full border px-3.5 py-2 text-[11px] uppercase tracking-[0.14em] transition-colors duration-500", m.id === look.menu ? "border-ink bg-ink text-pearl" : "border-ink/20 text-ink/70")}>{m.label}</Link>
              ))}
            </div>
            <h1 data-hero-in className="wordmark text-[clamp(1.6rem,7vw,2.2rem)] leading-none lg:text-[clamp(2.6rem,4.4vw,4.6rem)] lg:font-normal">SUPERMIMIC</h1>
            <p data-hero-in className="tagline-caps mt-2 text-[11px] text-graphite lg:mt-4 lg:text-[13px]">{site.tagline}</p>
            <div data-hero-in className="mt-4 lg:mt-8">
              <Magnetic><Link href="/collections/all" className="btn btn-light">Explore collection <ArrowRight width={14} height={14} /></Link></Magnetic>
            </div>
            <p key={look.id} aria-live="polite" className="eyebrow mt-10 hidden animate-[fade-up_0.9s_var(--ease-luxe)_both] text-graphite lg:block">{pad2(active + 1)} — {heroMenu.find((m) => m.id === look.menu)?.label}<span className="mt-1.5 block normal-case tracking-[0.08em] text-mist">{look.caption}</span></p>
          </div>
        </div>

        {/* Desktop: progress rail on the right edge */}
        <div aria-hidden className="absolute right-[calc(var(--spacing-gutter)*0.5)] top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
          {looks.map((l, i) => (
            <span key={l.id} className="relative block h-11 w-[2px] overflow-hidden bg-ink/15">
              <span ref={(r) => { bars.current[i] = r; }} className="absolute inset-0 origin-top bg-ink" style={{ transform: `scaleY(${i === 0 ? 1 : 0})` }} />
            </span>
          ))}
        </div>

        {/* Phones: thin progress under the frame */}
        <div aria-hidden className="absolute inset-x-5 bottom-[200px] z-30 flex gap-1.5 lg:hidden">
          {looks.map((l, i) => <span key={l.id} className={cn("h-[2px] flex-1 transition-colors duration-700", i === active ? "bg-ink" : "bg-ink/15")} />)}
        </div>
      </div>
    </section>
  );
}
