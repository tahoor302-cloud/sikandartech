"use client";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import type { InfoPage } from "@/data/pages";

export function InfoView({ page }: { page: InfoPage }) {
  return (
    <div className="shell grid gap-12 pb-[var(--spacing-section)] pt-36 md:pt-44 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal variant="fade"><p className="eyebrow text-champagne-deep">{page.eyebrow}</p></Reveal>
        <MaskText as="h1" text={page.title} immediate delay={0.1} className="display mt-5 text-display-lg" />
      </div>
      <Reveal delay={0.2} className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7 lg:pt-6">
        {page.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="label">{s.heading}</h2>
            <div className="mt-4 flex flex-col gap-3">{s.body.map((b, i) => <p key={i} className="prose-lux">{b}</p>)}</div>
          </section>
        ))}
        <p className="text-[12px] text-mist">Template copy — review with your legal and operations teams before launch.</p>
      </Reveal>
    </div>
  );
}
