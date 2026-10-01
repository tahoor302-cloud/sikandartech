"use client";
import { Link } from "@/components/ui/link";
import { Media } from "@/components/ui/media";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import { ArrowUpRight } from "@/components/ui/icons";
import { pad2 } from "@/lib/utils";

export interface IndexItem { href: string; name: string; tagline: string; description: string; image: string; count: number }

/** /collections and /categories landing: large editorial rows. */
export function IndexView({ eyebrow, title, items }: { eyebrow: string; title: string; items: IndexItem[] }) {
  return (
    <div className="shell pb-[var(--spacing-section)] pt-36 md:pt-44">
      <Reveal variant="fade" className="flex items-center gap-3"><span className="h-px w-8 bg-champagne" /><span className="eyebrow text-champagne-deep">{eyebrow}</span></Reveal>
      <MaskText as="h1" text={title} immediate delay={0.1} className="display mt-6 text-display-xl leading-[1.02]" />
      <ul className="mt-16 border-t border-line md:mt-24">
        {items.map((it, i) => (
          <Reveal as="li" key={it.href} className="border-b border-line">
            <Link href={it.href} className="group/r grid items-center gap-6 py-8 md:grid-cols-[80px_1fr_1fr_220px] md:gap-10 md:py-10" data-cursor="Open">
              <span className="eyebrow text-mist">{pad2(i + 1)}</span>
              <div>
                <p className="font-display text-[clamp(2.2rem,4.4vw,4.2rem)] font-light leading-none transition-transform duration-700 ease-luxe group-hover/r:translate-x-3">{it.name}</p>
                <p className="eyebrow mt-3 text-champagne-deep">{it.tagline} — {it.count} objects</p>
              </div>
              <p className="prose-lux hidden max-w-[40ch] md:block">{it.description}</p>
              <div className="relative aspect-[16/10] overflow-hidden bg-bone md:aspect-[4/3]">
                <Media src={it.image} alt="" fill sizes="(min-width:768px) 220px, 100vw" className="object-cover transition-transform duration-1000 ease-luxe group-hover/r:scale-105" />
                <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-ivory/85 opacity-0 transition-[opacity,rotate] duration-500 group-hover/r:rotate-45 group-hover/r:opacity-100"><ArrowUpRight width={15} height={15} /></span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
