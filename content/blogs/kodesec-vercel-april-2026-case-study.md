---
title: "Vercel April 2026 OAuth Supply Chain Breach"
date: "2026-04-25"
slug: "vercel-oauth-breach"
excerpt: "A deep technical case study of the Vercel OAuth supply chain breach."
author: "KodeSec Research Team"
---


# KodeSec Security Intelligence Report
## The Vercel April 2026 OAuth Supply Chain Breach: A Technical Case Study

---

**Classification:** TLP:WHITE — Unrestricted Distribution  
**Report ID:** KSR-2026-04-VERCEL  
**Published:** April 25, 2026  
**Authored by:** KodeSec Research Team  
**Website:** [kodesec.com](https://kodesec.com)

---

> *"A Roblox cheat brought down one of the biggest deployment platforms on the internet. Not a zero-day. Not a nation-state. A game cheat."*

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Incident Overview](#2-incident-overview)
3. [Attack Chain Analysis — Step-by-Step Deep Dive](#3-attack-chain-analysis)
4. [Technical Root Cause Analysis](#4-technical-root-cause-analysis)
5. [Threat Actor Profile and Claims](#5-threat-actor-profile-and-claims)
6. [Indicators of Compromise (IOCs)](#6-indicators-of-compromise)
7. [Timeline and Detection Gaps](#7-timeline-and-detection-gaps)
8. [Downstream Impact and Credential Fan-Out Risk](#8-downstream-impact-and-credential-fan-out-risk)
9. [MITRE ATT&CK Mapping](#9-mitre-attck-mapping)
10. [Remediation and Response](#10-remediation-and-response)
11. [Lessons Learned](#11-lessons-learned)
12. [Security Recommendations](#12-security-recommendations)
13. [KodeSec Expert Analysis](#13-kodesec-expert-analysis)
14. [References](#14-references)

---

## 1. Executive Summary

On April 19, 2026, Vercel — one of the world's most widely adopted cloud deployment platforms — publicly disclosed a security breach that exposed a subset of customer environment variables. The breach was not the result of a sophisticated zero-day exploit or nation-state tradecraft. It began with a Roblox game cheat script downloaded by an employee at Context.ai, a third-party AI analytics vendor, in approximately February 2026.

That single act of poor endpoint hygiene cascaded through an OAuth trust chain, through a Google Workspace account, through Vercel's internal control plane, and into customer environment variables containing database credentials, cloud access keys, payment processor tokens, and authentication secrets.

This report provides a comprehensive technical dissection of the incident, the underlying architectural decisions that amplified the breach's blast radius, the threat actor claims and their reliability, detection gaps that allowed a nearly two-month dwell time, and the structural remediation steps that organizations must take — not just on Vercel, but across every PaaS and SaaS platform in their stack.

**Key findings from the KodeSec investigation:**

- The attack exploited a trusted OAuth relationship, a vector that bypasses multi-factor authentication, password rotation, and most perimeter controls entirely.
- Vercel's default environment variable sensitivity model left developer credentials stored in a state accessible to any party with internal backend access, a design flaw the company has since corrected by defaulting all new variables to the "Sensitive" state.
- At least one credential was flagged by an external provider (OpenAI) as compromised nine days before Vercel's public disclosure, raising material questions about detection-to-notification latency.
- Vercel CEO Guillermo Rauch publicly attributed the attacker's velocity to AI augmentation, marking one of the highest-profile on-record CEO assessments of AI-accelerated adversary tradecraft.
- The incident follows a documented pattern of platform-level breaches — Codecov (2021), CircleCI (2023), Snowflake (2024) — in which trusted vendor relationships become the primary attack vector.

**Severity Assessment:** High  
**Customer Impact:** Confirmed limited subset; exact number undisclosed  
**Dwell Time:** Approximately two months (February 2026 to April 2026)

---

## 2. Incident Overview

| Field | Detail |
|-------|--------|
| Date of Disclosure | April 19, 2026 |
| Attack Classification | OAuth Supply Chain Attack |
| Initial Access Vector | Lumma Stealer malware infection at third-party vendor (Context.ai) |
| Pivot Point | Compromised Google Workspace OAuth token |
| Primary Impact | Non-sensitive environment variable enumeration and decryption |
| Threat Actor Claim | ShinyHunters-affiliated actor (disputed by known group members) |
| Ransom Demand | USD $2 million (via Telegram, unverified) |
| CEO Confirmation | Guillermo Rauch, April 19, 2026 (X/Twitter thread) |
| Law Enforcement | Notified; Google Mandiant engaged |
| Open-Source Projects | Next.js, Turbopack confirmed unaffected |

Vercel operates as a foundational infrastructure layer for much of today’s web. Its platform runs serverless functions, handles CI/CD workflows, and stores environment variables that enable applications to authenticate with databases, cloud services, payment systems, and external APIs. This central role — positioned where deployment processes and sensitive credentials intersect across countless projects — is exactly what made it an attractive target.


The company's official security bulletin confirmed: "We've identified a security incident that involved unauthorized access to certain internal Vercel systems. We are actively investigating, and we have engaged incident response experts to help investigate and remediate."

Sources: [Vercel Security Bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident) | [BleepingComputer](https://www.bleepingcomputer.com/news/security/vercel-confirms-breach-as-hackers-claim-to-be-selling-stolen-data/) | [Guillermo Rauch, X](https://x.com/rauchg/status/2045995362499076169)

---

## 3. Attack Chain Analysis

The Vercel breach happened in five stages, following a pattern common in modern supply chain attacks. At each step, the attacker took advantage of trusted connections that were originally created for normal business use. This shows why OAuth-based supply chain attacks are hard to detect and stop with traditional security methods.


![Attack chain diagram showing progression from Context.ai OAuth compromise through Vercel employee Google Workspace account takeover to internal lateral movement and environment variable enumeration across multiple customer projects](image2.png)

*Figure 1: The Vercel breach attack chain. Orange represents the supply-chain entry point at Context.ai. Blue arrows indicate the attacker's path through Vercel's internal systems via compromised OAuth tokens. Red boxes denote attacker actions including environment variable enumeration. Grey boxes show the downstream customer impact across credential categories.*

---

### Stage 1: Initial Compromise — Lumma Stealer at Context.ai (T1199)

**When:** Approximately February 2026  
**Technique:** T1199 — Trusted Relationship  
**Verification Status:** Confirmed (Hudson Rock, CyberScoop, Context.ai bulletin)

A Context.ai employee downloaded what appeared to be a Roblox game exploit or cheat script on a device with access to corporate systems. The script delivered Lumma Stealer, a commodity infostealer malware available on underground markets that specializes in extracting session cookies, browser-stored credentials, OAuth tokens, and corporate authentication artifacts from infected endpoints.

Lumma Stealer did not need to break any encryption or exploit any vulnerability in Context.ai's systems. It simply harvested what was already present on the endpoint: active session tokens, saved credentials, and OAuth authorization artifacts that the employee's browser had accumulated through normal business use.

Context.ai operates the "AI Office Suite," a self-serve consumer product launched in June 2025 that integrates with Google Workspace accounts via broad OAuth permissions. Multiple Vercel employees had authorized this application, granting it access to their corporate Google accounts for the productivity features the tool offered.

The stolen material gave the attacker access to Context.ai's internal AWS environment, from which they could retrieve OAuth tokens belonging to the platform's enterprise users.

**What made this stage effective:** Lumma Stealer targets OAuth tokens specifically because they are more valuable than passwords. A password can be changed. An OAuth token, once issued, remains valid until it is explicitly revoked — and most organizations never audit or revoke OAuth grants from applications they authorized months or years ago.

Sources: [Context.ai Security Bulletin](https://context.ai) | [Trend Micro Research](https://www.trendmicro.com/en_us/research/26/d/vercel-breach-oauth-supply-chain.html) | [BleepingComputer](https://www.bleepingcomputer.com/news/security/vercel-confirms-breach-as-hackers-claim-to-be-selling-stolen-data/)

---

### Stage 2: Google Workspace Account Takeover (T1550.001)

**When:** March 2026  
**Technique:** T1550.001 — Application Access Token  
**Verification Status:** Confirmed (Vercel bulletin, Context.ai bulletin, Rauch statement)

Using the OAuth token harvested from Context.ai's compromised infrastructure, the attacker authenticated as a Vercel employee into their Google Workspace account. This required no password. No MFA bypass. The OAuth token was a standing authorization artifact — the digital equivalent of a signed key that opens a specific door regardless of whether the lock has been changed.

This Google Workspace account provided the attacker with:

- Access to the employee's corporate email, enabling reconnaissance of internal communications, credentials shared via email, and links to internal systems
- Google Drive access, potentially including engineering documentation, infrastructure runbooks, and shared credential stores
- Calendar visibility into meetings and linked video conference resources
- OAuth connectivity into any other service the employee had authenticated via their Google identity

The attacker's ability to move from a compromised OAuth token at a third-party vendor to full Google Workspace account access at Vercel without triggering a single authentication alert is the core demonstration of why OAuth supply chain attacks are categorically different from credential attacks.

Sources: [Vercel Security Bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident) | [Guillermo Rauch, X](https://x.com/rauchg/status/2045995362499076169)

---

### Stage 3: Lateral Movement into Vercel Internal Systems (T1078)

**When:** March to April 2026  
**Technique:** T1078 — Valid Accounts  
**Verification Status:** Confirmed (Vercel bulletin)

From the compromised Workspace account, the attacker "maneuvered through a series of escalating steps" into Vercel's internal systems and production environments. Rauch described this as "a series of maneuvers that escalated from our colleague's compromised Vercel Google Workspace account."

The precise lateral movement technique has not been publicly disclosed by Vercel. Plausible vectors — based on the confirmed starting point of a compromised Google Workspace identity — include:

- SSO/SAML federation, where the Workspace identity was the single sign-on source for internal Vercel tooling, granting the attacker authenticated access to internal dashboards and administrative interfaces
- Credential harvesting from the compromised email account, where internal passwords, API tokens, or infrastructure access credentials had been shared via email or stored in linked Google Drive files
- OAuth-connected internal tool pivot, where the compromised Workspace identity had existing authorized connections to internal platforms such as CI/CD dashboards, deployment consoles, or internal developer tools

The "in-depth understanding of Vercel" that Rauch noted — a characteristic he attributed in part to AI augmentation — became most apparent at this stage. The attacker navigated Vercel's internal API surface with a level of familiarity that suggested either prior reconnaissance, access to internal documentation obtained during the Workspace compromise, or AI-assisted contextual understanding of the platform's architecture.

Sources: [Vercel Security Bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident) | [Guillermo Rauch, X](https://x.com/rauchg/status/2045995362499076169)

---

### Stage 4: Environment Variable Enumeration and Decryption (T1552.001)

**When:** March to April 2026  
**Technique:** T1552.001 — Unsecured Credentials: Credentials in Files  
**Verification Status:** Confirmed (Vercel bulletin, Rauch statement)

Once inside Vercel's internal control plane with sufficient access privileges, the attacker enumerated customer project environment variables and decrypted those not marked as "Sensitive." The specific technical mechanism of how Vercel's internal backend decrypts non-sensitive variables is discussed in detail in Section 4. At this stage, it is sufficient to note that the attacker had access to the internal system capable of performing this decryption — and that most customer projects had not explicitly opted their variables into the more secure "Sensitive" state.

The attacker's enumeration pattern — querying across customer projects systematically — was the behavior most indicative of AI augmentation in Rauch's assessment. Manual enumeration of a platform the attacker had never interacted with before would typically be slower and more error-prone. The attacker reportedly moved through Vercel's API surface with "surprising velocity."

Sources: [Vercel Security Bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident) | [Guillermo Rauch, X](https://x.com/rauchg/status/2045995362499076169) | [Peter Girnus Analysis](https://webmatrices.com/post/how-a-roblox-cheat-and-one-ai-tool-brought-down-vercel-s-entire-platform)

---

### Stage 5: Downstream Credential Exploitation (T1078.004)

**When:** April 2026 (earliest confirmed: April 10)  
**Technique:** T1078.004 — Valid Accounts: Cloud Accounts  
**Verification Status:** Partially confirmed (single public report, OpenAI notification)

At least one of the exfiltrated credentials — an OpenAI API key — was detected in the wild by OpenAI's automated credential monitoring system, which notified the affected Vercel customer on April 10, 2026. This notification occurred nine days before Vercel's public disclosure.

This is the most operationally significant finding in the breach timeline. A credential stored exclusively within Vercel was detected as compromised by an external provider before Vercel had issued any public notification. The implications for detection-to-disclosure latency are explored in Section 7.

Sources: [BleepingComputer](https://www.bleepingcomputer.com/news/security/vercel-confirms-breach-as-hackers-claim-to-be-selling-stolen-data/) | [Peter Girnus Analysis](https://webmatrices.com/post/how-a-roblox-cheat-and-one-ai-tool-brought-down-vercel-s-entire-platform)

---

## 4. Technical Root Cause Analysis

The root cause of this breach's customer impact is not the OAuth compromise — that was the initial access vector. The root cause of why customer secrets were accessible to an attacker with internal backend access is Vercel's environment variable sensitivity model and its default configuration.

### How Vercel's Environment Variable System Works

Vercel projects store configuration and secrets as environment variables that are injected into serverless functions and build processes at deployment time. These variables have a "Sensitive" flag that controls the decryption pathway available to access the variable's value.

| Property | Default (Non-Sensitive) | Sensitive (Opt-In) |
|----------|------------------------|-------------------|
| Default state | ON for all variables | Must be explicitly enabled per variable |
| Visible in dashboard | Yes — value readable and copyable | Masked after initial entry |
| Editable in dashboard | Yes | Write-only; value cannot be retrieved after setting |
| Decrypted by | Vercel backend (internal systems) | Build-time process only |
| Accessible to attacker with internal access | Yes | No evidence of access |
| Changed post-breach | Now the new default | Unchanged |

*Table 1: Comparison of Vercel's environment variable sensitivity states at the time of the breach.*

### The Encryption Misconception

An important technical clarification is required here. Initial public commentary — including some early media coverage — characterized the breach as involving "plaintext" environment variables. This is inaccurate.

All Vercel environment variables are encrypted at rest. The "Sensitive" toggle does not enable or disable encryption. What it controls is the decryption pathway.

Non-sensitive variables are decrypted by Vercel's backend systems and are therefore readable through the dashboard interface, the API, and any internal system with appropriate backend access. An attacker who compromises Vercel's internal control plane — as occurred in this incident — can use the same backend decryption pathway that developers use when they view their variables in the dashboard.

Sensitive variables are decrypted only at build time, within a sandboxed process that is architecturally isolated from the internal dashboard backend. Once set, their values cannot be retrieved through any UI or API — only the deployed application running in the build environment can access them. These variables appear to have remained secure throughout this breach.

This is a crucial distinction because it reframes the design failure. Vercel did not store secrets in plaintext. Vercel stored secrets with two tiers of protection and defaulted every secret to the less-protected tier. The attacker exploited the decryption pathway that developers routinely use — not a separate attack-specific vulnerability.

### Why the Default Was Wrong

The security industry has a well-established principle: security controls should be secure by default and require explicit action to reduce security, not the reverse. Vercel's sensitivity model required developers to take an explicit action — finding and enabling the Sensitive toggle — on every individual environment variable they created, in order to achieve the protection that most developers would reasonably assume their secrets already had.

In practice, developers paste API keys, database passwords, and cloud credentials into text fields and click save. Hunting for a toggle that changes the decryption scope of an environment variable is not a workflow step that security training or documentation effectively instills at scale. The result was a platform where most customer secrets sat in the less-protected state by default.

Vercel has since corrected this by making "Sensitive" the default for all new environment variables. This is a meaningful improvement, but environment variables created before the change remain in the non-sensitive state unless manually toggled by the project owner.

Sources: [Vercel Security Bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident) | [Guillermo Rauch, X](https://x.com/rauchg/status/2045995362499076169) | [Article 3 — Technical Correction Analysis]

---

## 5. Threat Actor Profile and Claims

### Identity Claims

A threat actor posting on BreachForums claimed affiliation with the ShinyHunters group and alleged possession of data exfiltrated from Vercel. This claim warrants careful evaluation.

**Known ShinyHunters members have publicly denied involvement to BleepingComputer.** The ShinyHunters brand has been used by multiple, potentially unrelated actors since the group's original campaigns. Forum claims of group affiliation are frequently fabricated or appropriated to borrow reputational weight.

**Vercel's security bulletin does not reference the forum claims**, and Rauch's public statement addresses the attack chain without acknowledging the forum post directly. The confirmed attack chain does not require the scope of access claimed by the forum poster.

### Claimed Data

| Claimed Asset | Quantity / Detail | Verification Status |
|--------------|------------------|-------------------|
| Employee records | 580 records (names, emails, status, timestamps) | Unverified — not independently confirmed |
| Source code repositories | Not specified | Unverified |
| API keys and internal tokens | Not specified | Unverified |
| GitHub and NPM tokens | Not specified | Unverified |
| Internal communications | Not specified | Unverified |
| Linear workspace access | Claimed with screenshot as "proof" | Screenshot unconfirmed |
| Ransom demand | USD $2 million via Telegram | Unverified — Vercel has not confirmed negotiations |

*Table 2: Summary of threat actor claims and their verification status. All claims should be treated as unconfirmed absent independent verification.*

### Supply Chain Integrity

Rauch specifically addressed the highest-concern scenario for the developer community: "We've analyzed our supply chain, ensuring Next.js, Turbopack, and our many open source projects remain safe for our community." This has been independently supported by Vercel's collaboration with GitHub, Microsoft, npm, and Socket, who confirmed no npm packages published by Vercel were compromised.

Organizations using Next.js, Turbopack, or other Vercel open-source projects should continue monitoring package integrity signals — checksums, signing, and provenance attestations — as standard practice, but there is no confirmed basis for supply chain concern as of this report's publication date.

Sources: [BleepingComputer](https://www.bleepingcomputer.com/news/security/vercel-confirms-breach-as-hackers-claim-to-be-selling-stolen-data/) | [Peter Girnus Analysis](https://webmatrices.com/post/how-a-roblox-cheat-and-one-ai-tool-brought-down-vercel-s-entire-platform)

---

## 6. Indicators of Compromise

Organizations should immediately check for the following confirmed IOC across their Google Workspace and identity provider audit logs.

### Confirmed IOC

```
Type:     OAuth Application Client ID
Value:    110671459871-30f1spbu0hptbs60cb4vsmv79i7bbvqj.apps.googleusercontent.com
Context:  Compromised Context.ai "AI Office Suite" Google Workspace OAuth application
Action:   Immediate revocation if found in any Google Workspace OAuth authorization audit
Source:   Vercel Official Security Bulletin (April 19, 2026)
```

### How to Hunt for This IOC in Google Workspace

Google Workspace Administrators should navigate to:

```
Admin Console
  -> Reports
    -> Audit and Investigation
      -> OAuth Log Events

Filter: Application Name = "Context.ai"
     OR Client ID = 110671459871-30f1spbu0hptbs60cb4vsmv79i7bbvqj.apps.googleusercontent.com

Date range: February 2026 to present
```

Any hits should be treated as an immediate incident indicator requiring revocation and investigation. The IOC covers not only Vercel employees but potentially hundreds of other organizations whose employees authorized Context.ai's AI Office Suite product.

### Behavioral IOCs (Detection-Based)

The following behavioral patterns are consistent with the attack chain and should be investigated if observed in logs:

```
- OAuth token usage from IPs outside known corporate/vendor CIDR ranges
- Google Workspace account authenticating into internal tools from unfamiliar geolocations
- Bulk email search queries containing keywords: "API key", "secret", "token", "password", ".env"
- Anomalous Google Drive file access patterns (credential stores, infrastructure runbooks)
- Environment variable read/list API calls at volume inconsistent with normal deployment cadence
- Cloud provider (AWS/GCP/Azure) API calls from unexpected IP ranges using keys stored in Vercel
- Unsolicited leaked-credential notifications from OpenAI, Anthropic, GitHub, AWS, or Stripe
```

Sources: [Vercel Security Bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident) | [Peter Girnus Analysis](https://webmatrices.com/post/how-a-roblox-cheat-and-one-ai-tool-brought-down-vercel-s-entire-platform)

---

## 7. Timeline and Detection Gaps

The full incident timeline spans approximately two months from the initial malware infection to public disclosure. This section maps confirmed events against their verification status and analyzes the critical detection gaps the timeline reveals.

![Incident timeline showing progression from February 2026 Lumma Stealer infection through March 2026 AWS environment access and Google Workspace pivot, to April 10 OpenAI leaked key notification and April 19 public disclosure](image1.png)

*Figure 2: Incident timeline from initial Lumma Stealer infection at Context.ai (February 2026) through public disclosure (April 19, 2026). The April 10 OpenAI notification represents the earliest external evidence of active credential exploitation — nine days before Vercel's disclosure.*

| Date | Event | Verification Status |
|------|-------|-------------------|
| February 2026 | Context.ai employee infected with Lumma Stealer via Roblox cheat | Confirmed — Hudson Rock, CyberScoop, Context.ai bulletin |
| March 2026 | Attacker accesses Context.ai's AWS environment; exfiltrates OAuth tokens | Confirmed — Context.ai bulletin |
| March 2026 | Attacker uses OAuth token to access Vercel employee's Google Workspace | Confirmed — Vercel bulletin, Context.ai bulletin, Rauch statement |
| March–April 2026 | Lateral movement into Vercel internal systems; env var enumeration begins | Confirmed — Vercel bulletin |
| April 2026 | ShinyHunters-affiliated actor allegedly begins selling data on BreachForums | Unverified — threat actor claims only |
| April 10, 2026 | OpenAI notifies a Vercel customer of a leaked API key | Reported — single customer account on X |
| April 19, 2026 | Vercel publishes security bulletin; Rauch posts detailed thread on X | Confirmed |
| April 19–24, 2026 | Customer notifications, credential rotation guidance, dashboard changes deployed | Confirmed |

*Table 3: Key incident timeline events with verification status.*

### The Nine-Day Gap: Analyzing the Detection-to-Disclosure Anomaly

![Timeline showing nine-day gap between April 10 OpenAI notification of leaked API key and April 19 Vercel public disclosure](image3.png)

*Figure 3: The nine-day disclosure gap. A Vercel customer received an OpenAI leaked-key notification on April 10 — for an API key stored exclusively in Vercel. Vercel's public disclosure did not occur until April 19, creating a window during which other affected customers had no notification to act on.*

On April 10, 2026, a Vercel customer (Andrey Zagoruiko, via public reply to Rauch's X thread) reported receiving a leaked-key notification from OpenAI for an API key that — according to the customer — had never existed outside of Vercel's environment variable store.

OpenAI's automated credential detection operates by scanning public locations (code repositories, paste sites, public internet sources) where API keys should not appear. An OpenAI API key appearing in such a context — if it was stored only in Vercel — implies it traveled from Vercel's internal environment to an external location detectable by OpenAI's systems between the date of exfiltration and April 10.

This creates a nine-day window between the earliest confirmed external evidence of active credential exploitation and Vercel's public disclosure. It is important to note that this single public report is not forensic evidence. It should not be interpreted as proof that Vercel knew about the compromise on April 10. Multiple explanations for the gap are plausible — coordinated disclosure timing, ongoing forensic investigation, private customer notifications in progress, or the report itself being inaccurate. The public record does not resolve which applies.

However, the gap has concrete implications regardless of its cause:

**For affected customers:** The practical exposure window may have begun well before April 19. Credential rotation triggered by Vercel's April 19 disclosure is a minimum, not a definitive remediation. Organizations must audit service logs for the full period from February 2026 through April 2026.

**For regulatory compliance:** Under GDPR, the 72-hour breach notification obligation is triggered when a controller "becomes aware" of a breach. The April 10 date raises the question of organizational awareness — a question Vercel has not publicly addressed.

**For security operations:** Unsolicited leaked-credential notifications from providers such as OpenAI, GitHub, AWS, and Stripe are now primary early-warning signals for platform-level breaches. These notifications should be treated as high-priority incidents, not routine key hygiene alerts.

Sources: [Peter Girnus Analysis](https://webmatrices.com/post/how-a-roblox-cheat-and-one-ai-tool-brought-down-vercel-s-entire-platform) | [BleepingComputer](https://www.bleepingcomputer.com/news/security/vercel-confirms-breach-as-hackers-claim-to-be-selling-stolen-data/)

---

## 8. Downstream Impact and Credential Fan-Out Risk

"Credential fan-out" describes the cascade effect whereby a single platform breach translates into exposure across every downstream service authenticated by credentials stored on that platform. For Vercel, which sits at the deployment layer for tens of thousands of production applications, the fan-out potential is structurally significant.

A typical Vercel project contains between 10 and 30 environment variables. At organizational scale — a portfolio of 50 projects — this translates to 500 to 1,500 discrete credentials within the platform. Each exposed credential is an independent pivot point into an entirely separate system with its own blast radius.

| Credential Category | Example Variables | Downstream Impact if Exposed |
|--------------------|-----------------|------------------------------|
| Database | `DATABASE_URL`, `POSTGRES_PASSWORD`, `MONGO_URI` | Full read/write access to production data |
| Cloud infrastructure | `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `GCP_SA_KEY` | Cloud account compromise, compute abuse, data exfiltration |
| Payment processing | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Financial data access, unauthorized charges, refund fraud |
| Authentication | `AUTH0_SECRET`, `NEXTAUTH_SECRET`, `JWT_SECRET` | Session forgery, account takeover across all users |
| Email delivery | `SENDGRID_API_KEY`, `POSTMARK_TOKEN` | Phishing from trusted domains, bulk spam |
| Monitoring/logging | `DATADOG_API_KEY`, `SENTRY_DSN` | Telemetry suppression, attack concealment |
| Source code / packages | `GITHUB_TOKEN`, `NPM_TOKEN` | Supply chain injection into published packages |
| AI/ML services | `OPENAI_API_KEY`, `ANTHROPIC_API_KEY` | API abuse, cost generation, data extraction |

*Table 4: Environment variable categories commonly present in Vercel projects and the downstream impact if exposed.*

### The Rotation-Without-Redeploy Problem

A critical operational detail that many developers have missed: rotating a Vercel environment variable does not retroactively invalidate previous deployments that used the old value. Per Vercel's own documentation, prior deployments continue using the credential value that was active at the time they were built, until those deployments are explicitly redeployed or deleted.

This means an organization that rotated credentials on April 19 in response to Vercel's disclosure, but did not subsequently redeploy all environments, may still have live production deployments serving requests using the compromised credential. The attack surface does not close until every deployment artifact referencing the old credential is either redeployed with the new value or taken offline.

The correct remediation sequence is:

```
1. Rotate the credential at the source service (AWS, Stripe, database provider, etc.)
2. Update the environment variable in Vercel with the new credential value
3. Redeploy every environment (production, preview, development) that used that variable
4. Verify old deployments are no longer accessible or have been overwritten
5. Enable "Sensitive" flag on the variable to prevent future exposure via internal access
```

Sources: [Peter Girnus Analysis](https://webmatrices.com/post/how-a-roblox-cheat-and-one-ai-tool-brought-down-vercel-s-entire-platform) | [Vercel Security Bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident)

---

## 9. MITRE ATT&CK Mapping

The confirmed attack chain maps cleanly to the following MITRE ATT&CK techniques. The mapping reflects behaviors explicitly described in Vercel's disclosure and validated against established OAuth abuse patterns.

| Tactic | Technique | ID | Application in This Incident |
|--------|-----------|----|-----------------------------|
| Initial Access | Trusted Relationship | T1199 | Context.ai OAuth application as a trusted third party granted access to Vercel employee accounts |
| Persistence | Application Access Token | T1550.001 | OAuth token survives password rotation; does not require user interaction to maintain access |
| Credential Access | Valid Accounts | T1078 | Compromised Vercel employee Google Workspace credentials used for internal access |
| Discovery | Account Discovery | T1087 | Internal system and Vercel project enumeration by the attacker |
| Collection | Data from Information Repositories | T1213 | Systematic enumeration of environment variables across customer projects |
| Credential Access | Unsecured Credentials: Credentials in Files | T1552.001 | Non-sensitive environment variables accessible via internal backend decryption |
| Lateral Movement | Valid Accounts: Cloud Accounts | T1078.004 | Potential use of exposed cloud provider credentials (AWS, GCP) for downstream access |

*Table 5: MITRE ATT&CK technique mapping for the confirmed Vercel breach attack chain.*

### Detection Priority by Technique

The highest-value detection opportunity in this attack chain is the pivot from OAuth application access to internal system access — the transition from T1199 (Trusted Relationship) to T1078 (Valid Accounts). This is the point at which an external compromise becomes an internal one, and it is detectable if OAuth application behavior monitoring is in place.

Specifically, organizations should prioritize detection rules for:

- OAuth token usage from IP ranges inconsistent with the authorizing application's expected infrastructure
- OAuth applications accessing Google Workspace resources outside their expected scope (a meeting summarizer accessing Drive files for engineering runbooks is anomalous)
- First-time authentication to internal applications from a known user identity, especially from unfamiliar network locations

Sources: [Peter Girnus Analysis](https://webmatrices.com/post/how-a-roblox-cheat-and-one-ai-tool-brought-down-vercel-s-entire-platform)

---

## 10. Remediation and Response

### What Vercel Has Done

Vercel's remediation response has addressed both immediate customer notification and structural platform improvements.

**Immediate actions (April 19, 2026 onward):**
- Identified and directly notified the limited subset of customers with confirmed environment variable exposure
- Published the compromised OAuth Client ID as a public IOC to enable broader community investigation
- Engaged Google Mandiant for incident response support
- Notified law enforcement
- Reached out to Context.ai to understand the full scope of the upstream compromise
- Collaborated with GitHub, Microsoft, npm, and Socket to verify open-source package integrity

**Platform changes shipped:**
- Changed the default for all new environment variables to "Sensitive," requiring explicit opt-out rather than opt-in for higher protection
- Deployed a new "Security Overview" page in the dashboard providing a team-wide view of all environment variables and their sensitivity status
- Improved the user interface for sensitive environment variable creation and management, with in-product education about the distinction

**What remains open:** As of this report, Vercel has not published a complete count of affected customers, a detailed internal detection timeline, or a full account of the attacker's internal access scope beyond environment variable enumeration. These gaps are noted without implying that Vercel has been deliberately withholding information — active investigations with law enforcement engagement legitimately constrain public disclosure.

### Recommended Actions for Vercel Customers

**Priority order for credential rotation (execute immediately, in this sequence):**

```
1. Cloud provider credentials (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, GCP service account keys)
2. Database connection strings (DATABASE_URL, POSTGRES_PASSWORD, MONGO_URI)
3. Payment processor keys (STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET)
4. Authentication secrets (JWT_SECRET, NEXTAUTH_SECRET, AUTH0_SECRET, SESSION_SECRET)
5. Third-party API keys (OPENAI_API_KEY, SENDGRID_API_KEY, DATADOG_API_KEY)
6. Source code and package registry tokens (GITHUB_TOKEN, NPM_TOKEN)
```

**After rotating each credential:**
- Update the variable in Vercel with the new value
- Mark the variable as Sensitive
- Redeploy every environment (production, preview, development) that used that variable
- Review service-level access logs for the period February 2026 through April 2026 for any usage from unexpected sources

**Google Workspace audit steps:**
- Navigate to Admin Console → Security → API Controls → Third-Party App Access
- Search for the known-bad Client ID: `110671459871-30f1spbu0hptbs60cb4vsmv79i7bbvqj.apps.googleusercontent.com`
- Revoke immediately if found
- While in the audit, review all third-party OAuth applications with broad scopes (mail, Drive, calendar) and revoke any that are not in active business use

Sources: [Vercel Security Bulletin](https://vercel.com/kb/bulletin/vercel-april-2026-security-incident)

---

## 11. Lessons Learned

### 1. OAuth Applications Are Vendor Relationships, Not Features

Every time a developer or employee clicks "Allow" on an OAuth authorization dialog, they are creating a persistent trust relationship that survives password rotation, MFA changes, and employment changes. In most organizations, these relationships are never audited, never have expiration dates, and are never tracked alongside traditional vendor contracts.

Context.ai was a Y Combinator company with stated SOC 2 compliance. Its OAuth application had passed whatever informal vendor review Vercel's employees applied when authorizing it. One compromised endpoint later, that trust relationship became an attack vector into one of the world's largest deployment platforms.

### 2. Secure by Default Is Not Optional at Platform Scale

Vercel's sensitivity model was a reasonable design at small scale, where developers actively engaged with security settings. At the scale of hundreds of thousands of projects and millions of deployments, the assumption that developers will proactively opt into additional protection for every credential they create is not operationally realistic.

This breach validates the principle: security controls must default to the most protective state available. The opt-out model for reduced protection. The opt-in model for expanded convenience. Not the reverse.

### 3. Platform Breaches Have a Multiplier Effect

A breach of a single developer on a single team is a contained incident. A breach of the platform layer — the infrastructure that manages deployments and stores credentials for thousands of teams — is a multiplier event. The number of affected credentials in a platform breach scales not with the size of the attacker's initial access but with the size of the platform's customer base and the average credentials-per-project ratio.

### 4. AI-Accelerated Adversaries Change Detection Baselines

Rauch's assessment that the attacker was "significantly accelerated by AI" is significant regardless of whether formal forensic attribution confirms it. If AI tooling allows adversaries to compress the timeline between initial access and complete environment enumeration — tasks that would previously require days of manual work — then detection rules calibrated against human-paced attacker behavior will generate false negatives against AI-accelerated operators.

Security operations teams should revisit velocity thresholds, enumeration rate baselines, and dwell-time assumptions in their detection engineering.

### 5. The Breach-Rotate-Forget Cycle Must Be Broken

Previous platform-level breaches — Codecov in 2021, CircleCI in 2023, Snowflake in 2024 — each produced a week of intense credential rotation activity followed by a return to the same credential storage patterns that made the breach possible. The structural solution is not faster rotation after breaches. It is eliminating long-lived platform-stored credentials in favor of runtime secret injection from purpose-built secret management systems.

---

## 12. Security Recommendations

These recommendations are organized by implementation timeline and address both the specific patterns exploited in this incident and the broader structural vulnerabilities it reveals.

### Immediate Actions (0–48 Hours)

**Vercel-specific:**
- Rotate all environment variables not marked as Sensitive, regardless of whether your team was directly notified by Vercel as affected. The confirmed affected subset is "limited" but not publicly enumerated.
- Redeploy all environments after rotation. Rotation alone does not invalidate previous deployment artifacts.
- Enable the Sensitive flag on every environment variable containing a credential, token, secret, or key.
- Audit Vercel activity logs and deployment history for unexpected activity during February 2026 through April 2026.

**Google Workspace:**
- Audit all third-party OAuth application authorizations via Admin Console → Security → API Controls.
- Revoke any application not in active business use, particularly those with broad mail/Drive/calendar scopes.
- Search explicitly for the known-bad Client ID: `110671459871-30f1spbu0hptbs60cb4vsmv79i7bbvqj.apps.googleusercontent.com`

**Cross-platform:**
- Query cloud provider audit logs (CloudTrail, GCP Audit Logs, Azure Activity Logs) for API calls using Vercel-stored credentials from unexpected IP ranges during February 2026 through April 2026.
- Query database access logs for connections from IP ranges outside your application's known Vercel egress range during the same period.
- Review payment processor API logs (Stripe Dashboard → Developers → Logs) for API calls from unrecognized sources.

### Short-Term Hardening (1–4 Weeks)

**Secret management migration:** Migrate credentials from Vercel environment variables to a dedicated secrets manager — HashiCorp Vault, AWS Secrets Manager, Doppler, or Infisical. Inject secrets at runtime rather than storing them as platform environment variables. This eliminates the entire category of platform-level credential exposure.

**OIDC-based CI/CD authentication:** Where your deployment pipeline and cloud provider support it, implement OpenID Connect (OIDC) based authentication. This eliminates long-lived access credentials from the CI/CD pipeline entirely, replacing them with short-lived, scoped tokens issued per workflow run.

**OAuth governance program:** Establish a central inventory of all OAuth application authorizations across your Google Workspace (or Microsoft Entra) environment. Implement a quarterly review cycle with revocation of any application not verified as actively needed. Commercial tooling from Nudge Security, Grip Security, or Valence Security can automate discovery.

**Credential rotation automation:** Implement automated credential rotation on a defined schedule — 30 to 90 days depending on sensitivity — independent of incident triggers. Proactive rotation reduces the value of credentials obtained through platform-level breaches.

### Architectural Changes (1–6 Months)

**Zero-trust posture for platform secrets:** Architect systems on the assumption that any secret stored in a deployment platform may be exposed in a platform-level breach. This means scoping credentials to minimum required permissions, using temporary role-based credentials for cloud access (IAM roles, Workload Identity Federation), and ensuring that a single credential exposure does not cascade into full system compromise.

**Third-party risk management extension to OAuth applications:** Every OAuth application authorized to access corporate identity infrastructure should be subject to the same vendor review process applied to contracted software vendors. This includes security review at authorization, periodic re-review, and documented revocation procedures.

**SIEM detection rules for OAuth anomalies:** Deploy detection logic for anomalous OAuth application behavior — token usage from unexpected IP ranges, scope escalation, access to resources outside the application's expected functional area. Map detection rules explicitly to T1199 and T1550.001.

**Endpoint security for all employees with corporate system access:** Lumma Stealer is commodity malware. Its presence on a Context.ai employee's device is evidence of a gap in endpoint security — either absence of endpoint detection and response (EDR) tooling, or absence of policy preventing the execution of untrusted scripts. Any employee whose device has corporate OAuth tokens present is a potential supply chain attack vector. Endpoint protection is not an optional control.

---

## 13. KodeSec Expert Analysis

### The Structural Vulnerability is Systemic, Not Incident-Specific

The Vercel breach is technically significant and operationally impactful. It is also a predictable manifestation of a structural vulnerability pattern that the industry has documented repeatedly without correcting at the architectural level.

The pattern: a platform sits at the intersection of developer secrets and production deployments; a trusted vendor relationship provides initial access; internal access enables credential enumeration; credentials cascade into downstream services. This is Codecov in 2021. It is CircleCI in 2023. It is the Vercel incident in 2026. The specific entry points differ. The structural shape of the attack is identical.

What the industry has failed to absorb from each of these incidents is that the remediation is not platform-specific. Rotating your Vercel credentials after this breach, while continuing to store long-lived secrets in Netlify, Railway, or Render, does not reduce structural risk. It relocates it. The platform-level credential exposure category requires an architectural response — runtime secret injection from purpose-built secret management systems — not a rotation response.

### The AI Acceleration Assessment Deserves Careful Consideration

Rauch's public attribution of attacker velocity to AI augmentation is the kind of claim that is easy to dismiss as post-hoc rationalization or media-friendly narrative. KodeSec's assessment is that it deserves careful, evidence-informed consideration.

The specific behavioral signature Rauch described — "surprising velocity and in-depth understanding of Vercel" — is consistent with what AI-augmented enumeration would produce. An LLM-assisted attacker with access to Vercel's API documentation (which is public) and an internal backend connection could enumerate environment variable structures, adapt to API error responses, and traverse project hierarchies significantly faster than manual operation.

This is not the same as claiming that AI was definitively used. It is noting that if this category of AI-accelerated adversary operation is emerging — as Microsoft's concurrent Storm-2372 successor research suggests — then velocity-based detection thresholds need to be recalibrated. The "dwell time" concept assumes adversaries move at human pace. AI-accelerated operators may collapse dwell time from months to hours while simultaneously increasing the breadth of their reconnaissance.

### The OAuth Governance Gap is Larger Than This Incident Suggests

Third-party analysts examining their own OAuth authorization inventories after this incident have reported discovering ten, twenty, thirty or more authorized applications with broad Workspace permissions — many forgotten, some no longer in use, some from companies they cannot identify. This is not unusual. It is the industry norm.

The OAuth authorization model, as implemented across Google Workspace, Microsoft Entra, and most enterprise identity systems, was designed for developer convenience at a time when the OAuth attack surface was not yet well-understood. The UX of OAuth authorization dialogs is optimized for approving quickly, not reviewing carefully. The scope language is technically precise but operationally opaque ("read all mail" sounds different from "access to every email your organization sends and receives").

The Vercel breach argues for treating OAuth application governance as a tier-one security control, equivalent in organizational priority to vulnerability management or identity lifecycle management. Every OAuth application with access to corporate Workspace data is a potential supply chain entry point. The number of such applications in most organizations is unknown, unmapped, and unmonitored.

### What Good Looks Like

In a well-architected environment, the Vercel incident's impact would have been bounded at Stage 2 of the attack chain. The attacker would have obtained a valid OAuth token for a Vercel employee's Google Workspace account. The credential fan-out from that point would have been minimal because:

- No long-lived credentials would have been stored in Vercel environment variables — runtime injection from a secrets manager would have rendered environment variable enumeration meaningless
- The compromised Workspace account would have had limited OAuth connectivity to internal Vercel systems — SSO federation would have required additional MFA or conditional access controls for administrative system access
- The OAuth token's anomalous usage (from an unfamiliar IP range) would have triggered an alert before the attacker could pivot

None of these controls require novel technology. They require deliberate architectural choices and the organizational will to accept the operational overhead they introduce. The gap between knowing what secure looks like and building systems that are actually secure is, as one incident analyst put it, measured entirely in convenience.

This incident is a high-visibility, well-documented demonstration of the cost of that gap.

---

## 14. References

**Official Sources:**

| Source | URL | Description |
|--------|-----|-------------|
| Vercel Security Bulletin | https://vercel.com/kb/bulletin/vercel-april-2026-security-incident | Official incident disclosure and remediation guidance |
| Guillermo Rauch (X/Twitter) | https://x.com/rauchg/status/2045995362499076169 | CEO detailed thread on attack chain and response |

**Third-Party Analysis:**

| Source | URL | Description |
|--------|-----|-------------|
| BleepingComputer | https://www.bleepingcomputer.com/news/security/vercel-confirms-breach-as-hackers-claim-to-be-selling-stolen-data/ | Threat actor claims and breach coverage |
| Trend Micro Research | https://www.trendmicro.com/en_us/research/26/d/vercel-breach-oauth-supply-chain.html | Technical analysis of the OAuth supply chain compromise |
| Peter Girnus — WebMatrices | https://webmatrices.com/post/how-a-roblox-cheat-and-one-ai-tool-brought-down-vercel-s-entire-platform | In-depth attack chain and env var model analysis |

**Related Incident Context:**

| Incident | Year | Relevance |
|---------|------|-----------|
| Codecov Bash Uploader Breach | 2021 | CI/CD environment variable exfiltration via supply chain compromise; ~2 month undetected dwell time |
| CircleCI Security Incident | 2023 | Employee SSO session token theft via malware → internal access → customer secret exfiltration |
| Snowflake Customer Attacks | 2024 | Infostealer credentials → platform access → mass customer data exfiltration (165+ organizations) |
| Okta Support System Breach | 2023 | Stolen credentials → customer support system access → session token exposure |
| LiteLLM PyPI Supply Chain | March 2026 | CI/CD credential theft → malicious packages targeting developer credentials |
| Axios npm Compromise | March 2026 | Maintainer account hijack → RAT deployment to developer environments (attributed to Sapphire Sleet) |

**MITRE ATT&CK References:**

- T1199 — Trusted Relationship: https://attack.mitre.org/techniques/T1199/
- T1550.001 — Application Access Token: https://attack.mitre.org/techniques/T1550/001/
- T1078 — Valid Accounts: https://attack.mitre.org/techniques/T1078/
- T1552.001 — Unsecured Credentials: Credentials in Files: https://attack.mitre.org/techniques/T1552/001/
- T1078.004 — Valid Accounts: Cloud Accounts: https://attack.mitre.org/techniques/T1078/004/
- T1213 — Data from Information Repositories: https://attack.mitre.org/techniques/T1213/
- T1087 — Account Discovery: https://attack.mitre.org/techniques/T1087/

---

*This report is produced by KodeSec for informational and educational purposes. All claims attributed to threat actors are reproduced for threat-tracking purposes and should not be treated as verified. KodeSec makes no claim of independent forensic access to Vercel's systems or data. Where gaps in public knowledge exist, they are noted explicitly. This report will be updated as additional verified information becomes available.*

*KodeSec — kodesec.com*

*Classification: TLP:WHITE — No restrictions on distribution*
