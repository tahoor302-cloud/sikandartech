"use client";
import { ScrubWords } from "@/components/animations/scrub-words";
import { Reveal } from "@/components/animations/reveal";
import { Logo } from "@/components/ui/logo";

const pillars = [
  { k: "Material", v: "Selected for how it ages — full-grain leathers, sapphire, solid brass." },
  { k: "Precision", v: "Tolerances measured in tenths of a millimetre, checked by hand." },
  { k: "Service", v: "A concierge who answers — before, during and long after purchase." },
];

/** Section 9 — Brand statement on pearl, words brighten as you scroll. */
export function BrandStatement() {
  return (
    <section className="relative overflow-hidden bg-pearl py-[var(--spacing-section)] text-ink">
      <div className="grain pointer-events-none absolute inset-0 overflow-hidden" />
      <div className="shell relative">
        <Reveal variant="fade" className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <Logo tone="dark" className="h-10" />
          <span className="eyebrow text-champagne-deep">The Super Mimic Standard</span>
        </Reveal>
        <ScrubWords
          as="p"
          text="Luxury is not excess. It is precision — the quiet confidence of an object made exactly right, and the restraint to stop there."
          highlight={["precision", "restraint"]}
          className="display mt-10 max-w-[18ch] text-[clamp(2.4rem,6.4vw,6.8rem)] leading-[1.02] md:max-w-[20ch]"
          dim={0.16}
        />
        <Reveal stagger={0.12} className="mt-20 grid gap-10 border-t border-line pt-10 md:grid-cols-3 md:gap-12">
          {pillars.map((p, i) => (
            <div key={p.k}>
              <p className="eyebrow text-champagne-deep">0{i + 1} — {p.k}</p>
              <p className="mt-4 max-w-[34ch] text-[14.5px] leading-relaxed text-ink/70">{p.v}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
