// Shop and category pages (shop/, category/<id>/). Shared product UI lives in shop-core.js.
// The category comes from the page itself; search, availability and sorting stay in the URL
// query (?q=, ?status=, ?sort=) so filtered views can be shared.
const PAGE_SIZE = 36;
const params = new URLSearchParams(location.search);
const pageCat = catById[document.body.dataset.cat] ? document.body.dataset.cat : "all";

// Old links such as shop/?cat=audio go to the category page
if (pageCat === "all" && catById[params.get("cat")]) {
  const rest = new URLSearchParams(params);
  rest.delete("cat");
  const qs = rest.toString();
  location.replace(URLS.cat(params.get("cat")) + (qs ? "?" + qs : "") + location.hash);
}

const SORTS = ["featured", "az", "available"];
const state = {
  cat: pageCat,
  status: STATUS_LABEL[params.get("status")] ? params.get("status") : "all",
  sort: SORTS.includes(params.get("sort")) ? params.get("sort") : "featured",
  q: (params.get("q") || "").slice(0, 80),
  shown: Math.max(PAGE_SIZE, Math.min(PRODUCTS.length, (history.state && history.state.shown) | 0)),
  fuzzy: false
};

// ---------- Search ----------
const norm = (s) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9+.]+/g, " ").trim();
const haystack = new Map(PRODUCTS.map((p) => [p.id, norm(`${p.name} ${p.desc} ${p.specs.join(" ")} ${catById[p.cat].name}`)]));
const vocab = [...new Set([...haystack.values()].join(" ").split(" ").filter((w) => w.length > 2))];

// Edit distance (bounded) for typo tolerance: "hedphones" finds "headphones"
function close(a, b, max) {
  if (Math.abs(a.length - b.length) > max) return false;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      best = Math.min(best, cur[j]);
    }
    if (best > max) return false;
    prev = cur;
  }
  return prev[b.length] <= max;
}

function matcher(words) {
  const res = words.map((w) => new RegExp("(^|\\s)" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  return (text) => res.every((r) => r.test(text));
}

function filtered() {
  state.fuzzy = false;
  const base = PRODUCTS.filter((p) => (state.cat === "all" || p.cat === state.cat) && (state.status === "all" || p.status === state.status));
  let words = norm(state.q).split(" ").filter(Boolean);
  let list = base;
  if (words.length) {
    let test = matcher(words);
    list = base.filter((p) => test(haystack.get(p.id)));
    if (!list.length) {
      // No exact match: replace each word with the closest catalogue words
      const alts = words.map((w) => (w.length < 4 ? [w] : vocab.filter((v) => close(w, v, w.length > 6 ? 2 : 1)).slice(0, 6)));
      if (alts.every((a) => a.length)) {
        list = base.filter((p) => alts.every((a) => a.some((w) => matcher([w])(haystack.get(p.id)))));
        state.fuzzy = list.length > 0;
        if (state.fuzzy) words = alts.flat();
      }
    }
    // Products whose name matches rank first
    const nameScore = (p) => words.filter((w) => norm(p.name).includes(w)).length;
    list = list.map((p, i) => ({ p, i, s: nameScore(p) })).sort((a, b) => b.s - a.s || a.i - b.i).map((x) => x.p);
  }
  if (state.sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
  if (state.sort === "available") {
    const rank = { available: 0, coming: 1, emerging: 2 };
    list = [...list].sort((a, b) => rank[a.status] - rank[b.status]);
  }
  return list;
}

function syncUrl() {
  const u = new URLSearchParams();
  if (state.q) u.set("q", state.q);
  if (state.status !== "all") u.set("status", state.status);
  if (state.sort !== "featured") u.set("sort", state.sort);
  const qs = u.toString();
  // How many products are shown is kept in history, so Back from a product page returns to the same
  // spot in a long list instead of the first page.
  history.replaceState({ shown: state.shown }, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
  // Filtered views are not separate pages for search engines
  let robots = document.querySelector('meta[name="robots"]');
  if (qs && !robots) {
    robots = document.createElement("meta");
    robots.name = "robots";
    document.head.appendChild(robots);
  }
  if (robots) robots.content = qs ? "noindex, follow" : "index, follow";
}

function emptyState() {
  const where = state.cat === "all" ? "the shop" : catById[state.cat].name;
  const ask = waLink(`Hello SikandarTech,\n\nI am looking for: ${state.q || "a product"}\nI could not find it on your website. Could you please help me source it?\n\nThank you.`);
  return `<div class="empty">
    ${iconSvg("search")}
    <h2>No products found${state.q ? ` for “${esc(state.q)}”` : ""}</h2>
    <p>Nothing in ${esc(where)} matches${state.status !== "all" ? ` with “${esc(STATUS_LABEL[state.status])}”` : ""}. Try a shorter search or clear the filters. We can also source products that are not listed.</p>
    <div class="state-actions">
      <button class="btn btn-line btn-sm" type="button" data-clear-filters>Clear filters</button>
      ${state.cat !== "all" ? `<a class="btn btn-line btn-sm" href="${URLS.shop()}${state.q ? "?q=" + encodeURIComponent(state.q) : ""}">Search all categories</a>` : ""}
      <a class="btn btn-sm" href="${ask}" target="_blank" rel="noopener">${iconSvg("brand-whatsapp")}Ask us to source it</a>
    </div>
  </div>`;
}

function render({ animate = true } = {}) {
  const list = filtered();
  const n = list.length;
  $("shop-count").textContent = `${n} product${n === 1 ? "" : "s"}${state.q ? ` for “${state.q}”` : ""}${state.fuzzy ? " (closest matches)" : ""}`;
  $("shop-grid").innerHTML = n
    ? list.slice(0, state.shown).map((p, i) => productCard(p, { reveal: animate, delay: (i % 3) * 0.06 })).join("")
    : emptyState();
  const more = $("load-more");
  more.hidden = n <= state.shown;
  more.textContent = `Load more (${n - state.shown} left)`;
  document.querySelectorAll("#status-filter [data-status]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.status === state.status));
  $("shop-sort").value = state.sort;
  syncUrl();
  observeReveals($("shop-grid"));
}

document.addEventListener("click", (e) => {
  const st = e.target.closest("#status-filter [data-status]");
  if (st) {
    state.status = st.dataset.status;
    state.shown = PAGE_SIZE;
    render();
  }
  if (e.target.closest("[data-clear-filters]")) {
    state.q = "";
    state.status = "all";
    state.shown = PAGE_SIZE;
    $("shop-search").value = "";
    render();
    $("shop-search").focus();
  }
});
$("shop-sort").addEventListener("change", (e) => {
  state.sort = e.target.value;
  state.shown = PAGE_SIZE;
  render({ animate: false });
});
let searchTimer;
$("shop-search").addEventListener("input", (e) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    state.q = e.target.value.trim().slice(0, 80);
    state.shown = PAGE_SIZE;
    render();
  }, 160);
});
$("shop-search").addEventListener("keydown", (e) => {
  if (e.key === "Enter") e.target.blur();
});
$("load-more").addEventListener("click", () => {
  const before = state.shown;
  state.shown += PAGE_SIZE;
  // Add only the next page of cards instead of rebuilding the whole grid
  const list = filtered();
  $("shop-grid").insertAdjacentHTML("beforeend", list.slice(before, state.shown).map((p) => productCard(p)).join(""));
  const more = $("load-more");
  more.hidden = list.length <= state.shown;
  more.textContent = `Load more (${list.length - state.shown} left)`;
  syncUrl();
  const next = $("shop-grid").children[before];
  if (next) next.querySelector("a, button").focus({ preventScroll: true });
});

$("shop-search").value = state.q;
// Keep the selected category chip in view on small screens
const activeChip = document.querySelector("#cat-chips .active");
if (activeChip) {
  const box = $("cat-chips");
  box.scrollLeft = activeChip.offsetLeft - box.offsetLeft - (box.clientWidth - activeChip.offsetWidth) / 2;
}
render({ animate: false });
if (location.hash === "#search") {
  history.replaceState(history.state, "", location.pathname + location.search);
  $("shop-search").focus({ preventScroll: true });
}
