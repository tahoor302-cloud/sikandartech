"use client";
import { Link } from "@/components/ui/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductGrid } from "@/components/products/product-grid";
import { ArrowRight } from "@/components/ui/icons";
import type { Product } from "@/lib/types";

/** Sections 5 — New arrivals grid with heading. */
export function ProductSection({ eyebrow, title, href, products, className }: { eyebrow: string; title: string; href: string; products: Product[]; className?: string }) {
  return (
    <section className={className ?? "shell py-[var(--spacing-section)]"}>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        action={<Link href={href} className="label link-u inline-flex items-center gap-3">View all <ArrowRight width={14} height={14} /></Link>}
      />
      <ProductGrid products={products} className="mt-14 md:mt-20" />
    </section>
  );
}
