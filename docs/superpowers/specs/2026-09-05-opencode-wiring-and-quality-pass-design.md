# OpenCode Wiring + Quality Pass — Design

Date: 2026-09-05
Status: Approved (design sections 1–5)

## 1. Context & Goal

The project already contains a full OpenCode workspace under `.opencode/` (5-subagent dev
team, 261+ skills, MCP config, knowledge graph, guides, templates). The goal of this effort
is twofold:

1. **Wire the workspace into this project** so it becomes the durable operating mode for the
   repo (agents, graph-first lookup, component sourcing, QA gate).
2. **Use those skills on the app itself** — a quality/refactor pass that keeps the current
   visual identity and fixes real drift, stale claims, and duplication.

Deliverable chosen by the user: **both** (wire-in + enhance), via **Approach A** (lean wiring
+ full pass).

## 2. Design Decisions (recorded)

| Question | Decision |
|---|---|
| Primary deliverable | Both: wire-in infrastructure AND enhance the app |
| Project knowledge graph | Yes — build one for this app's code (graph-first lookup) |
| Enhancement priority | Quality/refactor + drift fixes; preserve visual identity |
| Design-token authority (doc vs code) | **Doc wins** — shift the app from orange to amber (`DESIGN.md` is the spec) |
| React version | Project already runs **React 19** (`react ^19.2.8`); target stays React 19; fix the stale "React 18" text |
| Resource reliability | Resources must be reliable and factual — verified live links and the true tech stack, no aspirational claims |
| Approach | A: lean wiring (AGENTS.md, graph, shadcn MCP, docs/ layout, git init) + one full enhancement pass |

## 3. Workstream A — Wiring

| Item | Detail |
|---|---|
| `AGENTS.md` (project root) | Graphify rules (query the graph before broad exploration; run `graphify update .` after code changes) + pointers to `.opencode/TEAM-GUIDE.md` and `.opencode/SKILLS-GUIDE.md` |
| Project graph | Run `graphify` against the project root → outputs to `<projectRoot>/graphify-out/` (`graph.json`, `GRAPH_REPORT.md`, `wiki/`) listing app structure (src files, routes, components, data). The skills-corpus graph (`.opencode/skills/graphify-out/`) stays untouched. |
| MCP routing | In `.opencode/opencode.json`, repoint the `graphify` MCP project path to `<projectRoot>/graphify-out/graph.json` (it serves one graph at a time); `shadcn` MCP remains enabled |
| `docs/` layout | `docs/superpowers/specs/` for this and future specs |
| Git | `git init` (no hooks); commit the spec and later work as atomic commits; `.gitignore` additions: `test-screenshots/`, `graphify-out/` (regenerated output) |
| README | Replace stock Vite template with a short project readme: what it is, how to run, the dev team + graph (a meta-demonstration of the lesson) |

## 4. Workstream B — Enhancement

### B1. Token reconciliation: orange → amber (doc wins)

`src/index.css` token changes:

| Token | Current (orange) | Target (amber) |
|---|---|---|
| `--color-accent` | `#F97316` | `#F59E0B` |
| `--color-accent-hover` | `#EA580C` | `#FBBF24` |
| `--color-accent-active` | `#C2410C` | `#D97706` |
| `--color-accent-tint` | `#FFF7ED` | `#FFFBEB` |
| `--color-accent-deep` | `#9A3412` | `#B45309` |

- Mirror the four documented tokens into the shadcn-compatible variable block
  (`--color-primary`, `--color-ring`, `--color-accent-foreground`, etc.) so shadcn-sourced
  components match.
- Sweep `src/` for hardcoded orange hex values (`#F97316`, `#EA580C`, `#C2410C`, `#FFF7ED`,
  `#9A3412`) and replace with tokens/amber values.
- Contrast: `#F59E0B` on white fails AA for small text (~2:1). Mitigation: keep accent for
  large/bold CTAs and nav-active affordances; use `accent-deep`/`#B45309` for small accent
  mono labels where contrast requires. Exact spots confirmed in the QA gate (Section 5).

### B2. Component refactor (shared motion + dedupe)

- Add `src/components/motion/FadeIn.tsx` and `src/components/motion/PageHeader.tsx` +
  `src/hooks/useScrollReveal.ts` mirroring the web-animation skill
  (`.opencode/skills/web-animation/`). Collapse the 6 repeated `motion.h1`/`motion.p`
  entrance blocks into `<PageHeader>`, keeping identical easing
  (`[0.16, 1, 0.3, 1]`, 600ms) and `useReducedMotion()` behavior.
- Extract nav link data to `src/data/navigation.ts`; single source used by `Navbar`,
  `MobileNav`, `Footer` (Footer keeps its filtered 4-link list — no new links).
- Add the web-animation `HoverCard` micro-interaction (hover raise + shadow) to the resource
  cards in `Resources.tsx`; matches the existing card pattern.
- **No new dependencies** — uses installed `motion` + Tailwind only. No GSAP.

### B3. Content/info accuracy

- `Resources.tsx` tech-stack note: state the true stack — React 19, React Router v7,
  `motion` (Motion), Tailwind CSS v4, shadcn/ui, Phosphor Icons, Vite 8 — and mention the
  OpenCode dev team + graphify as the meta-demonstration.
- `src/data/promptExamples.ts` (learn-tool example): update `react-router-dom` v6 → v7 in
  the text and snippet so the lesson matches the installed library.
- Verify all live links in `src/data/references.ts` (3 learning resources, 6 UI libraries;
  especially the Anthropic prompt-engineering URL); replace dead links, keep wording.
- No invented facts; content changes limited to accuracy + explicitly requested edits.

## 5. QA Gate & Verification

- Command gate on every change: `npm run lint` (oxlint) and `npm run build`
  (`tsc -b && vite build`) must pass.
- Playwright render tour: all **6 pages × desktop + mobile** — no console errors, amber
  tokens render, React 19 mounts, nav works, reduced-motion short-circuits.
- a11y spot-check: single `<h1>` per page, heading hierarchy, accent/white contrast fixes,
  `aria-pressed`/button semantics intact.
- `graphify update .` at the end so the project graph reflects final code.
- One read-only `qa-review` pass over the diff before declaring done.
- Commit spec + wiring + code as atomic commits.

## 6. Acceptance Criteria

- Project graph exists, is wired to the `graphify` MCP, and `AGENTS.md` documents graph-first
  lookup for this repo.
- `shadcn` MCP is usable for component sourcing in this project.
- Accent renders amber per `DESIGN.md`; no hardcoded orange remains in `src/`; contrast
  exceptions documented.
- All 6 pages render on the same visual design with no console errors at desktop + mobile.
- Shared motion primitives used by all pages; nav data is single-source.
- Resources page states the true React 19 stack and contains only verified, live links.
- `lint` + `build` pass; `qa-review` approves; graph synced.

## 7. Explicitly Out of Scope

- No visual redesign, new pages, or new features.
- No copy of standalone skill guides into `docs/` (Approach B items: no `.obsidian`/`.claude`
  copies, no auto-rebuild git hooks, no changes to the global `~/.opencode` install).
- No switching the accent back to orange, no dark mode.