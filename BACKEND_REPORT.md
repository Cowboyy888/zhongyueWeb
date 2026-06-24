# Backend Report — 中粤铁网公司 / Zhongyu Steel Wire Group

**Site type:** Fully static HTML/CSS/JS — no server-side backend exists  
**Date:** 2026-06-24  
**Severity scale:** CRITICAL / HIGH / MEDIUM / LOW / INFO

---

## Executive Summary

This is a pure static website. There is no web server, no API, no database, and no form-processing backend of any kind. All apparent interactivity (form submission, newsletter sign-up) is simulated entirely in client-side JavaScript and produces no real output. This is acceptable for a brochure site, but several user-facing features imply functionality that does not exist.

---

## Missing Backend Capabilities

### 1. Contact / Inquiry Form — No Submission Endpoint
**Severity: HIGH**

The contact form (`#contact` section, `index.html` lines 852–896) collects name, company, email, phone, product interest, and inquiry details. The submit button handler (`script.js` lines 745–756) does the following:

```js
submitBtn.addEventListener('click', function () {
  btn.textContent = '✓ 提交成功 / Sent!';
  btn.classList.add('success');
  setTimeout(function () {
    btn.textContent = '提交询价 / Send Inquiry';
    btn.classList.remove('success');
  }, 3500);
});
```

No data is read from the form fields. No HTTP request is made. No email is sent. The user sees a green success state but their inquiry is silently discarded. This is the most critical missing backend feature — it is the primary commercial conversion action of the site.

**Recommendation:** Integrate one of the following:

- **Formspree** (`https://formspree.io`) — Add `action="https://formspree.io/f/{YOUR_ID}" method="POST"` to the `<form>` element; no backend code required. Supports email notifications and a spam filter.
- **EmailJS** (`https://www.emailjs.com`) — Client-side email SDK; requires only a free account and a short JS integration. Sends form data to a configured email address without any server.
- **Cloudflare Workers + Resend** — For more control: a Cloudflare Worker receives a POST from the form, validates fields server-side, and uses the Resend API to dispatch a formatted email. This also enables rate limiting and CSRF validation.

---

### 2. Newsletter Subscription — No Subscription Backend
**Severity: MEDIUM**

The footer newsletter form (`index.html` lines 940–948) collects an email address. The handler (`script.js` lines 759–769) clears the input and changes the placeholder to "✓ Subscribed!" — no email address is saved anywhere.

**Recommendation:**

- **Mailchimp Embedded Form** — Replace the custom form with a Mailchimp-generated embed snippet. Free tier supports up to 500 contacts.
- **Brevo (formerly Sendinblue)** — Provides an API endpoint suitable for Cloudflare Workers POST integration.
- **ConvertKit** — Straightforward JavaScript API integration; widely used for B2B lead capture.

---

### 3. No Server-Side Form Validation
**Severity: HIGH**

All form fields (`input[type=text]`, `input[type=email]`, `input[type=tel]`, `select`, `textarea`) rely solely on HTML5 browser-native validation, which is easily bypassed. There is no client-side JavaScript validation beyond checking whether the newsletter input is non-empty (`if (input && input.value)`).

- Email fields are `type="email"` which provides basic browser-level format checking, but this is not enforced on submission since the form has no `action` and is triggered by a button `click` (not `submit`).
- The phone field (`type="tel"`) accepts any string.
- No required-field checking is performed before showing the success state.

**Recommendation:** Add a `submit` event listener (not `click`) that validates all required fields before proceeding. If using Formspree or a Worker, add server-side schema validation (e.g., using Zod or a regex check on the email field).

---

### 4. No Rate Limiting
**Severity: MEDIUM**

Because there is currently no backend, there is no rate limiting. Once a backend is added (via Cloudflare Workers or any other mechanism), rate limiting must be implemented to prevent form spam and email flooding.

**Recommendation:**

- **Cloudflare Workers Rate Limiting** — Native `RateLimit` binding; allows N requests per IP per minute at the Worker level before any email is sent.
- **Cloudflare Turnstile** — CAPTCHA-free bot challenge widget that integrates with any form. A free plan is available and it is less intrusive than reCAPTCHA.
- **hCaptcha** — Accessible alternative to reCAPTCHA; simple JavaScript embed.

---

### 5. No CSRF Protection
**Severity: MEDIUM** *(relevant once a real backend is added)*

Static forms without a server-side action have no CSRF exposure today. However, as soon as a form submission endpoint is introduced, CSRF tokens must be included or the endpoint must validate the `Origin`/`Referer` header.

**Recommendation:** When implementing the backend, use a same-site cookie strategy or generate a CSRF token per page load and validate it server-side.

---

### 6. No Email Infrastructure
**Severity: INFO**

The site references `sales@zhongyutiewang.com` and `tech@zhongyutiewang.com`. There is no evidence that SPF, DKIM, or DMARC DNS records exist for the domain. If outbound transactional email is added, deliverability will be poor without these DNS records.

**Recommendation:** Before integrating any email-sending service, publish:
- An `SPF` TXT record authorizing the sending service's IP ranges.
- A `DKIM` TXT record with the public key provided by the sending service.
- A `DMARC` TXT record (`v=DMARC1; p=quarantine; rua=mailto:dmarc@zhongyutiewang.com`).

---

## Recommended Lightweight Backend Architecture

For a site of this scale, the simplest production-ready path is:

```
Browser form submit (fetch POST)
    ↓
Cloudflare Worker (free tier)
    - Validate CSRF token / Origin header
    - Server-side field validation (name, email format, phone non-empty)
    - Rate limit by IP (Cloudflare RateLimit binding)
    - Turnstile token verification
    ↓
Resend API (or Mailgun)
    - Send formatted inquiry email to sales@zhongyutiewang.com
    - Send auto-reply confirmation to submitter
    ↓
(Optional) D1 / KV Store
    - Log inquiry with timestamp for CRM sync
```

This entire stack costs $0/month at current traffic assumptions and requires no dedicated server.

---

## Summary Table

| Feature | Current State | Severity | Recommended Fix |
|---|---|---|---|
| Contact form submission | Fake (JS only) | HIGH | Formspree / EmailJS / CF Worker |
| Newsletter subscription | Fake (JS only) | MEDIUM | Mailchimp / Brevo embed |
| Server-side validation | None | HIGH | CF Worker + Zod schema |
| Rate limiting | None | MEDIUM | CF Rate Limiting / Turnstile |
| CSRF protection | N/A (no backend yet) | MEDIUM | Origin check + token on backend |
| Email deliverability | No DNS records verified | INFO | SPF + DKIM + DMARC |
