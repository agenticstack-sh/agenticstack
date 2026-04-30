---
name: WordPress
slug: wordpress
category: cms
type: hybrid
website: https://wordpress.org
pricing: open-source
pricing_tiers:
  - "Free (self-hosted)"
  - "WordPress.com from $4/mo"
  - "WordPress VIP custom pricing"
open_source: true
self_hosted: true
sdk_languages: [python, javascript, php, ruby]
frameworks: [langchain]
agent_features:
  rest_api: true
  graphql_api: true
  real_time: false
  content_versioning: true
  webhooks: true
compliance: [gdpr]
best_for: "The largest CMS ecosystem — massive plugin library, REST API for headless use, and the widest hosting options"
limitations: "PHP-based architecture; REST API is verbose and less modern than headless-native alternatives; security requires ongoing maintenance; performance depends heavily on hosting and plugins"
verified_by: editorial
last_verified: 2026-04-28
source_urls:
  docs: https://developer.wordpress.org/rest-api
  pricing: https://wordpress.com/pricing
---

# WordPress

WordPress powers over 40% of the web. For AI agent developers, its relevance is the REST API — WordPress can be used as a headless CMS, exposing content via a standard JSON API that agents can read from and write to.

The ecosystem advantage is unmatched: thousands of plugins, widespread hosting support, and a developer community larger than any alternative. The tradeoff is that WordPress wasn't designed as a headless CMS, so the API can feel bolted-on compared to purpose-built alternatives like Sanity or Payload.
