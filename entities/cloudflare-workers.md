---
title: Cloudflare Workers
category: entities
tags: [cloudflare, workers, serverless, edge-computing]
summary: Cloudflare Workers is a serverless execution environment that runs JavaScript/WASM at the edge across 330+ cities.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# Cloudflare Workers

Workers is Cloudflare's serverless compute platform. Code runs on V8 isolates at Cloudflare's edge locations, responding to HTTP requests or scheduled events.

## Key Features

- Sub-millisecond cold starts (V8 isolates vs containers)
- 100+ cloudflare.com/languages) including JavaScript, TypeScript, Rust, C, C++
- **Workers KV** — Global low-latency key-value storage
- **Durable Objects** — Stateful, coordinated compute for real-time apps
- **Queues** — Message queuing and async processing
- **Cron Triggers** — Scheduled invocation
- **Smart Placement** — Optimizes where Workers run based on origin and user location

## Pricing

- **Free plan** — 100K requests/day
- **Paid plan** — $0.30/million requests, $0.15/million CPU-seconds

## Related

- [[skills/deploy-worker]] — How to deploy a Worker
- [[concepts/edge-computing]] — Edge computing concepts
- [[entities/cloudflare-kv]] — KV storage
- [[entities/cloudflare-d1]] — SQL database
