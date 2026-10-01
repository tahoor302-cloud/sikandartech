"use client";
import { site } from "@/data/site";
import { Link } from "@/components/ui/link";
import { Media } from "@/components/ui/media";
import { Quantity } from "@/components/ui/quantity";
import { cart } from "@/lib/store/cart";
import type { CartLine as Line } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function CartLineItem({ line, onNavigate, large }: { line: Line; onNavigate?: () => void; large?: boolean }) {
  return (
    <li className="flex gap-4 py-5">
      <Link href={`/product/${line.productId}`} onClick={onNavigate} className={large ? "relative aspect-[4/5] w-28 shrink-0 overflow-hidden bg-ivory-2 sm:w-36" : "relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-ivory-2"}>
        <Media src={line.image} alt={line.name} fill sizes="144px" className="object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="eyebrow truncate text-[9px] text-mist">{line.brand}</p>
            <Link href={`/product/${line.productId}`} onClick={onNavigate} className="mt-1 line-clamp-2 text-[14px] font-medium leading-snug">{line.name}</Link>
            <p className="mt-1 text-[12px] text-graphite">
              {[line.colorName, line.size].filter(Boolean).join(" · ")}
            </p>
          </div>
          {site.showPrices && <p className="shrink-0 text-[13px] tabular-nums">{formatPrice(line.price * line.quantity, line.currency)}</p>}
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <Quantity size="sm" value={line.quantity} onChange={(q) => cart.setQuantity(line.id, q)} min={1} />
          <button type="button" onClick={() => cart.remove(line.id)} className="link-u text-[12px] text-graphite">Remove</button>
        </div>
      </div>
    </li>
  );
}
