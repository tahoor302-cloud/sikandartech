"use client";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/components/ui/link";
import { CloseIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { useEscape } from "@/hooks/use-escape";
import { cn } from "@/lib/utils";

/**
 * Floating concierge button (bottom-right). There is no live chat backend yet, so it opens a small
 * panel that says so plainly and points to the real contact route. It does not pretend to be a person.
 */
export function ChatButton() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  useEscape(open, () => setOpen(false));
  useEffect(() => { if (open) panel.current?.focus(); }, [open]);
  return (
    <div className="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-label="Contact"
        aria-hidden={!open}
        className={cn("w-[min(88vw,320px)] origin-bottom-right rounded-3xl border border-line bg-pearl/95 p-5 text-ink shadow-[0_24px_60px_-24px_rgba(27,26,24,.45)] backdrop-blur-xl transition-[opacity,transform,visibility] duration-500 ease-luxe focus:outline-none", open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0")}
      >
        <p className="eyebrow text-champagne-deep">Concierge</p>
        <p className="mt-2 text-[17px] font-light leading-snug">Questions about a piece, sizing or delivery?</p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-graphite">Live chat isn’t switched on yet. Write to us and we’ll reply by email.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={`mailto:${site.contactEmail}`} className="btn btn-primary h-10 px-5 text-[10.5px]">Email us</a>
          <Link href="/info/contact" onClick={() => setOpen(false)} className="btn btn-outline h-10 px-5 text-[10.5px]">Contact</Link>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close contact panel" : "Open contact panel"}
        aria-expanded={open}
        className="grid size-12 place-items-center rounded-full bg-ink text-pearl shadow-[0_12px_30px_-10px_rgba(27,26,24,.6)] transition-transform duration-500 ease-luxe hover:scale-105"
      >
        {open ? <CloseIcon width={18} height={18} /> : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M20 11.5a7.5 7.5 0 0 1-11 6.6L4 19.5l1.4-4.5A7.5 7.5 0 1 1 20 11.5Z" /><path d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01" strokeWidth="2" /></svg>
        )}
      </button>
    </div>
  );
}
