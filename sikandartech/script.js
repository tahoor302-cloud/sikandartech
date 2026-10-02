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

// ---------- Mobile menu ----------
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
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

// ---------- Products ----------
const grid = document.getElementById("product-grid");
const filtersEl = document.getElementById("filters");
const searchEl = document.getElementById("search");
const countEl = document.getElementById("result-count");

const categories = ["All", ...new Set(PRODUCTS.map((p) => p.category))];
let activeCategory = "All";

categories.forEach((cat) => {
  const btn = document.createElement("button");
  btn.className = "filter" + (cat === "All" ? " active" : "");
  btn.textContent = cat;
  btn.addEventListener("click", () => {
    activeCategory = cat;
    filtersEl.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    render();
  });
  filtersEl.appendChild(btn);
});

function render() {
  const q = searchEl.value.trim().toLowerCase();
  const list = PRODUCTS.filter(
    (p) =>
      (activeCategory === "All" || p.category === activeCategory) &&
      (p.name + " " + p.features + " " + p.category).toLowerCase().includes(q)
  );

  grid.innerHTML = "";
  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card product";
    card.innerHTML = `
      <div class="product-icon">${p.icon}</div>
      <span class="tag">${p.category}</span>
      <h3>${p.name}</h3>
      <p>${p.features}</p>
      <a class="btn btn-sm" target="_blank" rel="noopener"
         href="${waLink(`Hi Sikandar Tech, I want a quote for: ${p.name}`)}">Get Quote</a>`;
    grid.appendChild(card);
  });

  countEl.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
}

searchEl.addEventListener("input", render);
render();

// ---------- Contact form -> WhatsApp ----------
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(e.target);
  const text =
    `Name: ${d.get("name")}\nContact: ${d.get("contact")}\n` +
    `Product: ${d.get("product")}\nMessage: ${d.get("message")}`;
  window.open(waLink(text), "_blank");
});

// ---------- Misc ----------
const hello = waLink("Hi Sikandar Tech, I need help sourcing a product.");
const waEl = document.getElementById("whatsapp-link");
waEl.href = hello;
waEl.textContent = CONTACT.whatsappDisplay;

document.getElementById("wechat-id").textContent = CONTACT.wechat;
document.getElementById("wechat-row").hidden = !CONTACT.wechat;

const phoneEl = document.getElementById("phone-link");
phoneEl.textContent = CONTACT.phone;
phoneEl.href = "tel:" + CONTACT.phone.replace(/[^\d+]/g, "");
document.getElementById("phone-row").hidden = !CONTACT.phone;

const emailEl = document.getElementById("email-link");
emailEl.textContent = CONTACT.email;
emailEl.href = "mailto:" + CONTACT.email;
document.getElementById("whatsapp-float").href = hello;

const tiktokEl = document.getElementById("tiktok-link");
tiktokEl.href = "https://www.tiktok.com/@" + CONTACT.tiktok.replace(/^@/, "");
tiktokEl.hidden = !CONTACT.tiktok;
document.getElementById("year").textContent = new Date().getFullYear();
