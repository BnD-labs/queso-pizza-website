"use client";

import { useState } from "react";
import { MAPS_EMBED_URL, MAPS_SEARCH_URL, SITE } from "@/lib/site-config";
import { ArrowUpRightIcon, MapPinIcon } from "./icons";

/**
 * Google Maps embed behind a click-to-load facade.
 *
 * Two things were wrong with the previous version.
 *
 * 1. WEIGHT. The iframe pulls ~192 KB of Google's map tiles and JS, and it
 *    appears on BOTH Home and Contact. `loading="lazy"` only defers it until it
 *    nears the viewport — on Home it sits above the footer, so almost every
 *    visitor who scrolls pays for it, on the Zambian mobile connections this
 *    site targets, to look at a map most of them do not open. The facade is
 *    static markup; the iframe is only constructed once someone asks for it.
 *
 * 2. COLOUR. It carried `grayscale invert-[0.92] hue-rotate-180` to fake a dark
 *    map for the v4 dark ground. With the v5 cream ground that filter is
 *    backwards — it painted a dark slab onto a warm light page. The map now
 *    renders in its natural colours, which also makes it legible as a map.
 *
 * The facade is not a dead placeholder: it states the address and offers a
 * direct "Get directions" link, so someone who just wants to navigate never
 * needs to load the embed at all.
 */
export function MapEmbed({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-md border border-line ${className}`}
    >
      {loaded ? (
        <iframe
          src={MAPS_EMBED_URL}
          title={`Map — ${SITE.name}, ${SITE.address.area}`}
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="h-full w-full border-0"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-surface-sunk p-6 text-center">
          <MapPinIcon className="h-7 w-7 text-queso-red" />
          <div className="flex flex-col gap-1">
            <p className="font-display text-base font-bold text-queso-black">
              {SITE.address.area}
            </p>
            <p className="font-body text-sm text-ink-soft">
              {SITE.address.plusCode}, Chongwe — {SITE.address.landmark}
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="rounded-control bg-queso-red px-5 py-2.5 font-body text-xs font-bold uppercase tracking-wide text-queso-cream transition-[transform,filter] duration-[var(--dur-fast)] ease-[var(--ease-out-quart)] hover:brightness-110 active:scale-[0.98]"
            >
              Show map
            </button>
            <a
              href={MAPS_SEARCH_URL}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-1.5 font-body text-xs font-bold uppercase tracking-wide text-queso-black transition-colors duration-[var(--dur-base)] hover:text-queso-red"
            >
              Get directions
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
