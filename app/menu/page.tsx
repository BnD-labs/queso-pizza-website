import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { PIZZAS, SHAWARMA, FRIES, EXTRA_CHEESE } from "@/lib/menu-data";
import { ITEM_DESCRIPTIONS, ITEM_IMAGES, MENU_CATEGORIES } from "@/lib/menu-content";
import { MenuCategoryNav } from "@/components/MenuCategoryNav";
import { PizzaCard } from "@/components/order/PizzaCard";
import { FlatItemRow } from "@/components/order/FlatItemRow";
import { PerfectPairings } from "@/components/order/PerfectPairings";
import { OrderSummarySection } from "@/components/order/OrderSummarySection";
import { MenuAddHandler } from "@/components/order/MenuAddHandler";

export const metadata: Metadata = {
  title: "Menu & Order — Queso Pizza",
  description:
    "Wood-fired pizza, shawarma, and fries in Chongwe. Build your order and send it on WhatsApp.",
};

// Cross-sell strip content: fries + a shawarma as sides. Beverages are
// excluded — no verified drink data exists (CLAUDE.md: never invent it).
const PAIRINGS = [...FRIES, SHAWARMA[0]].map((item) => ({
  id: item.id,
  name: item.name,
  price: item.price,
  image: ITEM_IMAGES[item.id],
}));

export default function MenuPage() {
  return (
    <div className="px-5">
      <Suspense fallback={null}>
        <MenuAddHandler />
      </Suspense>

      {/* ——— Intro ——— */}
      <section className="mx-auto flex max-w-7xl flex-col items-center gap-7 py-20 text-center md:py-28">
        <h1 className="queso-enter max-w-2xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-queso-black sm:text-5xl lg:text-6xl">
          Crafted in the heat. Enjoyed in the moment.
        </h1>
        <p className="queso-enter queso-stagger-1 max-w-sm font-body text-base leading-relaxed text-ink-soft">
          Premium wood-fired pizza and shawarma. Authentic flavors, local
          roots.
        </p>
        {/* md+ gets the sticky bar below instead — don't show both. */}
        <nav className="queso-enter queso-stagger-2 flex flex-wrap justify-center gap-2 md:hidden">
          {MENU_CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="rounded-full border border-line px-4 py-2 font-body text-xs font-bold uppercase tracking-wide text-queso-black transition-colors duration-[var(--dur-base)] hover:border-queso-red hover:bg-queso-red hover:text-queso-cream"
            >
              {cat.label}
            </a>
          ))}
        </nav>
      </section>

      <MenuCategoryNav />

      {/* ——— Perfect Pairings (appears once the order has items) ——— */}
      <PerfectPairings items={PAIRINGS} />

      {/* ——— Pizza ——— */}
      <section id="pizza" className="mx-auto max-w-7xl scroll-mt-24 pb-20 md:pb-28">
        <div className="queso-reveal flex items-baseline gap-3 pb-10">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-queso-black sm:text-4xl">
            Artisanal Pizza
          </h2>
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-ink-soft">
            Wood-Fired
          </span>
        </div>
        {/* items-start, not the default stretch: a text-forward card (no photo)
            stretched to a photo card's height leaves a dead void between the
            size selector and the mt-auto Add button. Natural heights read as a
            deliberate mixed grid instead. */}
        <div className="queso-reveal flex flex-col gap-8 md:grid md:grid-cols-2 md:items-start lg:grid-cols-3">
          {PIZZAS.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
              description={ITEM_DESCRIPTIONS[pizza.id]}
              image={ITEM_IMAGES[pizza.id]}
            />
          ))}
        </div>

        {/* ——— Extras ——— */}
        <div className="queso-reveal mt-10 flex flex-col gap-2 md:grid md:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-md border border-line bg-surface p-5 transition-colors duration-[var(--dur-base)] hover:border-queso-red/40">
            <div className="flex items-center justify-between">
              <h3 className="font-body text-sm font-bold uppercase tracking-wide text-queso-black">
                Extra Cheese
              </h3>
              <span className="font-body text-sm font-bold text-queso-red">
                K{EXTRA_CHEESE.S} / K{EXTRA_CHEESE.M}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-body text-sm text-ink-soft">
                Small / Medium · Large / XL
              </p>
              <span className="font-body text-sm font-bold text-queso-red">
                K{EXTRA_CHEESE.L} / K{EXTRA_CHEESE.XL}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 rounded-md border border-line bg-surface p-5 transition-colors duration-[var(--dur-base)] hover:border-queso-red/40">
            <h3 className="font-body text-sm font-bold uppercase tracking-wide text-queso-black">
              Extra Toppings
            </h3>
            {/* No confirmed pricing — never render a number here (CLAUDE.md) */}
            <p className="font-body text-sm italic text-ink-soft">
              Pricing available in-store. Ask our server for today&apos;s
              premium selections.
            </p>
          </div>
        </div>
      </section>

      {/* ——— Shawarma ——— */}
      <section id="shawarma" className="mx-auto max-w-7xl scroll-mt-24 pb-20 md:pb-28">
        <h2 className="queso-reveal pb-10 font-display text-3xl font-extrabold tracking-tight text-queso-black sm:text-4xl">
          Shawarma
        </h2>
        <div className="queso-reveal flex flex-col gap-4">
          {SHAWARMA.map((item) => (
            <FlatItemRow
              key={item.id}
              item={item}
              description={ITEM_DESCRIPTIONS[item.id]}
              image={ITEM_IMAGES[item.id]}
            />
          ))}
        </div>
      </section>

      {/* ——— Fries ——— */}
      <section id="fries" className="mx-auto max-w-7xl scroll-mt-24 pb-20 md:pb-28">
        <h2 className="queso-reveal pb-10 font-display text-3xl font-extrabold tracking-tight text-queso-black sm:text-4xl">
          Fries
        </h2>
        <div className="queso-reveal flex flex-col gap-2">
          {FRIES.map((item) => (
            <FlatItemRow key={item.id} item={item} showThumb={false} />
          ))}
        </div>
      </section>

      {/* ——— Beverages — flagged placeholder, no invented data ——— */}
      <section id="beverages" className="mx-auto max-w-7xl scroll-mt-24 pb-28 md:pb-36">
        <div className="queso-reveal flex items-baseline gap-3 pb-10">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-queso-black sm:text-4xl">
            Beverages
          </h2>
        </div>
        {/* Beverages carried the dashed placeholder for the whole build because
            no photograph existed. One does now — the shop's own fridge, shot
            2026-08-19 — so the scaffolding is retired rather than gated.

            The copy stays as approved and deliberately generic: the photo shows
            what is stocked today, and the sentence stays true when the stock
            rotates. There is still no price data, so no prices are implied. */}
        <div className="queso-reveal grid gap-6 overflow-hidden rounded-md border border-line bg-surface sm:grid-cols-[minmax(0,240px)_1fr] sm:items-center">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src="/images/beverages-fridge.jpeg"
              alt="The chilled drinks fridge at Queso Pizza, stocked with juices, soft drinks and bottled water"
              fill
              sizes="(min-width: 640px) 240px, 100vw"
              className="object-cover"
            />
          </div>
          <p className="px-5 pb-5 font-body text-sm leading-relaxed text-ink-soft sm:py-5 sm:pl-0 sm:pr-8">
            Variety of sodas, juices and water available in-store.
          </p>
        </div>
      </section>

      {/* ——— Order Ready! Send and Call to Confirm ——— */}
      <OrderSummarySection />
    </div>
  );
}
