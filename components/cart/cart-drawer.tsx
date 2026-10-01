"use client";
import { site } from "@/data/site";
import { Sheet } from "@/components/ui/sheet";
import { Link } from "@/components/ui/link";
import { CloseIcon, ArrowRight } from "@/components/ui/icons";
import { CartLineItem } from "./cart-line";
import { ShippingProgress } from "./shipping-progress";
import { cart, cartCount, cartSubtotal, useCart } from "@/lib/store/cart";
import { formatPrice } from "@/lib/utils";

/** Slide-in bag: right drawer on desktop, bottom sheet on mobile. */
export function CartDrawer() {
  const open = useCart((s) => s.open);
  const lines = useCart((s) => s.lines);
  const count = useCart(cartCount);
  const subtotal = useCart(cartSubtotal);

  return (
    <Sheet open={open} onClose={cart.close} side="right" label="Shopping bag">
      <div className="flex items-center justify-between px-6 pb-4 pt-4 md:pt-7">
        <p className="label">Bag <span className="text-mist">({count})</span></p>
        <button type="button" onClick={cart.close} aria-label="Close bag" className="-mr-2 grid size-10 place-items-center transition-transform duration-500 ease-luxe hover:rotate-90"><CloseIcon /></button>
      </div>
      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 pb-16 pt-8 text-center">
          <p className="font-display text-[34px] font-light leading-tight">Your bag is empty.</p>
          <p className="max-w-[28ch] text-[14px] text-graphite">Discover the newest objects from the Super Mimic atelier.</p>
          <Link href="/collections/new-arrivals" onClick={cart.close} className="btn btn-primary">Explore new arrivals</Link>
        </div>
      ) : (
        <>
          {site.showPrices && <div className="px-6 pb-4"><ShippingProgress subtotal={subtotal} /></div>}
          <ul className="flex-1 divide-y divide-line overflow-y-auto border-t border-line px-6" data-lenis-prevent>
            {lines.map((l) => <CartLineItem key={l.id} line={l} onNavigate={cart.close} />)}
          </ul>
          <div className="border-t border-line bg-ivory-2/60 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
            {site.showPrices ? (
              <>
                <div className="flex items-baseline justify-between">
                  <span className="label">Subtotal</span>
                  <span className="text-[15px] tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-1 text-[12px] text-mist">Shipping and taxes calculated at checkout.</p>
              </>
            ) : <p className="text-[12px] text-mist">Our concierge confirms pricing and delivery with you after you place your request.</p>}
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link href="/cart" onClick={cart.close} className="btn btn-outline">View bag</Link>
              <Link href="/checkout" onClick={cart.close} className="btn btn-primary">Checkout <ArrowRight width={14} height={14} /></Link>
            </div>
          </div>
        </>
      )}
    </Sheet>
  );
}
