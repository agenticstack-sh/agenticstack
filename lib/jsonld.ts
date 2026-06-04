const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agenticstack.sh";

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
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    url: `${siteUrl}/tools/${tool.slug}`,
    applicationCategory: tool.category,
    description: tool.best_for,
    offers: {
      "@type": "Offer",
      price: tool.pricing === "free" || tool.pricing === "open-source" ? "0" : undefined,
      priceCurrency: "USD",
      category: tool.pricing,
    },
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
