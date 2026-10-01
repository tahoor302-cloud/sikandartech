"use client";
import { useState } from "react";
import { HeartIcon } from "@/components/ui/icons";
import { useWishlist, wishlist } from "@/lib/store/wishlist";
import { cn } from "@/lib/utils";

export function WishlistButton({ productId, name, className, size = 18 }: { productId: string; name: string; className?: string; size?: number }) {
  const active = useWishlist((s) => s.ids.includes(productId));
  const [burst, setBurst] = useState(0);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); wishlist.toggle(productId); setBurst((b) => b + 1); }}
      className={cn("grid place-items-center transition-colors duration-300", active ? "text-champagne-deep" : "text-ink/70 hover:text-ink", className)}
    >
      <span key={burst} className={cn("block", burst > 0 && "animate-heart")}>
        <HeartIcon filled={active} width={size} height={size} />
      </span>
    </button>
  );
}
