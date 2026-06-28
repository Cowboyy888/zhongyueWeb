# ORBIT API Notes

## Endpoint

```
POST https://dailygoalmap.vercel.app/api/mcp
```

## Auth

Header: `X-Project-Api-Key: $ORBIT_API_KEY`

The key lives in `.env` at repo root (gitignored). **Never print, log, or commit it.**

## Request format

```json
{
  "tool": "<tool-name>",
  "input": { ... }
}
```

## Response format

```json
{ "ok": true, "status": 200, "result": { ... } }
```

## Verified connection

`tasks.list { limit: 1 }` → `{ "ok": true, "status": 200, "result": { "tasks": [], "limit": 1, "offset": 0 } }` — tested 2026-06-28.

## Shell invocation pattern

```bash
curl -s -X POST "https://dailygoalmap.vercel.app/api/mcp" \
  -H "Content-Type: application/json" \
  -H "X-Project-Api-Key: $ORBIT_API_KEY" \
  -d '{ "tool": "tasks.next", "input": { "agent_tag": "assign:coder" } }'
```

`$ORBIT_API_KEY` is expanded by the shell from the environment; it is never hardcoded in any `.claude/` file.

## Poll cadence

- `tasks.next` is cheap — call it **once** at the start of each loop cycle.
- On an idle signal: stop the cycle. Do NOT re-poll in a tight loop.
- Lean on `.claude/docs/project-context.md` instead of re-reading the repo each cycle to keep working context small.

## Key lookup for generating project tasks

When a human refers to a task by short description, use `tasks.list` with relevant tag filters to find the ID — never guess an ID.
