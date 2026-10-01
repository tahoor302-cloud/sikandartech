"use client";
import { useState } from "react";
import { Link } from "@/components/ui/link";
import { Media } from "@/components/ui/media";
import { Button } from "@/components/ui/button";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import { CheckIcon } from "@/components/ui/icons";
import { cart, cartSubtotal, useCart } from "@/lib/store/cart";
import { site } from "@/data/site";
import { cn, formatPrice } from "@/lib/utils";

const CITIES = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Sialkot", "Hyderabad", "Other"];

/**
 * Demo checkout. `placeOrder` is where your payment / order API goes
 * (e.g. Stripe, PayFast, Safepay or a Shopify checkout redirect).
 */
export function CheckoutView() {
  const lines = useCart((s) => s.lines);
  const subtotal = useCart(cartSubtotal);
  const [payment, setPayment] = useState<"cod" | "card">("cod");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [order, setOrder] = useState("");
  const shipping = subtotal >= site.freeShippingThreshold ? 0 : site.flatShippingRate;

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setOrder(`SM-${Math.floor(100000 + Math.random() * 900000)}`);
    cart.clear();
    setState("done");
  };

  if (state === "done") {
    return (
      <div className="shell flex min-h-[80vh] flex-col items-center justify-center gap-6 pb-24 pt-40 text-center">
        <span className="grid size-16 place-items-center rounded-full border border-champagne text-champagne-deep"><CheckIcon width={26} height={26} /></span>
        <p className="eyebrow text-champagne-deep">Order {order}</p>
        <MaskText as="h1" text="Thank you." immediate className="display text-display-lg" />
        <p className="prose-lux max-w-[44ch]">Your order has been received. A confirmation with delivery details will follow shortly. (Demo checkout — no payment was taken.)</p>
        <Link href="/" className="btn btn-primary mt-4">Return home</Link>
      </div>
    );
  }

  return (
    <div className="shell pb-[var(--spacing-section)] pt-32 md:pt-40">
      <Reveal variant="fade"><p className="eyebrow text-champagne-deep">Secure checkout</p></Reveal>
      <MaskText as="h1" text="Checkout" immediate delay={0.1} className="display mt-5 text-display-lg" />
      {lines.length === 0 ? (
        <div className="mt-12 flex flex-col items-start gap-6"><p className="prose-lux">Your bag is empty.</p><Link href="/collections/all" className="btn btn-primary">Shop the collection</Link></div>
      ) : (
        <form onSubmit={placeOrder} className="mt-14 grid gap-14 lg:grid-cols-[1fr_440px] lg:gap-20">
          <Reveal className="flex flex-col gap-12">
            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="label mb-5">01 — Contact</legend>
              <input required className="field sm:col-span-2" type="email" placeholder="Email" autoComplete="email" />
              <input required className="field sm:col-span-2" type="tel" placeholder="Phone (e.g. 03xx xxxxxxx)" autoComplete="tel" />
            </fieldset>
            <fieldset className="grid gap-4 sm:grid-cols-2">
              <legend className="label mb-5">02 — Delivery</legend>
              <input required className="field" placeholder="First name" autoComplete="given-name" />
              <input required className="field" placeholder="Last name" autoComplete="family-name" />
              <input required className="field sm:col-span-2" placeholder="Address" autoComplete="street-address" />
              <select required className="field" defaultValue="">
                <option value="" disabled>City</option>
                {CITIES.map((c) => <option key={c}>{c}</option>)}
              </select>
              <input className="field" placeholder="Postal code" autoComplete="postal-code" />
            </fieldset>
            <fieldset>
              <legend className="label mb-5">03 — Payment</legend>
              <div className="grid gap-3">
                {([["cod", "Cash on delivery", "Pay when your order arrives."], ["card", "Card payment", "Connect a payment provider to enable."]] as const).map(([v, t, d]) => (
                  <label key={v} className={cn("flex cursor-pointer items-start gap-4 border p-5 transition-colors", payment === v ? "border-ink" : "border-line hover:border-ink/40")}>
                    <input type="radio" name="payment" value={v} checked={payment === v} onChange={() => setPayment(v)} className="mt-1 accent-ink" />
                    <span><span className="block text-[14px] font-medium">{t}</span><span className="text-[13px] text-graphite">{d}</span></span>
                  </label>
                ))}
              </div>
            </fieldset>
          </Reveal>
          <Reveal delay={0.15} as="aside" className="h-fit bg-ivory-2 p-7 md:p-9 lg:sticky lg:top-28">
            <p className="label">Your order</p>
            <ul className="mt-6 flex flex-col gap-4">
              {lines.map((l) => (
                <li key={l.id} className="flex items-center gap-4">
                  <div className="relative aspect-[4/5] w-14 shrink-0 overflow-hidden bg-ivory">
                    <Media src={l.image} alt="" fill sizes="56px" className="object-cover" />
                    <span className="absolute -right-0 -top-0 grid size-5 place-items-center bg-ink text-[10px] text-ivory">{l.quantity}</span>
                  </div>
                  <div className="min-w-0 flex-1"><p className="line-clamp-2 text-[13px] font-medium leading-snug">{l.name}</p><p className="text-[12px] text-graphite">{[l.colorName, l.size].filter(Boolean).join(" · ")}</p></div>
                  {site.showPrices && <p className="text-[13px] tabular-nums">{formatPrice(l.price * l.quantity)}</p>}
                </li>
              ))}
            </ul>
            {site.showPrices ? (
            <dl className="mt-7 flex flex-col gap-3 border-t border-line pt-6 text-[14px]">
              <div className="flex justify-between"><dt className="text-graphite">Subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-graphite">Delivery</dt><dd className="tabular-nums">{shipping ? formatPrice(shipping) : "Complimentary"}</dd></div>
              <div className="flex justify-between text-[16px]"><dt>Total</dt><dd className="tabular-nums">{formatPrice(subtotal + shipping)}</dd></div>
            </dl>
            ) : <p className="mt-7 border-t border-line pt-6 text-[14px] text-graphite">Our concierge confirms pricing and delivery with you after you place your request.</p>}
            <Button type="submit" className="mt-8 w-full" loading={state === "loading"}>Place order</Button>
            <p className="mt-4 text-center text-[11.5px] text-mist">Demo checkout — connect your payment and order APIs in checkout-view.tsx.</p>
          </Reveal>
        </form>
      )}
    </div>
  );
}
