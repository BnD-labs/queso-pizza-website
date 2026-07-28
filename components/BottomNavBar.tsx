"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BagIcon } from "./icons";
import { useOrder } from "./order/OrderProvider";
import { OrderLinesList } from "./order/OrderLinesList";
import { OrderCtas } from "./order/OrderCtas";

// True while the /menu "Order Ready!" panel is on screen above the bar. Both
// carry the same paired CTAs, and showing them twice at once invites the
// question "did I just send two orders?" on the one surface where doubt costs
// money. Elements are matched by id, so pages without #order (Home, About,
// Contact) simply never report visible and the bar always shows.
function useOrderPanelInView() {
  const [inView, setInView] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const panel = document.getElementById("order");
    if (!panel) {
      setInView(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      // Negative bottom margin ≈ the bar's own height: the panel only counts
      // as visible once it has cleared the strip the bar occupies, so the two
      // never overlap and the handover doesn't flicker at the boundary.
      { rootMargin: "0px 0px -140px 0px" },
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, [pathname]);

  return inView;
}

// Sticky dual-CTA bar, order-aware (skill spec §2: persistent running-order
// summary while browsing — a footer bar/drawer, never a modal).
// Empty order: plain WhatsApp + call links. With items: tappable summary row
// expands into the itemized drawer with steppers and the paired CTAs.
export function BottomNavBar() {
  const { count, total } = useOrder();
  const [expanded, setExpanded] = useState(false);
  const hasItems = count > 0;
  const panelInView = useOrderPanelInView();

  // Slide out rather than unmount: the bar keeps its state (expanded drawer,
  // "order sent" flag) and returns without a jump when the panel scrolls away.
  return (
    <div
      aria-hidden={panelInView}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-queso-cream/10 bg-surface-footer transition-[transform,opacity] duration-[var(--dur-base)] ease-[var(--ease-out-quart)] ${
        panelInView
          ? "pointer-events-none translate-y-full opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      {hasItems ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="group flex w-full justify-center border-b border-queso-cream/10 px-5 py-3"
        >
          <span className="flex w-full max-w-3xl items-center justify-between">
            <span className="flex items-center gap-2 font-body text-sm font-bold text-queso-cream">
              <BagIcon className="h-4 w-4 text-queso-yellow" />
              {count} {count === 1 ? "item" : "items"} · K{total}
            </span>
            <span className="font-body text-xs font-bold uppercase tracking-wide text-queso-yellow transition-colors duration-[var(--dur-base)] group-hover:text-queso-cream">
              {expanded ? "Hide order" : "View order"}
            </span>
          </span>
        </button>
      ) : null}

      {hasItems && expanded ? (
        <div className="max-h-[45vh] overflow-y-auto border-b border-queso-cream/10 px-5 py-4">
          <div className="mx-auto w-full max-w-3xl">
            <OrderLinesList />
            <div className="mt-4 flex items-center justify-between border-t border-queso-cream/15 pt-3">
              <span className="font-body text-sm font-bold uppercase tracking-wide text-queso-cream/65">
                Total
              </span>
              <span className="font-body text-lg font-bold text-queso-yellow">
                K{total}
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {/* Capped at max-w-xl, not max-w-7xl. Full-bleed buttons are right on a
          390px phone but absurd on a 1440px desktop, where each half stretched
          to ~640px. The pair now holds a sane button size and centres. */}
      <div className="mx-auto w-full max-w-xl p-4">
        <OrderCtas />
      </div>
    </div>
  );
}
