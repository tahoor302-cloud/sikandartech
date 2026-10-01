"use client";
import { memo } from "react";
import { Link } from "@/components/ui/link";
import { Media } from "@/components/ui/media";
import { Price } from "@/components/ui/price";
import { SwatchDots } from "@/components/ui/swatches";
import { EyeIcon } from "@/components/ui/icons";
import { WishlistButton } from "./wishlist-button";
import { primaryImage, secondaryImage, categoryLabel } from "@/lib/product";
import { nameOfSubcategory } from "@/lib/taxonomy";
import { ui } from "@/lib/store/ui";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Editorial variant: larger typography, no swatches. */
  variant?: "default" | "editorial";
}

/**
 * Editorial product card.
 * Hover: secondary angle cross-fades in, image eases to scale(1.04),
 * info lifts 4px, a champagne hairline draws in and quick-view fades up.
 */
export const ProductCard = memo(function ProductCard({ product: p, priority, sizes = "(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw", className, variant = "default" }: Props) {
  const a = primaryImage(p);
  const b = secondaryImage(p);
  const sizeCount = p.sizes.length;
  return (
    <article className={cn("group/card relative", className)} data-product-card>
      <div className="relative">
      <Link href={`/product/${p.id}`} className="block" data-cursor="View" aria-label={`${p.name}, ${p.brand}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-ivory-2">
          {a && (
            <Media src={a.src} alt={a.alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-[1100ms] ease-luxe group-hover/card:scale-[1.04]" />
          )}
          {b && (
            <Media src={b.src} alt={b.alt} fill sizes={sizes} className="!opacity-0 object-cover transition-[opacity,transform] duration-[900ms] ease-luxe group-hover/card:!opacity-100 group-hover/card:scale-[1.04]" />
          )}
          {p.newArrival && variant === "default" && (
            <span className="eyebrow absolute left-3 top-3 bg-ivory/85 px-2 py-1 text-[9px] text-ink backdrop-blur-sm">New</span>
          )}
          <span aria-hidden className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-luxe group-hover/card:scale-x-100" />
        </div>
      </Link>

      <WishlistButton productId={p.id} name={p.name} className="absolute right-2 top-2 size-9 rounded-full bg-ivory/0 backdrop-blur-0 transition-colors hover:bg-ivory/70" />

      <button
        type="button"
        onClick={() => ui.openQuickView(p.id)}
        aria-label={`Quick view ${p.name}`}
        className="absolute bottom-3 right-3 hidden size-10 translate-y-2 place-items-center rounded-full bg-ivory/90 text-ink opacity-0 shadow-sm backdrop-blur transition-[opacity,translate] duration-500 ease-luxe hover:bg-ivory focus-visible:translate-y-0 focus-visible:opacity-100 group-hover/card:translate-y-0 group-hover/card:opacity-100 md:grid"
        data-quickview
      >
        <EyeIcon width={18} height={18} />
      </button>
      </div>

      <Link href={`/product/${p.id}`} className="block pt-4 transition-transform duration-500 ease-luxe group-hover/card:-translate-y-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="eyebrow text-[9.5px] leading-[1.6] text-mist [overflow-wrap:anywhere]">{categoryLabel[p.category] ?? p.category}{p.subcategory && ` — ${nameOfSubcategory(p.subcategory)}`}</p>
            <h3 className={cn("mt-1.5 line-clamp-2 text-ink [overflow-wrap:anywhere]", variant === "editorial" ? "font-display text-[26px] font-light leading-[1.15]" : "text-[14px] font-medium leading-snug")}>{p.name}</h3>
          </div>
        </div>
        <div className="mt-1.5 flex items-center justify-between gap-3 text-[13px] text-graphite">
          <Price amount={p.price} compareAt={p.compareAtPrice} currency={p.currency} />
          {variant === "default" && (
            <span className="flex items-center gap-2">
              <SwatchDots colors={p.colors} max={3} />
              {sizeCount > 1 && <span className="hidden text-[11px] text-mist lg:inline">· {sizeCount} sizes</span>}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
});
