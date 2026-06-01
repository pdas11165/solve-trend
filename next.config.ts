import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Parent folder also has a package-lock.json; without this Turbopack treats
  // the whole solveCursor directory as the workspace and spawns runaway workers.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

export default nextConfig;
