"use client";

import { lineLabel } from "@/lib/order";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { useOrder } from "./OrderProvider";

// Itemized running order with per-line quantity steppers
// (increment/decrement only — no free-text quantities, per the skill spec).
export function OrderLinesList() {
  const { lines, increment, decrement } = useOrder();

  return (
    <ul className="flex flex-col gap-3">
      {lines.map((line) => (
        <li key={line.key} className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-body text-sm font-bold text-queso-cream">
              {lineLabel(line)}
            </span>
            <span className="font-body text-xs text-queso-cream/60">
              K{line.unitPrice} each
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <div className="flex items-center border border-queso-cream/25 transition-colors duration-[var(--dur-base)] hover:border-queso-cream/45">
              <button
                type="button"
                aria-label={`Remove one ${lineLabel(line)}`}
                onClick={() => decrement(line.key)}
                className="flex h-8 w-8 items-center justify-center text-queso-cream/80 transition-[background-color,color,transform] duration-[var(--dur-fast)] hover:bg-queso-cream/10 hover:text-queso-cream active:scale-90"
              >
                <MinusIcon className="h-3.5 w-3.5" />
              </button>
              <span className="w-6 text-center font-body text-sm font-bold text-queso-cream">
                {line.qty}
              </span>
              <button
                type="button"
                aria-label={`Add one ${lineLabel(line)}`}
                onClick={() => increment(line.key)}
                className="flex h-8 w-8 items-center justify-center text-queso-cream/80 transition-[background-color,color,transform] duration-[var(--dur-fast)] hover:bg-queso-cream/10 hover:text-queso-cream active:scale-90"
              >
                <PlusIcon className="h-3.5 w-3.5" />
              </button>
            </div>
            <span className="w-14 text-right font-body text-sm font-bold text-queso-cream">
              K{line.qty * line.unitPrice}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
