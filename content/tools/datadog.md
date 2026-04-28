---
name: Datadog
slug: datadog
category: observability
type: cloud
website: https://www.datadoghq.com
pricing: paid
pricing_tiers:
  - "Free tier (5 hosts)"
  - "$15/host/mo Infrastructure"
  - "$31/host/mo APM"
  - "Custom Enterprise"
open_source: false
self_hosted: false
sdk_languages: [python, javascript, go, java, ruby, csharp, php]
frameworks: [langchain, openai-agents]
agent_features:
  llm_tracing: true
  cost_tracking: true
  evaluation: false
  prompt_management: false
  real_time_monitoring: true
compliance: [soc2, hipaa, gdpr, pci-dss, iso27001]
best_for: "Full-stack observability at scale — infrastructure, APM, logs, and LLM tracing in one platform"
limitations: "Expensive at scale; LLM observability is newer and less mature than dedicated tools like Langfuse; vendor lock-in on proprietary data format"
verified_by: editorial
last_verified: 2026-04-28
source_urls:
  docs: https://docs.datadoghq.com
  pricing: https://www.datadoghq.com/pricing
---

# Datadog

Datadog is a comprehensive cloud monitoring and observability platform. For AI agent developers, it offers LLM Observability as an extension of its existing APM product — tracing LLM calls, token usage, latency, and error rates alongside traditional infrastructure metrics.

The main advantage is consolidation: if your team already uses Datadog for infra and APM, adding LLM tracing means one fewer vendor. The tradeoff is that its LLM-specific features are less deep than purpose-built tools like Langfuse or Langsmith.
