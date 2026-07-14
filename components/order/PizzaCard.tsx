"use client";

import { useState } from "react";
import Image from "next/image";
import type { PizzaItem, PizzaSize } from "@/lib/menu-data";
import { lineKey } from "@/lib/order";
import { Placeholder } from "@/components/Placeholder";
import {
  CameraIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
} from "@/components/icons";
import { useOrder } from "./OrderProvider";

const SIZES: PizzaSize[] = ["S", "M", "L", "XL"];

// Pizzas require an explicit size selection before adding (order-builder spec).
// Card default price = Small; price updates live with the size selector.
export function PizzaCard({
  pizza,
  description,
  image,
}: {
  pizza: PizzaItem;
  description?: string;
  image?: string;
}) {
  const { add, increment, decrement, qtyOf } = useOrder();
  const [selectedSize, setSelectedSize] = useState<PizzaSize | null>(null);
  const [sizeHint, setSizeHint] = useState(false);

  const displayPrice = pizza.prices[selectedSize ?? "S"];
  const qty = selectedSize ? qtyOf(pizza.id, selectedSize) : 0;

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeHint(true);
      return;
    }
    add(pizza.id, pizza.name, pizza.prices[selectedSize], selectedSize);
  };

  return (
    <article className="flex flex-col border border-queso-cream/10 bg-surface-low">
      <div className="relative aspect-[4/3]">
        {pizza.tier === "special" ? (
          <span className="absolute left-0 top-0 z-10 bg-queso-yellow px-2 py-1 font-body text-[10px] font-bold uppercase tracking-[0.15em] text-queso-black">
            Special
          </span>
        ) : null}
        {image ? (
          <Image
            src={image}
            alt={`${pizza.name} pizza`}
            fill
            className="object-cover"
          />
        ) : (
          <Placeholder
            icon={<CameraIcon className="h-7 w-7" />}
            body="Photography pending"
            className="h-full"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl font-bold text-queso-cream">
            {pizza.name}
          </h3>
          <span className="font-body text-base font-bold text-queso-red">
            K{displayPrice}
          </span>
        </div>
        {description ? (
          <p className="font-body text-sm leading-relaxed text-queso-cream/65">
            {description}
          </p>
        ) : null}
        <div className="flex gap-2 pt-1">
          {SIZES.map((size) => {
            const selected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setSelectedSize(size);
                  setSizeHint(false);
                }}
                className={`flex h-9 w-9 items-center justify-center border font-body text-xs font-bold ${
                  selected
                    ? "border-queso-red bg-queso-red text-white"
                    : "border-queso-cream/20 text-queso-cream/60"
                }`}
                title={`K${pizza.prices[size]}`}
              >
                {size}
              </button>
            );
          })}
        </div>
        {sizeHint ? (
          <p className="font-body text-xs font-bold text-queso-yellow">
            Choose a size to add this pizza.
          </p>
        ) : null}
        {qty > 0 && selectedSize ? (
          <div className="mt-auto flex items-stretch gap-2">
            <div className="flex flex-1 items-center justify-center gap-2 bg-queso-red py-3 font-body text-xs font-bold uppercase tracking-wide text-white">
              Added ({qty})
              <CheckIcon className="h-3 w-3" />
            </div>
            <div className="flex items-center border border-queso-cream/25">
              <button
                type="button"
                aria-label={`Remove one ${pizza.name} (${selectedSize})`}
                onClick={() => decrement(lineKey(pizza.id, selectedSize))}
                className="flex h-full w-10 items-center justify-center text-queso-cream/80"
              >
                <MinusIcon className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label={`Add one ${pizza.name} (${selectedSize})`}
                onClick={() => increment(lineKey(pizza.id, selectedSize))}
                className="flex h-full w-10 items-center justify-center border-l border-queso-cream/25 text-queso-cream/80"
              >
                <PlusIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            className="mt-auto flex items-center justify-center gap-2 border border-queso-cream/25 py-3 font-body text-xs font-bold uppercase tracking-wide text-queso-cream/80"
          >
            Add to Order
            <PlusIcon className="h-3 w-3" />
          </button>
        )}
      </div>
    </article>
  );
}
