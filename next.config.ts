import path from "node:path";
import type { NextConfig } from "next";
import createBundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  // Cache Components (stable in Next.js 16): enables the `"use cache"` directive
  // and makes Partial Prerendering (PPR) the default rendering model. See
  // CLAUDE.md "Framework notes" before touching data fetching or caching code.
  cacheComponents: true,

  // Pin the workspace root: a lockfile in a parent directory (outside this repo)
  // otherwise makes Turbopack infer the wrong root.
  turbopack: {
    root: path.join(__dirname),
  },

  images: {
    // Populate as storage/CDN providers are wired up per-feature (e.g. Cloudflare R2 custom domain).
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
