/** Type declarations for catalog-pipeline.mjs (plain JS, shared by the Node scripts and the TS tests). */
export const ID_PREFIX: string;
export const ID_WIDTH: number;
export const IMG: { width: number; height: number };
export function slugify(s: string): string;
export function formatId(n: number): string;
export function registryKey(source: string, sourceId: string): string;
export function assignIds(registry: any, sources: any[]): any;
export function normalize(record: Record<string, any>, opts: { id: string; source: string }): any;
export function validate(entries: any[], opts: { taxonomy: any; fileExists?: (src: string) => boolean }): { issues: any[]; duplicates: any };
export function buildCatalog(opts: { sources: any[]; registry: any; taxonomy: any; fileExists: (src: string) => boolean; exclusions?: any[]; now?: string }): { registry: any; products: any[]; report: any };
export function storefrontCategories(taxonomy: any, products: any[]): any[];
