import { getAllTools, getAllCategories, getAllComparisons } from "@/lib/markdown";
import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agenticstack.sh";

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getAllTools().map((t) => ({
    url: `${siteUrl}/tools/${t.slug}`,
    lastModified: t.last_verified,
  }));

  const categories = getAllCategories().map((c) => ({
    url: `${siteUrl}/categories/${c.category}`,
  }));

  const comparisons = getAllComparisons().map((c) => ({
    url: `${siteUrl}/compare/${c.slug}`,
    lastModified: c.last_verified,
  }));

  return [
    { url: siteUrl },
    { url: `${siteUrl}/compare` },
    ...categories,
    ...tools,
    ...comparisons,
  ];
}
