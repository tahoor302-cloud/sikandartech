"use client";
import { useRef, type ReactNode } from "react";
import { useGsap } from "@/hooks/use-gsap";
import { gsap, isTouch, prefersReducedMotion } from "@/lib/motion";

/** Subtle magnetic pull toward the pointer (fine pointers only). */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGsap<HTMLDivElement>((_, el) => {
    if (isTouch() || prefersReducedMotion()) return;
    const target = el.firstElementChild as HTMLElement;
    const xTo = gsap.quickTo(target, "x", { duration: 0.6, ease: "power3.out" });
    const yTo = gsap.quickTo(target, "y", { duration: 0.6, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); };
  }, [], ref);
  return (
    <div ref={ref} className={className} style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
