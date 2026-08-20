// Asserts public/images stays within its weight budget.
//
// This exists because next.config.ts sets images.unoptimized — a static export
// has no runtime image optimizer, so `sizes=` does nothing and every byte in
// this folder is a byte some phone on a Chongwe mobile network downloads at
// full resolution. There is no safety net between "drop a file in public/" and
// "ship a 3 MB JPEG", and on 2026-08-19 a photography drop briefly put 33 MB
// in this folder. This is that safety net.
//
// The budget was ~950 KB through the v4 build, when the folder held nine
// generic photographs. It was raised to 1300 KB on 2026-08-20 when the
// founder's own photography landed: real local photography is the entire point
// of the v5 rebrand, and it is worth the weight in a way stock never was.
// Raise it again only for photographs that earn it — never to unblock a commit.
//
// Run: node scripts/check-image-budget.mjs

import { readdirSync, statSync } from "node:fs";

const DIR = "public/images";
const BUDGET_KB = 1300;
// Anything above this is almost certainly an un-resized original. The largest
// legitimate asset is the LCP hero; everything else is lazy and below the fold.
const PER_FILE_KB = 200;

const files = readdirSync(DIR)
  .filter((f) => !f.startsWith("."))
  .map((f) => ({ name: f, kb: statSync(`${DIR}/${f}`).size / 1024 }))
  .sort((a, b) => b.kb - a.kb);

const total = files.reduce((n, f) => n + f.kb, 0);
const oversized = files.filter((f) => f.kb > PER_FILE_KB);

console.log(`Image budget — ${DIR}\n`);
for (const f of files) {
  console.log(`  ${f.kb.toFixed(0).padStart(5)}K  ${f.kb > PER_FILE_KB ? "OVER  " : "      "}${f.name}`);
}
console.log(`\n  ${total.toFixed(0)}K total / ${BUDGET_KB}K budget (${files.length} files)`);

let failed = false;
if (total > BUDGET_KB) {
  console.error(`\nOver budget by ${(total - BUDGET_KB).toFixed(0)}K.`);
  console.error("Re-run scripts/build-photos.mjs, or justify a new budget in this file's header.");
  failed = true;
}
if (oversized.length) {
  console.error(`\n${oversized.length} file(s) over the ${PER_FILE_KB}K per-file cap:`);
  for (const f of oversized) console.error(`  ${f.kb.toFixed(0)}K  ${f.name}`);
  console.error("These look like un-resized originals. Originals belong in assets-source/, not public/.");
  failed = true;
}
if (failed) process.exit(1);
console.log("\nWithin budget.");
