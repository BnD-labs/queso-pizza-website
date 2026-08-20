import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Our Story — Queso Pizza",
  description:
    "The story of Dalitso & Sam and a pizza oven in Chongwe, Lusaka Province.",
};

// The one light-background page: bg-about-bg is the approved design override
// of queso-cream for this page's base (see frames/DESIGN-REVIEW.md).
export default function AboutPage() {
  return (
    <div className="bg-about-bg">
      {/* ——— Hero ——— */}
      <section className="flex min-h-[530px] flex-col items-center justify-center gap-8 px-5 py-24 text-center md:py-32">
        <h1 className="queso-enter font-display text-6xl font-extrabold uppercase leading-[1.1] tracking-tighter text-queso-black sm:text-7xl lg:text-8xl">
          Local
          <br />
          Rooted
        </h1>
        <p className="queso-enter queso-stagger-1 max-w-xl font-body text-lg leading-relaxed text-queso-black/70">
          We believe in the raw power of heat, dough, and time. This is the
          story of how a single oven changed our lives.
        </p>
      </section>

      {/* ——— The founding ——— */}
      <section className="queso-reveal mx-auto flex max-w-3xl flex-col gap-6 px-5 pb-20 md:pb-28">
        <p className="font-body text-sm font-bold uppercase tracking-[0.1em] text-queso-red">
          Est. 2022
        </p>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-queso-black lg:text-5xl">
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
            sizes="(min-width: 768px) 704px, 100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* ——— Roots ——— */}
      <section className="queso-reveal mx-auto flex max-w-3xl flex-col gap-6 px-5 pb-28 md:pb-36">
        <p className="font-body text-sm font-bold uppercase tracking-[0.1em] text-queso-red">
          Chongwe Roots
        </p>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-queso-black lg:text-5xl">
          Grounded in Community
        </h2>
        <p className="font-body text-base leading-relaxed text-queso-black/70">
          Sourcing directly from local farmers in Chongwe, our toppings are
          dictated by the seasons, not by a corporate supply chain. Every pie
          is a testament to the agricultural heritage of our region, combining
          bold, unapologetic flavors with the simplicity of honest farming. We
          don&apos;t just make pizza; we curate the harvest.
        </p>
        <blockquote className="border-l-4 border-queso-red py-2 pl-6 font-display text-xl italic leading-relaxed text-queso-black/85 md:text-2xl">
          &ldquo;Quality isn&apos;t an option. It&apos;s the only
          baseline.&rdquo;
        </blockquote>
        {/* "Grounded in Community" is carried by a photograph of the community,
            not by another product shot. Taken in the shop on 2026-08-04. */}
        <div className="relative mt-4 aspect-[4/3] w-full">
          <Image
            src="/images/interior-diners.jpeg"
            alt="Two customers sharing a meal and a Coca-Cola at Queso Pizza in Chongwe"
            fill
            sizes="(min-width: 768px) 704px, 100vw"
            className="object-cover"
          />
        </div>
      </section>
    </div>
  );
}
