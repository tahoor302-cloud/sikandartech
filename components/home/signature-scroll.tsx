"use client";
import { useRef, useState } from "react";
import { Media } from "@/components/ui/media";
import { signatureStages as stages } from "@/data/site";
import { useGsap } from "@/hooks/use-gsap";
import { gsap, EASE, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Section 4 — the Super Mimic signature interaction.
 * Desktop: the frame pins centre-stage while four chapters (Material → Craft →
 * Detail → Collection) scrub through: the image wipes via clip-path masks and
 * eases in scale, text slides horizontally, the index advances.
 * Mobile / reduced motion: chapters stack with simple reveals.
 */
export function SignatureScroll() {
  const [active, setActive] = useState(0);
  const pinRef = useRef<HTMLDivElement>(null);

  const root = useGsap<HTMLElement>((_, el) => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const q = gsap.utils.selector(el);
      const imgs = q("[data-sig-img]");
      const texts = q("[data-sig-text]");
      const thumbs = q("[data-sig-thumb]");
      gsap.set(imgs.slice(1), { clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(texts.slice(1), { autoAlpha: 0, x: 60 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${window.innerHeight * (stages.length + 0.2)}`,
          pin: pinRef.current,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => setActive(Math.min(stages.length - 1, Math.floor(self.progress * stages.length * 0.999))),
        },
      });

      tl.fromTo(q("[data-sig-frame]"), { scale: 0.86 }, { scale: 1, duration: 0.6, ease: EASE.out }, 0)
        .fromTo(q("[data-sig-progress]"), { scaleY: 0 }, { scaleY: 1, duration: stages.length }, 0);

      stages.forEach((_, i) => {
        if (i === 0) return;
        const at = i; // one unit of timeline per chapter
        tl.to(texts[i - 1], { autoAlpha: 0, x: -60, duration: 0.35 }, at - 0.3)
          .to(imgs[i], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.7, ease: "power2.inOut" }, at - 0.4)
          .fromTo(imgs[i].firstElementChild, { scale: 1.25 }, { scale: 1, duration: 0.9 }, at - 0.4)
          .to(imgs[i - 1].firstElementChild, { scale: 1.08, duration: 0.7 }, at - 0.4)
          .to(texts[i], { autoAlpha: 1, x: 0, duration: 0.45 }, at - 0.1);
      });
      // Supporting thumbnails drift horizontally across the whole sequence
      thumbs.forEach((t, i) => tl.fromTo(t, { xPercent: i % 2 ? 40 : -40, yPercent: 20 }, { xPercent: i % 2 ? -40 : 40, yPercent: -20, duration: stages.length }, 0));
      // Chapter headings rise word-by-word (bottom → up, fading in) as each chapter arrives
      texts.forEach((t, i) => {
        const w = t.querySelectorAll("[data-sig-word]");
        tl.fromTo(w, { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3, stagger: 0.035, ease: "power3.out" }, i === 0 ? 0.1 : i - 0.1);
      });
      tl.to({}, { duration: 0.2 });
      return () => setActive(0);
    });
    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-sig-mobile]")).forEach((m) => {
        gsap.fromTo(m, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: EASE.out, scrollTrigger: { trigger: m, start: "top 85%", once: true } });
      });
    });
    ScrollTrigger.refresh();
    return () => mm.revert();
  });

  return (
    <section ref={root} className="relative bg-ivory-2" aria-label="The Super Mimic standard">
      {/* Desktop pinned stage */}
      <div ref={pinRef} className="relative hidden h-[100svh] overflow-hidden lg:block">
        <div className="shell grid h-full grid-cols-12 items-center gap-8">
          {/* Chapter index */}
          <div className="col-span-3 flex h-[62vh] gap-6">
            <div className="relative w-px bg-line"><span data-sig-progress className="absolute inset-0 origin-top bg-champagne" /></div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="eyebrow text-champagne-deep">The Standard</p>
                <p className="mt-3 max-w-[20ch] font-display text-[22px] font-light leading-snug text-graphite">Eight objects, one standard.</p>
              </div>
              <ol className="flex flex-col gap-3">
                {stages.map((s, i) => (
                  <li key={s.index} className={cn("flex items-baseline gap-4 transition-[color,opacity,translate] duration-500 ease-luxe", i === active ? "translate-x-2 text-ink" : "text-mist/70")}>
                    <span className="eyebrow tabular-nums">{s.index}</span>
                    <span className="h-px w-6 self-center bg-current" />
                    <span className="label text-[11px]">{s.title}</span>
                  </li>
                ))}
              </ol>
              <p className="eyebrow text-mist">Scroll</p>
            </div>
          </div>

          {/* Pinned frame */}
          <div className="relative col-span-5 flex justify-center">
            <div data-sig-frame className="relative aspect-[4/5] h-[74vh] max-h-[860px] overflow-hidden bg-charcoal shadow-[0_40px_120px_-40px_rgba(15,14,13,.45)]">
              {stages.map((s, i) => (
                <div key={s.index} data-sig-img className="absolute inset-0" style={{ zIndex: i }}>
                  <div className="absolute inset-0 will-change-transform">
                    <Media src={s.image} alt={`${s.title} — Super Mimic`} fill sizes="40vw" className="object-cover" />
                  </div>
                </div>
              ))}
              <div className="pointer-events-none absolute inset-0 z-10 ring-1 ring-inset ring-champagne/25" />
            </div>
            {/* supporting imagery */}
            <div data-sig-thumb className="absolute -right-10 top-[6%] z-20 hidden aspect-square w-28 overflow-hidden bg-ivory shadow-xl xl:block">
              <Media src="/media/products/fold-card-holder/01-primary-noir.webp" alt="" fill sizes="112px" className="object-cover" />
            </div>
            <div data-sig-thumb className="absolute -left-14 bottom-[8%] z-20 hidden aspect-[4/5] w-32 overflow-hidden bg-ivory shadow-xl xl:block">
              <Media src="/media/products/lumen-tank/01-primary-champagne.webp" alt="" fill sizes="128px" className="object-cover" />
            </div>
          </div>

          {/* Chapter text */}
          <div className="relative col-span-4 h-[40vh]">
            {stages.map((s) => (
              <div key={s.index} data-sig-text className="absolute inset-0 flex flex-col justify-center pl-6">
                <span className="font-display text-[120px] font-light leading-none text-champagne/60">{s.index}</span>
                <p className="eyebrow mt-2 text-champagne-deep">{s.title}</p>
                <h3 className="display mt-5 text-[44px] leading-[1.02]" aria-label={s.heading}>
                    {s.heading.split(" ").map((w, wi, all) => (
                      <span key={wi} className="inline-block whitespace-nowrap">
                        <span className="mask" aria-hidden><span data-sig-word>{w}</span></span>
                        {wi < all.length - 1 ? " " : null}
                      </span>
                    ))}
                  </h3>
                <p className="prose-lux mt-5 max-w-[38ch]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / tablet stacked chapters */}
      <div className="shell flex flex-col gap-20 py-24 lg:hidden">
        <div>
          <p className="eyebrow text-champagne-deep">The Standard</p>
          <p className="display mt-4 text-display-sm">Eight objects, one standard.</p>
        </div>
        {stages.map((s) => (
          <div key={s.index} data-sig-mobile className="grid gap-6 md:grid-cols-2 md:items-center md:gap-10">
            <div className="relative aspect-[4/5] overflow-hidden bg-charcoal">
              <Media src={s.image} alt={s.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div>
              <p className="eyebrow text-champagne-deep">{s.index} — {s.title}</p>
              <h3 className="display mt-4 text-[34px] leading-tight">{s.heading}</h3>
              <p className="prose-lux mt-4">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
