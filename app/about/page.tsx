import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story — Queso Pizza",
  description:
    "The story of Dalitso & Sam and a single wood-fired oven in Chongwe, Lusaka Province.",
};

// The one light-background page: bg-about-bg is the approved design override
// of queso-cream for this page's base (see frames/DESIGN-REVIEW.md).
export default function AboutPage() {
  return (
    <div className="bg-about-bg">
      {/* ——— Hero ——— */}
      <section className="flex min-h-[530px] flex-col items-center justify-center gap-8 px-5 py-24 text-center">
        <h1 className="font-display text-6xl font-extrabold uppercase leading-[1.1] tracking-tighter text-queso-black sm:text-7xl">
          Local
          <br />
          Rooted
        </h1>
        <p className="max-w-xl font-body text-lg leading-relaxed text-queso-black/70">
          We believe in the raw power of fire, dough, and time. This is the
          story of how a single wood-fired oven changed our lives.
        </p>
      </section>

      {/* ——— The founding ——— */}
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-5 pb-24">
        <p className="font-body text-sm font-bold uppercase tracking-[0.1em] text-queso-red">
          Est. 2022
        </p>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-queso-black">
          Dalitso &amp; Sam
        </h2>
        <p className="font-body text-base leading-relaxed text-queso-black/70">
          It started in a small backyard with a makeshift brick oven and an
          obsession with perfect hydration levels. Dalitso and Sam, driven by a
          mutual disdain for mass-produced crusts, spent months perfecting a
          slow-ferment dough that pays homage to traditional Neapolitan
          techniques while embracing local ingredients.
        </p>
        <div className="relative mt-4 aspect-square w-full">
          <Image
            src="/images/kitchen-prep.jpeg"
            alt="Prepping fresh shawarma, fries, and salads in the Queso Pizza kitchen"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* ——— Roots ——— */}
      <section className="mx-auto flex max-w-3xl flex-col gap-6 px-5 pb-24">
        <p className="font-body text-sm font-bold uppercase tracking-[0.1em] text-queso-red">
          Chongwe Roots
        </p>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-queso-black">
          Grounded in Community
        </h2>
        <p className="font-body text-base leading-relaxed text-queso-black/70">
          Sourcing directly from local farmers in Chongwe, our toppings are
          dictated by the seasons, not by a corporate supply chain. Every pie
          is a testament to the agricultural heritage of our region, combining
          bold, unapologetic flavors with the simplicity of honest farming. We
          don&apos;t just make pizza; we curate the harvest.
        </p>
        <blockquote className="border-l-2 border-queso-red pl-5 font-body text-lg italic leading-relaxed text-queso-black/80">
          &ldquo;Quality isn&apos;t an option. It&apos;s the only
          baseline.&rdquo;
        </blockquote>
        <div className="relative mt-4 aspect-square w-full">
          <Image
            src="/images/pizza-top-down.jpeg"
            alt="A wood-fired Queso pizza straight from the oven"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}
