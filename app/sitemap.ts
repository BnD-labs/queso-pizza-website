import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";

// Emitted as a static sitemap.xml at build time (output: "export").
// trailingSlash: true, so every URL here must end in "/" to match what ships.
export const dynamic = "force-static";

const BASE = `https://${SITE.domain}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${BASE}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/menu/`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about/`, lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE}/contact/`, lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];
}
