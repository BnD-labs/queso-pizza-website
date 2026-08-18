import Image from "next/image";
import Link from "next/link";
import {
  SITE,
  MAPS_SEARCH_URL,
  SHOW_PLACEHOLDERS,
  formatPhone,
  formatTime,
} from "@/lib/site-config";
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

/* Bento tiles carry their own span/height so the grid has a focal point
 * instead of six equal boxes. Row 1: pizzas (4 cols) + wraps (2). Row 2:
 * three 2-col tiles. Class strings stay literal so Tailwind can scan them. */
const BENTO_CARDS = [
  {
    title: "Oven baked Pizzas",
    image: "/images/pizza-cheese-pull.jpeg",
    tile: "md:col-span-4 h-[280px] md:h-[400px]",
    heading: "text-xl md:text-3xl",
  },
  {
    title: "Craft Wraps",
    image: "/images/wraps-platter.jpeg",
    tile: "md:col-span-2 h-[280px] md:h-[400px]",
    heading: "text-xl",
  },
  {
    title: "Fries / Chicken fingers",
    image: "/images/chicken-fries-dark.jpeg",
    tile: "md:col-span-2 h-[250px]",
    heading: "text-lg",
  },
];

export default function Home() {
  return (
    <>
      {/* ——— Hero ——— */}
      <section className="relative flex min-h-[88vh] flex-col justify-end pb-28">
        <div className="absolute inset-0">
          <Image
            src="/images/pizza-cheese-pull.jpeg"
            alt="Wood-fired pizza fresh from the oven"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-queso-black via-queso-black/50 to-transparent" />
        </div>
        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-7 px-5">
          <span className="queso-enter flex items-center gap-2 bg-queso-red/35 px-3 py-1.5 font-body text-xs font-medium uppercase tracking-[0.1em] text-queso-cream backdrop-blur-sm">
            <PhoneIcon className="h-3 w-3" />
            Delivery Available
          </span>
          <h1 className="queso-enter queso-stagger-1 max-w-4xl font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            THE TASTE THAT
            <br />
            STAYS WITH YOU
          </h1>
          <Link
            href="/menu"
            className="queso-enter queso-stagger-2 rounded-control bg-queso-red px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.1em] text-white transition-[transform,filter] duration-[var(--dur-base)] ease-[var(--ease-out-quart)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:brightness-95"
          >
            Order Now
          </Link>
        </div>
      </section>

      {/* ——— Floating Most Ordered quick-add (overlaps the hero) ——— */}
      <MostOrderedCard />

      {/* ——— Direct delivery hotline — deliberately compact band, so the
             generous sections either side read as the important ones ——— */}
      <section className="border-b border-queso-cream/10 bg-surface-low px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4">
          <p className="font-body text-xs font-medium uppercase tracking-[0.1em] text-queso-cream/65">
            Direct Delivery Hotline
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-10">
            {[SITE.phones.delivery1, SITE.phones.delivery2].map((phone) => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="font-display text-lg text-queso-cream underline decoration-queso-red decoration-2 underline-offset-[6px] transition-colors duration-[var(--dur-base)] hover:text-white hover:decoration-queso-yellow"
              >
                {formatPhone(phone)}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Story teaser ——— */}
      <section className="px-5 py-20 md:py-28">
        <div className="queso-reveal mx-auto grid max-w-5xl gap-8 border border-queso-cream/10 bg-queso-cream p-8 md:grid-cols-2 md:items-center md:gap-10 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-queso-black sm:text-4xl lg:text-5xl">
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
              className="group flex w-fit items-center gap-2 border-b-2 border-queso-black pb-1 font-body text-sm font-bold uppercase tracking-wide text-queso-black transition-colors duration-[var(--dur-base)] hover:border-queso-red hover:text-queso-red"
            >
              Discover Our Story
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-quart)] group-hover:translate-x-1" />
            </Link>
          </div>
          {/* Image sits beside the copy on desktop so the CTA ends the column
              rather than being stranded above a full-width photo. */}
          <div className="relative aspect-[4/3] w-full md:aspect-square">
            <Image
              src="/images/store-front.jpg"
              alt="The Queso Pizza storefront in Chongwe"
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover grayscale transition-[filter] duration-700 ease-[var(--ease-out-quart)] hover:grayscale-0"
            />
          </div>
        </div>
      </section>

      {/* ——— Explore the Menu (bento) — the widest section, it carries the
             most weight on the page ——— */}
      <section className="bg-surface-low px-5 py-24 md:py-36">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <h2 className="queso-reveal font-display text-3xl font-extrabold tracking-tight text-queso-cream sm:text-4xl lg:text-5xl">
            Explore the Menu
          </h2>
          <div className="queso-reveal flex flex-col gap-2 md:grid md:grid-cols-6">
            {BENTO_CARDS.map((card) => (
              <Link
                key={card.title}
                href="/menu"
                className={`group relative block overflow-hidden border border-queso-cream/10 bg-queso-black transition-colors duration-[var(--dur-base)] hover:border-queso-cream/30 ${card.tile}`}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover opacity-60 transition-[opacity,transform] duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.04] group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-queso-black/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3
                    className={`font-display font-bold text-queso-cream ${card.heading}`}
                  >
                    {card.title}
                  </h3>
                </div>
              </Link>
            ))}

            {/* Refreshments — no verified beverage photography; placeholder convention */}
            {/* Kept in production, unlike the reviews block: the shop really
                does sell drinks, and the in-store line is approved copy. Only
                the dashed scaffolding is internal — and keeping the tile keeps
                the 4+2 / 2+2+2 grid balanced. */}
            <Link
              href="/menu"
              className="relative flex h-[250px] flex-col justify-end border border-queso-cream/10 bg-queso-black transition-colors duration-[var(--dur-base)] hover:border-queso-cream/30 md:col-span-2"
            >
              {SHOW_PLACEHOLDERS ? (
                <div className="absolute inset-2">
                  <Placeholder
                    icon={<CameraIcon className="h-7 w-7" />}
                    body="Beverage photography pending"
                    className="h-full"
                  />
                </div>
              ) : null}
              <div className="relative p-6">
                <h3 className="font-display text-lg font-bold text-queso-cream">
                  Refreshments
                </h3>
                {SHOW_PLACEHOLDERS ? null : (
                  <p className="pt-1 font-body text-sm text-queso-cream/60">
                    Available in-store
                  </p>
                )}
              </div>
            </Link>

            {/* Extras & Add-ons */}
            <Link
              href="/menu"
              className="group flex h-[250px] flex-col items-center justify-center gap-2 border border-queso-cream/10 bg-queso-black transition-colors duration-[var(--dur-base)] hover:border-queso-cream/30 md:col-span-2"
            >
              <PlusIcon className="h-8 w-8 text-queso-red transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-quart)] group-hover:rotate-90" />
              <h3 className="font-display text-lg font-bold text-queso-cream">
                Extras &amp; Add-ons
              </h3>
            </Link>
          </div>
          <Link
            href="/menu"
            className="flex items-center justify-center rounded-control border border-queso-cream/20 py-4 font-body text-sm font-bold uppercase tracking-wide text-queso-cream transition-colors duration-[var(--dur-base)] hover:border-queso-red hover:bg-queso-red hover:text-white"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* ——— Social proof — GBP reviews placeholder (no fabricated quotes).
             Hidden in production: unlike Beverages there is no approved copy
             behind this, so there is nothing honest to show a customer yet.
             The five stars go with it — stars imply a rating we do not have. ——— */}
      {SHOW_PLACEHOLDERS ? (
      <section className="border-y border-queso-cream/10 px-5 py-20 md:py-24">
        <div className="queso-reveal mx-auto flex max-w-3xl flex-col items-center gap-6">
          <div
            className="flex gap-1"
            role="img"
            aria-label="Five star rating placeholder"
          >
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
      ) : null}

      {/* ——— Location & hours ——— */}
      <section className="px-5 py-24 md:py-32">
        <div className="queso-reveal mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-start md:gap-14">
          <MapEmbed className="aspect-square w-full" />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="font-body text-sm font-bold uppercase tracking-[0.1em] text-queso-cream/70">
                Visit Us
              </p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-queso-cream sm:text-4xl lg:text-5xl">
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
              className="group flex w-fit items-center gap-2 rounded-control border border-queso-cream/20 px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-white transition-colors duration-[var(--dur-base)] hover:border-queso-cream/50 hover:bg-queso-cream/10"
            >
              Get Directions
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-quart)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
