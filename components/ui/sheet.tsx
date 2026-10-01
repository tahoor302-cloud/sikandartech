"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLockScroll } from "@/hooks/use-lock-scroll";
import { useEscape } from "@/hooks/use-escape";

/**
 * Accessible overlay panel. `side="right"` is a drawer on desktop that becomes a
 * bottom sheet on mobile; `side="bottom"` is always a sheet; `side="center"` is a modal.
 * Transform/opacity-only transitions.
 */
export function Sheet({ open, onClose, side = "right", label, children, className }: { open: boolean; onClose: () => void; side?: "right" | "bottom" | "center" | "left"; label: string; children: ReactNode; className?: string }) {
  const panel = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  useLockScroll(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement;
      const t = setTimeout(() => panel.current?.focus(), 60);
      return () => clearTimeout(t);
    }
    lastFocus.current?.focus?.();
  }, [open]);

  const pos = {
    right: "inset-x-0 bottom-0 max-h-[88dvh] rounded-t-[14px] md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[460px] md:rounded-none",
    left: "inset-y-0 left-0 w-[min(420px,92vw)]",
    bottom: "inset-x-0 bottom-0 max-h-[88dvh] rounded-t-[14px]",
    center: "left-1/2 top-1/2 w-[min(1080px,94vw)] max-h-[90dvh]",
  }[side];
  const hidden = {
    right: "translate-y-full md:translate-y-0 md:translate-x-full",
    left: "-translate-x-full",
    bottom: "translate-y-full",
    center: "opacity-0",
  }[side];
  const shown = side === "center" ? "opacity-100" : "translate-x-0 translate-y-0";

  return (
    <div className={cn("fixed inset-0 z-[120]", open ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!open}>
      <div onClick={onClose} className={cn("absolute inset-0 bg-ink/40 backdrop-blur-[2px] transition-opacity duration-500 ease-luxe", open ? "opacity-100" : "opacity-0")} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        data-lenis-prevent
        className={cn(
          "absolute flex flex-col overflow-hidden bg-ivory shadow-[0_30px_80px_-20px_rgba(15,14,13,.35)] outline-none transition-[translate,transform,opacity,visibility] duration-[650ms] ease-luxe",
          pos,
          open ? shown : [hidden, "invisible"].join(" "),
          className,
        )}
        style={side === "center" ? { transform: `translate(-50%, -50%) scale(${open ? 1 : 0.98})` } : undefined}
      >
        {(side === "right" || side === "bottom") && <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-ink/15 md:hidden" aria-hidden />}
        {children}
      </div>
    </div>
  );
}
