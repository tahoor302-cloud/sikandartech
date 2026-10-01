"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@/components/ui/link";
import { Accordion } from "@/components/ui/accordion";
import { Price } from "@/components/ui/price";
import { Reveal } from "@/components/animations/reveal";
import { MaskText } from "@/components/animations/mask-text";
import { ProductGallery } from "@/components/product-gallery/product-gallery";
import { ProductGrid } from "./product-grid";
import { PurchasePanel } from "./purchase-panel";
import { SectionHeading } from "@/components/ui/section-heading";
import { Media } from "@/components/ui/media";
import { TruckIcon, ReturnIcon, ShieldIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { galleryFor, categoryLabel, primaryImage } from "@/lib/product";
import { nameOfSubcategory } from "@/lib/taxonomy";
import type { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

/** Product detail page: gallery left, sticky purchase panel right. */
export function ProductView({ product: p, related }: { product: Product; related: Product[] }) {
  const [color, setColor] = useState(p.colors[0]?.id ?? "");
  const images = useMemo(() => galleryFor(p, color), [p, color]);
  const buyRef = useRef<HTMLDivElement>(null);
  const [showBar, setShowBar] = useState(false);

  // Mobile sticky add-to-bag appears once the main button scrolls away
  useEffect(() => {
    const el = buyRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div className="shell pt-24 md:pt-32">
        <Reveal variant="fade" as="nav" aria-label="Breadcrumb" className="eyebrow mb-6 flex flex-wrap gap-2 text-[9.5px] text-mist md:mb-10">
          <Link href="/" className="hover:text-ink">Home</Link><span>/</span>
          <Link href="/products" className="hover:text-ink">Shop</Link><span>/</span>
          <Link href={`/category/${p.category}`} className="hover:text-ink">{categoryLabel[p.category] ?? p.category}</Link><span>/</span>
          {p.subcategory && <><Link href={`/category/${p.category}/${p.subcategory}`} className="hover:text-ink">{nameOfSubcategory(p.subcategory)}</Link><span>/</span></>}
          <span className="text-ink">{p.name}</span>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.25fr_1fr] md:gap-10 lg:gap-20">
          <div className="-mx-[var(--spacing-gutter)] md:mx-0">
            <ProductGallery images={images} name={p.name} />
          </div>

          <aside className="md:relative">
            <div className="md:sticky md:top-28">
              <Reveal variant="fade" className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2"><p className="eyebrow text-champagne-deep">{p.brand}</p><p className="eyebrow whitespace-nowrap text-[9.5px] text-mist" title={`Source record ${p.sourceId}`}>Ref. {p.id}</p></Reveal>
              <MaskText as="h1" text={p.name} immediate delay={0.15} className="display mt-4 text-[clamp(2.4rem,4vw,3.8rem)] leading-[1]" />
              <Reveal delay={0.25} className="mt-5 flex items-center justify-between">
                <Price amount={p.price} compareAt={p.compareAtPrice} currency={p.currency} className="text-[17px]" />
                {p.newArrival && <span className="eyebrow border border-champagne/60 px-2 py-1 text-[9px] text-champagne-deep">New season</span>}
              </Reveal>
              <Reveal delay={0.3}><p className="prose-lux mt-6">{p.shortDescription}</p></Reveal>

              <Reveal delay={0.35} className="mt-9">
                <PurchasePanel product={p} color={color} onColorChange={setColor} buttonRef={buyRef} />
              </Reveal>

              <Reveal delay={0.4} className="mt-9 grid grid-cols-3 gap-3 border-y border-line py-5 text-[11.5px] leading-snug text-graphite">
                <div className="flex flex-col gap-2"><TruckIcon className="text-champagne-deep" /> {site.showPrices ? <>Complimentary delivery over {formatPrice(site.freeShippingThreshold)}</> : "Complimentary delivery"}</div>
                <div className="flex flex-col gap-2"><ReturnIcon className="text-champagne-deep" /> 14-day returns & exchanges</div>
                <div className="flex flex-col gap-2"><ShieldIcon className="text-champagne-deep" /> Secure checkout &amp; concierge support</div>
              </Reveal>

              <div className="mt-4">
                <Accordion title="Description" defaultOpen>
                  <p>{p.description}</p>
                  <ul className="mt-4 flex flex-col gap-1.5">{p.details.map((d) => <li key={d} className="flex gap-3"><span className="mt-2.5 h-px w-3 shrink-0 bg-champagne" />{d}</li>)}</ul>
                </Accordion>
                <Accordion title="Specifications">
                  <dl className="divide-y divide-line">
                    <div className="grid grid-cols-[130px_1fr] gap-4 py-2.5"><dt className="text-mist">Reference</dt><dd className="text-ink tabular-nums">{p.id}</dd></div>
                    {p.productType && <div className="grid grid-cols-[130px_1fr] gap-4 py-2.5"><dt className="text-mist">Type</dt><dd className="text-ink">{p.productType}</dd></div>}
                    {Object.entries(p.specifications).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[130px_1fr] gap-4 py-2.5"><dt className="text-mist">{k}</dt><dd className="text-ink">{v}</dd></div>
                    ))}
                  </dl>
                </Accordion>
                {(p.materials || p.care.length > 0) && (
                <Accordion title="Materials & care">
                  {p.materials && <p className="text-ink">{p.materials}</p>}
                  <ul className="mt-3 flex flex-col gap-1.5">{p.care.map((c) => <li key={c}>{c}</li>)}</ul>
                </Accordion>
                )}
                <Accordion title="Shipping & returns">
                  <p>{site.shippingNote}</p>
                  <p className="mt-2">{site.dispatchNote}</p>
                  <p className="mt-2">{site.returnsNote} <Link href="/info/returns" className="link-u text-ink">Read the policy</Link></p>
                </Accordion>
              </div>
              <p className="eyebrow mt-6 text-[9px] text-mist">Ref. {p.variants[0]?.sku.split("-")[0]}</p>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="shell py-[var(--spacing-section)]">
          <SectionHeading eyebrow="Complete the edit" title="You may also like" />
          <ProductGrid products={related} className="mt-14" />
        </section>
      )}

      {/* Mobile sticky purchase bar */}
      <div className={cn("fixed inset-x-0 bottom-0 z-[90] border-t border-line bg-ivory/90 px-4 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-[translate] duration-500 ease-luxe md:hidden", showBar ? "translate-y-0" : "translate-y-full")}>
        <div className="flex items-center gap-3">
          <div className="relative aspect-[4/5] w-10 shrink-0 overflow-hidden bg-ivory-2">
            <Media src={primaryImage(p, color)?.src ?? ""} alt="" fill sizes="40px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-medium">{p.name}</p>
            {site.showPrices && <p className="text-[12px] text-graphite">{formatPrice(p.price, p.currency)}</p>}
          </div>
          <button onClick={() => buyRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })} className="btn btn-primary h-11 px-5">Select</button>
        </div>
      </div>
    </>
  );
}
