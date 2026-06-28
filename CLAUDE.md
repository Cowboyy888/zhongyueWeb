# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Layout

This repo contains **two parallel implementations** of the same website — a vanilla static site (root) and an in-progress Next.js rebuild (`zhongyue-web/`):

```
zhongyueWeb/
├── index.html / index-en.html   # Bilingual SPA — Chinese default, English variant
├── privacy-policy.html / terms-of-use.html
├── style.css                    # Design system (~1800 lines)
├── script.js                    # Animations, i18n, interactions (~870 lines)
├── dist/                        # Static build output (copy of above)
├── images/                      # All photography assets
├── tests/
│   ├── smoke.test.ts            # Vitest smoke test
│   └── e2e/home.spec.ts         # Playwright e2e (targets localhost:3000)
├── package.json                 # Root build + Playwright
└── zhongyue-web/                # Next.js 16 migration (early stage)
```

## Static Site (root)

No build step for development — open `index.html` directly in a browser. GSAP and Lenis are loaded via CDN inside the HTML.

**Build** (copies files to `dist/`):
```bash
npm run build
```

**E2E tests** (requires a server running on port 3000):
```bash
npx playwright test tests/e2e/home.spec.ts
```

**Unit/smoke tests:**
```bash
npx vitest tests/smoke.test.ts
```

### Static site architecture

- **Bilingual i18n** — language state stored in `localStorage`. `script.js` reads this on load and swaps text content via a translation map. Language toggle buttons update `localStorage` and re-render. `index.html` is Chinese; `index-en.html` is the English entry point.
- **Animations** — GSAP (ScrollTrigger, timelines) + Lenis smooth scroll ticked exclusively through `gsap.ticker` (not a manual RAF loop). Canvas animations in the About section are paused via `IntersectionObserver` when off-screen.
- **Pages**: `index.html` (bilingual SPA), `privacy-policy.html`, `terms-of-use.html`.

## Next.js App (`zhongyue-web/`)

**All commands run from inside `zhongyue-web/`:**

```bash
npm run dev        # Turbopack dev server → localhost:3000
npm run build      # Production build
npm run lint       # ESLint (core-web-vitals + typescript rules)
npm run typecheck  # tsc --noEmit
npm run test       # Vitest unit tests
```

### Critical: Next.js 16 breaking changes

Next.js 16.2.9 has breaking changes from older versions. **Before writing any Next.js code, read `zhongyue-web/node_modules/next/dist/docs/`** for current APIs. Do not assume App Router conventions from training data are correct for this version.

### Next.js architecture

- **App Router** with `app/layout.tsx` (root layout, metadata, Geist fonts) and `app/page.tsx`.
- **Tailwind CSS v4** — uses `@import "tailwindcss"` and `@theme inline {}` syntax. This is NOT Tailwind v3. The `tailwind.config.js` file does not exist; configuration lives in `globals.css`.
- **Path alias**: `@/*` resolves to `zhongyue-web/` root.
- **TypeScript**: strict mode, `moduleResolution: bundler`.
- **Animation deps available as npm packages**: `framer-motion`, `gsap`, `lenis`, `lucide-react`, `react-intersection-observer`.
- The migration is at an early stage — `app/page.tsx` is currently a placeholder. The full bilingual SPA from the static site has not yet been ported.

### Tailwind v4 syntax reminders

```css
/* globals.css — correct v4 pattern */
@import "tailwindcss";

@theme inline {
  --color-brand: #f59e0b;
}
```

Do not use `@tailwind base/components/utilities` directives (v3 syntax).

## Multi-Agent Workflow (ORBIT)

This repo is wired to a DailyGoalMap ORBIT task queue with four specialist agents. See `.claude/docs/` for full documentation.

| File | Purpose |
|------|---------|
| `.claude/docs/workflow.md` | Tag state machine, routing table, deploy step |
| `.claude/docs/project-context.md` | Lean repo reference for agents (avoid re-reading the full codebase each cycle) |
| `.claude/docs/orbit-api-notes.md` | MCP endpoint, auth, shell invocation pattern |
| `.claude/skills/orbit-task-manager.md` | Full ORBIT tool reference + tag taxonomy |
| `.claude/agents/coder.md` | Coder loop + conventions + hard stops |
| `.claude/agents/code-reviewer.md` | Reviewer loop + checklist |
| `.claude/agents/qa-agent.md` | QA loop + bug filing template |
| `.claude/agents/advisor.md` | Advisor loop + task sizing guidance |

**Slash commands:** `/implement <id>`, `/review-before-pr <id>`, `/qa-task <id>`, `/sync-agent-task [agent]`

**Key rule:** Agents never push. `wf:approved` → human runs `git push origin main` → CI deploys.
