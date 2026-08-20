import { MAPS_EMBED_URL, SITE } from "@/lib/site-config";

// Keyless Google Maps iframe centered on the plus code. The grayscale/invert
// filter approximates the design's dark map treatment (a styled Maps JS map
// would need an API key — out of scope for a static site).
export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md border border-line ${className}`}
    >
      <iframe
        src={MAPS_EMBED_URL}
        title={`Map — ${SITE.name}, ${SITE.address.area}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-full w-full border-0 grayscale invert-[0.92] hue-rotate-180"
      />
    </div>
  );
}
