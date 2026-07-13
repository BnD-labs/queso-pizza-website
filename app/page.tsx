import { SITE } from "@/lib/site-config";

// Phase 1 placeholder shell — proves tokens + fonts render. Replaced in Phase 2.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-queso-black px-5 text-center">
      <div className="h-1 w-16 bg-queso-red" aria-hidden />
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-queso-cream">
        QUESO PIZZA
      </h1>
      <p className="font-body text-base text-queso-cream/65">{SITE.tagline}</p>
    </main>
  );
}
