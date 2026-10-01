"use client";
import { Link } from "@/components/ui/link";
import { Media } from "@/components/ui/media";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import { ClipImage } from "@/components/animations/clip-image";
import { ScrubWords } from "@/components/animations/scrub-words";
import { SignatureScroll } from "@/components/home/signature-scroll";
import { ArrowRight } from "@/components/ui/icons";

export function AboutView() {
  return (
    <>
      <section className="shell pt-36 md:pt-48">
        <Reveal variant="fade" className="flex items-center gap-3"><span className="h-px w-8 bg-champagne" /><span className="eyebrow text-champagne-deep">About the house</span></Reveal>
        <MaskText as="h1" text="Curated objects. Elevated." immediate delay={0.15} className="display mt-6 max-w-[12ch] text-display-xl leading-[1.02]" />
        <ClipImage className="mt-16 aspect-[16/9] w-full bg-charcoal md:mt-24" delay={0.3}>
          <Media src="/media/hero/ridge-court.webp" alt="Super Mimic Ridge Court sneaker on a plinth" fill priority sizes="100vw" className="object-cover" />
        </ClipImage>
      </section>
      <section className="shell grid gap-12 py-[var(--spacing-section)] lg:grid-cols-12">
        <div className="lg:col-span-4"><Reveal variant="fade"><p className="eyebrow text-champagne-deep">Our approach</p></Reveal></div>
        <div className="lg:col-span-8">
          <ScrubWords text="Super Mimic began with a simple belief: the objects you use every day should be made with the same care as the ones you save for special occasions." className="display text-[clamp(2rem,4vw,3.8rem)] leading-[1.08]" />
          <Reveal className="mt-12 grid gap-8 md:grid-cols-2">
            <p className="prose-lux">We design shoes, watches, bags and accessories as a single language — shared proportions, shared materials, shared restraint. Each piece is developed slowly and released in small, considered drops.</p>
            <p className="prose-lux">We work with materials chosen for how they age: full-grain leathers, sapphire crystal, solid brass and waxed canvas. Every object is inspected by hand before it reaches you.</p>
          </Reveal>
        </div>
      </section>
      <SignatureScroll />
      <section className="shell flex flex-col items-center gap-8 py-[var(--spacing-section)] text-center">
        <MaskText as="h2" text="Begin with the collection." className="display text-display-md" />
        <Reveal delay={0.1}><Link href="/collections/all" className="btn btn-primary">Explore collection <ArrowRight width={14} height={14} /></Link></Reveal>
      </section>
    </>
  );
}
