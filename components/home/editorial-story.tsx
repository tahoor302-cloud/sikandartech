"use client";
import { Link } from "@/components/ui/link";
import { Media } from "@/components/ui/media";
import { ClipImage } from "@/components/animations/clip-image";
import { Parallax } from "@/components/animations/parallax";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import { ArrowRight } from "@/components/ui/icons";

/** Section 6 — Editorial product story: offset images at different parallax speeds. */
export function EditorialStory() {
  return (
    <section className="relative overflow-hidden py-[var(--spacing-section)]">
      <div className="shell grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-6">
          <ClipImage className="aspect-[3/4] w-[78%] bg-bone">
            <Media src="/media/products/maison-tote/02-angle.webp" alt="Maison Tote in cognac, studio still life" fill sizes="(min-width:1024px) 38vw, 78vw" className="object-cover" />
          </ClipImage>
          <Parallax speed={-26} className="absolute -bottom-10 right-0 w-[46%] lg:-bottom-24">
            <ClipImage className="aspect-[3/4] w-full bg-charcoal shadow-[0_40px_90px_-30px_rgba(15,14,13,.5)]" delay={0.2}>
              <Media src="/media/products/chronos-38-automatic/04-editorial.webp" alt="Chronos 38 Automatic on a plinth" fill sizes="(min-width:1024px) 22vw, 46vw" className="object-cover" />
            </ClipImage>
          </Parallax>
        </div>

        <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
          <Reveal variant="fade" className="flex items-center gap-3">
            <span className="h-px w-8 bg-champagne" />
            <span className="eyebrow text-champagne-deep">The Story — N°015</span>
          </Reveal>
          <MaskText as="h2" text="Every object begins as a question." className="display mt-6 text-display-lg" />
          <Reveal delay={0.1} className="mt-8 flex flex-col gap-5">
            <p className="prose-lux max-w-[46ch]">
              What does it need — and what can it lose? The Maison Tote went through fourteen patterns before its proportions felt inevitable. Its handles are cut from a single hide; its edges painted by hand in seven layers.
            </p>
            <p className="prose-lux max-w-[46ch]">
              It is how we approach everything: fewer objects, each resolved completely.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-8">
            <Link href="/product/maison-tote" className="label link-u inline-flex items-center gap-3">The Maison Tote <ArrowRight width={14} height={14} /></Link>
            <Link href="/about" className="label link-u inline-flex items-center gap-3 text-graphite">Our approach</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
