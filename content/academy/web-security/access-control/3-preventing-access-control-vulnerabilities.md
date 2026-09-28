---
title: Preventing access control vulnerabilities
slug: preventing-access-control-vulnerabilities
track: web-security
module: access-control
order: 3
level: practitioner
roles: [dev, blue]
duration: 12 min
prerequisites: [what-is-access-control, insecure-direct-object-references]
objectives:
  - Apply deny-by-default and centralised authorisation
  - Choose between role-based and attribute-based access control
  - Build tests that stop access control regressions
updated: "2026-09-28"
authors: [kodesec-research]
---

Finding access control bugs is useful. Designing systems where they rarely appear is better. These principles come up again and again in the fixes we recommend after penetration tests.

## 1. Deny by default

Every route should be **closed unless a rule explicitly opens it**. Frameworks make this easy with a global middleware that rejects requests unless the handler declares its permission:

```ts
// Every route must declare a policy, or the request is rejected.
router.get("/invoices/:id", policy("invoice:read"), getInvoice);
router.delete("/invoices/:id", policy("invoice:delete"), deleteInvoice);
```

If a developer forgets the policy, the result is a `403`, not a data leak.

## 2. Centralise the decision

Don't scatter `if (user.role === "admin")` through hundreds of handlers. Put authorisation logic in **one place**, a policy module or service, so it can be reviewed, tested and changed safely.

| Approach | Good for | Watch out for |
|---|---|---|
| **RBAC** (role-based) | Clear job roles: admin, editor, viewer | Role explosion as rules get specific |
| **ABAC** (attribute-based) | Rules like "owner of the record, in the same tenant, during business hours" | More complex to test and debug |
| **ReBAC** (relationship-based) | Sharing models: teams, folders, documents | Needs a dedicated engine at scale |

Most applications use **RBAC for functions** plus **ownership checks for data**.

## 3. Never trust the client

Anything that comes from the browser or mobile app can be changed: hidden form fields, cookies, JSON bodies, headers. Derive identity and permissions from the **server-side session or a verified token**, never from a field such as `role` or `isAdmin` in the request.

> [!CAUTION]
> Mass assignment is a quiet cousin of this problem. If your API binds the whole request body to a model, a user can add `"role": "admin"` to a profile update. Allow-list the fields each endpoint may change.

## 4. Enforce it in every layer and channel

The web app, mobile API, GraphQL resolvers, background jobs and admin tools must all use the **same** policy code. Attackers look for the one channel that skipped it.

## 5. Test for it continuously

Access control bugs are regressions waiting to happen. Add automated tests that act as **two different users** and assert that each one is denied the other's data:

```ts
it("user A cannot read user B's invoice", async () => {
  const invoice = await createInvoice({ owner: userB });
  const res = await api.as(userA).get(`/invoices/${invoice.id}`);
  expect(res.status).toBe(404);
});
```

Run them in CI on every pull request, next to your functional tests.

## 6. Log and alert on denials

A spike in `403` responses from one account is often someone probing IDs. Log authorisation failures with the user, resource and action, and alert when they cross a threshold.

## Checklist

- [ ] Routes are denied by default
- [ ] Authorisation logic lives in one reviewed module
- [ ] Data queries are scoped to the current user or tenant
- [ ] Request bodies are allow-listed (no mass assignment)
- [ ] Every channel (web, mobile, GraphQL, jobs) uses the same policies
- [ ] Two-user tests run in CI
- [ ] Authorisation failures are logged and alerted on

> [!TIP]
> Want a second pair of eyes? A focused access control review is one of the fastest, highest-value security tests you can run before a launch.
