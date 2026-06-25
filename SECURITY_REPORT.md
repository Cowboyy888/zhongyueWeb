# Security Report — 中粤铁网公司 / Zhongyue Steel Wire Group

**Site type:** Static HTML/CSS/JS  
**Date:** 2026-06-24  
**Severity scale:** CRITICAL / HIGH / MEDIUM / LOW / INFO

---

## Executive Summary

Eight security issues were identified across the three source files. None are exploitable today under the current fully-static deployment (no server, no database, no authenticated users). However, several issues create latent risk that would become actively exploitable if the codebase is extended with a backend, user-generated content, or a stricter hosting environment. Issues are ordered by potential impact.

---

## Issue 1 — XSS via `innerHTML` in i18n `setLang()` Function
**Severity: MEDIUM** *(latent; exploitable if data source changes)*  
**File:** `script.js`, line 268

```js
// script.js line 266–269
document.querySelectorAll('[data-i18n]').forEach(function(el) {
    var key = el.getAttribute('data-i18n');
    if (data[key] !== undefined) el.innerHTML = data[key];  // line 268
});
```

The `i18nData` object (`script.js` lines 9–259) is currently a hardcoded in-page literal, so no external data can currently reach this sink. However:

1. Several translation values intentionally contain raw HTML (e.g., `'<em>'` tags in titles, `'<a>'` tags in `footer-copy`, `'<svg>'` elements in `p-quote` and `contact-map-btn`). This means `innerHTML` was deliberately chosen over `textContent`.
2. If `i18nData` is ever loaded from an external JSON endpoint, a CMS, or URL parameters, any untrusted string assigned to a `data-i18n` key would execute arbitrary JavaScript in the user's browser.

**Recommendation:**
- For keys that only contain plain text, replace `el.innerHTML = data[key]` with `el.textContent = data[key]`.
- For keys that legitimately require HTML markup (titles with `<em>`, links, SVG icons), maintain an explicit allowlist and use a safe HTML sanitizer (DOMPurify) before assigning to `innerHTML`.
- Alternatively, refactor to use a DOM-building approach for structured content rather than raw HTML strings.

---

## Issue 2 — Contact Form: No Real Validation, No CSRF, Fake Success
**Severity: HIGH**  
**File:** `script.js`, lines 745–756

```js
// script.js lines 745–756
var submitBtn = document.getElementById('submit-btn');
if (submitBtn) {
    submitBtn.addEventListener('click', function () {
        var btn = this;
        btn.textContent = '✓ 提交成功 / Sent!';
        btn.classList.add('success');
        setTimeout(function () {
            btn.textContent = '提交询价 / Send Inquiry';
            btn.classList.remove('success');
        }, 3500);
    });
}
```

- The handler listens on `click` rather than the form's `submit` event, so native browser validation (`required`, `type="email"`) is completely bypassed.
- No field values are read or validated before the success state is shown.
- No HTTP request is made — the submission is entirely fake.
- When a real backend is wired in, there will be no CSRF token mechanism.

**Recommendation:**
- Change the listener to `form.addEventListener('submit', ...)` and call `e.preventDefault()` only after validation passes.
- Validate all required fields explicitly in JS before dispatching a `fetch()` POST.
- On the backend, verify a CSRF token or at minimum check the `Origin` header.
- See `BACKEND_REPORT.md` for endpoint recommendations.

---

## Issue 3 — WhatsApp FAB Hardcodes Phone Number Without `noreferrer`
**Severity: LOW**  
**File:** `index.html`, line 967

```html
<!-- index.html line 967 -->
<a href="https://wa.me/862088886688" class="fab fab-wa" target="_blank" rel="noopener" aria-label="WhatsApp咨询">
```

Two sub-issues:

1. **Incomplete `rel` attribute:** The link has `rel="noopener"` but is missing `noreferrer`. Without `noreferrer`, the full `document.referrer` URL is sent to WhatsApp's servers as an HTTP `Referer` header. Adding `noreferrer` also implies `noopener`, so `rel="noopener noreferrer"` is the correct combination.
2. **Hardcoded phone number:** The phone number `+862088886688` is embedded in a plaintext `href`. If this number changes, it must be updated in the HTML. Consider storing it in a CSS custom property or a data attribute that is set in one place (e.g., a JavaScript constant alongside the other contact details).

**Recommendation:** Change to `rel="noopener noreferrer"` immediately. Centralise the phone number.

---

## Issue 4 — Inline `onclick` Handlers Violate CSP Best Practices
**Severity: LOW**  
**File:** `index.html`, lines 50–51

```html
<!-- index.html lines 50–51 -->
<button class="lang-btn active" data-lang="zh" onclick="setLang('zh')">中文</button>
<button class="lang-btn" data-lang="en" onclick="setLang('en')">EN</button>
```

Inline `onclick` attributes require `'unsafe-inline'` in the `script-src` directive of any Content Security Policy. A strict CSP that omits `'unsafe-inline'` would block these handlers silently. `setLang` is also a global function (declared at the top level of `script.js` outside any IIFE), which unnecessarily pollutes the global namespace.

**Recommendation:**
- Remove the `onclick` attributes from the HTML.
- In `script.js`, add event listeners programmatically:
  ```js
  document.querySelectorAll('.lang-btn').forEach(function(btn) {
      btn.addEventListener('click', function() { setLang(this.dataset.lang); });
  });
  ```
- This allows the site to be deployed with a strict `script-src 'nonce-...'` or `script-src 'strict-dynamic'` CSP.

---

## Issue 5 — External CDN Scripts Loaded Without Subresource Integrity (SRI) Hashes
**Severity: MEDIUM**  
**File:** `index.html`, lines 977–979

```html
<!-- index.html lines 977–979 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
```

All three external scripts are loaded without `integrity` attributes. If a CDN is compromised or the file is altered (supply-chain attack), malicious JavaScript would execute in the context of the page with full access to the DOM, including the contact form fields.

**Recommendation:** Generate SHA-384 hashes for each pinned version and add `integrity` and `crossorigin` attributes:

```html
<script
  src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
  integrity="sha384-HASH_HERE"
  crossorigin="anonymous"></script>
```

SRI hashes can be generated at `https://www.srihash.org` or via:
```
openssl dgst -sha384 -binary gsap.min.js | openssl base64 -A
```

Alternatively, vendor these libraries locally (copy into a `vendor/` directory) and serve them from the same origin, eliminating the CDN dependency entirely.

---

## Issue 6 — Newsletter Form Has No Email Format Validation
**Severity: LOW**  
**File:** `script.js`, lines 759–769

```js
// script.js lines 761–768
newsletterBtn.addEventListener('click', function () {
    var input = document.getElementById('newsletter-input');
    if (input && input.value) {          // only checks non-empty
        input.value = '';
        input.placeholder = '✓ Subscribed!';
        ...
    }
});
```

The only check is `input.value` (truthy / non-empty). Any non-empty string — including `"abc"`, `"@"`, or a single space — passes the guard. The `<input type="email">` element in the footer (`index.html` line 944) would provide browser-level email validation if the handler used a `submit` event on a `<form>` element, but the button is a standalone `<button>` with no enclosing form.

**Recommendation:**
- Wrap the newsletter input and button in a `<form>` and listen to the `submit` event.
- Alternatively, validate with a regex in JS before proceeding:
  ```js
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(input.value.trim())) { /* show error */ return; }
  ```
- Once a real subscription backend is added, also validate server-side.

---

## Issue 7 — Placeholder ICP License Number in Footer
**Severity: HIGH** *(legal/compliance, not a technical security issue)*  
**File:** `index.html`, line 955

```html
<!-- index.html line 955 -->
<p data-i18n="footer-copy">© 2025 中粤铁网公司. 版权所有. | <a href="#">粤ICP备XXXXXXXX号</a></p>
```

The ICP (Internet Content Provider) registration number is a placeholder: `粤ICP备XXXXXXXX号`. Operating a website accessible from mainland China without a valid ICP license is a legal violation under Chinese law and can result in the site being blocked or the company being fined. The placeholder `XXXXXXXX` indicates the real license number was never inserted.

Note: The same placeholder exists in the Chinese-language translation in `script.js` line 132 (`'footer-copy': '© 2025 中粤铁网公司. 版权所有. | <a href="#">粤ICP备XXXXXXXX号</a>'`), while the English translation (`script.js` line 257) correctly omits the ICP reference.

**Recommendation:**
1. Obtain a valid ICP license from the Ministry of Industry and Information Technology (MIIT) of China.
2. Replace `XXXXXXXX` with the real license number.
3. Ensure the license link points to the MIIT verification page (`https://beian.miit.gov.cn/`).

---

## Issue 8 — `target="_blank"` Links: Inconsistent `rel` Attribute
**Severity: LOW**  
**File:** `index.html`, lines 829 and 967

There are two `target="_blank"` links in the document:

| Line | href | rel attribute |
|------|------|---------------|
| 829 | `https://maps.app.goo.gl/GF7nsNkSXihumGZe7` | `rel="noopener noreferrer"` — **Correct** |
| 967 | `https://wa.me/862088886688` | `rel="noopener"` — **Incomplete** (missing `noreferrer`) |

The Google Maps link is correct. The WhatsApp FAB link is missing `noreferrer` (see Issue 3 above for detail).

No other `target="_blank"` links exist in the document. The footer social links (`index.html` lines 913–917) use `href="#"` so they do not open new tabs.

**Recommendation:** Update line 967 to `rel="noopener noreferrer"`.

---

## Summary Table

| # | Issue | File | Line(s) | Severity |
|---|---|---|---|---|
| 1 | `innerHTML` in i18n `setLang()` — latent XSS | script.js | 268 | MEDIUM |
| 2 | Contact form: no validation, no CSRF, fake submit | script.js | 745–756 | HIGH |
| 3 | WhatsApp FAB missing `noreferrer` | index.html | 967 | LOW |
| 4 | Inline `onclick` handlers violate CSP | index.html | 50–51 | LOW |
| 5 | CDN scripts loaded without SRI hashes | index.html | 977–979 | MEDIUM |
| 6 | Newsletter has no email format validation | script.js | 759–769 | LOW |
| 7 | Placeholder ICP license number | index.html | 955 | HIGH |
| 8 | `target="_blank"` missing `noreferrer` on WhatsApp link | index.html | 967 | LOW |
