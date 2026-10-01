"use client";
import { Link } from "@/components/ui/link";
import { Media } from "@/components/ui/media";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import { ArrowRight } from "@/components/ui/icons";
import type { Category } from "@/lib/types";

/** "All products" band — the count is the real number of live products. */
export function AllProductsCta({ total, categories, images }: { total: number; categories: Category[]; images: string[] }) {
  return (
    <section className="relative overflow-hidden bg-pearl text-ink">
      <div className="absolute inset-0 grid grid-cols-3 opacity-60 md:grid-cols-6" aria-hidden>
        {images.slice(0, 6).map((src, i) => (
          <div key={src} className={i > 2 ? "relative hidden md:block" : "relative"}><Media src={src} alt="" fill sizes="(min-width:768px) 17vw, 33vw" className="object-cover" /></div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-pearl via-pearl/80 to-pearl/55" />
      <div className="shell relative flex flex-col items-start gap-8 py-28 md:py-40">
        <Reveal variant="fade" className="flex items-center gap-3"><span className="h-px w-8 bg-champagne" /><span className="eyebrow text-champagne-deep">The complete catalogue</span></Reveal>
        <MaskText as="h2" text={`${total} objects. One house.`} className="display text-display-lg" />
        <Reveal delay={0.2} className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-ink/70">
          {categories.map((c) => <Link key={c.id} href={`/category/${c.slug}`} className="link-u">{c.name} <span className="text-ink/40">{c.count}</span></Link>)}
        </Reveal>
        <Reveal delay={0.3}><Link href="/products" className="btn btn-primary">Shop all {total} products <ArrowRight width={14} height={14} /></Link></Reveal>
      </div>
    </section>
  );
}
