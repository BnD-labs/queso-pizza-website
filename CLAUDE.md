# Queso Pizza — Project Constitution (v2, design-locked)

Read this file at the start of every session in this repo. It supersedes generic assumptions and the v1 constitution — this is how *this* project works. The UI design is FINAL (Figma, July 2026). Build to match it, with the corrections listed in "Design deltas" below.

## What this is
A 4-page, mobile-first marketing + ordering site for Queso Pizza, a fast-food restaurant in Chongwe, Lusaka, Zambia. No cart, no payment gateway, no accounts, no CMS. The site's job: look premium, show the menu well, route orders to WhatsApp and a confirmation phone call.

## Tech stack
- Next.js (App Router) + TypeScript + TailwindCSS + React
- No database. Fully static/client-rendered. Do not add Supabase/Firebase/any backend.
- Hosting: Cloudflare Pages (static export, `output: "export"`). DNS: Cloudflare. Domain: `quesopizza.com`.
- Mobile-first (390px design frames). Desktop = responsive Tailwind breakpoints applied sensibly to the same layouts; no bespoke desktop design exists.

## Brand system — locked
**Colors** (Tailwind theme tokens, never raw hex in JSX):
- `queso-red`: `#CC1010`
- `queso-black`: `#0F0F0F`
- `queso-yellow`: `#FDFC00`
- `queso-cream`: `#FFF8F0`
- Supporting dark surfaces from the design: `#131313` (base), `#1C1B1B` (surface-low), `#201F1F` (surface), `#2A2A2A` (surface-high), `#0E0E0E` (footer/lowest)
- `whatsapp-green`: `#29D51A` — APPROVED EXCEPTION, WhatsApp action buttons ONLY (platform recognition). Never use for any other element.

**Banned colors:** the salmon/pink `#FFB4A9` and lime `#EBEA00` from the old Stitch M3 palette appear throughout the Figma CSS export — these are token drift, NOT brand. Wherever the design shows salmon (labels like "VISIT US", icons, active footer links), use `queso-red` for accents/active states or cream at 60-70% opacity for muted labels. Wherever lime yellow appears (star icons), use `queso-yellow`.

**Shape: zero roundedness.** The Figma export contains border-radius values (4/5/8/10/12px) — these are tool artifacts, not design intent. Every button, card, badge, input, and image container ships with sharp 90° corners (`rounded-none`). The ONLY exceptions: the map pin dot and the cart count badge may stay circular.

**Typography:** Epilogue (display/headlines, 700-800), Inter (body/labels). Google Fonts via next/font.
**Logo:** dark-version lockup (white mark on black). No literal pizza imagery in iconography.
**Voice:** confident, warm, local, direct. Tagline: "The taste that stays with you."
**Footer year:** 2026, not 2024.

## Pages (exactly 4)
`/` Home, `/menu` Menu & Order, `/about` Our Story (cream `#FFF8F0`-adjacent light background per design), `/contact` Find Us. Match the final Figma layouts section-for-section. Shared components: TopAppBar, Footer, sticky BottomNavBar (dual CTA).

## Menu data — single source of truth
ALL menu items, prices, and sizes live in `lib/menu-data.ts` (provided — do not modify values without explicit instruction). The Figma mockup's displayed pizza prices (K85/K100/K80) are WRONG — the data file is authoritative. Card default price = Small size. Price updates live with the S/M/L/XL selector.

Data facts:
- Pizza: 6 classic + 4 special items, all sized S/M/L/XL
- Special pizzas get a yellow "SPECIAL" badge
- Shawarma (4 items) and Fries (4 items): flat-priced, no size selector
- Extra Cheese: S K10 / M K15 / L K20 / XL K25. Extra Toppings: no pricing yet — render "Pricing available in-store", never a number
- Beverages: NO real data — render the category as the flagged placeholder module from the design
- Delivery is real: (+260) 97 6056 200 and (+260) 97 9818 919 — delivery badge on Home hero and Contact

## Order Builder Spec (`/menu`) — core feature
1. Tap to add items; quantity stepper per added item; pizzas require a size selection (S/M/L/XL)
2. Persistent running-order summary while browsing (sticky panel/drawer): items, sizes, quantities, running total in Kwacha
3. On submit: compile itemized order text (name, size, qty, line total, order total) → open `wa.me/<number>?text=<url-encoded>`
4. PAIRED call-to-confirm: a `tel:` button presented alongside the WhatsApp send, equal visual weight, framed positively ("Order sent! Tap to call and confirm"). The on-site phone can't receive WhatsApp — the call reaches staff directly. This is load-bearing, not decorative.
See `.claude/skills/whatsapp-order-builder/` before touching this component.

## Design deltas — where the build must knowingly differ from the Figma export
1. Pizza card prices → from data file, not mockup values
2. Hours: the mockup's "Mon–Fri 08:00–9:00 PM / Sun–Sat 08:00–7:00 PM" is contradictory AND unconfirmed. Render hours from a single constant in `lib/site-config.ts` marked `// UNCONFIRMED — verify with Arthur before launch`, displayed as Mon–Fri and Sat–Sun rows.
3. Home page "SARAH M., GOOGLE REVIEWS" quote is FABRICATED — replace with the same GBP-reviews placeholder module used on Contact. Never render invented review text.
4. Address: "MMFH+7WQ, Chongwe, next to Access Bank" — landmark wording ("next to" vs "opposite") unconfirmed; keep the italic/placeholder styling from the design and the `// UNCONFIRMED` marker in site-config.
5. Sharp corners enforced everywhere (see Shape above)
6. Salmon/lime tokens remapped (see Banned colors)
7. TWO ADDITIVE COMPONENTS not in the final mockup, build from spec in Phase 3:
   - Floating "Most Ordered" card overlapping the Home hero: small dark elevated card, item photo thumb, name, yellow "MOST ORDERED" badge, price, red quick-add → deep-links to /menu with that item pre-added
   - "Perfect Pairings" cross-sell strip on /menu: after any item is added, horizontal row of circular photo chips (fries, drinks, sides) with red "+" — one tap adds to order

## Content & placeholder conventions
- Real photography only (assets exported from Figma/provided by Brandon). No stock.
- Missing photography (beverages, reviews) → dashed-border + icon placeholder convention, exactly as the design shows
- Menu data only from `lib/menu-data.ts`; site constants (phones, address, hours, socials) only from `lib/site-config.ts`

## Explicit boundaries — never build unless instructed
No cart/checkout, no payments, no login, no CMS, no extra pages, no backend, no analytics yet (GA4 was old-scope; add only if asked).

## Process
Work phase-by-phase per the implementation plan; stop and confirm at each phase gate. Commit per phase. QC against the Web Projects QC Checklist before anything is called done.
