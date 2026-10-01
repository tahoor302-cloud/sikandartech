"use client";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon } from "./icons";

type Variant = "primary" | "light" | "outline" | "gold";

export function Button({ variant = "primary", loading, success, children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; loading?: boolean; success?: boolean; children: ReactNode }) {
  return (
    <button {...props} disabled={props.disabled || loading} aria-busy={loading || undefined} className={cn("btn", `btn-${variant}`, className)}>
      <span className={cn("inline-flex items-center gap-3 transition-all duration-300 ease-luxe", (loading || success) && "-translate-y-3 opacity-0")}>{children}</span>
      <span aria-hidden className={cn("absolute inset-0 flex items-center justify-center transition-all duration-300 ease-luxe", loading ? "opacity-100" : "translate-y-3 opacity-0")}>
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-1 animate-pulse rounded-full bg-current" style={{ animationDelay: `${i * 160}ms` }} />
          ))}
        </span>
      </span>
      <span aria-hidden className={cn("absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ease-luxe", success ? "opacity-100" : "translate-y-3 opacity-0")}>
        <CheckIcon width={16} height={16} /> Added
      </span>
    </button>
  );
}
