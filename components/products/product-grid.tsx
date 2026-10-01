"use client";
import { useLayoutEffect, useRef } from "react";
import { ProductCard } from "@/components/product-card/product-card";
import { useGsap } from "@/hooks/use-gsap";
import { gsap, Flip, EASE, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  products: Product[];
  columns?: 3 | 4;
  className?: string;
  priorityCount?: number;
  /** Animate re-ordering / filtering with GSAP Flip. */
  flip?: boolean;
}

/**
 * Responsive editorial grid: 2 cols mobile → 3 tablet → 4 desktop.
 * Cards stagger in on scroll (batched for large catalogs); filter changes animate via Flip.
 */
export function ProductGrid({ products, columns = 4, className, priorityCount = 0, flip = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const firstRun = useRef(true);

  // Batched scroll entrance — one ScrollTrigger per row, cheap for 100s of products.
  useGsap<HTMLDivElement>((_, el) => {
    const cards = el.querySelectorAll<HTMLElement>("[data-grid-item]:not([data-shown])");
    if (prefersReducedMotion()) return void gsap.set(cards, { opacity: 1 });
    gsap.set(cards, { opacity: 0, y: 48 });
    ScrollTrigger.batch(cards, {
      start: "top 92%",
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: EASE.out, stagger: 0.08, overwrite: true });
        batch.forEach((b) => b.setAttribute("data-shown", ""));
      },
    });
  }, [products.length === 0], ref);

  // Record positions before React commits the new list …
  const keys = products.map((p) => p.id).join("|");
  if (flip && ref.current && !firstRun.current) {
    const items = ref.current.querySelectorAll("[data-grid-item]");
    if (items.length) flipState.current = Flip.getState(items);
  }
  // … and animate from them after.
  useLayoutEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    const el = ref.current;
    if (!flip || !el || !flipState.current || prefersReducedMotion()) return;
    const items = el.querySelectorAll<HTMLElement>("[data-grid-item]");
    items.forEach((i) => { i.setAttribute("data-shown", ""); gsap.set(i, { opacity: 1, y: 0 }); });
    Flip.from(flipState.current, {
      targets: items,
      duration: 0.75,
      ease: EASE.strong,
      absolute: true,
      scale: false,
      stagger: 0.02,
      onEnter: (els: Element[]) => gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: EASE.out, stagger: 0.04 }),
      onLeave: (els: Element[]) => gsap.to(els, { opacity: 0, duration: 0.3 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
    flipState.current = null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys]);

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 md:grid-cols-3 md:gap-y-16",
        columns === 4 ? "xl:grid-cols-4 xl:gap-x-6" : "xl:gap-x-8",
        className,
      )}
    >
      {products.map((p, i) => (
        <div key={p.id} data-grid-item data-flip-id={p.id}>
          <ProductCard product={p} priority={i < priorityCount} />
        </div>
      ))}
    </div>
  );
}
