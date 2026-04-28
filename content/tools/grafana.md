---
name: Grafana
slug: grafana
category: observability
type: hybrid
website: https://grafana.com
pricing: freemium
pricing_tiers:
  - "Free (self-hosted OSS)"
  - "Free cloud (10k metrics)"
  - "$29/mo Pro"
  - "Custom Enterprise"
open_source: true
self_hosted: true
sdk_languages: [python, javascript, go, java]
frameworks: []
agent_features:
  llm_tracing: false
  cost_tracking: false
  evaluation: false
  prompt_management: false
  real_time_monitoring: true
compliance: [soc2, hipaa, gdpr]
best_for: "Infrastructure dashboards and alerting — best paired with Prometheus/Loki/Tempo for a fully open-source observability stack"
limitations: "No native LLM tracing; requires additional tooling (Langfuse, OpenTelemetry) for AI-specific observability; steep learning curve for the full LGTM stack"
verified_by: editorial
last_verified: 2026-04-28
source_urls:
  docs: https://grafana.com/docs
  pricing: https://grafana.com/pricing
---

# Grafana

Grafana is the dominant open-source dashboarding and visualization platform. It doesn't provide LLM-specific tracing natively, but it's the go-to choice for infrastructure observability — metrics, logs, and traces via the Prometheus/Loki/Tempo stack (often called LGTM).

For AI agent teams, Grafana is typically used alongside a dedicated LLM observability tool. It handles the infrastructure layer (container metrics, API latency, error rates) while something like Langfuse handles the LLM-specific tracing.
