const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agenticstack.sh";

/** Safely serialize JSON-LD for embedding in a <script> tag. */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AgenticStack",
    url: siteUrl,
    description:
      "Compare tools for AI agent developers. Structured, editorially maintained data designed for both human developers and AI coding agents.",
  };
}

export function toolJsonLd(tool: {
  name: string;
  slug: string;
  category: string;
  website: string;
  best_for: string;
  pricing: string;
}) {
  const isFree = tool.pricing === "free" || tool.pricing === "open-source";
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    url: `${siteUrl}/tools/${tool.slug}`,
    applicationCategory: tool.category,
    description: tool.best_for,
    ...(isFree
      ? {
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }
      : {}),
  };
}

export function comparisonJsonLd(comparison: {
  title: string;
  slug: string;
  tools: [string, string];
  last_verified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: comparison.title,
    url: `${siteUrl}/compare/${comparison.slug}`,
    dateModified: comparison.last_verified,
    about: comparison.tools.map((t) => ({
      "@type": "SoftwareApplication",
      name: t,
    })),
  };
}

export function collectionPageJsonLd(collection: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.name,
    description: collection.description,
    url: `${siteUrl}${collection.url}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: collection.items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: `${siteUrl}${item.url}`,
      })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  };
}
