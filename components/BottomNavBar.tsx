"use client";

import { useState } from "react";
import { BagIcon } from "./icons";
import { useOrder } from "./order/OrderProvider";
import { OrderLinesList } from "./order/OrderLinesList";
import { OrderCtas } from "./order/OrderCtas";

// Sticky dual-CTA bar, order-aware (skill spec §2: persistent running-order
// summary while browsing — a footer bar/drawer, never a modal).
// Empty order: plain WhatsApp + call links. With items: tappable summary row
// expands into the itemized drawer with steppers and the paired CTAs.
export function BottomNavBar() {
  const { count, total } = useOrder();
  const [expanded, setExpanded] = useState(false);
  const hasItems = count > 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-queso-cream/10 bg-surface-footer">
      {hasItems ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="group flex w-full justify-center border-b border-queso-cream/10 px-5 py-3"
        >
          <span className="flex w-full max-w-3xl items-center justify-between">
            <span className="flex items-center gap-2 font-body text-sm font-bold text-queso-cream">
              <BagIcon className="h-4 w-4 text-queso-yellow" />
              {count} {count === 1 ? "item" : "items"} · K{total}
            </span>
            <span className="font-body text-xs font-bold uppercase tracking-wide text-queso-red transition-colors duration-[var(--dur-base)] group-hover:text-queso-yellow">
              {expanded ? "Hide order" : "View order"}
            </span>
          </span>
        </button>
      ) : null}

      {hasItems && expanded ? (
        <div className="max-h-[45vh] overflow-y-auto border-b border-queso-cream/10 px-5 py-4">
          <div className="mx-auto w-full max-w-3xl">
            <OrderLinesList />
            <div className="mt-4 flex items-center justify-between border-t border-queso-cream/15 pt-3">
              <span className="font-body text-sm font-bold uppercase tracking-wide text-queso-cream/65">
                Total
              </span>
              <span className="font-body text-lg font-bold text-queso-red">
                K{total}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {/* Capped at max-w-xl, not max-w-7xl. Full-bleed buttons are right on a
          390px phone but absurd on a 1440px desktop, where each half stretched
          to ~640px. The pair now holds a sane button size and centres. */}
      <div className="mx-auto w-full max-w-xl p-4">
        <OrderCtas />
      </div>
    </div>
  );
}
