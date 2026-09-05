const FRAMEWORK_STEPS = [
  {
    label: "Context",
    body: "What's the situation? e.g. \u201cI'm a second-year IT student working on a database assignment.\u201d",
  },
  {
    label: "Task",
    body: "What exactly do you want done? Be specific, not vague.",
  },
  {
    label: "Format",
    body: "How should the answer be structured? A list, code only, step-by-step, a short paragraph.",
  },
  {
    label: "Constraints",
    body: "What should it avoid or stay within? Length, tools allowed, don't rewrite everything.",
  },
];

// Content sourced from 03_SITE_CONTENT_OUTLINE.md, "Lesson" section.
// Keep this array and BUGGY_CODE in sync with that file if wording changes.
const IT_EXAMPLES = [
  {
    title: "Danniel's nested-loop bug",
    weak: "fix my code, it's not working [pastes function]",
    improved:
      "I'm Danniel, a first-year student learning JavaScript for-loops this week. This nested loop is supposed to return only numbers that appear more than once, but it's returning every number instead. Find the bug(s) in the loop conditions and comparison logic. List each bug with a one-line explanation, then show corrected code only for the affected lines. Don't rewrite the whole function using a different approach like Set \u2014 I need to understand what's wrong with the loop version specifically, since that's what we're learning this week.",
  },
  {
    title: "Understanding an error message",
    weak: "what does this error mean",
    improved:
      "I'm Danniel, a first-year student working in VSCode on a React app built with Vite and React Router v7. I added a new page file src/pages/About.tsx because I read React Router does file-based routing, but when I open /about the page is blank and the console shows `No route matches location \"/about\"`. Explain why in plain terms \u2014 tell me the difference between file-based routing and the `<Routes>` I already have in App.tsx, then show me the smallest change to make /about work. Don't rewrite my whole App.tsx, just the line(s) that need to change.",
  },
  {
    title: "Learning a new tool quickly",
    weak: "teach me react router",
    improved:
      "I'm Danniel, a first-year student who already knows React basics (components, props, useState). Explain react-router-dom v7 assuming that background \u2014 just the parts I need to build a 5-page site with a shared nav. Skip the beginner React explanation.",
  },
];

// Danniel's actual buggy code, shown as a code block above the examples.
const BUGGY_CODE = `function findDuplicates(arr) {
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

export default function Lesson() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
      <h1 className="text-3xl sm:text-4xl font-semibold">The Lesson</h1>

      {/* TODO: replace this static list with an interactive stepper/diagram
          per 00_MASTER_BUILD_PROMPT.md — clickable/expandable steps,
          not a plain list. This is a functional placeholder. */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {FRAMEWORK_STEPS.map((step, i) => (
          <div key={step.label} className="rounded-lg border border-line bg-paper-soft p-6">
            <span className="font-mono text-xs text-signal-strong">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-1 font-display font-semibold text-lg">{step.label}</h3>
            <p className="mt-2 text-sm text-ink-soft">{step.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-2xl font-semibold">Before / After, in IT context</h2>
      <p className="mt-2 text-ink-soft max-w-prose">
        Same student, same framework \u2014 now with actual code. Here's
        Danniel's buggy <code className="font-mono text-sm">findDuplicates</code>{" "}
        function, meant to return only numbers that repeat:
      </p>
      <pre className="mt-4 rounded-md bg-terminal p-4 overflow-x-auto">
        <code className="font-mono text-sm text-terminal-text">{BUGGY_CODE}</code>
      </pre>
      <p className="mt-3 text-sm text-ink-faint max-w-prose">
        It's supposed to return only numbers that appear more than once.
        Instead it returns every number, and sometimes crashes with{" "}
        <code className="font-mono">undefined</code>.
      </p>

      <div className="mt-6 flex flex-col gap-6">
        {IT_EXAMPLES.map((ex) => (
          <div key={ex.title} className="rounded-lg border border-line p-6">
            <h3 className="font-semibold">{ex.title}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-md bg-terminal p-4">
                <p className="font-mono text-xs text-ink-faint mb-1">weak</p>
                <p className="font-mono text-sm text-terminal-text">{ex.weak}</p>
              </div>
              <div className="rounded-md bg-terminal p-4">
                <p className="font-mono text-xs text-signal-light mb-1">improved</p>
                <p className="font-mono text-sm text-terminal-text">{ex.improved}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Real captured output for Danniel's nested-loop bug — worth
          showing in full since it's the strongest live-demo moment:
          the "weak" answer isn't wrong, it just solves a different
          problem than the one Danniel actually asked. */}
      <div className="mt-8 rounded-lg border border-line p-6">
        <h3 className="font-semibold">What each prompt actually got Danniel</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-mono text-ink-faint mb-1">weak output</p>
            <p className="text-sm text-ink-soft">
              &quot;Try using a Set to track seen values instead \u2014 here's
              a rewritten version using that approach.&quot; Technically
              works, but ignores the loop version Danniel is learning this
              week and never explains what was actually wrong.
            </p>
          </div>
          <div>
            <p className="text-xs font-mono text-signal-strong mb-1">
              CTFC output
            </p>
            <ol className="text-sm text-ink-soft list-decimal list-inside space-y-1">
              <li>
                <code className="font-mono">i &lt;= arr.length</code> and{" "}
                <code className="font-mono">j &lt;= arr.length</code> should
                be <code className="font-mono">&lt;</code> \u2014 arrays are
                zero-indexed, so this reaches one past the last valid index.
              </li>
              <li>
                No check for <code className="font-mono">i !== j</code>{" "}
                \u2014 every element matches itself, so every item gets
                pushed, not just the real repeats.
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* Lesson plan embedded directly per the demo teaching invitation
          (no printed handout). See 03_SITE_CONTENT_OUTLINE.md for the
          full timing breakdown to expand this into. */}
      <h2 className="mt-16 text-2xl font-semibold">Lesson Plan</h2>
      <ol className="mt-4 list-decimal list-inside space-y-2 text-ink-soft max-w-prose">
        <li>Motivation / hook (2\u20133 min) \u2014 live weak-vs-improved prompt comparison</li>
        <li>Lesson proper (10\u201312 min) \u2014 framework + IT-context examples</li>
        <li>Application (5\u20137 min) \u2014 class activity, rewrite a bad prompt together</li>
        <li>Wrap-up (2\u20133 min) \u2014 why this matters for IT work specifically</li>
        <li>Assessment (2 min) \u2014 one-sentence exit check</li>
      </ol>
    </section>
  );
}