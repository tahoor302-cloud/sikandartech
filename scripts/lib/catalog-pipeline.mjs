/**
 * SUPER MIMIC — catalog pipeline (pure functions, no I/O except where a
 * `fileExists` callback is injected).
 *
 *   source records ──assignIds──▶ registry (append-only, permanent SM-000001 IDs)
 *                  ──normalize──▶ Product (one record in → one product out, deep-copied)
 *                  ──validate───▶ report (errors exclude a record from the storefront)
 *
 * Every product is built ONLY from its own source record. Nothing is shared or
 * inferred across records, which is what the contamination tests verify.
 */

export const ID_PREFIX = "SM";
export const ID_WIDTH = 6;
export const IMG = { width: 896, height: 1120 };

const clone = (v) => (v === undefined ? undefined : structuredClone(v));
const str = (v) => (typeof v === "string" ? v.trim() : "");
export const slugify = (s) =>
  String(s ?? "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-");

export const formatId = (n) => `${ID_PREFIX}-${String(n).padStart(ID_WIDTH, "0")}`;
export const registryKey = (source, sourceId) => `${source}:${sourceId}`;

/**
 * Assigns permanent IDs. Existing keys keep their ID forever; new keys get the
 * next number. IDs are never reused, even when a source record disappears.
 * Returns a NEW registry object (input is not mutated).
 */
export function assignIds(registry, sources) {
  const next = { prefix: ID_PREFIX, next: registry?.next ?? 1, entries: { ...(registry?.entries ?? {}) } };
  for (const { source, records } of sources) {
    for (const r of records) {
      if (!str(r?.sourceId)) continue; // reported by validate(); cannot be given a stable ID
      const key = registryKey(source, r.sourceId);
      if (!next.entries[key]) next.entries[key] = formatId(next.next++);
    }
  }
  return next;
}

function availabilityOf(variants) {
  if (!variants.length) return "in-stock";
  const stocked = variants.filter((v) => v.available);
  if (!stocked.length) return "sold-out";
  const total = stocked.reduce((n, v) => n + (typeof v.stock === "number" ? v.stock : 99), 0);
  return total <= 5 ? "low-stock" : "in-stock";
}

/** One source record → one Product. Pure; output shares no references with input. */
export function normalize(record, { id, source }) {
  const r = clone(record);
  const colors = Array.isArray(r.colors) ? r.colors.map((c) => ({ id: slugify(c.id || c.name), name: str(c.name) || str(c.id), hex: str(c.hex) || "#999999" })) : [];
  const sizes = Array.isArray(r.sizes) && r.sizes.length ? r.sizes.map(String) : ["One size"];
  const price = Number(r.price);
  const variants = (Array.isArray(r.variants) ? r.variants : []).map((v) => {
    const color = v.color ? slugify(v.color) : undefined;
    const size = v.size != null && v.size !== "" ? String(v.size) : undefined;
    const stock = typeof v.stock === "number" ? v.stock : undefined;
    return {
      id: [id, color, size && slugify(size)].filter(Boolean).join("-"),
      sku: str(v.sku) || [id, color, size].filter(Boolean).join("-").toUpperCase(),
      ...(color ? { color } : {}),
      ...(size ? { size } : {}),
      price: Number(v.price ?? price),
      ...(v.compareAtPrice ? { compareAtPrice: Number(v.compareAtPrice) } : {}),
      available: v.available ?? (stock === undefined ? true : stock > 0),
      ...(stock !== undefined ? { stock } : {}),
    };
  });
  const images = (Array.isArray(r.images) ? r.images : []).map((im) => ({
    src: str(im.src),
    alt: str(im.alt) || str(r.title),
    kind: im.kind || "primary",
    width: im.width ?? IMG.width,
    height: im.height ?? IMG.height,
    ...(im.color ? { color: slugify(im.color) } : {}),
  }));
  const category = slugify(r.category);
  const subcategory = slugify(r.subcategory);
  const collection = slugify(r.collection) || "originals";
  return {
    id,
    sourceId: str(r.sourceId),
    source,
    slug: slugify(r.slug || r.title),
    name: str(r.title),
    brand: str(r.line) || "Super Mimic",
    category,
    subcategory,
    productType: str(r.productType),
    collection,
    tags: [...new Set([category, subcategory, collection, ...colors.map((c) => c.id)].filter(Boolean))],
    price,
    ...(r.compareAtPrice ? { compareAtPrice: Number(r.compareAtPrice) } : {}),
    currency: str(r.currency) || "USD",
    images,
    shortDescription: str(r.shortDescription),
    description: str(r.description),
    colors,
    sizes,
    sizeLabel: str(r.sizeLabel) || undefined,
    variants,
    availability: availabilityOf(variants),
    specifications: r.specifications && typeof r.specifications === "object" ? r.specifications : {},
    details: Array.isArray(r.details) ? r.details.map(String) : [],
    materials: str(r.materials),
    care: Array.isArray(r.care) ? r.care.map(String) : [],
    featured: !!r.featured,
    newArrival: !!r.newArrival,
    trending: !!r.trending,
    createdAt: str(r.createdAt) || "1970-01-01T00:00:00.000Z",
    ...(r.sample ? { sample: true } : {}),
  };
}

/**
 * Validates normalized products against their source records and the taxonomy.
 * `fileExists(src)` lets the caller check local media on disk.
 */
export function validate(entries, { taxonomy, fileExists = () => true }) {
  const issues = [];
  const add = (p, severity, code, field, message) => issues.push({ id: p.id ?? null, sourceId: p.sourceId || null, name: p.name || null, severity, code, field, message });
  const cats = new Map(taxonomy.categories.map((c) => [c.id, new Set(c.subcategories.map((s) => s.id))]));
  const seen = { id: new Map(), sourceId: new Map(), slug: new Map(), image: new Map(), sku: new Map(), description: new Map() };
  const track = (kind, key, p) => { if (!key) return; const l = seen[kind].get(key) ?? []; l.push(p); seen[kind].set(key, l); };

  for (const { product: p } of entries) {
    if (!p.sourceId) add(p, "error", "missing-source-id", "sourceId", "Source record has no sourceId, so it cannot be given a permanent ID.");
    if (!p.name) add(p, "error", "missing-title", "name", "Missing product title.");
    if (!Number.isFinite(p.price) || p.price <= 0) add(p, "error", "missing-price", "price", "Missing or invalid price.");
    if (!p.description && !p.shortDescription) add(p, "error", "missing-description", "description", "Missing description.");
    if (!p.category) add(p, "error", "missing-category", "category", "Missing category.");
    else if (!cats.has(p.category)) add(p, "error", "invalid-category", "category", `Category "${p.category}" is not in data/taxonomy.json.`);
    else if (p.subcategory && !cats.get(p.category).has(p.subcategory)) add(p, "error", "invalid-subcategory", "subcategory", `Subcategory "${p.subcategory}" is not defined under "${p.category}".`);
    if (!p.subcategory) add(p, "warning", "missing-subcategory", "subcategory", "No subcategory; product appears only at category level.");

    const primaries = p.images.filter((i) => i.kind === "primary");
    if (!p.images.length) add(p, "error", "missing-image", "images", "Product has no images.");
    else if (!primaries.length) add(p, "error", "missing-primary-image", "images", "No primary image.");
    const colorIds = new Set(p.colors.map((c) => c.id));
    for (const im of p.images) {
      if (!im.src) { add(p, "error", "invalid-image", "images", "Image with empty src."); continue; }
      const remote = /^https?:\/\//.test(im.src);
      if (!remote && !im.src.startsWith(`/media/products/${p.slug}/`)) add(p, "error", "foreign-image", "images", `Image ${im.src} is outside this product's media folder.`);
      if (!remote && !fileExists(im.src)) add(p, "error", "image-not-found", "images", `Image file ${im.src} does not exist.`);
      if (im.color && !colorIds.has(im.color)) add(p, "error", "image-color-mismatch", "images", `Image ${im.src} is tagged with colour "${im.color}" which this product does not offer.`);
      track("image", im.src, p);
    }
    for (const c of p.colors) if (!primaries.some((i) => i.color === c.id) && p.colors.length > 1) add(p, "warning", "color-without-image", "images", `Colour "${c.name}" has no dedicated primary image.`);

    const sizeSet = new Set(p.sizes);
    const vids = new Set();
    for (const v of p.variants) {
      if (!v.id.startsWith(`${p.id}-`) && v.id !== p.id) add(p, "error", "variant-id", "variants", `Variant ${v.id} is not scoped to ${p.id}.`);
      if (vids.has(v.id)) add(p, "error", "duplicate-variant", "variants", `Duplicate variant ${v.id}.`);
      vids.add(v.id);
      if (v.sku) { const l = seen.sku.get(v.sku) ?? []; l.push(p); seen.sku.set(v.sku, l); }
      if (v.color && !colorIds.has(v.color)) add(p, "error", "variant-color", "variants", `Variant ${v.sku} uses colour "${v.color}" not listed on the product.`);
      if (v.size && !sizeSet.has(v.size)) add(p, "error", "variant-size", "variants", `Variant ${v.sku} uses size "${v.size}" not listed on the product.`);
      if (!Number.isFinite(v.price) || v.price <= 0) add(p, "error", "variant-price", "variants", `Variant ${v.sku} has an invalid price.`);
    }
    track("id", p.id, p); track("sourceId", p.sourceId, p); track("slug", p.slug, p); track("description", p.description, p);
  }

  const duplicates = [];
  for (const [kind, severity] of [["id", "error"], ["sourceId", "error"], ["slug", "error"], ["image", "error"], ["sku", "error"], ["description", "warning"]]) {
    for (const [key, list] of seen[kind]) {
      if (list.length < 2) continue;
      duplicates.push({ field: kind, value: key, ids: list.map((p) => p.id) });
      for (const p of new Set(list)) add(p, severity, `duplicate-${kind.toLowerCase()}`, kind, list.every((o) => o === p) ? `${kind} "${key}" is repeated within this product.` : `${kind} "${key}" is shared with ${[...new Set(list.filter((o) => o !== p).map((o) => o.id))].join(", ")}.`);
    }
  }
  return { issues, duplicates };
}

/** Runs the whole pipeline. Returns { registry, products, invalid, report }. */
export function buildCatalog({ sources, registry, taxonomy, fileExists, exclusions, now = new Date().toISOString() }) {
  const reg = assignIds(registry, sources);
  const entries = [];
  for (const { source, records } of sources) {
    records.forEach((record, index) => {
      const id = record?.sourceId ? reg.entries[registryKey(source, record.sourceId)] : `UNASSIGNED-${source}-${index + 1}`;
      entries.push({ source, index, record, product: normalize(record, { id, source }) });
    });
  }
  const { issues, duplicates } = validate(entries, { taxonomy, fileExists });
  const bad = new Set(issues.filter((i) => i.severity === "error").map((i) => i.id));
  const products = entries.filter((e) => !bad.has(e.product.id)).map((e) => e.product).sort((a, b) => a.id.localeCompare(b.id));
  const invalid = entries.filter((e) => bad.has(e.product.id)).map((e) => ({ id: e.product.id, sourceId: e.product.sourceId, source: e.source, row: e.index + 1, name: e.product.name }));

  const liveKeys = new Set(sources.flatMap(({ source, records }) => records.filter((r) => r?.sourceId).map((r) => registryKey(source, r.sourceId))));
  const retired = Object.entries(reg.entries).filter(([k]) => !liveKeys.has(k)).map(([key, id]) => ({ key, id }));

  const count = (code) => new Set(issues.filter((i) => i.code === code).map((i) => i.id)).size;
  const byCategory = {};
  for (const p of products) {
    const c = (byCategory[p.category] ??= { total: 0, subcategories: {} });
    c.total++;
    if (p.subcategory) c.subcategories[p.subcategory] = (c.subcategories[p.subcategory] ?? 0) + 1;
  }
  const sourceTotal = sources.reduce((n, s) => n + s.records.length, 0);
  // Per-category reconciliation: source count vs live count, by the category the SOURCE declares.
  const reconciliation = {};
  for (const e of entries) {
    const c = e.product.category || "(none)";
    const row = (reconciliation[c] ??= { source: 0, imported: 0, invalid: 0, missing: 0 });
    row.source++;
    if (bad.has(e.product.id)) row.invalid++; else row.imported++;
  }
  for (const row of Object.values(reconciliation)) row.missing = row.source - row.imported;
  const report = {
    generatedAt: now,
    sources: sources.map((s) => ({ source: s.source, file: s.file, records: s.records.length, authorised: s.authorised ?? null })),
    totals: {
      sourceRecords: sourceTotal,
      imported: products.length,
      invalid: invalid.length,
      missing: sourceTotal - products.length,
      duplicates: duplicates.filter((d) => d.field !== "description").length,
      noImage: count("missing-image") + count("missing-primary-image"),
      noPrice: count("missing-price"),
      noDescription: count("missing-description"),
      noCategory: count("missing-category") + count("invalid-category"),
      brokenImages: count("image-not-found") + count("foreign-image"),
      warnings: issues.filter((i) => i.severity === "warning").length,
      errors: issues.filter((i) => i.severity === "error").length,
    },
    byCategory,
    reconciliation,
    exclusions: exclusions ?? [],
    duplicates,
    invalid,
    retiredIds: retired,
    issues,
  };
  return { registry: reg, products, invalid, report };
}

/** Storefront categories: taxonomy entries that actually contain products. */
export function storefrontCategories(taxonomy, products) {
  return taxonomy.categories
    .map((c) => {
      const items = products.filter((p) => p.category === c.id);
      const subcategories = c.subcategories
        .map((s) => ({ id: s.id, slug: s.id, name: s.name, count: items.filter((p) => p.subcategory === s.id).length }))
        .filter((s) => s.count > 0);
      return { id: c.id, slug: c.id, name: c.name, tagline: c.tagline, description: c.description, image: c.image || items[0]?.images.find((i) => i.kind === "editorial")?.src || items[0]?.images[0]?.src || "", ...(c.banner ? { banner: c.banner } : {}), count: items.length, subcategories };
    })
    .filter((c) => c.count > 0);
}
