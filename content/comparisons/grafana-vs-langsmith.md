---
title: "Grafana vs LangSmith"
slug: grafana-vs-langsmith
tools: [grafana, langsmith]
category: observability
last_verified: 2026-05-09
verdict: LangSmith
---

Grafana and LangSmith serve different observability roles. LangSmith is built for LLM application tracing, evaluation, and prompt engineering. Grafana is a general-purpose observability platform with no LLM-specific features. LangSmith wins on all three agentic dimensions.

## Where LangSmith wins

* **Deep agent chain tracing with auto-instrumentation and run trees.** LangSmith captures nested run trees showing the full agent execution path: orchestrator decisions, tool calls, retrieval steps, and LLM calls with inputs, outputs, token counts, and latency. Auto-instrumentation for LangChain, LangGraph, OpenAI, Anthropic, CrewAI, Vercel AI SDK, and Pydantic AI provides trace capture without manual annotation. Traces can be filtered, exported, shared, and compared. Grafana can ingest OpenTelemetry traces via Tempo. It has no LLM-specific trace visualization, no auto-instrumentation for agent frameworks, and no pre-built views for prompts, completions, or run trees. Building equivalent agent chain visibility requires custom instrumentation and custom dashboards.

* **Comprehensive evaluation with offline experiments, online monitoring, and human review.** LangSmith provides LLM-as-judge, code-based rules, human review, and pairwise comparison evaluators. Offline evaluation runs against datasets with configurable repetitions. Online evaluation monitors production traces in real-time. Multi-turn conversation evaluation captures dialogue quality. Failing traces route back into datasets for regression testing. Grafana has no evaluation capability—assessing whether an agent's output is correct, relevant, or safe is outside its scope.

* **Prompt engineering with versioning, playground, and deployment.** LangSmith provides prompt versioning, a collaborative playground for testing, and deployable prompt artifacts. Prompts are testable against datasets before production deployment. Grafana has no prompt management features.

## Where Grafana wins

* **Fully self-hostable open-source infrastructure monitoring stack.** Grafana's LGTM stack is entirely open-source with no feature restrictions on self-hosted deployments—free and vendor-independent. LangSmith offers self-hosted deployment. It is not open-source and requires a commercial license. For organizations that require fully open-source, vendor-independent infrastructure, Grafana satisfies that requirement where LangSmith does not.

* **Infrastructure-level observability for agent deployments.** Grafana provides host metrics, container monitoring, database performance, network traces, and log aggregation. When an agent's latency spikes, Grafana can correlate with CPU saturation, memory pressure, or database query slowdowns. LangSmith traces agent logic. It has no visibility into the infrastructure running it. Production agent systems need both layers: LangSmith for agent behavior and Grafana for infrastructure health.

## The agentic difference

LangSmith provides the complete agent development and operations workflow: trace agent runs, evaluate output quality, iterate on prompts, run experiments against datasets, monitor production quality, and deploy improvements. Grafana provides infrastructure monitoring that complements but does not replace LLM-specific observability.

Building LangSmith-equivalent capabilities in Grafana would require implementing custom instrumentation for every agent framework, building a custom evaluation engine, developing prompt management tooling, and creating agent-specific dashboards. The two tools are complementary for production agent systems, not alternatives.

## When to pick which

* **Pick LangSmith** when the team needs agent chain tracing, evaluation pipelines, prompt management, and dataset-driven experiments — the core agent observability and improvement workflow.

* **Pick Grafana** when the primary requirement is infrastructure monitoring for the systems running agents (host metrics, container logs, database performance), or when a fully open-source, self-hostable, vendor-independent observability stack is a hard requirement — and LLM-specific observability is handled by a dedicated tool.
