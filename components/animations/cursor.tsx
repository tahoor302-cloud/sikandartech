"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, isTouch, prefersReducedMotion } from "@/lib/motion";

/**
 * Minimal follower cursor: a champagne dot plus a ring that expands over
 * interactive elements. Elements with data-cursor="View" show a label.
 * The native cursor stays visible for accessibility.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (isTouch() || prefersReducedMotion()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    const d = dot.current, r = ring.current;
    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(r, "x", { duration: 0.5, ease: "power3.out" });
    const ry = gsap.quickTo(r, "y", { duration: 0.5, ease: "power3.out" });
    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) { gsap.to([d, r], { autoAlpha: 1, duration: 0.3 }); shown = true; }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button");
      const lbl = t?.dataset.cursor ?? "";
      setLabel((prev) => (prev === lbl ? prev : lbl));
      gsap.to(r, { scale: lbl ? 2.6 : t ? 1.6 : 1, backgroundColor: lbl ? "rgba(15,14,13,.9)" : "rgba(0,0,0,0)", borderColor: lbl ? "rgba(15,14,13,0)" : "rgba(200,178,138,.8)", duration: 0.35, overwrite: "auto" });
      gsap.to(d, { scale: t ? 0 : 1, duration: 0.25, overwrite: "auto" });
    };
    const leave = () => { gsap.to([d, r], { autoAlpha: 0, duration: 0.3 }); shown = false; };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[200] -ml-4 -mt-4 flex size-8 items-center justify-center rounded-full border border-champagne/80 opacity-0 invisible">
        <span className="text-[4px] font-semibold uppercase tracking-[0.2em] text-ivory">{label}</span>
      </div>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[201] -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-champagne opacity-0 invisible mix-blend-difference" />
    </>
  );
}
