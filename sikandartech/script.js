// ===== Contact details: edit only this block =====
// whatsapp: country code + number, digits only (used for wa.me links)
// Leave wechat or phone empty ("") to hide that row.
const CONTACT = {
  whatsapp: "923022225991",
  whatsappDisplay: "+92 302 222 5991",
  wechat: "+92 302 222 5991",
  phone: "+86 136 4022 5991", // China phone
  email: "info@sikandartech.com",
  tiktok: "sikandarpanjwani1" // TikTok username without @; empty hides the button
};
const WHATSAPP_NUMBER = CONTACT.whatsapp;

const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const $ = (id) => document.getElementById(id);

// Inline SVG for a Tabler icon name (see icons.js)
function iconSvg(name, cls = "") {
  const body = (typeof ICONS !== "undefined" && ICONS[name]) || "";
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

// ---------- Mobile menu ----------
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", false);
    })
  );
}

// ---------- Home: categories ----------
if (typeof CATEGORIES !== "undefined") {
  const total = PRODUCTS.length;
  const rounded = Math.floor(total / 10) * 10 + "+";
  if ($("stat-products")) $("stat-products").textContent = rounded;
  if ($("cat-summary")) $("cat-summary").textContent = `${total} products in ${CATEGORIES.length} categories`;

  const grid = $("cat-grid");
  if (grid) {
    grid.innerHTML = CATEGORIES.map(
      (c) => `
      <a class="cat-tile" href="products.html?cat=${c.id}" style="--c:${c.color}">
        <span class="cat-icon">${iconSvg(c.icon)}</span>
        <span class="cat-text">
          <strong>${c.name}</strong>
          <small>${c.count} products</small>
        </span>
        <span class="cat-arrow">&rarr;</span>
      </a>`
    ).join("");
  }
  document.querySelectorAll("[data-icon]").forEach((el) => (el.innerHTML = iconSvg(el.dataset.icon)));
}

// ---------- Contact form -> WhatsApp ----------
const form = $("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(e.target);
    const text =
      `Name: ${d.get("name")}\nContact: ${d.get("contact")}\n` +
      `Product: ${d.get("product")}\nMessage: ${d.get("message")}`;
    window.open(waLink(text), "_blank");
  });
}

// ---------- Contact details ----------
const hello = waLink("Hi Sikandar Tech, I need help sourcing a product.");
if ($("whatsapp-link")) {
  $("whatsapp-link").href = hello;
  $("whatsapp-link").textContent = CONTACT.whatsappDisplay;
}
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
if ($("whatsapp-float")) $("whatsapp-float").href = hello;
if ($("tiktok-link")) {
  $("tiktok-link").href = "https://www.tiktok.com/@" + CONTACT.tiktok.replace(/^@/, "");
  $("tiktok-link").hidden = !CONTACT.tiktok;
}
if ($("year")) $("year").textContent = new Date().getFullYear();
