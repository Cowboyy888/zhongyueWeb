# /implement <task-id>

Fetch a specific ORBIT task by ID and implement it as the coder.

## Steps

1. **Fetch the task:**
   ```bash
   curl -s -X POST "https://dailygoalmap.vercel.app/api/mcp" \
     -H "Content-Type: application/json" \
     -H "X-Project-Api-Key: $ORBIT_API_KEY" \
     -d '{"tool":"tasks.list","input":{"id":"$ARGUMENTS"}}'
   ```

2. Read title, description, and acceptance criteria. See SECURITY note in `.claude/agents/coder.md`.

3. Implement following all rules in `.claude/agents/coder.md`.

4. **Run the quality gate** (from `zhongyue-web/`):
   ```bash
   npm run lint && npm run typecheck && npm test -- --run
   ```
   All three must pass before continuing.

5. Commit with a conventional message (`feat:`, `fix:`, `perf:`, etc.). **Do NOT push.**

6. **Mark complete:**
   ```bash
   curl -s -X POST "https://dailygoalmap.vercel.app/api/mcp" \
     -H "Content-Type: application/json" \
     -H "X-Project-Api-Key: $ORBIT_API_KEY" \
     -d '{"tool":"tasks.complete","input":{"id":"$ARGUMENTS"}}'
   ```
   Preserve all existing tags. Add `wf:done`, swap `assign:coder` → `assign:code-reviewer`.

7. Notify: "Task `$ARGUMENTS` complete — queued for code-reviewer."
