# BUG_REPORT.md
**Generated:** 2026-06-24 | **Phase 2 — Bug Discovery (Real Harness Mode)**
**Method:** Full static analysis — index.html (983L), style.css (1,823L), script.js (874L)

---

## BUG-001 — Duplicate Counter Animation on Hero Stats [P0]
**File:** script.js | **Lines:** 369-386 (Handler A) and 632-648 (Handler B)

Two ScrollTrigger counter handlers both target the same 4 hero `.meta-num` elements.
Every `.meta-num` element has `data-count`, so both handlers match it.
Both fire on scroll-enter and both write to `el.textContent` on every GSAP tick.
Result: two racing tweens writing the same DOM node — flicker and double-animation.

Handler A (script.js:369) — targets `.meta-num`
Handler B (script.js:632) — targets `[data-count]` (superset, includes `.meta-num`)

Fix: Delete Handler A (lines 369-386). Handler B is sufficient.

---

## BUG-002 — No-Op GSAP Tween Wrapping Timeline ScrollTrigger [P1]
**File:** script.js | **Lines:** 744-758

`gsap.to(steps, { scrollTrigger: {...}, duration: 0 })` passes a NodeList as the
tween target but specifies no CSS properties. GSAP processes and schedules a
zero-duration tween that does nothing. The onEnter callback fires correctly but
despite the tween, not because of it.

Fix: Replace gsap.to() wrapper with a plain ScrollTrigger.create({}).

---

## BUG-003 — Hero Entrance `y:0` Is a No-Op; Wrong Animation Pattern [P1]
**File:** script.js | **Lines:** 361-366

`gsap.to('.hero-tagline', { opacity: 1, y: 0 })` — the `y:0` animates FROM the
element's current y (which is already 0, no CSS transform set) TO 0. No motion
occurs. The opacity 0→1 works correctly; the y property is wasted.

`style.css` also sets `will-change: opacity, transform` on these elements,
allocating a GPU compositor layer for a transform that never changes.

Fix: Change to `gsap.fromTo()` starting at `{ opacity: 0, y: 20 }` ending at
`{ opacity: 1, y: 0 }` to achieve a genuine slide-up entrance. Remove the
redundant `y: 0` from each `to()` call if keeping current pattern.

---

## BUG-004 — Dead Code: `.spec-card` Mouse Tilt Handler [P2]
**File:** script.js | **Lines:** 860-871

`document.querySelectorAll('.spec-card')` returns an empty NodeList.
No `.spec-card` element exists anywhere in index.html.
No listeners are ever attached. Code is a dead remnant.

Fix: Delete lines 860-871.

---

## BUG-005 — Dead CSS Rules (`.hero-meta`, `.hero-meta-sep`) [P2]
**File:** style.css | **Lines:** 607-613

`.hero-meta { display: none }` and `.hero-meta-sep { display: none }` match
nothing in the HTML. The element with id="hero-meta" has class "hero-stats-bar",
not "hero-meta". These rules are orphaned from a previous layout.

Fix: Delete lines 607-613.

---

## BUG-006 — Three Orphaned Images on Disk [P2]
**Files:** images/about-accent.jpg (20KB), images/about-main.jpg (44KB), images/hero-bg.jpg (96KB)

None are referenced in index.html or style.css. Confirmed by grepping all src=
and url() references. Total wasted repo size: 160 KB.

Fix: git rm all three files.

---

## BUG-007 — Nav Highlight Uses `window.scrollY` Instead of Lenis Position [P2]
**File:** script.js | **Lines:** 800-807

During Lenis deceleration, window.scrollY can lag behind Lenis's virtual position.
Active nav indicator can skip or lag during fast scroll.

Fix: Subscribe via `lenis.on('scroll', function(e) { /* use e.scroll */ })`.

---

## BUG-008 — `href="#"` on 8 Footer Links Scrolls Page to Top [P2]
**File:** index.html | **Lines:** 915-916, 938, 956, 958-960

Social links, ICP link, and footer policy links all use href="#".
The Lenis anchor handler resolves an empty id, finds no element, and falls through.
The browser then applies native href="#" behaviour: smooth-scrolls to top.

Fix: Replace with `href="javascript:void(0)"` and `aria-disabled="true"` for
placeholder links, or add real destination URLs.

---

## BUG-009 — Copyright Year Shows 2025 [P3]
**File:** index.html line 956; script.js lines 132 (zh), 257 (en)

Current year is 2026.

Fix: Change 2025 to 2026 in all three locations.

---

## BUG-010 — Placeholder ICP License Number [P3]
**File:** index.html line 956; script.js lines 132 (zh), 257 (en)

`粤ICP备XXXXXXXX号` is an unfilled placeholder. Legal issue for China-facing sites.

Fix: Replace XXXXXXXX with the actual ICP registration number.

---

## Summary

| ID | P | Lines | Description |
|----|---|-------|-------------|
| BUG-001 | P0 | script.js 369-386, 632-648 | Duplicate counter animation — hero stats race |
| BUG-002 | P1 | script.js 744-758 | No-op GSAP tween wrapping ScrollTrigger |
| BUG-003 | P1 | script.js 361-366 | Hero entrance y:0 is no-op; wrong pattern |
| BUG-004 | P2 | script.js 860-871 | Dead .spec-card event handler |
| BUG-005 | P2 | style.css 607-613 | Dead .hero-meta/.hero-meta-sep CSS rules |
| BUG-006 | P2 | images/ | 3 orphaned images (160 KB) |
| BUG-007 | P2 | script.js 800-807 | Nav highlight uses window.scrollY not Lenis |
| BUG-008 | P2 | index.html 915-960 | href="#" scrolls to top on click |
| BUG-009 | P3 | html+js | Copyright year 2025 should be 2026 |
| BUG-010 | P3 | html+js | Placeholder ICP number |
