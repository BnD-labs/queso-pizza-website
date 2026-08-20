---
name: queso-brand-tokens
description: Applies Queso Pizza's brand system (colors, contrast rules, shape scale, fonts, logo usage, art direction) to any UI, component, or styling work in this repo. Use whenever writing or editing Tailwind classes, component styling, typography, or anything visual for the Queso Pizza site.
---

# Queso Pizza Brand Tokens — v5

`CLAUDE.md` is the authority. This file is a fast reference for styling work and
must not be read as overriding it. **Rewritten 2026-08-20**: every version of
this file before that date taught the v3/v4 dark-ground doctrine, which the
founder reversed on 2026-08-19. If anything here disagrees with `CLAUDE.md`,
`CLAUDE.md` wins.

## Colors
Tailwind theme tokens, never raw hex in JSX. The four values are locked:
- `queso-red` → `#CC1010`
- `queso-black` → `#0F0F0F`
- `queso-yellow` → `#FDFC00`
- `queso-cream` → `#FFF8F0`
- `whatsapp-green` → `#25D366` — approved exception, WhatsApp action buttons
  ONLY. Never any other element.

**Banned:** the salmon `#FFB4A9` and lime `#EBEA00` from the old Stitch M3
palette. They are token drift from the Figma export, not brand.

## Art direction — the ground is CREAM
`queso-cream` is the page ground on all four pages. `queso-black` is the ink.

The founder reviewed the near-black build on 2026-08-19, was asked directly
whether the problem was the execution or the look itself, and said **the look
itself**. He objected specifically to how the four colours and the hard square
corners were being used. Dark surfaces are now **accents, not the default**:
the footer, a hero scrim, the order panel, and the small elevated
"Most Ordered" card. Everywhere else is cream.

Do not restore a dark ground. Do not "flag" a cream background as a mistake —
earlier versions of this file told you to, and that instruction is void.

## Contrast rules — these INVERT from v4

| Colour | As text | As fill |
|---|---|---|
| `queso-red` | **Encouraged** — 5.46:1 on cream. Headings, eyebrows, prices, links | CTAs, with cream on top |
| `queso-yellow` | **BANNED** — 1.04:1 on cream, invisible | Correct, with `queso-black` on top (17.43:1) |
| `queso-black` | The default ink | Dark accents only |
| `queso-cream` | Only on dark accents and on red fills | The ground |

Red as text is the expressive unlock of v5 — it is why the palette did not need
to change. Yellow now carries the opposite constraint: **fill colour only.**

Supporting tones are derived from cream, never from a neutral grey ramp. A
mid-grey on a cream page reads as unconsidered.

Surface tokens available: `surface` (white), `surface-warm`, `surface-sunk`,
`line` (borders), `ink-soft` (muted body copy), `dark` / `dark-soft` (accents).
The v4 names `surface-low`, `surface-high` and `surface-footer` no longer exist;
Tailwind emits **no rule** for them, so they render transparent.

Run `npm run check:contrast` after touching colours. It parses the tokens out of
`app/globals.css`, so it cannot drift from what ships, and it asserts the banned
pairings stay banned.

## Shape — a real scale, softened
v4 shipped one 6px token on the reasoning that two radii read as accidental.
That held for a sharp-cornered architectural brand; the founder rejected that
brand, so the reasoning goes with it.

- `rounded-sm` (8px) — inputs, small chips, size selectors
- `rounded-md` (14px) — cards, panels, image containers
- `rounded-lg` (24px) — hero cards, feature tiles
- `rounded-full` — pills, category chips, icon buttons, avatars
- `rounded-control` (12px) — legacy; migrate to the scale as pages are reworked

`--radius-*: initial` clears Tailwind's defaults, so only these emit. Bare
`rounded`, `rounded-xl`, `rounded-2xl` etc. are dead classes.

## Typography
- **Epilogue** (display/headlines, 700–800), **Inter** (body/labels), via
  next/font.
- The brand book names Garet / Helvetica World / Helvetica Now. **No licence has
  been confirmed for any of them.** Epilogue/Inter are the shipped substitutes
  and remain correct until someone confirms a Garet licence. Do not swap on this
  file's say-so alone.
- Headlines get editorial sizing — let them breathe, don't cram.

## Logo
`public/images/logo-mark.png` — a red disc with a yellow ring and a black mark,
on a **transparent** background (alpha verified 2026-08-19). It sits on any
ground, dark or cream, unmodified.

Earlier versions of this file described a "dark version (white mark on black)".
That was simply wrong; there is no such asset. Never render literal pizza
imagery inside the logo/icon system — food belongs in photography, not the mark.

## Photography
Real photography only. **No stock, and no AI-generated or AI-"enhanced"
imagery** — see the v5 photography amendment in `CLAUDE.md` for the audit method
and the three reasons. The storefront and interior shots are the strongest asset
in the project: do not desaturate them, do not crop the people out, and do not
replace them with product renders.

`public/images` is generated from `assets-source/` by `npm run photos`, and
`npm run check:images` enforces the weight budget in CI.

## Voice
Confident, warm, local, direct. Not corporate, not cutesy.
Tagline: "The taste that stays with you."

Never fabricate reviews, ratings, customer counts, prices or landmarks. Tenure
(`SITE.tenureLine`) is the approved credibility line precisely because it is
derivable from a verified fact.
