import { NextResponse, type NextRequest } from "next/server";
import report from "@/data/catalog-report.json";
import { localData } from "@/lib/catalog/local";
import { ledgerOf, toCsv, type AuditReport } from "@/lib/catalog/audit";

/** GET /api/catalog-audit?format=json|issues.csv|ledger.csv */
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production" && process.env.CATALOG_AUDIT !== "1") return NextResponse.json(null, { status: 404 });
  const format = req.nextUrl.searchParams.get("format") ?? "json";
  const r = report as unknown as AuditReport;
  const csv = (body: string, name: string) => new NextResponse(body, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${name}"` } });
  if (format === "issues.csv") return csv(toCsv(r.issues as unknown as Record<string, unknown>[]) || "id,sourceId,name,severity,code,field,message\n", "catalog-issues.csv");
  if (format === "ledger.csv") return csv(toCsv(ledgerOf(localData.products) as unknown as Record<string, unknown>[]), "catalog-ledger.csv");
  return NextResponse.json(r, { headers: { "Content-Disposition": 'attachment; filename="catalog-report.json"' } });
}
