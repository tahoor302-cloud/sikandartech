"use client";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { coverThen } from "@/components/animations/page-transition";

type Props = ComponentProps<typeof NextLink> & { transition?: boolean };

/**
 * Drop-in next/link with the Super Mimic page transition.
 * Modifier-clicks, new tabs, hash and same-page links behave natively.
 */
export function Link({ transition = true, onClick, href, ...rest }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || !transition) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0 || rest.target === "_blank") return;
    const url = typeof href === "string" ? href : href.pathname ?? "";
    if (!url.startsWith("/") || url.startsWith("/#")) return;
    const targetPath = url.split(/[?#]/)[0];
    if (targetPath === pathname) return; // same page → let Next handle query changes without a curtain
    e.preventDefault();
    coverThen(() => router.push(url));
  };
  return <NextLink href={href} onClick={handle} {...rest} />;
}
