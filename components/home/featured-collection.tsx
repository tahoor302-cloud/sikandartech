"use client";
import { Link } from "@/components/ui/link";
import { Media } from "@/components/ui/media";
import { ClipImage } from "@/components/animations/clip-image";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import { Parallax } from "@/components/animations/parallax";
import { ProductCard } from "@/components/product-card/product-card";
import { ArrowRight } from "@/components/ui/icons";
import type { Product } from "@/lib/types";

/** Section 3 — Featured collection: editorial image + two hero products. */
export function FeaturedCollection({ products }: { products: Product[] }) {
  const [a, b] = products;
  return (
    <section className="shell py-[var(--spacing-section)]" aria-labelledby="featured-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <ClipImage className="aspect-[4/5] w-full bg-charcoal md:aspect-[5/6]">
            <Media src="/media/products/halcyon-low/04-editorial.webp" alt="Halcyon Low sneaker on a plinth, Season 01" fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
          </ClipImage>
          <div className="mt-4 flex items-center justify-between">
            <span className="eyebrow text-mist">Halcyon Low — Ivory</span>
            <span className="eyebrow text-mist">SM-000002</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-14 lg:col-span-5 lg:pl-8">
          <div>
            <Reveal variant="fade" className="flex items-center gap-3">
              <span className="h-px w-8 bg-champagne" />
              <span className="eyebrow text-champagne-deep">Featured — Season 01</span>
            </Reveal>
            <MaskText as="h2" text="The Originals Edit" className="display mt-6 text-display-lg" />
            <Reveal delay={0.15}>
              <p id="featured-title" className="prose-lux mt-7 max-w-[42ch]">
                Our founding silhouettes, refined. Hand-burnished leathers, sapphire crystals and brushed champagne hardware — objects designed to be kept.
              </p>
              <Link href="/collections/originals" className="label link-u mt-8 inline-flex items-center gap-3">
                Shop the edit <ArrowRight width={14} height={14} />
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {a && <Reveal delay={0.1}><ProductCard product={a} sizes="(min-width:1024px) 20vw, 50vw" /></Reveal>}
            {b && (
              <Parallax speed={-14} className="mt-16">
                <Reveal delay={0.25}><ProductCard product={b} sizes="(min-width:1024px) 20vw, 50vw" /></Reveal>
              </Parallax>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
