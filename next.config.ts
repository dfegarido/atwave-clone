import type { NextConfig } from "next";

// NEXT_PUBLIC_BASE_PATH is set in the GitHub Actions workflow to "/atwave-clone".
// Locally it is unset so dev server works with no subpath.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  turbopack: {},
  output: "export",
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
