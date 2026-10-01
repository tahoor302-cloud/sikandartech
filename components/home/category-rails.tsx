"use client";
import { useRef } from "react";
import { Link } from "@/components/ui/link";
import { ProductCard } from "@/components/product-card/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import type { Category, Product } from "@/lib/types";

export interface CategoryRail {
  category: Category;
  products: Product[];
}

function Rail({ category, products }: CategoryRail) {
  const track = useRef<HTMLDivElement>(null);
  const nudge = (dir: 1 | -1) => {
    const el = track.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <div className="border-t border-line pt-10 md:pt-14">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-champagne-deep">{category.count} objects · {category.subcategories.map((s) => s.name).join(" · ")}</p>
          <h3 className="display mt-3 text-display-sm">{category.name}</h3>
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden gap-1 md:flex">
            <button type="button" onClick={() => nudge(-1)} aria-label={`Scroll ${category.name} back`} className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-ink"><ArrowLeft width={16} height={16} /></button>
            <button type="button" onClick={() => nudge(1)} aria-label={`Scroll ${category.name} forward`} className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-ink"><ArrowRight width={16} height={16} /></button>
          </div>
          <Link href={`/category/${category.slug}`} className="label link-u inline-flex items-center gap-3 whitespace-nowrap">View all {category.count} <ArrowRight width={14} height={14} /></Link>
        </div>
      </div>
      <div ref={track} className="no-scrollbar -mx-[var(--spacing-gutter)] mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--spacing-gutter)] px-[var(--spacing-gutter)] pb-2 md:gap-6" data-lenis-prevent-horizontal>
        {products.map((p) => (
          <div key={p.id} className="w-[64vw] shrink-0 snap-start sm:w-[40vw] md:w-[28vw] lg:w-[21vw] 2xl:w-[17vw]">
            <ProductCard product={p} sizes="(min-width:1024px) 21vw, (min-width:768px) 28vw, 64vw" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** One horizontal rail per non-empty category — generated from the catalog, so new categories appear automatically. */
export function CategoryRails({ rails }: { rails: CategoryRail[] }) {
  if (!rails.length) return null;
  return (
    <section className="shell py-[var(--spacing-section)]">
      <SectionHeading eyebrow="By category" title="Every category, in brief" />
      <div className="mt-14 flex flex-col gap-14 md:mt-20 md:gap-20">
        {rails.map((r) => <Rail key={r.category.id} {...r} />)}
      </div>
    </section>
  );
}
