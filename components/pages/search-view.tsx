"use client";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import { ProductGrid } from "@/components/products/product-grid";
import { ui } from "@/lib/store/ui";
import type { Product } from "@/lib/types";

export function SearchView({ query, products }: { query: string; products: Product[] }) {
  return (
    <div className="shell pb-[var(--spacing-section)] pt-32 md:pt-40">
      <Reveal variant="fade"><p className="eyebrow text-champagne-deep">Search — {products.length} results</p></Reveal>
      <MaskText as="h1" key={query} text={query ? `“${query}”` : "Search"} immediate delay={0.1} className="display mt-5 text-display-lg" />
      <div className="mt-14">
        {products.length ? <ProductGrid products={products} /> : (
          <div className="flex flex-col items-start gap-6">
            <p className="prose-lux">No objects match your search.</p>
            <button onClick={ui.openSearch} className="btn btn-outline">Search again</button>
          </div>
        )}
      </div>
    </div>
  );
}
