---
title: WAF Custom Rules
category: skills
tags: [cloudflare, security, waf, rules]
summary: Writing custom WAF rules to protect applications from threats and unwanted traffic.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# WAF Custom Rules

Creating custom WAF rules in Cloudflare to filter malicious traffic.

## Rule Structure

```text
Field = Value AND/OR Field = Value → Action
```

## Common Rules

```text
# Block known bot IPs
(ip.src eq 192.0.2.0/24) → block

# Rate limit login endpoints
(http.request.uri.path eq "/login") → rate_limit(threshold=20, period=60)

# Challenge traffic from high-risk countries
(cf.geo.country in {"T1" "T2"}) → managed_challenge
```

## Rule Actions

- **Block** — Deny the request
- **Challenge** — JS challenge (CAPTCHA)
- **Managed Challenge** — Adaptive challenge (JS, CAPTCHA, or none)
- **Log** — Record but allow (Enterprise)
- **Skip** — Skip remaining WAF rules

## Related

- [[concepts/ddos-protection]] — DDoS mitigation
- [[concepts/zero-trust]] — Security concepts
