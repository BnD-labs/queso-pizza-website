"use client";

import Image from "next/image";
import type { FlatItem } from "@/lib/menu-data";
import { lineKey } from "@/lib/order";
import { SHOW_PLACEHOLDERS } from "@/lib/site-config";
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
  // Same reasoning as PizzaCard: an empty dashed square is worse than no square.
  const showImage = showThumb && (Boolean(image) || SHOW_PLACEHOLDERS);

  return (
    <article className="flex items-center gap-4 rounded-md border border-line bg-surface p-4">
      {showImage ? (
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm">
          {image ? (
            <Image
              src={image}
              alt={item.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-sm border border-dashed border-line">
              <CameraIcon className="h-5 w-5 text-ink-soft/60" />
            </div>
          )}
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-1">
        <h3 className="font-display text-base font-bold text-queso-black">
          {item.name}
        </h3>
        {description ? (
          <p className="font-body text-xs leading-relaxed text-ink-soft">
            {description}
          </p>
        ) : null}
        <span className="font-body text-sm font-bold text-queso-red">
          K{item.price}
        </span>
      </div>
      {qty > 0 ? (
        <div className="flex shrink-0 items-center overflow-hidden rounded-control border border-line">
          <button
            type="button"
            aria-label={`Remove one ${item.name}`}
            onClick={() => decrement(lineKey(item.id))}
            className="flex h-9 w-9 items-center justify-center text-ink-soft transition-[background-color,color,transform] duration-[var(--dur-fast)] hover:bg-queso-red/5 hover:text-queso-red active:scale-90"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="w-6 text-center font-body text-sm font-bold text-queso-black">
            {qty}
          </span>
          <button
            type="button"
            aria-label={`Add one ${item.name}`}
            onClick={() => increment(lineKey(item.id))}
            className="flex h-9 w-9 items-center justify-center text-ink-soft transition-[background-color,color,transform] duration-[var(--dur-fast)] hover:bg-queso-red/5 hover:text-queso-red active:scale-90"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          aria-label={`Add ${item.name} to order`}
          onClick={() => add(item.id, item.name, item.price)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-line text-ink-soft transition-[background-color,border-color,color,transform] duration-[var(--dur-base)] hover:border-queso-red hover:bg-queso-red hover:text-queso-cream active:scale-90"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      )}
    </article>
  );
}
