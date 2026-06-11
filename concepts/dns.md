---
title: Domain Name System
category: concepts
tags: [cloudflare, dns, networking]
summary: The Domain Name System translates human-readable domain names to IP addresses. Cloudflare provides authoritative DNS resolution.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# Domain Name System

DNS translates domain names (like example.com) into IP addresses. Cloudflare runs one of the world's fastest and most resilient authoritative DNS services.

## Key Ideas

- Cloudflare is the #1 managed DNS provider by market share
- **Authoritative DNS** — Cloudflare acts as the authoritative nameserver for your domain
- **DNS filtering** — 1.1.1.1 offers public DNS resolution with privacy guarantees
- DNSSEC support for cryptographic verification of DNS records

## Record Types

- **A/AAAA** — Map domain to IPv4/IPv6 address
- **CNAME** — Alias one domain to another
- **MX** — Mail exchange records
- **TXT** — Text records for verification (SPF, DKIM, DMARC)
- **SRV** — Service location records

## Related

- [[skills/configure-dns]] — Managing DNS records
- [[concepts/ddos-protection]] — DNS-based DDoS mitigation
- [[entities/cloudflare]] — Platform overview
