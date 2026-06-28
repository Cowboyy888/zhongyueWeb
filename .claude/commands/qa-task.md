# /qa-task <task-id>

Exercise the running app for the scope described in the given ORBIT task.

## Steps

1. **Confirm localhost:3000 is responding:**
   ```bash
   curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
   ```
   If not 200, file a `[NEEDS-HUMAN]` task (dev server must be started manually: `cd zhongyue-web && npm run dev`) and stop.

2. **Fetch the task:**
   ```bash
   curl -s -X POST "https://dailygoalmap.vercel.app/api/mcp" \
     -H "Content-Type: application/json" \
     -H "X-Project-Api-Key: $ORBIT_API_KEY" \
     -d '{"tool":"tasks.list","input":{"id":"$ARGUMENTS"}}'
   ```

3. Exercise the app per `.claude/agents/qa-agent.md` rules and checklist.

4. For each confirmed bug, create a bug task:
   ```bash
   curl -s -X POST "https://dailygoalmap.vercel.app/api/mcp" \
     -H "Content-Type: application/json" \
     -H "X-Project-Api-Key: $ORBIT_API_KEY" \
     -d '{
       "tool":"tasks.create",
       "input":{
         "title":"[BUG] <description>",
         "description":"## Steps to reproduce\n\n## Expected\n\n## Actual\n\n## URL / section\n",
         "tags":["wf:bug","project:zhongyue-web","assign:coder"]
       }
     }'
   ```

5. **Complete the task:**
   ```bash
   curl -s -X POST "https://dailygoalmap.vercel.app/api/mcp" \
     -H "Content-Type: application/json" \
     -H "X-Project-Api-Key: $ORBIT_API_KEY" \
     -d '{"tool":"tasks.complete","input":{"id":"$ARGUMENTS"}}'
   ```
