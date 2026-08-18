# Phase 6 — Launch Closeout

Consolidates the open blockers from `QC-REPORT.md` with the unfinished checklist
items in `queso_implementation_plan.md`, and corrects the deploy path.
Created 2026-07-26. **This file is the current source of truth for remaining work.**

> **Supersedes:** the Vercel deploy instructions in `queso_implementation_plan.md`
> (Phase 5, line 33 + Trello line 46) and `queso_pizza_claude_code_plan.md` §2.
> Hosting moved off Vercel on 2026-07-14 (`output: "export"` in `next.config.ts`).
> There is no Vercel project.
>
> **Corrected 2026-07-26:** deployment is a **Cloudflare Worker serving static
> assets**, not Cloudflare Pages. The client's account (`Quesofoods22@gmail.com`)
> no longer surfaces a Pages creation flow — the dashboard routes everything to
> Workers. Ignore any "Pages" wording elsewhere in this repo's older docs.

Build phases 1–5 are complete and committed. Everything below is launch work.

---

## Step 1 — DONE (2026-08-18): production deployed, CI wired

Production was serving a build from **2026-07-28** — three weeks and the entire
design-polish pass behind `main`. There were only ever three deployments, all hand-run
on 26–28 July, and no CI existed despite a commit message claiming "deploys on push".

Resolved 2026-08-18:
- `main` (incl. the post-launch improvements) deployed to `queso-pizza-website`,
  version `813b9857-8a03-42ae-a6e4-df382d435514`. Apex, `www`, all four routes,
  `sitemap.xml` and `robots.txt` verified 200; unknown paths correctly 404.
- `.github/workflows/deploy.yml` deploys on push to `main`, with a guard that fails
  the build if placeholder scaffolding reaches the export (constitution v4).
- `account_id` pinned in `wrangler.jsonc` so a multi-account token cannot deploy to
  the wrong account.
- `npm run deploy` added for the manual path.

**Access note:** BnD Labs briefly lost access to the client Cloudflare account when the
client changed their Google password. `bndlabs.023@gmail.com` is now an Administrator
*member* of `Quesofoods22@gmail.com`'s account — keep that membership, it is what makes
deploys possible without holding the client's mailbox. The domain is on **Cloudflare
Registrar** in the client account, so it cannot be moved or re-delegated without them.

### Original Step 1 (historical)

Everything else verifies against a real URL, so this unblocks the rest.

- **Account:** `Quesofoods22@gmail.com` (client-owned, correct per SOP handover)
- **Repo:** `github.com/BnD-labs/queso-pizza-website` · **Branch:** `main`
- **Build command:** `npm run build` · **Deploy command:** `npx wrangler deploy`
- **Node:** the build image already provides Node 22 — no `NODE_VERSION` var needed
- Result: a `*.workers.dev` preview URL. Do **not** attach `quesopizza.com` yet.

**`wrangler.jsonc` is load-bearing — do not delete it.** It is the only thing
stopping `wrangler deploy` from running its auto-config, which misdetects this
project as server-rendered Next.js, runs the `@opennextjs/cloudflare` SSR
migration, and fails on a missing `pages-manifest.json`. That was the 2026-07-26
build failure. The config pins `assets.directory` to `./out` and declares no
`main`, i.e. an assets-only Worker with no server runtime.

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
| 4b | **Item descriptions — 7 of 10 pizzas have none.** Drafts prepared for approval, none wired in (constitution bans invented ingredients). One (`all-in-one`) is written from the name alone and must not ship until Dalitso lists its toppings | `lib/menu-content.ts` | Brandon / Dalitso |
| 5 | ~~"Most Ordered" item~~ **CONFIRMED 2026-08-18 (Brandon): Flavorful Chicken.** Was showing Queso Original, a provisional stand-in — the card asserted "MOST ORDERED" about an item nobody had checked | `components/MostOrderedCard.tsx` | ~~Dalitso~~ done |

Items 2 and 3 currently both default to `+260976056200`. They are separate fields
by design — confirm whether they are genuinely the same number.

**Not blockers unless data arrives:** Extra Toppings pricing and the Beverages menu
ship as spec'd placeholders per CLAUDE.md. They only become work if Dalitso supplies
numbers. Ask once, then close them out either way.

## Step 3 — Verify on the preview URL

- [x] **Lighthouse mobile, measured on production 2026-08-18** (first real run — the
      old "Perf 73 on localhost" was never a real measurement):

      | Category | Score |
      |---|---|
      | Performance | **48** — below the ≥85 gate |
      | Accessibility | 96 |
      | Best Practices | 100 |
      | SEO | 100 |

      Zero console errors, zero 404s, CLS 0.022. Fixed in this pass: image weight
      3.19 MB → 915 KB, favicons 93 KB → 30 KB, a 404 prefetch on every internal
      link, redundant alt text.

      **Performance is still blocked on three structural items, none of which
      re-encoding can fix:**
      1. **No responsive images — 331 KB wasted.** `images.unoptimized` is required
         by `output: "export"`, so `next/image` emits no `srcset`: a 390 px phone
         downloads the 1400 px hero, and the 64 px "Most Ordered" thumbnail
         downloads the full 1060 px menu photo (119 KB to paint 64 px). Fixing this
         means generating sized variants and hand-rolling `srcset`/`<picture>`.
      2. **Google Maps embed ships ~192 KB of third-party JS on Home** and drives
         most of the 1,290 ms Total Blocking Time. A click-to-load facade would
         remove it from first paint entirely.
      3. **LCP is the hero image at 5.6 s.** Falls out of (1).

- [ ] **WhatsApp button contrast fails WCAG.** White on `#25D366` measures
      **1.98:1** — far below 4.5:1, and the worst contrast on the site. The green is
      a locked brand exception for platform recognition, but the *text colour* on it
      is not specified anywhere. `queso-black` on that same green measures ≈9.5:1 and
      keeps the WhatsApp recognition intact. Needs Brandon's sign-off since it changes
      the most-used button on the site.
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

- [x] ~~Attach `quesopizza.com` to the Worker~~ — already bound; apex and `www` both
      map to `queso-pizza-website` in the client account
- [ ] **First check the `quesopizza.com` DNS zone for an orphaned record.** The domain
      was briefly attached to a placeholder "Hello world" Worker on 2026-07-26 and
      then detached; a proxied DNS record for the apex/`www` can outlive the binding
      and will cause a confusing conflict here. Delete any leftover before attaching.
- [x] HTTPS verified; all four routes + `sitemap.xml` + `robots.txt` return 200, unknown
      paths 404 correctly, and the order flow was smoke-tested on production
- [x] Repo pushed current

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

- [x] Cloudflare Worker deployed green
- [ ] Address landmark confirmed with Arthur
- [ ] WhatsApp order + call-to-confirm numbers confirmed with Dalitso
- [ ] Photo mapping + "Most Ordered" item confirmed
- [ ] Lighthouse mobile ≥85 — **measured 48 on production**, see Step 3
- [ ] Real-device test: layout + full WhatsApp order flow
- [ ] Brandon copy review & approval
- [ ] Dalitso sign-off on preview
- [x] Production deploy + `quesopizza.com` custom domain live
