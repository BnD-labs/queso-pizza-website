# Queso Pizza — Build Implementation Plan (Claude Code)

## Setup (10 minutes, once)
Since you're going straight Claude Code (not the VS Code extension): install with `npm install -g @anthropic-ai/claude-code`, then `cd` into the project folder and run `claude`. Sign in with the shared Pro account when prompted. Same brain as the extension — the repo files do the configuring, not the interface.

Repo prep before the first prompt:
```
queso-pizza/
├── CLAUDE.md                        ← CLAUDE_v2.md, renamed
├── .claude/skills/
│   ├── queso-brand-tokens/SKILL.md
│   └── whatsapp-order-builder/SKILL.md
├── lib/menu-data.ts                 ← provided file, drop in as-is
└── design/                          ← Figma exports: 4 page screenshots + image assets
```
Put the four final page screenshots in `design/` — Claude Code can read images from disk, so "match design/home.png" is a real instruction. Export the photography assets from Figma into `design/assets/` at the same time; Phase 2 needs them.

## Build phases (each ends with: Claude Code stops → you review → git commit)

**Phase 1 — Scaffold** (~1 session)
Next.js init (App Router, TS, Tailwind), tokens in tailwind.config (incl. sharp-corner enforcement + whatsapp-green), next/font for Epilogue/Inter, folder structure, `lib/site-config.ts` with phones/address/hours marked UNCONFIRMED. Gate: `npm run dev` renders an empty branded shell.

**Phase 2 — Static shell** (~1-2 sessions)
All 4 pages, section-for-section against the design/ screenshots, real images slotted, shared TopAppBar/Footer/BottomNavBar. All design deltas from CLAUDE.md applied (prices from data file, hours fixed, fake quote removed, corners sharp, tokens remapped, © 2026). No interactivity. Gate: side-by-side vs screenshots on a phone-width viewport.

**Phase 3 — Order builder + additive components** (~1-2 sessions)
The order builder per skill spec (size-aware, running summary, WhatsApp compile + paired call CTA). Then the two components that fell out of the mockups: floating Most Ordered hero card, Perfect Pairings strip. Gate: full order flow works on a real phone — WhatsApp opens pre-filled, tel: dials.

**Phase 4 — Integrations** (~1 session)
Google Maps embed (plus code MMFH+7WQ), GBP reviews placeholder modules (real embed later, when GBP review widget decision is made), meta/OG tags, favicon from logo.

**Phase 5 — QC + deploy**
Web Projects QC Checklist top to bottom; Lighthouse mobile pass (data-light market — image optimization matters here more than usual); deploy to Vercel preview → your review → Dalitso sign-off → production + Cloudflare DNS on quesopizza.com.

## Trello — replacement checklist for the stale card
Rename "Conversion Landing Page" → "Website Build — 4-Page Site + Order Builder" and replace the checklist:
- [ ] Repo scaffolded (CLAUDE.md, skills, menu data, design refs in place)
- [ ] Phase 1: scaffold + brand tokens — Brandon review
- [ ] Phase 2: 4 static pages match final design — Brandon review
- [ ] Phase 3: order builder + Most Ordered card + Pairings strip — tested on real phone
- [ ] Phase 4: map embed, reviews placeholders, meta tags
- [ ] Hours + address landmark confirmed with Arthur (BLOCKS LAUNCH)
- [ ] Extra Toppings pricing received (or ships as "in-store")
- [ ] Web Projects QC Checklist completed
- [ ] Brandon QC review
- [ ] Vercel preview sent to Dalitso for sign-off
- [ ] Production deploy + quesopizza.com DNS live
Old items to drop: contact form via Make.com (replaced by order builder), GA4 (out of scope), wireframing items (done).

## Using Claude Code effectively on this build

**Sub-agents/teams: mostly no.** Sub-agents earn their cost when work is parallel and independent (big refactors, multi-service repos). This is a 4-page site with one meaningful interactive component — a single session working phase-by-phase is faster, cheaper, and easier to review. On a shared Pro plan, a sub-agent swarm is how you burn a week's usage in an afternoon. The one exception worth doing: at the end of Phase 3, open a **fresh session** and ask it to review the order builder against `.claude/skills/whatsapp-order-builder/SKILL.md` as if it were new to the project. Fresh context catches drift the session that wrote the code can't see. That's sub-agent thinking without the overhead.

**What actually moves the needle here:**
1. **Plan mode before each phase** (Shift+Tab to cycle into it): Claude Code proposes the approach without touching files; you approve; it executes. Matches your phase-gate style exactly.
2. **One phase per session, `/clear` between phases.** Long sessions accumulate stale context and get worse. CLAUDE.md + skills reload fresh every time — that's what they're for.
3. **Commit at every gate.** Ask it to commit with a clear message before you review; rollback becomes trivial.
4. **Feed it the screenshots.** "Match design/menu.png, deltas per CLAUDE.md" beats paragraphs of description.
5. **Skills stay lean.** The two project skills you have are the right ones. Skip plugins/MCP/hooks for this build — setup cost exceeds payoff at this scale. Revisit when BoothLedger starts.

## Kickoff prompt (first message, after repo prep)
```
Read CLAUDE.md, then .claude/skills/queso-brand-tokens/SKILL.md and
.claude/skills/whatsapp-order-builder/SKILL.md, then lib/menu-data.ts.
The four final design screenshots are in design/.

Enter plan mode and propose Phase 1 from the implementation plan: Next.js
App Router + TypeScript + Tailwind scaffold, brand tokens as theme
extensions (sharp corners enforced globally, whatsapp-green scoped per
CLAUDE.md), next/font setup for Epilogue and Inter, lib/site-config.ts
with the UNCONFIRMED markers. No page content yet. Wait for my approval
before writing files.
```

## Open items that block launch (not build)
1. Hours — confirm real trading hours with Arthur
2. Address landmark — "next to" vs "opposite" Access Bank
3. Extra Toppings pricing — clearer photo or numbers
4. Beverages menu — names + prices, or it ships as placeholder
5. WhatsApp order number — confirm which number receives order messages (Dalitso's WA Business), and that he knows pre-filled orders will start arriving
