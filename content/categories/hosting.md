---
category: hosting
title: "Hosting & Deployment"
description: "Hosting platforms and edge networks for deploying AI agent applications"
tools: [vercel, cloudflare, netlify, railway, fly-io]
feature_definitions:
  serverless: "Serverless function execution with auto-scaling"
  containers: "Run persistent containers or Docker images"
  edge_compute: "Execute code at the edge, close to users globally"
  ai_tooling: "Built-in AI/LLM inference or AI-specific SDK"
  mcp_hosting: "First-party support for deploying MCP servers"
---

# Hosting & Deployment

Where you deploy your AI agent application affects latency, cost, runtime constraints, and what kinds of workloads you can run. The platforms in this category range from serverless-first (Vercel, Netlify) to container-based (Railway, Fly.io) to edge-native (Cloudflare).

The key architectural decision is whether your agent workload fits a serverless model or needs persistent compute. Serverless is great for request-response patterns — a user sends a message, the agent processes it, returns a response. But agents that run long tasks, maintain WebSocket connections, or do background processing often hit serverless timeout limits.

**What to consider:**

- **Runtime model** — serverless functions (Vercel, Netlify, Cloudflare Workers) have execution time limits, typically 10-60 seconds on free tiers. Container platforms (Railway, Fly.io) run persistent processes with no timeout. If your agent needs to run multi-step tasks that take minutes, serverless won't work without breaking the task into smaller chunks.
- **AI-specific tooling** — Vercel ships the Vercel AI SDK with built-in streaming, tool calling, and structured output. Cloudflare has Workers AI for on-edge inference. The others are runtime-agnostic — they'll host your agent but don't provide AI-specific primitives.
- **Edge vs. origin** — Cloudflare Workers and Vercel Edge Functions run code at the edge (close to users). Railway and Fly.io run containers in specific regions (Fly can distribute globally). Edge is better for latency-sensitive interactions; origin is simpler to reason about.
- **MCP server hosting** — Cloudflare has first-party support for deploying MCP servers on Workers with built-in OAuth. Other platforms can host MCP servers but require manual setup.
- **Cost model** — serverless platforms charge per invocation (cheap at low volume, unpredictable at scale). Container platforms charge per compute-hour (predictable, but you pay even when idle). AWS/GCP are notably absent from this list — they're infrastructure, not deployment platforms in the same sense.

For most AI agent apps, start with whichever platform matches your framework. Next.js on Vercel is the path of least resistance. Python agents that need persistent processes fit better on Railway or Fly.io. Cloudflare is the play if you need global edge compute or MCP server hosting.
