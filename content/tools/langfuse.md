---
name: Langfuse
slug: langfuse
category: observability
type: hybrid
website: https://langfuse.com
pricing: freemium
pricing_tiers:
  - "Free (self-hosted)"
  - "Free cloud (50k observations)"
  - "$59/mo Pro"
  - "Custom Enterprise"
open_source: true
self_hosted: true
sdk_languages: [python, javascript, typescript]
frameworks: [langchain, llamaindex, vercel-ai, openai-agents]
agent_features:
  llm_tracing: true
  cost_tracking: true
  evaluation: true
  prompt_management: true
  real_time_monitoring: true
compliance: [soc2, gdpr]
best_for: "Open-source LLM tracing, prompt management, and evaluation — self-hostable with broad framework support"
limitations: "Smaller ecosystem than Datadog; self-hosted requires Postgres + ClickHouse; evaluation features are still maturing"
verified_by: editorial
last_verified: 2026-04-28
source_urls:
  docs: https://langfuse.com/docs
  pricing: https://langfuse.com/pricing
  changelog: https://langfuse.com/changelog
---

# Langfuse

Langfuse is an open-source observability platform built specifically for LLM applications. It provides tracing, prompt management, evaluation, and dataset curation — all focused on the AI agent development lifecycle.

Its decorator-based Python SDK and JS integration make it straightforward to add tracing to LangChain, LlamaIndex, Vercel AI, and OpenAI agent workflows. The self-hosted option (MIT license) is a major differentiator for teams with data residency requirements.
