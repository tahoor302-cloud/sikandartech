"use client";
import { site } from "@/data/site";
import { useMemo, useState } from "react";
import { Link } from "@/components/ui/link";
import { Media } from "@/components/ui/media";
import { Reveal } from "@/components/animations/reveal";
import { REQUIRED_INPUT, toCsv, type AuditReport, type LedgerRow } from "@/lib/catalog/audit";
import { nameOfCategory, nameOfSubcategory } from "@/lib/taxonomy";
import { cn, formatPrice } from "@/lib/utils";

function download(name: string, body: string, type: string) {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const a = Object.assign(document.createElement("a"), { href: url, download: name });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

const TILES: { key: keyof AuditReport["totals"]; label: string; good: "zero" | "info" }[] = [
  { key: "sourceRecords", label: "Source records", good: "info" },
  { key: "imported", label: "Imported", good: "info" },
  { key: "validated" as never, label: "Validated", good: "info" },
  { key: "missing", label: "Missing", good: "zero" },
  { key: "invalid", label: "Invalid", good: "zero" },
  { key: "duplicates", label: "Duplicates", good: "zero" },
  { key: "noImage", label: "No image", good: "zero" },
  { key: "brokenImages", label: "Broken images", good: "zero" },
  { key: "noPrice", label: "No price", good: "zero" },
  { key: "noDescription", label: "No description", good: "zero" },
  { key: "noCategory", label: "No / invalid category", good: "zero" },
  { key: "warnings", label: "Warnings", good: "zero" },
];

const PER = 50;

export function AuditView({ report, ledger }: { report: AuditReport; ledger: LedgerRow[] }) {
  const flagged = new Set(report.issues.map((i) => i.id));
  const t = { ...report.totals, validated: ledger.filter((r) => !flagged.has(r.id)).length } as AuditReport["totals"] & { validated: number };
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [sev, setSev] = useState<"all" | "error" | "warning">("all");
  const rows = useMemo(() => {
    const s = q.toLowerCase().trim();
    return s ? ledger.filter((r) => [r.id, r.sourceId, r.name, r.category, r.subcategory].join(" ").toLowerCase().includes(s)) : ledger;
  }, [q, ledger]);
  const pages = Math.max(1, Math.ceil(rows.length / PER));
  const shown = rows.slice((page - 1) * PER, page * PER);
  const issues = report.issues.filter((i) => sev === "all" || i.severity === sev);
  const complete = t.missing === 0 && t.invalid === 0 && t.duplicates === 0;
  const stamp = new Date(report.generatedAt).toISOString().slice(0, 10);

  return (
    <div className="shell pb-[var(--spacing-section)] pt-32 md:pt-40">
      <Reveal variant="fade" className="flex items-center gap-3"><span className="h-px w-8 bg-champagne" /><span className="eyebrow text-champagne-deep">Internal · not indexed</span></Reveal>
      <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end">
        <h1 className="display text-display-lg lg:col-span-7">Catalog audit</h1>
        <div className="lg:col-span-5">
          <p className="prose-lux">
            Built {new Date(report.generatedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })} by <code className="text-[13px]">npm run catalog:build</code>.
            Every figure is computed from the source files; nothing here is estimated.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <button className="btn btn-primary h-11 px-5" onClick={() => download(`catalog-report-${stamp}.json`, JSON.stringify(report, null, 2), "application/json")}>Export report (JSON)</button>
            <button className="btn btn-outline h-11 px-5" onClick={() => download(`catalog-issues-${stamp}.csv`, toCsv(report.issues as unknown as Record<string, unknown>[]) || "id,sourceId,name,severity,code,field,message\n", "text/csv")}>Errors (CSV)</button>
            <button className="btn btn-outline h-11 px-5" onClick={() => download(`catalog-ledger-${stamp}.csv`, toCsv(ledger as unknown as Record<string, unknown>[]), "text/csv")}>Ledger (CSV)</button>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className={cn("mt-14 flex flex-col gap-2 border px-6 py-5 md:flex-row md:items-center md:justify-between", complete ? "border-champagne/60 bg-ivory-2" : "border-ink bg-ink text-ivory")}>
        <p className="font-display text-[26px] font-light leading-tight">
          {complete ? `${t.imported} of ${t.sourceRecords} source records are live. Nothing missing, nothing duplicated.` : `${t.missing} of ${t.sourceRecords} source records are not live. See the issues below.`}
        </p>
        <p className="eyebrow shrink-0 text-[10px] opacity-70">{report.sources.length} source {report.sources.length === 1 ? "file" : "files"}</p>
      </div>

      {/* Totals */}
      <div className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
        {TILES.map(({ key, label, good }) => {
          const v = (t as Record<string, number>)[key];
          const bad = good === "zero" && v > 0;
          return (
            <div key={key} className="bg-ivory p-5">
              <p className="eyebrow text-[9.5px] text-mist">{label}</p>
              <p className={cn("mt-3 font-display text-[40px] font-light leading-none tabular-nums", bad && "text-[#9a3b2e]")}>{v.toLocaleString()}</p>
            </div>
          );
        })}
        <div className="bg-ivory p-5"><p className="eyebrow text-[9.5px] text-mist">Retired IDs</p><p className="mt-3 font-display text-[40px] font-light leading-none tabular-nums">{report.retiredIds.length}</p></div>
      </div>

      {/* Sources + categories */}
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
        <section>
          <h2 className="label mb-5">Sources</h2>
          <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="eyebrow text-[9.5px] text-mist"><tr className="border-b border-line"><th className="py-2 pr-4 font-normal">Source</th><th className="py-2 pr-4 font-normal">Records</th><th className="py-2 font-normal">Authorisation</th></tr></thead>
            <tbody>
              {report.sources.map((s) => (
                <tr key={s.source} className="border-b border-line align-top">
                  <td className="py-3 pr-4"><span className="font-medium">{s.source}</span><br /><code className="text-[11px] text-mist [overflow-wrap:anywhere]">{s.file}</code></td>
                  <td className="py-3 pr-4 tabular-nums">{s.records}</td>
                  <td className="py-3 text-graphite">{s.authorised ?? <span className="text-[#9a3b2e]">Not declared</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </section>
        <section>
          <h2 className="label mb-5">Reconciliation by category</h2>
          <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-[13px]">
            <thead className="eyebrow text-[9.5px] text-mist"><tr className="border-b border-line">{["Category", "Source", "Imported", "Invalid", "Missing", "Subcategories"].map((h) => <th key={h} className="py-2 pr-3 font-normal">{h}</th>)}</tr></thead>
            <tbody>
              {Object.entries(report.reconciliation).map(([c, r]) => (
                <tr key={c} className="border-b border-line align-top">
                  <td className="py-3 pr-3"><Link href={`/category/${c}`} className="link-u font-medium">{nameOfCategory(c)}</Link></td>
                  <td className="py-3 pr-3 tabular-nums">{r.source}</td>
                  <td className="py-3 pr-3 tabular-nums">{r.imported}</td>
                  <td className={cn("py-3 pr-3 tabular-nums", r.invalid > 0 && "text-[#9a3b2e]")}>{r.invalid}</td>
                  <td className={cn("py-3 pr-3 tabular-nums", r.missing > 0 && "text-[#9a3b2e]")}>{r.missing}</td>
                  <td className="py-3 text-graphite">{Object.entries(report.byCategory[c]?.subcategories ?? {}).map(([sub, n]) => `${nameOfSubcategory(sub)} ${n}`).join(" · ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </section>
      </div>

      {/* Excluded sources */}
      {report.exclusions.length > 0 && (
        <section className="mt-16">
          <h2 className="label mb-5">Excluded sources <span className="text-mist">({report.exclusions.length})</span></h2>
          <div className="flex flex-col gap-4">
            {report.exclusions.map((x) => (
              <div key={x.source} className="grid gap-4 border border-line p-6 md:grid-cols-[220px_1fr]">
                <div>
                  <p className="font-medium [overflow-wrap:anywhere]">{x.source}</p>
                  <p className="eyebrow mt-2 text-[9.5px] text-[#9a3b2e]">{x.status} · imported {x.imported}</p>
                  <p className="mt-2 text-[12px] text-mist">Reviewed {x.reviewed}</p>
                </div>
                <div className="text-[13px] text-graphite">
                  <p><span className="text-ink">Role:</span> {x.role}</p>
                  <p className="mt-2"><span className="text-ink">Why it is excluded:</span> {x.reason}</p>
                  <p className="mt-2"><span className="text-ink">To unblock:</span> {x.unblock}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Issues */}
      <section className="mt-16">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="label">Validation issues <span className="text-mist">({report.issues.length})</span></h2>
          <div className="flex gap-4">
            {(["all", "error", "warning"] as const).map((s) => (
              <button key={s} onClick={() => setSev(s)} className={cn("label text-[10px]", sev === s ? "text-ink" : "text-mist hover:text-ink")}>{s}</button>
            ))}
          </div>
        </div>
        {issues.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-[13px]">
              <thead className="eyebrow text-[9.5px] text-mist"><tr className="border-b border-line"><th className="py-2 pr-4 font-normal">Product</th><th className="py-2 pr-4 font-normal">Severity</th><th className="py-2 pr-4 font-normal">Rule</th><th className="py-2 font-normal">Detail</th></tr></thead>
              <tbody>
                {issues.map((i, n) => (
                  <tr key={n} className="border-b border-line align-top">
                    <td className="py-3 pr-4"><span className="tabular-nums">{i.id}</span><br /><span className="text-[11px] text-mist">{i.sourceId} · {i.name}</span></td>
                    <td className={cn("py-3 pr-4", i.severity === "error" ? "text-[#9a3b2e]" : "text-champagne-deep")}>{i.severity}</td>
                    <td className="py-3 pr-4"><code className="text-[12px]">{i.code}</code></td>
                    <td className="py-3 text-graphite">{i.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="border border-line px-6 py-8 text-center text-[14px] text-graphite">No {sev === "all" ? "" : `${sev} `}issues. Every live product passed all checks: required fields, taxonomy, image ownership and existence, variant integrity and uniqueness.</p>
        )}
      </section>

      {/* Ledger */}
      <section className="mt-16">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
          <h2 className="label">Product ledger <span className="text-mist">({rows.length})</span></h2>
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Filter by ID, source ID, name…" aria-label="Filter ledger" className="field h-10 w-full max-w-xs text-[13px]" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-[13px]">
            <thead className="eyebrow text-[9.5px] text-mist">
              <tr className="border-b border-line">
                {["", "ID", "Source ID", "Name", "Category / type", ...(site.showPrices ? ["Price"] : []), "Images", "Variants", "Stock"].map((h) => <th key={h} className="py-2 pr-4 font-normal">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {shown.map((r) => (
                <tr key={r.id} className="border-b border-line align-middle">
                  <td className="py-2 pr-4"><div className="relative aspect-[4/5] w-10 overflow-hidden bg-ivory-2">{r.image && <Media src={r.image} alt="" fill sizes="40px" className="object-cover" />}</div></td>
                  <td className="py-2 pr-4 tabular-nums"><Link href={`/product/${r.id}`} className="link-u">{r.id}</Link></td>
                  <td className="py-2 pr-4 tabular-nums text-graphite">{r.sourceId}</td>
                  <td className="py-2 pr-4 font-medium">{r.name}</td>
                  <td className="py-2 pr-4 text-graphite">{nameOfCategory(r.category)} · {nameOfSubcategory(r.subcategory)}</td>
                  {site.showPrices && <td className="py-2 pr-4 tabular-nums">{formatPrice(r.price, r.currency as never)}</td>}
                  <td className="py-2 pr-4 tabular-nums">{r.images} <span className="text-mist">({r.primaryImages} main)</span></td>
                  <td className="py-2 pr-4 tabular-nums">{r.variants}</td>
                  <td className="py-2 pr-4">{r.availability}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {pages > 1 && (
          <div className="mt-6 flex items-center justify-end gap-4 text-[13px]">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="link-u disabled:opacity-30">Previous</button>
            <span className="tabular-nums text-mist">{page} / {pages}</span>
            <button disabled={page === pages} onClick={() => setPage(page + 1)} className="link-u disabled:opacity-30">Next</button>
          </div>
        )}
      </section>

      {/* Required input */}
      <section className="mt-20 border-t border-line pt-12">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="display text-display-sm">Adding an authorised dataset</h2>
            <p className="prose-lux mt-5">
              Put an export you own or are licensed to use in any folder, then run
              <code className="mt-3 block bg-ivory-2 px-3 py-2 text-[12px]">npm run catalog:import export.csv -- --source my-feed --authorised &quot;Owner / licence&quot;</code>
              <code className="mt-2 block bg-ivory-2 px-3 py-2 text-[12px]">npm run catalog:build</code>
              <span className="mt-3 block">Existing products keep their IDs. New records get the next permanent ID. Records that fail validation are held back and listed here.</span>
            </p>
          </div>
          <div className="overflow-x-auto lg:col-span-8">
            <table className="w-full min-w-[560px] text-left text-[13px]">
              <thead className="eyebrow text-[9.5px] text-mist"><tr className="border-b border-line"><th className="py-2 pr-4 font-normal">Column</th><th className="py-2 pr-4 font-normal">Required</th><th className="py-2 font-normal">Rule</th></tr></thead>
              <tbody>
                {REQUIRED_INPUT.map((f) => (
                  <tr key={f.field} className="border-b border-line align-top">
                    <td className="py-3 pr-4"><code className="text-[12px]">{f.field}</code></td>
                    <td className="py-3 pr-4">{f.required ? "Yes" : "—"}</td>
                    <td className="py-3 text-graphite">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
