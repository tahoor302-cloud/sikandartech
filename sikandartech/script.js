// ===== Contact details: edit only this block =====
// whatsapp: country code + number, digits only (used for wa.me links)
// Leave wechat, phone or tiktok empty ("") to hide that item.
const CONTACT = {
  whatsapp: "8613640225991", // China WhatsApp: receives all quote requests and enquiries
  whatsappDisplay: "+86 136 4022 5991",
  wechat: "+92 302 222 5991",
  phone: "+86 136 4022 5991", // China phone
  email: "info@sikandartech.com",
  tiktok: "sikandarpanjwani1", // TikTok username without @
  instagram: "https://www.instagram.com/sikandar_panjwani/",
  facebook: "https://www.facebook.com/sikandar.punjwani/"
};

// Pages in sub-folders (shop/, category/<id>/, product/<id>/) set <html data-root="../">
// so links and images resolve from the site root on any host or sub-path.
const ROOT = document.documentElement.dataset.root || "";
const URLS = {
  home: ROOT || "./",
  shop: (qs = "") => ROOT + "shop/" + qs,
  cat: (id) => ROOT + "category/" + id + "/",
  product: (id) => ROOT + "product/" + id + "/",
  asset: (path) => (/^(https?:|data:|\/)/.test(path) ? path : ROOT + path)
};

const waLink = (text) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
// Full address of a product page. WhatsApp turns the first link in a message into a preview
// with the product photo (from the page's og:image), so Sikandar sees the picture with the request.
const productPageUrl = (id) => new URL(URLS.product(id), location.href).href;
const tiktokUrl = () => "https://www.tiktok.com/@" + CONTACT.tiktok.replace(/^@/, "");
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]);
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE_POINTER = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// Inline SVG for a Tabler icon name (see icons.js)
function iconSvg(name, cls = "") {
  const body = (typeof ICONS !== "undefined" && ICONS[name]) || "";
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

// ---------- Header ----------
const header = document.querySelector(".header");
if (header && !header.classList.contains("solid")) {
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  const setMenu = (open) => {
    links.classList.toggle("open", open);
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", open);
    toggle.innerHTML = iconSvg(open ? "x" : "menu");
  };
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
}
document.querySelectorAll("[data-ui-icon]").forEach((el) => (el.innerHTML = iconSvg(el.dataset.uiIcon)));
document.querySelectorAll("[data-icon]").forEach((el) => (el.innerHTML = iconSvg(el.dataset.icon)));

// ---------- Scroll reveals ----------
function observeReveals(root = document) {
  const els = root.querySelectorAll(".rv:not(.in), .mask:not(.in), [data-reveal]:not(.in)");
  if (REDUCED || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  els.forEach((el) => revealObserver.observe(el));
}
const revealObserver =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              revealObserver.unobserve(e.target);
            }
          }),
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
      )
    : null;

// ---------- Contact form -> WhatsApp ----------
const contactForm = $("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(contactForm);
    let ok = true;
    contactForm.querySelectorAll("[required]").forEach((input) => {
      const bad = !input.value.trim();
      input.closest(".field").classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) return;
    const text =
      `Hello SikandarTech,\n\nI would like a quotation.\n\n` +
      `Name: ${d.get("name")}\nContact: ${d.get("contact")}\n` +
      `Product: ${d.get("product") || "-"}\nDetails: ${d.get("message") || "-"}\n\n` +
      `Please share pricing, MOQ, lead time and shipping options.\n\nThank you.`;
    window.open(waLink(text), "_blank", "noopener");
  });
}

// ---------- Contact details ----------
const hello = waLink("Hello SikandarTech,\n\nI would like help sourcing a product. Could you please assist?\n\nThank you.");
document.querySelectorAll("[data-wa]").forEach((a) => (a.href = hello));
if ($("whatsapp-link")) $("whatsapp-link").textContent = CONTACT.whatsappDisplay;
if ($("wechat-id")) {
  $("wechat-id").textContent = CONTACT.wechat;
  $("wechat-row").hidden = !CONTACT.wechat;
}
if ($("phone-link")) {
  $("phone-link").textContent = CONTACT.phone;
  $("phone-link").href = "tel:" + CONTACT.phone.replace(/[^\d+]/g, "");
  $("phone-row").hidden = !CONTACT.phone;
}
if ($("email-link")) {
  $("email-link").textContent = CONTACT.email;
  $("email-link").href = "mailto:" + CONTACT.email;
}
document.querySelectorAll("[data-social]").forEach((a) => {
  const k = a.dataset.social;
  const url = k === "tiktok" ? (CONTACT.tiktok ? tiktokUrl() : "") : CONTACT[k];
  if (url) a.href = url;
  else a.hidden = true;
});
document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
