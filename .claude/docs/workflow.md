# Workflow

## Agent roles

| Agent | Can edit source? | Primary action |
|---|---|---|
| **coder** | YES | Implements tasks, runs quality gate, commits |
| **code-reviewer** | NO | Reviews diffs, gates work before human push |
| **qa-agent** | NO | Exercises running app, files bug tasks |
| **advisor** | NO | Breaks goals into specced coder tasks |

## Tag state machine

```
Human (or advisor) creates task
  └─ tags: wf:ready, project:zhongyue-web, assign:coder

coder picks up via tasks.next assign:coder
  └─ tasks.status → in_progress
  └─ implements → checks off checklist items via tasks.checklist
  └─ runs quality gate → commits (no push)
  └─ tasks.status → in_review
  └─ tasks.tags.add [wf:done, assign:code-reviewer]
  └─ tasks.tags.remove [assign:coder]
  └─ tasks.comment handoff note

code-reviewer picks up via tasks.next assign:code-reviewer
  ├─ PASS → tasks.status → done
  │          tasks.tags.add [wf:approved]
  │          tasks.tags.remove [assign:code-reviewer]
  │          tasks.comment "Approved: ..."
  │          Human: git push origin main → wrangler pages deploy (manual)
  └─ FAIL → tasks.create [CHANGE-REQUEST]
               tags: wf:change-request, assign:coder
               tasks.deps.add: original task blocked_by change-request
             tasks.comment "Change request filed: <id>"

coder reworks → re-routes to code-reviewer → loop

qa-agent picks up via tasks.next assign:qa-agent
  └─ exercises live site → tasks.create [BUG]
       tags: wf:bug, assign:coder
       dedupe_key: "bug/<slug>" (prevents duplicate reports)
     coder fixes → code-reviewer reviews → wf:approved → human deploys

advisor picks up via tasks.next assign:advisor
  └─ tasks.create sub-tasks with checklist acceptance criteria
       tags: wf:ready, assign:coder, parent_id: epic-task-id

Any agent blocked:
  └─ tasks.create [NEEDS-HUMAN] <what I need>
       tags: wf:needs-human, project:zhongyue-web
       dedupe_key: "needs-human/<slug>"
       tasks.deps.add: stuck task blocked_by needs-human task
     Agent continues other available work.
```

## Routing table

| Who completed | Next status | Tags to add | Tags to remove | Routed to |
|---|---|---|---|---|
| coder | `in_review` | `wf:done`, `assign:code-reviewer` | `assign:coder` | code-reviewer loop |
| code-reviewer PASS | `done` | `wf:approved` | `assign:code-reviewer` | human (push+deploy) |
| code-reviewer FAIL | stays `in_review` | — | — | new change-request task → coder |
| qa-agent | — | — | — | new bug task → coder |
| advisor | — | — | — | new sub-tasks → coder |

## Deploy step (human-only — agents never push or deploy)

When `wf:approved` appears on a task:

1. Human reviews: `git log main..HEAD` and `git diff main...HEAD`
2. Human commits if anything unstaged: `git add <files> && git commit -m "..."`
3. Human builds: `npm run build`
4. Human pushes: `git push origin main`
5. Human deploys:
   ```bash
   CLOUDFLARE_API_TOKEN="..." wrangler pages deploy dist/ --project-name=zysteels --branch=main
   ```

No CI pipeline exists — every deploy is manual.

## Task creation template

```
Title:  [TYPE] Short imperative description
Tags:   wf:ready, project:zhongyue-web, assign:<agent>

## Goal
What and why.

## Acceptance criteria (checklist)
- [ ] Testable condition 1
- [ ] Testable condition 2

## Context
Relevant files, constraints, related task IDs.
```

## [NEEDS-HUMAN] escalation template

```
Title:  [NEEDS-HUMAN] <what I need — one sentence>
Tags:   wf:needs-human, project:zhongyue-web
dedupe_key: needs-human/<slug>

## What I need
## Why
## What I tried
## Related task ID
```
