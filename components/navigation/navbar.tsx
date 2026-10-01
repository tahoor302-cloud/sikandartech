"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/components/ui/link";
import { Wordmark } from "@/components/ui/logo";
import { BagIcon, MenuIcon, SearchIcon } from "@/components/ui/icons";
import { MobileMenu } from "./mobile-menu";
import { heroScenes, HERO_TONE_EVENT } from "@/data/site";
import { cart, cartCount, useCart } from "@/lib/store/cart";
import { ui, useUI } from "@/lib/store/ui";
import { useLenis } from "@/components/animations/smooth-scroll";
import type { Category, Collection } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props { categories: Category[]; collections: Collection[] }

/**
 * Header from the campaign reel: menu + wordmark on the left, search and bag on the right.
 * Fully transparent over the home hero, then a frosted pearl bar once the page scrolls.
 * The menu is one full-screen panel at every width (no mega-menu). Hides on downward scroll.
 */
export function Navbar({ categories, collections }: Props) {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [heroTone, setHeroTone] = useState<"dark" | "light">(heroScenes[0]?.tone ?? "light");
  const count = useCart(cartCount);
  const pulse = useCart((s) => s.pulse);
  const menuOpen = useUI((s) => s.menuOpen);

  useEffect(() => {
    let last = 0;
    const onScroll = (y: number) => {
      setScrolled(y > 40);
      const delta = y - last;
      if (Math.abs(delta) > 6) setHidden(delta > 0 && y > 480);
      last = y;
    };
    if (lenis) {
      const h = ({ scroll }: { scroll: number }) => onScroll(scroll);
      lenis.on("scroll", h);
      onScroll(lenis.scroll);
      return () => lenis.off("scroll", h);
    }
    const h = () => onScroll(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, [lenis]);

  useEffect(() => {
    const h = (e: Event) => setHeroTone((e as CustomEvent<"dark" | "light">).detail);
    window.addEventListener(HERO_TONE_EVENT, h);
    return () => window.removeEventListener(HERO_TONE_EVENT, h);
  }, []);

  useEffect(() => { ui.closeMenu(); ui.closeSearch(); ui.closeQuickView(); cart.close(); }, [pathname]);
  // Lets sticky page toolbars sit under the bar only while it is visible.
  useEffect(() => { document.documentElement.dataset.nav = hidden && !menuOpen ? "hidden" : "shown"; }, [hidden, menuOpen]);

  const overHero = pathname === "/" && !scrolled;
  const lightText = overHero && heroTone === "dark" && !menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-[translate] duration-500 ease-luxe",
          hidden && !menuOpen ? "-translate-y-[120%]" : "translate-y-0",
        )}
      >
        <div
          className={cn(
            "relative transition-[background-color,box-shadow,color,backdrop-filter] duration-500 ease-luxe",
            overHero ? "bg-transparent" : "bg-pearl/70 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl backdrop-saturate-150",
            lightText ? "text-pearl" : "text-ink",
          )}
        >
          <nav className="flex h-[68px] items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary">
            <div className="flex items-center gap-3 sm:gap-5">
              <button type="button" onClick={ui.toggleMenu} aria-label="Open menu" aria-expanded={menuOpen} className="-ml-2 grid size-10 place-items-center">
                <MenuIcon />
              </button>
              <Link href="/" aria-label="Supermimic — home">
                <Wordmark tone={lightText ? "light" : "dark"} />
              </Link>
            </div>

            <div className="flex items-center gap-1">
              <IconBtn label="Search" onClick={ui.openSearch}><SearchIcon /></IconBtn>
              <IconBtn label={`Bag, ${count} items`} onClick={cart.open} badge={count} pulse={pulse}><BagIcon /></IconBtn>
            </div>
          </nav>
        </div>
      </header>
      <MobileMenu categories={categories} collections={collections} />
    </>
  );
}

function IconBtn({ children, label, onClick, badge, pulse }: { children: React.ReactNode; label: string; onClick?: () => void; badge?: number; pulse?: number }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="group/i relative grid size-10 place-items-center">
      <span className="transition-transform duration-500 ease-luxe group-hover/i:scale-110">{children}</span>
      {/* the reel shows the bag count as a tiny superscript, even at 0 */}
      <span key={pulse} className={cn("absolute right-0.5 top-1 grid min-w-3.5 place-items-center rounded-full px-0.5 text-[9px] font-medium leading-[14px]", badge ? "animate-pop bg-ink text-pearl" : "opacity-70")}>
        {badge ?? 0}
      </span>
    </button>
  );
}
