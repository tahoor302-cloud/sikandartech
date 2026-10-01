import { NextResponse, type NextRequest } from "next/server";
import { catalog } from "@/lib/catalog";
import { queryFromParams } from "@/lib/filters";

/**
 * GET /api/products?category=shoes&sub=sneakers&color=noir&availability=in-stock&sort=price-asc&q=runner
 *   &page=2&per=24   → { items, total, page, pageSize, pageCount, facets }
 *   &ids=SM-000001,SM-000002 or &limit=8 (without page) → Product[]
 */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const query = queryFromParams((k) => sp.get(k));
  const headers = { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" };
  if (sp.has("page") || sp.has("per")) return NextResponse.json(await catalog.queryPage(query), { headers });
  return NextResponse.json(await catalog.listProducts(query), { headers });
}
