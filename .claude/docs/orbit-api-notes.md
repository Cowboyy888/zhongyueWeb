# ORBIT API Notes

## Endpoint

```
POST https://dailygoalmap.vercel.app/api/mcp
```

## Auth

Header: `X-Project-Api-Key: $ORBIT_API_KEY`

The key lives in `.env` at repo root (gitignored). **Never print, log, or commit it.**

## Request / Response format

```json
{ "tool": "<tool-name>", "input": { ... } }
→ { "ok": true, "status": 200, "result": { ... } }
```

Unknown task IDs → 404 (never a silent no-op). `"id"` is accepted as alias for `"task_id"`.

## Verified connection

`tasks.list { limit: 1 }` → OK — verified 2026-07-08.

## Shell invocation pattern

```bash
curl -s -X POST "https://dailygoalmap.vercel.app/api/mcp" \
  -H "Content-Type: application/json" \
  -H "X-Project-Api-Key: $ORBIT_API_KEY" \
  -d '{ "tool": "tasks.next", "input": { "agent_tag": "assign:coder" } }'
```

`$ORBIT_API_KEY` is expanded by the shell — never hardcoded in any `.claude/` file.

## Full tool catalog (from tasks.describe 2026-07-08)

### Core lifecycle

| Tool | Purpose |
|---|---|
| `tasks.next` | PRIMARY loop entry — next open task for `agent_tag`, FIFO, injection-safe. Skips blocked + dependency-blocked tasks automatically. Returns `{idle:true}` when empty. |
| `tasks.status` | Set status: `backlog` → `todo` → `in_progress` → `in_review` → `blocked` → `done`. `done` is 409-guarded while sub-tasks or blockers are open — never force. |
| `tasks.complete` | Convenience complete (sets done + completed=true). Also 409-guarded. Prefer `tasks.status` for intermediate states. |
| `tasks.get` | Fetch one task — includes blockers, sub-task roll-up, recent activity. |
| `tasks.list` | List tasks with filters: `tags` (match=any/all), `exclude_tags`, `status`, `updated_since`, `parent_id`, `date*`, `completed`. Paginated via `limit`/`offset`. |
| `tasks.create` | Create task. Supports `parent_id` (sub-tasks of an epic), `checklist` (acceptance criteria array), `dedupe_key` (idempotent — safe to retry). |
| `tasks.update` | Update mutable fields (title, description, dates). Never use to replace the tag array — use `tasks.tags.add/remove` instead. |
| `tasks.delete` | Hard delete — use sparingly. |
| `tasks.move` | Reorder position within the list. |
| `tasks.bulk` | Batch create/update/tag/status — use for efficiency when touching multiple tasks. |

### Tags (always atomic — never replace the full array)

```json
{ "tool": "tasks.tags.add",    "input": { "task_id": "...", "tags": ["wf:done"] } }
{ "tool": "tasks.tags.remove", "input": { "task_id": "...", "tags": ["assign:coder"] } }
```

Also accepts `task_ids` (array) for bulk tag ops.

### Dependencies

```json
{ "tool": "tasks.deps.add",    "input": { "task_id": "ORIGINAL", "blocked_by": "BLOCKER_ID" } }
{ "tool": "tasks.deps.remove", "input": { "task_id": "ORIGINAL", "blocked_by": "BLOCKER_ID" } }
```

`tasks.next` skips dependency-blocked tasks automatically — no agent needs to check manually.

### Checklist (acceptance criteria)

```json
{ "tool": "tasks.checklist", "input": { "task_id": "...", "index": 0, "done": true } }
```

Check off each acceptance criterion as it is met during implementation.

### Comments (append-only handoffs — never rewrite description)

```json
{ "tool": "tasks.comment",  "input": { "task_id": "...", "body": "...", "author": "coder" } }
{ "tool": "tasks.comments", "input": { "task_id": "..." } }
```

### Activity / audit

```json
{ "tool": "tasks.activity", "input": { "since": "2026-07-01T00:00:00Z" } }
```

### Tag configuration

```json
{ "tool": "tags.config.list",   "input": {} }
{ "tool": "tags.config.set",    "input": { "tag": "wf:approved", "color": "#22c55e" } }
{ "tool": "tags.config.delete", "input": { "tag": "old-tag" } }
```

### Notes (project-level scratch)

```json
{ "tool": "notes.list",   "input": {} }
{ "tool": "notes.get",    "input": { "id": "..." } }
{ "tool": "notes.create", "input": { "title": "...", "body": "..." } }
{ "tool": "notes.update", "input": { "id": "...", "body": "..." } }
{ "tool": "notes.delete", "input": { "id": "..." } }
```

## Status values

`backlog` → `todo` → `in_progress` → `in_review` → `blocked` → `done`

## Poll cadence

- `tasks.next` is cheap — call it **once** at the start of each loop cycle.
- On idle: stop the cycle. Do NOT re-poll in a tight loop.
- Lean on `project-context.md` instead of re-reading the repo each cycle.
