export interface PromptExample {
  id: string;
  weakPrompt: string;
  improvedPrompt: string;
  weakOutput: string;
  improvedOutput: string;
}

export const nestedLoopBugCode = `function findDuplicates(arr) {
  let duplicates = [];
  for (let i = 0; i <= arr.length; i++) {
    for (let j = 0; j <= arr.length; j++) {
      if (arr[i] === arr[j]) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}`;

export const nestedLoopExample: PromptExample = {
  id: "nested-loop",
  weakPrompt: "fix my code, it's not working [pastes function]",
  improvedPrompt:
    "I'm Danniel, a first-year student learning JavaScript for-loops this week. This nested loop is supposed to return only numbers that appear more than once, but it's returning every number instead. Find the bug(s) in the loop conditions and comparison logic. List each bug with a one-line explanation, then show corrected code only for the affected lines. Don't rewrite the whole function using a different approach like `Set` — I need to understand what's wrong with the loop version specifically, since that's what we're learning this week.",
  weakOutput:
    "Sure! Try using a `Set` to track seen values instead — here's a rewritten version using that approach:\n\n```js\nfunction findDuplicates(arr) {\n  const seen = new Set();\n  const duplicates = new Set();\n  for (const n of arr) {\n    if (seen.has(n)) duplicates.add(n);\n    seen.add(n);\n  }\n  return [...duplicates];\n}\n```\n\nThat avoids the nested loop entirely.",
  improvedOutput:
    "Two bugs in the loop conditions and comparison logic:\n\n**1. Off-by-one bounds** — `i <= arr.length` and `j <= arr.length` should be `<`. Arrays are zero-indexed, so the last valid index is `arr.length - 1`. On the final pass the loop reads `arr[arr.length]`, which is `undefined`, and pushes it into the results — that's the crash you saw.\n\n**2. Missing `i !== j` check** — with no guard, every element matches *itself*, so every element gets pushed even when a value only appears once. That's why it returns every number, not just the repeats.\n\nCorrected lines:\n\n```js\nfor (let i = 0; i < arr.length; i++) {\n  for (let j = 0; j < arr.length; j++) {\n    if (i !== j && arr[i] === arr[j]) {\n      duplicates.push(arr[i]);\n    }\n  }\n}\n```",
};

export const homepageExample: PromptExample = nestedLoopExample;

export const lessonExamples: PromptExample[] = [
  {
    id: "error-message",
    weakPrompt: "what does this error mean",
    improvedPrompt:
      "I'm Danniel, a first-year student working in VSCode on a React app built with Vite and React Router v7. I added a new page file `src/pages/About.tsx` because I read React Router does file-based routing, but when I open `/about` the page is blank and the console shows `No route matches location \"/about\"`. Explain why in plain terms — tell me the difference between file-based routing and the `<Routes>` I already have in `App.tsx`. Then show me the smallest change to make `/about` work; don't rewrite my whole `App.tsx`, just the line(s) that need to change.",
    weakOutput:
      "No route matches location \"/about\" means the URL you opened doesn't have a route attached to it. Check your routes and make sure one exists for /about.",
    improvedOutput:
      "Your project uses JSX routing — a `<BrowserRouter>` wrapping `<Routes>` in `App.tsx` — not file-based routing. So creating `src/pages/About.tsx` does nothing by itself: Vite doesn't auto-register page files, and React Router only renders the `<Route>` elements you declare. That's why you get `No route matches location \"/about\"` and a blank page.\n\n**1. The smallest fix:** register the route in your existing `<Routes>`:\n\n```jsx\n<Route path=\"about\" element={<About />} />\n```\n\nand import it at the top of `App.tsx`:\n\n```jsx\nimport About from \"./pages/About\";\n```\n\n**2. What file-based routing actually is:** a separate mode (React Router v7 framework mode) where routes are derived from the `.tsx` files in a `routes/` folder through a routes module + Vite plugin — create a file and a route appears. You don't have that mode wired up; you have declarative `<Routes>`, where every page is a line you add yourself. For a learning project, the fix above is the right move.",
  },
  {
    id: "learn-tool",
    weakPrompt: "teach me react router",
    improvedPrompt:
      "I'm Danniel, a first-year student who already knows React basics (components, props, useState). Explain react-router-dom v7 assuming that background — just the parts I need to build a 5-page site with a shared nav. Skip the beginner React explanation.",
    weakOutput:
      "React Router is a library for routing in React. You can install it with npm and use Route components to define pages.",
    improvedOutput:
      "Here's exactly what you need for a 5-page site with shared nav:\n\n**1. Install and wrap your app:**\n```jsx\nimport { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route element={<Layout />}>\n          <Route index element={<Home />} />\n          <Route path=\"about\" element={<About />} />\n          <Route path=\"contact\" element={<Contact />} />\n        </Route>\n      </Routes>\n    </BrowserRouter>\n  );\n}\n```\n\n**2. Shared nav with Outlet:**\n```jsx\nfunction Layout() {\n  return (\n    <div>\n      <nav>{/* your nav links */}</nav>\n      <Outlet />  {/* child routes render here */}\n    </div>\n  );\n}\n```\n\n**3. Navigation:**\n```jsx\nimport { Link, NavLink } from 'react-router-dom';\n<NavLink to=\"/about\" className={({isActive}) => isActive ? 'active' : ''}>\n```\n\nThat's 90% of what you need. Start there. (Note: react-router-dom v7 keeps this API; React Router 7 can also run as a framework.)",
  },
];