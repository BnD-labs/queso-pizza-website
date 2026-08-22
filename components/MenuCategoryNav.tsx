import { MENU_CATEGORIES } from "@/lib/menu-content";

/*
 * Sticky category jump bar for /menu.
 *
 * md and up ONLY, deliberately. On a 390px frame this would be a third fixed
 * element competing with TopAppBar and the sticky BottomNavBar — which already
 * runs an IntersectionObserver handover with the order panel. Three bars around
 * one column of cards is how a phone screen stops being usable. Mobile keeps
 * the existing jump pills in the page intro instead.
 *
 * top-16 matches the app bar's height (layout pads the shell by pt-16).
 * Server component: plain anchors, no scroll-spy, no JS shipped.
 */
export function MenuCategoryNav() {
  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-16 z-30 -mx-5 hidden border-b border-line bg-queso-cream/95 px-5 backdrop-blur-sm md:block"
    >
      <ul className="mx-auto flex max-w-7xl gap-2 py-3">
        {MENU_CATEGORIES.map((cat) => (
          <li key={cat.id}>
            <a
              href={`#${cat.id}`}
              className="block rounded-full border border-line px-4 py-2 font-body text-xs font-bold uppercase tracking-wide text-queso-black transition-colors duration-[var(--dur-base)] hover:border-queso-red hover:bg-queso-red hover:text-queso-cream"
            >
              {cat.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
