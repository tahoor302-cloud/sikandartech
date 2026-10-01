import { site } from "@/data/site";
import { formatPrice } from "@/lib/utils";
import type { CurrencyCode } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Price({ amount, compareAt, currency = "USD", className }: { amount: number; compareAt?: number; currency?: CurrencyCode; className?: string }) {
  if (!site.showPrices) return null;
  return (
    <span className={cn("inline-flex items-baseline gap-2 tabular-nums", className)}>
      <span>{formatPrice(amount, currency)}</span>
      {compareAt && compareAt > amount ? <s className="text-mist">{formatPrice(compareAt, currency)}</s> : null}
    </span>
  );
}
