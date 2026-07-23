/**
 * Prefixes a local (leading-slash) asset path with the deploy base path so it
 * resolves under GitHub Pages' `/solve-trend` subpath. Plain <img>/<video>
 * tags — and even next/image with `unoptimized` — do NOT get the basePath
 * applied automatically, so any local asset referenced by string must go
 * through here.
 *
 * No-op in local dev (base is "") and for absolute URLs (http…, data:) which
 * are returned untouched.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}

/**
 * Prefixes an internal route path (e.g. "/blog") with the deploy base path,
 * for plain <a> tags that — unlike next/link — don't get the basePath applied
 * automatically. Do NOT use this on same-page hash links ("/#services"):
 * those are matched verbatim by the nav scroll-spy selector and handled by the
 * Lenis anchor intercept, so they must stay unprefixed.
 */
export function route(path: string): string {
  return asset(path);
}
