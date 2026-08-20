import { REVIEWS, RATING_DISPLAY } from "@/lib/reviews";
import { StarIcon } from "./icons";

/*
 * Real Google Business Profile reviews.
 *
 * This replaces the dashed "[PLACEHOLDER: ...reviews embed module]" block that
 * was hidden in production for the whole build. It was hidden for a good
 * reason — five stars attached to no rating is a claim, and the constitution
 * bans invented ones. That reason expired on 2026-08-21 when the real profile
 * data arrived; the stars now have a real 5.0 behind them.
 *
 * The count ships alongside the rating deliberately. Four reviews is a small
 * number, and showing "5.0" without "from 4 reviews" would flatter it in
 * exactly the way the fabricated-stat rule exists to prevent. Both or neither.
 */

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span
      className="flex gap-0.5"
      role="img"
      aria-label={`Rated ${RATING_DISPLAY} out of 5`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={`${className} text-queso-red`} />
      ))}
    </span>
  );
}

/** Compact rating badge — rating, stars, count. Used in the hero. */
export function RatingBadge({ tone = "light" }: { tone?: "light" | "onRed" }) {
  const star = tone === "onRed" ? "text-queso-yellow" : "text-queso-red";
  const value = tone === "onRed" ? "text-queso-cream" : "text-queso-black";
  const meta = tone === "onRed" ? "text-queso-cream/80" : "text-ink-soft";
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="flex gap-0.5"
        role="img"
        aria-label={`Rated ${RATING_DISPLAY} out of 5 from ${REVIEWS.count} Google reviews`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} className={`h-4 w-4 ${star}`} />
        ))}
      </span>
      <span className={`font-body text-sm font-bold ${value}`}>
        {RATING_DISPLAY}
      </span>
      <span className={`font-body text-sm ${meta}`} aria-hidden>
        · {REVIEWS.count} Google reviews
      </span>
    </div>
  );
}

/** Full reviews section — heading, aggregate, and the quotable reviews. */
export function Reviews({
  title = "What Chongwe says",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="queso-reveal flex flex-col gap-3 pb-10">
        <p className="font-body text-sm font-bold uppercase tracking-[0.1em] text-queso-red">
          {REVIEWS.source}
        </p>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-queso-black sm:text-4xl">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <Stars />
            <span className="font-body text-sm font-bold text-queso-black">
              {RATING_DISPLAY}
            </span>
            <span className="font-body text-sm text-ink-soft">
              from {REVIEWS.count} reviews
            </span>
          </div>
        </div>
      </div>
      {/* md:items-start so a short review sizes to its own content. Stretched to
          match a long one, "Best Shawarma in Chongwe" sat above a large void —
          the same failure the pizza grid hit with photoless cards. */}
      <div className="queso-reveal grid gap-4 md:grid-cols-2 md:items-start">
        {REVIEWS.quotes.map((r) => (
          <figure
            key={r.author}
            className="flex flex-col gap-4 rounded-md border border-line bg-surface p-6"
          >
            <Stars className="h-3.5 w-3.5" />
            <blockquote className="font-body text-base leading-relaxed text-queso-black">
              &ldquo;{r.text}&rdquo;
            </blockquote>
            <figcaption className="mt-auto font-body text-sm font-bold uppercase tracking-wide text-ink-soft">
              {r.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
