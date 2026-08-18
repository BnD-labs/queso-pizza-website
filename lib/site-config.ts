// lib/site-config.ts
// SINGLE SOURCE OF TRUTH for site constants (phones, address, hours, meta).
// Menu items/prices live in lib/menu-data.ts — never here.
// Fields marked UNCONFIRMED block launch until verified (see CLAUDE.md design deltas).

export const SITE = {
  name: "Queso Pizza",
  tagline: "The taste that stays with you.",
  domain: "quesopizza.com",
  footerYear: 2026, // per CLAUDE.md: 2026, not the mockup's 2024

  phones: {
    // Confirmed delivery lines (shown on Home hero delivery badge + Contact)
    delivery1: "+260976056200", // displayed as (+260) 97 6056 200
    delivery2: "+260979818919", // displayed as (+260) 97 9818 919
    // CONFIRMED 2026-07-29 by Brandon: this is the correct WhatsApp order line,
    // verified by a real-device end-to-end order test (pre-filled message
    // arrived correctly formatted; paired tel: dial reached staff).
    whatsappOrder: "+260976056200",
    // CONFIRMED 2026-07-29 — same line, exercised by the same device test.
    callToConfirm: "+260976056200",
  },

  address: {
    plusCode: "MMFH+7WQ",
    area: "Chongwe Central",
    road: "Great East Road",
    city: "Chongwe, Lusaka Province, Zambia",
    // The same address split into schema.org PostalAddress components. These
    // restate the confirmed line above — no new facts, and no landmark, which
    // is still UNCONFIRMED and must not be asserted to search engines.
    locality: "Chongwe",
    region: "Lusaka Province",
    country: "ZM",
    // UNCONFIRMED — verify with Arthur: "next to" vs "opposite" Access Bank.
    // Render with the italic/placeholder styling from the design until confirmed.
    landmark: "near Access Bank",
  },

  // CONFIRMED by Brandon, 2026-07-14: Mon–Fri 8am–8pm, Sat–Sun 8am–7pm.
  // Displayed as two rows: Mon–Fri and Sat–Sun.
  hours: {
    weekdays: { label: "Mon – Fri", open: "08:00", close: "20:00" },
    weekend: { label: "Sat – Sun", open: "08:00", close: "19:00" },
  },
} as const;

const MAPS_QUERY = encodeURIComponent(
  `${SITE.address.plusCode} ${SITE.address.city}`,
);

/** Opens Google Maps at the store's plus code (directions / "Get Directions"). */
export const MAPS_SEARCH_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

/** Keyless Google Maps iframe embed centered on the store's plus code. */
export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${MAPS_QUERY}&z=16&output=embed`;

/** Formats an E.164 number like +260976056200 as "(+260) 97 6056 200" for display. */
export function formatPhone(e164: string): string {
  const m = e164.match(/^\+260(\d{2})(\d{4})(\d{3})$/);
  return m ? `(+260) ${m[1]} ${m[2]} ${m[3]}` : e164;
}

/** Formats a 24h "HH:MM" time as "08:00 AM" / "9:00 PM" for display. */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${suffix}`;
}
