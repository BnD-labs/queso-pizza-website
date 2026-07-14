"use client";

import Image from "next/image";
import type { FlatItem } from "@/lib/menu-data";
import { lineKey } from "@/lib/order";
import { CameraIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { useOrder } from "./OrderProvider";

// Flat-priced items (shawarma, fries): tap + to add, stepper once in the order.
export function FlatItemRow({
  item,
  description,
  image,
  showThumb = true,
}: {
  item: FlatItem;
  description?: string;
  image?: string;
  showThumb?: boolean;
}) {
  const { add, increment, decrement, qtyOf } = useOrder();
  const qty = qtyOf(item.id);

  return (
    <article className="flex items-center gap-4 border border-queso-cream/10 bg-surface-low p-4">
      {showThumb ? (
        <div className="relative h-16 w-16 shrink-0">
          {image ? (
            <Image
              src={image}
              alt={item.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center border border-dashed border-queso-cream/25">
              <CameraIcon className="h-5 w-5 text-queso-cream/40" />
            </div>
          )}
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="font-display text-base font-bold text-queso-cream">
          {item.name}
        </h3>
        {description ? (
          <p className="font-body text-xs leading-relaxed text-queso-cream/65">
            {description}
          </p>
        ) : null}
        <span className="font-body text-sm font-bold text-queso-red">
          K{item.price}
        </span>
      </div>
      {qty > 0 ? (
        <div className="flex shrink-0 items-center border border-queso-cream/25">
          <button
            type="button"
            aria-label={`Remove one ${item.name}`}
            onClick={() => decrement(lineKey(item.id))}
            className="flex h-9 w-9 items-center justify-center text-queso-cream/80"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="w-6 text-center font-body text-sm font-bold text-queso-cream">
            {qty}
          </span>
          <button
            type="button"
            aria-label={`Add one ${item.name}`}
            onClick={() => increment(lineKey(item.id))}
            className="flex h-9 w-9 items-center justify-center text-queso-cream/80"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          aria-label={`Add ${item.name} to order`}
          onClick={() => add(item.id, item.name, item.price)}
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-queso-cream/25 text-queso-cream/80"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      )}
    </article>
  );
}
