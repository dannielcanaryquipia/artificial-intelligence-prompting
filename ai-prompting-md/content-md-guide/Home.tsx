import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
      <h1 className="text-4xl sm:text-5xl font-semibold leading-tight max-w-prose">
        A prompt is an instruction. Treat it like one.
      </h1>
      <p className="mt-4 text-lg text-ink-soft max-w-prose">
        A short lesson on prompting as a real, learnable skill for IT
        work — not a trick, a technique.
      </p>

      {/* QR code container — class QR shown in the hero. The hero is a
          2-column grid: text + GitHub button on the left, QR card on the
          right. On mobile the QR card comes FIRST (order-first), then the
          title and subtext — use `order-*` utilities to invert it. Set the
          image in src/data/site.ts (`qrImageUrl`); a dashed placeholder box
          renders until then. */}
      <div className="mt-8 inline-flex flex-col items-center gap-2">
        <div className="rounded-lg border border-line bg-paper-soft p-3.5">
          <div className="h-36 w-36 rounded-md border-2 border-dashed border-line grid place-items-center text-ink-faint md:h-44 md:w-44">
            QrCode
          </div>
        </div>
        <p className="text-xs text-ink-faint">Scan to open the lesson</p>
      </div>

      {/* Meet Danniel — a first-year student the whole lesson follows.
          Content sourced from 03_SITE_CONTENT_OUTLINE.md, "Home" section.
          Full breakdown (code block + real captured output) lives on
          /lesson — this is the condensed hero version. */}
      <div className="mt-12 rounded-lg border border-line bg-paper-soft p-8">
        <p className="text-sm font-medium text-ink-soft">
          Meet Danniel, a first-year student stuck on a nested-loop bug.
        </p>

        <pre className="mt-4 rounded-md bg-terminal p-4 overflow-x-auto">
          <code className="font-mono text-xs text-terminal-text">{`function findDuplicates(arr) {
  let duplicates = [];
  for (let i = 0; i <= arr.length; i++) {
    for (let j = 0; j <= arr.length; j++) {
      if (arr[i] === arr[j]) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}`}</code>
        </pre>
        <p className="mt-2 text-xs text-ink-faint">
          Meant to return only repeated numbers. Instead it returns every
          number, and sometimes crashes with <code className="font-mono">undefined</code>.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-terminal p-4">
            <p className="font-mono text-xs text-ink-faint mb-1">
              what Danniel usually types
            </p>
            <p className="font-mono text-sm text-terminal-text">
              &quot;fix my code, it's not working&quot; [pastes function]
            </p>
          </div>
          <div className="rounded-md bg-terminal p-4">
            <p className="font-mono text-xs text-signal-light mb-1">
              using Context \u2192 Task \u2192 Format \u2192 Constraints
            </p>
            <p className="font-mono text-sm text-terminal-text">
              &quot;I'm Danniel, a first-year student learning JavaScript
              for-loops this week. This nested loop is supposed to return
              only numbers that appear more than once, but it's returning
              every number instead. Find the bug(s) in the loop conditions
              and comparison logic. List each bug with a one-line
              explanation, then show corrected code only for the affected
              lines. Don't rewrite the whole function using a different
              approach like Set \u2014 I need to understand what's wrong
              with the loop version specifically, since that's what we're
              learning this week.&quot;
            </p>
          </div>
        </div>

        <p className="mt-4 text-sm text-ink-faint">
          The first gets a full rewrite using <code className="font-mono">Set</code> instead
          \u2014 technically works, but ignores what was asked and never
          explains the actual bug. The second finds both real bugs (an
          off-by-one bound, a missing <code className="font-mono">i !== j</code> check)
          and fixes only what's broken.
        </p>

        <Link
          to="/lesson"
          className="mt-4 inline-block text-sm font-medium text-signal-strong hover:underline"
        >
          See the full breakdown on the Lesson page \u2192
        </Link>
      </div>

      {/* Each ObjectiveCard is a button that opens a detail dialog — e.g.,
          Understand answers "What is a prompt?" and "Does prompt quality
          change output quality?" */}
      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        <ObjectiveCard
          title="Understand"
          body="What a prompt actually is, and why quality changes output quality."
        />
        <ObjectiveCard
          title="Apply"
          body="A simple framework — Context, Task, Format, Constraints — to any prompt."
        />
        <ObjectiveCard
          title="Recognize"
          body="How prompting shows up in everyday IT work: debugging, docs, learning new tools."
        />
      </div>
    </section>
  );
}

function ObjectiveCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-line bg-paper-soft p-6">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{body}</p>
    </div>
  );
}
