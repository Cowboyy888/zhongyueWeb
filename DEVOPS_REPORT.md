# DevOps Report — 中粤铁网公司 / Zhongyu Steel Wire Group

**Site type:** Static HTML/CSS/JS  
**Date:** 2026-06-24  
**Severity scale:** CRITICAL / HIGH / MEDIUM / LOW / INFO

---

## Executive Summary

The project has no build system, no automated deployment pipeline, no asset optimisation, and no performance or monitoring infrastructure. All three source files are unminified originals totalling approximately 148KB of source text, plus 19 unoptimised JPEG images in the `images/` directory. Deploying as-is is functional but creates unnecessary operational risk and poor Core Web Vitals performance.

---

## 1. No Build System
**Severity: MEDIUM**

The project is a raw collection of three files with no tooling layer:

| File | Size | Notes |
|------|------|-------|
| `index.html` | ~50KB | Unminified, inline comments throughout |
| `style.css` | ~54KB | Unminified, includes many dev comments |
| `script.js` | ~44KB | Unminified, `var i18nData = { ... }` is ~260 lines of JSON-like data |

**Total source text:** ~148KB  
**Estimated post-minification:** ~85–95KB (35–40% reduction)

There is no `package.json`, `Makefile`, `Vite config`, `webpack.config.js`, or equivalent. Adding or changing a dependency requires manually editing `index.html`.

**Recommendation:**

Introduce a minimal static site build pipeline. For a project of this size, Vite is the lowest-friction option:

```bash
npm create vite@latest zhongyueweb -- --template vanilla
```

Benefits:
- Automatic JS and CSS minification/bundling on `vite build`.
- ES module tree-shaking (removes unused GSAP exports).
- CSS autoprefixer and minification via `vite-plugin-css-inject-on-demand`.
- Live dev server with HMR for faster iteration.
- Outputs a `dist/` folder ready for deployment.

Alternative for zero-config: **Parcel** (`npx parcel index.html`) requires zero configuration.

---

## 2. No CI/CD Pipeline
**Severity: HIGH**

There is no `.github/workflows/`, no `Jenkinsfile`, no `Dockerfile`, and no deployment script. Deployments are presumably manual (FTP upload, drag-and-drop to a hosting panel, or `git push` directly to a live branch).

Risks:
- No automated checks before a broken file goes live.
- No rollback mechanism if a deployment breaks the site.
- No audit trail of what was deployed and when.

**Recommendation:** Add a GitHub Actions workflow that deploys on every push to `main`. Example for Cloudflare Pages (free tier):

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: zhongyue-web
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

This gives:
- Automatic deployments on every `git push`.
- Preview deployments for pull requests (via Cloudflare Pages built-in feature).
- Instant global CDN distribution with edge caching.
- Free SSL/TLS.
- Automatic rollback by re-deploying a previous commit.

Alternative deployment targets: **Vercel** (`vercel --prod`) or **Netlify** (`netlify deploy --prod --dir=dist`) — both have equally simple GitHub Actions integrations.

---

## 3. No Asset Minification
**Severity: MEDIUM**

None of the three source files are minified. Minification yields meaningful size reductions at zero quality cost:

| File | Estimated minified size | Saving |
|------|------------------------|--------|
| `index.html` (~50KB) | ~38KB | ~24% |
| `style.css` (~54KB) | ~40KB | ~26% |
| `script.js` (~44KB) | ~28KB | ~36% |

Total saving: approximately 42KB before Brotli/gzip compression. After compression, all three files together would serve in under 30KB over the wire.

**Recommendation:**

- HTML: `html-minifier-terser` (CLI: `html-minifier-terser --collapse-whitespace --remove-comments`)
- CSS: `lightningcss` or `cssnano` (both integrate with Vite/PostCSS)
- JS: `terser` (built into Vite; standalone: `terser script.js -o script.min.js --compress --mangle`)

---

## 4. No Image Optimisation Pipeline
**Severity: HIGH**

The `images/` directory contains 19 JPEG files. Images are typically the largest contributor to page weight and Largest Contentful Paint (LCP) time. No WebP or AVIF versions exist, and no responsive image markup (`srcset`, `sizes`) is used anywhere in `index.html`.

Current image inventory:

```
about-accent.jpg, about-main.jpg, delivery-1.jpg, delivery-2.jpg,
factory-bg.jpg, factory-gate.jpg, hero-bg.jpg, logo.png,
machine-1.jpg, machine-2.jpg, machine-3.jpg, machine-4.jpg,
machine-5.jpg, machine-6.jpg,
product-1.jpg, product-2.jpg, product-3.jpg, product-4.jpg, product-5.jpg
```

Notable issues:
- `hero-bg.jpg` is referenced in CSS (`style.css` line 1389) via `url('images/factory-bg.jpg')` but the file is `hero-bg.jpg` — a mismatch in naming exists (though `factory-bg.jpg` also exists and is used for the `.funfacts::before` background). Both images load on all viewports regardless of whether they are visible.
- No `loading="lazy"` on the hero image (appropriate — it is above the fold). Non-hero images below the fold do use `loading="lazy"` (e.g., `machine-1.jpg` through `machine-6.jpg`, `delivery-1.jpg`, `delivery-2.jpg`). However, `about-main.jpg` (used via CSS `background`) cannot benefit from native lazy loading.
- No `<picture>` element or `srcset` with WebP fallback is used for any image.

**Recommendation:**

1. **Convert all images to WebP with AVIF fallback** using `sharp` or `squoosh`:
   ```bash
   npx @squoosh/cli --webp '{}' --avif '{}' images/*.jpg
   ```
   Expected size reduction: 40–60% over JPEG at equivalent visual quality.

2. **Add responsive `srcset`** for the hero background and main product images:
   ```html
   <img src="images/factory-gate.webp"
        srcset="images/factory-gate-600.webp 600w,
                images/factory-gate-1200.webp 1200w,
                images/factory-gate-1920.webp 1920w"
        sizes="100vw"
        alt="ZY Steel Factory Entrance" />
   ```

3. **Add `width` and `height` attributes** to all `<img>` tags to prevent Cumulative Layout Shift (CLS). Currently no images have explicit dimensions in the HTML.

4. **Automate via Vite plugin**: `vite-plugin-imagemin` or `@unloc/vite-plugin-image-optimizer` can handle WebP conversion and compression as part of the build step.

---

## 5. No CDN for Own Assets
**Severity: MEDIUM**

Third-party libraries (GSAP, Lenis) are loaded from external CDNs (`cdnjs.cloudflare.com`, `cdn.jsdelivr.net`). However, the site's own assets (`style.css`, `script.js`, `images/*`) are served from wherever the HTML file is hosted — which is currently unknown. If the site is hosted on a shared hosting plan or a VPS without edge caching, TTFB (Time To First Byte) for users in Southeast Asia, Europe, or the Americas may be high given that the business operates from the Guangdong / Cambodia region.

**Recommendation:**

Deploying to **Cloudflare Pages** (free) automatically puts all assets on Cloudflare's global edge network (300+ PoPs). Alternatively, **AWS CloudFront** or **Bunny CDN** can front any existing origin server. Cloudflare Pages is the zero-cost, zero-configuration option for a static site of this type.

---

## 6. No Service Worker / Offline Support
**Severity: LOW** *(aspirational)*

There is no `manifest.json`, no service worker, and no PWA configuration. This means:
- The site cannot be installed as a home screen app on mobile.
- There is no offline fallback page.
- Repeat visitors always make full network requests for static assets.

**Recommendation:** For a B2B brochure site, full PWA support is not essential. However, a minimal service worker with a cache-first strategy for static assets (`style.css`, `script.js`, `logo.png`) would improve repeat-visit performance significantly. This is a low-priority enhancement unless mobile PWA installation is a product goal.

---

## 7. No Analytics or Monitoring
**Severity: MEDIUM**

There is no analytics script, no error tracking, and no uptime monitoring configured. The business cannot measure:
- How many visitors reach the site.
- Which sections or products are most viewed.
- Whether the contact form is clicked (it currently fakes submission, but even that click event is not tracked).
- Whether JavaScript errors are occurring in production.

**Recommendation:**

| Purpose | Recommended Tool | Cost |
|---|---|---|
| Web analytics | Cloudflare Web Analytics (already included if on CF Pages) | Free |
| Privacy-compliant analytics | Plausible or Fathom | ~$9/month |
| JS error tracking | Sentry (free tier: 5K errors/month) | Free |
| Uptime monitoring | UptimeRobot (free tier: 50 monitors) | Free |

Avoid adding Google Analytics (GA4) without a proper Cookie Consent implementation — it sets third-party cookies which require GDPR/CCPA compliance banners.

---

## 8. Missing `robots.txt` and `sitemap.xml`
**Severity: LOW**

There is no `robots.txt` or `sitemap.xml` in the project. Without a sitemap, search engine crawlers must discover all pages through link traversal. Since this is a single-page site, a `sitemap.xml` listing the one URL is straightforward but still beneficial for confirming the canonical URL to Google Search Console.

**Recommendation:**

```xml
<!-- sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.zhongyutiewang.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

```
# robots.txt
User-agent: *
Allow: /
Sitemap: https://www.zhongyutiewang.com/sitemap.xml
```

---

## Recommended Deployment Workflow (End State)

```
Developer commits code
    ↓
GitHub push to main branch
    ↓
GitHub Actions: CI workflow
  1. npm ci
  2. npm run build  (Vite: minifies JS/CSS, generates WebP images)
  3. Runs html-validate (HTML linting)
  4. Optionally: Lighthouse CI score gate (LCP < 2.5s threshold)
    ↓
Cloudflare Pages deployment
  - Automatic preview URL for PRs
  - Production deployment on merge to main
  - Instant global edge cache invalidation
  - Free SSL/TLS, HTTP/3, Brotli compression
    ↓
Monitoring
  - Cloudflare Web Analytics (built-in, no cookie required)
  - UptimeRobot ping every 5 minutes
  - Sentry JS error reporting
```

This entire stack is **free** at the expected traffic volume for a B2B manufacturer site.

---

## Summary Table

| # | Issue | Severity | Recommended Fix |
|---|---|---|---|
| 1 | No build system | MEDIUM | Vite or Parcel |
| 2 | No CI/CD pipeline | HIGH | GitHub Actions + Cloudflare Pages |
| 3 | No asset minification | MEDIUM | Terser + LightningCSS + html-minifier-terser |
| 4 | No image optimisation | HIGH | WebP/AVIF conversion + srcset + explicit dimensions |
| 5 | No CDN for own assets | MEDIUM | Cloudflare Pages / Bunny CDN |
| 6 | No service worker / offline support | LOW | Basic cache-first service worker |
| 7 | No analytics or error monitoring | MEDIUM | CF Analytics + Sentry + UptimeRobot |
| 8 | Missing `robots.txt` and `sitemap.xml` | LOW | Add both to project root |
