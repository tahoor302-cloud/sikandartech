"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Media } from "@/components/ui/media";
import { Sheet } from "@/components/ui/sheet";
import { ArrowLeft, ArrowRight, CloseIcon, ZoomIcon } from "@/components/ui/icons";
import { useLenis } from "@/components/animations/smooth-scroll";
import { gsap, EASE, prefersReducedMotion } from "@/lib/motion";
import type { ProductImage } from "@/lib/types";
import { cn, pad2 } from "@/lib/utils";

/**
 * Product gallery.
 * Desktop: sticky thumbnail rail + tall stacked images (hover-zoom follows the
 * pointer, click for full-screen). Active thumb tracks scroll position.
 * Mobile: native swipe carousel with scroll-snap + counter; tap to zoom.
 */
export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const track = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const key = images.map((i) => i.src).join("|");

  // Colour change → soft cross-fade of the whole gallery
  useEffect(() => {
    setActive(0);
    if (prefersReducedMotion()) return;
    const els = refs.current.filter(Boolean);
    gsap.fromTo(els, { opacity: 0.2, scale: 1.015 }, { opacity: 1, scale: 1, duration: 0.8, ease: EASE.out, stagger: 0.05 });
    track.current?.scrollTo({ left: 0 });
  }, [key]);

  // Track which stacked image is in view (desktop)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index)); }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, [key]);

  const goTo = (i: number) => {
    const el = refs.current[i];
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -100, duration: 1.1 });
    else el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onTrackScroll = () => {
    const t = track.current;
    if (!t) return;
    setActive(Math.round(t.scrollLeft / t.clientWidth));
  };

  return (
    <div className="relative" data-gallery>
      {/* Mobile carousel */}
      <div className="relative md:hidden">
        <div ref={track} onScroll={onTrackScroll} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto" data-lenis-prevent>
          {images.map((img, i) => (
            <button key={img.src} type="button" onClick={() => setLightbox(i)} className="relative aspect-[4/5] w-full shrink-0 snap-center bg-ivory-2" aria-label={`Zoom image ${i + 1}`}>
              <Media src={img.src} alt={img.alt} fill priority={i === 0} sizes="100vw" className="object-cover" />
            </button>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex items-center justify-between px-5">
          <span className="eyebrow rounded-full bg-ivory/80 px-2.5 py-1 text-[9px] tabular-nums backdrop-blur">{pad2(active + 1)} / {pad2(images.length)}</span>
          <div className="flex gap-1.5">
            {images.map((_, i) => <span key={i} className={cn("h-px w-5 transition-colors duration-300", i === active ? "bg-ink" : "bg-ink/25")} />)}
          </div>
        </div>
      </div>

      {/* Desktop: rail + stack */}
      <div className="hidden gap-5 md:grid md:grid-cols-[72px_1fr]">
        <div className="relative">
          <ul className="sticky top-32 flex flex-col gap-3">
            {images.map((img, i) => (
              <li key={img.src}>
                <button type="button" onClick={() => goTo(i)} aria-label={`Show image ${i + 1}`} aria-current={i === active} className={cn("relative block aspect-[4/5] w-full overflow-hidden bg-ivory-2 transition-opacity duration-300", i === active ? "opacity-100" : "opacity-50 hover:opacity-80")}>
                  <Media src={img.src} alt="" fill sizes="72px" className="object-cover" />
                  <span className={cn("absolute inset-x-0 bottom-0 h-px origin-left bg-ink transition-transform duration-500 ease-luxe", i === active ? "scale-x-100" : "scale-x-0")} />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-5">
          {images.map((img, i) => (
            <ZoomFrame key={img.src} img={img} priority={i === 0} index={i} onOpen={() => setLightbox(i)} ref={(el) => { refs.current[i] = el; }} />
          ))}
        </div>
      </div>

      <Lightbox images={images} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} name={name} />
    </div>
  );
}

function ZoomFrame({ img, priority, index, onOpen, ref }: { img: ProductImage; priority: boolean; index: number; onOpen: () => void; ref: (el: HTMLDivElement | null) => void }) {
  const inner = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(false);
  const move = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100, y = ((e.clientY - r.top) / r.height) * 100;
    if (inner.current) inner.current.style.transformOrigin = `${x}% ${y}%`;
  }, []);
  return (
    <div
      ref={ref}
      data-index={index}
      onPointerEnter={() => setZoom(true)}
      onPointerLeave={() => setZoom(false)}
      onPointerMove={move}
      onClick={onOpen}
      data-cursor="Zoom"
      className="group/z relative aspect-[4/5] cursor-zoom-in overflow-hidden bg-ivory-2"
    >
      <div ref={inner} className={cn("absolute inset-0 transition-transform duration-700 ease-luxe", zoom ? "scale-[1.75]" : "scale-100")}>
        <Media src={img.src} alt={img.alt} fill priority={priority} sizes="(min-width:1280px) 55vw, (min-width:768px) 50vw, 100vw" className="object-cover" />
      </div>
      <span className="pointer-events-none absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-ivory/80 opacity-0 backdrop-blur transition-opacity duration-300 group-hover/z:opacity-100"><ZoomIcon width={16} height={16} /></span>
    </div>
  );
}

function Lightbox({ images, index, onClose, onChange, name }: { images: ProductImage[]; index: number | null; onClose: () => void; onChange: (i: number) => void; name: string }) {
  const open = index !== null;
  const i = index ?? 0;
  const startX = useRef(0);
  const prev = useCallback(() => onChange((i - 1 + images.length) % images.length), [i, images.length, onChange]);
  const next = useCallback(() => onChange((i + 1) % images.length), [i, images.length, onChange]);
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, prev, next]);
  return (
    <Sheet open={open} onClose={onClose} side="bottom" label={`${name} — image viewer`} className="!inset-0 !max-h-none !rounded-none bg-ivory">
      <div className="relative h-full w-full" onPointerDown={(e) => (startX.current = e.clientX)} onPointerUp={(e) => { const d = e.clientX - startX.current; if (Math.abs(d) > 50) (d > 0 ? prev() : next()); }}>
        {images.map((img, k) => (
          <div key={img.src} className={cn("absolute inset-0 transition-opacity duration-500 ease-luxe", k === i ? "opacity-100" : "pointer-events-none opacity-0")}>
            <Media src={img.src} alt={img.alt} fill sizes="100vw" className="object-contain" />
          </div>
        ))}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
          <span className="eyebrow tabular-nums">{pad2(i + 1)} / {pad2(images.length)}</span>
          <button onClick={onClose} aria-label="Close viewer" className="grid size-11 place-items-center rounded-full bg-ivory/80 backdrop-blur transition-transform duration-500 hover:rotate-90"><CloseIcon /></button>
        </div>
        <button onClick={prev} aria-label="Previous image" className="absolute left-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/80 backdrop-blur"><ArrowLeft /></button>
        <button onClick={next} aria-label="Next image" className="absolute right-4 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-ivory/80 backdrop-blur"><ArrowRight /></button>
      </div>
    </Sheet>
  );
}
