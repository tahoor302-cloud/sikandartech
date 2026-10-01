import type { SVGProps } from "react";

/** Hairline icon set — 1.25px strokes, drawn for Super Mimic. */
const base = (p: SVGProps<SVGSVGElement>) => ({
  width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.25,
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...p,
});

export const SearchIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>);
export const UserIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20c1.2-3.6 4-5.4 7.5-5.4s6.3 1.8 7.5 5.4" /></svg>);
export const HeartIcon = ({ filled, ...p }: SVGProps<SVGSVGElement> & { filled?: boolean }) => (<svg {...base(p)} fill={filled ? "currentColor" : "none"}><path d="M12 20s-7.5-4.6-7.5-10.1A4.2 4.2 0 0 1 12 7.3a4.2 4.2 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20Z" /></svg>);
export const BagIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></svg>);
export const MenuIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M3.5 8h17M3.5 16h17" /></svg>);
export const CloseIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="m6 6 12 12M18 6 6 18" /></svg>);
export const ArrowRight = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M4 12h15.5M14 6.5l5.5 5.5-5.5 5.5" /></svg>);
export const ArrowLeft = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M20 12H4.5M10 6.5 4.5 12l5.5 5.5" /></svg>);
export const ArrowUpRight = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M7 17 17 7M8.5 7H17v8.5" /></svg>);
export const PlusIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>);
export const MinusIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M5 12h14" /></svg>);
export const EyeIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.8" /></svg>);
export const CheckIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
export const ChevronDown = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="m6 9 6 6 6-6" /></svg>);
export const FilterIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M4 7h10M18 7h2M4 17h2M10 17h10" /><circle cx="16" cy="7" r="2" /><circle cx="8" cy="17" r="2" /></svg>);
export const SoundIcon = ({ on, ...p }: SVGProps<SVGSVGElement> & { on?: boolean }) => (<svg {...base(p)}><path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4v-5Z" />{on ? <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="m16 9.5 5 5M21 9.5l-5 5" />}</svg>);
export const ZoomIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2M11 8.5v5M8.5 11h5" /></svg>);
export const TruckIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M3 6.5h11v9H3zM14 10h4l3 3v2.5h-7" /><circle cx="7" cy="17.5" r="1.7" /><circle cx="17.5" cy="17.5" r="1.7" /></svg>);
export const ReturnIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M9 7 4.5 11.5 9 16" /><path d="M5 11.5h9.5a5 5 0 0 1 0 10H12" /></svg>);
export const ShieldIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M12 3.5 19 6v5.5c0 4.5-3 7.7-7 9-4-1.3-7-4.5-7-9V6l7-2.5Z" /><path d="m9 12 2 2 4-4" /></svg>);
