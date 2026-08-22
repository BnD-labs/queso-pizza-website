// lib/reviews.ts
// SINGLE SOURCE OF TRUTH for customer reviews.
//
// Every value here was read off Queso Pizza's live Google Business Profile on
// 2026-08-21 (screenshots supplied by Brandon). Nothing is paraphrased,
// summarised, rounded or invented — this file exists precisely because
// CLAUDE.md bans fabricated reviews and ratings, and the old build shipped a
// "SARAH M., GOOGLE REVIEWS" quote that nobody ever said.
//
// RULES FOR EDITING:
// - Quote text is verbatim, including the author's own punctuation and emoji.
// - Only reviews whose full text is legible in the source are listed. Two of
//   the four (Mumbi Chibamba, Ethel Lungu) rated 5 stars but their text was not
//   readable in the capture — they count towards the aggregate, which is what
//   Google itself reports, but they are not quoted.
// - `count` is Google's own review count, not the number of quotes below.
//   Showing the rating without the count would flatter it; both or neither.
// - No dates. The capture showed relative ages ("5 weeks ago") and converting
//   those to absolute dates would be inventing precision we do not have.

export type Review = {
  /** Reviewer's display name exactly as it appears on the profile. */
  author: string;
  /** Star rating out of 5. */
  rating: number;
  /** Verbatim review text. Never edit for length or tone. */
  text: string;
};

export const REVIEWS = {
  /** Google's aggregate. Both values are reported by Google, not computed here. */
  ratingValue: 5.0,
  count: 4,
  source: "Google Business Profile",

  /**
   * Only the reviews with legible full text. See the rules above before adding.
   */
  quotes: [
    {
      author: "Jaden Bunda",
      rating: 5,
      text:
        "Ordered the pizza and shawarma from Queso Pizza last week and honestly " +
        "haven't stopped thinking about it. The pizza was packed with flavour, " +
        "the crust had the perfect bite, and the shawarma was generous and well " +
        "seasoned – you can tell the ingredients are fresh. Service was quick " +
        "too. Definitely one of the best spots in Chongwe right now, will be " +
        "ordering again soon",
    },
    {
      author: "Arthur Chipolomoka",
      rating: 5,
      text: "Best Shawarma in Chongwe",
    },
  ] satisfies Review[],
} as const;

/** "5.0" — one decimal, matching how Google itself renders it. */
export const RATING_DISPLAY = REVIEWS.ratingValue.toFixed(1);
