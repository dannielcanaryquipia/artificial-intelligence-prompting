# OpenCode Wiring + Quality Pass Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the `.opencode/` 5-agent dev team, project knowledge graph, and shadcn MCP into this React 19 project, then run a quality/refactor pass that shifts the accent to amber, centralizes motion, and makes all content/stacks factual.

**Architecture:** Two workstreams. (A) Wiring: build a project graph at `graphify-out/`, write a root `AGENTS.md` that makes graph-first lookup the operating rule, repoint the `graphify` MCP to the project graph, and replace the stock README. (B) Enhancement: reconcile `src/index.css` accent tokens to the amber spec (`DESIGN.md` wins over the shipped orange), build shared motion primitives (`FadeIn`, `PageHeader`, `useScrollReveal`, `RevealSection`) and a single nav data source, fix the stale "React 18 / Router v6" claims and dead links, then verify with lint, build, and the existing Python Playwright QA script.

**Tech Stack:** React 19, Vite 8, TypeScript ~6.0, Tailwind CSS v4, Motion (`motion` v13, `motion/react`), React Router v7, Phosphor Icons, shadcn/ui (new-york), graphify CLI (pipx), oxlint, Node `@playwright/test` (devDep) + Python Playwright script `test-site.py`.

---

## File Structure

| File | Responsibility | Action |
|---|---|---|
| `.graphifyignore` | Keep the project graph focused on `src/` | Create |
| `graphify-out/{graph.json,GRAPH_REPORT.md,wiki/,graph.html}` | Project code knowledge graph | Generate (gitignored) |
| `AGENTS.md` | Team + graph operating rules for every future session | Create |
| `.opencode/opencode.json` | MCP servers (`shadcn`, `graphify`) | Modify (graphify path) |
| `README.md` | Project overview, run instructions, team/graph note | Rewrite |
| `src/index.css` | Design tokens incl. amber accent | Modify |
| `src/hooks/useScrollReveal.ts` | Shared scroll-reveal hook | Create |
| `src/components/motion/FadeIn.tsx` | Shared entrance animation wrapper | Create |
| `src/components/motion/PageHeader.tsx` | Shared page-header section (title + subtitle + extras) | Create |
| `src/components/motion/RevealSection.tsx` | Scroll-reveal section wrapper | Create |
| `src/pages/Home.tsx`, `Lesson.tsx`, `CaseStudies.tsx`, `Activity.tsx`, `About.tsx`, `Resources.tsx` | Page headers → `PageHeader`; scroll-reveal on Home + Resources | Modify |
| `src/data/navigation.ts` | Single source for nav links | Create |
| `src/components/layout/Navbar.tsx`, `MobileNav.tsx`, `Footer.tsx` | Use `navigation.ts` | Modify |
| `src/components/CredentialGroup.tsx`, `src/components/ActivityChips.tsx` | Small accent text → `accent-deep` for contrast | Modify |
| `src/data/references.ts` | Verified links; rename `UIBibrary` → `UILibrary` | Modify |
| `src/data/promptExamples.ts` | learn-tool example v6 → v7 | Modify |
| `src/pages/Resources.tsx` | True React 19 tech-stack note | Modify |
| `test-site.py`, `test-screenshots/` | QA tour automation | Use; screenshots gitignored |
| `docs/superpowers/specs/2026-09-05-*.md` | Approved design (Section 5 of 5 already committed) | Reference only |

Decisions locked: accent token authority = `DESIGN.md` (amber wins); project graph stored at root `graphify-out/`; no new dependencies; visual identity preserved.

---

## Task 0: Baseline snapshot commit

Everything except the committed spec is untracked. Snapshot it so subsequent tasks are atomic diffs.

**Files:** repo root (`.opencode/`, `src/`, configs, `README.md`, `DESIGN.md`, `ai-prompting-md/`, `test-site.py`, `index.html`, `package.json`, etc.)

- [ ] **Step 1: Pre-flight checks**

Run: `git status --short`
Expected: `src/`, `.opencode/`, `DESIGN.md`, `README.md`, `package.json` etc. listed as `??` (untracked). `node_modules/`, `dist/`, `graphify-out/`, `test-screenshots/` must NOT appear (gitignored).

- [ ] **Step 2: Verify baseline builds and lints before any change**

Run: `npm run lint`
Expected: no errors.
Run: `npm run build`
Expected: `tsc -b && vite build` completes, `dist/` produced (gitignored).

- [ ] **Step 3: Commit baseline**

Run:
```bash
git add -A
git commit -m "chore: snapshot project baseline (React 19 + Vite 8 + Tailwind 4 + Motion)"
```

- [ ] **Step 4: Verify**

Run: `git log --oneline`
Expected: two commits — root `docs:` commit and the new `chore:` baseline commit.

---

## Task 1: Generate the project knowledge graph

**Files:**
- Create: `.graphifyignore`
- Generate (gitignored): `graphify-out/{graph.json,GRAPH_REPORT.md,wiki/index.md,graph.html}`

- [ ] **Step 1: Create `.graphifyignore`**

Write exactly:
```
.opencode/
ai-prompting-md/
docs/
public/
dist/
raw/
node_modules/
test-site.py
```

This keeps the graph focused on `src/` (the app), not the 260+ skills corpus under `.opencode/`.

- [ ] **Step 2: Build the graph (AST-only, no LLM/API)**

Run: `graphify update .`
Expected: no API call; writes `graphify-out/graph.json`, `GRAPH_REPORT.md`, `wiki/index.md`, `graph.html`. Confirm with:
```bash
Test-Path graphify-out\graph.json; Test-Path graphify-out\GRAPH_REPORT.md; Test-Path graphify-out\wiki\index.md
```
Expected: three `True`s. (Do NOT commit `graphify-out/` — it is gitignored.)

- [ ] **Step 3: Sanity-query the new graph**

Run: `graphify query "routes and pages" --graph graphify-out/graph.json`
Expected: results rooted around the app (`App`, `Home`, `Lesson`, `CaseStudies`, `Activity`, `About`, `Resources`, `Layout`, `PromptComparison`, etc.), NOT the skills corpus. If output is dominated by `.opencode`/skills nodes, stop — fix `.graphifyignore` and re-run Step 2 before proceeding.

- [ ] **Step 4: Commit the ignore file**

Run:
```bash
git add .graphifyignore
git commit -m "chore: add .graphifyignore to scope project graph to src"
```

---

## Task 2: Write root `AGENTS.md`

**Files:**
- Create: `AGENTS.md`

- [ ] **Step 1: Create `AGENTS.md`**

Write exactly:

```markdown
# Prompting 101 — Agent Operating Guide

This project ships an OpenCode 5-agent dev team and a knowledge graph. Follow these rules every session.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:
- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).

## Team

A 5-crew subagent team runs the work: `dev-build` (implementation), `design-studio` (design/motion), `game-dev` (games), `qa-review` (read-only QA gate — never skipped), `ops-planning` (specs/plans/orchestration).

- Full team guide: `.opencode/TEAM-GUIDE.md`
- Skills catalogue by project type: `.opencode/SKILLS-GUIDE.md`
- Web animation skill: `.opencode/WEB-ANIMATION.md`
- Approved design spec: `docs/superpowers/specs/2026-09-05-opencode-wiring-and-quality-pass-design.md`

## Design System

- Visual spec: `DESIGN.md` (amber accent `#F59E0B` is the source of truth — NOT orange)
- Animation tokens: `.opencode/DESIGN.md`

## Rules

- Evidence before "done": run `npm run lint` (oxlint) and `npm run build` (`tsc -b && vite build`) on every change.
- QA gate: `qa-review` reviews the diff before a task is complete.
- MCP: `shadcn` (component sourcing) and `graphify` (project graph at graphify-out/) are enabled; on-demand MCP enablement per `.opencode/UI-COMPONENT-MCP.md`.
- Search-before-build for UI: `shadcn` MCP first, then adapt to DESIGN.md tokens, then verify with Playwright (`test-site.py`).
```

- [ ] **Step 2: Commit**

Run:
```bash
git add AGENTS.md
git commit -m "docs: add root AGENTS.md wiring graphify rules + dev team"
```

---

## Task 3: Repoint the graphify MCP at the project graph

**Files:**
- Modify: `.opencode/opencode.json:19`

- [ ] **Step 1: Edit the graphify MCP path**

In `.opencode/opencode.json`, replace the `graphify` server's `projectPath` argument (currently `"C:\\Users\\Danniel Canary\\.opencode\\graphify-out\\graph.json"`) with the project graph path:

`"C:\\Users\\Danniel Canary\\Desktop\\ai-prompting\\prompting-101-demo\\graphify-out\\graph.json"`

The `graphify` block must read exactly:

```json
"graphify": {
  "type": "local",
  "command": [
    "C:\\Users\\Danniel Canary\\AppData\\Local\\pipx\\pipx\\venvs\\graphifyy\\Scripts\\python.exe",
    "-m",
    "graphify.serve",
    "C:\\Users\\Danniel Canary\\Desktop\\ai-prompting\\prompting-101-demo\\graphify-out\\graph.json"
  ],
  "enabled": true
}
```

Leave `shadcn` untouched (still `enabled: true`). Note: the MCP server change takes effect on the next OpenCode session/restart — no action needed in this session.

- [ ] **Step 2: Validate JSON + commit**

Run: `node -e "JSON.parse(require('fs').readFileSync('.opencode/opencode.json','utf8')); console.log('valid json')"`
Expected: `valid json`.

Run:
```bash
git add .opencode/opencode.json
git commit -m "chore: point graphify MCP at project knowledge graph"
```

---

## Task 4: Rewrite the README

**Files:**
- Modify: `README.md` (replace the stock Vite template entirely)

- [ ] **Step 1: Write the README**

Write exactly:

```markdown
# Prompting 101

A short, teachable lesson on prompting as a real, learnable skill for IT work — not a trick, a technique. Built for a demo teaching session at The Lewis College.

## Pages

| Route | Content |
|---|---|
| `/` | Hero + before/after prompt comparison + learning objectives |
| `/lesson` | The 4-step framework (Context–Task–Format–Constraints), IT examples, lesson plan |
| `/case-studies` | Real projects built using structured prompting |
| `/activity` | Interactive: find what's missing in a weak prompt |
| `/about` | Instructor background + certifications |
| `/resources` | Verified learning resources + how this site was built |

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion (motion/react) · React Router v7 · Phosphor Icons · Playwright (QA)

## Development

```bash
npm install
npm run dev       # http://localhost:5173 (QA script expects port 5174: npx vite --port 5174)
npm run lint      # oxlint
npm run build     # tsc -b && vite build
python test-site.py  # Playwright tour of all pages -> test-screenshots/ (expects dev server on 5174)
```

## Tooling

This project integrates an OpenCode 5-agent dev team (`.opencode/TEAM-GUIDE.md`) and a project knowledge graph (`graphify-out/`) for graph-first codebase lookup. See `AGENTS.md` for the operating rules — this site is itself built with the AI-assisted development it teaches.
```

- [ ] **Step 2: Commit**

Run:
```bash
git add README.md
git commit -m "docs: replace stock README with project overview"
```

---

## Task 5: Amber token reconciliation in `src/index.css`

**Files:**
- Modify: `src/index.css:10-25` (token block) and `src/index.css:28-46` (shadcn-compatible vars)

- [ ] **Step 1: Edit the token block**

Replace the current accent values with amber:

```css
  --color-accent: #F59E0B;
  --color-accent-hover: #FBBF24;
  --color-accent-active: #D97706;
  --color-accent-tint: #FFFBEB;
  --color-accent-deep: #B45309;
```

- [ ] **Step 2: Mirror into the shadcn-compatible block**

In the `/* shadcn/ui compatible variables */` block, set these to match (they currently hold the orange `#F97316`):

```css
  --color-primary: #F59E0B;
  --color-ring: #F59E0B;
```

Leave all other shadcn vars unchanged.

- [ ] **Step 3: Verify no orange remains in `src/`**

Run: `rg -n "#F97316|#EA580C|#C2410C|#FFF7ED|#9A3412" src`
Expected: no matches (all orange lives only in `src/index.css` and is being replaced here).

- [ ] **Step 4: Build gate**

Run: `npm run build`
Expected: `tsc -b && vite build` succeeds.

- [ ] **Step 5: Commit**

Run:
```bash
git add src/index.css
git commit -m "style: reconcile accent tokens to amber per DESIGN.md"
```

---

## Task 6: Contrast fixes for small accent text

Amber `#F59E0B` on tint/white fails AA for small text (~1.9:1). `accent-deep` (`#B45309`) passes (~4.5:1). Large/bold CTAs and the nav-active affordance remain amber per the approved design; only small mono accent labels change.

**Files:**
- Modify: `src/components/CredentialGroup.tsx:26`
- Modify: `src/components/ActivityChips.tsx:107`

- [ ] **Step 1: Fix the credential badge**

In `src/components/CredentialGroup.tsx`, change the badge text color:

```diff
             className="font-mono text-xs
-                       bg-accent-tint/50
-                       text-accent
-                       border-accent/20"
+                       bg-accent-tint/50
+                       text-accent-deep
+                       border-accent/20"
```

- [ ] **Step 2: Fix the activity "missing" line**

In `src/components/ActivityChips.tsx`, change the missing-element label:

```diff
-                    <p className="font-mono text-sm text-accent font-medium mb-1">
+                    <p className="font-mono text-sm text-accent-deep font-medium mb-1">
```

- [ ] **Step 3: Build gate**

Run: `npm run lint`
Expected: no errors.
Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

Run:
```bash
git add src/components/CredentialGroup.tsx src/components/ActivityChips.tsx
git commit -m "fix: use accent-deep for small accent text to meet AA contrast"
```

---

## Task 7: Shared motion primitives

**Files:**
- Create: `src/hooks/useScrollReveal.ts`
- Create: `src/components/motion/FadeIn.tsx`
- Create: `src/components/motion/PageHeader.tsx`
- Create: `src/components/motion/RevealSection.tsx`

- [ ] **Step 1: Create `src/hooks/useScrollReveal.ts`**

Write exactly:

```ts
import { useEffect, useState } from "react";
import type { RefObject } from "react";
import { useInView, useReducedMotion } from "motion/react";

interface ScrollRevealOptions {
  once?: boolean;
  margin?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: ScrollRevealOptions = {}
) {
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, {
    once: options.once ?? true,
    margin: options.margin ?? "-80px",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (inView) setVisible(true);
  }, [inView]);

  return reduceMotion ? true : visible;
}
```

- [ ] **Step 2: Create `src/components/motion/FadeIn.tsx`**

Write exactly:

```tsx
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function FadeIn({ children, className, delay = 0, y = 20 }: FadeInProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Create `src/components/motion/PageHeader.tsx`**

Write exactly:

```tsx
import type { ReactNode } from "react";
import { FadeIn } from "./FadeIn";

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  className?: string;
  children?: ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  titleClassName = "mb-4",
  subtitleClassName,
  className,
  children,
}: PageHeaderProps) {
  return (
    <section className={`py-16 md:py-24 px-4 sm:px-6 ${className ?? ""}`}>
      <div className="max-w-4xl mx-auto">
        <FadeIn>
          <h1
            className={`font-sans text-3xl md:text-4xl font-bold tracking-tight text-content-primary ${titleClassName}`}
          >
            {title}
          </h1>
        </FadeIn>
        {subtitle && (
          <FadeIn delay={0.1}>
            <p
              className={`font-sans text-lg text-content-secondary max-w-prose ${subtitleClassName ?? ""}`}
            >
              {subtitle}
            </p>
          </FadeIn>
        )}
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create `src/components/motion/RevealSection.tsx`**

Write exactly:

```tsx
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
}

export function RevealSection({ children, className }: RevealSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}
```

- [ ] **Step 5: Build gate**

Run: `npm run build`
Expected: succeeds (new files are unused until the next tasks — no lint failures expected).

- [ ] **Step 6: Commit**

Run:
```bash
git add src/hooks/useScrollReveal.ts src/components/motion
git commit -m "feat: add shared motion primitives (FadeIn, PageHeader, RevealSection, useScrollReveal)"
```

---

## Task 8: Refactor pages to shared components

Replace the six duplicated entrance blocks with `<PageHeader>`, and add the subtle scroll reveal on two below-the-fold sections.

**Files:**
- Modify: `src/pages/Home.tsx`, `src/pages/Lesson.tsx`, `src/pages/CaseStudies.tsx`, `src/pages/Activity.tsx`, `src/pages/About.tsx`, `src/pages/Resources.tsx`

Each page loses its `motion`/`useReducedMotion` imports for the header block (verify no other usage remains — none of these pages use `motion` elsewhere, so drop the import entirely).

- [ ] **Step 1: Home header + objectives reveal**

In `src/pages/Home.tsx`:
- Replace the `import { motion, useReducedMotion } from "motion/react";` line with `import { PageHeader } from "@/components/motion/PageHeader";` and `import { RevealSection } from "@/components/motion/RevealSection";`
- Delete the `const reduceMotion = useReducedMotion();` line.
- Replace the entire Hero `<section>` (lines 34-58) with:

```tsx
      <PageHeader
        title={
          <>
            A prompt is an instruction.
            <br />
            Treat it like one.
          </>
        }
        subtitle="A short lesson on prompting as a real, learnable skill for IT work — not a trick, a technique."
        titleClassName="mb-6"
      />
```

- Wrap the Objectives `<section>` by changing its opening tag from `<section className="py-16 md:py-24 px-4 sm:px-6">` to `<RevealSection className="py-16 md:py-24 px-4 sm:px-6">` and its closing tag `</section>` (the last one, before the outer `</div>`) to `</RevealSection>`.

- [ ] **Step 2: Lesson header**

In `src/pages/Lesson.tsx`:
- Replace the `motion`/`useReducedMotion` import with `import { PageHeader } from "@/components/motion/PageHeader";`
- Delete `const reduceMotion = useReducedMotion();`.
- Replace the Header `<section>` (lines 43-59) with:

```tsx
      <PageHeader
        title="The Prompting Framework"
        subtitle="A structured approach to writing prompts that actually work. Four elements, any situation."
      />
```

- [ ] **Step 3: Case Studies header**

In `src/pages/CaseStudies.tsx`:
- Replace the `motion`/`useReducedMotion` import with `import { PageHeader } from "@/components/motion/PageHeader";`
- Delete `const reduceMotion = useReducedMotion();`.
- Replace the Header `<section>` (lines 11-27) with:

```tsx
      <PageHeader
        title="Case Studies"
        subtitle="Real projects built using structured prompting. Each one demonstrates how clear instructions lead to real results."
      />
```

- [ ] **Step 4: Activity header**

In `src/pages/Activity.tsx`:
- Replace the `motion`/`useReducedMotion` import with `import { PageHeader } from "@/components/motion/PageHeader";`
- Delete `const reduceMotion = useReducedMotion();`.
- Replace the Header `<section>` (lines 11-27) with:

```tsx
      <PageHeader
        title="Try It Yourself"
        subtitle="Take a weak prompt and identify what's missing. Click each element to see why it matters, then reveal the improved version."
      />
```

- [ ] **Step 5: About header (header + prose pass into PageHeader)**

In `src/pages/About.tsx`:
- Replace the `motion`/`useReducedMotion` import with `import { PageHeader } from "@/components/motion/PageHeader";`
- Delete `const reduceMotion = useReducedMotion();`.
- Replace the Header `<section>` (lines 11-38) with:

```tsx
      <PageHeader title="About the Instructor">
        <div className="max-w-prose">
          <p className="font-sans text-base text-content-primary leading-relaxed mb-4">
            BS Information Technology graduate, Cum Laude, from Sorsogon State
            University (2026). Background spans full-stack development (React,
            React Native, Supabase/PostgreSQL) and hands-on IT networking and
            field installations — plus a genuine, daily practice of
            AI-assisted development.
          </p>
          <p className="font-sans text-base text-content-secondary leading-relaxed">
            "AI Fluency for Educators" and "Teaching the AI Fluency Framework"
            are two of the certifications directly behind how this lesson was
            structured.
          </p>
        </div>
      </PageHeader>
```

- [ ] **Step 6: Resources header + libraries reveal**

In `src/pages/Resources.tsx`:
- Replace the `motion`/`useReducedMotion` import with `import { PageHeader } from "@/components/motion/PageHeader";` and `import { RevealSection } from "@/components/motion/RevealSection";`
- Delete `const reduceMotion = useReducedMotion();`.
- Replace the Header `<section>` (lines 13-29) with:

```tsx
      <PageHeader
        title="Resources"
        subtitle="Further reading on AI prompting, and an honest look at how this site was built."
      />
```

- Wrap the "How This Site Was Built" `<section>` (line 86, `className="pb-16 md:pb-24 px-4 sm:px-6 bg-surface-raised"`): change its opening tag to `<RevealSection className="pb-16 md:pb-24 px-4 sm:px-6 bg-surface-raised">` and its closing `</section>` (just before the outer `</div>`) to `</RevealSection>`.

- [ ] **Step 7: Command gate**

Run: `npm run lint`
Expected: no errors (no unused imports remain — confirm each page no longer references `motion`/`useReducedMotion`).
Run: `npm run build`
Expected: succeeds.

- [ ] **Step 8: Commit**

Run:
```bash
git add src/pages
git commit -m "refactor: use shared PageHeader/RevealSection across all pages"
```

---

## Task 9: Single source for nav data

**Files:**
- Create: `src/data/navigation.ts`
- Modify: `src/components/layout/Navbar.tsx`, `src/components/layout/MobileNav.tsx`, `src/components/layout/Footer.tsx`

- [ ] **Step 1: Create `src/data/navigation.ts`**

Write exactly:

```ts
export interface NavItem {
  to: string;
  label: string;
}

export const navLinks: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/lesson", label: "Lesson" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/activity", label: "Try It" },
  { to: "/about", label: "About" },
  { to: "/resources", label: "Resources" },
];

const footerPaths = ["/", "/lesson", "/case-studies", "/about"];

export const footerLinks: NavItem[] = navLinks.filter((link) =>
  footerPaths.includes(link.to)
);
```

(Footer keeps its 4-link list — this preserves the current footer exactly.)

- [ ] **Step 2: Update `Navbar.tsx`**

Remove the local `navLinks` array and import it instead:

```ts
import { NavLink } from "react-router-dom";
import { List } from "@phosphor-icons/react";
import { navLinks } from "@/data/navigation";
```

- [ ] **Step 3: Update `MobileNav.tsx`**

Remove the local `navLinks` array and import `navLinks` from `@/data/navigation` plus the Phosphor icons. Keep the icon map (icons are mobile-only):

```ts
import { X, House, BookOpen, FolderOpen, Lightbulb, User, Books, type Icon } from "@phosphor-icons/react";
import { navLinks } from "@/data/navigation";

const mobileNavIcons: Record<string, Icon> = {
  "/": House,
  "/lesson": BookOpen,
  "/case-studies": FolderOpen,
  "/activity": Lightbulb,
  "/about": User,
  "/resources": Books,
};
```

Change the link render to resolve the icon from the map instead of `link.icon`:

```tsx
const Icon = mobileNavIcons[link.to];
```

Keep the rest of `MobileNav` identical (icon size/weight, active classes, motion delays).

- [ ] **Step 4: Update `Footer.tsx`**

Remove the local `footerLinks` array and import it:

```ts
import { NavLink } from "react-router-dom";
import { footerLinks } from "@/data/navigation";
```

- [ ] **Step 5: Command gate**

Run: `npm run lint`
Expected: no errors.
Run: `npm run build`
Expected: succeeds.

- [ ] **Step 6: Commit**

Run:
```bash
git add src/data/navigation.ts src/components/layout
git commit -m "refactor: single-source nav links in src/data/navigation.ts"
```

---

## Task 10: Content accuracy

**Files:**
- Modify: `src/pages/Resources.tsx` (tech-stack note)
- Modify: `src/data/promptExamples.ts` (learn-tool example)
- Modify: `src/data/references.ts` (link verification + rename `UIBibrary`)

- [ ] **Step 1: True tech-stack note**

In `src/pages/Resources.tsx`, replace the Tech stack `<Card>` paragraph (the `<p>` with `<strong>Tech stack:</strong>`) with:

```tsx
              <p className="font-sans text-sm text-content-primary">
                <strong className="font-semibold">Tech stack:</strong> React
                19 + Vite, TypeScript, Tailwind CSS v4, shadcn/ui, Motion
                (motion/react), React Router v7, Phosphor Icons. Built with
                AI-assisted development using the OpenCode 5-agent dev team and
                the Graphify codebase knowledge graph — a meta-demonstration of
                the lesson itself.
              </p>
```

- [ ] **Step 2: learn-tool example → React Router v7**

In `src/data/promptExamples.ts`, within the `lessonExamples` entry with `id: "learn-tool"`, replace the `improvedPrompt` with:

```ts
    improvedPrompt:
      "I already know React basics (components, props, useState). Explain react-router-dom v7 assuming that background — just the parts I need to build a 5-page site with a shared nav. Skip the beginner React explanation.",
```

Replace the `improvedOutput` with:

```ts
    improvedOutput:
      "Here's exactly what you need for a 5-page site with shared nav:\n\n**1. Install and wrap your app:**\n```jsx\nimport { BrowserRouter, Routes, Route } from 'react-router-dom';\n\nfunction App() {\n  return (\n    <BrowserRouter>\n      <Routes>\n        <Route element={<Layout />}>\n          <Route index element={<Home />} />\n          <Route path=\"about\" element={<About />} />\n          <Route path=\"contact\" element={<Contact />} />\n        </Route>\n      </Routes>\n    </BrowserRouter>\n  );\n}\n```\n\n**2. Shared nav with Outlet:**\n```jsx\nfunction Layout() {\n  return (\n    <div>\n      <nav>{/* your nav links */}</nav>\n      <Outlet />  {/* child routes render here */}\n    </div>\n  );\n}\n```\n\n**3. Navigation:**\n```jsx\nimport { Link, NavLink } from 'react-router-dom';\n<NavLink to=\"/about\" className={({isActive}) => isActive ? 'active' : ''}>\n```\n\nThat's 90% of what you need. Start there. (Note: react-router-dom v7 keeps this API; React Router 7 can also run as a framework.)",
```

- [ ] **Step 3: Rename `UIBibrary` → `UILibrary`**

In `src/data/references.ts`, replace the interface name and its `export` usage:

```diff
-export interface UIBibrary {
+export interface UILibrary {
   name: string;
   description: string;
   link: string;
 }
...
-export const uiLibraries: UIBibrary[] = [
+export const uiLibraries: UILibrary[] = [
```

- [ ] **Step 4: Verify every resource link is live**

For each URL below, run:
```powershell
curl -s -o NUL -w "%{http_code} %{url_effective}`n" -L "<url>"
```

Targets (from `src/data/references.ts`):
1. `https://www.coursera.org/learn/prompt-essentials`
2. `https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering`
3. `https://www.coursera.org/learn/google-ai-essentials`
4. `https://ui.shadcn.com`
5. `https://magicui.design`
6. `https://ui.aceternity.com`
7. `https://ui-vengeance.com`
8. `https://originui.com`
9. `https://21st.dev`

Expected: final `%{url_effective}` ends in `200`. Any link that 404s/redirects to a dead page must be replaced with a working equivalent, and its `description` re-checked for accuracy. Do not change working links. If a replacement needs a judgment call, pause and ask the user rather than guessing.

- [ ] **Step 5: Command gate + commit**

Run: `npm run lint`
Expected: no errors.
Run: `npm run build`
Expected: succeeds.

Run:
```bash
git add src/pages/Resources.tsx src/data/promptExamples.ts src/data/references.ts
git commit -m "fix: correct stale stack claims, react-router v7 example, and verify resource links"
```

---

## Task 11: QA gate (evidence before done)

**Files:** no source changes unless a finding requires one.

- [ ] **Step 1: Lint + build**

Run: `npm run lint`
Expected: no errors.
Run: `npm run build`
Expected: succeeds.

- [ ] **Step 2: Playwright render tour**

Start the server in a background terminal: `npx vite --port 5174`
Then run: `python test-site.py`
Expected: all pages render, `h1` printed per route, screenshots written to `test-screenshots/`, and the final console section reports **"No console errors detected"**. (The script's dark-mode section prints "Header buttons found: 1" / "Dark option not found" and continues — that's expected; this site is light-mode only.)

- [ ] **Step 3: Visual inspection of the diff-critical screenshots**

Open and check (visually, using a Read on the PNGs):
- `01-home-light` / `03-case-studies-light` — amber accent on nav-active + CTAs (`#F59E0B`), stone text; no orange remnants.
- `05-about-light` — credential badges now `accent-deep` text (dark amber) on tint.
- `06-resources-light` — tech-stack note reads React 19 / Router v7 / OpenCode team.
- `11-activity-all-selected` — missing-element lines are `accent-deep`.
- `17-mobile-home` — desktop + mobile all render.
If any screenshot shows orange `#F97316` or a contrast regression, fix inline, rerun Steps 1-2, then commit the fix before continuing.

- [ ] **Step 4: Check the reveal interactivity**

In `01-home-light`, confirm the "What you'll learn" cards are visible after scroll (full-page screenshot should show them render; `once: true` means they stay). If `RevealSection` hides content below `-80px` fold for any reason, adjust the `margin` to `"0px"` and rerun.

- [ ] **Step 5: Sync the project graph**

Run: `graphify update .`
Expected: `graphify-out/` is regenerated from the final `src/` (no commit needed — gitignored).

- [ ] **Step 6: qa-review crew pass**

Dispatch `qa-review` with the full `git diff` of Tasks 5-10 (from `chore: snapshot`..HEAD) as the review scope. It is read-only. Fix any P0/P1 findings it reports (rerun lint/build + Step 2), then commit the fixes.

- [ ] **Step 7: Final commit**

Run:
```bash
git add .
git commit -m "chore: verify amber rendering, reveal motion, and QA tour via Playwright"
```
(If no changes were staged, this step passes with "nothing to commit" — that's fine.)

---

## Self-Review (completed by planner)

- **Spec coverage:** §3 wiring → Tasks 1-4 (graph, AGENTS.md, MCP, docs/git/README) ✓; §4 B1 tokens + contrast → Tasks 5-6 ✓; §4 B2 shared motion + dedupe + HoverCard → Tasks 7-9 (HoverCard verified as already present via existing `hover:-translate-y-0.5` card classes — no code change) ✓; §4 B3 content → Task 10 ✓; §5 QA gate → Task 11 ✓.
- **Placeholder scan:** no TBD/TODO; every code step shows exact code; commands include expected output.
- **Type consistency:** `navLinks`/`footerLinks` defined once in Task 9 and consumed by all three layout files; `mobileNavIcons` keyed by `link.to` matches `NavItem.to`; `UILibrary` rename is propagated to its single export site; `useScrollReveal`/`RevealSection`/`FadeIn`/`PageHeader` signatures match their consumers.