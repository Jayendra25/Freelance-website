import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

const baseUrl = siteConfig.url.replace(/\/$/, "");

/**
 * Kept free of build timestamps so the route stays fully static. Add a
 * `lastModified` only when it reflects a real content change (e.g. a CMS date).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
