---
title: DDoS Protection
category: concepts
tags: [cloudflare, security, ddos, mitigation]
summary: Distributed denial-of-service protection absorbs and mitigates volumetric attacks at the network edge before they reach the origin.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# DDoS Protection

DDoS attacks attempt to overwhelm a target with traffic. Cloudflare's globally distributed network absorbs attacks at the edge, scrubbing malicious traffic before it reaches the origin.

## Key Ideas

- Cloudflare's network capacity (248+ Tbps) absorbs the largest attacks
- **L3/L4 mitigation** — Network-layer attacks (SYN floods, UDP amplification) filtered at the edge
- **L7 mitigation** — Application-layer attacks filtered via WAF, rate limiting, and behavioral analysis
- **Always-on vs on-demand** — Proactive detection vs reactive activation
- **Advanced DDoS** — Machine learning models adapt to attack patterns in real-time

## Cloudflare-specific

- Included free on all plans for L3/L4 attacks
- Advanced DDoS (L7) available on Pro plans and above
- **DDoS Alerts** — Real-time notifications for ongoing attacks
- **Rate Limiting** — Per-URI thresholds for application-layer protection

## Related

- [[skills/waf-rules]] — WAF custom rules
- [[concepts/zero-trust]] — Security beyond DDoS
- [[entities/cloudflare]] — Platform overview
