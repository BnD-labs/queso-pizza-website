"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site-config";
import { Wordmark } from "./Wordmark";

// Labels follow the final design (Menu / Heritage / Locations / Contact).
// Heritage = /about, Locations & Contact both resolve to /contact (Find Us) —
// the design gives them separate entries; flag with Brandon if this should change.
const FOOTER_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Heritage" },
  { href: "/contact", label: "Locations" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-t border-queso-cream/10 bg-dark px-5 pb-16 pt-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-2">
        <Image
          src="/images/logo-mark.png"
          alt=""
          width={104}
          height={59}
        />
        <div className="mt-6 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <Wordmark tone="onDark" className="text-2xl" />
            <p className="max-w-sm font-body text-base leading-relaxed text-queso-cream/65">
              Crafting premium artisanal pizzas with local roots and
              uncompromising quality.
            </p>
          </div>

          <nav>
            <ul className="flex flex-col gap-4">
              {FOOTER_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className={`font-body text-base transition-colors duration-[var(--dur-base)] ${
                        active
                          ? "font-bold text-queso-yellow"
                          : "text-queso-cream/65 hover:text-queso-cream"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-2 border-t border-queso-cream/10 pt-8 text-center">
            <p className="font-body text-base text-queso-cream/60">
              © {SITE.footerYear} {SITE.name.toUpperCase()}. LOCAL. ROOTED.
            </p>
            {/* Build credit. No underline — Brandon's call, 2026-08-21: the red
                rule pulled more attention than an agency credit should.
                rel="noopener noreferrer" because it opens in a new tab; without
                noopener the target page gets a handle on this one. */}
            <p className="font-body text-sm text-queso-cream/45">
              Developed by{" "}
              <a
                href="https://www.bnd-lab-agency.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-queso-cream/70 transition-colors duration-[var(--dur-base)] hover:text-queso-cream"
              >
                BND Labs
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
