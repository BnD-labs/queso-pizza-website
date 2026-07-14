"use client";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { PizzaSize } from "@/lib/menu-data";
import {
  orderReducer,
  orderCount,
  orderTotal,
  lineKey,
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
