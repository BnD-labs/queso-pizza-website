import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages static export (client decision, 2026-07-14).
  // No server routes exist by design — all 4 pages prerender static.
  output: "export",
  // Static hosts have no runtime image optimizer; sources were downscaled
  // in place during the Phase 5 QC pass, so shipping them as-is is fine.
  images: { unoptimized: true },
  // Emit folder/index.html pages so any static host resolves clean URLs.
  trailingSlash: true,
};

export default nextConfig;
