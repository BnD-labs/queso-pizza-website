// lib/menu-data.ts
// SINGLE SOURCE OF TRUTH for all Queso Pizza menu items and prices.
// Verified against the physical menu cards (Arthur, July 2026).
// Do NOT modify prices without explicit instruction from Brandon.
// All prices in Zambian Kwacha (K).

export type PizzaSize = "S" | "M" | "L" | "XL";

export interface PizzaItem {
  id: string;
  name: string;
  tier: "classic" | "special"; // special renders the yellow SPECIAL badge
  prices: Record<PizzaSize, number>;
  description?: string; // optional, keep short & honest — no invented ingredients
  image?: string; // path under /public/images; omit -> placeholder convention
}

export interface FlatItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
}

export const PIZZAS: PizzaItem[] = [
  // ——— Classic ———
  { id: "chicken", name: "Chicken", tier: "classic", prices: { S: 75, M: 125, L: 180, XL: 230 } },
  { id: "flavorful-chicken", name: "Flavorful Chicken", tier: "classic", prices: { S: 75, M: 125, L: 180, XL: 230 } },
  { id: "chicken-mushroom", name: "Chicken and Mushroom", tier: "classic", prices: { S: 75, M: 125, L: 180, XL: 230 } },
  { id: "beef", name: "Beef", tier: "classic", prices: { S: 75, M: 125, L: 180, XL: 230 } },
  { id: "flavorful-beef", name: "Flavorful Beef", tier: "classic", prices: { S: 75, M: 125, L: 180, XL: 230 } },
  { id: "vegetarian", name: "Vegetarian", tier: "classic", prices: { S: 75, M: 120, L: 180, XL: 240 } },
  // ——— Special ———
  { id: "creamy-chicken", name: "Creamy Chicken", tier: "special", prices: { S: 95, M: 165, L: 210, XL: 300 } },
  { id: "chicken-tika", name: "Chicken Tika", tier: "special", prices: { S: 85, M: 155, L: 200, XL: 290 } },
  { id: "queso-original", name: "Queso Original", tier: "special", prices: { S: 85, M: 155, L: 200, XL: 290 } },
  { id: "all-in-one", name: "All In One", tier: "special", prices: { S: 85, M: 155, L: 200, XL: 290 } },
];

export const SHAWARMA: FlatItem[] = [
  { id: "regular-shawarma", name: "Regular Shawarma", price: 40 },
  { id: "mega-shawarma", name: "Mega Shawarma", price: 50 },
  { id: "shawarma-platter", name: "Shawarma Platter", price: 90 },
  { id: "chicken-tornado", name: "Chicken Tornado", price: 65 },
];

export const FRIES: FlatItem[] = [
  { id: "regular-fries", name: "Regular Fries", price: 25 },
  { id: "fries-salad", name: "Fries with Salad", price: 30 },
  { id: "fries-chicken-fingers", name: "Fries with Chicken Fingers", price: 70 },
  { id: "triple-threat", name: "Triple Threat", price: 75 },
];

export const EXTRA_CHEESE: Record<PizzaSize, number> = { S: 10, M: 15, L: 20, XL: 25 };

// Extra Toppings: pricing NOT yet confirmed. Render "Pricing available in-store."
// Never display a number for extra toppings until real pricing is provided.
export const EXTRA_TOPPINGS_CONFIRMED = false;

// Beverages: NO verified data exists. Render the flagged placeholder module.
// Do not invent drink names or prices.
export const BEVERAGES: FlatItem[] = [];
