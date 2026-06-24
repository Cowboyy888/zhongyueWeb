# 中粤铁网公司 — Official Website
### Zhongyu Steel Wire Group · Premium Welded Rebar Mesh Manufacturer

---

## Project Overview

This is the official marketing website for **中粤铁网公司 (Zhongyu Steel Wire Group)**, a professional welded rebar mesh manufacturer founded in 1998, serving 60+ countries worldwide. The site is a high-performance, fully bilingual (Chinese/English) static website built with a cinematic industrial aesthetic.

**Live stack:** Pure HTML5 · CSS3 · Vanilla JavaScript · GSAP 3 · Lenis Smooth Scroll · Canvas API

---

## Harness Engineering System

This project was audited and improved by a **7-agent Harness Engineering pipeline** — an autonomous multi-agent review system where each agent specialises in a distinct engineering domain, and every agent cross-reviews the work of the previous one before changes are accepted.

### Agent Structure

```
Architect Agent
      ↓
Frontend Agent
      ↓
Backend Agent
      ↓
Performance Agent
      ↓
QA Agent
      ↓
Security Agent
      ↓
DevOps Agent
      ↓
Architect Agent (Final Review)
```

| Agent | Responsibility | Output |
|---|---|---|
| **Architect** | Codebase structure, SOLID principles, anti-patterns, technical debt | `ARCHITECTURE_REPORT.md` |
| **Frontend** | UI/UX, responsiveness, animations, accessibility, Core Web Vitals | `FRONTEND_REPORT.md` |
| **Backend** | API routes, form handling, server actions, validation | `BACKEND_REPORT.md` |
| **Performance** | Bundle size, LCP/CLS/INP, lazy loading, rendering optimisation | `PERFORMANCE_REPORT.md` |
| **QA** | Bug detection, form verification, navigation, console errors | `BUG_REPORT.md` |
| **Security** | XSS, CSRF, input validation, CDN integrity, CSP compliance | `SECURITY_REPORT.md` |
| **DevOps** | Build pipeline, CI/CD, image optimisation, deployment, caching | `DEVOPS_REPORT.md` |

### Harness Rules

- No agent may approve its own work
- Iteration continues until: no runtime errors, no console warnings, Lighthouse score > 95, production ready
- All fixes are applied automatically
- A changelog is generated after every iteration
- Backward compatibility is maintained at all times

---

## Fixes Applied — Iteration 1

### Critical

| Issue | Fix |
|---|---|
| Hero tagline, description, CTA buttons, and stats bar were **permanently invisible** (`opacity: 0` in CSS, no GSAP restoration) | Added `initHeroEntrance()` GSAP timeline that staggers all four elements into view on load |
| **Lenis smooth scroll double-ticked** every frame (manual `requestAnimationFrame` loop + `gsap.ticker` both calling `lenis.raf()`) | Removed manual RAF loop when GSAP is present; Lenis now ticks exclusively through `gsap.ticker` |

### Performance

| Issue | Fix |
|---|---|
| Hero LCP image had no browser fetch priority hint | Added `<link rel="preload">` + `fetchpriority="high"` to `factory-gate.jpg` |
| Both canvas animations ran continuous `requestAnimationFrame` loops regardless of scroll position | Wrapped `drawAboutBg()` and `drawAboutSparks()` with `IntersectionObserver` — loops pause entirely when the About section is off-screen |
| Hero animated elements caused layout recalculation during entrance | Added `will-change: opacity, transform` to promote elements to compositor layers before animation |
| Deprecated Lenis `smooth: true` option | Removed |

### Accessibility (WCAG 2.1)

| Issue | Fix |
|---|---|
| No skip-to-content link | Added `<a class="skip-link" href="#home">` as first body element |
| No keyboard focus indicator anywhere on the page | Added global `:focus-visible` rule with brand-red outline |
| Hamburger button missing `aria-expanded` and `aria-controls` | Added both attributes; JS handler toggles `aria-expanded` on click |
| All 6 contact form inputs missing `id`/`for` label association (WCAG 1.3.1) | Added `id` attributes to every input; `for` attributes to every `<label>`; `autocomplete` and `required` where appropriate |

### Security

| Issue | Fix |
|---|---|
| Inline `onclick="setLang()"` handlers on language toggle buttons (CSP violation) | Replaced with `addEventListener` in existing IIFE |
| WhatsApp FAB link missing `rel="noreferrer"` | Updated to `rel="noopener noreferrer"` |
| Contact form shows fake success with no field validation | Added email regex validation, required-field check, and field-clearing on success |
| Newsletter accepts any input including empty | Added email format validation with error feedback |
| Form success button text hardcoded in Chinese regardless of active language | Button now reads language from `localStorage` and responds accordingly |

---

## Audit Reports

All seven specialist reports are included in the project root:

- [`ARCHITECTURE_REPORT.md`](ARCHITECTURE_REPORT.md) — codebase structure, anti-patterns, i18n design
- [`FRONTEND_REPORT.md`](FRONTEND_REPORT.md) — UI/UX, accessibility, animation audit
- [`BACKEND_REPORT.md`](BACKEND_REPORT.md) — form backend gaps, recommended integrations (Formspree / Cloudflare Workers)
- [`PERFORMANCE_REPORT.md`](PERFORMANCE_REPORT.md) — LCP analysis, canvas optimisation, image payload (53 MB → ~5 MB WebP potential)
- [`BUG_REPORT.md`](BUG_REPORT.md) — 8 confirmed bugs with exact file and line references
- [`SECURITY_REPORT.md`](SECURITY_REPORT.md) — 8 security issues including SRI, CSP, and placeholder ICP license
- [`DEVOPS_REPORT.md`](DEVOPS_REPORT.md) — build pipeline, CDN deployment, image optimisation, CI/CD recommendations
- [`CHANGELOG.md`](CHANGELOG.md) — full record of every change made in Iteration 1

---

## Website Features

- **Bilingual** — full Chinese / English toggle with `localStorage` persistence
- **Cinematic Hero** — full-screen factory gate photo with Ken Burns zoom and staggered entrance animation
- **Canvas Animations** — animated steel-wire grid background and spark particle system in the About section
- **Parallax Facility Showcase** — GSAP ScrollTrigger parallax on factory gate image
- **Production Timeline** — animated 7-step process with scroll-driven progress line
- **5 Product Cards** — masonry-style grid with hover effects
- **Equipment Gallery** — factory machine grid with overlay labels
- **Animated Stats** — number counters triggered on scroll (hero, about, delivery, funfacts sections)
- **Contact Form** — with client-side validation, field clearing, and language-aware feedback
- **Floating CTAs** — WhatsApp button + inquiry button, visible after hero scroll
- **Smooth Scroll** — Lenis integrated with GSAP ScrollTrigger

---

## Open Items (Next Iteration)

The following are documented but require external decisions or credentials:

| Priority | Item |
|---|---|
| HIGH | Replace placeholder `粤ICP备XXXXXXXX号` with real ICP license |
| HIGH | Wire contact form to a real backend (Formspree / EmailJS / Cloudflare Workers) |
| HIGH | Convert all JPEGs to WebP — 53 MB total payload, ~90% reduction possible |
| HIGH | Deploy to CDN host (Cloudflare Pages / Netlify) for edge caching + HTTPS headers |
| MEDIUM | Add `width`/`height` to all `<img>` elements (prevents CLS) |
| MEDIUM | Add SRI hashes to GSAP and Lenis CDN `<script>` tags |
| MEDIUM | Respect `prefers-reduced-motion` media query in all GSAP animations |
| MEDIUM | Add `robots.txt` and `sitemap.xml` for SEO |
| LOW | Set up minification build step (esbuild + lightningcss) |

---

## Project Structure

```
zhongyueWeb/
├── index.html              # Single-page site (bilingual, all sections)
├── style.css               # Full design system — 1,800+ lines
├── script.js               # Animations, i18n, interactions — 870+ lines
├── images/                 # Product, factory, delivery, hero photography
├── CHANGELOG.md            # Iteration-by-iteration change log
├── ARCHITECTURE_REPORT.md
├── FRONTEND_REPORT.md
├── BACKEND_REPORT.md
├── PERFORMANCE_REPORT.md
├── BUG_REPORT.md
├── SECURITY_REPORT.md
└── DEVOPS_REPORT.md
```

---

## Company Info

**中粤铁网公司 / Zhongyu Steel Wire Group**
- Founded: 1998
- Location: CJJG+HHH, Khum Trapeang Kong, Cambodia
- Products: Welded rebar mesh, floor slab mesh, fence panels, custom-shape mesh, cold-drawn wire
- Wire diameter: 3–12 mm · Mesh spacing: 100–500 mm
- Daily capacity: 800+ tonnes · Export countries: 60+
- Certifications: ISO 9001:2015
- Contact: sales@zhongyutiewang.com · +86 020-8888-6688

---

*Harness Engineering System — Powered by Claude Sonnet 4.6*
