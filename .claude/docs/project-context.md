# Project Context

Lean reference for agents — avoids re-reading the full repo each cycle.

## What this project is

Official marketing website for **Zhongyue Steel Wire Group** (中粤铁网公司), a welded rebar mesh manufacturer based in Cambodia. Bilingual (Chinese / English). ISO 9001 certified. 60+ export countries. Live at **https://www.zysteels.net**.

## Two codebases, one repo

| | Static site (root) | Next.js app (`zhongyue-web/`) |
|---|---|---|
| Stack | HTML5 + CSS3 + Vanilla JS | Next.js 16.2.9, React 19, TS 5, Tailwind v4 |
| GSAP / Lenis | CDN `<script>` tags (SRI-hashed) | npm packages |
| Entry points | `index.html` (zh), `index-en.html` (en), 5 product pages, `privacy-policy.html`, `terms-of-use.html` | `app/page.tsx` |
| i18n | `localStorage` (`zy-lang`) + translation map in `script.js` | not yet implemented |
| Status | **Production** | Early migration — placeholder page only |

## Key files

| File | Purpose |
|------|---------|
| `index.html` | Bilingual SPA — all sections (hero, products, gallery, why-us, process, about, contact) |
| `index-en.html` | English entry point (minimal differences from index.html) |
| `style.css` | Design system (~2200 lines). Append additions at the end. |
| `script.js` | GSAP animations, i18n, lightbox, scroll interactions, form validation (~900 lines) |
| `_headers` | Cloudflare Pages HTTP security headers |
| `sitemap.xml` | All 9 pages listed |
| `robots.txt` | `Allow: /`, points to sitemap |
| `dist/` | Build output — exact copy of source files via `npm run build` |
| `zhongyue-web/app/layout.tsx` | Root layout, metadata, Geist fonts |
| `zhongyue-web/app/globals.css` | Tailwind v4 import + CSS custom properties |

## Product pages (all live)

| File | Product |
|------|---------|
| `product-wire-mesh.html` | Welded Rebar Mesh (4–12mm, 100–200mm spacing, GB/T 1499.3 / BS 4483 / ASTM A1064) |
| `product-floor-mesh.html` | Floor Slab Mesh (6–10mm, 150mm, HRB400) |
| `product-fence-mesh.html` | Welded Fence Mesh (3–6mm, 50–100mm openings, galvanized/powder-coated) |
| `product-custom-mesh.html` | Custom-Shape Mesh (L/T/curved/stepped, ±5mm, 7–15 day lead time) |
| `product-wire-rod.html` | Cold-Drawn Wire & Rod (3–12mm, Q195/Q235, ≥570MPa) |

All product pages have: BreadcrumbList schema, Product schema, Related Products cross-link grid.

## Integrations (live)

| Integration | Details |
|---|---|
| **Google Analytics GA4** | `G-N12Q0PQKJ0` — on all 9 pages in `<head>` |
| **Formspree** | Form ID `xwvdnklo` — contact form → `zysteel@zohomail.com` |
| **Tawk.to live chat** | Property `6a4368f88642321d48550f18`, Widget `1jsbo5cj4` — floating, bottom-left |
| **Cloudflare Pages** | Project `zysteels`, custom domain `www.zysteels.net` |
| **Google Search Console** | Verified, sitemap submitted 2026-07-08 |

## Build & deploy

```bash
# Build (static site → dist/)
npm run build

# Deploy (human-only — agents NEVER run this)
CLOUDFLARE_API_TOKEN="..." wrangler pages deploy dist/ --project-name=zysteels --branch=main
```

No CI pipeline exists. Deploy is always manual by the human after `wf:approved`.

## Quality gate

For **static-site tasks** — verify by inspection + build:
```bash
npm run build   # must succeed with no errors
```

For **Next.js (`zhongyue-web/`) tasks** — all three must pass:
```bash
cd zhongyue-web && npm run lint && npm run typecheck && npm test -- --run
```

## Commit style

Conventional commits: `feat:`, `fix:`, `perf:`, `seo:`, `chore:` etc.
Co-author line: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`

## Critical constraints

- **Tailwind v4**: `@import "tailwindcss"` + `@theme inline {}` — never v3 `@tailwind` directives
- **Next.js 16 breaking changes**: check `zhongyue-web/node_modules/next/dist/docs/` before writing App Router code
- **GSAP**: must tick through `gsap.ticker` only — no manual `requestAnimationFrame` alongside it
- **Canvas animations**: must pause via `IntersectionObserver` when off-screen
- **i18n**: any new user-facing string must appear in BOTH zh and en maps in `script.js`
- **No `any`**, no `// @ts-ignore`**, no `console.log`** in production code
- **Agents never push** — `git push` is a human-only action
- **Agents never deploy** — Wrangler deploy is human-only

## Open items (as of 2026-07-08)

| Priority | Item |
|----------|------|
| HIGH | Formspree email confirmation — user must confirm `zysteel@zohomail.com` at formspree.io |
| HIGH | Next.js migration — `zhongyue-web/` is a placeholder; full port of bilingual SPA not yet started |
| MEDIUM | Core Web Vitals audit — LCP / CLS / INP not yet formally benchmarked |
| LOW | Tawk.to "Always online" status — needs dashboard config |
