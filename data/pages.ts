/** Static informational pages. Template copy — replace with your approved policies. */
export interface InfoPage { slug: string; eyebrow: string; title: string; sections: { heading: string; body: string[] }[] }

export const infoPages: InfoPage[] = [
  {
    slug: "shipping", eyebrow: "Client care", title: "Shipping",
    sections: [
      { heading: "Delivery", body: ["Complimentary delivery. Our concierge confirms pricing and delivery details with you before dispatch.", "Orders are dispatched within 24–48 hours. Major cities typically receive orders within 2–4 working days."] },
      { heading: "Packaging", body: ["Every object is wrapped in tissue, placed in a dust bag and packed in a Super Mimic box."] },
      { heading: "Tracking", body: ["You’ll receive a tracking link by SMS and email as soon as your order leaves us."] },
    ],
  },
  {
    slug: "returns", eyebrow: "Client care", title: "Returns",
    sections: [
      { heading: "14-day returns", body: ["Unworn items in original packaging may be returned or exchanged within 14 days of delivery."] },
      { heading: "How to return", body: ["Contact our concierge with your order number and we’ll arrange a collection."] },
      { heading: "Refunds", body: ["Refunds are issued to the original payment method within 7 working days of inspection."] },
    ],
  },
  {
    slug: "privacy", eyebrow: "Legal", title: "Privacy",
    sections: [
      { heading: "What we collect", body: ["Information you provide at checkout or when creating an account, and anonymous analytics about how the site is used."] },
      { heading: "How we use it", body: ["To fulfil orders, provide client care and — only with your consent — send news about new collections."] },
      { heading: "Your rights", body: ["You may request access to, correction of, or deletion of your personal data at any time."] },
    ],
  },
  {
    slug: "terms", eyebrow: "Legal", title: "Terms",
    sections: [
      { heading: "Orders", body: ["All orders are subject to availability and confirmation of the order price."] },
      { heading: "Pricing", body: ["Prices are confirmed by our concierge in US Dollars (USD) before an order is finalised."] },
      { heading: "Intellectual property", body: ["All designs, imagery and content on this site are the property of Super Mimic."] },
    ],
  },
  {
    slug: "contact", eyebrow: "Concierge", title: "Contact",
    sections: [
      { heading: "Email", body: ["concierge@supermimic.net — we reply within one working day."] },
      { heading: "Hours", body: ["Monday to Saturday, 10:00–19:00 PKT."] },
      { heading: "Private appointments", body: ["Request a private viewing or styling appointment through our concierge."] },
    ],
  },
];
