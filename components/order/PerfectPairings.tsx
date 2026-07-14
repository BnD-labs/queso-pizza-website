"use client";

import Image from "next/image";
import { PlusIcon } from "@/components/icons";
import { useOrder } from "./OrderProvider";

export interface PairingItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

// "Perfect Pairings" cross-sell strip (CLAUDE.md design delta 7): appears only
// after something is in the order — a horizontal row of circular photo chips
// (the circular shape is explicit in the component spec) with a red one-tap add.
export function PerfectPairings({ items }: { items: PairingItem[] }) {
  const { count, add, qtyOf } = useOrder();
  if (count === 0) return null;

  return (
    <section className="mx-auto max-w-7xl pb-16">
      <p className="pb-4 font-body text-sm font-bold uppercase tracking-[0.1em] text-queso-red">
        Perfect Pairings
      </p>
      <div className="flex gap-5 overflow-x-auto pb-2">
        {items.map((item) => {
          const qty = qtyOf(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => add(item.id, item.name, item.price)}
              className="flex w-20 shrink-0 flex-col items-center gap-2 text-center"
              aria-label={`Add ${item.name} (K${item.price}) to order`}
            >
              <span className="relative block h-16 w-16">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-surface-high font-display text-lg font-bold text-queso-cream/70">
                    {item.name.charAt(0)}
                  </span>
                )}
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center bg-queso-red text-white">
                  {qty > 0 ? (
                    <span className="font-body text-[10px] font-bold">
                      {qty}
                    </span>
                  ) : (
                    <PlusIcon className="h-3 w-3" />
                  )}
                </span>
              </span>
              <span className="font-body text-[11px] leading-tight text-queso-cream/80">
                {item.name}
                <br />
                <span className="font-bold text-queso-red">K{item.price}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
