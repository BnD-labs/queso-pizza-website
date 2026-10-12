import Script from "next/script";

/**
 * GA4 tag — added 2026-10-12 at handover.
 *
 * The Measurement ID comes from NEXT_PUBLIC_GA_ID (set in Vercel → Project →
 * Environment Variables). With the variable unset the component renders
 * nothing, so local builds and previews stay untracked.
 *
 * WhatsApp order taps are wa.me links, which GA4's Enhanced Measurement logs
 * as outbound clicks — no custom event code is needed for the core conversion.
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export function GoogleAnalytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
