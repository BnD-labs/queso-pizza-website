"use client";

import { useOrder } from "./OrderProvider";
import { OrderLinesList } from "./OrderLinesList";
import { OrderCtas } from "./OrderCtas";
import { ClearOrderButton } from "./ClearOrderButton";
import { OrderNextSteps } from "./OrderNextSteps";

// The "Order Ready! Send and Call to Confirm" section at the bottom of /menu
// (per the final design). Renders the live order — never sample data.
export function OrderSummarySection() {
  const { lines, total } = useOrder();

  // max-w-3xl, not max-w-7xl: this is a checkout panel. At full page width the
  // item name and its price sat ~1200px apart, reading as a broken table
  // rather than an order.
  return (
    <section className="mx-auto max-w-3xl scroll-mt-24 pb-28 md:pb-36" id="order">
      <h2 className="queso-reveal max-w-md pb-8 font-display text-3xl font-extrabold leading-tight tracking-tight text-queso-black sm:text-4xl">
        Order Ready! Send and Call to Confirm
      </h2>
      {lines.length === 0 ? (
        <p className="rounded-md border border-line bg-surface p-5 font-body text-sm text-ink-soft">
          Your order is empty — tap any item above to start building it.
        </p>
      ) : (
        <div className="flex flex-col gap-4 rounded-md border border-queso-cream/10 bg-dark p-5 md:p-6">
          <OrderLinesList />
          <div className="flex items-center justify-between border-t border-queso-cream/15 pt-3">
            <span className="font-body text-sm font-bold uppercase tracking-wide text-queso-cream/65">
              Total
            </span>
            {/* Totals in yellow: the strongest contrast in the palette on a
                dark surface, and it separates the order total from line
                prices, which sit in cream. */}
            <span className="font-body text-xl font-bold text-queso-yellow">
              K{total}
            </span>
          </div>
          <OrderCtas stacked />
          <div className="flex justify-center">
            <ClearOrderButton tone="onDark" />
          </div>
          <OrderNextSteps />
        </div>
      )}
    </section>
  );
}
