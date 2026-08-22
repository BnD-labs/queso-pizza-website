/**
 * The "QUESO PIZZA" logotype, in brand colours.
 *
 * QUESO is red and PIZZA is yellow, per the brand lockup. Getting the yellow
 * onto a cream page takes one trick, and it is not decoration:
 *
 *   queso-yellow on queso-cream measures 1.04:1.
 *
 * That is the banned pairing scripts/check-contrast.mjs asserts must keep
 * failing — yellow text on cream is not "low contrast", it is invisible. The
 * fill stays yellow and a black outline carries the legibility instead
 * (black on cream is 18.2:1). An outlined logotype is also exactly what a comic
 * face like Comix Loud is drawn for, so this reads as the brand rather than as
 * a workaround.
 *
 * On the dark footer no outline is needed: yellow is 16.9:1 there. QUESO turns
 * cream rather than red on that ground — red on dark is 3.23:1, which is the
 * v4 constraint that has not gone away, it has only moved to the dark accents.
 *
 * SPACING. Comix Loud is a wide face and was inheriting `tracking-tight` from
 * the Epilogue styling — i.e. NEGATIVE letter-spacing — which jammed the glyphs
 * together and made the lockup look amateur. It now carries positive tracking,
 * and the inter-word gap is an explicit em-relative spacer rather than a plain
 * space so it scales with the type. The outline is 1.5px, not 2.5px: at
 * logotype sizes the heavier stroke closed up the counters of the letterforms.
 *
 * The two words are separate spans for colour only. There is deliberately no
 * sr-only copy of the name alongside them: the spans already contain the real
 * text with a space between, so a duplicate made screen readers announce
 * "Queso Pizza" twice.
 */
export function Wordmark({
  tone = "onLight",
  className = "",
}: {
  tone?: "onLight" | "onDark";
  className?: string;
}) {
  const queso = tone === "onLight" ? "text-queso-red" : "text-queso-cream";
  return (
    <span
      className={`whitespace-nowrap font-brand font-bold tracking-[0.05em] ${className}`}
    >
      <span className={queso}>{"Queso".toUpperCase()}</span>
      <span className="inline-block w-[0.28em]" aria-hidden />
      <span
        className={
          tone === "onLight"
            ? "text-queso-yellow [paint-order:stroke_fill] [-webkit-text-stroke:1.5px_var(--color-queso-black)]"
            : "text-queso-yellow"
        }
      >
        {"Pizza".toUpperCase()}
      </span>
    </span>
  );
}
