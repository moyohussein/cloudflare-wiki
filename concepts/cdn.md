---
title: Content Delivery Network
category: concepts
tags: [cloudflare, cdn, performance, caching]
summary: A content delivery network distributes content across geographically dispersed servers to reduce latency and improve availability.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# Content Delivery Network

A CDN is a distributed network of servers that delivers web content to users based on their geographic location. Cloudflare operates one of the largest CDNs, spanning 330+ cities in 120+ countries.

## Key Ideas

- CDNs cache static content (images, CSS, JS) at edge servers closer to users
- Cloudflare's CDN also accelerates dynamic content through intelligent routing (Argo Smart Routing)
- Automatic SSL/TLS termination at the edge improves performance and security
- Cache rules are configurable via Cache Rules, Page Rules, or Cloudflare Workers

## Cloudflare-specific

- Cloudflare's CDN acts as a reverse proxy — all traffic passes through before reaching the origin
- **Cache Reserve** extends caching to persistent storage (R2) for long-term caching
- **Argo Smart Routing** finds the fastest path between Cloudflare edge and the origin
- **Tiered Cache** reduces origin load by grouping edge nodes into tiers

## Related

- [[concepts/ssl-tls]] — Encryption at the edge
- [[skills/optimize-caching]] — Tuning cache behavior
- [[entities/cloudflare]] — Platform overview
