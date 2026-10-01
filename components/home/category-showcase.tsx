"use client";
import { Link } from "@/components/ui/link";
import { Media } from "@/components/ui/media";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowUpRight } from "@/components/ui/icons";
import { useGsap } from "@/hooks/use-gsap";
import { gsap, EASE, prefersReducedMotion } from "@/lib/motion";
import type { Category } from "@/lib/types";
import { cn, pad2 } from "@/lib/utils";
import { CloneScrub } from "./clone-scrub";

/** Section 7 — Category showcase: tall tiles with staggered clip-path reveals. */
/** Columns the scroll film fills on desktop: the blank cells after the last tile (else a full row). */
const LG_SPAN = ["lg:col-span-4", "lg:col-span-3", "lg:col-span-2", "lg:col-span-4"] as const;

export function CategoryShowcase({ categories, counts }: { categories: Category[]; counts: Record<string, number> }) {
  const ref = useGsap<HTMLDivElement>((_, el) => {
    const tiles = el.querySelectorAll<HTMLElement>("[data-tile]");
    if (prefersReducedMotion()) return;
    gsap.fromTo(tiles, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: EASE.expo, stagger: 0.12, scrollTrigger: { trigger: el, start: "top 80%", once: true } });
    gsap.fromTo(el.querySelectorAll("[data-tile-img]"), { scale: 1.3 }, { scale: 1, duration: 1.8, ease: EASE.expo, stagger: 0.12, scrollTrigger: { trigger: el, start: "top 80%", once: true } });
  });
  return (
    <section className="shell py-[var(--spacing-section)]">
      <SectionHeading eyebrow="Categories" title="Shop by object" />
      <div ref={ref} className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:mt-20 lg:grid-cols-4">
        {categories.map((c, i) => (
          <Link key={c.id} href={`/category/${c.slug}`} className="group/t relative block" data-cursor="Shop">
            <div data-tile data-reveal="clip" className="relative aspect-[3/4] overflow-hidden bg-charcoal lg:aspect-[3/4.4]">
              <div data-tile-img className="absolute inset-0">
                <Media src={c.image} alt={c.name} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover/t:scale-[1.05]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-ivory sm:p-6">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="eyebrow text-[9px] text-champagne-light">{pad2(i + 1)} — {counts[c.id] ?? 0} objects</p>
                    <p className="mt-2 font-display text-[28px] font-light leading-none sm:text-[38px]">{c.name}</p>
                    <p className="mt-2 hidden text-[12px] text-ivory/70 sm:block">{c.tagline}</p>
                  </div>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ivory/30 transition-[transform,background-color,color] duration-500 ease-luxe group-hover/t:rotate-45 group-hover/t:bg-ivory group-hover/t:text-ink">
                    <ArrowUpRight width={15} height={15} />
                  </span>
                </div>
                <span className="mt-4 block h-px origin-left scale-x-0 bg-champagne transition-transform duration-700 ease-luxe group-hover/t:scale-x-100" />
              </div>
            </div>
          </Link>
        ))}
        {/* 3D cloning film, scroll-scrubbed — fills the open cells beside the last tile on desktop,
            its own full-width 16:9 row on smaller screens. */}
        <div className={cn("col-span-2", LG_SPAN[categories.length % 4])}>
          <div data-tile data-reveal="clip" className={cn("relative aspect-video overflow-hidden bg-charcoal", categories.length % 4 >= 1 && categories.length % 4 <= 2 && "lg:aspect-auto lg:h-full")}>
            <div data-tile-img className="absolute inset-0">
              <CloneScrub />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
