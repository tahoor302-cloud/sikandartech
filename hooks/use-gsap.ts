"use client";
import { useEffect, useLayoutEffect, useRef, type DependencyList, type RefObject } from "react";
import { gsap, registerGsap } from "@/lib/motion";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Runs GSAP code inside a gsap.context scoped to `scope`, reverting every tween
 * and ScrollTrigger on unmount / dependency change. (Equivalent to @gsap/react's useGSAP.)
 */
export function useGsap<T extends HTMLElement = HTMLDivElement>(
  fn: (ctx: gsap.Context, el: T) => void | (() => void),
  deps: DependencyList = [],
  externalScope?: RefObject<T | null>,
) {
  const internal = useRef<T>(null);
  const scope = externalScope ?? internal;
  useIso(() => {
    registerGsap();
    const el = scope.current;
    if (!el) return;
    let cleanup: void | (() => void);
    const ctx = gsap.context((self) => {
      cleanup = fn(self, el);
    }, el);
    return () => {
      if (typeof cleanup === "function") cleanup();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return internal;
}
