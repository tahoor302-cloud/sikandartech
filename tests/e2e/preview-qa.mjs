import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const products = JSON.parse(readFileSync('../../data/products.json','utf8'));
const cats = JSON.parse(readFileSync('../../data/categories.json','utf8'));
const fmt = (n) => 'PKR ' + n.toLocaleString('en-US');
const results = []; const ok = (name, cond, info='') => results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${info ? '  — ' + info : ''}`);
const b = await chromium.launch();
for (const vp of [{ width: 1440, height: 900, tag: 'desktop' }, { width: 390, height: 844, tag: 'mobile', isMobile: true, hasTouch: true }]) {
  const p = await b.newPage({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile, hasTouch: vp.hasTouch });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  const go = async (r, t = 1600) => { await p.goto('http://localhost:4173/#' + r); await p.waitForTimeout(t); };
  const cards = () => p.$$eval('[data-grid-item] a[href*="/product/"]', as => [...new Set(as.map(a => a.getAttribute('href').split('/product/')[1]))]);
  await go('/products?per=96'); ok(`[${vp.tag}] /products lists every product`, (await cards()).length === products.length, `${(await cards()).length}/${products.length}`);
  for (const c of cats) {
    await go(`/category/${c.slug}?per=96`, 1300);
    const ids = await cards(); const exp = products.filter(x => x.category === c.id).map(x => x.id).sort();
    ok(`[${vp.tag}] /category/${c.slug}`, JSON.stringify(ids.sort()) === JSON.stringify(exp), `${ids.length}/${exp.length}`);
    for (const s of c.subcategories) {
      await go(`/category/${c.slug}/${s.slug}`, 1100);
      const sid = (await cards()).sort(); const sexp = products.filter(x => x.category === c.id && x.subcategory === s.id).map(x => x.id).sort();
      ok(`[${vp.tag}]   /category/${c.slug}/${s.slug}`, JSON.stringify(sid) === JSON.stringify(sexp), `${sid.length}`);
    }
    // two products per category (first + last) — PDP shows only its own data
    for (const prod of [products.filter(x => x.category === c.id)[0], products.filter(x => x.category === c.id).at(-1)]) {
      await go(`/product/${prod.id}`, 2400);
      const txt = (await p.evaluate(() => document.querySelector('main')?.innerText ?? document.body.innerText)).replace(/\u00a0/g, ' ');
      const imgs = await p.$$eval('[data-gallery] img', is => is.map(i => i.getAttribute('src') || ''));
      const own = imgs.filter(s => s.includes('media/'));
      const foreign = own.filter(s => !s.includes(`/products/${prod.slug}/`));
      ok(`[${vp.tag}]   PDP ${prod.id} ${prod.name}`, txt.includes(prod.name) && txt.includes(fmt(prod.price)) && txt.includes(prod.id) && foreign.length === 0 && own.length >= 4, foreign.length ? 'foreign: ' + foreign.join(',') : `${own.length} imgs name=${txt.includes(prod.name)} price=${txt.includes(fmt(prod.price))} id=${txt.includes(prod.id)} :: ${JSON.stringify(txt.slice(0,160))}`);
    }
  }
  await go('/products?q=SM-000019'); const s1 = await cards(); ok(`[${vp.tag}] search by ID`, s1[0] === 'SM-000019', s1.join(','));
  await go('/products?q=SMM-0007'); const s2 = await cards(); ok(`[${vp.tag}] search by source ID`, s2[0] === 'SM-000007', s2.join(','));
  await go('/products?sort=price-asc&per=96'); const asc = (await cards()).map(id => products.find(x => x.id === id).price);
  ok(`[${vp.tag}] sort price low→high`, asc.every((v, i) => !i || asc[i-1] <= v));
  await go('/products?sort=name&per=96'); const az = (await cards()).map(id => products.find(x => x.id === id).name);
  ok(`[${vp.tag}] sort A→Z`, az.every((v, i) => !i || az[i-1].localeCompare(v) <= 0));
  await go('/products?color=noir&per=96'); const noir = await cards();
  ok(`[${vp.tag}] colour filter`, noir.length === products.filter(x => x.colors.some(c => c.id === 'noir')).length, `${noir.length}`);
  await go('/products?per=6&page=2'); const pg = await cards(); ok(`[${vp.tag}] pagination page 2`, pg.length === 6);
  // cart
  await go('/product/SM-000015', 1600);
  await p.getByRole('button', { name: /add to bag/i }).first().click(); await p.waitForTimeout(1200);
  const bag = await p.evaluate(() => document.body.innerText);
  ok(`[${vp.tag}] add to bag opens drawer with line`, /Bag \(1\)/i.test(bag) && bag.includes('Maison Tote'));
  await go('/catalog-audit', 1600); const au = await p.evaluate(() => document.body.innerText);
  ok(`[${vp.tag}] catalog audit`, au.includes(`${products.length} of ${products.length} source records are live`) && au.includes('wgstores-reference-store'));
  ok(`[${vp.tag}] no runtime errors`, errs.length === 0, errs.slice(0,3).join(' | '));
  await p.close();
}
await b.close();
console.log(results.join('\n')); console.log(results.filter(r => r.startsWith('FAIL')).length + ' failures / ' + results.length);
