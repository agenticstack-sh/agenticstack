---
title: "Langfuse vs LangSmith"
slug: langfuse-vs-langsmith
tools: [langfuse, langsmith]
category: observability
last_verified: 2026-05-09
verdict: langfuse
---

Langfuse and LangSmith are the two most complete LLM observability platforms for agent systems. Both provide deep tracing, evaluation, prompt management, and cost tracking. They are closer in capability than any other pairing in this category. The verdict turns on open-source self-hosting, framework neutrality, and pricing transparency. LangSmith wins on evaluation depth and LangChain-native integration.

## Where Langfuse wins

* **Open-source with free self-hosting.** Langfuse is fully open-source (MIT license for core, with open-source self-hosting) and self-hostable via Docker Compose or Kubernetes at no cost. All agent traces—including prompts, completions, and evaluation scores containing sensitive data—stay within the organization's infrastructure with no vendor dependency. LangSmith offers self-hosted and hybrid deployment options. It is not open-source. Self-hosted LangSmith requires a commercial license. For teams that need data sovereignty without a vendor contract, Langfuse's open-source model is the differentiator.

* **Framework-neutral with 90+ integrations and OpenTelemetry support.** Langfuse integrates with 90+ frameworks and providers: LangChain, LlamaIndex, OpenAI, Anthropic, Vercel AI SDK, LiteLLM, CrewAI, Haystack, and more. Python and JavaScript SDKs. OpenTelemetry support for vendor-independent instrumentation. LangSmith supports LangChain, LangGraph, OpenAI, Anthropic, CrewAI, Vercel AI SDK, and Pydantic AI. LangSmith's deepest auto-instrumentation is for LangChain and LangGraph—the frameworks built by the same team. Langfuse provides equivalent depth across a broader range of frameworks without favoring any single ecosystem.

* **Transparent usage-based pricing.** Langfuse's pricing is publicly documented: free tier at 50k units/month, paid tiers starting at $29/month with $8/100k units and graduated volume discounts. Self-hosted is free. LangSmith's pricing tiers (Developer, Plus, Enterprise) are documented. Exact per-trace pricing for Plus and Enterprise tiers requires contacting sales. For teams that need cost predictability before committing, Langfuse's published pricing is easier to evaluate.

## Where LangSmith wins

* **Deepest evaluation with pairwise comparison, online monitoring, and dataset workflows.** LangSmith provides four evaluator types: LLM-as-judge, code-based rules, human review, and pairwise comparison. Pairwise comparison—testing two agent versions against the same dataset and evaluating which performs better—is a workflow LangSmith supports natively. Online evaluation runs on production traces with sampling rate controls. Failing traces automatically route back into datasets for regression testing. Langfuse provides LLM-as-judge, human annotation queues, custom scorers, datasets, and experiments. Both platforms support production-trace evaluation. LangSmith's pairwise comparison, automatic trace-to-dataset routing, and multi-turn thread evaluation add depth that Langfuse's evaluation system does not match.

* **LangChain and LangGraph auto-instrumentation depth.** For teams building on LangChain and LangGraph, LangSmith provides the deepest integration—built by the same team, with every chain, agent, tool, and retrieval step auto-instrumented at the highest granularity. Run trees show every internal decision in a LangGraph state machine. Langfuse integrates with LangChain via callback handler. It captures the same high-level trace structure. LangSmith's same-team integration captures implementation-level details that a callback-based integration may not surface.

* **MCP integration and agent deployment.** LangSmith provides MCP integration for Claude, VSCode, and other tools—enabling agent development workflows that span IDE and observability platform. LangSmith also offers agent deployment (Agent Servers) and a visual agent design tool (Fleet), extending beyond observability into the deployment layer. Langfuse is observability-focused and does not provide agent deployment or MCP integration.

## The agentic difference

Both platforms address the core agent observability workflow: trace, evaluate, iterate on prompts, deploy. The practical difference for most teams comes down to two factors:

* **Open-source and self-hosting:** Langfuse's open-source, free self-hosting model gives teams full data control without a vendor contract. LangSmith's self-hosted option requires a commercial license. For regulated industries (healthcare, finance, government), this distinction determines which platform is viable.

* **Ecosystem alignment:** LangSmith is deepest for LangChain/LangGraph-based agent systems and extends into agent deployment. Langfuse is framework-neutral across a broader integration surface. Teams locked into the LangChain ecosystem get the most from LangSmith. Teams using mixed frameworks or prioritizing vendor independence get more from Langfuse.

## When to pick which

* **Pick Langfuse** when the team needs open-source self-hosting for data sovereignty, uses a diverse set of agent frameworks (LlamaIndex, Vercel AI SDK, LiteLLM, CrewAI alongside LangChain), or needs transparent published pricing without a sales process.

* **Pick LangSmith** when the agent system is built on LangChain or LangGraph and benefits from same-team integration depth, when pairwise evaluation and automatic trace-to-dataset routing are required workflows, or when agent deployment (Agent Servers) is needed alongside observability — and self-hosted licensing is acceptable.
