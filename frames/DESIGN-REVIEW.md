# Frames — Design Review

Review of the four page mockups (Home, Menu & Order, About, Contact) and the Figma source
(`Queso Pizza Website UI.fig`), reconciled against the project constitution.

> **Source of truth:** `CLAUDE.md` is now **v2 (design-locked)** — it supersedes the v1
> constitution this review was originally written against. All decisions below are
> reconciled to v2.

## Assets in this folder
- `Queso Pizza Website UI.fig` — Figma source, all 4 frames + embedded photography. ✅
- `Queso Pizza Website UI.pdf` — static export of the same 4 screens.
- `DESIGN-REVIEW.md` — this file.

## Design direction — on brand ✅
- Dark base on Home / Menu / Contact; light (cream-adjacent) beat on About.
- Red = primary CTA; yellow reserved for review stars; photography in framed cards.
- Abstract logo mark, no literal pizza in the mark.
- Bottom bar pairs **green "Order on WhatsApp" + red "Call to Confirm"** — correct
  order-handoff pattern (both actions together, no cart/checkout/account creep).
- Four pages only.

## Nature of the CSS export
Figma Dev-Mode "Copy as CSS": absolute positioning, hardcoded heights, `flex: none`.
**Visual spec only** — do NOT paste as implementation CSS. It also carries old Stitch-M3
**token drift** (salmon `#FFB4A9`, lime `#EBEA00`, border-radii) that v2 explicitly rejects.

## Token compliance (per v2)
| Token / rule | v2 value | Mockup CSS | Action on build |
|---|---|---|---|
| Red | `#CC1010` | `#CC1010` | ✅ keep |
| Black + surfaces | `#0F0F0F` + scale `#131313`/`#1C1B1B`/`#201F1F`/`#2A2A2A`/`#0E0E0E` | `#131313` etc. | ✅ use the surface scale, don't flatten |
| Yellow | `#FDFC00` | `#EBEA00` (stars) | ❌ remap lime → `#FDFC00` |
| Cream | `#FFF8F0` (About uses cream-adjacent per design) | About `#E8E1DA` | ✅ mockup light bg approved |
| Salmon/rose text | **BANNED** | `#FFB4A9`, `#E7BDB7` | ❌ remap (see decision 4) |
| WhatsApp green | `#29D51A` — WhatsApp buttons ONLY | `#29D51A`/`#25D366` | ✅ buttons only |
| Corners | `rounded-none` everywhere (except map pin dot, cart badge) | radii present | ❌ strip radii |
| Display / body font | **Epilogue** / **Inter** (next/font) | Epilogue / Inter | ✅ matches mockup |

## Decisions — RESOLVED (client, 2026-07-13)
1. **Fonts → Epilogue (display) + Inter (body/labels).** v2 supersedes the earlier
   Garet/Helvetica direction; the mockup fonts are the final choice.
2. **Black → `#0F0F0F` token PLUS v2's dark surface scale.** Keep the layered surfaces
   (`#131313` base, `#1C1B1B`, `#201F1F`, `#2A2A2A`, `#0E0E0E`); do not flatten to one black.
3. **About background → mockup light `#E8E1DA`** (cream-adjacent, per design). Approved.
4. **Rose/salmon body-nav text → FOLLOW v2, remap.** Drop banned `#FFB4A9` / `#E7BDB7` /
   lime `#EBEA00`. Muted labels → `queso-cream #FFF8F0` at ~65% opacity; active/accent →
   `queso-red`; stars → `queso-yellow`. (Earlier "keep the rose" request is overridden by
   the adoption of v2.)

## Other v2 build rules to honor (not visible as pure color/type)
- Prices from `lib/menu-data.ts`, not the mockup (mockup K85/K100/K80 are wrong).
- Fabricated "SARAH M." review → replace with GBP-reviews placeholder module.
- Hours & address are UNCONFIRMED — drive from `lib/site-config.ts` with markers.
- Two additive components (Home "Most Ordered" card, Menu "Perfect Pairings" strip) are
  built from spec in Phase 3, not present in the mockup.

## Status
Design assets landed, all brand decisions resolved. **No code written — awaiting client
approval before scaffolding/build.**
