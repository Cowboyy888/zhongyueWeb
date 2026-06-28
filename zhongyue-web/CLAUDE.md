# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

See the root `../CLAUDE.md` for full repo context. This file covers Next.js-specific rules.

## Commands

```bash
npm run dev        # Turbopack dev server → localhost:3000
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run test       # Vitest unit tests
```

## Critical: Next.js 16 breaking changes

@AGENTS.md

Next.js 16.2.9 has breaking changes. Read `node_modules/next/dist/docs/` before writing App Router code.

## Tailwind v4

Uses `@import "tailwindcss"` and `@theme inline {}` in `app/globals.css`. There is no `tailwind.config.js`. Do not use `@tailwind base/components/utilities` (v3 syntax).

## Path alias

`@/*` → repo root (`zhongyue-web/`).
