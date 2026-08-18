"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE } from "@/lib/site-config";

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
    <footer className="border-t border-queso-cream/10 bg-surface-footer px-5 pb-16 pt-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-2">
        <Image
          src="/images/logo-mark.png"
          alt=""
          width={71}
          height={40}
        />
        <div className="mt-6 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <p className="font-display text-3xl font-bold tracking-tight text-queso-cream">
              {SITE.name.toUpperCase()}
            </p>
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

          <div className="border-t border-queso-cream/10 pt-8 text-center">
            <p className="font-body text-base text-queso-cream/60">
              © {SITE.footerYear} {SITE.name.toUpperCase()}. LOCAL. ROOTED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
