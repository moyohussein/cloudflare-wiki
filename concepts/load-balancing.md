---
title: Load Balancing
category: concepts
tags: [cloudflare, load-balancing, availability, traffic]
summary: Cloudflare Load Balancing distributes traffic across multiple origins for high availability and performance.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# Load Balancing

Cloudflare Load Balancing distributes incoming traffic across multiple origin servers, with automatic failover and health monitoring.

## Key Ideas

- **Origin pools** — Groups of servers with health checks
- **Load balancer** — Distributes traffic across pools based on steering policy
- **Health checks** — HTTP, HTTPS, or TCP monitors per pool
- **Steering modes:** Standard (weighted), Geo (geographic), Dynamic (performance), Proximity (latency)

## Related

- [[entities/cloudflare]] — Platform overview
- [[concepts/cdn]] — Content delivery
