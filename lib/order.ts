// lib/order.ts
// Order-builder core: line-item state, reducer, and WhatsApp message
// compilation. Pure functions — React wiring lives in components/order.
// Pattern spec: .claude/skills/whatsapp-order-builder/SKILL.md
//
// PERSISTENCE NOTE (2026-08-18). The skill lists "no cart persistence across
// sessions" as an explicit non-goal, and that still holds: nothing here uses
// localStorage or cookies, and closing the tab discards the order.
//
// What this DOES restore is an in-progress order across a reload of the same
// tab, via sessionStorage. That is not a cross-session cart — it is the fix for
// a real defect in the flow the skill itself describes: submitting sends the
// customer off-site to WhatsApp, and on the mid-range Android this site targets
// Chrome frequently discards the backgrounded tab. Returning "to finish the
// order" then found it empty. Single-visit stays single-visit.

import { PIZZAS, SHAWARMA, FRIES, type PizzaSize } from "./menu-data";

export interface OrderLine {
  /** Unique line key: flat items use the item id, pizzas use `id:size`. */
  key: string;
  id: string;
  name: string;
  size?: PizzaSize;
  unitPrice: number;
  qty: number;
}

export type OrderAction =
  | {
      type: "add";
      id: string;
      name: string;
      unitPrice: number;
      size?: PizzaSize;
    }
  | { type: "increment"; key: string }
  | { type: "decrement"; key: string }
  | { type: "hydrate"; lines: OrderLine[] }
  | { type: "clear" };

export function lineKey(id: string, size?: PizzaSize): string {
  return size ? `${id}:${size}` : id;
}

export function orderReducer(
  lines: OrderLine[],
  action: OrderAction,
): OrderLine[] {
  switch (action.type) {
    case "add": {
      const key = lineKey(action.id, action.size);
      const existing = lines.find((l) => l.key === key);
      if (existing) {
        return lines.map((l) =>
          l.key === key ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [
        ...lines,
        {
          key,
          id: action.id,
          name: action.name,
          size: action.size,
          unitPrice: action.unitPrice,
          qty: 1,
        },
      ];
    }
    case "increment":
      return lines.map((l) =>
        l.key === action.key ? { ...l, qty: l.qty + 1 } : l,
      );
    case "decrement":
      // Decrementing to zero removes the line (stepper-only editing, no free text).
      return lines
        .map((l) => (l.key === action.key ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0);
    // Restores a revived order. Guarded here rather than in the effect: a deep
    // link (MenuAddHandler) is a child of the provider, so its add dispatches
    // before the provider's own mount effect. Refusing to overwrite a non-empty
    // order makes the restore correct no matter which lands first.
    case "hydrate":
      return lines.length > 0 ? lines : action.lines;
    case "clear":
      return [];
  }
}

export function orderCount(lines: OrderLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty, 0);
}

export function orderTotal(lines: OrderLine[]): number {
  return lines.reduce((sum, l) => sum + l.qty * l.unitPrice, 0);
}

export function lineLabel(line: OrderLine): string {
  return line.size ? `${line.name} (${line.size})` : line.name;
}

/**
 * Compiles the itemized order text per the order-builder spec:
 * name, size, qty, line total, order total — one item per line.
 */
export function compileOrderMessage(lines: OrderLine[]): string {
  const items = lines
    .map((l) => `${l.qty}x ${lineLabel(l)} - K${l.qty * l.unitPrice}`)
    .join("\n");
  return `Hi Queso Pizza! I'd like to place an order:\n\n${items}\n\nTotal: K${orderTotal(lines)}`;
}

/** Builds the wa.me deep link with the URL-encoded compiled order. */
export function waOrderUrl(e164Phone: string, lines: OrderLine[]): string {
  const number = e164Phone.replace(/\D/g, "");
  if (lines.length === 0) return `https://wa.me/${number}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(compileOrderMessage(lines))}`;
}

/* ─── In-visit restore ────────────────────────────────────────────────────── */

/** sessionStorage key. Versioned so a shape change can't revive as garbage. */
export const ORDER_STORAGE_KEY = "queso.order.v1";

/**
 * Stores the signature of the order that was last handed off to WhatsApp.
 *
 * Persisted rather than held in memory because on a phone — the primary target
 * — tapping a wa.me link leaves the browser for the WhatsApp app entirely, and
 * coming back frequently reloads the tab. In-memory "sent" state would be gone
 * exactly when the customer most needs to see it.
 */
export const ORDER_SENT_STORAGE_KEY = "queso.order.sent.v1";

const SIZES: readonly PizzaSize[] = ["S", "M", "L", "XL"];
const PIZZA_BY_ID = new Map(PIZZAS.map((p) => [p.id, p]));
const FLAT_BY_ID = new Map([...SHAWARMA, ...FRIES].map((i) => [i.id, i]));

/** Guards against a hand-edited payload turning into an absurd order. */
const MAX_QTY = 99;
const MAX_LINES = 50;

/**
 * Rebuilds order lines from stored JSON, re-deriving every name and price from
 * lib/menu-data.ts rather than trusting what was written.
 *
 * The data file is the single source of truth (CLAUDE.md), and a stored order
 * can outlive a price change by hours. Trusting the stored unitPrice would let
 * a customer send yesterday's prices to the kitchen — the order text is what
 * staff work from, so that is a money bug, not a display bug. Unknown ids are
 * dropped rather than guessed.
 */
export function reviveOrder(raw: string | null): OrderLine[] {
  if (!raw) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const byKey = new Map<string, OrderLine>();

  for (const entry of parsed.slice(0, MAX_LINES)) {
    if (typeof entry !== "object" || entry === null) continue;
    const { id, size, qty } = entry as Record<string, unknown>;
    if (typeof id !== "string") continue;
    if (typeof qty !== "number" || !Number.isInteger(qty) || qty < 1) continue;

    let line: Omit<OrderLine, "qty"> | null = null;

    if (size === undefined || size === null) {
      const item = FLAT_BY_ID.get(id);
      if (item) {
        line = { key: lineKey(item.id), id: item.id, name: item.name, unitPrice: item.price };
      }
    } else if (typeof size === "string" && SIZES.includes(size as PizzaSize)) {
      const pizza = PIZZA_BY_ID.get(id);
      if (pizza) {
        const s = size as PizzaSize;
        line = {
          key: lineKey(pizza.id, s),
          id: pizza.id,
          name: pizza.name,
          size: s,
          unitPrice: pizza.prices[s],
        };
      }
    }
    if (!line) continue;

    const existing = byKey.get(line.key);
    byKey.set(line.key, {
      ...line,
      qty: Math.min((existing?.qty ?? 0) + qty, MAX_QTY),
    });
  }

  return [...byKey.values()];
}

/** Stores only identity + quantity; prices are re-derived on revive. */
export function serializeOrder(lines: OrderLine[]): string {
  return JSON.stringify(
    lines.map((l) => ({ id: l.id, size: l.size, qty: l.qty })),
  );
}

/**
 * A stable fingerprint of an order's CONTENT, used to decide whether the order
 * on screen is still the one that was sent to WhatsApp.
 *
 * Sorted, because "Chicken then Fries" and "Fries then Chicken" are the same
 * order and must not read as different ones just because of insertion order.
 *
 * This is what makes "Order sent!" honest. The flag used to be a plain boolean
 * that was set on click and never cleared, so it survived the customer
 * emptying the order, removing an item, or — worst — ADDING one, which left the
 * site claiming an item had been sent that WhatsApp never saw.
 */
export function orderSignature(lines: OrderLine[]): string {
  return JSON.stringify(
    lines
      .map((l) => `${l.id}|${l.size ?? ""}|${l.qty}`)
      .sort(),
  );
}
