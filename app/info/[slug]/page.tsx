import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoView } from "@/components/pages/info-view";
import { infoPages } from "@/data/pages";

type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => infoPages.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = infoPages.find((x) => x.slug === slug);
  return p ? { title: p.title } : {};
}
export default async function InfoPage({ params }: Props) {
  const { slug } = await params;
  const page = infoPages.find((x) => x.slug === slug);
  if (!page) notFound();
  return <InfoView page={page} />;
}
