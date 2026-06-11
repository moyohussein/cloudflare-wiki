---
title: Zero Trust
category: concepts
tags: [cloudflare, security, zero-trust, networking]
summary: Zero Trust is a security model that requires continuous verification of every access request, regardless of where it originates.
created: 2026-06-11T00:00:00Z
updated: 2026-06-11T00:00:00Z
---

# Zero Trust

Zero Trust is a security framework built on "never trust, always verify." Cloudflare Zero Trust replaces traditional VPNs with identity-aware access controls at the edge.

## Key Ideas

- **Cloudflare Zero Trust** (formerly Cloudflare for Teams) has three components:
  - **Cloudflare Access** — Identity-aware proxy for internal applications
  - **Cloudflare Gateway** — Secure web gateway with DNS filtering
  - **Cloudflare Tunnel** — Secure outbound-only connections to origins
- No inbound firewall ports needed with Cloudflare Tunnel
- Integrates with any identity provider (Okta, Azure AD, Google Workspace)

## Principles

- Verify every request (not just the first one)
- Least-privilege access by default
- Inspect and log all traffic
- Assume breach — segment and monitor continuously

## Related

- [[entities/cloudflare-zero-trust]] — Product details
- [[synthesis/zero-trust-architecture]] — Architecture patterns
- [[concepts/ddos-protection]] — Complementary security layer
