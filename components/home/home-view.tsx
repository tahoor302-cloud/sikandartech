"use client";
import { Hero } from "@/components/hero/hero";
import { FeaturedCollection } from "./featured-collection";
import { SignatureScroll } from "./signature-scroll";
import { ProductSection } from "./product-rail";
import { EditorialStory } from "./editorial-story";
import { CategoryShowcase } from "./category-showcase";
import { FeaturedProducts } from "./featured-products";
import { BrandStatement } from "./brand-statement";
import { Membership } from "./membership";
import { CategoryRails, type CategoryRail } from "./category-rails";
import { AllProductsCta } from "./all-products-cta";
import type { Category, Product } from "@/lib/types";

export interface HomeData {
  originals: Product[];
  newArrivals: Product[];
  featured: Product[];
  trending: Product[];
  categories: Category[];
  rails: CategoryRail[];
  total: number;
}

/** Homepage composition — order per brief. Nav & footer live in the layout. */
export function HomeView({ originals, newArrivals, featured, trending, categories, rails, total }: HomeData) {
  const counts = Object.fromEntries(categories.map((c) => [c.id, c.count]));
  const ctaImages = rails.flatMap((r) => r.products.slice(0, 2)).map((p) => p.images.find((i) => i.kind === "editorial")?.src ?? p.images[0].src);
  return (
    <>
      <Hero />
      <FeaturedCollection products={originals} />
      <SignatureScroll />
      <ProductSection eyebrow="Season 01" title="New arrivals" href="/collections/new-arrivals" products={newArrivals} />
      <CategoryShowcase categories={categories} counts={counts} />
      {trending.length > 0 && <ProductSection eyebrow="Most wanted" title="Trending now" href="/products?trending=1" products={trending} className="shell pb-[var(--spacing-section)]" />}
      <EditorialStory />
      <CategoryRails rails={rails} />
      <FeaturedProducts products={featured} />
      <AllProductsCta total={total} categories={categories} images={ctaImages} />
      <BrandStatement />
      <Membership />
    </>
  );
}
