import { PIZZAS, SHAWARMA, FRIES, type PizzaSize } from "@/lib/menu-data";
import { ITEM_DESCRIPTIONS } from "@/lib/menu-content";
import { SITE, MAPS_SEARCH_URL } from "@/lib/site-config";

/*
 * schema.org Restaurant + Menu markup.
 *
 * Every value is derived from lib/site-config.ts and lib/menu-data.ts, which
 * are the two sources of truth. Nothing here is authored.
 *
 * Deliberately ABSENT, and they must stay absent:
 *   - aggregateRating / review — the five stars on the homepage are a design
 *     placeholder with no real rating behind them. Restating that to Google as
 *     structured data turns a placeholder into a claim, and it is the same
 *     fabrication the constitution bans for review text.
 *   - geo — no one has confirmed coordinates. hasMap points at the plus code,
 *     which is the honest version of the same information.
 *   - the address landmark — still UNCONFIRMED in site-config.
 */

const BASE = `https://${SITE.domain}`;
const SIZES: PizzaSize[] = ["S", "M", "L", "XL"];
const SIZE_NAMES: Record<PizzaSize, string> = {
  S: "Small",
  M: "Medium",
  L: "Large",
  XL: "Extra Large",
};

const CURRENCY = "ZMW";

const flatPrices = [...SHAWARMA, ...FRIES].map((i) => i.price);
const pizzaPrices = PIZZAS.flatMap((p) => SIZES.map((s) => p.prices[s]));
const allPrices = [...flatPrices, ...pizzaPrices];

function offer(price: number, name?: string) {
  return {
    "@type": "Offer",
    ...(name ? { name } : {}),
    price,
    priceCurrency: CURRENCY,
    availability: "https://schema.org/InStock",
  };
}

function menuItem(
  id: string,
  name: string,
  offers: ReturnType<typeof offer>[],
) {
  const description = ITEM_DESCRIPTIONS[id];
  return {
    "@type": "MenuItem",
    name,
    ...(description ? { description } : {}),
    offers,
  };
}

const HOURS = [
  {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    ...SITE.hours.weekdays,
  },
  { dayOfWeek: ["Saturday", "Sunday"], ...SITE.hours.weekend },
].map((row) => ({
  "@type": "OpeningHoursSpecification",
  dayOfWeek: row.dayOfWeek,
  opens: row.open,
  closes: row.close,
}));

const RESTAURANT = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "@id": `${BASE}/#restaurant`,
  name: SITE.name,
  slogan: SITE.tagline,
  url: `${BASE}/`,
  image: [`${BASE}/images/pizza-cheese-pull.jpeg`],
  telephone: SITE.phones.delivery1,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.road,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    addressCountry: SITE.address.country,
  },
  hasMap: MAPS_SEARCH_URL,
  servesCuisine: ["Pizza", "Shawarma", "Fast Food"],
  priceRange: `K${Math.min(...allPrices)}–K${Math.max(...allPrices)}`,
  currenciesAccepted: CURRENCY,
  openingHoursSpecification: HOURS,
  // Ordering runs through WhatsApp with a confirming phone call — there is no
  // checkout URL to point an OrderAction at.
  acceptsReservations: false,
  hasMenu: {
    "@type": "Menu",
    "@id": `${BASE}/menu/#menu`,
    url: `${BASE}/menu/`,
    inLanguage: "en",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Pizza",
        hasMenuItem: PIZZAS.map((p) =>
          menuItem(
            p.id,
            p.name,
            SIZES.map((s) => offer(p.prices[s], SIZE_NAMES[s])),
          ),
        ),
      },
      {
        "@type": "MenuSection",
        name: "Shawarma",
        hasMenuItem: SHAWARMA.map((i) => menuItem(i.id, i.name, [offer(i.price)])),
      },
      {
        "@type": "MenuSection",
        name: "Fries",
        hasMenuItem: FRIES.map((i) => menuItem(i.id, i.name, [offer(i.price)])),
      },
    ],
  },
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so a menu item name can never break out of the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(RESTAURANT).replace(/</g, "\u003c"),
      }}
    />
  );
}
