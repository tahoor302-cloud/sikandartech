"use client";
import { useEffect } from "react";
import { useLenis } from "@/components/animations/smooth-scroll";

/** Freezes page scroll (Lenis + native) while an overlay is open. */
export function useLockScroll(locked: boolean) {
  const lenis = useLenis();
  useEffect(() => {
    if (!locked) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    const sbw = window.innerWidth - html.clientWidth;
    lenis?.stop();
    html.style.overflow = "hidden";
    html.style.setProperty("--sbw", `${sbw}px`);
    return () => {
      lenis?.start();
      html.style.overflow = prev;
      html.style.removeProperty("--sbw");
    };
  }, [locked, lenis]);
}
