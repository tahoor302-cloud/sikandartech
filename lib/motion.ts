"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";

let registered = false;
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, Flip);
  gsap.defaults({ ease: EASE.out, duration: DUR.base });
  ScrollTrigger.config({ ignoreMobileResize: true });
  registered = true;
}

/** Motion tokens — the only timings used across the site. */
export const DUR = { ui: 0.32, base: 0.8, hero: 1.4, slow: 1.6 } as const;
export const EASE = { out: "power3.out", strong: "power4.out", expo: "expo.out", inOut: "power2.inOut" } as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouch = () => typeof window !== "undefined" && window.matchMedia("(hover: none), (pointer: coarse)").matches;

export { gsap, ScrollTrigger, Flip };
