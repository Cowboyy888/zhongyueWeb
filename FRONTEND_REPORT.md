# Frontend Report — 中粤铁网公司 / Zhongyue Steel Wire Group
Generated: 2026-06-24

---

## 1. Critical Bug: Hero Content Permanently Invisible

Severity: **CRITICAL**

### Root Cause

Four hero-section elements are given `opacity: 0` as their CSS-defined resting state (these are intentional animation start states), but no JavaScript animation ever transitions them to `opacity: 1`. The elements are permanently invisible to all visitors.

**Affected elements and exact CSS lines:**

| Selector | style.css line | opacity value |
|---|---|---|
| `.hero-tagline` | 421 | `opacity: 0` |
| `.hero-desc` | 433 | `opacity: 0` |
| `.hero-btns` | 439 | `opacity: 0` (inline in shorthand rule) |
| `.hero-stats-bar` | 479 | `opacity: 0` |

**Proof of absence in script.js:**

A full-text search of `script.js` finds zero occurrences of these selectors anywhere in GSAP calls:
- No `gsap.to('.hero-tagline', ...)` or equivalent
- No `gsap.from('.hero-tagline', ...)` — `gsap.from()` starts at the given values and animates to the element's CSS values, which would also restore opacity only if there were a CSS target of `opacity: 1`; since CSS declares `opacity: 0`, even a `gsap.from({opacity:0})` would be a no-op on these
- No `gsap.fromTo()` targeting these selectors
- No GSAP timeline that includes these selectors

The only GSAP activity in the hero section is the `[data-count]` counter animation (script.js lines 566–583), which animates the number text content inside `.meta-num` spans inside the stats bar — but the stats bar container itself (`opacity: 0`) hides these counters.

**What visitors see:**

- Visible: hero background image, `.hero-badge` (no `opacity: 0` in CSS), `.hero-brand-en`/`.hero-brand-cn` (no `opacity: 0` in CSS), scroll cue chevron
- Invisible: tagline ("铸造力量，塑造未来"), description paragraph, "查看产品" and "联系我们" CTA buttons, the entire four-stat bar (26+ years, 800+ tonnes/day, 60+ countries, retention rate)

**Fix (not applied — for reference):**

The missing animation should be added to `script.js` after line 345 (`gsap.registerPlugin(ScrollTrigger)`), targeting the hero section on page load rather than on scroll:

```js
// Hero entrance — restore elements from opacity: 0
gsap.to(['.hero-tagline', '.hero-desc', '.hero-btns', '.hero-stats-bar'], {
  opacity: 1,
  y: 0,
  duration: 0.8,
  stagger: 0.15,
  ease: 'power3.out',
  delay: 0.4
});
```

Alternatively, set `opacity: 1` in CSS (removing the animation intent) and let GSAP use `gsap.from()` to animate in from `opacity: 0` — the standard GSAP pattern for entrance animations.

---

## 2. Accessibility Issues

### 2.1 Form Labels Not Associated with Inputs

Severity: **HIGH**

All six contact form inputs and the `<select>` have `<label>` elements but none of the inputs have an `id` attribute, and none of the labels have a `for` attribute. The association between label and control is therefore entirely broken.

**Affected elements (index.html lines 856–888):**

```html
<label data-i18n="form-name">姓名</label>
<input type="text" placeholder="张先生 / Ms. Zhang" />  <!-- no id -->

<label data-i18n="form-company">公司名称</label>
<input type="text" ... />  <!-- no id -->

<label data-i18n="form-email">电子邮件</label>
<input type="email" ... />  <!-- no id -->

<label data-i18n="form-phone">联系电话</label>
<input type="tel" ... />  <!-- no id -->

<label data-i18n="form-product">意向产品</label>
<select>...</select>  <!-- no id -->

<label data-i18n="form-detail">询价详情 &amp; 规格要求</label>
<textarea ...></textarea>  <!-- no id -->
```

**Consequences:**
- Screen readers will not announce the label when the user focuses each input.
- Clicking the label text does not move focus to the corresponding field (the standard browser behaviour for associated labels).
- WCAG 2.1 Success Criterion 1.3.1 (Info and Relationships) and 4.1.2 (Name, Role, Value) are violated.

**Fix:** Add matching `id` to each input and `for` to each label (e.g., `id="form-name"` / `for="form-name"`).

### 2.2 Hamburger Button Missing `aria-expanded`

Severity: **HIGH**

The mobile menu toggle button (index.html line 55):

```html
<button class="hamburger" id="hamburger" aria-label="打开菜单">
```

Has `aria-label` but no `aria-expanded` attribute. Screen reader users cannot determine whether the menu is currently open or closed. WCAG 2.1 SC 4.1.2 requires that state be programmatically exposed.

Additionally, the `aria-label` is hardcoded as "打开菜单" (Open menu) in Chinese and never changes to "关闭菜单" (Close menu) when the menu is open, and it is not updated when the user switches to English.

**Fix:** Toggle `aria-expanded="true"` / `aria-expanded="false"` in the click handler (script.js lines 293–295). Also sync the label with the current language via the i18n system.

### 2.3 No Skip Navigation Link

Severity: **MEDIUM**

There is no "skip to main content" link at the top of the page. Keyboard users must tab through the entire top bar and navigation (10+ links) to reach page content on every page visit. WCAG 2.4.1 (Bypass Blocks) requires a mechanism to skip repeated navigation.

**Fix:** Add as the first child of `<body>`:

```html
<a href="#home" class="skip-link">Skip to main content</a>
```

with CSS that positions it off-screen until focused.

### 2.4 Star Ratings Are Non-Semantic

Severity: **MEDIUM**

Three testimonial cards (index.html lines 710, 721, 732) display star ratings using plain Unicode characters:

```html
<div class="stars">★★★★★</div>
```

These characters have no accessible name or role. Screen readers will either skip them or read them as "BLACK STAR BLACK STAR BLACK STAR BLACK STAR BLACK STAR" depending on the UA, which is not meaningful.

**Fix:** Replace with a semantic pattern:

```html
<div class="stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
```

### 2.5 Feature Cards Initial `opacity: 0` — Correctly Animated (No Bug)

For completeness: `.feature-card` is also set to `opacity: 0` (style.css line 538). Unlike the hero elements, this is correctly animated by script.js line 349–352:

```js
gsap.from('.feature-card', {
  scrollTrigger: { trigger: '.feature-cards-section', start: 'top 88%' },
  opacity: 0, y: 40, stagger: 0.12, duration: 0.7, ease: 'power3.out'
});
```

GSAP `from()` animates FROM the provided values TO the element's CSS state. However, because the CSS declares `opacity: 0`, GSAP's `from({opacity:0})` would animate from 0 to 0 — no change. The cards are actually made visible by GSAP internally setting `opacity` as an inline style that overrides the CSS `opacity: 0` at the end of the animation. This works correctly in practice but relies on GSAP's internal clearing of inline styles. Prefer using `gsap.fromTo()` or setting a `will-change: opacity` CSS rule to make the intent explicit.

### 2.6 Language Switcher Not Keyboard-Accessible in Mobile Context

Severity: **LOW**

The language toggle buttons use `class="lang-btn"` and are standard `<button>` elements, which is correct. However, in the mobile navigation drawer, the language buttons are not confirmed to appear in the tab order inside the drawer. No `tabindex` manipulation is performed when the drawer opens or closes, meaning focus may escape the drawer.

### 2.7 `<html lang>` Attribute Hardcoded to Chinese Only

Severity: **LOW**

`index.html` line 2: `<html lang="zh-CN">`. `setLang('en')` correctly updates this to `lang="en"` (script.js line 265), but the initial load is always `zh-CN` regardless of `navigator.language`. Visitors using English-language browsers with no prior visit will receive `zh-CN` content correctly identified as Chinese, but if they reload before switching language the attribute correctly reflects their stored preference.

The gap is specifically on a true first visit: if the browser language is English but localStorage has no saved preference, the page loads as Chinese (`lang="zh-CN"`) and the language switcher must be used manually.

---

## 3. Additional Frontend Issues

### 3.1 Contact Form Has No Client-Side Validation

Severity: **HIGH**

Beyond the missing backend (covered in ARCHITECTURE_REPORT.md), the form has no client-side validation. None of the inputs use HTML5 `required` attributes. `type="email"` provides minimal format checking, but `type="text"` and `type="tel"` fields accept any input. The submit button (`id="submit-btn"`) fires the "success" state unconditionally — it does not check whether any field is filled.

**Fix:** Add `required` to mandatory fields and validate email format before triggering the submission handler.

### 3.2 Mobile Nav Has No Focus Trap

Severity: **MEDIUM**

When the mobile navigation drawer is open, keyboard focus is not trapped inside it. Tabbing past the last nav item will move focus to content behind the overlay, which is not visible. This breaks the WCAG 2.1 SC 2.1.2 requirement that keyboard focus not become trapped in a component unless there is a documented way to leave.

### 3.3 Smooth Scroll Breaks for Users with `prefers-reduced-motion`

Severity: **MEDIUM**

Lenis smooth scroll is initialised unconditionally (script.js lines 305–315) with no check for `window.matchMedia('(prefers-reduced-motion: reduce)')`. Users who have configured their OS to reduce motion will still receive the smooth-scroll animation, which can trigger vestibular disorders. Similarly, all GSAP entrance animations run unconditionally.

**Fix:** Wrap Lenis initialisation and GSAP animations in a reduced-motion check, or pass `{lerp: 1}` to Lenis when reduced motion is preferred.

### 3.4 Testimonial Section `opacity: 0` — Animation Gap Risk

Severity: **LOW**

`.testi-card` is animated via `gsap.from('.testi-card', { scrollTrigger: ... opacity: 0 ... })` (script.js line 637). If GSAP fails to load from CDN, the cards remain invisible. The same applies to `.product-card`, `.process-card`, and `.about-feat-row`. A CSS fallback (e.g., removing `opacity: 0` and relying on GSAP `from()` to set it before animating) or a `<noscript>` stylesheet would mitigate CDN failure.

---

## 4. Summary of Severity Ratings

| # | Issue | Severity |
|---|---|---|
| 1 | Hero tagline, desc, btns, stats-bar permanently opacity:0 | CRITICAL |
| 2 | Form inputs have no id, labels have no for | HIGH |
| 3 | Hamburger missing aria-expanded | HIGH |
| 4 | Form has no client-side validation or required fields | HIGH |
| 5 | No skip-to-content link | MEDIUM |
| 6 | Star ratings not screen-reader accessible | MEDIUM |
| 7 | Mobile nav drawer has no focus trap | MEDIUM |
| 8 | Lenis/GSAP not respecting prefers-reduced-motion | MEDIUM |
| 9 | Language switcher not synced to browser language on first visit | LOW |
| 10 | Testimonial/product cards invisible if GSAP CDN fails | LOW |
| 11 | Language button accessibility in mobile drawer | LOW |
