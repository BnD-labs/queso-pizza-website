"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import type { PizzaSize } from "@/lib/menu-data";
import {
  orderReducer,
  orderCount,
  orderTotal,
  lineKey,
  reviveOrder,
  serializeOrder,
  ORDER_STORAGE_KEY,
  type OrderLine,
} from "@/lib/order";

interface OrderContextValue {
  lines: OrderLine[];
  count: number;
  total: number;
  /** Quantity currently in the order for an item (and size, for pizzas). */
  qtyOf: (id: string, size?: PizzaSize) => number;
  add: (id: string, name: string, unitPrice: number, size?: PizzaSize) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  clear: () => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(orderReducer, []);
  // Gates the write-back so the first render can't persist an empty order over
  // a stored one before the restore has read it. A ref, not state: flipping it
  // must not itself cause a render.
  const restored = useRef(false);

  // Restore on mount only. Deliberately NOT seeded into useReducer's initial
  // state: every page prerenders under output: "export", so the first client
  // render must match the server HTML or React throws a hydration mismatch.
  useEffect(() => {
    try {
      const stored = reviveOrder(sessionStorage.getItem(ORDER_STORAGE_KEY));
      if (stored.length > 0) dispatch({ type: "hydrate", lines: stored });
    } catch {
      // Private mode / storage disabled — ordering must still work.
    }
    restored.current = true;
  }, []);

  useEffect(() => {
    if (!restored.current) return;
    try {
      if (lines.length === 0) sessionStorage.removeItem(ORDER_STORAGE_KEY);
      else sessionStorage.setItem(ORDER_STORAGE_KEY, serializeOrder(lines));
    } catch {
      // Non-fatal: the order still lives in memory for this page view.
    }
  }, [lines]);

  const value = useMemo<OrderContextValue>(
    () => ({
      lines,
      count: orderCount(lines),
      total: orderTotal(lines),
      qtyOf: (id, size) =>
        lines.find((l) => l.key === lineKey(id, size))?.qty ?? 0,
      add: (id, name, unitPrice, size) =>
        dispatch({ type: "add", id, name, unitPrice, size }),
      increment: (key) => dispatch({ type: "increment", key }),
      decrement: (key) => dispatch({ type: "decrement", key }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [lines],
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within <OrderProvider>");
  return ctx;
}
