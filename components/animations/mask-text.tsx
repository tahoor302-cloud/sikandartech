"use client";
import { createElement, type ElementType } from "react";
import { useGsap } from "@/hooks/use-gsap";
import { gsap, DUR, EASE, prefersReducedMotion } from "@/lib/motion";

interface MaskTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** "words" (default) or "chars" — chars suits short wordmarks. */
  split?: "words" | "chars";
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Play immediately instead of on scroll. */
  immediate?: boolean;
  start?: string;
}

/** Text masking reveal: each word/char slides up from behind an overflow mask. */
export function MaskText({ text, as = "h2", className, split = "words", delay = 0, stagger, duration, immediate, start = "top 90%" }: MaskTextProps) {
  const ref = useGsap<HTMLElement>((_, el) => {
    const inner = el.querySelectorAll<HTMLElement>(".mask > span");
    if (prefersReducedMotion()) return void gsap.set(inner, { yPercent: 0, y: 0 });
    gsap.fromTo(
      inner,
      { yPercent: 120, y: 0 },
      {
        yPercent: 0,
        y: 0,
        duration: duration ?? (split === "chars" ? DUR.hero : 1.1),
        ease: EASE.expo,
        stagger: stagger ?? (split === "chars" ? 0.045 : 0.07),
        delay,
        scrollTrigger: immediate ? undefined : { trigger: el, start, once: true },
      },
    );
  }, [text]);

  const words = text.split(" ");
  const content = words.map((w, wi) => (
    <span key={wi} className="inline-block whitespace-nowrap">
      {split === "chars"
        ? Array.from(w).map((ch, ci) => (
            <span key={ci} className="mask" aria-hidden>
              <span>{ch}</span>
            </span>
          ))
        : (
            <span className="mask" aria-hidden>
              <span>{w}</span>
            </span>
          )}
      {wi < words.length - 1 ? " " : null}
    </span>
  ));

  return createElement(as, { ref, className, "data-mask": "", "aria-label": text }, content);
}
