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