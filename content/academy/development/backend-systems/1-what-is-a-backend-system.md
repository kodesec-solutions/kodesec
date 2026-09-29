---
title: What is a backend system?
slug: what-is-a-backend-system
track: development
module: backend-systems
order: 1
level: beginner
roles: [dev]
duration: 12 min
prerequisites: []
objectives:
  - Explain what the backend is responsible for and what the frontend is responsible for
  - Follow a request from the user's click to the database and back
  - Describe the layers inside a typical backend service
updated: "2026-09-29"
authors: [kodesec-research]
---

The **backend** is the part of a software system that users never see: the servers, databases and services that store data, enforce the rules, and do the work behind every button. The **frontend** (a website or mobile app) shows information and collects input. The backend decides what's true, what's allowed, and what happens next.

## Frontend and backend: who does what

| Frontend (client) | Backend (server) |
|---|---|
| Runs on the user's device: browser or phone | Runs on servers you control |
| Displays data and collects input | Stores data and applies business rules |
| Can be inspected and changed by the user | Hidden from the user, and the only place that can be trusted |
| Examples: React, Next.js, Swift, Kotlin | Examples: Node.js, Python, Go, Java, PHP, plus databases |

The most important line in that table is the third one. **Anything running on the user's device can be modified by the user.** Prices, permissions and limits must be decided on the backend, because the frontend can be bypassed with a single crafted request.

## The life of a request

Here's what happens when a user taps **"Place order"** in a shopping app:

```text
 Phone app ──HTTPS──▶ Load balancer ──▶ API server ──▶ Database
                                           │   ▲
                                           │   └── reads product prices, stock
                                           ├──▶ Payment provider (external API)
                                           └──▶ Queue ──▶ Worker ──▶ sends the confirmation email
```

1. **DNS and TLS.** The app looks up the API's address and opens an encrypted HTTPS connection.
2. **Load balancer.** The request arrives at a load balancer, which picks one of several identical API servers that is healthy.
3. **API server.** The server checks who the user is (authentication) and whether they may do this (authorisation), then validates the input.
4. **Business logic.** It loads real prices and stock from the database. It never trusts prices sent by the app.
5. **External services.** It asks the payment provider to charge the card.
6. **Database write.** It saves the order in a **transaction**, so either everything is saved or nothing is.
7. **Background work.** Slow tasks that the user doesn't need to wait for, like sending the email, are put on a **queue** for a worker to handle.
8. **Response.** The server returns a response such as `201 Created` with the order number, usually as JSON, within a few hundred milliseconds.

## APIs: how the frontend talks to the backend

The backend exposes an **API** (application programming interface): a defined set of requests it accepts. The most common style is a REST-like HTTP API with JSON:

```http
POST /api/orders HTTP/1.1
Host: api.shop.example
Authorization: Bearer <token>
Content-Type: application/json

{ "items": [{ "productId": "p_812", "quantity": 2 }] }
```

```json
{ "orderId": "o_5531", "status": "paid", "total": 2400 }
```

Other styles exist, such as **GraphQL** (the client asks for exactly the fields it needs) and **gRPC** (fast binary calls, common between internal services). The architectural idea is the same: a clear contract between the frontend and the backend.

## Inside a backend service: layers

Well-built backends separate concerns into layers, so each part has one job and can change without breaking the others:

```text
┌──────────────────────────────┐
│ API / transport layer        │  routes, request parsing, authentication, input validation
├──────────────────────────────┤
│ Business logic (services)    │  the rules: pricing, permissions, workflows
├──────────────────────────────┤
│ Data access (repositories)   │  queries to the database, caches and external APIs
└──────────────────────────────┘
```

- The **API layer** knows about HTTP but not about business rules.
- The **business logic** knows the rules but not whether the request came from a website, a mobile app or a scheduled job.
- The **data layer** knows how to store and fetch things, but not why.

This separation makes code easier to test (the business rules can be tested without a web server) and easier to change (you can switch databases without rewriting the rules).

## Non-functional requirements

Features describe *what* the system does. Architecture is mostly driven by *how well* it must do it:

| Quality | The question it answers |
|---|---|
| **Performance** | How fast does a request complete? |
| **Scalability** | What happens with 10× or 100× more users? |
| **Availability** | What share of the time is it up? 99.9% still allows about 8.8 hours of downtime a year |
| **Reliability** | Does it keep working correctly when parts of it fail? |
| **Security** | Can it resist people trying to misuse it? |
| **Maintainability** | Can the team change it quickly and safely? |

Every architecture decision trades these against each other and against cost. The next lessons show how.

> [!TIP]
> Next: [The building blocks](/academy/development/backend-systems/backend-building-blocks) — databases, caches, queues and storage, and when to use each.
