"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site-config";
import { BagIcon, MenuIcon } from "./icons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu & Order" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Find Us" },
];

export function TopAppBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-queso-cream/10 bg-queso-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-12 w-12 items-center justify-center text-queso-cream"
        >
          <MenuIcon className="h-5 w-5" />
        </button>

        <Link
          href="/"
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
          <span className="font-display text-xl font-bold tracking-tight text-queso-cream">
            {SITE.name.toUpperCase()}
          </span>
        </Link>

        {/* Static in Phase 2 — order count badge arrives with the order builder (Phase 3) */}
        <Link
          href="/menu"
          aria-label="Menu & Order"
          className="flex h-12 w-12 items-center justify-center text-queso-cream"
        >
          <BagIcon className="h-5 w-5" />
        </Link>
      </div>

      {open ? (
        <nav className="border-t border-queso-cream/10 bg-surface-low">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-queso-cream/5">
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-5 py-4 font-body text-base text-queso-cream/80 hover:text-queso-cream"
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
