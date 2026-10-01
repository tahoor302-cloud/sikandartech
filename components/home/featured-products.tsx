"use client";
import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductGrid } from "@/components/products/product-grid";
import { categoryLabel } from "@/lib/product";
import type { CategoryId, Product } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Section 8 — Featured products with animated (Flip) category tabs. */
export function FeaturedProducts({ products }: { products: Product[] }) {
  const [tab, setTab] = useState<CategoryId | "all">("all");
  const tabs = useMemo(() => ["all", ...Array.from(new Set(products.map((p) => p.category)))] as (CategoryId | "all")[], [products]);
  const list = useMemo(() => (tab === "all" ? products : products.filter((p) => p.category === tab)).slice(0, 8), [products, tab]);
  return (
    <section className="shell py-[var(--spacing-section)]">
      <SectionHeading
        eyebrow="The Edit"
        title="Featured objects"
        action={
          <div role="tablist" aria-label="Filter featured products" className="flex flex-wrap gap-x-7 gap-y-3">
            {tabs.map((t) => (
              <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn("label relative pb-1.5 text-[10.5px] transition-colors duration-300", tab === t ? "text-ink" : "text-mist hover:text-ink")}>
                {t === "all" ? "All" : categoryLabel[t]}
                <span className={cn("absolute inset-x-0 bottom-0 h-px origin-left bg-champagne transition-transform duration-500 ease-luxe", tab === t ? "scale-x-100" : "scale-x-0")} />
              </button>
            ))}
          </div>
        }
      />
      <ProductGrid products={list} flip className="mt-14 md:mt-20" />
    </section>
  );
}
