# Phase 6 — Launch Closeout

Consolidates the open blockers from `QC-REPORT.md` with the unfinished checklist
items in `queso_implementation_plan.md`, and corrects the deploy path.
Created 2026-07-26. **This file is the current source of truth for remaining work.**

> **Supersedes:** the Vercel deploy instructions in `queso_implementation_plan.md`
> (Phase 5, line 33 + Trello line 46) and `queso_pizza_claude_code_plan.md` §2.
> Hosting was changed to **Cloudflare Pages static export** on 2026-07-14
> (`output: "export"` in `next.config.ts`). There is no Vercel project.

Build phases 1–5 are complete and committed. Everything below is launch work.

---

## Step 1 — Deploy a Cloudflare Pages preview (do this first)

Everything else verifies against a real URL, so this unblocks the rest.

- **Repo:** `github.com/BnD-labs/queso-pizza-website` · **Branch:** `main`
- **Framework preset:** Next.js (Static HTML Export) — *not* the default Next.js preset,
  which expects a server runtime
- **Build command:** `npm run build` · **Output directory:** `out`
- **Node version:** set `NODE_VERSION = 22` in Pages env vars (Next 16 requires ≥20;
  the Pages default is older)
- Result: a `*.pages.dev` preview URL. Do **not** attach `quesopizza.com` yet.

Local sanity check before pushing: `npm run build`, then `npm run preview` to serve
the export from `out/`. (`next start` does not work under `output: "export"`, so the
old `start` script was replaced with `preview`.)

## Step 2 — Content confirmations (run in parallel with Step 1)

These are the `UNCONFIRMED` markers still live in the code. Each one blocks launch.

| # | Item | Where | Owner |
|---|------|-------|-------|
| 1 | Address landmark — "next to" vs "opposite" Access Bank | `lib/site-config.ts:28` | Arthur |
| 2 | WhatsApp order number — which line receives orders (WA Business), and that he expects pre-filled messages to start arriving | `lib/site-config.ts:16` | Dalitso |
| 3 | Call-to-confirm number — the on-site line staff actually answer | `lib/site-config.ts:19` | Dalitso |
| 4 | Photo-to-dish mapping — confirm each photo is the dish it's labelled as | `lib/menu-content.ts` | Brandon |
| 5 | "Most Ordered" item — currently assumes Queso Original, not data-backed | `components/MostOrderedCard.tsx` | Dalitso |

Items 2 and 3 currently both default to `+260976056200`. They are separate fields
by design — confirm whether they are genuinely the same number.

**Not blockers unless data arrives:** Extra Toppings pricing and the Beverages menu
ship as spec'd placeholders per CLAUDE.md. They only become work if Dalitso supplies
numbers. Ask once, then close them out either way.

## Step 3 — Verify on the preview URL

- [ ] **Lighthouse mobile on the preview** — target ≥85. Localhost measured Perf 73,
      but under-reports (no CDN/HTTP2). If it still misses, the fallback is dropping
      the dark-map filter (`grayscale invert-[0.92] hue-rotate-180`) in
      `components/MapEmbed.tsx` — worth ~2s throttled.
- [ ] **Real-device test on a mid-range Android** (per QC checklist item 2) — layout,
      sticky bottom nav, order builder
- [ ] **Full WhatsApp order flow on a real phone** — build an order, confirm the
      pre-filled message arrives correctly formatted on the receiving number, then
      confirm the paired `tel:` button dials
- [ ] **Links on device** — `wa.me`, `tel:`, and the maps link (verified well-formed
      in QC, but never tapped on hardware)

## Step 4 — Sign-off gates

- [ ] Brandon: copy review + approval (QC checklist items 6 and 10)
- [ ] Preview URL sent to Dalitso → client sign-off
- [ ] Client credentials documented (Cloudflare account, registrar, GitHub) — Ops

## Step 5 — Production

- [ ] Attach `quesopizza.com` as a custom domain in Cloudflare Pages
- [ ] DNS is already on Cloudflare — add the apex + `www` records Pages generates
- [ ] Verify HTTPS, then re-check the four routes and the order flow on production
- [ ] Confirm the repo is the handover artifact and is pushed current

---

## Housekeeping (cheap, do alongside)

- ~~`package.json` named `scaffold-tmp`~~ **done 2026-07-26** — renamed to
  `queso-pizza` (in `package-lock.json` too)
- ~~Unusable `start` script~~ **done 2026-07-26** — replaced with
  `npm run preview` (`npx serve out`) for serving the static export locally
- After launch, fold `queso_pizza_claude_code_plan.md` and
  `queso_implementation_plan.md` into an archive note — both are now historical

## Explicitly out of scope

GA4/analytics (descoped in CLAUDE.md), forms, cart/payments, CMS. The GBP reviews
widget stays a placeholder until that decision is made — it is not a launch blocker.

## Trello — replaces the stale checklist

- [ ] Cloudflare Pages preview deployed (`out/`, Node 22)
- [ ] Address landmark confirmed with Arthur
- [ ] WhatsApp order + call-to-confirm numbers confirmed with Dalitso
- [ ] Photo mapping + "Most Ordered" item confirmed
- [ ] Lighthouse mobile ≥85 on preview URL
- [ ] Real-device test: layout + full WhatsApp order flow
- [ ] Brandon copy review & approval
- [ ] Dalitso sign-off on preview
- [ ] Production deploy + `quesopizza.com` custom domain live
