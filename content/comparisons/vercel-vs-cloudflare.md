---
title: "Cloudflare vs Vercel"
slug: cloudflare-vs-vercel
tools: [cloudflare, vercel]
category: hosting-deployment
last_verified: 2026-05-09
verdict: Cloudflare
---

Cloudflare and Vercel both offer serverless compute with edge execution. They differ on persistent state, MCP server hosting, and AI inference. Cloudflare wins on execution model, MCP hosting, and GPU inference. Vercel wins on AI SDK experience and function duration.

## Where Cloudflare wins

* **Agents SDK with MCP server hosting on Durable Objects.** Cloudflare's Agents SDK deploys stateful AI agents as Durable Objects. Each agent gets its own SQLite database, WebSocket connections, and scheduled alarms. The SDK exposes agent methods as MCP tool-call endpoints. Orchestrators discover and invoke tools via SSE or WebSocket. Durable Objects persist state across restarts, so conversation memory and tool results survive without external storage. Vercel has no persistent compute primitive. Vercel Functions are request-scoped and stateless. MCP servers need an external always-on process since functions terminate after responding (max 800s on Pro).

* **Workers AI with 78 open-source models on serverless GPUs.** Workers AI runs inference on Cloudflare's serverless GPU infrastructure with 78 open-source models: text generation, embeddings, image classification, object detection. AI Gateway adds monitoring, caching, rate limiting, and model fallback. Agents needing embeddings or classification can call Workers AI within the same Worker—no external API hop. Vercel has no native inference. Vercel's AI marketplace connects to external providers (OpenAI, Groq, xAI, fal, Replicate) via environment variables. Every model call routes to a third-party service.

* **Durable Objects and Containers for persistent agent compute.** Durable Objects provide transactional storage co-located with compute. Each object is a stateful micro-server coordinating multiple WebSocket connections, running scheduled alarms, and maintaining state indefinitely. Cloudflare Containers (GA) run Docker images with full filesystem access, multiple CPU cores, and configurable idle timeouts. Vercel's compute is entirely request-scoped: functions execute and terminate with no persistent process, no Docker support, and only 500 MB `/tmp` scratch space.

## Where Vercel wins

* **800-second function duration with Fluid Compute concurrency.** Vercel Functions reach 800 seconds (13 minutes) on Pro and Enterprise, with Fluid Compute letting multiple invocations share one function instance. This reduces cold starts and lowers cost for I/O-bound agent workloads like parallel LLM API calls. Cloudflare Workers cap at 5 minutes CPU time. Wall-clock time is unlimited while the client connects, but CPU-intensive reasoning chains hit the 5-minute limit. Durable Objects alarms extend this but reset the CPU clock each invocation.

* **AI SDK and model provider marketplace.** Vercel's AI SDK offers a unified TypeScript interface for streaming chat completions, tool calls, and structured output across providers: OpenAI, Anthropic, Google, xAI, Groq, Together AI. The Vercel Marketplace provisions provider accounts directly and injects API keys as environment variables. This reduces integration work for agents building on external LLM APIs. Cloudflare's Agents SDK integrates with Workers AI and supports OpenAI, Anthropic, and Gemini, but offers no marketplace for provisioning third-party accounts.

## The agentic difference

Cloudflare's Agents SDK with Durable Objects deploys agents as persistent, addressable processes with their own database, WebSocket connections, scheduling, and MCP tool surface. This is the primitive agent architectures need—a process outliving a single request, maintaining state, and exposing tools. Vercel's Fluid Compute improves serverless concurrency but keeps functions stateless and request-scoped, terminating when responses complete. Deploying an MCP server, stateful agent loop, or long-running planning chain on Vercel requires external infrastructure.

Workers AI with co-located GPU inference and AI Gateway separates Cloudflare for agents needing embeddings, classification, or small model inference, eliminating the external API round-trip Vercel's marketplace requires for every model call.

## When to pick which

* **Pick Cloudflare** when the agent needs persistent stateful processes (MCP tool servers, conversation-state agents, multi-step planning), co-located AI inference, or native MCP hosting—and the team works within Workers' 5-minute CPU limit or uses Durable Objects and Containers for longer workloads.

* **Pick Vercel** when the agent is stateless, calls external LLM APIs (OpenAI, Anthropic), needs no persistent process state, and the team benefits from the AI SDK, model provider marketplace, and 800-second duration for long-running chains.
