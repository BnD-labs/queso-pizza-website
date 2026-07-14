import Image from "next/image";
import Link from "next/link";
import { SITE, MAPS_SEARCH_URL, formatPhone, formatTime } from "@/lib/site-config";
import { Placeholder } from "@/components/Placeholder";
import { MostOrderedCard } from "@/components/MostOrderedCard";
import { MapEmbed } from "@/components/MapEmbed";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CameraIcon,
  PhoneIcon,
  PlusIcon,
  ReviewsIcon,
  StarIcon,
} from "@/components/icons";

const BENTO_CARDS = [
  { title: "Oven baked Pizzas", image: "/images/pizza-cheese-pull.jpeg" },
  { title: "Craft Wraps", image: "/images/wraps-platter.jpeg" },
  { title: "Fries / Chicken fingers", image: "/images/chicken-fries-dark.jpeg" },
];

export default function Home() {
  return (
    <>
      {/* ——— Hero ——— */}
      <section className="relative flex min-h-[85vh] flex-col justify-end pb-24">
        <div className="absolute inset-0">
          <Image
            src="/images/pizza-cheese-pull.jpeg"
            alt="Wood-fired pizza fresh from the oven"
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-queso-black via-queso-black/50 to-transparent" />
        </div>
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-5">
          <span className="flex items-center gap-2 bg-queso-red/35 px-3 py-1.5 font-body text-xs font-medium uppercase tracking-[0.1em] text-queso-cream backdrop-blur-sm">
            <PhoneIcon className="h-3 w-3" />
            Delivery Available
          </span>
          <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            THE TASTE THAT
            <br />
            STAYS WITH YOU
          </h1>
          <Link
            href="/menu"
            className="bg-queso-red px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.1em] text-white"
          >
            Order Now
          </Link>
        </div>
      </section>

      {/* ——— Floating Most Ordered quick-add (overlaps the hero) ——— */}
      <MostOrderedCard />

      {/* ——— Direct delivery hotline ——— */}
      <section className="border-b border-queso-cream/10 bg-surface-low px-5 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4">
          <p className="font-body text-xs font-medium uppercase tracking-[0.1em] text-queso-cream/65">
            Direct Delivery Hotline
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-10">
            <a
              href={`tel:${SITE.phones.delivery1}`}
              className="font-display text-lg text-queso-cream"
            >
              {formatPhone(SITE.phones.delivery1)}
            </a>
            <a
              href={`tel:${SITE.phones.delivery2}`}
              className="font-display text-lg text-queso-cream"
            >
              {formatPhone(SITE.phones.delivery2)}
            </a>
          </div>
        </div>
      </section>

      {/* ——— Story teaser ——— */}
      <section className="px-5 py-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 border border-queso-cream/10 bg-queso-cream p-8">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-queso-black">
            Rooted in Chongwe.
          </h2>
          <p className="font-body text-lg leading-relaxed text-queso-black/90">
            Dalitso and Sam started with a simple belief: world-class
            craftsmanship shouldn&apos;t be confined to city centers. Every
            hand-stretched crust and carefully curated topping reflects our
            dedication to heritage and high-grade ingredients.
          </p>
          <Link
            href="/about"
            className="flex w-fit items-center gap-2 border-b-2 border-queso-black pb-1 font-body text-sm font-bold uppercase tracking-wide text-queso-black"
          >
            Discover Our Story
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
          <div className="relative aspect-square w-full">
            <Image
              src="/images/store-front.jpg"
              alt="The Queso Pizza storefront in Chongwe"
              fill
              className="object-cover grayscale"
            />
          </div>
        </div>
      </section>

      {/* ——— Explore the Menu (bento) ——— */}
      <section className="bg-surface-low px-5 py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-queso-cream">
            Explore the Menu
          </h2>
          <div className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3">
            {BENTO_CARDS.map((card) => (
              <Link
                key={card.title}
                href="/menu"
                className="group relative block h-[250px] overflow-hidden border border-queso-cream/10 bg-queso-black"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover opacity-60 transition-opacity group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-queso-black/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-lg font-bold text-queso-cream">
                    {card.title}
                  </h3>
                </div>
              </Link>
            ))}

            {/* Refreshments — no verified beverage photography; placeholder convention */}
            <Link
              href="/menu"
              className="relative flex h-[250px] flex-col justify-end border border-queso-cream/10 bg-queso-black"
            >
              <div className="absolute inset-2">
                <Placeholder
                  icon={<CameraIcon className="h-7 w-7" />}
                  body="Beverage photography pending"
                  className="h-full"
                />
              </div>
              <div className="relative p-6">
                <h3 className="font-display text-lg font-bold text-queso-cream">
                  Refreshments
                </h3>
              </div>
            </Link>

            {/* Extras & Add-ons */}
            <Link
              href="/menu"
              className="flex h-[250px] flex-col items-center justify-center gap-2 border border-queso-cream/10 bg-queso-black"
            >
              <PlusIcon className="h-8 w-8 text-queso-red" />
              <h3 className="font-display text-lg font-bold text-queso-cream">
                Extras &amp; Add-ons
              </h3>
            </Link>
          </div>
          <Link
            href="/menu"
            className="flex items-center justify-center border border-queso-cream/20 py-4 font-body text-sm font-bold uppercase tracking-wide text-queso-red"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* ——— Social proof — GBP reviews placeholder (no fabricated quotes) ——— */}
      <section className="border-y border-queso-cream/10 px-5 py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
          <div className="flex gap-1" aria-label="Five star rating placeholder">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-5 w-5 text-queso-yellow" />
            ))}
          </div>
          <Placeholder
            icon={<ReviewsIcon className="h-8 w-8" />}
            title="Google Business Profile Reviews"
            body="[PLACEHOLDER: This section is reserved for the live Google Business Profile reviews embed module.]"
            className="w-full"
          />
        </div>
      </section>

      {/* ——— Location & hours ——— */}
      <section className="px-5 py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8">
          <MapEmbed className="aspect-square w-full max-w-md" />
          <div className="flex flex-col gap-2">
            <p className="font-body text-sm font-bold uppercase tracking-[0.1em] text-queso-red">
              Visit Us
            </p>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-queso-cream">
              {SITE.address.area}
            </h2>
            <p className="pt-2 font-body text-lg leading-relaxed text-queso-cream/65">
              {SITE.address.road}
              <br />
              {SITE.address.city}
            </p>
            {/* UNCONFIRMED landmark — italic placeholder styling per design delta 4 */}
            <p className="font-body text-sm italic text-queso-cream/50">
              {SITE.address.plusCode}, Chongwe — {SITE.address.landmark}
            </p>
          </div>
          <div className="h-px bg-queso-cream/15" />
          <div className="grid grid-cols-2 gap-4">
            {[SITE.hours.weekdays, SITE.hours.weekend].map((row) => (
              <div key={row.label} className="flex flex-col gap-1">
                <p className="font-body text-base text-queso-cream/65">
                  {row.label}
                </p>
                <p className="font-body text-base font-bold text-queso-cream">
                  {formatTime(row.open)} - {formatTime(row.close)}
                </p>
              </div>
            ))}
          </div>
          <a
            href={MAPS_SEARCH_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center gap-2 border border-queso-cream/20 px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white"
          >
            Get Directions
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>
    </>
  );
}
