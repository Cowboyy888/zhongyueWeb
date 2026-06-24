# DEPENDENCIES_REPORT.md
**Generated:** 2026-06-24 | **Phase 1 — Repository Scan**

---

## Runtime Dependencies (CDN-loaded, no package.json)

| Library | Version | Source CDN | Size (min+gz est.) | Used For | Pinned? | SRI Hash? |
|---------|---------|-----------|-------------------|----------|---------|-----------|
| GSAP | 3.12.5 | cdnjs.cloudflare.com | ~34 KB | All scroll animations, timelines, counters | ✅ Exact version | ❌ No |
| ScrollTrigger | 3.12.5 | cdnjs.cloudflare.com | ~18 KB | Scroll-based animation triggers | ✅ Exact version | ❌ No |
| Lenis | 1.0.42 | cdn.jsdelivr.net (@studio-freight) | ~5 KB | Smooth scroll | ✅ Exact version | ❌ No |
| Google Fonts | latest | fonts.googleapis.com | ~variable | Noto Sans SC, Barlow Condensed, Barlow | ❌ No version | ❌ N/A |

---

## Google Fonts Detail

Fonts loaded via render-blocking `<link rel="stylesheet">`:

```
Noto Sans SC: wght 400, 500, 700, 900
Barlow Condensed: wght 700, 800, 900
Barlow: wght 400, 600, 700, 800
```

**Issue:** Loaded synchronously — blocks first paint. Should use `font-display=swap` parameter (already in URL? — no) and/or the `media="print"` async pattern.

**Actual URL used:**
```
https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;600;700;800&display=swap
```
`display=swap` IS present in the URL. ✅ Font-display is handled server-side by Google Fonts.

---

## Security Risk: No Subresource Integrity

All three CDN scripts lack `integrity` and `crossorigin` attributes:

```html
<!-- index.html lines 978–980 — current state -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
```

If either CDN is compromised, arbitrary JavaScript runs on the page with full DOM access.

**Recommended fix:**
```html
<script src="…/gsap.min.js"
  integrity="sha384-<HASH>"
  crossorigin="anonymous"></script>
```

SRI hashes must be generated at fix time from the actual files.

---

## Dependency Load Order

```
1. gsap.min.js          (sync, blocking)
2. ScrollTrigger.min.js (sync, blocking — requires gsap global)
3. lenis.min.js         (sync, blocking)
4. script.js            (sync, blocking — requires all three above)
```

All four scripts are at end of `<body>`. Load order is correct — each script depends on the previous. No circular dependency.

**Observation:** Scripts are not `defer`-ed because they are already at end of body (equivalent effect). Adding `defer` would have no measurable impact here.

---

## Unused Dependencies

| Library | Claim | Reality |
|---------|-------|---------|
| `.spec-card` tilt handler (script.js lines 860–871) | Targets `.spec-card` elements | No `.spec-card` elements exist anywhere in `index.html`. Dead code. |

---

## No Build System

There is no `package.json`, `node_modules/`, `vite.config.js`, `webpack.config.js`, or equivalent. All dependencies are loaded from CDN at runtime. Implications:

- No tree-shaking (GSAP loads full bundle including unused plugins)
- No minification of own source files
- No content-hash cache-busting
- No offline/CI reproducibility guarantee (CDN could 404 or change)
