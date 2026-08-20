// Asserts every shipped colour pairing meets WCAG AA.
//
// This exists because CLAUDE.md v5 inverted the contrast rules: the ground moved
// from near-black to cream, which made queso-red usable as text and made
// queso-yellow unusable as text. Those two facts are easy to get backwards, and
// getting them backwards ships text nobody can read. A human reviewing a diff
// will not catch a 1.1:1 pairing; this will.
//
// Values are parsed out of app/globals.css so the check can never drift from the
// tokens it is checking. Run: node scripts/check-contrast.mjs

import { readFileSync } from "node:fs";
import path from "node:path";

const CSS = readFileSync(path.resolve("app/globals.css"), "utf8");

function token(name) {
  const m = CSS.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{3,8});`));
  if (!m) throw new Error(`token --color-${name} not found in app/globals.css`);
  return m[1];
}

function srgbToLinear(c) {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function luminance(hex) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function ratio(fg, bg) {
  const [a, b] = [luminance(fg), luminance(bg)].sort((x, y) => y - x);
  return (a + 0.05) / (b + 0.05);
}

// [label, foreground token, background token, minimum]
// 4.5 = AA body text. 3.0 = AA large text (>=18.66px bold / 24px) and UI borders.
const PAIRS = [
  ["body ink on cream ground",        "queso-black",   "queso-cream",     4.5],
  ["muted body copy on cream",        "ink-soft",      "queso-cream",     4.5],
  ["RED AS TEXT on cream (v5 unlock)","queso-red",      "queso-cream",     4.5],
  ["ink on raised white card",        "queso-black",   "surface",         4.5],
  ["ink on warm surface",             "queso-black",   "surface-warm",    4.5],
  ["ink on sunken surface",           "queso-black",   "surface-sunk",    4.5],
  ["muted copy on warm surface",      "ink-soft",      "surface-warm",    4.5],
  ["cream on red fill (CTA)",         "queso-cream",   "queso-red",       4.5],
  ["ink on yellow fill (badge)",      "queso-black",   "queso-yellow",    4.5],
  ["ink on WhatsApp green",           "queso-black",   "whatsapp-green",  4.5],
  ["cream on dark accent (footer)",   "queso-cream",   "dark",            4.5],
  ["cream on dark-soft accent",       "queso-cream",   "dark-soft",       4.5],
  ["focus ring vs cream ground",      "queso-red",     "queso-cream",     3.0],
  // The v5 hero is a solid red band (2026-08-21). Red is a GROUND there, not a
  // fill on cream, which is a pairing the table in CLAUDE.md does not cover —
  // so both directions are asserted here rather than eyeballed.
  ["hero body copy on red ground",    "queso-cream",   "queso-red",       4.5],
  ["hero rating stars on red",        "queso-yellow",  "queso-red",       3.0],
  ["hero CTA ink on cream fill",      "queso-red",     "queso-cream",     4.5],
];

// Pairings that MUST fail — the v5 rules say these are banned, so if one ever
// starts passing it means a token drifted and the ban is no longer enforced by
// the palette itself.
const MUST_FAIL = [
  ["yellow as text on cream (BANNED)", "queso-yellow", "queso-cream", 4.5],
  ["white on WhatsApp green (BANNED)", "surface",      "whatsapp-green", 4.5],
];

let failed = 0;
console.log("WCAG AA contrast gate — tokens read from app/globals.css\n");
for (const [label, fg, bg, min] of PAIRS) {
  const r = ratio(token(fg), token(bg));
  const ok = r >= min;
  if (!ok) failed++;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(6)}:1  (min ${min})  ${label}`);
}

console.log("\nBanned pairings — these are expected to fail, and must stay failing:\n");
for (const [label, fg, bg, min] of MUST_FAIL) {
  const r = ratio(token(fg), token(bg));
  const stillBanned = r < min;
  if (!stillBanned) failed++;
  console.log(`  ${stillBanned ? "OK (banned)" : "UNEXPECTED PASS"}  ${r.toFixed(2)}:1  ${label}`);
}

if (failed) {
  console.error(`\n${failed} contrast problem(s). See the contrast table in CLAUDE.md.`);
  process.exit(1);
}
console.log("\nAll pairings within AA.");
