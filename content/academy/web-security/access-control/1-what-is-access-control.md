---
title: What is access control?
slug: what-is-access-control
track: web-security
module: access-control
order: 1
level: beginner
roles: [red, dev]
duration: 10 min
prerequisites: []
objectives:
  - Explain the difference between authentication, session management and access control
  - Recognise vertical, horizontal and context-dependent access control
  - Understand why broken access control is so common
updated: "2026-09-28"
authors: [kodesec-research]
---

Access control is how an application decides **whether the current user is allowed to perform the action they are asking for**. It sits on top of two other mechanisms:

- **Authentication** confirms *who* the user is (for example with a password and a second factor).
- **Session management** remembers that identity across requests (usually with a cookie or token).
- **Access control** decides *what that identity may do*: read this invoice, delete that user, approve this payment.

If authentication is the front door lock, access control is the set of keys that opens each room inside. A building with a perfect front door but one master key for every room is not secure.

> [!NOTE]
> Broken Access Control has been the **#1 category in the OWASP Top 10** since 2021. It shows up in almost every penetration test, because it depends on business rules that scanners can't understand.

## The three kinds of access control

### Vertical access control

Different *types* of users get different functions. A normal user can view their profile; an administrator can also delete accounts. A **vertical** flaw lets a lower-privileged user reach a higher-privileged function, such as an admin panel.

### Horizontal access control

Users of the *same* type can reach only their *own* resources. You can read your bank statements but not your neighbour's. A **horizontal** flaw lets one user reach another user's data. This is usually called an IDOR, which the next lesson covers.

### Context-dependent access control

What's allowed depends on the **state** of the application or a process. For example, you can't change an order after it has shipped, or skip the payment step in a checkout. A **context-dependent** flaw lets the user perform an action out of order.

## Why it breaks so often

Access control is hard to get right because it is **spread across the whole application**. Every endpoint, button and API call has to make the right decision, and a single missing check is enough. Common root causes:

1. **Checks only in the user interface.** Hiding the "Delete" button is not a security control. The request can still be sent directly.
2. **Trusting input from the client.** Values such as `role=admin`, `isAdmin=true` or a user ID in the URL can be changed by the user.
3. **New endpoints without checks.** A new API route added in a hurry skips the middleware the older routes use.
4. **Inconsistent rules between services.** The web app checks permissions, but the mobile API behind it doesn't.

```http
GET /admin/users HTTP/1.1
Host: shop.example
Cookie: session=<normal user session>
```

If this request returns the user list, the server is relying on the fact that normal users never *see* a link to `/admin/users`. It is not actually enforcing anything.

> [!WARNING]
> Only test applications you own or have **written permission** to test. Testing access control on someone else's system without authorisation is illegal in most countries.

## Key takeaways

- Access control answers "is **this** user allowed to do **this** action on **this** resource?"
- Flaws can be vertical (privilege escalation), horizontal (other users' data) or context-dependent (breaking a process).
- The server must enforce every decision. Hiding things in the interface protects nothing.
