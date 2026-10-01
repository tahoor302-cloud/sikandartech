"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Quantity } from "@/components/ui/quantity";
import { WishlistButton } from "@/components/product-card/wishlist-button";
import { coverThen } from "@/components/animations/page-transition";
import { cart } from "@/lib/store/cart";
import { findVariant, isSizeAvailable, primaryImage } from "@/lib/product";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  product: Product;
  color: string;
  onColorChange: (c: string) => void;
  compact?: boolean;
  /** Exposes the add-to-bag button for the mobile sticky bar observer. */
  buttonRef?: React.Ref<HTMLDivElement>;
  onAdded?: () => void;
}

export function PurchasePanel({ product: p, color, onColorChange, compact, buttonRef, onAdded }: Props) {
  const router = useRouter();
  const single = p.sizes.length === 1;
  const [size, setSize] = useState<string | undefined>(single ? p.sizes[0] : undefined);
  const [qty, setQty] = useState(1);
  const [state, setState] = useState<"idle" | "loading" | "added">("idle");
  const [error, setError] = useState("");
  const colorName = p.colors.find((c) => c.id === color)?.name;
  const variant = useMemo(() => (size ? findVariant(p, color, size) : undefined), [p, color, size]);
  const soldOut = size ? !variant?.available : false;

  const add = async (thenCheckout = false) => {
    if (!size) { setError(`Please select a ${p.sizeLabel?.toLowerCase() === "eu" ? "size" : (p.sizeLabel ?? "size").toLowerCase()}.`); return; }
    if (!variant || !variant.available) return;
    setError("");
    setState("loading");
    // Simulated network latency — replace with your commerce API call.
    await new Promise((r) => setTimeout(r, 650));
    cart.add(
      {
        id: variant.id, productId: p.id, slug: p.slug, name: p.name, brand: p.brand,
        image: primaryImage(p, color)?.src ?? "", color, colorName, size: single ? undefined : size,
        price: variant.price, currency: p.currency,
      },
      qty,
      { open: !thenCheckout },
    );
    setState("added");
    onAdded?.();
    if (thenCheckout) coverThen(() => router.push("/checkout"));
    setTimeout(() => setState("idle"), 1800);
  };

  return (
    <div className="flex flex-col gap-7">
      {/* Colour */}
      <fieldset>
        <legend className="mb-3 flex w-full items-baseline justify-between">
          <span className="label">Colour</span>
          <span className="text-[13px] text-graphite">{colorName}</span>
        </legend>
        <div className="flex flex-wrap gap-2.5">
          {p.colors.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onColorChange(c.id)}
              aria-pressed={c.id === color}
              aria-label={c.name}
              title={c.name}
              className={cn("relative grid size-10 place-items-center rounded-full transition-[box-shadow] duration-300", c.id === color ? "shadow-[0_0_0_1px_var(--color-ink)]" : "shadow-[0_0_0_1px_transparent] hover:shadow-[0_0_0_1px_var(--color-line)]")}
            >
              <span className="size-7 rounded-full ring-1 ring-ink/10" style={{ background: c.hex }} />
            </button>
          ))}
        </div>
      </fieldset>

      {/* Size */}
      {!single && (
        <fieldset>
          <legend className="mb-3 flex w-full items-baseline justify-between">
            <span className="label">{p.sizeLabel === "EU" ? "Size — EU" : p.sizeLabel ?? "Size"}</span>
            {p.category === "shoes" && <span className="link-u text-[12px] text-graphite">Size guide</span>}
          </legend>
          <div className={cn("grid gap-2", p.sizes.length > 4 ? "grid-cols-4 sm:grid-cols-7" : "grid-cols-2")}>
            {p.sizes.map((s) => {
              const available = isSizeAvailable(p, color, s);
              return (
                <button
                  key={s}
                  type="button"
                  disabled={!available}
                  aria-pressed={s === size}
                  onClick={() => { setSize(s); setError(""); }}
                  className={cn(
                    "relative h-11 border text-[13px] tabular-nums transition-colors duration-300",
                    s === size ? "border-ink bg-ink text-ivory" : "border-line text-ink hover:border-ink",
                    !available && "cursor-not-allowed text-mist line-through decoration-mist/60 hover:border-line",
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
          <p role="alert" className={cn("mt-2 text-[12px] text-[#8a3b2e] transition-opacity", error ? "opacity-100" : "opacity-0")}>{error || " "}</p>
        </fieldset>
      )}

      {/* Quantity + actions */}
      <div ref={buttonRef} className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3">
          {!compact && <Quantity value={qty} onChange={setQty} max={Math.min(10, variant?.stock ?? 10)} />}
          <Button className="min-w-[10.5rem] flex-1" onClick={() => add(false)} loading={state === "loading"} success={state === "added"} disabled={soldOut}>
            {soldOut ? "Sold out" : "Add to bag"}
          </Button>
          <div className="grid size-[52px] shrink-0 place-items-center border border-line">
            <WishlistButton productId={p.id} name={p.name} size={20} />
          </div>
        </div>
        {!compact && (
          <Button variant="outline" onClick={() => add(true)} disabled={soldOut || state === "loading"}>
            Buy now
          </Button>
        )}
        {variant?.available && variant.stock != null && variant.stock <= 4 && (
          <p className="text-[12px] text-champagne-deep">Only {variant.stock} left in this size.</p>
        )}
      </div>
    </div>
  );
}
