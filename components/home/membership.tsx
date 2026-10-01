"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import { CheckIcon } from "@/components/ui/icons";

const perks = ["Early access to new drops", "Private previews & events", "Complimentary engraving and monogramming"];

/** Section 10 — Membership / newsletter. Replace `subscribe` with your ESP call. */
export function Membership() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setState("error");
    setState("loading");
    await new Promise((r) => setTimeout(r, 900));
    setState("done");
  };
  return (
    <section className="shell py-[var(--spacing-section)]">
      <div className="relative overflow-hidden border border-line bg-ivory-2 px-6 py-16 sm:px-12 md:px-20 md:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 size-[420px] rounded-full border border-champagne/30" />
        <div className="pointer-events-none absolute -right-8 -top-8 size-[260px] rounded-full border border-champagne/20" />
        <div className="relative grid gap-12 lg:grid-cols-2 lg:items-end">
          <div>
            <Reveal variant="fade"><span className="eyebrow text-champagne-deep">Membership</span></Reveal>
            <MaskText as="h2" text="Become a member of the house." className="display mt-6 max-w-[14ch] text-display-md" />
            <Reveal delay={0.1} as="ul" className="mt-8 flex flex-col gap-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[14px] text-graphite"><CheckIcon width={15} height={15} className="text-champagne-deep" />{p}</li>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            {state === "done" ? (
              <div className="flex flex-col gap-3">
                <p className="font-display text-[32px] font-light">Welcome to the house.</p>
                <p className="text-[14px] text-graphite">A confirmation is on its way to {email}.</p>
              </div>
            ) : (
              <form onSubmit={subscribe} noValidate className="flex flex-col gap-3">
                <label htmlFor="member-email" className="label text-[10px] text-mist">Email address</label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input id="member-email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setState("idle"); }} placeholder="you@example.com" className="field flex-1 bg-ivory" autoComplete="email" />
                  <Button type="submit" loading={state === "loading"}>Join</Button>
                </div>
                <p className={state === "error" ? "text-[12px] text-[#8a3b2e]" : "text-[12px] text-mist"}>
                  {state === "error" ? "Please enter a valid email address." : "By joining you agree to our privacy policy. Unsubscribe anytime."}
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
