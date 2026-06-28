# Project Context

Lean reference for agents — avoids re-reading the full repo each cycle.

## What this project is

Official marketing website for **Zhongyue Steel Wire Group** (中粤铁网公司), a welded rebar mesh manufacturer. Bilingual (Chinese / English). ISO 9001 certified. 60+ export countries.

## Two codebases, one repo

| | Static site (root) | Next.js app (`zhongyue-web/`) |
|---|---|---|
| Stack | HTML5 + CSS3 + vanilla JS | Next.js 16.2.9, React 19, TS 5, Tailwind v4 |
| GSAP / Lenis | CDN `<script>` tags | npm packages |
| Entry points | `index.html` (zh), `index-en.html` (en), `privacy-policy.html`, `terms-of-use.html` | `app/page.tsx` |
| i18n | `localStorage` + translation map in `script.js` | not yet implemented |
| Status | **Production** | Early migration — placeholder page only |

## Key files

| File | Purpose |
|------|---------|
| `index.html` | Bilingual SPA — all sections |
| `style.css` | Design system (~1800 lines) |
| `script.js` | Animations, i18n, interactions (~870 lines) |
| `zhongyue-web/app/layout.tsx` | Root layout, metadata, Geist fonts |
| `zhongyue-web/app/globals.css` | Tailwind v4 import + CSS custom properties |
| `zhongyue-web/next.config.ts` | Minimal Next.js config |

## Quality gate (all three must pass, run from `zhongyue-web/`)

```bash
npm run lint && npm run typecheck && npm test -- --run
```

## CI pipeline

`.github/workflows/ci.yml` — push to `main` triggers: `npm ci` → lint → typecheck → test → build (working-dir: `zhongyue-web`). No deploy step in CI.

## Commit style

Conventional commits: `feat:`, `fix:`, `perf:`, `perf/a11y/i18n:` etc.

## Critical constraints

- Tailwind v4: `@import "tailwindcss"` + `@theme inline {}` — no v3 `@tailwind` directives
- Next.js 16 has breaking changes — check `zhongyue-web/node_modules/next/dist/docs/` before writing App Router code
- GSAP must tick through `gsap.ticker` only — no manual `requestAnimationFrame` loop running alongside it
- Canvas animations must pause via `IntersectionObserver` when off-screen
- Static site i18n: any new user-facing string must appear in BOTH zh and en maps in `script.js`
- No `any`, no `// @ts-ignore`, no `console.log` in production code
- Agents **never push** — `git push` is a human-only action

## Open items (from README — advisor reference)

| Priority | Item |
|----------|------|
| HIGH | Wire contact form to real backend (Formspree / EmailJS / Cloudflare Workers) |
| HIGH | Convert all JPEGs to WebP (53 MB → ~5 MB) |
| HIGH | Replace placeholder ICP license number |
| HIGH | Deploy to CDN (Cloudflare Pages / Netlify) |
| MEDIUM | Add SRI hashes to GSAP and Lenis CDN script tags |
| MEDIUM | Respect `prefers-reduced-motion` in all GSAP animations |
| MEDIUM | Add `width`/`height` to all `<img>` elements |
| MEDIUM | Add `robots.txt` and `sitemap.xml` |
