---
title: 'Pathao Data Breach 2026: 19 Million Users, 133 GB, 24 Hours'
slug: pathao-data-breach-2026
description: 'Pathao data breach explained: a hacker claims 19 million user records and 133 GB of data and demands a $400,000 ransom. Timeline, impact and what to do.'
seoTitle: 'Pathao Data Breach 2026: 19M Users, 133 GB'
date: '2026-10-10'
updated: '2026-10-10'
authors:
- kodesec-research
category: Breach Analysis
tags:
- data breach
- pathao
- bangladesh
- ransomware
- dark web
relatedServices:
- cybersecurity
- cloud
- devops
cover: /blog/pathao-data-breach-2026/cover.jpeg
coverAlt: '19 Million Users, 133 GB, 24 Hours: Inside the Pathao Breach That Shook Bangladesh'
featured: false
draft: false
---

![19 Million Users, 133 GB, 24 Hours: Inside the Pathao Breach That Shook Bangladesh](/blog/pathao-data-breach-2026/cover.jpeg)

## Incident Overview

On 4 October 2026, Pathao, one of Bangladesh's largest ride-hailing, delivery and digital services platforms, detected a cybersecurity incident that forced it to take critical systems offline. Three days later, a threat actor on DarkForums posted a public "Notice to Pathao Limited" claiming to hold Pathao's production data: **133 GB, roughly 250 million rows across 591 tables, including a master user table of 19,063,918 accounts.**

The actor demanded **400,000 USDT (TRC-20)**, about Tk 4.92 crore, within 24 hours, and threatened to release NID, banking, HR and admin data in stages if Pathao stayed silent. The claim was first surfaced by the cyber intelligence platform Daily Dark Web on X on Wednesday, 7 October.

Pathao has confirmed that names, email addresses and phone numbers were obtained by malicious actors. It has not confirmed the number of affected users or the larger dataset described on the dark web. If the attacker's claims hold, this would be the largest consumer data breach Bangladesh has seen, roughly five times the scale of the [Shwapno breach](/blog/shwapno-data-breach-2026) earlier this year.

> **Note:** This analysis is based only on publicly reported information and the threat actor's own post. Attacker claims are labelled as claims throughout.

## What Happened: Breach Timeline

Unlike Shwapno, where months passed between compromise and disclosure, the Pathao incident moved from outage to public extortion in three days.

| Date (2026) | Event |
| --- | --- |
| 4 October | Pathao detects a cybersecurity incident. Services across the platform are disrupted and critical systems are taken offline as a precaution. Services are restored shortly after, with intermittent issues during stabilisation. |
| 7 October | Pathao posts a statement on its verified Facebook page confirming that names, email addresses and phone numbers were obtained by malicious actors, and apologises to users, drivers, merchants and partners for the incident and disruption. |
| 7 October | A threat actor publishes "Notice to Pathao Limited" on DarkForums, listing the dataset and a 24-hour ransom demand. Daily Dark Web shares a screenshot on X the same day. |
| 7 to 8 October | A 4,000-record sample is posted on Telegram. New Age reviews it and finds it consistent with Pathao customer data. |
| 8 to 9 October | Pathao tells Prothom Alo the incident was contained on detection and external cybersecurity experts are engaged. |
| By 9 October | Pathao says it filed a formal complaint with law enforcement and informed regulators. The National Cyber Security Agency (NCSA) says it is forming an investigation committee. |

The dark web post opens by citing New Age's own report of the outage. That detail matters: it suggests the actor was watching the public response and used media coverage as pressure.

![Pathao data breach timeline, 4 to 9 October 2026](/blog/pathao-data-breach-2026/timeline.jpeg)

## What the Attackers Claim to Hold

The actor's post includes a "Dataset Volume Overview" that goes far beyond the names, emails and phone numbers Pathao acknowledged. It covers customers, drivers, merchants, employees and Pathao's own admin backend.

![Threat actor's DarkForums post about Pathao, sensitive details redacted](/blog/pathao-data-breach-2026/darkforums-post.jpeg)

*Threat actor's post on DarkForums, 7 Oct 2026. Sensitive details redacted by Kodesec.*

**Customer and driver data (claimed)**

| Data category | Records claimed |
| --- | --- |
| Primary user accounts (86 fields each) | 19,063,918 |
| Email, GPS, Facebook ID and access token | 19,063,918 (100% of accounts) |
| Phone numbers | 19,063,914 |
| Legal names | 19,063,532 |
| Password hashes (bcrypt) | 19,063,871 |
| Driving licences | 19,046,583 |
| Profile photos | 18,994,621 |
| National ID (NID) numbers | 10,095,387 |
| Home addresses | 5,739,178 |
| Delivery tracking events | 39,515,497 |
| Driver login query logs | 32,728,015 |
| E-commerce customers | 1,181,598 + 269,489 |

**Business and internal data (claimed)**

| Data category | Records claimed |
| --- | --- |
| Admin backend accounts (login, email, password hash, reset codes) | 5,825 |
| Admin access logs with source IPs | 290,108 |
| HR employee records (NID, salary, religion, emergency contacts) | 549 |
| Merchants with bank account and routing details | 17,943 |
| Direct-debit records | 845,872 |
| Wallet metadata / wallet transaction logs | 7,550,717 / 4,039,743 |
| Corporate admins / employees / companies | 2,142 / 9,881 / 2,067 |

### More than a data leak

Three lines in the post point to a deeper intrusion than a scraped database:

- **"Already inside the VPC."** The actor claims ongoing access to Pathao's cloud network, not a one-time dump.
- **Locked app nodes and "kill loops".** On payment, the actor promises to hand over encryption keys and stop the kill loops. That reads like ransomware-style disruption of running services, which fits the 4 October outage.
- **Admin credentials and reset codes.** Backend admin password hashes and reset codes, plus 290,108 access logs, would give an attacker a map of who administers the platform and from where.

The post also tells Pathao not to waste the 24 hours on a WAF rule and a blog post. Whether bluff or not, it signals the attacker believes perimeter fixes alone won't remove them.

## Claims vs. Confirmation: Where the Story Doesn't Line Up

A breach story is only as good as its numbers. Cross-checking every source against the original post shows a clear gap between what is claimed, what is reported and what is confirmed.

| Question | Threat actor's post | Media reports | Pathao's position |
| --- | --- | --- | --- |
| Accounts affected | 19,063,918 | \~1.9 crore (all outlets) | Not disclosed |
| Data types | 86 fields per user, plus internal data | NID, licences, GPS, Facebook profiles, addresses | Names, emails, phone numbers |
| NID numbers | 10,095,387 | "Over 19 million" or "1.91 crore" | Not addressed |
| Sample validity | 4,000-record Telegram sample | New Age: consistent with Pathao customer data | Not addressed |
| Ransom | 400,000 USDT (TRC-20), 24 hours | $400,000, \~Tk 4.92 crore | Not addressed |

### The NID discrepancy

Several outlets reported that the actor holds **more than 19 million NID numbers**. The post itself lists **10,095,387**, roughly 1.01 crore. The 19 million figure appears to have been carried over from the account and phone counts. It is still a huge number of national IDs, but accuracy matters when people are deciding how worried to be.

### What Is the Response of Pathao?

Pathao's response has real strengths, and they deserve credit before the gaps.

**What Pathao got right**

- **It said sorry, publicly.** Pathao apologised to users, drivers, merchants and partners, acknowledging the trust placed in it and its responsibility to protect their information. Many breached companies stay silent or deny; an apology signals accountability and helps preserve user trust.
- **It disclosed within three days.** The incident was detected on 4 October and acknowledged on 7 October. Compare that with Shwapno, where a General Diary was filed months after the initial compromise.
- **It acted fast to contain.** Critical systems were taken offline as soon as the incident was detected, limiting further damage, and services were restored shortly after.
- **It warned users early.** Pathao told users to beware of unsolicited messages, calls and links claiming to be Pathao, and never to share passwords, PINs or OTPs. That warning can blunt the phishing wave that usually follows a leak.
- **It brought in outside help and the authorities.** External cybersecurity experts were engaged, a formal complaint was filed with law enforcement, and regulators were informed.
- **It promised updates.** Pathao said it would keep sharing information as details are verified.

**What Pathao has not said yet**

The statements do not say how many users are affected, how long attackers had access, how they got in, or whether passwords, payment data or identity documents were touched. One outlet reported that Pathao's Facebook post also mentioned addresses; Pathao's statements quoted by other outlets list only names, emails and phone numbers. An apology builds goodwill, but it is not a full disclosure.

The attacker's claim of being "already inside the VPC" sits uneasily next to "contained as soon as detected". Only a forensic investigation can settle which is true.

## Impact Analysis

![Why this data breach is so dangerous: identity, location, money and employee exposure](/blog/pathao-data-breach-2026/impact.jpeg)

### Part of a wider pattern

Pathao is not an isolated case. In recent months, data linked to Shwapno, Teletalk, the Directorate of Secondary and Higher Education and the Bangladesh Air Force has been reported on cybercrime forums. More than six lakh Ghorer Bazar customer profiles were reportedly offered for sale last month, and in August an actor claimed millions of Bdjobs CV records, which the company denied.

## Root Causes: What the Claims Suggest

Pathao has not disclosed how attackers got in, so nothing below is confirmed. But the shape of the claimed dataset points to specific control gaps worth examining.

- **Over-centralised data.** A single user table with 86 fields, holding NID, licence, GPS, tokens and photos together, means one compromised query can expose everything. Sensitive identity data should not live next to everyday profile data.
- **Cloud network access.** The "inside the VPC" claim suggests weak segmentation between workloads and databases, or stolen cloud credentials.
- **Exposed admin plane.** Admin backend accounts, reset codes and access logs being reachable suggests the internal admin system was not isolated or protected by strong MFA.
- **Long-lived third-party tokens.** Storing Facebook access tokens for every user creates a secondary breach risk if they are not encrypted, scoped and expired.
- **Exfiltration went unnoticed.** Moving 133 GB out of a production estate should trigger data-loss and egress alerts well before it completes.
- **Insider possibility.** Tanvir Hassan Zoha, an IT expert and prosecutor at the International Crimes Tribunal, said investigators should determine whether this was an external hacker or an insider.

## How Kodesec Saves You From This Kind of Breach

A breach like this is never one mistake. It is a chain: a way in, room to move, data in one place, and nobody watching the exit. At Kodesec, we break that chain at every link, before an attacker ever writes a ransom note.

![Kodesec cybersecurity services](/blog/pathao-data-breach-2026/kodesec-services.jpeg)

**1. We find your way in before attackers do.** Our offensive team runs web, mobile and API [penetration testing](/services/cybersecurity/web-application-penetration-testing) against the same surface a platform like Pathao exposes to millions of users, plus cloud and Active Directory [network security assessments](/services/cybersecurity/network-security-testing). We test the admin panel, not just the customer app.

**2. We lock down the cloud, not just the perimeter.** A WAF rule won't remove someone already inside your VPC. Our [cloud security assessment](/services/cybersecurity/cloud-security-assessment) audits AWS, GCP and Azure for misconfigurations, over-privileged IAM roles and leaked keys, and design segmented networks so a compromised app server cannot reach your core databases.

**3. We design data so one breach doesn't expose everything.** We help you split sensitive identity data (NID, licences, documents) from everyday profile data, encrypt it at field level, and expire third-party tokens. If one table leaks, it shouldn't hold a citizen's entire life.

**4. We secure the admin plane.** Phishing-resistant MFA, just-in-time access and separated admin networks make 5,825 admin accounts far harder to abuse.

**5. We build security into delivery.** Through DevSecOps and [CI/CD pipeline engineering](/services/devops/ci-cd-pipeline-engineering), we put secret scanning, dependency checks, container and Kubernetes security into your CI/CD pipeline, so credentials and vulnerable code never reach production.

**6. We shrink dwell time.** [Monitoring and observability](/services/devops/monitoring-observability) with SIEM, egress monitoring and anomaly alerts mean 133 GB leaving your network raises an alarm in minutes, not after a post appears on a dark web forum.

**7. We prepare you for the worst day.** [Malware investigation](/services/cybersecurity/malware-detection-investigation), incident response playbooks, tabletop simulations and immutable backups mean that if an attacker does get in, you contain fast, communicate clearly and never depend on paying a ransom.

Security is cheapest before the breach. Every control above costs less than one day of national headlines. [Book a call](/book) and we will scope a test around your platform.

## Recommended Security Roadmap for Organisations

Any Bangladeshi platform holding data at Pathao's scale should treat this week as a warning:

1. Enforce phishing-resistant MFA on every admin, cloud and internal system.
2. Segment cloud networks so applications cannot freely reach databases.
3. Separate and encrypt identity data (NID, licences, documents) at field level.
4. Rotate and expire third-party tokens and API keys on a schedule.
5. Monitor egress and alert on bulk data movement.
6. Run regular penetration tests and compromise assessments, including the admin plane.
7. Keep immutable, offline backups and a tested incident response playbook.

The expert view in the coverage echoes this. Tanvir Hassan Zoha urged an independent forensic investigation, preservation of servers and access logs, and notification of regulators and law enforcement. He also called on the government to set dedicated cybersecurity requirements for companies handling large volumes of personal data.

## Guidance for Pathao Users

If you use Pathao as a rider, customer, driver or merchant, act now:

- **Change your Pathao password**, and any other account where you reused it.
- **Review Facebook connected apps.** Remove Pathao's access and log out other sessions if you signed in with Facebook.
- **Never share OTPs, PINs or passwords**, even with callers or SMS claiming to be Pathao. Use only Pathao's official channels.
- **Watch for NID and SIM misuse.** NID data has leaked before ([see our NID breach analysis](/blog/bangladesh-nid-data-breach-2026)). Be alert to unexpected loan, SIM or account recovery messages.
- **Merchants:** confirm any request to change bank or payout details by calling a known contact first.
- **Enable MFA** on email, banking and social accounts.

## Final Thoughts

The Pathao incident shows how fast modern extortion moves: outage on a Sunday, ransom note by Wednesday, with the media used as a pressure tool. Whether the full 133 GB claim holds or not, the confirmed exposure alone puts millions of users at risk of fraud.

This is a developing situation. Pathao has engaged external experts, filed a complaint with law enforcement, and the NCSA is forming an investigation committee. We will update this analysis as verified details emerge.

For Bangladesh's digital economy, the lesson is the same one Shwapno taught: attackers are patient, data concentration multiplies damage, and detection speed decides how bad the headline gets.

> **Note:** This analysis is based solely on publicly available information and the threat actor's own claims, which have not been independently verified. It is intended for educational and awareness purposes.

## References

- [New Age: Dark web actor claims to have Pathao users' data, demands Tk 5 crore](https://www.newagebd.net/post/country/317338/dark-web-actor-claims-to-have-pathao-users-data-demands-tk-5-crore)
- [The Business Standard: Cyberattack exposed users' names, emails and phone numbers, says Pathao](https://www.tbsnews.net/bangladesh/crime/users-names-emails-and-phone-numbers-obtained-cyberattack-says-pathao-1566971)
- [Prothom Alo English: Group claims to have data of 19 million Pathao users, demands USD 400,000](https://en.prothomalo.com/bangladesh/914lx1u0ek)
- [Bangladesh Pratidin English: Pathao data breach report](https://en.bd-pratidin.com/tech/2026/10/09/71535)
- Daily Dark Web, post on X, 7 October 2026
- Threat actor's post "Notice to Pathao Limited", DarkForums, 7 October 2026 (screenshot, redacted)
- Pathao official statement, verified Facebook page, 7 October 2026
