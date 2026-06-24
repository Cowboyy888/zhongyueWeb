# PROJECT_MAP.md
**Generated:** 2026-06-24 | **Phase 1 — Repository Scan**

---

## Source Files

| File | Lines | Size | Role |
|------|-------|------|------|
| `index.html` | 983 | 51 KB | Single-page document — all markup, sections, i18n attributes |
| `style.css` | 1,823 | 54 KB | Full design system — layout, components, animations, responsive |
| `script.js` | 874 | 47 KB | i18n engine, GSAP animations, canvas, form logic, smooth scroll |

**Total source:** 3,680 lines · 150 KB unminified

---

## Page Sections (in DOM order)

| ID | Element | Description |
|----|---------|-------------|
| — | `.topbar` | Address / phone / hours / free-quote CTA |
| `#site-header` | `<header>` | Sticky nav, logo, lang toggle, hamburger |
| `#mobile-nav` | `<div>` | Off-canvas mobile menu |
| `#home` | `<section.hero>` | Full-screen hero: photo bg, brand text, CTAs, stats bar |
| `#features` | `<section>` | 4-column feature card strip |
| — | `.ticker` | Marquee ticker strip |
| `#process` | `<section.process-timeline>` | 7-step production timeline |
| `#about` | `<section.about-steel>` | About section with canvas bg, spark canvas, stat cards |
| `#facility` | `<section.facility-showcase>` | Parallax factory gate photo |
| — | `.partners` | 6 partner logo strip |
| `#products` | `<section>` | 5-product masonry grid |
| `#factory` | `<section>` | Factory equipment feature + 5-card grid |
| — | `.funfacts` | 4 animated counters with dark bg |
| `#why-us` | `<section>` | 6 advantage cards |
| — | `.testimonials-section` | 3 testimonial cards |
| `#delivery` | `<section>` | 2 delivery photo cards + 4 stats |
| — | `.cta-banner` | Red CTA strip |
| `#contact` | `<section>` | Contact info + inquiry form |
| — | `<footer>` | Logo, nav, newsletter, legal |
| — | `.floating-actions` | WhatsApp FAB + quote FAB |

---

## JavaScript Modules (all in script.js)

| Block | Lines | Description |
|-------|-------|-------------|
| i18n data | 9–260 | `i18nData` object: zh + en translations for every `data-i18n` key |
| `setLang()` | 262–278 | Applies language to all `[data-i18n]` and `[data-i18n-placeholder]` elements via `innerHTML` |
| Lang init | 281–291 | Reads `localStorage`, applies saved lang, wires button click handlers |
| Mobile menu | 293–311 | Hamburger toggle with `aria-expanded` |
| Lenis init | 313–333 | Smooth scroll; ticks via `gsap.ticker` when GSAP present |
| Anchor scroll | 335–348 | Intercepts `<a href="#...">` clicks, delegates to Lenis |
| Hero entrance | 357–387 | GSAP timeline restoring opacity; `.meta-num` counter (duplicate — see bugs) |
| Feature cards | 389–394 | GSAP `from` entrance on scroll |
| Section reveals | 396–402 | Generic `.section-tag/.section-title/.section-lead` GSAP reveals |
| About canvas | 404–481 | Animated steel-wire grid + IntersectionObserver pause |
| About sparks | 483–548 | Spark particle canvas + IntersectionObserver pause |
| About GSAP | 549–616 | Photo, badge, stat card, feature-row, corner animations |
| Products | 618–621 | Product card entrance |
| Why-Us cards | 623–626 | Process card entrance |
| `[data-count]` counters | 628–649 | ScrollTrigger counter for hero stats + funfacts (duplicates `.meta-num` handler) |
| Facility parallax | 651–699 | Parallax scroll + text entrance timeline |
| Testimonials | 701–706 | Testi-card entrance |
| Delivery | 708–730 | Delivery card entrance + `data-target` counters |
| Timeline | 732–778 | Production timeline step reveal + fill-line scrub |
| FAB visibility | 780–790 | Floating actions appear after hero |
| Nav highlight | 792–808 | Active section → red nav link |
| Contact form | 810–844 | Validation + fake success |
| Newsletter | 846–858 | Email validation + feedback |
| Spec card tilt | 860–871 | Mouse-move 3D tilt (targets `.spec-card` — no such elements in HTML) |

---

## Image Assets

| File | Size | Referenced In | Status |
|------|------|--------------|--------|
| `factory-gate.jpg` | 336 KB | `index.html` (hero, facility) | ✅ Used |
| `machine-1.jpg` | 2.9 MB | `index.html` (about accent, factory feature) | ✅ Used |
| `machine-2.jpg` | 2.9 MB | `index.html` | ✅ Used |
| `machine-3.jpg` | 3.0 MB | `index.html` | ✅ Used |
| `machine-4.jpg` | 3.0 MB | `index.html` | ✅ Used |
| `machine-5.jpg` | 3.0 MB | `index.html` | ✅ Used |
| `machine-6.jpg` | 3.4 MB | `index.html` (about main, factory wide) | ✅ Used |
| `product-1.jpg` | 5.0 MB | `index.html` | ✅ Used |
| `product-2.jpg` | 4.4 MB | `index.html` | ✅ Used |
| `product-3.jpg` | 4.6 MB | `index.html` | ✅ Used |
| `product-4.jpg` | 5.2 MB | `index.html` | ✅ Used |
| `product-5.jpg` | 4.9 MB | `index.html` | ✅ Used |
| `delivery-1.jpg` | 4.6 MB | `index.html` | ✅ Used |
| `delivery-2.jpg` | 4.0 MB | `index.html` | ✅ Used |
| `factory-bg.jpg` | 100 KB | `style.css` (funfacts pseudo) | ✅ Used |
| `logo.png` | 1.3 MB | `index.html` | ✅ Used |
| `about-accent.jpg` | 20 KB | **Nowhere** | ⚠️ Orphaned |
| `about-main.jpg` | 44 KB | **Nowhere** | ⚠️ Orphaned |
| `hero-bg.jpg` | 96 KB | **Nowhere** | ⚠️ Orphaned |

**Total image payload on disk:** ~56 MB · **Orphaned:** 160 KB

---

## Anchor Link Targets

All `href="#id"` values verified against DOM IDs:

| Target | Exists | Notes |
|--------|--------|-------|
| `#home` | ✅ | `<section class="hero" id="home">` |
| `#about` | ✅ | |
| `#facility` | ✅ | |
| `#products` | ✅ | |
| `#process` | ✅ | |
| `#factory` | ✅ | |
| `#delivery` | ✅ | |
| `#why-us` | ✅ | |
| `#contact` | ✅ | |
| `#` (empty) | ⚠️ | 8 links — social icons + footer policy links. Scrolls to top on click. |
