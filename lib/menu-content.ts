// lib/menu-content.ts
// Presentation-layer content for menu items: display copy and photo mapping.
// Items, prices, and sizes live ONLY in lib/menu-data.ts — never here.
//
// Descriptions are the final Figma copy (keyed to menu-data ids; the mockup's
// item names differ in places — data names are authoritative).
export const ITEM_DESCRIPTIONS: Record<string, string> = {
  chicken: "House-made sauce, succulent chicken pieces, melted mozzarella.",
  "queso-original":
    "Our signature blend of premium cheeses, herbs, and slow-roasted garlic.",
  vegetarian:
    "Seasonal garden vegetables, black olives, and fresh bell peppers.",
  "regular-shawarma": "Classic spiced chicken, garlic sauce, and fresh wrap.",
  "mega-shawarma": "Extra portion of our heritage chicken for the big hunger.",
  "shawarma-platter":
    "Sliced shawarma served with fries, salad, and signature dips.",
  "chicken-tornado": "Our spicy, rolled specialty with a punch of flavor.",
};

// Photo-to-item mapping — only items where the photograph defensibly shows
// THAT dish. Everything else renders text-forward (see the v4 amendment in
// CLAUDE.md); an approximate photo is worse than none, because the customer
// orders off it.
//
// The four entries below the rule were added 2026-08-20 from the founder's own
// shoot (Canon PowerShot S3 IS, 2026-08-04) and are the first item photographs
// verifiably taken at the shop. The pizzas supplied alongside them were held
// back: they were AI re-renders, and two contradicted their own labels — the
// "Beef" frame showed chicken, "Flavorful Beef" showed ham and mushroom.
export const ITEM_IMAGES: Record<string, string> = {
  chicken: "/images/pizza-whole-steam.jpeg",
  "flavorful-chicken": "/images/pizza-closeup.jpeg",
  "queso-original": "/images/pizza-cheese-pull.jpeg",
  "shawarma-platter": "/images/shawarma-box.jpeg",
  // ——— verified Queso photography ———
  "chicken-tornado": "/images/chicken-tornado.jpeg",
  "triple-threat": "/images/triple-threat.jpeg",
  "fries-chicken-fingers": "/images/fries-chicken-fingers.jpeg",
};

/**
 * Menu section jump targets. Shared by the in-page intro pills (mobile) and
 * the sticky MenuCategoryNav (md+) so the two can never drift apart — the
 * previous list omitted Beverages even though <section id="beverages"> exists.
 */
export const MENU_CATEGORIES = [
  { id: "pizza", label: "Pizza" },
  { id: "shawarma", label: "Shawarma" },
  { id: "fries", label: "Fries" },
  { id: "beverages", label: "Beverages" },
] as const;
