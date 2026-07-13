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

// PROVISIONAL photo-to-item mapping — only items where the photograph
// defensibly shows that dish. Everything else renders the placeholder
// convention. Confirm the mapping with Brandon before launch.
export const ITEM_IMAGES: Record<string, string> = {
  chicken: "/images/pizza-whole-steam.jpeg",
  "flavorful-chicken": "/images/pizza-closeup.jpeg",
  "queso-original": "/images/pizza-cheese-pull.jpeg",
  "shawarma-platter": "/images/shawarma-box.jpeg",
};
