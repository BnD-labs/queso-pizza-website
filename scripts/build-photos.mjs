// Regenerates the shipped photography in public/images from the full-resolution
// originals in assets-source/photography-2026-08/.
//
// Why this exists: next.config.ts sets images.unoptimized (a static export has
// no runtime optimizer), so whatever lands in public/images is exactly what a
// phone on a Chongwe mobile network downloads. Sizes are therefore chosen per
// USE, not per source — a 64px FlatItemRow thumb gets a 320px square, not a
// 2816px original, because `sizes=` cannot save it here.
//
// Run: node scripts/build-photos.mjs

import sharp from "sharp";
import { mkdirSync, statSync } from "node:fs";

const SRC = "assets-source/photography-2026-08";
const OUT = "public/images";

// Only photographs verified as Queso's own. Everything else in the source
// folder is held back — see the 2026-08-20 photography audit in CLAUDE.md.
const JOBS = [
  // Flat menu items render in FlatItemRow at 64px square. 320 covers 2x DPR
  // and the planned Perfect Pairings chips; anything larger is dead weight.
  { src: "Chicken tornado-6.jpg",  out: "chicken-tornado.jpeg",       w: 320,  h: 320,  pos: "centre" },
  { src: "Tripple threat-1.jpg",   out: "triple-threat.jpeg",         w: 320,  h: 320,  pos: "centre" },
  { src: "Chicken fingers with fries.jpg", out: "fries-chicken-fingers.jpeg", w: 320, h: 320, pos: "attention" },
  // Re-encode: this shipped at 129K to fill a 64px box, the single largest
  // piece of dead weight in the folder.
  { src: "shawarma-box-original.jpeg", out: "shawarma-box.jpeg",  w: 320,  h: 320,  pos: "attention" },

  // Section-scale photography: rendered up to ~704px wide, so 1200 covers ~1.7x
  // DPR — the point where further pixels stop being visible on a phone.
  { src: "Queso Interior shot-2.jpg", out: "interior-counter.jpeg",   w: 1200, h: 900 , pos: "centre" },
  { src: "Interior shot 3.JPG",       out: "interior-diners.jpeg",    w: 1200, h: 900 , pos: "centre" },
  { src: "Meal prep.jpg",             out: "kitchen-prep.jpeg",       w: 1100, h: 1467, pos: "centre" },

  // PizzaCard renders 4:3 at 33vw on desktop (~427px), so 1000 covers 2x DPR.
  // Kept from the enhanced set by Brandon's call, 2026-08-20 — the only one of
  // the supplied pizza frames that plausibly depicts its own menu item. See the
  // caveat in lib/menu-content.ts.
  { src: "Creamy_Grilled_Chicken_Pizza.png_2K_202608191911.jpeg", out: "creamy-chicken.jpeg", w: 1000, h: 750, pos: "centre" },

  // Beverages: 4:5 portrait band. This retires the Beverages placeholder —
  // the fridge shot is the evidence behind "available in-store".
  { src: "Bevereage_shot.jpg_202608191730.jpeg", out: "beverages-fridge.jpeg", w: 760, h: 950, pos: "centre" },
];

// The v5 hero renders this one as a circle on the red band, and a centred
// square crop is not good enough for that: it leaves slate corners inside the
// circle, so it reads as a round photo OF a pizza rather than as the pizza.
// The crop is therefore an explicit box around the pie, derived once by
// thresholding the greyscale (the slate is far darker than the crust) and
// pinned here so it stays reproducible.
const HERO_ROUND = {
  src: "pizza-top-down.jpeg",
  out: "pizza-hero-round.jpeg",
  extract: { left: 34, top: 219, width: 769, height: 769 },
  size: 720,
};

mkdirSync(OUT, { recursive: true });
let total = 0;
for (const j of JOBS) {
  await sharp(`${SRC}/${j.src}`)
    .resize(j.w, j.h, { fit: "cover", position: j.pos })
    .jpeg({ quality: 72, mozjpeg: true, progressive: true })
    .toFile(`${OUT}/${j.out}`);
  const kb = statSync(`${OUT}/${j.out}`).size / 1024;
  total += kb;
  console.log(`${kb.toFixed(0).padStart(4)}K  ${j.out.padEnd(28)} ${j.w}x${j.h}  <- ${j.src}`);
}

await sharp(`${SRC}/${HERO_ROUND.src}`)
  .extract(HERO_ROUND.extract)
  .resize(HERO_ROUND.size, HERO_ROUND.size)
  .jpeg({ quality: 74, mozjpeg: true, progressive: true })
  .toFile(`${OUT}/${HERO_ROUND.out}`);
{
  const kb = statSync(`${OUT}/${HERO_ROUND.out}`).size / 1024;
  total += kb;
  console.log(`${kb.toFixed(0).padStart(4)}K  ${HERO_ROUND.out.padEnd(28)} ${HERO_ROUND.size}x${HERO_ROUND.size}  <- ${HERO_ROUND.src} (pinned crop)`);
}

console.log(`----\n${total.toFixed(0)}K generated`);
