---
name: Netlify
slug: netlify
category: hosting
type: cloud
website: https://www.netlify.com
pricing: freemium
pricing_tiers:
  - "Free (100GB bandwidth)"
  - "$19/user/mo Pro"
  - "Custom Enterprise"
open_source: false
self_hosted: false
sdk_languages: [javascript, typescript, go]
frameworks: []
agent_features:
  serverless: true
  containers: false
  edge_compute: true
  ai_tooling: false
  mcp_hosting: false
compliance: [soc2, gdpr]
best_for: "Git-based deploys with serverless functions — strong for static sites and Jamstack apps with AI features"
limitations: "Serverless functions have execution time limits; less AI-specific tooling than Vercel; Next.js support lags behind Vercel; bandwidth overage costs add up"
verified_by: editorial
last_verified: 2026-04-28
source_urls:
  docs: https://docs.netlify.com
  pricing: https://www.netlify.com/pricing
---

# Netlify

Netlify pioneered the Jamstack deployment workflow — git push to deploy, automatic previews on PRs, and serverless functions for backend logic. It supports most frontend frameworks and provides edge functions for low-latency compute.

For AI agent apps, Netlify is a solid deployment target when your stack isn't Next.js-specific. The serverless functions can host API endpoints that wrap agent logic, though they have execution time limits that may be tight for long-running agent tasks.
