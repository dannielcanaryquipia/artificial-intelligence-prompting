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