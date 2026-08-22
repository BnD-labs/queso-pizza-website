import type { Metadata } from "next";
import { Epilogue, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/lib/site-config";
import { TopAppBar } from "@/components/TopAppBar";
import { Footer } from "@/components/Footer";
import { BottomNavBar } from "@/components/BottomNavBar";
import { StructuredData } from "@/components/StructuredData";
import { OrderProvider } from "@/components/order/OrderProvider";

/**
 * Comix Loud — Queso's brand display face, supplied by Brandon 2026-08-21.
 *
 * Converted from the 33 KB TTF to an 11.8 KB WOFF2 (64% smaller); the original
 * is kept in assets-source/ so the conversion can be redone.
 *
 * LICENSING — VERIFY BEFORE LAUNCH. The file's own embedded name table says
 * "Copyright © Imagex 2013" and, under the license field, **"Free for personal
 * use."** Queso Pizza is a commercial business, so a personal-use grant does
 * not cover this site. Either the client holds a separate commercial licence
 * from Imagex, or one needs buying. See the note in CLAUDE.md.
 *
 * Epilogue stays as the fallback rather than a generic sans: Comix Loud maps
 * only 178 characters, so anything outside basic Latin falls through to it, and
 * it is what shipped until now.
 */
const comixLoud = localFont({
  src: "./fonts/comix-loud.woff2",
  variable: "--font-comix",
  display: "swap",
  weight: "400",
  // Metric overrides keep the swap from Epilogue to Comix Loud from shifting
  // layout — without these the fallback and the real face set at different
  // effective sizes and headings jump when the font lands.
  adjustFontFallback: false,
  fallback: ["Epilogue", "system-ui", "sans-serif"],
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const SITE_TITLE = `${SITE.name} — ${SITE.tagline.replace(/\.$/, "")}`;
const SITE_DESCRIPTION = `Premium oven-baked pizza and shawarma in ${SITE.address.area}, ${SITE.address.city}. Order on WhatsApp or call to confirm.`;

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: SITE_TITLE,
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_ZM",
    images: [
      {
        // Real photography only — the hero shot doubles as the OG card.
        url: "/images/pizza-cheese-pull.jpeg",
        width: 2000,
        height: 1493,
        alt: "A Queso Pizza fresh from the oven, with a melted cheese pull",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/pizza-cheese-pull.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${comixLoud.variable} ${epilogue.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StructuredData />
        <OrderProvider>
          <TopAppBar />
          <div className="flex flex-1 flex-col pb-20 pt-16">
            <main className="flex flex-1 flex-col">{children}</main>
            <Footer />
          </div>
          <BottomNavBar />
        </OrderProvider>
      </body>
    </html>
  );
}
