import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = process.env.REPO_NAME ?? "";

const nextConfig: NextConfig = {
  turbopack: {},
  output: "export",
  // Set basePath to /repo-name when deploying to GitHub Pages project site.
  // Leave empty ("") when deploying to a custom domain or user/org root site.
  basePath: isProd && repoName ? `/${repoName}` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
