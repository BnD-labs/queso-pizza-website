// lib/order.ts
// Order-builder core: line-item state, reducer, and WhatsApp message
// compilation. Pure functions — React wiring lives in components/order.
// Pattern spec: .claude/skills/whatsapp-order-builder/SKILL.md
// (single-visit flow: no persistence, no payments, no tracking).

import type { PizzaSize } from "./menu-data";

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
