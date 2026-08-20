"use client";

import { useState } from "react";
import Image from "next/image";
import type { PizzaItem, PizzaSize } from "@/lib/menu-data";
import { lineKey } from "@/lib/order";
import { SITE, SHOW_PLACEHOLDERS } from "@/lib/site-config";
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

  // With no photo, production renders a text-forward card rather than a dashed
  // "Photography pending" hole — 6 of the 10 pizzas still have none, and a grid
  // full of empty boxes is what made the build read as unfinished.
  const showImageBox = Boolean(image) || SHOW_PLACEHOLDERS;
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
    <article className="group flex flex-col overflow-hidden rounded-md border border-line bg-surface transition-colors duration-[var(--dur-base)] hover:border-queso-red/40">
      {showImageBox ? (
        <div className="relative aspect-[4/3] overflow-hidden">
          {pizza.tier === "special" ? (
            <span className="absolute left-0 top-0 z-10 bg-queso-yellow px-2 py-1 font-body text-[10px] font-bold uppercase tracking-[0.15em] text-queso-black">
              Special
            </span>
          ) : null}
          {image ? (
            <Image
              src={image}
              alt={`${pizza.name} pizza from Queso Pizza in ${SITE.address.locality}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.05]"
            />
          ) : (
            <Placeholder
              icon={<CameraIcon className="h-7 w-7" />}
              body="Photography pending"
              className="h-full"
            />
          )}
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* The badge lives on the photo when there is one; without it, it needs
            its own slot or the tier is invisible. */}
        {!showImageBox && pizza.tier === "special" ? (
          <span className="w-fit bg-queso-yellow px-2 py-1 font-body text-[10px] font-bold uppercase tracking-[0.15em] text-queso-black">
            Special
          </span>
        ) : null}
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl font-bold text-queso-black">
            {pizza.name}
          </h3>
          {/* Red, not cream: on the v4 dark ground red measured ~2.9:1 and was
              banned as text. On the v5 cream ground it is 5.46:1, and the price
              is the single best place to spend it. See the contrast table in
              CLAUDE.md — the rules invert with the ground. */}
          <span className="font-body text-base font-bold text-queso-red">
            K{displayPrice}
          </span>
        </div>
        {description ? (
          <p className="font-body text-sm leading-relaxed text-ink-soft">
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
                className={`flex h-9 w-9 items-center justify-center rounded-sm border font-body text-xs font-bold transition-[background-color,border-color,color,transform] duration-[var(--dur-fast)] active:scale-90 ${
                  selected
                    ? "border-queso-red bg-queso-red text-queso-cream"
                    : "border-line text-ink-soft hover:border-queso-red hover:bg-queso-red/5 hover:text-queso-red"
                }`}
                title={`K${pizza.prices[size]}`}
              >
                {size}
              </button>
            );
          })}
        </div>
        {sizeHint ? (
          <p className="queso-enter font-body text-xs font-bold text-queso-red">
            Choose a size to add this pizza.
          </p>
        ) : null}
        {qty > 0 && selectedSize ? (
          <div className="mt-auto flex items-stretch gap-2">
            <div className="queso-enter flex flex-1 items-center justify-center gap-2 rounded-control bg-queso-red py-3 font-body text-xs font-bold uppercase tracking-wide text-queso-cream">
              Added ({qty})
              <CheckIcon className="h-3 w-3" />
            </div>
            <div className="flex items-center overflow-hidden rounded-control border border-line transition-colors duration-[var(--dur-base)] hover:border-queso-red/40">
              <button
                type="button"
                aria-label={`Remove one ${pizza.name} (${selectedSize})`}
                onClick={() => decrement(lineKey(pizza.id, selectedSize))}
                className="flex h-full w-10 items-center justify-center text-ink-soft transition-[background-color,color,transform] duration-[var(--dur-fast)] hover:bg-queso-red/5 hover:text-queso-red active:scale-90"
              >
                <MinusIcon className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                aria-label={`Add one ${pizza.name} (${selectedSize})`}
                onClick={() => increment(lineKey(pizza.id, selectedSize))}
                className="flex h-full w-10 items-center justify-center border-l border-line text-ink-soft transition-[background-color,color,transform] duration-[var(--dur-fast)] hover:bg-queso-red/5 hover:text-queso-red active:scale-90"
              >
                <PlusIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            className="group/add mt-auto flex items-center justify-center gap-2 rounded-control border border-line py-3 font-body text-xs font-bold uppercase tracking-wide text-queso-black transition-[background-color,border-color,color,transform] duration-[var(--dur-base)] hover:border-queso-red hover:bg-queso-red hover:text-queso-cream active:scale-[0.98]"
          >
            Add to Order
            <PlusIcon className="h-3 w-3 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-quart)] group-hover/add:rotate-90" />
          </button>
        )}
      </div>
    </article>
  );
}
