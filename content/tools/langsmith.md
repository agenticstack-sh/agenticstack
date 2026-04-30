---
name: LangSmith
slug: langsmith
category: observability
type: cloud
website: https://smith.langchain.com
pricing: freemium
pricing_tiers:
  - "Free (5k traces)"
  - "$39/seat/mo Plus"
  - "Custom Enterprise"
open_source: false
self_hosted: false
sdk_languages: [python, javascript, typescript]
frameworks: [langchain]
agent_features:
  llm_tracing: true
  cost_tracking: true
  evaluation: true
  prompt_management: true
  real_time_monitoring: true
compliance: [soc2, gdpr]
best_for: "Deep tracing and evaluation for LangChain-based agents — tightest integration with the LangChain ecosystem"
limitations: "Heavily coupled to LangChain; no self-hosted option; closed-source; less useful if you're not using LangChain"
verified_by: editorial
last_verified: 2026-04-28
source_urls:
  docs: https://docs.smith.langchain.com
  pricing: https://www.langchain.com/pricing
---

# LangSmith

LangSmith is LangChain's proprietary observability and evaluation platform. If you're building agents with LangChain or LangGraph, LangSmith provides the deepest tracing integration available — every chain step, tool call, and LLM invocation is captured automatically.

The evaluation suite lets you build test datasets, run agents against them, and score outputs with custom or LLM-based evaluators. The tradeoff is tight coupling to the LangChain ecosystem — if you move away from LangChain, LangSmith becomes significantly less useful.
