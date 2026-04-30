export type AgentFeatures = Record<string, boolean | null>;

export interface SourceUrls {
  changelog?: string;
  pricing?: string;
  docs?: string;
  [key: string]: string | undefined;
}

export interface ToolFrontmatter {
  name: string;
  slug: string;
  category: string;
  type: "cloud" | "self-hosted" | "hybrid";
  website: string;
  pricing: "free" | "freemium" | "paid" | "open-source";
  open_source: boolean;
  self_hosted: boolean;
  sdk_languages: string[];
  frameworks: string[];
  agent_features: AgentFeatures;
  compliance: string[];
  pricing_tiers: string[];
  best_for: string;
  limitations: string;
  verified_by: "editorial" | "community" | "vendor";
  last_verified: string;
  source_urls: SourceUrls;
}

export interface FeatureDefinitions {
  [key: string]: string;
}

export interface CategoryFrontmatter {
  category: string;
  title: string;
  description: string;
  tools: string[];
  feature_definitions?: FeatureDefinitions;
}

export interface ComparisonFrontmatter {
  title: string;
  slug: string;
  tools: [string, string];
  category: string;
  last_verified: string;
  verdict: string;
  popular?: boolean;
}

export interface ParsedContent<T> {
  frontmatter: T;
  body: string;
}
