# QC Report — Queso Pizza Website (Phase 5)

Run against the **BND Labs QC Checklist — Web Projects** (Notion, Operations Hub)
and the pre-deployment gate of **SOP — Vercel Deployment & Hosting**.
Date: 2026-07-14 · Runner: Claude Code (technical items) · Sign-off items remain with Brandon.

## Checklist status

| # | Item | Status |
|---|---|---|
| 1 | All pages load correctly, no broken elements | ✅ All 4 routes prerender + serve 200; production build clean |
| 2 | Mobile responsive — tested on an actual phone | 🔲 **Brandon/James — real-device test** (mid-range Android per SOP) |
| 3 | All links functioning | ✅ Internal link crawl: every href resolves 200. wa.me / tel: / maps links verified well-formed; confirm on device |
| 4 | Forms tested | ➖ N/A — no forms by design; the order builder submits via wa.me/tel links |
| 5 | Brand colours and fonts consistent | ✅ No raw hex in JSX (tokens only); banned salmon/lime absent; Epilogue/Inter via next/font; sharp corners verified (only the 3 spec'd circular exceptions) |
| 6 | Copy reviewed and approved by Brandon | 🔲 **Brandon** |
| 7 | GA4 installed and verified | ➖ N/A per CLAUDE.md v2: analytics explicitly descoped ("add only if asked") — constitution overrides checklist |
| 8 | Client credentials documented | 🔲 Ops — client-owned Vercel/registrar/GitHub per SOP §0 |
| 9 | Final files handed over / backed up | 🔲 Ops — repo is the handover artifact (SOP §2); push to GitHub pending |
| 10 | **Brandon reviewed & approved** | 🔲 **HARD STOP before client handover** |

## SOP pre-deployment gate

- ✅ `npm run build` — zero errors, all routes static
- ✅ No fabricated content (reviews/prices/landmarks all placeholder-marked or data-driven)
- ⚠️ **UNCONFIRMED markers** (launch blockers per SOP):
  - ✅ Hours — CONFIRMED by Brandon 2026-07-14: Mon–Fri 8am–8pm, Sat–Sun 8am–7pm
  - 🔲 Address landmark ("near Access Bank") — still to verify with Arthur
  - 🔲 WhatsApp order number — still to confirm with Dalitso
- ⚠️ Lighthouse mobile (localhost, throttled): **Perf 73 · A11y 96 · BP 100 · SEO 100.**
  Target is ≥85 **on the deployed preview** — localhost under-reports (no CDN/AVIF/HTTP2).
  Re-measure on the preview URL. If it still misses: the dark-map CSS filter on the
  Google Maps iframe is the top style cost (~2s throttled) — removing one class
  (`grayscale invert-[0.92] hue-rotate-180` in `components/MapEmbed.tsx`) reclaims it.
- ✅ Images: all photography via next/image with `sizes` hints; sources downscaled
  34.5 MB → 3.2 MB (store-front 11.2 MB → 0.3 MB) for the data-light market
- 🔲 Real-device WhatsApp flow test (pre-filled message + tel: dial)

## Known, documented exceptions (not defects)

1. **Red price/label text on dark surfaces** fails WCAG 4.5:1 (≈2.9:1). Locked brand
   red `#CC1010` + mockup-confirmed styling. Alternatives (lighter red tint) would
   leave the locked palette — Brandon's call if this should change.
2. **White text on whatsapp-green** (≈1.9:1) — WhatsApp's own platform convention,
   kept for recognition per CLAUDE.md's scoped exception.
3. **Circular Perfect-Pairings chips** — explicit in CLAUDE.md delta 7 spec,
   sits alongside the general sharp-corners rule as a spec'd exception.

## Provisional content needing confirmation (pre-launch)

- Photo-to-item mapping (`lib/menu-content.ts`) — which photo is which dish
- "Most Ordered" featured item = Queso Original (assumed, not data-backed)
- Footer "Locations" and "Contact" both link to /contact
- ~~Hosting decision~~ **DECIDED 2026-07-14: Cloudflare Pages static export**
  (`output: "export"`, images unoptimized — sources pre-downscaled in QC pass).
  Repo: github.com/BnD-labs/queso-pizza-website · build `npm run build` · output `out/`
