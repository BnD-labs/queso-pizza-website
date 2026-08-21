"use client";

import { useEffect, useState } from "react";
import { useOrder } from "./OrderProvider";

/**
 * Cancels the whole order.
 *
 * This did not exist. `clear()` was on the order context from the start but no
 * UI ever called it, so the only way for a customer to abandon an order was to
 * decrement every line to zero one tap at a time — and on the one surface where
 * hesitation costs a sale.
 *
 * Two-tap confirm rather than a modal: wiping an order is destructive and easy
 * to hit by accident on a phone, but it is also cheap to rebuild, so a dialog
 * would be heavier than the action deserves. The armed state disarms itself
 * after a few seconds so a stray first tap cannot leave a primed destructive
 * button sitting on screen.
 */
export function ClearOrderButton({
  tone = "onDark",
  className = "",
}: {
  tone?: "onDark" | "onLight";
  className?: string;
}) {
  const { count, clear } = useOrder();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);

  // Nothing to cancel. Also disarms if the customer empties the order by hand
  // while the confirm is showing.
  if (count === 0) return null;

  const base =
    tone === "onDark"
      ? "text-queso-cream/60 hover:text-queso-cream"
      : "text-ink-soft hover:text-queso-black";

  return (
    <button
      type="button"
      onClick={() => {
        if (armed) {
          clear();
          setArmed(false);
        } else {
          setArmed(true);
        }
      }}
      className={`font-body text-xs font-bold uppercase tracking-wide underline decoration-1 underline-offset-4 transition-colors duration-[var(--dur-base)] ${
        armed ? "text-queso-red hover:text-queso-red" : base
      } ${className}`}
    >
      {armed ? "Tap again to cancel order" : "Cancel order"}
    </button>
  );
}
