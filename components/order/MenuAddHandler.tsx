"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PIZZAS, SHAWARMA, FRIES, type PizzaSize } from "@/lib/menu-data";
import { useOrder } from "./OrderProvider";

const VALID_SIZES: PizzaSize[] = ["S", "M", "L", "XL"];

// Handles /menu?add=<itemId>[&size=S] deep links (used by the Home hero
// "Most Ordered" quick-add). Adds the item once, then cleans the URL.
export function MenuAddHandler() {
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { add } = useOrder();
  const handled = useRef(false);

  useEffect(() => {
    const id = params.get("add");
    if (!id || handled.current) return;
    handled.current = true;

    const pizza = PIZZAS.find((p) => p.id === id);
    if (pizza) {
      const sizeParam = params.get("size");
      const size: PizzaSize = VALID_SIZES.includes(sizeParam as PizzaSize)
        ? (sizeParam as PizzaSize)
        : "S"; // card default size per CLAUDE.md
      add(pizza.id, pizza.name, pizza.prices[size], size);
    } else {
      const flat = [...SHAWARMA, ...FRIES].find((i) => i.id === id);
      if (flat) add(flat.id, flat.name, flat.price);
    }

    router.replace(pathname, { scroll: false });
  }, [params, pathname, router, add]);

  return null;
}
