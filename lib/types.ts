export interface AgentFeatures {
  agent_sdk: boolean | null;
  token_delegation: boolean | null;
  human_in_the_loop: boolean | null;
  fga: boolean | null;
  mcp_support: boolean | null;
  async_authorization: boolean | null;
}

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
  best_for: string;
  limitations: string;
  verified_by: "editorial" | "community" | "vendor";
  last_verified: string;
  source_urls: SourceUrls;
}

export interface CategoryFrontmatter {
  category: string;
  title: string;
  description: string;
  tools: string[];
}

export interface ComparisonFrontmatter {
  title: string;
  slug: string;
  tools: [string, string];
  category: string;
  last_verified: string;
  verdict: string;
}

export interface ParsedContent<T> {
  frontmatter: T;
  body: string;
}
