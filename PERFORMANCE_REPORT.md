# PERFORMANCE_REPORT.md
**Generated:** 2026-06-24 | **Phase 6 — Performance Review** | **Post Phase-4 State**

---

## Source File Sizes (unminified, no build system)

| File | Lines | Size |
|------|-------|------|
| `index.html` | 983 | 52 KB |
| `style.css` | 1,815 | 56 KB |
| `script.js` | 842 | 48 KB |
| **Total source** | 3,640 | **156 KB** |

No minification or bundling is applied. A build step (e.g. Vite or esbuild) could reduce source payload by ~40–60%.

---

## Image Payload

| File | Size | Status |
|------|------|--------|
| `product-4.jpg` | 5.2 MB | Oversized |
| `product-1.jpg` | 5.0 MB | Oversized |
| `product-5.jpg` | 4.9 MB | Oversized |
| `product-3.jpg` | 4.6 MB | Oversized |
| `delivery-1.jpg` | 4.6 MB | Oversized |
| `product-2.jpg` | 4.4 MB | Oversized |
| `delivery-2.jpg` | 4.0 MB | Oversized |
| `machine-6.jpg` | 3.4 MB | Oversized |
| `machine-5.jpg` | 3.0 MB | Oversized |
| `machine-4.jpg` | 3.0 MB | Oversized |
| `machine-3.jpg` | 3.0 MB | Oversized |
| `machine-2.jpg` | 2.9 MB | Oversized |
| `machine-1.jpg` | 2.9 MB | Oversized |
| `factory-gate.jpg` | 336 KB | Large (LCP asset — preloaded) |
| `logo.png` | 1.3 MB | Large (PNG logo — should be SVG/WebP) |
| `factory-bg.jpg` | 100 KB | Acceptable |
| **Total on disk** | | **~53 MB** |
| ~~about-accent.jpg~~ | ~~20 KB~~ | Removed in WQ-06 |
| ~~about-main.jpg~~ | ~~44 KB~~ | Removed in WQ-06 |
| ~~hero-bg.jpg~~ | ~~96 KB~~ | Removed in WQ-06 |

**The image payload is the dominant performance problem.** All product and machine images are 2.9–5.2 MB unoptimised JPEGs. Converting to WebP at 80% quality would reduce each to ~200–500 KB — roughly a 10× improvement.

---

## CDN Dependencies (runtime, blocking)

| Library | Version | Size (min+gz est.) | Load |
|---------|---------|-------------------|------|
| GSAP | 3.12.5 | ~34 KB | Sync end-of-body |
| ScrollTrigger | 3.12.5 | ~18 KB | Sync end-of-body |
| Lenis | 1.0.42 | ~5 KB | Sync end-of-body |
| Google Fonts | latest | variable | Async (`display=swap`) |

Scripts are at end of `<body>` — equivalent to `defer`. Load order is correct. No render-blocking overhead on first paint.

**Risk:** No SRI hashes on CDN scripts. A CDN compromise executes arbitrary JS. (Open item.)

---

## LCP Optimisations (applied)

| Optimisation | Status |
|-------------|--------|
| `<link rel="preload" fetchpriority="high">` on hero image | Applied (Phase 1) |
| `fetchpriority="high"` on hero `<img>` element | Applied (Phase 1) |
| `font-display=swap` on Google Fonts | Present in request URL |
| `logo.png` still PNG (1.3 MB) | Not yet — should be SVG or WebP |

---

## Animation Performance (applied)

| Item | Status |
|------|--------|
| Canvas `drawAboutBg` paused via IntersectionObserver when off-screen | Applied (Phase 1) |
| Canvas `drawAboutSparks` paused via IntersectionObserver when off-screen | Applied (Phase 1) |
| `will-change: opacity, transform` on hero entrance elements | Applied — now accurate after WQ-02 (`fromTo` animates both properties) |
| Hero entrance tweens use `fromTo` (actual slide-up motion) | Fixed WQ-02 |
| No-op `gsap.to(steps, { duration: 0 })` replaced | Fixed WQ-03 |
| Lenis ticks exclusively via `gsap.ticker` (no double-tick) | Fixed Phase 1 |
| Nav highlight uses `lenis.on('scroll')` | Fixed WQ-07 |

---

## Cumulative Layout Shift (CLS) Risk

All `<img>` elements lack explicit `width`/`height` attributes. Browsers cannot reserve space during image loading, causing layout shift. This is especially impactful for the masonry product grid and factory cards.

**Recommendation:** Add `width` and `height` to all `<img>` tags matching their intrinsic dimensions.

---

## Render-Blocking

| Resource | Blocking? | Notes |
|---------|-----------|-------|
| Google Fonts `<link rel="stylesheet">` | Partial — `display=swap` mitigates | Acceptable |
| `style.css` | Yes — inline `<link>` | Acceptable for single-page site |
| GSAP/Lenis scripts | No — end-of-body | Correct |

---

## Highest-Impact Open Items

| Item | Estimated Gain | Effort |
|------|---------------|--------|
| Convert all images to WebP + compress | LCP -70%, total payload -45 MB | Medium |
| Add `width`/`height` to all `<img>` | CLS eliminated | Low |
| Minify HTML/CSS/JS via build step | Source -40–60 KB | Medium |
| Add `srcset` / `<picture>` for responsive images | Mobile bandwidth -50% | High |
| Replace PNG logo with SVG | -1.3 MB | Low |
| Self-host fonts (remove Google Fonts round-trip) | TTFB -1 RTT | Medium |
| Add SRI hashes for CDN scripts | Security hardening | Low |
