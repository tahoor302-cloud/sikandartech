import type { Metadata } from "next";
import { notFound } from "next/navigation";
import report from "@/data/catalog-report.json";
import { AuditView } from "@/components/pages/audit-view";
import { localData } from "@/lib/catalog/local";
import { ledgerOf, type AuditReport } from "@/lib/catalog/audit";

export const metadata: Metadata = { title: "Catalog audit", robots: { index: false, follow: false } };

/** Internal data-quality page. Enabled in development, or in production with CATALOG_AUDIT=1. */
export default function CatalogAuditPage() {
  if (process.env.NODE_ENV === "production" && process.env.CATALOG_AUDIT !== "1") notFound();
  return <AuditView report={report as unknown as AuditReport} ledger={ledgerOf(localData.products)} />;
}
