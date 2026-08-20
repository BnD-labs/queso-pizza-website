// Asserts the RENDERED pages meet WCAG AA — not just the palette.
//
// scripts/check-contrast.mjs checks token PAIRINGS: "cream on dark is fine",
// "black on cream is fine". It passed clean on 2026-08-20 while the built site
// rendered 77 text elements at 1.04:1, because nothing in it can see that a
// component applies `text-queso-cream` on a page whose ground is now cream.
// A palette can be perfect and every word on the page still invisible.
//
// That gap is specific to the v5 ground flip (CLAUDE.md): the tokens inverted
// in one commit, and every `text-queso-cream` left in a component became
// cream-on-cream. This walks the real DOM and measures what a visitor sees.
//
// Usage:
//   npm run build && npx serve out -l 4321
//   node scripts/check-rendered-contrast.mjs [baseUrl]
//
// Limits worth knowing: it reads the nearest opaque ancestor background, so
// text over a photograph is measured against the container behind the photo,
// not the photo. It does not evaluate hover/focus states. Treat a clean run as
// "no flat-colour contrast failures", not "accessible".

import { spawn } from "node:child_process";

const BASE = process.argv[2] || "http://localhost:4321";
const PATHS = ["/", "/menu/", "/about/", "/contact/"];
const MIN = 3.0; // AA large text / UI. Body text should clear 4.5 but this is a floor.
const PORT = 9494;

const CANDIDATES = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
];

const { existsSync } = await import("node:fs");
const browser = process.env.CHROME_PATH || CANDIDATES.find((p) => existsSync(p));
if (!browser) {
  console.error("No Chrome/Edge binary found. Set CHROME_PATH.");
  process.exit(2);
}

const proc = spawn(browser, [
  "--headless=new", "--disable-gpu", "--no-sandbox",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${process.env.TEMP || "/tmp"}/queso-contrast-probe`,
  "--no-first-run", "--hide-scrollbars", "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function firstPage() {
  for (let i = 0; i < 80; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const page = list.find((t) => t.type === "page");
      if (page) return page;
    } catch { /* devtools not up yet */ }
    await sleep(400);
  }
  throw new Error("headless browser never exposed a devtools page");
}

const target = await firstPage();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => { ws.onopen = r; });
let id = 0;
const pending = new Map();
ws.onmessage = (m) => {
  const msg = JSON.parse(m.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
};
const send = (method, params = {}) =>
  new Promise((r) => { const n = ++id; pending.set(n, r); ws.send(JSON.stringify({ id: n, method, params })); });

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });

// Runs in the page. Walks every element that owns a text node, resolves the
// nearest opaque ancestor background, and measures WCAG relative luminance.
const PROBE = `(() => {
  const lum = (c) => {
    const p = c.match(/[0-9.]+/g).map(Number);
    const [r, g, b] = p.slice(0, 3).map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const c = getComputedStyle(n).backgroundColor;
      const p = c.match(/[0-9.]+/g);
      if (p && (p.length < 4 || Number(p[3]) > 0.5)) return c;
      n = n.parentElement;
    }
    return getComputedStyle(document.body).backgroundColor;
  };
  const bad = [];
  for (const el of document.querySelectorAll("h1,h2,h3,h4,h5,p,span,a,li,button,label,td,th")) {
    if (!Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
    const cs = getComputedStyle(el);
    if (cs.opacity === "0" || cs.visibility === "hidden" || cs.display === "none") continue;
    const fg = cs.color, bg = bgOf(el);
    const s = [lum(fg), lum(bg)].sort((a, b) => b - a);
    const ratio = (s[0] + 0.05) / (s[1] + 0.05);
    if (ratio < ${MIN}) bad.push({ tag: el.tagName, ratio: Math.round(ratio * 100) / 100, fg, bg, text: el.textContent.trim().slice(0, 48) });
  }
  return bad;
})()`;

let total = 0;
console.log(`Rendered contrast — ${BASE} (floor ${MIN}:1)\n`);
for (const path of PATHS) {
  await send("Page.navigate", { url: BASE + path });
  await sleep(2500);
  const res = await send("Runtime.evaluate", { expression: PROBE, returnByValue: true });
  if (res.result.exceptionDetails) {
    console.error(`  ${path} — probe threw: ${res.result.exceptionDetails.text}`);
    total++;
    continue;
  }
  const bad = res.result.result.value;
  total += bad.length;
  console.log(`  ${bad.length === 0 ? "PASS" : "FAIL"}  ${path.padEnd(11)} ${bad.length} element(s) under ${MIN}:1`);
  for (const b of bad.slice(0, 12)) {
    console.log(`          ${String(b.ratio).padStart(5)}:1  ${b.tag.padEnd(6)} ${b.fg} on ${b.bg}  "${b.text}"`);
  }
  if (bad.length > 12) console.log(`          ... and ${bad.length - 12} more`);
}

ws.close();
proc.kill();

if (total) {
  console.error(`\n${total} rendered contrast failure(s). See the v5 contrast table in CLAUDE.md.`);
  process.exit(1);
}
console.log("\nAll rendered text within AA.");
process.exit(0);
