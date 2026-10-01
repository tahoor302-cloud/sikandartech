"use client";
import { createElement, type ReactNode, type CSSProperties, type ElementType } from "react";
import { useGsap } from "@/hooks/use-gsap";
import { gsap, DUR, EASE, prefersReducedMotion } from "@/lib/motion";

type Variant = "up" | "fade" | "blur" | "scale" | "clip" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  duration?: number;
  /** Animate direct children in sequence instead of the wrapper. */
  stagger?: number;
  distance?: number;
  start?: string;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

const FROM: Record<Variant, gsap.TweenVars> = {
  up: { opacity: 0, y: 36 },
  fade: { opacity: 0 },
  blur: { opacity: 0, filter: "blur(14px)", scale: 1.02 },
  scale: { opacity: 0, scale: 0.94 },
  clip: { clipPath: "inset(100% 0% 0% 0%)" },
  left: { opacity: 0, x: -48 },
  right: { opacity: 0, x: 48 },
};
const TO: Record<Variant, gsap.TweenVars> = {
  up: { opacity: 1, y: 0 },
  fade: { opacity: 1 },
  blur: { opacity: 1, filter: "blur(0px)", scale: 1 },
  scale: { opacity: 1, scale: 1 },
  clip: { clipPath: "inset(0% 0% 0% 0%)" },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
};

/** Scroll-triggered entrance. Plays once; honours prefers-reduced-motion. */
export function Reveal({ children, as = "div", variant = "up", delay = 0, duration, stagger, distance, start = "top 88%", className, style, id }: RevealProps) {
  const ref = useGsap<HTMLElement>((_, el) => {
    const targets = stagger ? Array.from(el.children) : [el];
    if (prefersReducedMotion()) {
      gsap.set([el, ...targets], { opacity: 1, clearProps: "clipPath,transform,filter" });
      return;
    }
    const from = { ...FROM[variant] };
    if (distance != null && "y" in from) from.y = distance;
    if (stagger) gsap.set(el, { opacity: 1, clipPath: "none" });
    gsap.fromTo(targets, from, {
      ...TO[variant],
      duration: duration ?? (variant === "clip" ? DUR.hero : DUR.base),
      ease: variant === "clip" ? EASE.expo : EASE.out,
      delay,
      stagger,
      ...(variant === "blur" ? { clearProps: "filter" } : {}),
      scrollTrigger: { trigger: el, start, once: true },
    });
  });
  return createElement(as, { ref, className, style, id, "data-reveal": stagger ? "group" : variant }, children);
}
