import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

// Emitted as a static robots.txt at build time (output: "export").
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `https://${SITE.domain}/sitemap.xml`,
  };
}
