import { NextResponse } from "next/server";
import { catalog } from "@/lib/catalog";

/** GET /api/products/SM-000001 (also accepts a source ID or slug). */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const product = await catalog.getProduct((await params).id);
  if (!product) return NextResponse.json(null, { status: 404 });
  return NextResponse.json(product, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } });
}
