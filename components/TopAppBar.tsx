"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site-config";
import { BagIcon, MenuIcon } from "./icons";
import { useOrder } from "./order/OrderProvider";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu & Order" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Find Us" },
];

// prefetch={false} on every internal Link is deliberate, not an oversight.
// Next 16 writes the RSC payload to out/menu/__next.menu/__PAGE__.txt but asks
// for __next.menu.__PAGE__.txt, so under output: "export" every prefetch 404s
// and logs a console error. Four static pages behind a CDN gain almost nothing
// from prefetching, and a wasted 404 per link costs more on the mobile
// connections this site targets.
export function TopAppBar() {
  const [open, setOpen] = useState(false);
  const { count } = useOrder();

  // Cream, not black. v5 demotes dark surfaces to accents — the sanctioned ones
  // are the footer, a hero scrim, the order panel and the Most Ordered card. A
  // black band pinned across the top of every cream page is not an accent, it
  // is a second ground, and it reintroduces the coldness the founder objected
  // to on 2026-08-19. Translucent + blurred so content scrolling under it stays
  // legible.
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-queso-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-12 w-12 items-center justify-center rounded-control text-queso-black transition-colors duration-[var(--dur-base)] hover:bg-queso-black/5"
        >
          <MenuIcon className="h-5 w-5" />
        </button>

        <Link
          href="/"
          prefetch={false}
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/logo-mark.png"
            alt=""
            width={44}
            height={25}
            priority
          />
          {/* whitespace-nowrap and a smaller base size: Comix Loud is wide enough
              that "QUESO PIZZA" broke onto two lines at 390px, which a wordmark
              must never do. */}
          <span className="whitespace-nowrap font-brand text-base font-bold tracking-tight text-queso-black sm:text-xl">
            {SITE.name.toUpperCase()}
          </span>
        </Link>

        <Link
          href="/menu"
          prefetch={false}
          aria-label={count > 0 ? `Menu & Order — ${count} items in order` : "Menu & Order"}
          className="relative flex h-12 w-12 items-center justify-center rounded-control text-queso-black transition-colors duration-[var(--dur-base)] hover:bg-queso-black/5"
        >
          <BagIcon className="h-5 w-5" />
          {count > 0 ? (
            /* cart count badge: one of the two approved circular exceptions */
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-queso-red px-1 font-body text-[10px] font-bold text-queso-cream">
              {count}
            </span>
          ) : null}
        </Link>
      </div>

      {open ? (
        <nav className="border-t border-line bg-surface">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-line">
                <Link
                  href={link.href}
                  prefetch={false}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-4 font-body text-base text-queso-black transition-colors duration-[var(--dur-base)] hover:text-queso-red"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
