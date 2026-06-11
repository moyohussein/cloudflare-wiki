---
title: Edge Computing
category: concepts
tags: [cloudflare, workers, edge, serverless]
summary: Edge computing runs code close to users at Cloudflare's global network locations, reducing latency and improving performance.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# Edge Computing

Edge computing shifts computation from centralized data centers to geographically distributed edge nodes. Cloudflare Workers executes code across 330+ cities.

## Key Ideas

- **Cloudflare Workers** — Serverless functions running on V8 isolates at the edge
- Sub-millisecond cold starts (V8 isolates vs containers)
- Workers run on every request, or can be scheduled via Cron Triggers
- **Durable Objects** — Stateful, coordinated compute for real-time applications
- Workers KV, R2, D1, and Queues provide storage primitives at the edge

## Related

- [[entities/cloudflare-workers]] — Workers platform
- [[entities/cloudflare-kv]] — KV storage
- [[entities/cloudflare-d1]] — SQL database at the edge
- [[skills/deploy-worker]] — Deploying a Worker
