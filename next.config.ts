import type { NextConfig } from "next";

// GITHUB_REPOSITORY is automatically set by GitHub Actions (e.g. "dfegarido/atwave-clone").
// Locally it is undefined, so basePath stays "" and the dev server works normally.
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const basePath = repo ? `/${repo}` : "";

const nextConfig: NextConfig = {
  turbopack: {},
  output: "export",
  basePath,
  // assetPrefix must match basePath so CSS/JS/font URLs are correct on GitHub Pages.
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
  // Expose basePath to client components so raw <video> / <img> tags can prefix paths.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
