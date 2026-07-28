import Image from "next/image";
import Link from "next/link";
import { PIZZAS } from "@/lib/menu-data";
import { ITEM_IMAGES } from "@/lib/menu-content";
import { PlusIcon } from "./icons";

// Floating "Most Ordered" card overlapping the Home hero (CLAUDE.md delta 7).
// Featured item: Queso Original (the namesake special) — PROVISIONAL pick,
// confirm the actual best-seller with Brandon. Quick-add deep-links to /menu
// with the item pre-added at the card-default Small size.
const FEATURED_ID = "queso-original";

export function MostOrderedCard() {
  const pizza = PIZZAS.find((p) => p.id === FEATURED_ID);
  if (!pizza) return null;
  const image = ITEM_IMAGES[pizza.id];

  return (
    <div className="relative z-10 -mt-14 px-5">
      <Link
        href={`/menu?add=${pizza.id}&size=S`}
        className="mx-auto flex max-w-md items-center gap-4 border border-queso-cream/15 bg-surface-high p-3 shadow-lg shadow-queso-black/60"
      >
        {image ? (
          <div className="relative h-16 w-16 shrink-0">
            <Image
              src={image}
              alt={`${pizza.name} pizza`}
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="w-fit bg-queso-yellow px-1.5 py-0.5 font-body text-[9px] font-bold uppercase tracking-[0.15em] text-queso-black">
            Most Ordered
          </span>
          <span className="truncate font-display text-base font-bold text-queso-cream">
            {pizza.name}
          </span>
          <span className="font-body text-sm font-bold text-queso-cream">
            from K{pizza.prices.S}
          </span>
        </div>
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center bg-queso-red text-white"
          aria-hidden
        >
          <PlusIcon className="h-4 w-4" />
        </span>
      </Link>
    </div>
  );
}
