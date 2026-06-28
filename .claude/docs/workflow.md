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
  └─ tags: wf:coder-task, project:zhongyue-web, assign:coder

coder picks up via tasks.next assign:coder
  └─ implements → runs quality gate → commits (no push)
  └─ tasks.complete → wf:done, assign:code-reviewer

code-reviewer picks up via tasks.next assign:code-reviewer
  ├─ PASS → tasks.complete → wf:approved
  │          Human: git push origin main → CI runs
  └─ FAIL → tasks.create [CHANGE-REQUEST] → wf:change-request, assign:coder
             coder reworks → code-reviewer re-reviews

qa-agent picks up via tasks.next assign:qa-agent
  └─ exercises app → tasks.create [BUG] → wf:bug, assign:coder
     coder fixes bug → code-reviewer reviews → wf:approved → human pushes

advisor picks up via tasks.next assign:advisor
  └─ tasks.create sub-tasks → wf:coder-task, assign:coder

Any agent blocked:
  └─ tasks.create [NEEDS-HUMAN] → wf:needs-human, project:zhongyue-web, assign:<agent>
     [optional: wf:blocked if it blocks a parent]
     Agent continues other available work.
```

## Routing table (what to do after tasks.complete)

| Who completed | New state | Routed to |
|---|---|---|
| coder | `wf:done`, `assign:code-reviewer` | code-reviewer loop |
| code-reviewer PASS | `wf:approved` | human (push/deploy) |
| code-reviewer FAIL | new task `wf:change-request`, `assign:coder` | coder loop |
| qa-agent | new task `wf:bug`, `assign:coder` | coder loop |
| advisor | new tasks `wf:coder-task`, `assign:coder` | coder loop |

## Deploy (human-only — agents never push)

When `wf:approved` appears on a task:
1. Human reviews `git log main..HEAD` and `git diff main...HEAD`
2. Human runs `git push origin main`
3. CI (`.github/workflows/ci.yml`) automatically runs: lint → typecheck → test → build

## Task creation template

```
Title:  [TYPE] Short imperative description
Tags:   wf:<state>, project:zhongyue-web, assign:<agent>

## Goal
What and why.

## Acceptance criteria
- [ ] Testable condition 1
- [ ] Testable condition 2

## Context
Relevant files, constraints, related task IDs.
```

## [NEEDS-HUMAN] escalation template

```
Title:  [NEEDS-HUMAN] <what I need — one sentence>
Tags:   wf:needs-human, project:zhongyue-web, assign:<filing-agent>
        [+ wf:blocked if this blocks a parent task]

## What I need
## Why
## What I tried
## Related task ID
```
