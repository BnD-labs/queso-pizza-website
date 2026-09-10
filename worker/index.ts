// worker/index.ts
//
// The maintenance switch. Everything this Worker does is decided by one
// variable, MAINTENANCE, declared in wrangler.jsonc:
//
//   "off" (or anything else) -> pass the request straight through to the
//                               static export, byte for byte
//   "on"                     -> serve public/maintenance.html with a 503
//
// WHY 503 AND NOT A 200 MAINTENANCE PAGE OR A 404.
// A 503 with Retry-After is the only status that tells a crawler "this is
// temporary, keep what you know about this site". A 200 tells Google the
// maintenance notice IS the page and invites it to replace the real content in
// the index with it; a 404 tells Google the pages are gone. Both cost real
// ranking on a site whose whole job is being found locally.
//
// This is also why the site cannot simply be undeployed for maintenance. The
// custom domains for quesopizza.com and www are bound to this Worker, the
// domain sits on Cloudflare Registrar inside the client's account, and
// re-binding is not something to attempt under time pressure. See
// PHASE-6-LAUNCH.md.

interface Env {
  /** Set in wrangler.jsonc. Only the exact string "on" enables maintenance. */
  MAINTENANCE?: string;
  /**
   * The static export in out/, bound by `assets.binding` in wrangler.jsonc.
   *
   * Requests made through this binding still get `html_handling` and
   * `not_found_handling` applied, so the pass-through below preserves the
   * "404-page" behaviour and the trailing-slash resolution exactly as an
   * assets-only Worker served them.
   */
  ASSETS: { fetch(input: Request | URL | string): Promise<Response> };
}

// NO ".html" — and this is a trap worth knowing about. `assets.html_handling`
// defaults to "auto-trailing-slash", which serves individual HTML files at
// their extensionless path and 307s "/maintenance.html" to "/maintenance".
// The assets binding applies that same handling to its own fetches, so asking
// it for "/maintenance.html" returns a redirect rather than the page — the
// body would be empty and the !page.ok fallback below would fire on every
// request. Verified against a local Worker, not assumed.
const MAINTENANCE_PAGE = "/maintenance";

/** An hour. Long enough not to hammer us, short enough that crawlers come back. */
const RETRY_AFTER_SECONDS = 3600;

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    // The overwhelmingly common path: maintenance off, one string comparison,
    // straight to the assets. Deliberately the first thing in the function.
    if (env.MAINTENANCE !== "on") {
      return env.ASSETS.fetch(request);
    }

    const page = await env.ASSETS.fetch(
      new URL(MAINTENANCE_PAGE, request.url),
    );

    const headers = new Headers({
      "content-type": "text/html; charset=utf-8",
      "retry-after": String(RETRY_AFTER_SECONDS),
      // Nothing about a 503 may be cached. Without this, Cloudflare's edge or a
      // customer's browser can hold the maintenance page after the site is back
      // and there is no way to tell them otherwise — the failure mode is a
      // customer who cannot order for hours after maintenance ended.
      "cache-control": "no-store, must-revalidate",
    });

    // If maintenance.html has gone missing, ASSETS returns the 404 page. Serve
    // something honest and still actionable rather than a 404 body under a 503.
    if (!page.ok) {
      return new Response(
        "Queso Pizza — the site is briefly down for maintenance. " +
          "The shop is open: order on WhatsApp at +260 97 6056 200.",
        { status: 503, headers: { ...Object.fromEntries(headers), "content-type": "text/plain; charset=utf-8" } },
      );
    }

    return new Response(page.body, { status: 503, headers });
  },
};

export default worker;
