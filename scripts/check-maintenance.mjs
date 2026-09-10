// Asserts public/maintenance.html still carries the real phone numbers.
//
// public/maintenance.html is a standalone hand-written file — it cannot import
// from lib/site-config.ts, because it is served directly by the assets binding
// with no build step between the file and the customer. That buys it
// independence from the site chrome (see the comment at the top of the file)
// at the cost of duplicating the one thing that must never be wrong on it.
//
// The stakes are specific: this page is what a customer sees when the site is
// down, so it is the moment its phone numbers matter MOST and the moment
// nobody is looking at it. A number could be corrected in lib/site-config.ts
// and sit stale here for months without a single visitor to notice.
//
// Colours and copy are not checked. The four brand colours are locked by
// CLAUDE.md and cannot drift; the numbers can.
//
// Run: node scripts/check-maintenance.mjs

import { readFileSync } from "node:fs";

const CONFIG = "lib/site-config.ts";
const PAGE = "public/maintenance.html";

const config = readFileSync(CONFIG, "utf8");
const page = readFileSync(PAGE, "utf8");

/** Pulls an E.164 number out of the `phones` block by field name. */
function phoneFromConfig(field) {
  const m = config.match(new RegExp(`${field}:\\s*"(\\+\\d+)"`));
  if (!m) {
    console.error(`Could not find phones.${field} in ${CONFIG}.`);
    console.error("The field was renamed or removed — update this script to match.");
    process.exit(2);
  }
  return m[1];
}

/** Mirrors formatPhone() in lib/site-config.ts: +260976056200 -> (+260) 97 6056 200 */
function formatPhone(e164) {
  const m = e164.match(/^\+260(\d{2})(\d{4})(\d{3})$/);
  return m ? `(+260) ${m[1]} ${m[2]} ${m[3]}` : e164;
}

const delivery1 = phoneFromConfig("delivery1");
const delivery2 = phoneFromConfig("delivery2");
const whatsapp = phoneFromConfig("whatsappOrder");

const checks = [
  {
    label: "WhatsApp order link",
    // wa.me takes the number without the leading "+".
    needle: `https://wa.me/${whatsapp.replace("+", "")}`,
    source: `phones.whatsappOrder (${whatsapp})`,
  },
  {
    label: "delivery line 1 — tel: link",
    needle: `href="tel:${delivery1}"`,
    source: `phones.delivery1 (${delivery1})`,
  },
  {
    label: "delivery line 1 — displayed",
    needle: formatPhone(delivery1),
    source: `formatPhone(phones.delivery1)`,
  },
  {
    label: "delivery line 2 — tel: link",
    needle: `href="tel:${delivery2}"`,
    source: `phones.delivery2 (${delivery2})`,
  },
  {
    label: "delivery line 2 — displayed",
    needle: formatPhone(delivery2),
    source: `formatPhone(phones.delivery2)`,
  },
];

console.log(`Maintenance page — ${PAGE}\n`);

let failed = false;
for (const c of checks) {
  const ok = page.includes(c.needle);
  if (!ok) failed = true;
  console.log(`  ${ok ? "PASS" : "FAIL"}  ${c.label.padEnd(32)} ${c.needle}`);
}

// A maintenance page with no way to reach the shop is the one outcome that
// makes an outage worse than it needs to be. Assert the routes exist at all,
// independently of which number they point at.
if (!/href="https:\/\/wa\.me\//.test(page)) {
  console.error("\nNo WhatsApp link on the maintenance page at all.");
  failed = true;
}
if (!/href="tel:/.test(page)) {
  console.error("\nNo tel: link on the maintenance page at all.");
  failed = true;
}

if (failed) {
  console.error(`\n${PAGE} has drifted from ${CONFIG}.`);
  console.error("Update the maintenance page to match the config — the config is the source of truth.");
  process.exit(1);
}

console.log("\nMaintenance page matches site-config.");
