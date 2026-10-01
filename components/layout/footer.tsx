"use client";
import { useState } from "react";
import { Link } from "@/components/ui/link";
import { Logo } from "@/components/ui/logo";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/animations/reveal";
import { site } from "@/data/site";

const columns = [
  { title: "Shop", links: [["New Arrivals", "/collections/new-arrivals"], ["Collections", "/collections"], ["Shop All", "/products"], ["Categories", "/categories"], ["Featured", "/collections/featured"]] },
  { title: "House", links: [["About", "/about"], ["Contact", "/info/contact"], ["Account", "/account"], ["Wishlist", "/wishlist"]] },
  { title: "Care", links: [["Shipping", "/info/shipping"], ["Returns", "/info/returns"], ["Privacy", "/info/privacy"], ["Terms", "/info/terms"]] },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <footer className="relative overflow-hidden bg-pearl text-ink">
      <div className="shell pb-10 pt-24 md:pt-32">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-champagne-deep">Newsletter</p>
            <p className="mt-5 max-w-[16ch] font-display text-[clamp(2rem,3.6vw,3.4rem)] font-light leading-[1.05]">Enter the world of Supermimic.</p>
            {done ? (
              <p className="mt-8 text-[14px] text-ink/70">Thank you — you’re on the list.</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (/^\S+@\S+\.\S+$/.test(email)) setDone(true); }} className="group/f mt-8 flex max-w-md items-center border-b border-ink/25 transition-colors focus-within:border-champagne-deep">
                <label htmlFor="footer-email" className="sr-only">Email address</label>
                <input id="footer-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" autoComplete="email" className="h-14 flex-1 bg-transparent text-[15px] placeholder:text-ink/45 focus:outline-none" />
                <button type="submit" aria-label="Subscribe" className="grid size-10 place-items-center transition-transform duration-500 ease-luxe group-focus-within/f:translate-x-1"><ArrowRight /></button>
              </form>
            )}
          </div>
          <nav className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-6 lg:col-start-7" aria-label="Footer">
            {columns.map((c) => (
              <div key={c.title}>
                <p className="eyebrow text-ink/45">{c.title}</p>
                <ul className="mt-5 flex flex-col gap-3 text-[14px] text-ink/85">
                  {c.links.map(([label, href]) => <li key={href}><Link href={href} className="link-u">{label}</Link></li>)}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <Reveal variant="fade" className="mt-24 md:mt-32">
          <p aria-hidden className="wordmark select-none whitespace-nowrap text-center text-[clamp(2.6rem,11.2vw,12.5rem)] font-medium leading-none tracking-[0.06em] text-ivory/[0.06]">SUPERMIMIC</p>
        </Reveal>

        <div className="hairline mt-10" />
        <div className="mt-8 flex flex-col-reverse items-start justify-between gap-6 text-[12px] text-ink/50 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <Logo tone="dark" className="h-10" />
            <span>© {new Date().getFullYear()} Super Mimic. All rights reserved.</span>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {site.social.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="link-u eyebrow text-[10px] text-ink/70">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
