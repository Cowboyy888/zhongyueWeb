# Architecture Report — 中粤铁网公司 / Zhongyue Steel Wire Group
Generated: 2026-06-24

---

## 1. Project Overview

The site is a fully static, single-page application (SPA) with no build tooling, no module system, and no server-side component. It consists of four asset types:

| File | Size | Lines |
|---|---|---|
| `index.html` | ~50 KB | 982 |
| `style.css` | ~54 KB | 1,795 |
| `script.js` | ~44 KB | 784 |
| `images/` | ~53 MB total | 19 files |

All runtime logic — i18n, animations, scroll effects, canvas rendering, form handling — lives in a single, imperative `script.js`.

---

## 2. Dependency Model

All third-party libraries are loaded from CDN at runtime via `<script>` tags in `index.html`. There is no `package.json`, no lockfile, and no local copies pinned to a specific version:

- **Lenis** (smooth scroll) — Lenis v1 from CDN
- **GSAP + ScrollTrigger** — from CDN
- **No Three.js** — the file header comment says "Three.js mesh background" but no Three.js library is actually imported or used; the canvas background is vanilla 2-D Canvas API

Severity: **MEDIUM** — CDN libraries will silently change or break when the upstream version is updated. A version pin in the URL (or a lockfile) would prevent this.

---

## 3. Monolithic File Architecture

### 3.1 `script.js` — single flat IIFE

All JavaScript is structured as:
1. A top-level `i18nData` object (lines 9–260, ~52% of the file by line count).
2. A `setLang()` function (lines 262–278).
3. A self-invoking IIFE `(function(){ ... })()` (lines 286–784) that sequentially initialises every feature: mobile menu, Lenis, GSAP animations, canvas loops, parallax, testimonials, counters, timeline progress, FAB visibility, nav highlighting, form handler, spec-card tilt, and Intersection Observer for lazy sections.

There are no ES modules, no class definitions, and no separation of concerns between features. Adding or removing a section requires manually locating the relevant code block among unrelated initialisation code.

Severity: **LOW** — Appropriate for the current project scale. Becomes a maintainability liability if the site grows. Mitigation would be to split into feature modules (e.g., `i18n.js`, `hero.js`, `animations.js`) and bundle with a lightweight tool like esbuild or Vite.

### 3.2 `style.css` — single flat stylesheet

1,795 lines with sections delimited by ASCII banner comments. No CSS custom properties beyond `:root` variables (which are used well). No nesting, no layers (`@layer`), no scoping. Styles for unrelated sections (hero, about, facility, products, footer) are all concatenated.

Severity: **LOW** — Manageable at this scale, but a `@layer`-based structure or SCSS partials would improve maintainability.

---

## 4. i18n System

### 4.1 Design

A client-side bilingual system (Chinese / English) stores all translated strings in a single `i18nData` object keyed `zh` / `en`. On page load, `localStorage` is checked for a previously selected language and `setLang()` is called. Language buttons trigger `setLang()` manually.

The mechanism uses two `data-*` attributes:
- `data-i18n="key"` — sets `el.innerHTML = data[key]`
- `data-i18n-placeholder="key"` — sets `el.placeholder = data[key]`

### 4.2 XSS Architecture Risk

Severity: **MEDIUM**

`script.js` line 268:
```js
if (data[key] !== undefined) el.innerHTML = data[key];
```

`innerHTML` is used for all translated content. This is intentional — some values contain HTML tags like `<em>`, `<br/>`, and inline SVG (e.g., `contact-map-btn` at line 241 is an SVG string). However, the pattern is architecturally unsound:

- If `i18nData` is ever loaded from an external source (CMS, API, user input), any untrusted string injected via this path becomes an XSS vector affecting all elements decorated with `data-i18n`.
- Currently the data is entirely hardcoded, so the immediate risk is low.

Recommendation: Audit which keys genuinely require HTML and use `textContent` for all plain-text keys. For keys that require HTML, validate or sanitise with DOMPurify before assignment.

### 4.3 `lang` Attribute Synchronisation

`setLang()` correctly updates `document.documentElement.lang` (line 265), but the initial HTML declares `lang="zh-CN"` and the `zh` path in `setLang()` is never explicitly called on load — only `en` triggers a call. This means the `lang` attribute always starts as `zh-CN` on first load regardless of the user's browser language preference.

Severity: **LOW**

---

## 5. Form Backend

The contact form (lines 852–893 of `index.html`) has no backend. The submit handler (script.js lines 745–756) simply changes the button label to "✓ 提交成功 / Sent!" after a 3.5-second timeout and resets it. No data is transmitted. The newsletter subscription handler (lines 759–769) is equally non-functional — it clears the input and changes the placeholder.

Severity: **HIGH** — Visitors who submit inquiries receive no confirmation, and no data reaches the business. This is a critical business gap, not merely a code quality issue. Integration with a backend (Formspree, EmailJS, a server endpoint, or Cloudflare Workers) is required before the site can accept live traffic.

---

## 6. Build & Deployment Pipeline

There is no build pipeline, no CI/CD configuration, no `.gitignore`, and no deployment manifest. The site is ready to deploy as static files to any CDN or static host (Cloudflare Pages, Netlify, GitHub Pages) with zero configuration, which is appropriate.

However, without a build step:
- CSS and JS are unminified (~148 KB combined uncompressed, though both files are likely to compress well with gzip/Brotli to ~30–40 KB).
- Images are unoptimised (see Performance Report for details).
- No content hashing for cache busting; a `style.css` change will not be reflected for users with a cached version unless the server sets a short `max-age`.

Severity: **MEDIUM** — Adding a minimal build step (esbuild + an image optimisation script) would reduce total payload from ~53 MB (images) to potentially under 5 MB for the same visual quality.

---

## 7. Critical Bug: Hero Section Permanently Invisible

Severity: **CRITICAL**

Four hero elements are set to `opacity: 0` in CSS and are never animated back to visible:

| Element | CSS line | GSAP animation |
|---|---|---|
| `.hero-tagline` | 421 | None |
| `.hero-desc` | 433 | None |
| `.hero-btns` | 439 | None |
| `.hero-stats-bar` | 479 | None |

`script.js` contains no `gsap.to()`, `gsap.from()`, or `gsap.fromTo()` call that targets any of these four selectors. The only hero-related GSAP interaction is the `[data-count]` counter animation on `.meta-num` elements (script.js lines 566–583), which animates the counter numbers inside the stats bar — but the bar itself remains at `opacity: 0`, so those counters are also invisible.

The hero-brand block (`.hero-brand-en`, `.hero-brand-cn`) and badge (`.hero-badge`) have no CSS `opacity: 0` initial state and are visible by default, giving the false impression that the hero section works. In practice, the section shows only the background video/image, the brand wordmark, and the badge. The tagline, description, CTA buttons, and stats bar are completely hidden from every visitor.

This bug is documented in detail in `FRONTEND_REPORT.md`.

---

## 8. Summary of Severity Ratings

| Area | Issue | Severity |
|---|---|---|
| Hero animation | opacity:0 never resolved for 4 elements | CRITICAL |
| Form backend | No form submission — data never reaches business | HIGH |
| i18n XSS | innerHTML used for all translations | MEDIUM |
| CDN deps | No version pins, no lockfile | MEDIUM |
| Build pipeline | No minification, no image optimisation | MEDIUM |
| Monolithic files | All logic in single files | LOW |
| lang attribute | zh path never explicitly set on load | LOW |
