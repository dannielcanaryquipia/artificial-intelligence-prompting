export interface PromptExample {
  id: string;
  weakPrompt: string;
  improvedPrompt: string;
  weakOutput: string;
  improvedOutput: string;
}

export const homepageExample: PromptExample = {
  id: "fix-code",
  weakPrompt: "fix my code",
  improvedPrompt:
    "Here's a Python function that's throwing a `KeyError` on line 12 [paste snippet]. Explain why the error happens, then show the corrected version. Keep the fix minimal — don't restructure the rest of the function.",
  weakOutput:
    "There's an error in your code. You need to check your dictionary keys. Make sure the key exists before accessing it.",
  improvedOutput:
    "The `KeyError` on line 12 happens because the dictionary `user_data` doesn't contain the key `'email'` at that point in execution. This typically occurs when:\n\n1. The key was never added to the dictionary\n2. The key name has a typo\n3. The data source returned an empty/partial object\n\nHere's the corrected version with a minimal fix:\n\n```python\ndef process_user(user_data):\n    email = user_data.get('email', 'no-email@provided.com')\n    # ... rest of function unchanged\n```\n\nThe `.get()` method returns a default value instead of raising an error when the key is missing.",
};

export const lessonExamples: PromptExample[] = [
  {
    id: "sql-debug",
    weakPrompt: "why doesn't my query work",
    improvedPrompt:
      "This SQL query is supposed to return customers with more than 3 orders but it's returning everyone. [paste query]. What's wrong with the HAVING clause, and how do I fix just that part?",
    weakOutput:
      "Check your query syntax. You might have an error in your WHERE or GROUP BY clause.",
    improvedOutput:
      "The issue is likely in your HAVING clause. Common mistakes:\n\n1. Using `HAVING COUNT(*) > 3` without a GROUP BY\n2. Referencing a column in HAVING that isn't in the SELECT or GROUP BY\n3. Using WHERE instead of HAVING for aggregate conditions\n\nQuick fix: Make sure your query follows this structure:\n```sql\nSELECT customer_id, COUNT(*) as order_count\nFROM orders\nGROUP BY customer_id\nHAVING COUNT(*) > 3;\n```\n\nIf you share your actual query, I can pinpoint the exact issue.",
  },
  {
    id: "error-message",
    weakPrompt: "what does this error mean",
    improvedPrompt:
      "I'm getting `ECONNREFUSED` when my Node app tries to connect to PostgreSQL locally. I'm using Docker. Explain the most likely cause in plain terms, then give me 2-3 things to check in order.",
    weakOutput:
      "ECONNREFUSED means the connection was refused. Check if your database server is running.",
    improvedOutput:
      "ECONNREFUSED means your Node app tried to connect to PostgreSQL but nothing was listening on that port. With Docker, the most common causes are:\n\n**1. PostgreSQL container isn't running**\n```bash\ndocker ps | grep postgres\n```\nIf nothing shows, start it: `docker start <container-name>`\n\n**2. Port mismatch**\nYour app might be connecting to port 5432, but Docker mapped it to a different host port. Check with:\n```bash\ndocker port <container-name>\n```\n\n**3. Wrong host**\nIf both run in Docker, use the container name (e.g., `postgres`) as the host, not `localhost`.",
  },
  {
    id: "learn-tool",
    weakPrompt: "teach me react router",
    improvedPrompt:
      "I already know React basics (components, props, useState). Explain react-router-dom v6 assuming that background — just the parts I need to build a 5-page site with a shared nav. Skip the beginner React explanation.",
    weakOutput:
      "React Router is a library for routing in React. You can install it with npm and use Route components to define pages.",
    improvedOutput:
      "Here's exactly what you need for a 5-page site with shared nav:\n\n**1. Install and wrap your app:**\n```jsx\nimport { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route path=\"/\" element={<Layout />}\n          <Route index element={<Home />} />\n          <Route path=\"about\" element={<About />} />\n          <Route path=\"contact\" element={<Contact />} />\n        </Route>\n      </Routes>\n    </BrowserRouter>\n  );\n}\n```\n\n**2. Shared nav with Outlet:**\n```jsx\nfunction Layout() {\n  return (\n    <div>\n      <nav>{/* your nav links */}</nav>\n      <Outlet />  {/* child routes render here */}\n    </div>\n  );\n}\n```\n\n**3. Navigation:**\n```jsx\nimport { Link, NavLink } from 'react-router-dom';\n<NavLink to=\"/about\" className={({isActive}) => isActive ? 'active' : ''}>\n```\n\nThat's 90% of what you need. Start there.",
  },
];
