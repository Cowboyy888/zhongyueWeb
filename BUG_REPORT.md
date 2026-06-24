# QA Bug Report — 中粤铁网公司 / Zhongyu Steel Wire Group

**Site type:** Static HTML/CSS/JS  
**Date:** 2026-06-24  
**Severity scale:** CRITICAL / HIGH / MEDIUM / LOW / INFO

---

## Executive Summary

Eight bugs were confirmed through static analysis of the three source files. Bug #1 is a **critical visual regression** that renders the entire hero section's animated text content permanently invisible on first load. The remaining bugs range from animation logic errors to accessibility and race-condition issues.

---

## Bug 1 — CRITICAL: Hero Section Text Permanently Invisible
**Severity: CRITICAL**  
**Files:** `style.css` lines 421, 433, 439, 479; `script.js` (no corresponding animation)

Four hero content elements have `opacity: 0` set in CSS as their static, non-animated baseline state:

```css
/* style.css line 421 */
.hero-tagline { opacity: 0; ... }

/* style.css line 433 */
.hero-desc { opacity: 0; ... }

/* style.css line 439 */
.hero-btns { ... opacity: 0; ... }

/* style.css line 479 */
.hero-stats-bar { ... opacity: 0; }
```

These declarations use `opacity: 0` as a "pre-animation" initial state, expecting a corresponding GSAP animation (e.g., `gsap.to('.hero-tagline', { opacity: 1, ... })`) to restore visibility on page load. **No such animation exists in `script.js`.**

A search across the entire `script.js` confirms that no GSAP tween targets `.hero-tagline`, `.hero-desc`, `.hero-btns`, `.hero-stats-bar`, `#hero-tagline`, `#hero-desc`, `#hero-btns`, or `#hero-meta`. The GSAP animation code does animate the facility section elements (lines 622–633) and the about section elements (lines 486–550), but **the hero section entrance animation was never implemented or was accidentally removed.**

The practical result is that the tagline, description, both CTA buttons, and the four-stat strip at the bottom of the hero are **permanently invisible** to all visitors. The hero brand text ("ZY STEELS" / "中粤钢铁") and badge are not affected because they do not have `opacity: 0` in CSS.

**Fix:** Add a GSAP entrance timeline to the hero section. Example:

```js
// Add to script.js after gsap.registerPlugin(ScrollTrigger)
var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTl
  .to('#hero-tagline', { opacity: 1, y: 0, duration: 0.8 }, '+=0.3')
  .to('#hero-desc',    { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
  .to('#hero-btns',    { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
  .to('#hero-meta',    { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
```

Also add corresponding `transform: translateY(20px)` initial states in CSS for a slide-up entry effect.

---

## Bug 2 — Production Timeline Fill Line Animates When Hidden on Mobile
**Severity: MEDIUM**  
**Files:** `style.css` line 1766; `script.js` lines 693–712

On screens 1024px wide and below, `.ptl-line` is hidden:

```css
/* style.css line 1766 */
.ptl-line { display: none; }
```

However, the `ScrollTrigger` that drives the `.ptl-line-fill` animation (`script.js` lines 693–712) still runs on all viewport sizes:

```js
// script.js lines 693–712
ScrollTrigger.create({
    trigger: '.ptl-track',
    start: 'top 75%',
    end: 'bottom 60%',
    scrub: 1.2,
    onUpdate: function (self) {
        var pct = Math.min(self.progress * 100 * 1.4, 100);
        lineFill.style.width = pct + '%';   // animating a display:none element
        steps.forEach(function (step, i) {
            var threshold = (i / (total - 1)) * 0.72;
            if (self.progress >= threshold) step.classList.add('lit');
        });
    }
});
```

The `style.width` manipulation on the hidden `lineFill` element is harmless but wasteful. The `step.classList.add('lit')` calls do still work on mobile (the `.ptl-step-node` styles respond to the `.lit` class), but the visual trigger point is disconnected from the hidden line, which may produce unexpected node-lighting behaviour on narrow viewports where the grid reflows to 4 or 2 columns.

**Fix:** Guard the `ScrollTrigger` with a media query check:

```js
if (window.innerWidth > 1024) {
    ScrollTrigger.create({ /* line fill animation */ });
}
```

Or use `ScrollTrigger.matchMedia({ '(min-width: 1025px)': function() { /* ... */ } })`.

---

## Bug 3 — Double `resize` Listener Registration on `about-canvas`
**Severity: LOW** *(memory / performance)*  
**File:** `script.js`, lines 375–377 and 397

Inside `initAboutCanvas()`, `resize` is registered once for the canvas sizing function, then `buildGrid` is registered a second time as a separate listener for the same `resize` event:

```js
// script.js lines 371–377
function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);   // line 376 — first listener

// script.js lines 379–397
function buildGrid() { lines = []; /* ... */ }
buildGrid();
window.addEventListener('resize', buildGrid); // line 397 — second listener
```

Every `resize` event fires both `resize()` and `buildGrid()`. Since `buildGrid()` depends on `W` and `H` being already updated by `resize()`, the execution order matters — if they fire out of order (they won't in a single-threaded engine, but the intent is unclear), the grid is built against stale dimensions. More critically, the canvas is never resized *before* the grid is rebuilt in the `buildGrid()` call, since `resize()` fires first only by coincidence of registration order.

Additionally, neither listener is ever removed, so if the IIFE were re-run (e.g., in a framework re-mount scenario), listeners would accumulate.

**Fix:** Merge both operations into a single resize handler:

```js
function onResize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    buildGrid();
}
onResize();
window.addEventListener('resize', onResize);
```

---

## Bug 4 — `gsap.to(steps, { duration: 0 })` Tween Does Nothing
**Severity: LOW**  
**File:** `script.js`, lines 677–691

```js
// script.js lines 677–691
gsap.to(steps, {
    scrollTrigger: {
        trigger: '.ptl-track',
        start: 'top 80%',
        once: true,
        onEnter: function () {
            steps.forEach(function (s, i) {
                setTimeout(function () {
                    s.classList.add('visible');
                }, i * 130);
            });
        }
    },
    duration: 0   // zero-duration tween on a NodeList — does nothing
});
```

`gsap.to(steps, { duration: 0 })` creates a tween with no properties to animate (no `opacity`, `y`, `x`, etc.) and a duration of 0. It is effectively a no-op tween. The real work happens in the `onEnter` callback inside the `scrollTrigger` options object. The tween itself adds unnecessary overhead.

The `onEnter` approach of using `setTimeout` to stagger `classList.add('visible')` is valid, but is not idiomatic GSAP — a `gsap.timeline()` with `onComplete` per element, or GSAP's native `stagger` with `onStart`/`onComplete` callbacks, would be cleaner.

**Fix:** Replace with a pure `ScrollTrigger.create()` call:

```js
ScrollTrigger.create({
    trigger: '.ptl-track',
    start: 'top 80%',
    once: true,
    onEnter: function () {
        steps.forEach(function (s, i) {
            setTimeout(function () { s.classList.add('visible'); }, i * 130);
        });
    }
});
```

---

## Bug 5 — Hamburger Menu Missing `aria-expanded` State
**Severity: LOW** *(accessibility)*  
**File:** `index.html` line 55; `script.js` lines 293–300

```html
<!-- index.html line 55 -->
<button class="hamburger" id="hamburger" aria-label="打开菜单">
```

```js
// script.js lines 293–300
hamburger.addEventListener('click', function () {
    mobileNav.classList.toggle('open');
    // aria-expanded is never updated
});
```

The hamburger button has a static `aria-label="打开菜单"` (Open menu) but never updates the `aria-expanded` attribute when the menu opens or closes. Screen readers cannot convey the current open/closed state of the navigation to users who depend on assistive technology. The label also stays "打开菜单" when the menu is open — it should toggle to "关闭菜单" (Close menu).

**Fix:**

```js
hamburger.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    hamburger.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
});
```

Also add the initial state to the HTML: `aria-expanded="false"`.

---

## Bug 6 — Lenis Is Ticked Twice Per Frame (Double `raf` Call)
**Severity: HIGH** *(causes choppy/doubled scroll behaviour)*  
**File:** `script.js`, lines 311–320

```js
// script.js lines 311–320
lenis = new Lenis({ duration: 1.2, smooth: true });

function lenisRaf(time) {
    lenis.raf(time);                      // tick #1 — raw browser time (ms)
    requestAnimationFrame(lenisRaf);
}
requestAnimationFrame(lenisRaf);          // starts the manual RAF loop

if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);           // tick #2 — GSAP time (seconds → ms)
    });
    gsap.ticker.lagSmoothing(0);
}
```

`lenis.raf()` is called on every animation frame **twice**: once by the manual `lenisRaf` RAF loop (line 312) and once by the `gsap.ticker.add` callback (line 319). The Lenis documentation explicitly states that when integrating with GSAP, the manual `requestAnimationFrame` loop must be **removed** and Lenis must be driven exclusively via `gsap.ticker`.

The effect is that Lenis processes scroll physics twice per frame, causing the virtual scroll position to advance double the expected amount per frame — resulting in scroll overshoot, jitter, and potential visual lag.

**Fix:** Remove the manual RAF loop entirely. The GSAP ticker integration is sufficient:

```js
lenis = new Lenis({ duration: 1.2 });  // also remove deprecated smooth: true (see Bug 7)

// Do NOT add requestAnimationFrame(lenisRaf)

if (typeof gsap !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
}
```

---

## Bug 7 — `smooth: true` is a Deprecated Lenis Option
**Severity: LOW**  
**File:** `script.js`, line 309

```js
// script.js line 309
lenis = new Lenis({
    duration: 1.2,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smooth: true,   // deprecated in Lenis v1+
});
```

The `smooth` option was removed from Lenis in v1.0. Smooth scrolling is now the default behaviour; the option is either silently ignored or triggers a console warning depending on the exact version loaded (`@studio-freight/lenis@1.0.42` is specified in the CDN URL). The CDN URL pins version 1.0.42, which was released by Studio Freight; the package has since been transferred to `lenis` (without the `@studio-freight/` scope). The current stable package is `lenis` at v1.x from `darkroomcoffee`.

**Fix:** Remove the `smooth: true` line. Optionally update the CDN URL to the canonical current package:

```html
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js"></script>
```

---

## Bug 8 — Contact Form Success Text Hardcoded in Chinese Regardless of Active Language
**Severity: MEDIUM**  
**File:** `script.js`, lines 748–749

```js
// script.js lines 748–749
submitBtn.addEventListener('click', function () {
    btn.textContent = '✓ 提交成功 / Sent!';   // always Chinese first
    ...
    btn.textContent = '提交询价 / Send Inquiry'; // always bilingual reset
```

The success and reset text strings are hardcoded bilingual literals (`'✓ 提交成功 / Sent!'` and `'提交询价 / Send Inquiry'`). If the user has switched to English (`setLang('en')`), the button already shows "Send Inquiry" (from the i18n system). On click, the success state reverts to the hardcoded bilingual string rather than the language-appropriate string from `i18nData`.

The same button has a `data-i18n="form-submit"` attribute (`index.html` line 890), which the `setLang()` function uses to update its text. But the click handler writes directly to `textContent`, bypassing the i18n system.

**Fix:** Read the current language from localStorage and use the appropriate string:

```js
submitBtn.addEventListener('click', function () {
    var lang = localStorage.getItem('zy-lang') || 'zh';
    var successText = lang === 'en' ? '✓ Sent!' : '✓ 提交成功';
    var resetText = lang === 'en' ? 'Send Inquiry' : '提交询价 / Send Inquiry';
    btn.textContent = successText;
    btn.classList.add('success');
    setTimeout(function () {
        btn.textContent = resetText;
        btn.classList.remove('success');
    }, 3500);
});
```

---

## Summary Table

| # | Bug | File | Line(s) | Severity |
|---|---|---|---|---|
| 1 | Hero tagline/desc/btns/stats permanently invisible (missing GSAP animation) | style.css, script.js | style.css 421, 433, 439, 479 | CRITICAL |
| 2 | Timeline fill line animates when hidden on mobile | style.css, script.js | style.css 1766; script.js 693–712 | MEDIUM |
| 3 | Double `resize` listener on `about-canvas` | script.js | 376, 397 | LOW |
| 4 | `gsap.to(steps, { duration: 0 })` no-op tween | script.js | 677–691 | LOW |
| 5 | Hamburger missing `aria-expanded` state | index.html, script.js | index.html 55; script.js 293–300 | LOW |
| 6 | Lenis ticked twice per frame — double `raf` call | script.js | 311–320 | HIGH |
| 7 | `smooth: true` deprecated Lenis option | script.js | 309 | LOW |
| 8 | Form success text hardcoded, ignores active language | script.js | 748–755 | MEDIUM |
