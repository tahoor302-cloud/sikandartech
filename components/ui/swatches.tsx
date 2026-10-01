import type { ProductColor } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SwatchDots({ colors, max = 4, className }: { colors: ProductColor[]; max?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {colors.slice(0, max).map((c) => (
        <span key={c.id} title={c.name} className="size-2.5 rounded-full ring-1 ring-ink/15 ring-offset-1 ring-offset-ivory" style={{ background: c.hex }} />
      ))}
      {colors.length > max && <span className="text-[11px] text-mist">+{colors.length - max}</span>}
    </span>
  );
}
