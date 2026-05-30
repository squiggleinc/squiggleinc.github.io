import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // User Pages site (squiggleinc.github.io) serves at domain root → no basePath.
  trailingSlash: true,
};

export default nextConfig;
