# /sync-agent-task [agent]

Run one loop cycle for the given agent. Defaults to `coder` if no argument given.

Accepted values: `coder`, `code-reviewer`, `qa-agent`, `advisor`

## Steps

1. Resolve agent tag: `assign:<agent>` (e.g. `/sync-agent-task code-reviewer` → `assign:code-reviewer`).

2. **Call tasks.next:**
   ```bash
   curl -s -X POST "https://dailygoalmap.vercel.app/api/mcp" \
     -H "Content-Type: application/json" \
     -H "X-Project-Api-Key: $ORBIT_API_KEY" \
     -d '{"tool":"tasks.next","input":{"agent_tag":"assign:<agent>"}}'
   ```

3. If the response contains no tasks → report idle and stop.

4. Process the returned task following `.claude/agents/<agent>.md` rules — one task per cycle.
