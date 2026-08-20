import Image from "next/image";
import Link from "next/link";
import { PIZZAS } from "@/lib/menu-data";
import { ITEM_IMAGES } from "@/lib/menu-content";
import { PlusIcon } from "./icons";

// Floating "Most Ordered" card overlapping the Home hero (CLAUDE.md delta 7).
//
// Featured item CONFIRMED 2026-08-18 (Brandon): Flavorful Chicken is the actual
// best-seller. It previously showed Queso Original, which was only ever a
// provisional stand-in picked because it is the namesake special — the card was
// asserting "MOST ORDERED" about an item nobody had checked. This closes the
// open item in PHASE-6-LAUNCH.md Step 2.
//
// Quick-add deep-links to /menu with the item pre-added at the card-default
// Small size.
const FEATURED_ID = "flavorful-chicken";

export function MostOrderedCard() {
  const pizza = PIZZAS.find((p) => p.id === FEATURED_ID);
  if (!pizza) return null;
  const image = ITEM_IMAGES[pizza.id];

  return (
    <div className="relative z-10 -mt-14 px-5">
      <Link
        href={`/menu?add=${pizza.id}&size=S`}
        // Next prefetches the RSC payload for this route on hover/viewport, but
        // output: "export" emits payloads at fixed paths only -- the query string
        // produces /menu/__next.menu.__PAGE__.txt?add=... which 404s and logs a
        // console error on every homepage visit. Nothing to prefetch here.
        prefetch={false}
        className="mx-auto flex max-w-md items-center gap-4 rounded-md border border-queso-cream/15 bg-dark-soft p-3 shadow-lg shadow-queso-black/25"
      >
        {image ? (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-sm">
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
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-control bg-queso-red text-queso-cream"
          aria-hidden
        >
          <PlusIcon className="h-4 w-4" />
        </span>
      </Link>
    </div>
  );
}
