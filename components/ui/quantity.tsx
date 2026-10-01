"use client";
import { MinusIcon, PlusIcon } from "./icons";
import { cn } from "@/lib/utils";

export function Quantity({ value, onChange, min = 1, max = 10, size = "md" }: { value: number; onChange: (v: number) => void; min?: number; max?: number; size?: "sm" | "md" }) {
  const h = size === "sm" ? "h-9" : "h-[52px]";
  return (
    <div className={cn("inline-flex items-center border border-line", h)}>
      <button type="button" aria-label="Decrease quantity" disabled={value <= min} onClick={() => onChange(value - 1)} className="grid h-full w-10 place-items-center text-ink transition-opacity disabled:opacity-30">
        <MinusIcon width={14} height={14} />
      </button>
      <span className="w-8 text-center text-[13px] tabular-nums" aria-live="polite">{value}</span>
      <button type="button" aria-label="Increase quantity" disabled={value >= max} onClick={() => onChange(value + 1)} className="grid h-full w-10 place-items-center text-ink transition-opacity disabled:opacity-30">
        <PlusIcon width={14} height={14} />
      </button>
    </div>
  );
}
