"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import { Media } from "@/components/ui/media";
import { cn } from "@/lib/utils";

/** Account entry point — wire to your auth provider (NextAuth, Clerk, Shopify customer accounts…). */
export function AccountView() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setMsg("Authentication is not connected in this demo.");
  };
  return (
    <div className="grid min-h-[100svh] lg:grid-cols-2">
      <div className="relative hidden bg-charcoal lg:block">
        <Media src="/media/products/maison-tote/04-editorial.webp" alt="" fill sizes="50vw" className="object-cover" priority />
      </div>
      <div className="flex items-center px-[var(--spacing-gutter)] pb-20 pt-32">
        <div className="mx-auto w-full max-w-md">
          <Reveal variant="fade"><p className="eyebrow text-champagne-deep">Super Mimic account</p></Reveal>
          <MaskText as="h1" key={mode} text={mode === "in" ? "Welcome back." : "Join the house."} immediate className="display mt-5 text-display-md" />
          <div className="mt-10 flex gap-8 border-b border-line">
            {(["in", "up"] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setMsg(""); }} className={cn("label relative pb-3 text-[10.5px]", mode === m ? "text-ink" : "text-mist")}>
                {m === "in" ? "Sign in" : "Create account"}
                <span className={cn("absolute inset-x-0 -bottom-px h-px origin-left bg-ink transition-transform duration-500 ease-luxe", mode === m ? "scale-x-100" : "scale-x-0")} />
              </button>
            ))}
          </div>
          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            {mode === "up" && <input required className="field" placeholder="Full name" autoComplete="name" />}
            <input required className="field" type="email" placeholder="Email" autoComplete="email" />
            <input required className="field" type="password" placeholder="Password" autoComplete={mode === "in" ? "current-password" : "new-password"} />
            <Button type="submit" loading={loading} className="mt-2">{mode === "in" ? "Sign in" : "Create account"}</Button>
            {msg && <p className="text-[12.5px] text-graphite">{msg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
