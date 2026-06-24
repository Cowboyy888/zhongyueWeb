# WORK_QUEUE.md
**Generated:** 2026-06-24 | **Phase 3 — Prioritized Work Queue**

Tasks are executed one at a time. Each task gets its own commit.
Status: [ ] = pending, [x] = complete, [!] = blocked

---

## P0 — Critical (fix immediately)

- [x] WQ-01 · BUG-001 · Remove duplicate `.meta-num` counter handler (script.js:369-386) — commit 2cca67b

## P1 — High (fix before any P2)

- [x] WQ-02 · BUG-003 · Fix hero entrance: `gsap.to → gsap.fromTo` with real y offset — commit 9d877d1
- [x] WQ-03 · BUG-002 · Replace no-op `gsap.to(steps)` with `ScrollTrigger.create()` — commit c55a9c8

## P2 — Medium (fix in order)

- [x] WQ-04 · BUG-004 · Delete dead `.spec-card` event listener block (script.js:860-871) — commit 6ca1235
- [x] WQ-05 · BUG-005 · Delete dead `.hero-meta` / `.hero-meta-sep` CSS rules (style.css:607-613) — commit ec870bc
- [x] WQ-06 · BUG-006 · git rm three orphaned images (about-accent, about-main, hero-bg) — commit bed60bf
- [x] WQ-07 · BUG-007 · Nav highlight: replace window.scrollY with lenis.on('scroll') — commit ec55bec
- [x] WQ-08 · BUG-008 · Fix href="#" placeholder links (prevent page-top scroll) — commit 40fddc0

## P3 — Low

- [x] WQ-09 · BUG-009 · Update copyright year 2025 → 2026 — commit 29d234e
- [!] WQ-10 · BUG-010 · Replace placeholder ICP number (requires client input — BLOCKED)
