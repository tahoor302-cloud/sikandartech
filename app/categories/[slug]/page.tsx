import { permanentRedirect } from "next/navigation";

/** Legacy URL → canonical /category/[slug]. */
export default async function LegacyCategory({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  permanentRedirect(`/category/${slug === "footwear" ? "shoes" : slug}`);
}
