import type { Metadata } from "next";
import Image from "next/image";
import {
  SITE,
  SHOW_PLACEHOLDERS,
  formatPhone,
  formatTime,
} from "@/lib/site-config";
import { Placeholder } from "@/components/Placeholder";
import { MapEmbed } from "@/components/MapEmbed";
import {
  ClockIcon,
  PhoneIcon,
  ReviewsIcon,
  StarIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Find Us — Queso Pizza",
  description: `Queso Pizza, ${SITE.address.area}, ${SITE.address.city}. Hours, location, and delivery lines.`,
};

export default function ContactPage() {
  return (
    <div className="px-5">
      {/* ——— Intro ——— */}
      <section className="mx-auto flex max-w-7xl flex-col gap-6 py-20 md:py-28">
        <h1 className="queso-enter font-display text-5xl font-extrabold tracking-tight text-queso-cream lg:text-6xl">
          Find Us
        </h1>
        <p className="queso-enter queso-stagger-1 max-w-xl font-body text-base leading-relaxed text-queso-cream/65">
          Experience artisanal oven baked pizza right in the heart of the city.
          We craft our heritage-driven pizzas locally, zero mass production.
        </p>
        <div className="queso-enter queso-stagger-2 flex w-fit items-center gap-3 bg-queso-red px-4 py-3">
          <PhoneIcon className="h-4 w-4 shrink-0 text-white" />
          <p className="font-body text-sm font-bold text-white">
            Delivery Available — {formatPhone(SITE.phones.delivery1)} /{" "}
            {formatPhone(SITE.phones.delivery2)}
          </p>
        </div>
      </section>

      {/* ——— Storefront + practical details ———
             Paired into one two-column band on desktop. Stacked full-width,
             each of these was a narrow max-w-md block stranded against a
             mostly empty 1280px row. */}
      <section className="queso-reveal mx-auto grid max-w-7xl gap-10 pb-20 md:grid-cols-2 md:items-start md:gap-14 md:pb-28">
        <div className="relative aspect-[4/5] w-full border border-queso-cream/10">
          <Image
            src="/images/store-front.jpg"
            alt="The red-and-white Queso Pizza storefront on Great East Road"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-10">
          {/* ——— Location ——— */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {/* map pin dot: one of the two approved circular exceptions */}
              <span className="flex h-2.5 w-2.5 rounded-full bg-queso-red" />
              <h2 className="font-display text-2xl font-bold text-queso-cream">
                Location
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-body text-base font-bold text-queso-cream">
                {SITE.address.area}
              </p>
              <p className="font-body text-base text-queso-cream/65">
                {SITE.address.road}
              </p>
              {/* Landmark confirmed 2026-08-19 — the italic placeholder styling
                  from design delta 4 comes off with the UNCONFIRMED marker. */}
              <p className="pt-2 font-body text-sm text-queso-cream/65">
                {SITE.address.plusCode}, Chongwe — {SITE.address.landmark}
              </p>
            </div>
          </div>

          {/* ——— Hours ——— */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-4 w-4 text-queso-red" />
              <h2 className="font-display text-2xl font-bold text-queso-cream">
                Hours
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {[SITE.hours.weekdays, SITE.hours.weekend].map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-b border-queso-cream/10 pb-4"
                >
                  <p className="font-body text-base text-queso-cream/65">
                    {row.label}
                  </p>
                  <p className="font-body text-base font-bold text-queso-cream">
                    {formatTime(row.open)} - {formatTime(row.close)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <MapEmbed className="aspect-[4/3] w-full" />
        </div>
      </section>

      {/* ——— Customer Voice — GBP reviews placeholder. Hidden in production for
             the same reason as the Home block: there is no approved copy behind
             it, and the stars imply a rating that does not exist yet. ——— */}
      {SHOW_PLACEHOLDERS ? (
      <section className="queso-reveal mx-auto flex max-w-7xl flex-col gap-6 pb-28 md:pb-36">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-queso-cream">
            Customer Voice
          </h2>
          <div
            className="flex gap-0.5"
            role="img"
            aria-label="Five star rating placeholder"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-3.5 w-3.5 text-queso-yellow" />
            ))}
          </div>
        </div>
        <Placeholder
          icon={<ReviewsIcon className="h-8 w-8" />}
          title="Google Business Profile Reviews"
          body="[PLACEHOLDER: This section is reserved for the live Google Business Profile reviews embed module.]"
          className="w-full"
        />
      </section>
      ) : null}
    </div>
  );
}
