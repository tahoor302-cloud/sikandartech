"use client";
import { createElement, type ElementType } from "react";
import { useGsap } from "@/hooks/use-gsap";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/** Words brighten one by one as the passage scrolls through the viewport. */
export function ScrubWords({ text, as = "p", className, dim = 0.14, highlight = [] as string[] }: { text: string; as?: ElementType; className?: string; dim?: number; highlight?: string[] }) {
  const ref = useGsap<HTMLElement>((_, el) => {
    const words = el.querySelectorAll("[data-w]");
    if (prefersReducedMotion()) return void gsap.set(words, { opacity: 1 });
    gsap.fromTo(words, { opacity: dim }, { opacity: 1, stagger: 0.08, ease: "none", scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 45%", scrub: 0.6 } });
  }, [text]);
  return createElement(
    as,
    { ref, className, "aria-label": text },
    text.split(" ").map((w, i) => (
      <span key={i} data-w aria-hidden style={{ opacity: dim }} className={highlight.includes(w.replace(/[.,—]/g, "")) ? "font-normal text-champagne-deep" : undefined}>
        {w}{" "}
      </span>
    )),
  );
}
