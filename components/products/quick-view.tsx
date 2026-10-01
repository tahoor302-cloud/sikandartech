"use client";
import { useEffect, useState } from "react";
import { clientCatalog } from "@/lib/catalog/client";
import { Sheet } from "@/components/ui/sheet";
import { Media } from "@/components/ui/media";
import { Price } from "@/components/ui/price";
import { Link } from "@/components/ui/link";
import { CloseIcon, ArrowRight } from "@/components/ui/icons";
import { PurchasePanel } from "./purchase-panel";
import { useUI, ui } from "@/lib/store/ui";
import { galleryFor, categoryLabel } from "@/lib/product";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Product quick view — fetches the product on demand from the catalog API. */
export function QuickView() {
  const slug = useUI((s) => s.quickView);
  const [loaded, setLoaded] = useState<Product | null>(null);
  useEffect(() => {
    if (!slug) return;
    let alive = true;
    clientCatalog.getProduct(slug).then((p) => alive && setLoaded(p));
    return () => { alive = false; };
  }, [slug]);
  const product = slug && loaded?.id === slug ? loaded : null;
  const p = product ?? (slug ? null : loaded);
  const [color, setColor] = useState<string>("");
  const [active, setActive] = useState(0);
  useEffect(() => { if (product) { setColor(product.colors[0]?.id ?? ""); setActive(0); } }, [product]);
  const images = p ? galleryFor(p, color || p.colors[0]?.id) : [];

  return (
    <Sheet open={!!slug} onClose={ui.closeQuickView} side="center" label={p ? `Quick view — ${p.name}` : "Quick view"}>
      {!p && (
        <div className="grid md:grid-cols-[1.1fr_1fr]"><div className="skeleton aspect-[4/5]" /><div className="flex flex-col gap-4 p-10"><div className="skeleton h-3 w-1/3" /><div className="skeleton h-10 w-2/3" /><div className="skeleton h-4 w-1/4" /></div></div>
      )}
      {p && (
        <div className="grid max-h-[90dvh] overflow-y-auto md:grid-cols-[1.1fr_1fr]" data-lenis-prevent>
          <div className="relative bg-ivory-2">
            <div className="relative aspect-[4/5]">
              {images.map((img, i) => (
                <Media key={img.src} src={img.src} alt={img.alt} fill sizes="(min-width:768px) 50vw, 100vw" className={cn("object-cover transition-opacity duration-700 ease-luxe", i === active ? "!opacity-100" : "!opacity-0")} />
              ))}
            </div>
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
              {images.map((img, i) => (
                <button key={img.src} aria-label={`Image ${i + 1}`} onClick={() => setActive(i)} className="p-1.5">
                  <span className={cn("block h-px w-6 transition-colors", i === active ? "bg-ink" : "bg-ink/25")} />
                </button>
              ))}
            </div>
          </div>
          <div className="relative flex flex-col gap-6 p-6 md:p-10">
            <button onClick={ui.closeQuickView} aria-label="Close" className="absolute right-4 top-4 grid size-10 place-items-center transition-transform duration-500 ease-luxe hover:rotate-90">
              <CloseIcon />
            </button>
            <div>
              <p className="eyebrow text-mist">{categoryLabel[p.category]} — {p.brand}</p>
              <h2 className="display mt-3 text-[40px]">{p.name}</h2>
              <Price amount={p.price} currency={p.currency} className="mt-3 text-[15px] text-graphite" />
              <p className="prose-lux mt-4">{p.shortDescription}</p>
            </div>
            <PurchasePanel product={p} color={color || p.colors[0]?.id} onColorChange={(c) => { setColor(c); setActive(0); }} compact onAdded={() => setTimeout(ui.closeQuickView, 900)} />
            <Link href={`/product/${p.id}`} onClick={ui.closeQuickView} className="label link-u inline-flex items-center gap-2 self-start text-ink">
              Full details <ArrowRight width={14} height={14} />
            </Link>
          </div>
        </div>
      )}
    </Sheet>
  );
}
