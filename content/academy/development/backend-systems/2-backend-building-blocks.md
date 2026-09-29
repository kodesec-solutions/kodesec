---
title: "The building blocks: databases, caches, queues and storage"
slug: backend-building-blocks
track: development
module: backend-systems
order: 2
level: practitioner
roles: [dev]
duration: 15 min
prerequisites: [what-is-a-backend-system]
objectives:
  - Choose between relational and non-relational databases for a use case
  - Use a cache correctly, including expiry and invalidation
  - Move slow work to queues and background workers
  - Know where files, authentication and observability fit in
updated: "2026-09-29"
authors: [kodesec-research]
---

Almost every backend, from a startup's first API to a large platform, is built from the same handful of components. Knowing what each one is good at, and what it costs, is most of backend architecture.

## Databases: the source of truth

The database holds the data that must not be lost: users, orders, payments. Two broad families:

| | Relational (SQL) | Non-relational (NoSQL) |
|---|---|---|
| Examples | PostgreSQL, MySQL, SQL Server | MongoDB (documents), DynamoDB and Cassandra (key-value / wide-column), Redis (in-memory) |
| Data shape | Tables with a fixed schema and relationships | Flexible documents or simple key → value |
| Strengths | Transactions, joins, strong consistency, mature tooling | Flexible schemas, very large scale for known access patterns |
| Typical use | Most business applications | Event data, catalogues, very high write volumes |

> [!TIP]
> If you're unsure, **start with PostgreSQL**. It handles the needs of most products for a long time, supports JSON when you need flexibility, and its transactions protect you from whole classes of bugs.

### Transactions

A **transaction** groups several changes so they all succeed or all fail together. Transferring money must debit one account *and* credit the other, never just one:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE id = 1;
UPDATE accounts SET balance = balance + 500 WHERE id = 2;
COMMIT;   -- or ROLLBACK if anything failed
```

### Indexes

An **index** lets the database find rows without scanning the whole table, like the index at the back of a book. A query that takes seconds on a million rows can take milliseconds with the right index. Indexes aren't free, though: each one uses space and slows down writes a little, so add them for the queries you actually run.

## Caches: fast answers to repeated questions

A **cache** stores the result of an expensive operation in fast memory, usually **Redis**, so the next request gets it without touching the database. The most common pattern is **cache-aside**:

```text
1. Look in the cache        → found? return it (a "hit")
2. Not found (a "miss")     → read from the database
3. Store it in the cache with an expiry time (TTL), then return it
```

Caching is powerful but brings its own problems:

- **Stale data.** The cache can hold an old value after the database changes. Set a sensible **TTL** and delete the cache entry when the data is updated (*invalidation*).
- **Never cache per-user private data under a shared key.** A cache key like `profile` instead of `profile:<userId>` can show one user's data to another.
- **The cache must be optional.** If Redis goes down, the system should get slower, not stop working.

## Queues and background workers

Some work is slow, unreliable or not needed right away: sending emails, generating PDFs, resizing images, calling a slow partner API. Doing it during the request makes users wait, and a failure ruins the whole request.

Instead, the API puts a **message** on a **queue** and responds immediately. Separate **worker** processes take messages off the queue and do the work:

```text
API ──"send receipt for o_5531"──▶ Queue ──▶ Worker ──▶ Email provider
 └─ responds to the user at once              └─ retries on failure
```

Common tools: RabbitMQ, Amazon SQS, Google Pub/Sub, and Redis-based job queues such as BullMQ. For streams of events that many consumers read, there's Apache Kafka.

Two rules keep queues safe:

1. **Make jobs idempotent.** Messages can be delivered more than once, so running the same job twice must not send two emails or charge twice. Record what's already been done, for example by order ID.
2. **Handle poison messages.** A job that fails every time should go to a **dead-letter queue** after a few retries, not loop forever.

## File storage

Uploaded images, documents and backups don't belong in the database or on the API server's disk. They go in **object storage** such as Amazon S3, Cloudflare R2 or Google Cloud Storage: cheap, durable, and served through a CDN. The database stores only the file's key and metadata.

> [!WARNING]
> Keep storage buckets **private by default** and hand out short-lived *signed URLs* for downloads. Publicly listable buckets are one of the most common causes of data leaks.

## Authentication and authorisation

- **Authentication**: who is this? Usually a session cookie or a token (such as a JWT) issued after login, often through an identity provider (OAuth / OpenID Connect).
- **Authorisation**: may they do this? It's checked on **every** request, on the server, for the specific object being accessed. Our [access control lessons](/academy/web-security/access-control) cover how this goes wrong.

## Observability: seeing inside the system

You can't fix what you can't see. Production backends emit three kinds of signals:

| Signal | Answers | Example |
|---|---|---|
| **Logs** | What happened? | `order o_5531 payment failed: card_declined` |
| **Metrics** | How much, how fast, how often? | requests per second, error rate, p95 latency |
| **Traces** | Where did the time go in one request? | API 20 ms → database 180 ms → payment API 900 ms |

Add health-check endpoints and alerts on error rate and latency, so you learn about problems before your users tell you. Never write passwords, tokens or card numbers to logs.

## Putting it together

```text
                       ┌──▶ PostgreSQL (source of truth)
 Clients ─▶ Load  ─▶ API ──▶ Redis (cache)
            balancer   ├──▶ Object storage (files)
                       └──▶ Queue ─▶ Workers ─▶ email, PDFs, partner APIs
            logs · metrics · traces from every part
```

> [!TIP]
> Next: [Architecture styles and scaling](/academy/development/backend-systems/architecture-styles-and-scaling) — monoliths, microservices, and how systems grow.
