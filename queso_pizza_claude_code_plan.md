# Queso Pizza — Claude Code Build Plan

## 1. Workflow decision (confirmed)
Stitch (done) → **Figma** polish (James executes, Brandon QC's before it's "final") → **Claude Code** build. Claude Design skipped for this project — reserve that credit spend for build-phase Claude Code work.

## 2. Tech stack (confirmed, no additions needed)
- Next.js + TypeScript + TailwindCSS + React
- No database — fully static/client-side build, no accounts or persisted state. Revisit only if a future retainer phase wants order analytics.
- Hosting: Vercel (primary). GitHub Pages fallback isn't necessary here since there's no reason to expect Vercel limits to be hit on a 4-page site — but it's there if needed.
- DNS: Cloudflare, domain `quesopizza.com`
- Deploy target: Vercel preview URL for client review → production on custom domain after Dalitso sign-off

## 3. Repo structure
```
queso-pizza/
├── CLAUDE.md                    # project constitution — see section 4
├── .claude/
│   └── skills/                  # project-level skills (see section 5)
│       ├── queso-brand-tokens/
│       │   └── SKILL.md
│       └── whatsapp-order-builder/
│           └── SKILL.md
├── app/
│   ├── page.tsx                 # Home
│   ├── menu/page.tsx             # Menu & Order
│   ├── about/page.tsx            # About / Our Story
│   └── contact/page.tsx          # Contact / Find Us
├── components/
│   ├── hero.tsx
│   ├── menu-item-card.tsx
│   ├── order-builder.tsx         # the core interactive component
│   ├── sticky-cta.tsx            # dual WhatsApp + call CTA
│   ├── reviews-embed.tsx
│   ├── map-embed.tsx
│   └── footer.tsx
├── lib/
│   └── menu-data.ts              # single source of truth for the 5-section menu
├── public/
│   └── images/                   # real photography only — flagged placeholders live here too
└── tailwind.config.ts            # brand tokens as Tailwind theme extensions
```

## 4. CLAUDE.md (drop this in the repo root — full content in the companion file)
Covers: project overview, locked brand tokens, page structure, the WhatsApp-order-builder + call-to-confirm functional spec, content/placeholder conventions, and explicit "don't build" boundaries (no cart, no payment gateway, no login). This is what every Claude Code session in this repo reads first — it's the project's constitution, not a one-time prompt.

## 5. Skills setup — and a productization angle worth taking seriously
Two project-level skills worth building now, in `.claude/skills/`:

- **`queso-brand-tokens`** — encodes the locked hex values, fonts, and dark/premium art direction so every session applies them automatically without you re-pasting the brand system into every prompt. Small, but it's the thing that prevents drift across a multi-session build.
- **`whatsapp-order-builder`** — encodes the order-builder pattern itself: running-order state, WhatsApp message compilation format, paired call-to-confirm action. This is the one worth flagging: it's a direct fit for the **productization mandate** already in motion for the Lead Capture Bundle. Every future Growth Starter client with a physical storefront and no POS is going to want this exact pattern. Building it as a documented Skill (not just inline code) means the next client deployment is "adapt the skill," not "rebuild the component" — same instinct as the Dashboard Master Template, just for the ordering UX instead of the reporting layer.

Your personal skills folder (`~/.claude/skills/`) stays as-is for anything generic across projects — coding style, git conventions, whatever's already proven useful. No conflict: project skills override personal ones by name if they ever collide.

## 6. Build phases
1. **Scaffold** — Next.js project init, Tailwind config with brand tokens, folder structure above, CLAUDE.md + both project skills in place before any page gets built.
2. **Static shell** — all 4 pages, real content and photography slotted in (placeholders where flagged), no interactivity yet.
3. **Order builder** — the interactive component: item selection, running order state, WhatsApp message compilation, paired call-to-confirm button.
4. **Integrations** — Google Maps embed, GBP reviews embed, sticky dual CTA across all pages.
5. **QC pass** — Web Projects QC Checklist (Operations Hub) before this goes anywhere near Dalitso. James can execute fixes; can't move it to Client Approval without your sign-off, per the standing rule.
6. **Deploy** — Vercel preview → client review → production on `quesopizza.com` after sign-off.

## 7. Kickoff prompt — first message to send Claude Code
```
I'm building a 4-page Next.js + TypeScript + Tailwind website for Queso Pizza,
a fast-food restaurant in Chongwe, Zambia. Read CLAUDE.md in this repo root
first — it has the full brand system, page structure, and functional spec,
including a custom WhatsApp order-builder component that is the core feature
of this build. Also check .claude/skills/ for the queso-brand-tokens and
whatsapp-order-builder skills before writing any code.

Start with Phase 1 from the build plan: scaffold the Next.js project, set up
tailwind.config.ts with the brand tokens as theme extensions, and create the
folder structure for app/, components/, and lib/. Don't build any page content
yet — just the scaffold. Confirm the structure with me before moving to
Phase 2.
```
