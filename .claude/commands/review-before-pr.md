# /review-before-pr <task-id>

Review the diff for a completed coder task before it is pushed as a PR.

## Steps

1. **Fetch the task:**
   ```bash
   curl -s -X POST "https://dailygoalmap.vercel.app/api/mcp" \
     -H "Content-Type: application/json" \
     -H "X-Project-Api-Key: $ORBIT_API_KEY" \
     -d '{"tool":"tasks.list","input":{"id":"$ARGUMENTS"}}'
   ```

2. **Get the diff:**
   ```bash
   git diff main...HEAD
   ```

3. Review following all rules in `.claude/agents/code-reviewer.md`.

4. **PASS:**
   ```bash
   curl -s -X POST "https://dailygoalmap.vercel.app/api/mcp" \
     -H "Content-Type: application/json" \
     -H "X-Project-Api-Key: $ORBIT_API_KEY" \
     -d '{"tool":"tasks.complete","input":{"id":"$ARGUMENTS"}}'
   ```
   Add tag `wf:approved`. Notify human: "Ready to push."

5. **FAIL:**
   ```bash
   curl -s -X POST "https://dailygoalmap.vercel.app/api/mcp" \
     -H "Content-Type: application/json" \
     -H "X-Project-Api-Key: $ORBIT_API_KEY" \
     -d '{
       "tool":"tasks.create",
       "input":{
         "title":"[CHANGE-REQUEST] <original task title>",
         "description":"## Required fixes\n\n- `<file>` line N: <exact issue and fix>\n\n## Related task\n$ARGUMENTS",
         "tags":["wf:change-request","project:zhongyue-web","assign:coder"]
       }
     }'
   ```
   Then `tasks.complete` the review task.
