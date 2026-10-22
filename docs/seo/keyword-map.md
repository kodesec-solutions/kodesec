# Keyword map

One primary query per URL. Before writing or renaming a page, check this table so two pages never chase the same
query (cannibalisation). Review quarterly against Search Console (Performance → Queries). Volumes are not listed
because we have no verified data yet: fill the `GSC` column from Search Console after launch.

| URL | Primary query | Secondary queries | Intent | GSC (impr. / clicks / pos.) |
|---|---|---|---|---|
| `/` | penetration testing company | secure software development, security academy | Commercial | |
| `/services/cybersecurity` | cybersecurity services | penetration testing services, VAPT | Commercial | |
| `/services/cybersecurity/web-application-penetration-testing` | web application penetration testing | web app pentest, OWASP testing | Commercial | |
| `/services/cybersecurity/network-security-testing` | network penetration testing | internal network pentest, Active Directory pentest | Commercial | |
| `/services/cybersecurity/vulnerability-assessment` | vulnerability assessment services | VAPT, vulnerability scanning | Commercial | |
| `/services/cybersecurity/cloud-security-assessment` | cloud security assessment | AWS security review, cloud configuration review | Commercial | |
| `/services/cybersecurity/security-consulting` | security consulting | application security consulting | Commercial | |
| `/services/devops` | DevOps services | DevSecOps, Kubernetes consulting | Commercial | |
| `/services/devops/kubernetes-administration` | Kubernetes administration services | managed Kubernetes, cluster hardening | Commercial | |
| `/services/cloud` | cloud consulting services | cloud migration, cloud cost optimisation | Commercial | |
| `/services/software-development` | secure software development | custom web development | Commercial | |
| `/services/quality-assurance` | software testing services | QA outsourcing, test automation | Commercial | |
| `/pricing` | penetration testing cost | pentest pricing | Commercial | |
| `/academy` | free cyber security course | learn web security | Informational | |
| `/academy/owasp/<topic>` | what is `<OWASP topic>` | `<topic>` for business owners | Informational | |
| `/blog/shwapno-data-breach-2026` | Shwapno data breach | shwapno hack 4 million | News | |
| `/blog/bangladesh-nid-data-breach-2026` | Bangladesh NID data leak | NID leak timeline | News | |
| `/blog/pathao-data-breach-2026` | Pathao data breach | Pathao 19 million | News | |
| `/blog/github-rce-cve-2026-3854-git-push-exploit` | CVE-2026-3854 | GitHub RCE git push | News | |
| `/blog/php2shell-critical-php-rce-cve-2026-109618-109619` | PHP2Shell | CVE-2026-109618 | News | |
| `/blog/vercel-oauth-breach` | Vercel OAuth breach | Vercel April 2026 incident | News | |

## Rules
- Title: `<Topic> | Kodesec`, 60 characters at most (the template adds ` | Kodesec`, so the topic is about 50). A longer headline gets a short `seoTitle` in the front matter.
- Description: 120–160 characters, includes the primary query once, says what the reader gets. Long ledes get a `seoDescription`.
- One H1 that contains the primary query. H2s answer one sub-question each, with a 40–60 word direct answer under the heading (this is what AI search quotes).
- Every commercial page links to `/book`; every informational page links to one relevant service and one related lesson or post.
- Posts are signed by a named author, not by `kodesec-research`.
