import type { Metadata } from "next";
import Image from "next/image";
import {
  PIZZAS,
  SHAWARMA,
  FRIES,
  EXTRA_CHEESE,
  type PizzaSize,
} from "@/lib/menu-data";
import { ITEM_DESCRIPTIONS, ITEM_IMAGES } from "@/lib/menu-content";
import { Placeholder } from "@/components/Placeholder";
import { CameraIcon, PlusIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Menu & Order — Queso Pizza",
  description:
    "Wood-fired pizza, shawarma, and fries in Chongwe. Build your order and send it on WhatsApp.",
};

const SIZES: PizzaSize[] = ["S", "M", "L", "XL"];

const CATEGORIES = [
  { id: "pizza", label: "Pizza" },
  { id: "shawarma", label: "Shawarma" },
  { id: "fries", label: "Fries" },
];

// Phase 2 is the static shell: size chips and add buttons are presentational.
// The order builder (state, quantities, WhatsApp compile) lands in Phase 3
// per .claude/skills/whatsapp-order-builder.
export default function MenuPage() {
  return (
    <div className="px-5">
      {/* ——— Intro ——— */}
      <section className="mx-auto flex max-w-7xl flex-col items-center gap-6 py-16 text-center">
        <h1 className="max-w-md font-display text-4xl font-extrabold leading-tight tracking-tight text-queso-cream">
          Crafted in the heat. Enjoyed in the moment.
        </h1>
        <p className="max-w-sm font-body text-base leading-relaxed text-queso-cream/65">
          Premium wood-fired pizza and shawarma. Authentic flavors, local
          roots.
        </p>
        <nav className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="border border-queso-cream/20 px-4 py-2 font-body text-xs font-bold uppercase tracking-wide text-queso-cream/80"
            >
              {cat.label}
            </a>
          ))}
        </nav>
      </section>

      {/* ——— Pizza ——— */}
      <section id="pizza" className="mx-auto max-w-7xl scroll-mt-20 pb-16">
        <div className="flex items-baseline gap-3 pb-8">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-queso-cream">
            Artisanal Pizza
          </h2>
          <span className="font-body text-[10px] font-bold uppercase tracking-[0.15em] text-queso-cream/50">
            Wood-Fired
          </span>
        </div>
        <div className="flex flex-col gap-8 md:grid md:grid-cols-2 lg:grid-cols-3">
          {PIZZAS.map((pizza) => {
            const image = ITEM_IMAGES[pizza.id];
            const description = ITEM_DESCRIPTIONS[pizza.id];
            return (
              <article
                key={pizza.id}
                className="flex flex-col border border-queso-cream/10 bg-surface-low"
              >
                <div className="relative aspect-[4/3]">
                  {pizza.tier === "special" ? (
                    <span className="absolute left-0 top-0 z-10 bg-queso-yellow px-2 py-1 font-body text-[10px] font-bold uppercase tracking-[0.15em] text-queso-black">
                      Special
                    </span>
                  ) : null}
                  {image ? (
                    <Image
                      src={image}
                      alt={`${pizza.name} pizza`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Placeholder
                      icon={<CameraIcon className="h-7 w-7" />}
                      body="Photography pending"
                      className="h-full"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-bold text-queso-cream">
                      {pizza.name}
                    </h3>
                    {/* Card default price = Small (per CLAUDE.md) */}
                    <span className="font-body text-base font-bold text-queso-red">
                      K{pizza.prices.S}
                    </span>
                  </div>
                  {description ? (
                    <p className="font-body text-sm leading-relaxed text-queso-cream/65">
                      {description}
                    </p>
                  ) : null}
                  <div className="flex gap-2 pt-1">
                    {SIZES.map((size, i) => (
                      <span
                        key={size}
                        className={`flex h-9 w-9 items-center justify-center border font-body text-xs font-bold ${
                          i === 0
                            ? "border-queso-red text-queso-red"
                            : "border-queso-cream/20 text-queso-cream/60"
                        }`}
                        title={`K${pizza.prices[size]}`}
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-center gap-2 border border-queso-cream/25 py-3 font-body text-xs font-bold uppercase tracking-wide text-queso-cream/80">
                    Add to Order
                    <PlusIcon className="h-3 w-3" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ——— Extras ——— */}
        <div className="mt-8 flex flex-col gap-2">
          <div className="flex flex-col gap-2 border border-queso-cream/10 bg-surface-low p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-body text-sm font-bold uppercase tracking-wide text-queso-cream">
                Extra Cheese
              </h3>
              <span className="font-body text-sm font-bold text-queso-red">
                K{EXTRA_CHEESE.S} / K{EXTRA_CHEESE.M}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-body text-sm text-queso-cream/65">
                Small / Medium · Large / XL
              </p>
              <span className="font-body text-sm font-bold text-queso-red">
                K{EXTRA_CHEESE.L} / K{EXTRA_CHEESE.XL}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 border border-queso-cream/10 bg-surface-low p-5">
            <h3 className="font-body text-sm font-bold uppercase tracking-wide text-queso-cream">
              Extra Toppings
            </h3>
            {/* No confirmed pricing — never render a number here (CLAUDE.md) */}
            <p className="font-body text-sm italic text-queso-cream/65">
              Pricing available in-store. Ask our server for today&apos;s
              premium selections.
            </p>
          </div>
        </div>
      </section>

      {/* ——— Shawarma ——— */}
      <section id="shawarma" className="mx-auto max-w-7xl scroll-mt-20 pb-16">
        <h2 className="pb-8 font-display text-3xl font-extrabold tracking-tight text-queso-cream">
          Shawarma
        </h2>
        <div className="flex flex-col gap-4">
          {SHAWARMA.map((item) => {
            const image = ITEM_IMAGES[item.id];
            const description = ITEM_DESCRIPTIONS[item.id];
            return (
              <article
                key={item.id}
                className="flex items-center gap-4 border border-queso-cream/10 bg-surface-low p-4"
              >
                <div className="relative h-16 w-16 shrink-0">
                  {image ? (
                    <Image
                      src={image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center border border-dashed border-queso-cream/25">
                      <CameraIcon className="h-5 w-5 text-queso-cream/40" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <h3 className="font-display text-base font-bold text-queso-cream">
                    {item.name}
                  </h3>
                  {description ? (
                    <p className="font-body text-xs leading-relaxed text-queso-cream/65">
                      {description}
                    </p>
                  ) : null}
                  <span className="font-body text-sm font-bold text-queso-red">
                    K{item.price}
                  </span>
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-queso-cream/25 text-queso-cream/80">
                  <PlusIcon className="h-4 w-4" />
                </span>
              </article>
            );
          })}
        </div>
      </section>

      {/* ——— Fries ——— */}
      <section id="fries" className="mx-auto max-w-7xl scroll-mt-20 pb-16">
        <h2 className="pb-8 font-display text-3xl font-extrabold tracking-tight text-queso-cream">
          Fries
        </h2>
        <div className="flex flex-col gap-2">
          {FRIES.map((item) => (
            <article
              key={item.id}
              className="flex items-center justify-between gap-4 border border-queso-cream/10 bg-surface-low px-5 py-4"
            >
              <div className="flex flex-col">
                <h3 className="font-body text-sm font-bold text-queso-cream">
                  {item.name}
                </h3>
                <span className="font-body text-sm font-bold text-queso-red">
                  K{item.price}
                </span>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-queso-cream/25 text-queso-cream/80">
                <PlusIcon className="h-4 w-4" />
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* ——— Beverages — flagged placeholder, no invented data ——— */}
      <section id="beverages" className="mx-auto max-w-7xl scroll-mt-20 pb-24">
        <div className="flex items-baseline gap-3 pb-8">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-queso-cream">
            Beverages
          </h2>
          <span className="border border-queso-cream/25 px-2 py-0.5 font-body text-[10px] font-bold uppercase tracking-[0.15em] text-queso-cream/50">
            Placeholder
          </span>
        </div>
        <Placeholder
          icon={<CameraIcon className="h-8 w-8" />}
          body="Variety of sodas, juices and water available in-store."
          className="w-full"
        />
      </section>
    </div>
  );
}
