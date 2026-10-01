"use client";
import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Accordion({ title, children, defaultOpen = false }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <div className="border-b border-line">
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} className="group flex w-full items-center justify-between py-5 text-left">
        <span className="label text-ink">{title}</span>
        <span className="relative size-3" aria-hidden>
          <span className="absolute left-0 top-1/2 h-px w-3 bg-ink" />
          <span className={cn("absolute left-1/2 top-0 h-3 w-px bg-ink transition-transform duration-500 ease-luxe", open && "rotate-90 scale-y-0")} />
        </span>
      </button>
      <div id={id} role="region" className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-luxe", open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
        <div className="overflow-hidden">
          <div className="pb-6 text-[14px] leading-relaxed text-graphite">{children}</div>
        </div>
      </div>
    </div>
  );
}
