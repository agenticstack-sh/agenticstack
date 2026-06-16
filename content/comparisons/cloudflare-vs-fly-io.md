---
title: "Cloudflare vs Fly.io"
slug: cloudflare-vs-fly-io
tools: [cloudflare, fly-io]
category: hosting-deployment
last_verified: 2026-05-09
---

Cloudflare and Fly.io both offer compute beyond traditional serverless but take different approaches. Cloudflare provides edge-native Workers, Durable Objects with an Agents SDK, and serverless GPU inference. Fly.io provides Firecracker microVMs with full Linux environments, private networking, and persistent volumes. Cloudflare wins on MCP hosting and AI inference. Fly.io wins on VM flexibility, networking, and multi-region control.

## Where Cloudflare wins

* **Agents SDK with native MCP hosting and managed agent state.** Cloudflare's Agents SDK deploys agents as Durable Objects. Each gets its own SQLite database, WebSocket connections, scheduled alarms, and MCP tool-call surface. The SDK handles state persistence, tool discovery, and real-time communication without custom infrastructure. Fly.io can host an MCP server as a persistent Machine (microVM) with public endpoints, but offers no agent-specific SDK, no managed state layer, and no built-in MCP tooling. Developers implement the MCP server, manage state in external databases, and configure service discovery via `.internal` DNS.

* **Workers AI with serverless GPU inference and AI Gateway.** Workers AI provides 78 open-source models on serverless GPUs: embeddings, text generation, classification—callable within the same Worker with no infrastructure management. AI Gateway adds caching, monitoring, rate limiting, and model fallback. Fly.io's GPU Machines (A10, L40S, A100) deprecate after August 1, 2026. Agents on Fly.io needing inference must use external providers after that date.

* **Zero-config global edge distribution.** Workers execute across Cloudflare's global edge network automatically. Durable Objects migrate to the region closest to callers. No replica configuration needed. Fly.io supports multi-region deployment but requires explicit Machine provisioning per region and manual replica management via `fly machine` commands or `fly.toml`.

## Where Fly.io wins

* **Firecracker microVMs with full Linux, no timeout, subsecond start.** Fly Machines are full microVMs running any Docker image with complete Linux environments: no runtime restrictions, no CPU time limits, no execution caps. Machines start and stop in subseconds, support auto-start on incoming requests, and auto-stop when idle. Agent orchestrators run indefinitely as persistent Machines. Cloudflare Workers cap at 5 minutes CPU time. Durable Objects and Containers extend this but provide no full Linux VM with unrestricted execution.

* **Private 6PN networking with .internal DNS, TCP/UDP, and WireGuard.** Fly.io provides a private IPv6 network (6PN) across all Machines in an organization with automatic `.internal` DNS resolution, TCP and UDP support, and WireGuard tunnels. Agent architectures—orchestrator, multiple MCP tool servers, Postgres, Redis—communicate over the private network using standard DNS names. Cloudflare's service bindings connect Workers without network hops, but Durable Objects and Containers have limited inter-service communication. No equivalent `.internal` DNS for arbitrary service discovery.

* **Persistent volumes with managed Postgres.** Fly.io volumes provide persistent NVMe storage attached to Machines, surviving restarts and deployments. Managed Postgres runs as Fly Machines with automated replication. Agents store vector indexes, model weights, or large datasets on local volumes with no network hop. Cloudflare's storage options (KV, D1, R2, Durable Objects) serve the Workers model, not general-purpose persistent filesystems.

## The agentic difference

Cloudflare provides a managed agent deployment platform: the Agents SDK handles MCP hosting, state persistence, WebSocket communication, and scheduling on Durable Objects, with Workers AI providing co-located GPU inference. This is higher-abstraction—agents deploy as SDK classes with declarative state and tool configuration.

Fly.io provides infrastructure primitives: microVMs with full Linux, private networking, persistent volumes, and managed databases. This is lower-abstraction—agents deploy as Docker containers on VMs, and developers own the agent framework, state management, and tool-server infrastructure. The critical gap is GPU: Fly.io's GPU Machine deprecation after August 2026 removes co-located inference as an option.

## When to pick which

* **Pick Cloudflare** when the agent benefits from the Agents SDK's managed MCP hosting, needs co-located GPU inference via Workers AI, and fits the Durable Objects model—event-driven, stateful, WebSocket-connected agents not needing full Linux.

* **Pick Fly.io** when the agent needs full Linux microVMs with unrestricted execution, private networking with TCP/UDP and `.internal` DNS across services, persistent volumes for vector stores or model weights, or managed Postgres—and handles GPU inference via external providers.
