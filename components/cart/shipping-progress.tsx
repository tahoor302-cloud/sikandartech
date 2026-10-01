import { site } from "@/data/site";
import { formatPrice } from "@/lib/utils";

export function ShippingProgress({ subtotal }: { subtotal: number }) {
  const t = site.freeShippingThreshold;
  const pct = Math.min(1, subtotal / t);
  const left = Math.max(0, t - subtotal);
  return (
    <div>
      <p className="text-[12px] text-graphite">
        {left > 0 ? <>You are <span className="font-semibold text-ink">{formatPrice(left)}</span> away from complimentary delivery.</> : "Your order qualifies for complimentary delivery."}
      </p>
      <div className="mt-2.5 h-px w-full bg-line">
        <div className="h-px origin-left bg-champagne transition-transform duration-700 ease-luxe" style={{ transform: `scaleX(${pct})` }} />
      </div>
    </div>
  );
}
