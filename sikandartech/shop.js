// Product catalogue page. Data: catalog.js (CATEGORIES, PRODUCTS), icons.js (ICONS).
const PAGE_SIZE = 36;
const STATUS_LABEL = { available: "Available now", coming: "Coming soon", emerging: "Emerging tech" };
const catById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
const productById = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

const params = new URLSearchParams(location.search);
const state = {
  cat: catById[params.get("cat")] ? params.get("cat") : "all",
  status: STATUS_LABEL[params.get("status")] ? params.get("status") : "all",
  q: params.get("q") || "",
  shown: PAGE_SIZE,
};

const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);

// Product picture: real photo if provided, otherwise an illustrated tile in the category colour
function media(p, size = "") {
  const c = catById[p.cat];
  if (p.photo) {
    return `<div class="p-media photo ${size}"><img src="${p.photo}" alt="${esc(p.name)}" loading="lazy"></div>`;
  }
  const v = "v" + ([...p.id].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7) % 4);
  return `<div class="p-media art ${v} ${size}" style="--c:${c.color}" role="img" aria-label="${esc(p.name)}">
    <span class="art-ring"></span>${iconSvg(p.icon, "art-icon")}
  </div>`;
}

function badge(status) {
  return `<span class="status-badge ${status}">${STATUS_LABEL[status]}</span>`;
}

function card(p) {
  const c = catById[p.cat];
  return `<article class="p-card" data-id="${p.id}" tabindex="0" aria-label="${esc(p.name)}">
    ${media(p)}
    <div class="p-body">
      <div class="p-meta"><span class="p-cat" style="--c:${c.color}">${esc(c.name)}</span>${badge(p.status)}</div>
      <h3>${esc(p.name)}</h3>
      <p>${esc(p.desc)}</p>
      <ul class="p-specs">${p.specs.slice(0, 3).map((s) => `<li>${esc(s)}</li>`).join("")}</ul>
      <div class="p-actions">
        <button class="btn btn-sm btn-ghost" data-open="${p.id}">Details</button>
        <a class="btn btn-sm" target="_blank" rel="noopener" href="${waLink(`Hi Sikandar Tech, I want a quote for: ${p.name} (${c.name})`)}">Get Quote</a>
      </div>
    </div>
  </article>`;
}

function filtered() {
  // Each search word must match the start of a word; products whose name matches rank first
  const words = state.q.toLowerCase().split(/\s+/).filter(Boolean);
  const res = words.map((w) => new RegExp("\\b" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  const list = [];
  PRODUCTS.forEach((p, i) => {
    if (state.cat !== "all" && p.cat !== state.cat) return;
    if (state.status !== "all" && p.status !== state.status) return;
    if (!res.length) return list.push({ p, score: 0, i });
    const name = p.name.toLowerCase();
    const hay = (name + " " + p.desc + " " + p.specs.join(" ") + " " + catById[p.cat].name).toLowerCase();
    if (!res.every((r) => r.test(hay))) return;
    const score = res.filter((r) => r.test(name)).length;
    list.push({ p, score, i });
  });
  return list.sort((a, b) => b.score - a.score || a.i - b.i).map((x) => x.p);
}

function syncUrl() {
  const u = new URLSearchParams();
  if (state.cat !== "all") u.set("cat", state.cat);
  if (state.status !== "all") u.set("status", state.status);
  if (state.q) u.set("q", state.q);
  const qs = u.toString();
  history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
}

function renderCats() {
  const total = PRODUCTS.length;
  const item = (id, name, count, icon, color) =>
    `<button class="${state.cat === id ? "active" : ""}" data-cat="${id}" style="--c:${color}">
      <span class="ci">${iconSvg(icon)}</span><span class="cn">${esc(name)}</span><span class="cc">${count}</span>
    </button>`;
  const html =
    item("all", "All Products", total, "layout-grid", "#0a66ff") +
    CATEGORIES.map((c) => item(c.id, c.name, c.count, c.icon, c.color)).join("");
  $("cat-list").innerHTML = html;
  $("cat-chips").innerHTML = html;
}

function render() {
  const list = filtered();
  const c = catById[state.cat];
  $("shop-title").textContent = c ? c.name : "All Products";
  $("shop-tagline").textContent = c ? c.tagline : "Advanced tech and gadgets sourced direct from China, with quality inspection and worldwide shipping.";
  document.title = (c ? c.name : "Product Catalogue") + " | SikandarTech";

  $("shop-count").textContent = `${list.length} product${list.length === 1 ? "" : "s"}${state.q ? ` for “${state.q}”` : ""}`;
  $("shop-grid").innerHTML = list.length
    ? list.slice(0, state.shown).map(card).join("")
    : `<div class="empty">No products found. Try another search, or <a href="${waLink(`Hi Sikandar Tech, I am looking for: ${state.q}`)}" target="_blank" rel="noopener">ask us on WhatsApp</a>, we can source almost anything.</div>`;
  $("load-more").hidden = list.length <= state.shown;
  $("load-more").textContent = `Load more (${list.length - state.shown} left)`;

  document.querySelectorAll("[data-cat]").forEach((b) => b.classList.toggle("active", b.dataset.cat === state.cat));
  document.querySelectorAll("#status-filter button").forEach((b) => b.classList.toggle("active", b.dataset.status === state.status));
  syncUrl();
}

// ---------- Product modal ----------
const modal = $("product-modal");

function openProduct(id, push = true) {
  const p = productById[id];
  if (!p) return;
  const c = catById[p.cat];
  $("modal-media").innerHTML = media(p, "lg");
  $("modal-cat").textContent = c.name;
  $("modal-cat").href = "?cat=" + c.id;
  $("modal-cat").style.setProperty("--c", c.color);
  $("modal-name").textContent = p.name;
  $("modal-status").className = "status-badge " + p.status;
  $("modal-status").textContent = STATUS_LABEL[p.status];
  $("modal-desc").textContent = p.desc;
  $("modal-specs").innerHTML = p.specs.map((s) => `<li>${esc(s)}</li>`).join("");
  $("modal-quote").href = waLink(`Hi Sikandar Tech, I want a quote for: ${p.name} (${c.name}). Please share price, MOQ and shipping.`);
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  $("modal-related").innerHTML = related
    .map((r) => `<button class="related" data-open="${r.id}">${media(r, "sm")}<span>${esc(r.name)}</span></button>`)
    .join("");
  if (push) history.replaceState(null, "", location.pathname + location.search + "#" + p.id);
  if (!modal.open) modal.showModal();
  modal.scrollTop = 0;
}

function closeProduct() {
  if (modal.open) modal.close();
}
modal.addEventListener("close", () => history.replaceState(null, "", location.pathname + location.search));
modal.addEventListener("click", (e) => { if (e.target === modal) closeProduct(); });
$("modal-close").addEventListener("click", closeProduct);
$("modal-share").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    $("modal-share").textContent = "Link copied";
  } catch {
    $("modal-share").textContent = location.href;
  }
  setTimeout(() => ($("modal-share").textContent = "Copy link"), 2000);
});

// ---------- Events ----------
document.addEventListener("click", (e) => {
  const open = e.target.closest("[data-open]");
  if (open) return openProduct(open.dataset.open);
  const catBtn = e.target.closest("[data-cat]");
  if (catBtn) {
    state.cat = catBtn.dataset.cat;
    state.shown = PAGE_SIZE;
    render();
    window.scrollTo({ top: document.querySelector(".shop").offsetTop - 70, behavior: "smooth" });
    return;
  }
  const cardEl = e.target.closest(".p-card");
  if (cardEl && !e.target.closest("a")) openProduct(cardEl.dataset.id);
});
document.addEventListener("keydown", (e) => {
  const cardEl = e.target.closest && e.target.closest(".p-card");
  if (cardEl && e.key === "Enter" && e.target === cardEl) openProduct(cardEl.dataset.id);
});
$("status-filter").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  state.status = b.dataset.status;
  state.shown = PAGE_SIZE;
  render();
});
let searchTimer;
$("shop-search").addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.q = e.target.value.trim();
    state.shown = PAGE_SIZE;
    render();
  }, 150);
});
$("load-more").addEventListener("click", () => {
  state.shown += PAGE_SIZE;
  render();
});

// ---------- Init ----------
$("shop-search").value = state.q;
$("shop-search").placeholder = `Search ${PRODUCTS.length} products...`;
renderCats();
render();
if (location.hash && productById[location.hash.slice(1)]) openProduct(location.hash.slice(1), false);
