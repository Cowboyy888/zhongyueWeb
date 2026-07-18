import type { MetadataRoute } from "next";
import { SITE, PAGES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  return Object.values(PAGES).map((page) => ({
    url: `${base}${page.path}`,
    lastModified: new Date(page.lastmod),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));
}
