import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Static routes for now. As indexable feature routes ship (e.g. public share
 * pages, collections), append them here — or generate them from the DB via
 * `generateSitemaps` once volume warrants splitting into multiple sitemaps.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
