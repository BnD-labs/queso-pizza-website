import type { Metadata } from "next";
import { Epilogue, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site-config";
import { TopAppBar } from "@/components/TopAppBar";
import { Footer } from "@/components/Footer";
import { BottomNavBar } from "@/components/BottomNavBar";

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

export const metadata: Metadata = {
  title: `${SITE.name} — ${SITE.tagline.replace(/\.$/, "")}`,
  description: `Premium wood-fired pizza and shawarma in ${SITE.address.area}, ${SITE.address.city}. Order on WhatsApp or call to confirm.`,
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
        <TopAppBar />
        <div className="flex flex-1 flex-col pb-20 pt-16">
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </div>
        <BottomNavBar />
      </body>
    </html>
  );
}
