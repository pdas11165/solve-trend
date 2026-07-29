// Shared SEO helpers — single source of truth for canonical/OG resolution
// across every page's generateMetadata / static metadata export.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://solvetrend.com";
export const SITE_NAME = "Solve Trend";

/** Resolves a site-relative path to an absolute URL under the canonical domain. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
