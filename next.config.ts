import path from "path";
import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";
const basePath = isGhPages ? "/solve-trend" : "";

const nextConfig: NextConfig = {
  // Parent folder also has a package-lock.json; without this Turbopack treats
  // the whole solveCursor directory as the workspace and spawns runaway workers.
  turbopack: {
    root: path.join(__dirname),
  },
  ...(isGhPages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: isGhPages
      ? "https://pdas11165.github.io/solve-trend"
      : "https://solvetrend.com",
  },
  images: {
    unoptimized: isGhPages,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
    ],
  },
};

export default nextConfig;
