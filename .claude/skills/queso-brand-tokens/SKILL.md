---
name: queso-brand-tokens
description: Applies Queso Pizza's locked brand system (colors, fonts, logo usage, art direction) to any UI, component, or styling work in this repo. Use whenever writing or editing Tailwind classes, component styling, typography, or anything visual for the Queso Pizza site.
---

# Queso Pizza Brand Tokens

## Colors
Use Tailwind theme tokens, never raw hex in JSX:
- `queso-red` → `#CC1010`
- `queso-black` → `#0F0F0F`
- `queso-yellow` → `#FDFC00`
- `queso-cream` → `#FFF8F0`

## Art direction — the default is dark
`queso-black` is the base background for Home, Menu & Order, and Contact. This is intentional premium positioning, not a placeholder — do not "fix" it to a light background. `queso-cream` is reserved specifically for the About page as a deliberate warm contrast beat. If a component is being built for Home, Menu, or Contact and someone (including a prior session) has set it to a cream/white background, flag it rather than assuming that's correct.

Approved text/background pairings only:
- White or off-white text on `queso-black` (primary pairing)
- `queso-black` text on `queso-red`
- White text on `queso-red`

## Typography
- Headlines/display: Garet, large scale, editorial sizing — let headlines breathe, don't cram
- Body copy: Helvetica World
- Captions/small text: Helvetica Now

## Logo usage
- Primary lockup for this build: dark version (white mark on black background)
- Circular mark: concentric red/yellow rings around an abstract black swirl/hand-shape icon, "QUESO PIZZA" wordmark beneath
- Never render literal pizza imagery inside the logo/icon system — the brand direction is intentionally abstract/associative. Food imagery belongs in photography, not the mark.

## Voice, if writing any copy
Confident, warm, local-community-rooted, direct. Not corporate, not cutesy. Tagline: "The taste that stays with you."
