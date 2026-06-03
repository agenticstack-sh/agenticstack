---
name: Helicone
slug: helicone
category: observability
type: hybrid
website: https://helicone.ai
pricing: freemium
pricing_tiers:
  - "Free (100k requests)"
  - "$20/mo Growth"
  - "Custom Enterprise"
open_source: true
self_hosted: true
sdk_languages: [python, javascript, typescript]
frameworks: [langchain, llamaindex, vercel-ai, openai-agents]
agent_features:
  llm_tracing: true
  cost_tracking: true
  evaluation: false
  prompt_management: false
  real_time_monitoring: true
compliance: [soc2, gdpr]
best_for: "Lightweight LLM proxy with cost tracking, caching, and rate limiting — minimal integration effort"
limitations: "Proxy-based architecture adds a network hop; less deep tracing than Langfuse; evaluation features are basic"
verified_by: editorial
last_verified: 2026-04-28
source_urls:
  docs: https://docs.helicone.ai
  pricing: https://helicone.ai/pricing
---

# Helicone

Helicone is an open-source LLM observability platform that works as a proxy layer between your application and LLM providers. It logs every request, tracks cost and latency, and provides caching and rate limiting out of the box.

The proxy approach means integration is as simple as changing a base URL — no SDK changes required. For teams that want quick visibility into LLM usage and costs without deep instrumentation, Helicone is a pragmatic starting point.
