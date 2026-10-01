import type { Metadata } from "next";
import { AboutView } from "@/components/pages/about-view";
export const metadata: Metadata = { title: "About", description: "The Super Mimic approach — curated objects, elevated." };
export default function AboutPage() { return <AboutView />; }
