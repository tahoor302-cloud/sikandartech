import { NextResponse, type NextRequest } from "next/server";
import { catalog, toSearchItem } from "@/lib/catalog";

/** GET /api/search?q=leather&limit=8 — returns lightweight SearchItem[]. Empty q → trending products. */
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
  const limit = Math.min(24, Number(req.nextUrl.searchParams.get("limit") ?? 8));
  const products = q ? await catalog.listProducts({ search: q, limit }) : await catalog.listProducts({ trending: true, limit });
  return NextResponse.json(products.map(toSearchItem), { headers: { "Cache-Control": "public, s-maxage=120" } });
}
