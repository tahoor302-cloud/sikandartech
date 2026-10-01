"use client";
import { site } from "@/data/site";
import { useEffect, useRef, useState } from "react";
import { SORT_OPTIONS } from "@/lib/filters";
import type { SortKey } from "@/lib/types";
import { ChevronDown, CheckIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const options = SORT_OPTIONS.filter((o) => site.showPrices || !o.value.startsWith("price"));
  const label = options.find((o) => o.value === value)?.label;
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-haspopup="listbox" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="label flex h-10 items-center gap-2 text-[10.5px]">
        <span className="hidden text-mist sm:inline">Sort:</span> {label}
        <ChevronDown width={14} height={14} className={cn("transition-transform duration-300", open && "rotate-180")} />
      </button>
      <ul role="listbox" className={cn("absolute right-0 top-full z-30 mt-1 w-60 border border-line bg-ivory py-2 shadow-[0_20px_50px_-20px_rgba(15,14,13,.3)] transition-[opacity,translate] duration-300 ease-luxe", open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0")}>
        {options.map((o) => (
          <li key={o.value} role="option" aria-selected={o.value === value}>
            <button type="button" onClick={() => { onChange(o.value); setOpen(false); }} className="flex w-full items-center justify-between px-4 py-2.5 text-left text-[13px] hover:bg-ivory-2">
              {o.label}
              {o.value === value && <CheckIcon width={14} height={14} />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
