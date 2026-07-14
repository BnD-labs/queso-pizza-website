import type { Metadata } from "next";
import Image from "next/image";
import { SITE, formatPhone, formatTime } from "@/lib/site-config";
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
      <section className="mx-auto flex max-w-7xl flex-col gap-6 py-16">
        <h1 className="font-display text-5xl font-extrabold tracking-tight text-queso-cream">
          Find Us
        </h1>
        <p className="max-w-xl font-body text-base leading-relaxed text-queso-cream/65">
          Experience artisanal oven baked pizza right in the heart of the city.
          We craft our heritage-driven pizzas locally, zero mass production.
        </p>
        <div className="flex items-center gap-3 bg-queso-red px-4 py-3">
          <PhoneIcon className="h-4 w-4 shrink-0 text-white" />
          <p className="font-body text-sm font-bold text-white">
            Delivery Available — {formatPhone(SITE.phones.delivery1)} /{" "}
            {formatPhone(SITE.phones.delivery2)}
          </p>
        </div>
      </section>

      {/* ——— Storefront ——— */}
      <section className="mx-auto max-w-7xl pb-16">
        <div className="relative aspect-[4/5] w-full max-w-md border border-queso-cream/10">
          <Image
            src="/images/store-front.jpg"
            alt="The red-and-white Queso Pizza storefront on Great East Road"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* ——— Location ——— */}
      <section className="mx-auto flex max-w-7xl flex-col gap-4 pb-16">
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
          {/* UNCONFIRMED landmark — italic placeholder styling per design delta 4 */}
          <p className="pt-2 font-body text-sm italic text-queso-cream/50">
            {SITE.address.plusCode}, Chongwe — {SITE.address.landmark}
          </p>
        </div>
      </section>

      {/* ——— Hours ——— */}
      <section className="mx-auto flex max-w-7xl flex-col gap-4 pb-16">
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
              className="flex flex-col gap-1 border-b border-queso-cream/10 pb-4"
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
      </section>

      {/* ——— Map ——— */}
      <section className="mx-auto max-w-7xl pb-16">
        <MapEmbed className="aspect-square w-full max-w-md" />
      </section>

      {/* ——— Customer Voice — GBP reviews placeholder ——— */}
      <section className="mx-auto flex max-w-7xl flex-col gap-6 pb-24">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-queso-cream">
            Customer Voice
          </h2>
          <div className="flex gap-0.5" aria-label="Five star rating placeholder">
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
    </div>
  );
}
