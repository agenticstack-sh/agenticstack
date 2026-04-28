---
name: Cloudflare
slug: cloudflare
category: hosting
type: cloud
website: https://www.cloudflare.com
pricing: freemium
pricing_tiers:
  - "Free (Workers: 100k requests/day)"
  - "$5/mo Workers Paid"
  - "$25/mo Pro"
  - "Custom Enterprise"
open_source: false
self_hosted: false
sdk_languages: [javascript, typescript, python, rust]
frameworks: [langchain, llamaindex]
agent_features:
  serverless: true
  containers: false
  edge_compute: true
  ai_tooling: true
  mcp_hosting: true
compliance: [soc2, gdpr, pci-dss, iso27001]
best_for: "Edge computing with Workers AI and MCP server hosting — lowest latency for globally distributed agent workloads"
limitations: "Workers runtime has compatibility limitations vs. Node.js; vendor lock-in on Cloudflare-specific APIs (KV, D1, R2); debugging edge functions is harder than traditional server-side"
verified_by: editorial
last_verified: 2026-04-28
source_urls:
  docs: https://developers.cloudflare.com
  pricing: https://www.cloudflare.com/plans
---

# Cloudflare

Cloudflare has expanded from CDN and DNS into a full edge computing platform. Workers run JavaScript/TypeScript at the edge globally, and Workers AI provides on-edge LLM inference. Cloudflare also ships first-party support for hosting MCP servers on Workers.

For agent developers, the edge runtime means low-latency tool execution anywhere in the world. The MCP server hosting support is a differentiator — you can deploy MCP-compatible tool servers on Cloudflare Workers with built-in OAuth. The tradeoff is that the Workers runtime isn't fully Node.js-compatible, so some npm packages won't work.
