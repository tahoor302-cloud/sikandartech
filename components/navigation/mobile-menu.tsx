"use client";
import { Link } from "@/components/ui/link";
import { Wordmark } from "@/components/ui/logo";
import { CloseIcon, SearchIcon, ArrowUpRight } from "@/components/ui/icons";
import { site } from "@/data/site";
import { ui, useUI } from "@/lib/store/ui";
import { useLockScroll } from "@/hooks/use-lock-scroll";
import { useEscape } from "@/hooks/use-escape";
import type { Category, Collection } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Full-screen editorial menu for mobile & tablet. */
export function MobileMenu({ categories, collections }: { categories: Category[]; collections: Collection[] }) {
  const open = useUI((s) => s.menuOpen);
  useLockScroll(open);
  useEscape(open, ui.closeMenu);
  const primary = [
    { label: "New Arrivals", href: "/collections/new-arrivals" },
    { label: "Featured", href: "/collections/featured" },
    { label: "All Products", href: "/collections/all" },
    { label: "About", href: "/about" },
  ];
  return (
    <div
      className={cn("fixed inset-0 z-[110] flex flex-col bg-pearl text-ink transition-[clip-path,visibility] duration-[800ms] ease-luxe", open ? "visible pointer-events-auto [clip-path:inset(0_0_0_0)]" : "invisible pointer-events-none [clip-path:inset(0_0_100%_0)]")}
      aria-hidden={!open}
      role="dialog"
      aria-label="Menu"
      data-lenis-prevent
    >
      <div className="flex h-[68px] shrink-0 items-center justify-between px-4 sm:px-6 lg:px-8">
        <button onClick={ui.closeMenu} aria-label="Close menu" className="-ml-2 grid size-10 place-items-center"><CloseIcon /></button>
        <Link href="/" onClick={ui.closeMenu} aria-label="Supermimic — home"><Wordmark /></Link>
        <button onClick={ui.openSearch} aria-label="Search" className="-mr-2 grid size-10 place-items-center"><SearchIcon /></button>
      </div>
      <div className="mx-auto w-full max-w-[1200px] flex-1 overflow-y-auto px-6 pb-10 pt-8 lg:px-8">
        <ul className="flex flex-col gap-1">
          {primary.map((l, i) => (
            <li key={l.href} className={cn("overflow-hidden")}>
              <Link href={l.href} onClick={ui.closeMenu} className={cn("block py-1 font-display text-[clamp(2.25rem,5vw,3.75rem)] font-light leading-[1.1] transition-[translate,opacity] duration-700 ease-luxe", open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0")} style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="hairline my-9" />
        <div className={cn("grid grid-cols-2 gap-8 transition-opacity duration-700", open ? "opacity-100 delay-500" : "opacity-0")}>
          <div>
            <p className="eyebrow mb-4 text-champagne-deep">Categories</p>
            <ul className="flex flex-col gap-2.5 text-[15px] text-graphite">
              {categories.map((c) => <li key={c.id}><Link href={`/category/${c.slug}`} onClick={ui.closeMenu}>{c.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 text-champagne-deep">Collections</p>
            <ul className="flex flex-col gap-2.5 text-[15px] text-graphite">
              {collections.filter((c) => c.rule.type === "collection").map((c) => <li key={c.id}><Link href={`/collections/${c.slug}`} onClick={ui.closeMenu}>{c.name}</Link></li>)}
            </ul>
          </div>
        </div>
      </div>
      <div className={cn("flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line px-6 py-5 lg:px-8 text-[12px] transition-opacity duration-700", open ? "opacity-100 delay-500" : "opacity-0")}>
        <div className="flex gap-6">
          <Link href="/account" onClick={ui.closeMenu} className="label text-[10px]">Account</Link>
          <Link href="/wishlist" onClick={ui.closeMenu} className="label text-[10px]">Wishlist</Link>
        </div>
        <a href={site.social[0].href} target="_blank" rel="noreferrer" className="label inline-flex items-center gap-1 text-[10px] text-champagne-deep">Instagram <ArrowUpRight width={12} height={12} /></a>
      </div>
    </div>
  );
}
