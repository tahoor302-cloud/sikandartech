import type { ReactNode } from "react";
import { MaskText } from "@/components/animations/mask-text";
import { Reveal } from "@/components/animations/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, action, className, align = "left", tone = "dark" }: { eyebrow?: string; title: string; action?: ReactNode; className?: string; align?: "left" | "center"; tone?: "dark" | "light" }) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", align === "center" && "items-center text-center md:flex-col md:items-center", className)}>
      <div className={cn("flex flex-col gap-5", align === "center" && "items-center")}>
        {eyebrow && (
          <Reveal variant="fade" className="flex items-center gap-3">
            <span className="h-px w-8 bg-champagne" />
            <span className={cn("eyebrow", tone === "light" ? "text-champagne-light" : "text-champagne-deep")}>{eyebrow}</span>
          </Reveal>
        )}
        <MaskText text={title} className={cn("display text-display-md", tone === "light" ? "text-ivory" : "text-ink")} />
      </div>
      {action && <Reveal variant="fade" delay={0.2}>{action}</Reveal>}
    </div>
  );
}
