"use client";
import type { ReactNode } from "react";
import { useGsap } from "@/hooks/use-gsap";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Scrubbed parallax. `speed` is the yPercent travel (negative = moves up faster).
 * Disabled below 768px and for reduced motion — heavy parallax is desktop-only.
 */
export function Parallax({ children, speed = -12, scale, className, x = 0 }: { children: ReactNode; speed?: number; scale?: [number, number]; className?: string; x?: number }) {
  const ref = useGsap<HTMLDivElement>((_, el) => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        el,
        { yPercent: -speed / 2, xPercent: -x / 2, scale: scale?.[0] ?? 1 },
        { yPercent: speed / 2, xPercent: x / 2, scale: scale?.[1] ?? 1, ease: "none", scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true } },
      );
    });
    return () => mm.revert();
  });
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
