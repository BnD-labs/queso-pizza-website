import Image from "next/image";
import Link from "next/link";
import {
  SITE,
  MAPS_SEARCH_URL,
  formatPhone,
  formatTime,
} from "@/lib/site-config";
import { MostOrderedCard } from "@/components/MostOrderedCard";
import { Reviews, RatingBadge } from "@/components/Reviews";
import { MapEmbed } from "@/components/MapEmbed";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CutleryIcon,
  PhoneIcon,
  PlusIcon,
  StorefrontIcon,
} from "@/components/icons";

/* Bento tiles carry their own span/height so the grid has a focal point
 * instead of six equal boxes. Row 1: pizzas (4 cols) + wraps (2). Row 2:
 * three 2-col tiles. Class strings stay literal so Tailwind can scan them. */
const BENTO_CARDS = [
  {
    // Not pizza-cheese-pull: that is the hero image directly above, and the
    // same photograph twice on one page reads as a thin library rather than a
    // deliberate choice.
    title: "Oven baked Pizzas",
    image: "/images/pizza-whole-steam.jpeg",
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
  {
    // Was a bespoke dashed-placeholder tile: the shop sells drinks but no
    // photograph existed, so it rendered as an empty box next to five photo
    // tiles. The fridge shot (2026-08-19) closes that gap and lets it join
    // the grid on the same terms as everything else.
    title: "Refreshments",
    image: "/images/beverages-fridge.jpeg",
    tile: "md:col-span-2 h-[250px]",
    heading: "text-lg",
    sub: "Available in-store",
  },
];

export default function Home() {
  return (
    <>
      {/* ——— Hero ———
             Reworked 2026-08-21 to the layout Brandon shortlisted: a solid red
             band, content left, the pizza as a circle right, and a wave easing
             into the cream ground. HERO ONLY — the rest of the page keeps the
             v5 system it already had.

             Red is a GROUND here rather than a fill on cream, which the
             contrast table in CLAUDE.md does not cover, so both directions are
             asserted in scripts/check-contrast.mjs: cream on red is 5.46:1 and
             yellow on red is 5.23:1. Nothing here is eyeballed.

             This also retires the full-bleed photo scrim. Text over a
             photograph had a contrast ratio that depended on which part of the
             crust it landed on — the one thing the probe could never verify,
             because the scrim was a sibling of the text rather than an
             ancestor. On a flat red field the ratio is fixed. ——— */}
      <section className="relative overflow-hidden bg-queso-red pb-24 pt-10 md:pb-32 md:pt-16">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 md:grid-cols-[1.25fr_1fr] md:gap-8">
          <div className="flex flex-col items-start gap-6">
            <span className="queso-enter flex items-center gap-2 rounded-full bg-queso-cream/15 px-3.5 py-1.5 font-body text-xs font-bold uppercase tracking-[0.1em] text-queso-cream ring-1 ring-queso-cream/25">
              <PhoneIcon className="h-3 w-3" />
              Delivery · Collection · Dine in
            </span>
            {/* Sized and spaced for Comix Loud, which is a very different shape from
                the Epilogue this was tuned for. Measured in the browser rather
                than guessed: at 72px "THE TASTE THAT" renders 974px wide in a
                633px column, and the font's natural line box is 1.5x its em.
                The old leading-[0.95] and lg:text-7xl therefore overflowed AND
                overlapped at the same time.

                The hard <br /> is gone with them. A fixed break only works when
                you know the line fits; with a face this wide it forced a wrap
                mid-phrase and then collided with the next line. text-wrap:balance
                distributes the lines evenly instead, and degrades to normal
                wrapping where unsupported.

                Sizes run a step below the Epilogue equivalents for the same
                reason — this face fills far more width per character, so it
                reads at the same visual weight smaller.

                leading-[1.5] is not a stylistic choice, it is the font's own
                metric: measured in the browser, one line of Comix Loud occupies
                1.5x its font-size. Anything tighter and consecutive lines
                physically overlap, which 0.95, 1.08, 1.15 and 1.3 all did. */}
            <h1 className="queso-enter queso-stagger-1 font-brand text-3xl font-extrabold leading-[1.5] tracking-tight text-queso-cream [text-wrap:balance] sm:text-4xl lg:text-5xl">
              THE TASTE THAT STAYS WITH YOU
            </h1>
            <p className="queso-enter queso-stagger-2 max-w-md font-body text-base leading-relaxed text-queso-cream/85">
              Oven-baked pizza, shawarma and fries in Chongwe. Build your order
              and send it straight to our WhatsApp.
            </p>
            <div className="queso-enter queso-stagger-3 flex flex-col items-start gap-5">
              <Link
                href="/menu"
                prefetch={false}
                className="rounded-full bg-queso-cream px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.1em] text-queso-red transition-[transform,filter] duration-[var(--dur-base)] ease-[var(--ease-out-quart)] hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0"
              >
                Order Now
              </Link>
              {/* Real 5.0 from the Google Business Profile — see lib/reviews.ts.
                  The count ships with it deliberately. */}
              <RatingBadge tone="onRed" />
            </div>
          </div>

          {/* The pizza, as a disc. Cropped square at source (see
              scripts/build-photos.mjs) so the circle frames the pizza rather
              than whatever object-cover happens to centre on. */}
          <div className="queso-enter queso-stagger-2 relative mx-auto aspect-square w-full max-w-[230px] sm:max-w-[300px] md:max-w-[440px]">
            <div className="absolute inset-0 rounded-full bg-queso-black/15 blur-2xl" />
            <Image
              src="/images/pizza-hero-round.jpeg"
              alt="An oven-baked Queso pizza, viewed from above"
              fill
              priority
              sizes="(min-width: 768px) 440px, 300px"
              className="rounded-full object-cover ring-8 ring-queso-cream/15"
            />
          </div>
        </div>

        {/* The wave into the cream ground. Inline SVG rather than a border
            radius so the curve can be asymmetric, and preserveAspectRatio="none"
            so it stretches to any viewport without changing height. */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 leading-[0] text-queso-cream"
          aria-hidden
        >
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="block h-[52px] w-full md:h-[104px]"
          >
            <path
              fill="currentColor"
              d="M0,46 C240,116 470,6 720,38 C970,70 1200,116 1440,58 L1440,120 L0,120 Z"
            />
          </svg>
        </div>
      </section>

      {/* ——— Floating Most Ordered quick-add (overlaps the hero) ——— */}
      <MostOrderedCard />

      {/* ——— Three ways to eat ———
             Replaces a band that advertised only the delivery hotline. All
             three modes were confirmed by the founder on 2026-08-19, and until
             now the site said nothing about two of them — a customer had no way
             to learn they could collect or sit in. Every claim here is a
             confirmed fact; nothing is inferred.

             No "book a table": he confirmed there is no reservation system,
             which is also why StructuredData keeps acceptsReservations: false.
             The delivery numbers move inside the Delivery card rather than
             being dropped. ——— */}
      <section className="border-y border-line bg-surface-warm px-5 py-14 md:py-20">
        <div className="queso-reveal mx-auto flex max-w-7xl flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-body text-sm font-bold uppercase tracking-[0.1em] text-queso-red">
              Three ways to eat
            </p>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-queso-black sm:text-4xl">
              Delivered, collected, or eaten in.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {/* ——— Delivery ——— */}
            <div className="flex flex-col gap-3 rounded-md border border-line bg-surface p-6">
              <PhoneIcon className="h-6 w-6 text-queso-red" />
              <h3 className="font-display text-xl font-bold text-queso-black">
                Delivery
              </h3>
              <p className="font-body text-sm leading-relaxed text-ink-soft">
                Call either line and we&apos;ll bring it to you.
              </p>
              <div className="mt-auto flex flex-col gap-1 pt-2">
                {[SITE.phones.delivery1, SITE.phones.delivery2].map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone}`}
                    className="font-display text-base font-bold text-queso-black underline decoration-queso-red decoration-2 underline-offset-4 transition-colors duration-[var(--dur-base)] hover:text-queso-red"
                  >
                    {formatPhone(phone)}
                  </a>
                ))}
              </div>
            </div>

            {/* ——— Collection ——— */}
            <div className="flex flex-col gap-3 rounded-md border border-line bg-surface p-6">
              <StorefrontIcon className="h-6 w-6 text-queso-red" />
              <h3 className="font-display text-xl font-bold text-queso-black">
                Collection
              </h3>
              <p className="font-body text-sm leading-relaxed text-ink-soft">
                Send your order on WhatsApp, then pick it up at the counter.
              </p>
              <Link
                href="/menu#order"
                prefetch={false}
                className="group mt-auto flex w-fit items-center gap-2 pt-2 font-body text-sm font-bold uppercase tracking-wide text-queso-red"
              >
                Build an order
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-quart)] group-hover:translate-x-1" />
              </Link>
            </div>

            {/* ——— Dine in ——— */}
            <div className="flex flex-col gap-3 rounded-md border border-line bg-surface p-6">
              <CutleryIcon className="h-6 w-6 text-queso-red" />
              <h3 className="font-display text-xl font-bold text-queso-black">
                Dine in
              </h3>
              <p className="font-body text-sm leading-relaxed text-ink-soft">
                Seating inside, no booking needed — walk in and take a table.
              </p>
              <p className="mt-auto pt-2 font-body text-sm text-ink-soft">
                {SITE.address.plusCode}, Chongwe — {SITE.address.landmark}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Story teaser ——— */}
      <section className="px-5 py-20 md:py-28">
        <div className="queso-reveal mx-auto grid max-w-5xl gap-8 rounded-lg border border-line bg-surface p-8 md:grid-cols-2 md:items-center md:gap-10 md:p-10">
          <div className="flex flex-col gap-6">
            {/* Tenure, not a customer count — see the note on SITE.tenureLine. */}
            <p className="font-body text-sm font-bold uppercase tracking-[0.1em] text-queso-red">
              {SITE.tenureLine}
            </p>
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
              prefetch={false}
              className="group flex w-fit items-center gap-2 border-b-2 border-queso-black pb-1 font-body text-sm font-bold uppercase tracking-wide text-queso-black transition-colors duration-[var(--dur-base)] hover:border-queso-red hover:text-queso-red"
            >
              Discover Our Story
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-quart)] group-hover:translate-x-1" />
            </Link>
          </div>
          {/* Image sits beside the copy on desktop so the CTA ends the column
              rather than being stranded above a full-width photo.

              Shot in the shop on 2026-08-04. Rendered in full colour: the
              grayscale-until-hover treatment that was here drained the one
              asset on the page that actually evidences "Rooted in Chongwe",
              and desaturation is a large part of the coldness the founder
              objected to on 2026-08-19. */}
          <div className="relative aspect-[4/3] w-full md:aspect-square">
            <Image
              src="/images/interior-counter.jpeg"
              alt="Customers at the counter inside Queso Pizza in Chongwe, under the menu board"
              fill
              sizes="(min-width: 768px) 480px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ——— Explore the Menu (bento) — the widest section, it carries the
             most weight on the page ——— */}
      <section className="bg-surface-warm px-5 py-24 md:py-36">
        <div className="mx-auto flex max-w-7xl flex-col gap-10">
          <h2 className="queso-reveal font-brand text-3xl font-extrabold leading-[1.25] tracking-tight text-queso-black sm:text-4xl lg:text-5xl">
            Explore the Menu
          </h2>
          <div className="queso-reveal flex flex-col gap-2 md:grid md:grid-cols-6">
            {BENTO_CARDS.map((card) => (
              <Link
                key={card.title}
                href="/menu"
                prefetch={false}
                className={`group relative block overflow-hidden rounded-lg border border-queso-black/10 bg-queso-black transition-colors duration-[var(--dur-base)] hover:border-queso-red/50 ${card.tile}`}
              >
                <Image
                  src={card.image}
                  // Decorative: the tile's own <h3> already announces it, so
                  // repeating the title here just makes screen readers say it twice.
                  alt=""
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
                  {"sub" in card ? (
                    <p className="pt-1 font-body text-sm text-queso-cream/60">
                      {card.sub}
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}

            {/* Extras & Add-ons */}
            <Link
              href="/menu"
              prefetch={false}
              className="group flex h-[250px] flex-col items-center justify-center gap-2 rounded-lg border border-line bg-surface transition-colors duration-[var(--dur-base)] hover:border-queso-red/50 md:col-span-2"
            >
              <PlusIcon className="h-8 w-8 text-queso-red transition-transform duration-[var(--dur-base)] ease-[var(--ease-out-quart)] group-hover:rotate-90" />
              <h3 className="font-display text-lg font-bold text-queso-black">
                Extras &amp; Add-ons
              </h3>
            </Link>
          </div>
          <Link
            href="/menu"
            prefetch={false}
            className="flex items-center justify-center rounded-control border border-queso-black/20 py-4 font-body text-sm font-bold uppercase tracking-wide text-queso-black transition-colors duration-[var(--dur-base)] hover:border-queso-red hover:bg-queso-red hover:text-queso-cream"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* ——— Social proof — REAL Google Business Profile reviews ———
             This block was gated behind SHOW_PLACEHOLDERS and never shipped,
             because five stars over a "[PLACEHOLDER]" string is a rating claim
             with nothing behind it. The real profile data landed 2026-08-21, so
             it ships unconditionally now. See lib/reviews.ts. ——— */}
      <section className="border-y border-line px-5 py-20 md:py-24">
        <Reviews className="mx-auto w-full max-w-5xl" />
      </section>

      {/* ——— Location & hours ——— */}
      <section className="px-5 py-24 md:py-32">
        <div className="queso-reveal mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-start md:gap-14">
          <MapEmbed className="aspect-square w-full" />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p className="font-body text-sm font-bold uppercase tracking-[0.1em] text-queso-red">
                Visit Us
              </p>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-queso-black sm:text-4xl lg:text-5xl">
                {SITE.address.area}
              </h2>
              <p className="pt-2 font-body text-lg leading-relaxed text-ink-soft">
                {SITE.address.road}
                <br />
                {SITE.address.city}
              </p>
              {/* Landmark confirmed 2026-08-19 — see design delta 4. */}
              <p className="font-body text-sm text-ink-soft">
                {SITE.address.plusCode}, Chongwe — {SITE.address.landmark}
              </p>
            </div>
            <div className="h-px bg-line" />
            <div className="grid grid-cols-2 gap-4">
              {[SITE.hours.weekdays, SITE.hours.weekend].map((row) => (
                <div key={row.label} className="flex flex-col gap-1">
                  <p className="font-body text-base text-ink-soft">
                    {row.label}
                  </p>
                  <p className="font-body text-base font-bold text-queso-black">
                    {formatTime(row.open)} - {formatTime(row.close)}
                  </p>
                </div>
              ))}
            </div>
            <a
              href={MAPS_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-fit items-center gap-2 rounded-control border border-queso-black/20 px-6 py-3 font-body text-sm font-bold uppercase tracking-wide text-queso-black transition-colors duration-[var(--dur-base)] hover:border-queso-red hover:bg-queso-red hover:text-queso-cream"
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
