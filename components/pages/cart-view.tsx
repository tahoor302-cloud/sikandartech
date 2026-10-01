"use client";
import { Link } from "@/components/ui/link";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import { CartLineItem } from "@/components/cart/cart-line";
import { ShippingProgress } from "@/components/cart/shipping-progress";
import { ArrowRight } from "@/components/ui/icons";
import { cartCount, cartSubtotal, useCart } from "@/lib/store/cart";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/utils";

export function CartView() {
  const lines = useCart((s) => s.lines);
  const count = useCart(cartCount);
  const subtotal = useCart(cartSubtotal);
  const shipping = subtotal >= site.freeShippingThreshold || subtotal === 0 ? 0 : site.flatShippingRate;
  return (
    <div className="shell pb-[var(--spacing-section)] pt-32 md:pt-40">
      <Reveal variant="fade"><p className="eyebrow text-champagne-deep">Shopping bag — {count} {count === 1 ? "item" : "items"}</p></Reveal>
      <MaskText as="h1" text="Your bag" immediate delay={0.1} className="display mt-5 text-display-lg" />
      {lines.length === 0 ? (
        <Reveal className="mt-16 flex flex-col items-start gap-6">
          <p className="prose-lux max-w-[40ch]">Your bag is empty. Begin with the pieces from our newest drop.</p>
          <Link href="/collections/new-arrivals" className="btn btn-primary">Explore new arrivals <ArrowRight width={14} height={14} /></Link>
        </Reveal>
      ) : (
        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_420px] lg:gap-20">
          <Reveal>
            <ul className="divide-y divide-line border-y border-line">{lines.map((l) => <CartLineItem key={l.id} line={l} large />)}</ul>
            <Link href="/collections/all" className="label link-u mt-8 inline-flex text-[10.5px]">Continue shopping</Link>
          </Reveal>
          <Reveal delay={0.15} as="aside" className="h-fit bg-ivory-2 p-7 lg:sticky lg:top-28 md:p-9">
            <p className="label">Order summary</p>
            {site.showPrices && <div className="mt-6"><ShippingProgress subtotal={subtotal} /></div>}
            {site.showPrices ? (
            <dl className="mt-7 flex flex-col gap-3 text-[14px]">
              <div className="flex justify-between"><dt className="text-graphite">Subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-graphite">Delivery</dt><dd className="tabular-nums">{shipping ? formatPrice(shipping) : "Complimentary"}</dd></div>
              <div className="hairline my-2" />
              <div className="flex justify-between text-[16px]"><dt>Total</dt><dd className="tabular-nums">{formatPrice(subtotal + shipping)}</dd></div>
            </dl>
            ) : <p className="mt-6 text-[14px] text-graphite">Our concierge confirms pricing and delivery with you after you place your request.</p>}
            <Link href="/checkout" className="btn btn-primary mt-8 w-full">Checkout <ArrowRight width={14} height={14} /></Link>
            <p className="mt-4 text-center text-[12px] text-mist">Taxes included where applicable.</p>
          </Reveal>
        </div>
      )}
    </div>
  );
}
