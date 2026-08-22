# Queso Pizza — Project Constitution (v5)

Read this file at the start of every session in this repo. It supersedes generic assumptions and the v1–v4 constitutions — this is how *this* project works.

**The founder lifted the dark-ground and sharp-corner locks on 2026-08-19.** Asked directly whether the problem was the execution or the look itself, he said **the look itself**, and gave full permission to change it. He objected specifically to *how the four brand colours and the hard square corners were being used*, said the reference sites "scream pizza restaurant" in a way ours did not, and wants a visitor to feel they have opened a **premium pizza restaurant that is easy to navigate, very clear, easy to find meals in, and unmistakably local**.

**The four colours themselves did not change — only their roles.** See the Brand system section; the contrast rules invert, and getting that wrong ships unreadable text.

The Figma has been reference-not-contract since 2026-07-26 and is now two design generations stale. Do not restore layouts from it.

What remains genuinely locked, and must not be changed without a new explicit decision:
- The four colour values, the WhatsApp-green exception, Epilogue/Inter
- The four-page structure
- `lib/menu-data.ts` values and the WhatsApp + call-to-confirm order flow
- Every content rule below (no fabricated reviews, ratings, stats, prices, or landmarks)

## What this is
A 4-page, mobile-first marketing + ordering site for Queso Pizza, a fast-food restaurant in Chongwe, Lusaka, Zambia. No cart, no payment gateway, no accounts, no CMS. The site's job: look premium, show the menu well, route orders to WhatsApp and a confirmation phone call.

## Tech stack
- Next.js (App Router) + TypeScript + TailwindCSS + React
- No database. Fully static/client-rendered. Do not add Supabase/Firebase/any backend.
- Hosting: **Cloudflare Worker serving static assets** (static export, `output: "export"`). DNS: Cloudflare. Domain: `quesopizza.com`. NOT Cloudflare Pages — the client account no longer exposes a Pages creation flow. `wrangler.jsonc` is load-bearing: without it `wrangler deploy` auto-detects Next.js, assumes an SSR build, and fails. See `PHASE-6-LAUNCH.md`.
- Mobile-first (390px design frames). Desktop = responsive Tailwind breakpoints applied sensibly to the same layouts; no bespoke desktop design exists.

## Brand system — v5 (rebranded 2026-08-19)

**Colors** (Tailwind theme tokens, never raw hex in JSX) — values unchanged from v4:
- `queso-red`: `#CC1010`
- `queso-black`: `#0F0F0F`
- `queso-yellow`: `#FDFC00`
- `queso-cream`: `#FFF8F0`
- `whatsapp-green`: `#25D366` — APPROVED EXCEPTION, WhatsApp action buttons ONLY (platform recognition). Never any other element.

**Banned colors:** the salmon/pink `#FFB4A9` and lime `#EBEA00` from the old Stitch M3 palette are token drift from the Figma export, NOT brand. Never reintroduce.

**The ground is cream, not black.** This is the whole rebrand in one line. v4 built a near-black site with cream text; `queso-cream` is now the page ground and `queso-black` is the ink. Dark surfaces are demoted from *default* to *accent* — the footer, the order panel, the Most Ordered card. Used everywhere they made the site read cold, and they are what the founder was reacting to.

**CONTRAST RULES INVERT FROM v4. Read this before writing a single class.**

| Colour | v4 (dark ground) | v5 (cream ground) |
|---|---|---|
| `queso-red` as text | **Banned** — ≈2.9:1 on dark | **Encouraged** — **5.46:1** on cream. Headings, eyebrows, prices, links |
| `queso-yellow` as text | Totals, active nav | **Banned** — **1.04:1** on cream, effectively invisible |
| `queso-yellow` as fill | Badges | Correct, with `queso-black` on top (**17.43:1**) |
| `queso-black` as text | Only on light cards | The default ink |
| `queso-cream` as text | The default | Only on dark accents and on red fills |

Red is finally usable as text — that is the expressive unlock the founder was asking for, and it is why the palette did not need to change. Yellow now carries the opposite constraint: it is a fill colour only.

These figures are measured, not estimated, and are enforced in CI by
`scripts/check-contrast.mjs`, which parses the tokens straight out of `app/globals.css` so the
check can never drift from what actually ships. It also asserts the *banned* pairings stay
banned - if yellow-on-cream ever starts passing, a token drifted.

**Warm neutrals, never grey.** Every supporting tone is derived from cream, not from a neutral grey ramp. A mid-grey on a cream page reads as unconsidered and fights the warmth the whole rebrand is chasing.

**The surface tokens, and a trap worth knowing about.** The available surfaces are
`surface` (white), `surface-warm`, `surface-sunk`, `line` (borders), `ink-soft` (muted
copy), and `dark` / `dark-soft` (accents). The v4 names `surface-low`, `surface-high`
and `surface-footer` **no longer exist.**

They were renamed in the v5 token rewrite (3331a78) without the 14 usages being updated,
and the failure mode is nastier than it sounds: Tailwind emits **no CSS rule at all** for
an undefined token, so `bg-surface-low` is not a wrong colour, it is a silent no-op. Every
one of those surfaces rendered fully transparent and dropped cream text onto the cream
body. That single mistake was most of the 73 sub-3:1 text elements found afterwards — not
73 independent errors. Neither `tsc` nor `eslint` nor `next build` says a word about it.

If text is invisible and the classes look right, check that the token is actually defined
in `app/globals.css` before assuming the colour is wrong.

**Only three surfaces stay dark**, and the list is exhaustive: the **footer** (with the
BottomNavBar above it), the **order panel**, and the **Most Ordered card**. The hero scrim
was a fourth until 2026-08-21, when the hero became a solid red band — see the hero note
below. Yellow as text remains correct
*inside* those — the v5 ban is specifically yellow on cream. Everything else is cream or a
white card. The TopAppBar is deliberately not on this list: a black band pinned across the
top of every cream page is not an accent, it is a second ground.

**The hero is a red band (2026-08-21).** Brandon shortlisted a reference layout and asked for it on the
hero *only*: solid `queso-red` ground, content left, the pizza as a circle right, and an SVG wave easing
into the cream. Red is a **ground** there rather than a fill on cream, which the table above does not
cover, so both directions are asserted in `scripts/check-contrast.mjs` — cream on red is **5.46:1**,
yellow on red is **5.23:1**. Yellow is legitimate there; the yellow ban is specifically yellow on *cream*.

This replaced a full-bleed photo with a gradient scrim, and it fixed something the tooling could never
check: text over a photograph has a contrast ratio that depends on which part of the crust it lands on,
and the scrim was a *sibling* of the text rather than an ancestor, so computed styles could not see it.
On a flat field the ratio is fixed. All four pages now probe clean.

**Shape: softened, on a real scale.** v4 shipped one 6px control token on the reasoning that "two is what makes a mixed system read as accidental." That held for an architectural sharp-cornered brand. The founder rejected that brand, so the reasoning goes with it. v5 uses a deliberate scale — chosen once, applied consistently:

- `rounded-sm` (8px) — inputs, small chips, size selectors
- `rounded-md` (14px) — cards, panels, image containers
- `rounded-lg` (24px) — hero cards, feature tiles
- `rounded-full` — pills, category chips, icon buttons, avatars
- `rounded-control` (12px) — retained so existing pressables soften without touching every file; migrate to the scale as pages are reworked

**"Screams local brand"** is the founder's phrase and the easiest thing to fake. It means the real Chongwe storefront photography used properly, Kwacha pricing shown with confidence, Great East Road and the Access Bank landmark as genuine wayfinding, and WhatsApp-first ordering presented as the feature it is rather than apologised for. It does **not** mean decorative pattern pastiche.

**Typography:** **Comix Loud** (brand display face), **Epilogue** (headlines, 700-800), **Inter** (body/labels).

Comix Loud arrived from Brandon on 2026-08-21 as Queso's primary brand font, superseding the
unlicensed Garet / Helvetica World / Helvetica Now the brand book named. It is loaded with
`next/font/local` from `app/fonts/comix-loud.woff2` (converted from the supplied 33 KB TTF; the
original is in `assets-source/`, and the WOFF2 is 11.8 KB).

**It is scoped to three places, and that scoping is deliberate:** the **logo wordmark**, the **hero
headline**, and the **"Explore the Menu"** feature heading. Applied to headings generally it
overwhelmed the page — Brandon's call after seeing it. The reason is measurable rather than a matter
of taste: at the same font-size Comix Loud renders about **1.5x wider** than Epilogue ("THE TASTE
THAT" measured 974px at 72px, in a 633px column) and its natural line box is **1.5x its em**.

Two consequences that will bite anyone who uses `font-brand` somewhere new:
- **Never set leading below 1.5 on it.** 0.95, 1.08, 1.15 and 1.3 were all tried and all made
  consecutive lines physically overlap. This is the font's own metric, not a style preference.
- **Size it a step down** from the Epilogue equivalent, and never rely on a hard `<br />` to control
  wrapping. Use `[text-wrap:balance]`.

Everything else stays Epilogue/Inter. `--font-display` is Epilogue; `--font-brand` is Comix Loud.

**LICENSING — UNRESOLVED, VERIFY BEFORE LAUNCH.** The TTF's own embedded name table reads
`Copyright © Imagex 2013` and, in the license field, **"Free for personal use."** Queso Pizza is a
commercial business, so a personal-use grant does not cover this site. Either the client already
holds a commercial licence from Imagex or one has to be bought. This is the same class of problem as
the unlicensed Taste of Home stock photo in `assets-source/held-back/` — flagged, not resolved.

`.claude/skills/queso-brand-tokens/SKILL.md` was rewritten to v5 on 2026-08-20 and now agrees with this file. Every version before that date taught the v3/v4 dark-ground doctrine — it instructed the reader that `queso-black` was the base background and to *flag a cream background as a mistake*, which would have reverted the entire rebrand. If a session ever cites that skill against something here, this file wins.

**Motion** (added 2026-07-26, defined in `app/globals.css`): shared `--dur-*` / `--ease-*` tokens; `.queso-enter` (+ `.queso-stagger-1/2/3`) for above-the-fold entrances; `.queso-reveal` for scroll reveals. Reveals use CSS scroll-driven animations (`animation-timeline: view()`) so pages stay static with no JS. Content is **visible by default** and animation layers on only inside `@supports` — never invert this, or unsupporting browsers render blank pages on the low-end Android hardware this site targets. Perceived reveal length is governed by `animation-range`, not `--dur-slow`. A global `prefers-reduced-motion` guard covers the inline Tailwind transitions too.
**Logotype:** `components/Wordmark.tsx` renders "QUESO PIZZA" in Comix Loud, in brand colours —
**QUESO red, PIZZA yellow** (Brandon, 2026-08-21). Two things about it are load-bearing:

- On the **cream** header, PIZZA is yellow **with a 2.5px `queso-black` outline**. Plain yellow on
  cream is **1.04:1** — the banned pairing, invisible. The outline carries the legibility (black on
  cream is 18.2:1) and suits a comic face. This is the *only* sanctioned yellow-on-cream text, and it
  is noted as such in `scripts/check-contrast.mjs`. It is not licence to use yellow as text elsewhere.
- On the **dark** footer, QUESO is **cream, not red** — red on dark is 3.23:1, the v4 constraint that
  did not disappear, it just moved to the dark accents. Yellow needs no outline there (16.9:1).

The logotype is deliberately small and the mark deliberately large (64x36 in the app bar, 104x59 in
the footer): the type was overshadowing the mark, and Comix Loud is wide enough that it dominates fast.

**Logo:** `public/images/logo-mark.png` — a red disc with a yellow ring and a black mark, on a **transparent** background (verified alpha, 2026-08-19). It sits on any ground, dark or cream. v4 described this as a "dark-version lockup (white mark on black)", which was simply wrong. No literal pizza imagery elsewhere in iconography.
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
- Real photography only (assets exported from Figma/provided by Brandon). No stock, **and no AI-generated or AI-"enhanced" imagery** — see the v5 photography amendment below.
- Missing photography (beverages, reviews) → dashed-border + icon placeholder convention, exactly as the design shows — **in development only.** See the v4 amendment below.
- Menu data only from `lib/menu-data.ts`; site constants (phones, address, hours, socials) only from `lib/site-config.ts`

**v4 amendment (2026-08-18, Brandon): placeholders are an internal-review tool, not a production state.**
The dashed-border convention exists to tell the team what content is still outstanding. It was never
meant to be read by a customer, and on the live site it was: 7 of 10 pizza cards showed "Photography
pending", and both Home and Contact rendered the literal string
`[PLACEHOLDER: This section is reserved for the live Google Business Profile reviews embed module.]`
under five stars attached to no real rating. That is the single clearest reason the build read
"incomplete, not premium."

Gate placeholder scaffolding on `SHOW_PLACEHOLDERS` (`lib/site-config.ts`), which is
`process.env.NODE_ENV !== "production"`. The rules:
- **Nothing real to say → hide the whole module in production.** Stars imply a rating, so they only
  ship once a rating exists. ~~The GBP reviews blocks on Home and Contact.~~ **Resolved 2026-08-21 —
  see the reviews amendment below.**
- **Something real to say → keep the content, drop only the scaffolding.** Beverages and the Home
  "Refreshments" tile keep their approved "available in-store" copy without the dashed box or the
  "Placeholder" badge. Hiding them would hide a product the shop actually sells, and dropping the
  Refreshments tile would also unbalance the bento grid.
- **Missing item photography → render a text-forward card**, not an empty box. The pizza grid uses
  `md:items-start` so a photoless card sizes to its content; stretched to a photo card's height it
  leaves a dead void, which is worse than the placeholder it replaced.
- The convention still applies in full during `next dev`, so the team keeps seeing what is outstanding.

This does not license inventing content. Missing descriptions, photography and review data remain
content blockers on Brandon/Dalitso — see `PHASE-6-LAUNCH.md`.

**v5 amendment (2026-08-21): the reviews are real now — and what that did NOT unlock.**

Queso's Google Business Profile reviews arrived: **5.0 from 4 reviews.** They live in
`lib/reviews.ts`, which is the single source of truth, and they ship on Home and Contact via
`components/Reviews.tsx`. `aggregateRating` and `review` are now in the JSON-LD, which the
structured-data file had explicitly refused for the whole build.

**The rule did not change — the facts did.** The blocks were hidden because five stars over a
`[PLACEHOLDER]` string is a rating claim with nothing behind it. Now there is something behind it.
Nothing about the fabrication ban has loosened.

Three constraints carried into `lib/reviews.ts`, and they should survive future edits:
- **Quote text is verbatim**, including the reviewer's own punctuation. Never trimmed for length or
  tidied for tone.
- **Only reviews whose full text is legible in the source are quoted.** Two of the four rated 5 stars
  but their text was not readable in the capture. They count towards the aggregate — which is what
  Google itself reports — but they are not quoted, and their text is not guessed at.
- **The count always ships with the rating.** Four is a small number, and "5.0" alone would flatter
  it in precisely the way the fabricated-stat rule exists to prevent. Both or neither.
- **No dates.** The profile showed relative ages ("5 weeks ago"). Converting those to absolute dates
  would invent precision.

**Two things the profile did NOT license.**

The GBP dashboard shows **"290 customer interactions."** That is almost certainly where the
founder's unsourced "250+ customers" came from — and it is not a customer count. It is Google's
tally of profile views, direction taps and call clicks. It must not be rendered as customers, and
`SITE.tenureLine` stays as it is.

One reviewer is **"Arthur Chipolomoka."** An "Arthur" is also the project-side contact named in the
design deltas below for verifying hours and the address. If they are the same person, a review from
someone connected to the business is a credibility problem rather than an asset, and it should come
down. **Unresolved — ask before treating that quote as independent.**

**v5 amendment (2026-08-20): the photography audit, and why AI-enhanced frames are banned.**

A 34-file photography drop landed on 2026-08-19. Auditing it split the set cleanly in two, and the
split is *provable* rather than a matter of taste — the method is worth keeping, because this will
happen again.

**How to tell them apart.** Read the JPEG segment table and the EXIF, not the picture:
- **Genuine** frames carry `EXIF/APP1` with a camera `Make`/`Model`, plus Lightroom's `Software`
  tag, an ICC profile and a Photoshop IPTC block. Six did: **Canon PowerShot S3 IS, shot
  2026-08-04**. Two more had no EXIF but arrived via WhatsApp (which strips it) and match the shop
  on props — same pink trays, same prep counter.
- **Generated or re-rendered** frames carry `JFIF/APP0` and nothing else — regenerated pixels keep
  no camera metadata. Corroborating tells: generator filenames (`..._2K_202608191833`), diffusion
  output dimensions (1024x1024, 2048x2048), and PNG intermediates (`.png_2K_...`) that no camera
  produces.

`scripts/build-photos.mjs` regenerates `public/images` from the verified originals in
`assets-source/photography-2026-08/`; the rest sit in `assets-source/held-back/`, on disk and
untracked. `assets-source/README.md` records why each was held.

**The rule this establishes.** AI-enhanced product photography is banned on the same footing as
stock, for three separate reasons — any one of which is sufficient:

1. **It misrepresents the product.** Two frames contradicted their own labels: `Beef_Pizza_OG` shows
   chicken; `Flavorful_beef_Pizza` shows ham and mushroom. A customer orders off the photo, and the
   counter absorbs the complaint. This is the same failure as the banned `SARAH M., GOOGLE REVIEWS`
   quote — an invented claim about a real business.
2. **It invents facts about the shop.** `Kitchen_Prep.jpg_202608191809.jpeg` is the real
   `Meal prep.jpg` re-composed, with a person, an apron and a gloved hand hallucinated into a scene
   that contained none. That is a staff member who does not exist.
3. **It destroys exactly what the rebrand is for.** The founder asked for a site that "screams local
   brand." A relit, seamless-black studio render is the *most* generic possible output — it is the
   international-chain look he objected to, applied to his own photographs. The flash-lit Canon
   frames of a wrap on a red tray do the job the enhanced versions cannot.

**Corollary — the storefront and interior photography is the strongest asset in this project.** Real
customers, the red-and-white wall, the menu board, the corrugated roof. Do not desaturate it, do not
crop the people out, and do not replace it with a product render. Home's story teaser previously
rendered it `grayscale` until hover; that treatment is removed and should not return.

**Verified-fact discipline extends to numbers.** The founder mentioned "250+ customers" on the
2026-08-19 call but could not source it, and 250 over four years reads as roughly one a week, which
undersells the shop badly. Do not estimate it. `SITE.tenureLine` ships
**"Serving Chongwe since 2022"** instead — derived from the verifiable 4+ years, and it carries the
same credibility without a fabricated denominator. A real count from the WhatsApp order history or
the Google Business Profile may replace it; a computed one may not.

**Image weight is now enforced.** `next.config.ts` sets `images.unoptimized`, so `sizes=` does
nothing and every byte in `public/images` is downloaded at full resolution by a phone on a Zambian
mobile network. `scripts/check-image-budget.mjs` runs in CI: **1300 KB total, 200 KB per file.**
The budget rose from ~950 KB when the founder's own photography landed — real local photography
earns weight in a way stock never did. Raise it again only for photographs that earn it, never to
unblock a commit. Sizes in `build-photos.mjs` are chosen per *use*: a 64px `FlatItemRow` thumb gets
a 320px square, not a 2816px original.

## Explicit boundaries — never build unless instructed
No cart/checkout, no payments, no login, no CMS, no extra pages, no backend, no analytics yet (GA4 was old-scope; add only if asked).

## Process
Work phase-by-phase per the implementation plan; stop and confirm at each phase gate. Commit per phase. QC against the Web Projects QC Checklist before anything is called done.
