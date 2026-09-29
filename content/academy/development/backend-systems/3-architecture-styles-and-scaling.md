---
title: "Architecture styles and scaling: monoliths, microservices and growth"
slug: architecture-styles-and-scaling
track: development
module: backend-systems
order: 3
level: practitioner
roles: [dev]
duration: 15 min
prerequisites: [backend-building-blocks]
objectives:
  - Compare monoliths, modular monoliths and microservices, and choose between them
  - Explain vertical and horizontal scaling and why stateless servers matter
  - "Apply the core reliability patterns: timeouts, retries, circuit breakers and graceful degradation"
updated: "2026-09-29"
authors: [kodesec-research]
---

There's no single "best" backend architecture. The right design depends on the size of the team, how much traffic there is, and how fast the product is changing. This lesson covers the main styles, how systems scale, and the patterns that keep them running when parts fail.

## Monolith

A **monolith** is one application, deployed as one unit, usually with one database. All the features (users, orders, payments, notifications) live in the same codebase.

- **Strengths:** simple to build, test, deploy and debug. A function call is fast and can't fail over the network. One database means transactions are easy.
- **Weaknesses:** as the codebase and team grow, changes start to collide, one bug can take everything down, and the whole application has to scale together.

A monolith isn't a mistake. Most successful products started as one, and many still are.

## Modular monolith

A **modular monolith** is still deployed as one application, but the code is split into modules with clear boundaries: `orders` can call `payments` only through a defined interface, never by reaching into its tables.

```text
┌──────────────── one deployable application ────────────────┐
│  [ users ]  →  [ orders ]  →  [ payments ]  →  [ notify ]  │
│   each module owns its own tables and exposes an interface │
└─────────────────────────────────────────────────────────────┘
```

You keep the simplicity of a monolith, and if one module later needs to become a separate service, the boundary already exists. For most teams, this is the best starting point.

## Microservices

**Microservices** split the system into small, independently deployed services, each owning its own data and usually its own team. They communicate over the network, through APIs or events.

- **Strengths:** teams can deploy independently, each service can scale on its own, and a failure can be contained to one service.
- **Costs:** every call is now a network call that can be slow or fail. There's no simple transaction across services. Debugging needs distributed tracing, and you need mature DevOps: automated deployments, monitoring and service discovery.

| | Monolith | Modular monolith | Microservices |
|---|---|---|---|
| Deployment | One unit | One unit | Many independent units |
| Team size it suits | Small | Small to medium | Many teams |
| Operational complexity | Low | Low | High |
| Data consistency | Easy (one database) | Easy | Hard (per-service data) |
| Scaling | All together | All together | Per service |

> [!IMPORTANT]
> Microservices solve an **organisational** problem (many teams stepping on each other) more than a technical one. Adopting them before you have that problem usually means paying the costs without the benefits.

## Scaling: handling more load

### Vertical scaling

**Scale up**: give the server more CPU and memory. It's simple and needs no code changes, but there's a limit to how big one machine gets, and it's still a single point of failure.

### Horizontal scaling

**Scale out**: run several copies of the application behind a **load balancer**. It's nearly limitless, and if one copy dies the others keep serving.

```text
                 ┌──▶ API copy 1 ─┐
 Users ─▶ Load ──┼──▶ API copy 2 ─┼──▶ Database
          balancer└──▶ API copy 3 ─┘
```

Horizontal scaling only works if the servers are **stateless**: any copy can handle any request, because nothing about the user is kept in one server's memory. Sessions go in a shared store (Redis or the database) or in a signed token. Uploaded files go to object storage, not the local disk.

### Scaling the database

The database is usually the hardest part to scale. In the order you normally reach for them:

1. **Indexes and query fixes.** Often a 10–100× improvement for free.
2. **Caching.** Takes repeated reads off the database entirely.
3. **Read replicas.** Copies of the database that serve read queries while the primary handles writes. Replicas can lag slightly behind the primary.
4. **Partitioning or sharding.** Splitting the data across several databases, for example by customer. It's powerful but complex, so treat it as a last resort.

## Designing for failure

In any system with a network, **something is always failing**: a slow database, a partner API that's down, a server being replaced. Reliable systems expect it:

| Pattern | What it does |
|---|---|
| **Timeouts** | Never wait forever. Every network call gets a deadline. |
| **Retries with backoff** | Retry temporary failures, waiting longer each time (with random jitter) so retries don't pile up. Only retry idempotent operations. |
| **Circuit breaker** | After repeated failures, stop calling the broken dependency for a while and fail fast instead of piling up waiting requests. |
| **Graceful degradation** | Keep the core working when an extra fails: if recommendations are down, show the product page without them. |
| **Health checks** | The load balancer sends traffic only to copies that report they're healthy. |
| **Rate limiting** | Protect the system, and other users, from any single client sending too much. |

## How architecture usually evolves

```text
Monolith ──▶ Modular monolith ──▶ + cache, queues, read replicas ──▶ extract a few services where teams or load demand it
```

Change the architecture when a real problem demands it: a measured performance limit, teams blocking each other, or a part of the system with very different scaling needs. Don't change it because a larger company works that way.

## Checklist

- [ ] Start with a modular monolith and clear module boundaries
- [ ] Keep application servers stateless so they can scale horizontally
- [ ] Put a timeout on every network call
- [ ] Only retry idempotent operations, with backoff and jitter
- [ ] Measure before scaling: fix queries, then cache, then replicas
- [ ] Design each feature to degrade gracefully when a dependency fails

> [!TIP]
> Planning a new platform or untangling an existing one? Our [software development services](/services/software-development) cover architecture reviews and secure-by-design builds.
