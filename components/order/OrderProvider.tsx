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
  orderSignature,
  ORDER_STORAGE_KEY,
  ORDER_SENT_STORAGE_KEY,
  type OrderAction,
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
  /**
   * True only while the order on screen is EXACTLY the one handed off to
   * WhatsApp. Any edit — clearing it, removing an item, adding one — makes this
   * false again, because it is no longer the order that was sent.
   */
  isSent: boolean;
  /** Record that the current order has been handed off to WhatsApp. */
  markSent: () => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

/**
 * The order, plus a fingerprint of whatever version of it was last handed off
 * to WhatsApp.
 *
 * These live in ONE reducer rather than as separate pieces of state, and that
 * is load-bearing. The two must move together: any edit to the lines
 * invalidates a previous send, and restoring from storage brings both back at
 * once. Keeping the flag beside the reducer instead meant clearing it from an
 * effect that watched `lines`, which is a setState inside an effect — the
 * cascading-render pattern React lints against. Here it is one atomic
 * transition and there is no window where the two disagree.
 */
type OrderState = { lines: OrderLine[]; sentSig: string | null };

type ProviderAction =
  | OrderAction
  | { type: "markSent" }
  | { type: "hydrateSent"; sig: string };

const INITIAL: OrderState = { lines: [], sentSig: null };

function reducer(state: OrderState, action: ProviderAction): OrderState {
  switch (action.type) {
    case "markSent":
      return { ...state, sentSig: orderSignature(state.lines) };
    case "hydrateSent":
      return { ...state, sentSig: action.sig };
    default: {
      const lines = orderReducer(state.lines, action);
      if (lines === state.lines) return state;
      // The order changed, so it is no longer the one that was sent. `hydrate`
      // is the exception: a restore is not an edit, and it arrives paired with
      // the stored signature.
      return {
        lines,
        sentSig: action.type === "hydrate" ? state.sentSig : null,
      };
    }
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const { lines, sentSig } = state;
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
      const sig = sessionStorage.getItem(ORDER_SENT_STORAGE_KEY);
      if (sig) dispatch({ type: "hydrateSent", sig });
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

  // Mirror the sent fingerprint to storage. It is persisted rather than kept in
  // memory because on a phone — the primary target — tapping a wa.me link
  // leaves the browser for the WhatsApp app, and coming back often reloads the
  // tab. In-memory state would vanish exactly when it matters.
  useEffect(() => {
    if (!restored.current) return;
    try {
      if (sentSig === null) sessionStorage.removeItem(ORDER_SENT_STORAGE_KEY);
      else sessionStorage.setItem(ORDER_SENT_STORAGE_KEY, sentSig);
    } catch {
      // Non-fatal.
    }
  }, [sentSig]);

  // Derived, never stored as its own boolean. The length check matters: two
  // empty orders have identical signatures, so without it an order that was
  // sent and then cancelled would still claim to be sent — which is the bug
  // this whole arrangement exists to kill.
  const isSent =
    lines.length > 0 && sentSig !== null && sentSig === orderSignature(lines);

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
      isSent,
      markSent: () => dispatch({ type: "markSent" }),
    }),
    [lines, isSent],
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
