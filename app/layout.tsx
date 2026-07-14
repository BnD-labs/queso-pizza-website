import type { Metadata } from "next";
import { Epilogue, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site-config";
import { TopAppBar } from "@/components/TopAppBar";
import { Footer } from "@/components/Footer";
import { BottomNavBar } from "@/components/BottomNavBar";
import { OrderProvider } from "@/components/order/OrderProvider";

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
const SITE_DESCRIPTION = `Premium wood-fired pizza and shawarma in ${SITE.address.area}, ${SITE.address.city}. Order on WhatsApp or call to confirm.`;

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
        alt: "Wood-fired Queso Pizza fresh from the oven",
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
      className={`${epilogue.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
