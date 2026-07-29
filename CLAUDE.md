# Queso Pizza — Project Constitution (v3)

Read this file at the start of every session in this repo. It supersedes generic assumptions and the v1/v2 constitutions — this is how *this* project works.

**The Figma design-lock was lifted on 2026-07-26 (Brandon's call).** v2 declared the July 2026 Figma FINAL and instructed matching it section-for-section. That is no longer the standard. The Figma is now **reference, not contract**: the client judged the built result "incomplete, not premium," and granted full design latitude to rework layout, composition, spacing, hierarchy, and motion.

What remains genuinely locked, and must not be changed without a new explicit decision:
- The brand system — the four colors, the WhatsApp-green exception, sharp corners, Epilogue/Inter
- The four-page structure
- `lib/menu-data.ts` values and the WhatsApp + call-to-confirm order flow
- Every content rule below (no fabricated reviews, prices, or landmarks)

Do not "restore" the Figma layouts over the current build. The polish work on `design-polish` (2026-07-26) is deliberate and supersedes them.

## What this is
A 4-page, mobile-first marketing + ordering site for Queso Pizza, a fast-food restaurant in Chongwe, Lusaka, Zambia. No cart, no payment gateway, no accounts, no CMS. The site's job: look premium, show the menu well, route orders to WhatsApp and a confirmation phone call.

## Tech stack
- Next.js (App Router) + TypeScript + TailwindCSS + React
- No database. Fully static/client-rendered. Do not add Supabase/Firebase/any backend.
- Hosting: **Cloudflare Worker serving static assets** (static export, `output: "export"`). DNS: Cloudflare. Domain: `quesopizza.com`. NOT Cloudflare Pages — the client account no longer exposes a Pages creation flow. `wrangler.jsonc` is load-bearing: without it `wrangler deploy` auto-detects Next.js, assumes an SSR build, and fails. See `PHASE-6-LAUNCH.md`.
- Mobile-first (390px design frames). Desktop = responsive Tailwind breakpoints applied sensibly to the same layouts; no bespoke desktop design exists.

## Brand system — locked
**Colors** (Tailwind theme tokens, never raw hex in JSX):
- `queso-red`: `#CC1010`
- `queso-black`: `#0F0F0F`
- `queso-yellow`: `#FDFC00`
- `queso-cream`: `#FFF8F0`
- Supporting dark surfaces from the design: `#131313` (base), `#1C1B1B` (surface-low), `#201F1F` (surface), `#2A2A2A` (surface-high), `#0E0E0E` (footer/lowest)
- `whatsapp-green`: `#25D366` — APPROVED EXCEPTION, WhatsApp action buttons ONLY (platform recognition). Never use for any other element. (Corrected 2026-07-29 from the Figma export's `#29D51A`, which was brighter and more lime than WhatsApp's real brand green — self-defeating for a token whose only job is to be recognised as WhatsApp.)

**Banned colors:** the salmon/pink `#FFB4A9` and lime `#EBEA00` from the old Stitch M3 palette appear throughout the Figma CSS export — these are token drift, NOT brand. Wherever the design shows salmon (labels like "VISIT US", icons, active footer links), use cream at 60-70% opacity for muted labels. Wherever lime yellow appears (star icons), use `queso-yellow`.

**Red belongs in fills, not in text on dark surfaces.** (Decided 2026-07-26; supersedes v2's "use `queso-red` for accents/active states".) `queso-red` on the dark surface scale measures ≈2.9:1 — below the 4.5:1 WCAG AA threshold at the sizes this site uses it, and the brand book's approved pairings list only three: off-white on `queso-black`, `queso-black` on `queso-red`, white on `queso-red`. Note that all three put red *behind* text, never in it. So:

- **Red as a background/fill** with white or `queso-black` on top — correct, use freely (primary CTAs, selected states, badges, the delivery bar)
- **Red as text on a dark surface** — do not. Assignments in use: item prices → `queso-cream`; order totals → `queso-yellow`; eyebrow/muted labels → `queso-cream/70`; active nav and key affordances → `queso-yellow`
- **Red as text on a light surface** — fine, it measures ≈5.9:1. The About page eyebrows and the Home story-card hover are correct as-is
- **Red icons** — acceptable; they are graphics, not body text

If Brandon wants more red presence back, add red *fills*, not red text. This closed the "known exception 1" logged in `QC-REPORT.md`.

**Shape: sharp surfaces, softened controls.** (Revised 2026-07-29; v2 was "zero roundedness" everywhere.) The Figma export's assorted radius values (4/5/8/10/12px) are still tool artifacts, not design intent — the radius scale stays deleted from the theme so no `rounded-*` utility ships a corner by accident.

- **Surfaces stay sharp 90°:** cards, image containers, bento tiles, panels, the app bar, the footer, badges. This is the brand's architectural feel.
- **Controls get `rounded-control` (6px):** buttons, CTAs, size selectors, quantity steppers, category pills, inputs. Things you press are softened; things you read stay sharp.
- **Do not add a second radius token.** One value is a system; two is what makes a mixed treatment read as accidental.
- Circular (`rounded-full`) remains permitted ONLY for the map pin dot and the Perfect Pairings chips.

**Typography:** Epilogue (display/headlines, 700-800), Inter (body/labels). Google Fonts via next/font. NOTE: `.claude/skills/queso-brand-tokens/SKILL.md` names Garet / Helvetica World / Helvetica Now — those are the brand-book families, and no license has been confirmed. Epilogue/Inter are the shipped web substitutes and remain correct until someone confirms a Garet license. Do not swap on the skill's say-so alone.

**Motion** (added 2026-07-26, defined in `app/globals.css`): shared `--dur-*` / `--ease-*` tokens; `.queso-enter` (+ `.queso-stagger-1/2/3`) for above-the-fold entrances; `.queso-reveal` for scroll reveals. Reveals use CSS scroll-driven animations (`animation-timeline: view()`) so pages stay static with no JS. Content is **visible by default** and animation layers on only inside `@supports` — never invert this, or unsupporting browsers render blank pages on the low-end Android hardware this site targets. Perceived reveal length is governed by `animation-range`, not `--dur-slow`. A global `prefers-reduced-motion` guard covers the inline Tailwind transitions too.
**Logo:** dark-version lockup (white mark on black). No literal pizza imagery in iconography.
**Voice:** confident, warm, local, direct. Tagline: "The taste that stays with you."
**Footer year:** 2026, not 2024.

## Pages (exactly 4)
`/` Home, `/menu` Menu & Order, `/about` Our Story (cream `#FFF8F0`-adjacent light background per design), `/contact` Find Us. Shared components: TopAppBar, Footer, sticky BottomNavBar (dual CTA).

~~Match the final Figma layouts section-for-section.~~ Superseded 2026-07-26 — see the design-lock note at the top. Current layouts live in the code, not the Figma.

On `/menu` the sticky BottomNavBar hides itself (IntersectionObserver on `#order`) while the "Order Ready!" panel is on screen, so the paired CTAs never appear twice at once. Keep that behaviour if either component is reworked — duplicated send buttons on the order surface invite "did I just send two orders?".

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
7. Red moved out of text on dark surfaces and into fills (see Brand system above)
8. Layout, spacing, hierarchy and motion reworked beyond the Figma under the 2026-07-26 full-latitude decision. These deltas are now a floor, not a ceiling: matching the Figma is no longer the goal.
9. TWO ADDITIVE COMPONENTS not in the final mockup, build from spec in Phase 3:
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
