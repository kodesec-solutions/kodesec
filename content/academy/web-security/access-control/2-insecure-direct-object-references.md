---
title: Insecure direct object references (IDOR)
slug: insecure-direct-object-references
track: web-security
module: access-control
order: 2
level: practitioner
roles: [red, dev]
duration: 15 min
prerequisites: [what-is-access-control]
objectives:
  - Identify where an application exposes object identifiers
  - Test for horizontal access control flaws safely
  - Understand why unpredictable IDs are not a fix
updated: "2026-09-28"
authors: [kodesec-research]
---

An **insecure direct object reference (IDOR)** happens when an application uses an identifier supplied by the user to fetch an object, **without checking that the user is allowed to access that object**.

It is the most common horizontal access control flaw, and often one of the most damaging: a single IDOR in an API can expose every customer record in a database.

## What it looks like

A user opens their invoice:

```http
GET /api/invoices/10432 HTTP/1.1
Authorization: Bearer <token for user A>
```

The server looks up invoice `10432` and returns it. What happens if user A asks for `10433`?

```http
GET /api/invoices/10433 HTTP/1.1
Authorization: Bearer <token for user A>
```

If the server returns someone else's invoice, it checked **that the user is logged in**, but not **that the invoice belongs to them**. That's an IDOR.

The vulnerable code often looks like this:

```js
// ❌ Vulnerable: any logged-in user can read any invoice
app.get("/api/invoices/:id", requireLogin, async (req, res) => {
  const invoice = await db.invoice.findUnique({ where: { id: req.params.id } });
  res.json(invoice);
});
```

## Where identifiers hide

IDs aren't always in the URL path. Look for them in:

- **Query strings:** `/download?file=report-2291.pdf`
- **Request bodies:** `{"accountId": 5512, "amount": 100}`
- **Headers and cookies:** `X-User-Id: 88`
- **GraphQL arguments:** `user(id: "88") { email }`
- **File names and paths:** `/uploads/users/88/passport.jpg`

## How to test for it

1. Create **two test accounts** (A and B) with the same role. Never use real customers' accounts.
2. As account B, create or find a resource and note its identifier.
3. As account A, repeat the request for B's resource, changing only the identifier.
4. Try every method the endpoint supports: `GET`, `PUT`, `PATCH`, `DELETE`. Read access is often checked, write access often isn't.
5. Compare the responses. Data, a `200 OK`, or even a different error message can confirm the flaw.

> [!TIP]
> A `403 Forbidden` for B's resource but a `404 Not Found` for an ID that doesn't exist tells an attacker which IDs are real. Well-built APIs return the same response in both cases.

## "Our IDs are random, so we're safe"

Using UUIDs such as `3f2a…-9c1e` instead of `10432` makes guessing harder, but it **does not fix the flaw**. Identifiers leak all the time: in shared links, emails, browser history, logs, other API responses and referrer headers. The only fix is an authorisation check on the server.

## The fix

Scope every lookup to the current user (or check ownership explicitly):

```js
// ✅ Fixed: the query itself enforces ownership
app.get("/api/invoices/:id", requireLogin, async (req, res) => {
  const invoice = await db.invoice.findFirst({
    where: { id: req.params.id, ownerId: req.user.id },
  });
  if (!invoice) return res.status(404).end();
  res.json(invoice);
});
```

> [!WARNING]
> Only test applications you own or have **written permission** to test.

## Key takeaways

- An IDOR is a missing ownership check, not a guessable ID.
- Test every place an identifier appears, and every HTTP method.
- Fix it on the server by scoping data access to the authenticated user.
