"use client";
import type { ReactNode } from "react";
import { useGsap } from "@/hooks/use-gsap";
import { gsap, EASE, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Editorial clip-path reveal: the frame wipes open while the image inside
 * settles from a slight zoom and blur to sharp.
 */
export function ClipImage({ children, className, direction = "up", delay = 0, parallax = true }: { children: ReactNode; className?: string; direction?: "up" | "left" | "right"; delay?: number; parallax?: boolean }) {
  const ref = useGsap<HTMLDivElement>((_, el) => {
    const inner = el.firstElementChild as HTMLElement | null;
    if (!inner) return;
    if (prefersReducedMotion()) return void gsap.set(el, { clipPath: "none" });
    const from = direction === "up" ? "inset(100% 0% 0% 0%)" : direction === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true }, delay });
    tl.fromTo(el, { clipPath: from }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: EASE.expo })
      .fromTo(inner, { scale: 1.25, filter: "blur(8px)" }, { scale: 1.06, filter: "blur(0px)", duration: 1.6, ease: EASE.expo, clearProps: "filter" }, 0);
    if (parallax && window.matchMedia("(min-width: 768px)").matches) {
      gsap.fromTo(inner, { yPercent: -4 }, { yPercent: 4, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    }
  });
  return (
    <div ref={ref} data-reveal="clip" className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-0 will-change-transform">{children}</div>
    </div>
  );
}
