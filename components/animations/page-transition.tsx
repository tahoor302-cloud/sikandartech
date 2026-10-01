"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { Logo } from "@/components/ui/logo";
import { usePathname } from "next/navigation";
import { gsap, DUR, EASE, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { useLenis } from "./smooth-scroll";

/**
 * Global transition curtain. `coverThen(fn)` wipes an ivory panel with a
 * champagne hairline over the page, runs `fn` (navigation), and the next page's
 * <PageEnter> reveals it. Total cost ≈ 350ms out, 600ms in — never blocks input long.
 */
let curtainEl: HTMLDivElement | null = null;
let lineEl: HTMLDivElement | null = null;
let covering = false;
let safety: ReturnType<typeof setTimeout> | undefined;

export function coverThen(fn: () => void) {
  if (!curtainEl || prefersReducedMotion() || covering) return fn();
  covering = true;
  gsap.killTweensOf([curtainEl, lineEl]);
  gsap.set(curtainEl, { autoAlpha: 1, yPercent: 100 });
  gsap.set(lineEl, { scaleX: 0, transformOrigin: "left center" });
  gsap.timeline({ onComplete: fn })
    .to(curtainEl, { yPercent: 0, duration: 0.42, ease: EASE.inOut })
    .to(lineEl, { scaleX: 1, duration: 0.38, ease: EASE.strong }, 0.12);
  clearTimeout(safety);
  safety = setTimeout(uncover, 1600); // never leave the curtain stuck
}

export function uncover() {
  clearTimeout(safety);
  if (!curtainEl || !covering) return;
  covering = false;
  gsap.timeline()
    .set(lineEl, { transformOrigin: "right center" })
    .to(lineEl, { scaleX: 0, duration: 0.35, ease: EASE.inOut })
    .to(curtainEl, { yPercent: -100, duration: 0.65, ease: EASE.strong }, 0.08)
    .set(curtainEl, { autoAlpha: 0 });
}

export function TransitionCurtain() {
  const c = useRef<HTMLDivElement>(null);
  const l = useRef<HTMLDivElement>(null);
  useEffect(() => {
    curtainEl = c.current;
    lineEl = l.current;
    return () => { curtainEl = null; lineEl = null; };
  }, []);
  return (
    <div ref={c} aria-hidden className="pointer-events-none fixed inset-0 z-[150] flex items-center justify-center bg-ivory opacity-0 invisible">
      <div className="flex w-[min(420px,70vw)] flex-col items-center gap-5">
        <Logo tone="dark" eager className="h-11" />
        <div ref={l} className="gold-line w-full" />
      </div>
    </div>
  );
}

/** Wraps each page (via app/template.tsx): resets scroll, reveals content. */
export function PageEnter({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const pathname = usePathname();

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
    const el = ref.current;
    uncover();
    if (el && !prefersReducedMotion()) {
      gsap.fromTo(el, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: DUR.base, ease: EASE.out, delay: 0.08, clearProps: "transform" });
    }
    const t = setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <div ref={ref}>{children}</div>;
}
