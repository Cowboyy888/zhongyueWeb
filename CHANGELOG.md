# Changelog — 中粤铁网公司 Website
> Harness Engineering System — Iteration 1 · 2026-06-24

---

## [1.1.0] — 2026-06-24

### Critical Fixes

#### Hero Content Permanently Invisible (CRITICAL BUG — script.js)
- **Problem:** `.hero-tagline`, `.hero-desc`, `.hero-btns`, and `.hero-stats-bar` all had `opacity: 0` set in `style.css` (lines 421, 433, 439, 479) but no GSAP animation ever restored their visibility. CTA buttons, description, tagline, and stats row were completely invisible on every page load.
- **Fix:** Added `initHeroEntrance()` GSAP timeline in `script.js` that runs 250ms after load and staggers all four elements into view with `power3.out` easing. Also added a `meta-num` counter scroll-trigger for the hero stats (previously only triggered via `[data-count]` which duplicated work).
- **Why it matters:** Visitors saw only the background image and the brand wordmark — all conversion-critical content (CTA buttons, description, stats) was hidden.

#### Lenis Double-Ticking (HIGH — script.js)
- **Problem:** `lenis.raf()` was called twice per frame — once from a manual `requestAnimationFrame` loop and once from `gsap.ticker.add()`. This caused scroll jank and CPU waste.
- **Fix:** Removed the manual RAF loop when GSAP is available. Lenis now ticks exclusively through `gsap.ticker`, which is the correct integration pattern. The manual RAF path is preserved as a fallback when GSAP is absent.
- **Also removed:** Deprecated `smooth: true` option from Lenis constructor.

---

### Accessibility Fixes

#### Skip-to-Content Link (WCAG 2.4.1 — index.html + style.css)
- Added `<a class="skip-link" href="#home">` as first child of `<body>`.
- Added `.skip-link` CSS: hidden off-screen by default, revealed on `:focus` via `left: 4px`.

#### Hamburger `aria-expanded` (WCAG 4.1.2 — index.html + script.js)
- Added `aria-expanded="false"` and `aria-controls="mobile-nav"` to the hamburger `<button>`.
- Updated click handler to toggle `aria-expanded` and `aria-label` dynamically.

#### Form Label Association (WCAG 1.3.1 — index.html)
- Added `id` attributes to all 6 contact form inputs: `input-name`, `input-company`, `input-email`, `input-phone`, `input-product`, `input-detail`.
- Added matching `for` attributes to all `<label>` elements.
- Added `autocomplete` attributes to name, company, email, phone fields.
- Added `required` to name and email inputs.

#### Focus-Visible Styles (WCAG 2.4.7 — style.css)
- Added global `:focus-visible` rule with `outline: 2px solid var(--red)` and 3px offset. Previously no keyboard focus indicator existed anywhere on the page.

---

### Performance Improvements

#### Hero Image LCP Optimisation (index.html)
- Added `<link rel="preload" as="image" href="images/factory-gate.jpg" fetchpriority="high" />` to `<head>`. Tells the browser to fetch the LCP image immediately, parallel to CSS parsing.
- Added `fetchpriority="high"` attribute directly on the hero `<img>` element.

#### Canvas Animation CPU Optimisation (script.js)
- Wrapped both `drawAboutBg()` and `drawAboutSparks()` canvas loops with `IntersectionObserver`.
- When the About section is outside the viewport, `cancelAnimationFrame()` stops both loops entirely. Loops resume automatically when the section scrolls into view.
- This eliminates ~100% of canvas GPU/CPU overhead when users are viewing other sections.

#### GPU Compositing Hints (style.css)
- Added `will-change: opacity, transform` to `.hero-tagline`, `.hero-desc`, `.hero-btns`, `.hero-stats-bar`. Promotes elements to their own compositor layers before GSAP animates them, preventing layout recalculations during entrance animations.

---

### Security Fixes

#### Inline Event Handler Removal (index.html + script.js)
- Removed `onclick="setLang('zh')"` and `onclick="setLang('en')"` inline attributes from language toggle buttons (index.html lines 50–51). These violate Content-Security-Policy `script-src` directives.
- Added IDs `lang-zh` and `lang-en` to the buttons.
- Wired click listeners in the existing `(function() { ... })()` IIFE in `script.js` via `document.querySelectorAll('.lang-btn[data-lang]')`.

#### WhatsApp Link `rel` Attribute (index.html)
- Changed `rel="noopener"` to `rel="noopener noreferrer"` on the WhatsApp FAB link. Prevents the linked page from accessing `window.opener` and stops the Referer header from leaking the site URL.
- Also added `aria-hidden="true"` to the decorative SVG inside the link (the `aria-label` on the `<a>` already provides the accessible name).

---

### Bug Fixes

#### Form Submission Validation (script.js)
- Added pre-submit validation: name field must be non-empty, email field must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- On invalid input, focuses the offending field and returns without showing success state.
- Clears all form fields on successful (fake) submission.
- **Success button text now respects language setting** via `localStorage.getItem('zy-lang')` instead of hardcoding Chinese text regardless of active language.

#### Newsletter Email Validation (script.js)
- Newsletter subscribe button now validates email format before showing success state.
- On invalid email, focuses the input and flashes a red border for 2 seconds.

---

### Audit Reports Generated

All reports saved to project root:

| File | Agent | Size |
|------|-------|------|
| `ARCHITECTURE_REPORT.md` | Architect | 7.7 KB |
| `FRONTEND_REPORT.md` | Frontend | 10.7 KB |
| `BACKEND_REPORT.md` | Backend | 6.8 KB |
| `PERFORMANCE_REPORT.md` | Performance | 11.8 KB |
| `BUG_REPORT.md` | QA | 13.5 KB |
| `SECURITY_REPORT.md` | Security | 10.5 KB |
| `DEVOPS_REPORT.md` | DevOps | 11.1 KB |

---

---

## [1.2.0] — 2026-06-24 · Real Harness Engineering Mode · Phase 4

### P0 — Critical

#### WQ-01 · Remove duplicate `.meta-num` counter handler (script.js)
- **commit 2cca67b** — The `initHeroEntrance()` block introduced a second `ScrollTrigger` counter targeting `.meta-num` in parallel with the canonical `[data-count]` handler. Both animated the same hero stats elements, causing each number to animate twice. Deleted the duplicate block (~19 lines). Surviving `[data-count]` handler covers all counters.

### P1 — High

#### WQ-02 · Hero entrance: `gsap.to → gsap.fromTo` with real y offset (script.js)
- **commit 9d877d1** — `gsap.to('.hero-tagline', { y: 0 })` was a no-op: `y` starts at 0 so nothing moved. Changed all four hero tweens to `fromTo` with `{ opacity: 0, y: 20 }` as the from state, producing the intended 20px slide-up entrance. The `will-change: opacity, transform` CSS hint is now accurate.

#### WQ-03 · Replace no-op `gsap.to(steps, { duration: 0 })` with `ScrollTrigger.create()` (script.js)
- **commit c55a9c8** — `gsap.to(steps, { scrollTrigger: {...}, duration: 0 })` animated nothing and existed only to hold a ScrollTrigger config. Replaced with a plain `ScrollTrigger.create()` call. Same behaviour, no wasted tween object.

### P2 — Medium

#### WQ-04 · Delete dead `.spec-card` tilt listener (script.js)
- **commit 6ca1235** — No `.spec-card` elements exist in index.html. `querySelectorAll('.spec-card')` returned an empty NodeList every run. Removed the unreachable 13-line block.

#### WQ-05 · Delete dead `.hero-meta` / `.meta-row` / `.hero-meta-sep` CSS rules (style.css)
- **commit ec870bc** — All three class selectors matched no elements. The real element uses `id="hero-meta"` (an ID, not a class), so the `.hero-meta { display: none }` rule was inert. Removed along with misleading "potential reuse" comments.

#### WQ-06 · Remove three orphaned images — 160 KB (images/)
- **commit bed60bf** — `about-accent.jpg`, `about-main.jpg`, and `hero-bg.jpg` were never referenced by any `src`, `url()`, or `href` in the three source files. Removed via `git rm`.

#### WQ-07 · Nav highlight: `window.scrollY` → `lenis.on('scroll', e => e.scroll)` (script.js)
- **commit ec55bec** — `ScrollTrigger.create({ onUpdate })` + `window.scrollY` read the raw browser scroll position, which lags behind Lenis's interpolated virtual scroll. Replaced with `lenis.on('scroll')` using `e.scroll` so the active link updates in sync with what the user sees. Passive `window.scroll` fallback added for when Lenis is unavailable.

#### WQ-08 · Fix `href="#"` links scrolling to page top (script.js)
- **commit 40fddc0** — The anchor intercept handler called `e.preventDefault()` only when `document.getElementById(id)` returned a match. For `href="#"`, `id = ""` and `getElementById("")` returns `null`, so default was never prevented. Added an early-exit guard: empty fragment → cancel event immediately. Covers 9 footer/social placeholder links.

### P3 — Low

#### WQ-09 · Update copyright year 2025 → 2026 (index.html + script.js)
- **commit 29d234e** — Updated in three places: index.html default text, zh i18n string, and en i18n string. All three must match because the i18n system overwrites HTML content at runtime.

#### WQ-10 · ICP placeholder replacement — BLOCKED
- `粤ICP备XXXXXXXX号` requires the actual ICP registration number from the client. No code change made.

---

## Open Items (Next Iteration)

The following were identified but not yet applied — they require hosting/infrastructure decisions or larger scope:

| Item | Priority | Reason Deferred |
|------|----------|-----------------|
| Real form backend (Formspree / EmailJS) | HIGH | Requires external account setup |
| Replace placeholder ICP license number | HIGH | Business info required from client |
| Add SRI hashes to GSAP/Lenis CDN scripts | MEDIUM | Requires hash generation per CDN version |
| Convert images to WebP | HIGH | 53 MB → ~5 MB potential; requires image tooling |
| Add `width`/`height` to all `<img>` elements | MEDIUM | Prevents CLS; requires known image dimensions |
| `prefers-reduced-motion` respect in GSAP | MEDIUM | All animations should check this media query |
| Star ratings accessibility (`role="img"`) | MEDIUM | ASCII ★ not announced by screen readers |
| Add `robots.txt` and `sitemap.xml` | LOW | SEO improvement |
| Deploy to CDN (Cloudflare Pages/Netlify) | HIGH | Provides edge caching, HTTPS, Brotli |
| Add security headers (`_headers` file) | HIGH | CSP, X-Frame-Options, etc. |
| Add `<picture>`/`srcset` for responsive images | MEDIUM | CLS + bandwidth improvement |
