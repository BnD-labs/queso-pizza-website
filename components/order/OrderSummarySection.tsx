"use client";

import { useOrder } from "./OrderProvider";
import { OrderLinesList } from "./OrderLinesList";
import { OrderCtas } from "./OrderCtas";

// The "Order Ready! Send and Call to Confirm" section at the bottom of /menu
// (per the final design). Renders the live order — never sample data.
export function OrderSummarySection() {
  const { lines, total } = useOrder();

  return (
    <section className="mx-auto max-w-7xl scroll-mt-20 pb-24" id="order">
      <h2 className="max-w-xs pb-8 font-display text-3xl font-extrabold leading-tight tracking-tight text-queso-cream">
        Order Ready! Send and Call to Confirm
      </h2>
      {lines.length === 0 ? (
        <p className="border border-queso-cream/10 bg-surface-low p-5 font-body text-sm text-queso-cream/60">
          Your order is empty — tap any item above to start building it.
        </p>
      ) : (
        <div className="flex flex-col gap-4 border border-queso-cream/10 bg-surface-low p-5">
          <OrderLinesList />
          <div className="flex items-center justify-between border-t border-queso-cream/15 pt-3">
            <span className="font-body text-sm font-bold uppercase tracking-wide text-queso-cream/65">
              Total
            </span>
            <span className="font-body text-xl font-bold text-queso-red">
              K{total}
            </span>
          </div>
          <OrderCtas stacked />
        </div>
      )}
    </section>
  );
}
