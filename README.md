# Prompting 101

A short, teachable lesson on prompting as a real, learnable skill for IT work — not a trick, a technique. Built as the live visual centerpiece for an on-site **IT Instructor demo-teaching session at The Lewis College**, this site teaches the **CTFC prompting framework** (Context → Task → Format → Constraints) and is itself built with the AI-assisted development it teaches.

## The Lesson

Prompting is treated as a real engineering skill, not a marketing topic. The site:

- **Teaches a 4-step framework** — Context, Task, Format, Constraints — applied to everyday IT work: debugging, understanding error messages, learning new tools.
- **Demonstrates with real before/after pairs** — the featured example is a first-year student's buggy nested loop: the weak prompt gets a "correct but wrong" answer (a `Set` rewrite that ignores what was asked) while the CTFC prompt finds both actual bugs.
- **Lets the visitor practice** — an interactive activity where you spot the element missing from a weak prompt and reveal the improved version (usable live with a classroom).
- **Shows the instructor's credibility** — real certifications grouped by issuer (Anthropic, DataCamp, Cisco, TESDA), case studies of real projects, a resume, and social links.

## Pages

| Route | Page | Content |
|---|---|---|
| `/` | Home | One-shot animated splash, hero, live before/after prompt demo, objectives with detail dialogs, "what I actually needed to understand" wrap-up |
| `/lesson` | Lesson | The C–T–F–C framework as an interactive timeline, IT-context examples, embedded lesson plan |
| `/case-studies` | Case Studies | Four real projects built via structured prompting |
| `/activity` | Try It | Interactive: find what's missing in a weak prompt |
| `/about` | About | Instructor background, photo, certifications, resume, social links |
| `/resources` | Resources | Verified learning resources + how this site was built |

## Tech Stack

All pinned in `package.json`:

| Layer | Package | Version |
|---|---|---|
| UI framework | react, react-dom | ^19.2.8 |
| Build + dev server | vite ^8.2.2, @vitejs/plugin-react ^6.1.0 | dev tooling |
| Language | typescript | ~6.0.2 |
| Styling | tailwindcss, @tailwindcss/postcss | ^4.3.3 |
| Components | shadcn/ui (+ radix-ui primitives) | radix-ui ^1.6.7 |
| Animation | motion (`motion/react`) | ^13.2.0 |
| Routing | react-router-dom | ^7.18.3 |
| Icons | @phosphor-icons/react | ^2.1.10 |
| Lint | oxlint | ^1.79.0 |
| QA | @playwright/test + `test-site.py` | ^1.62.1 |

Also: `class-variance-authority` + `clsx` + `tailwind-merge` (composed via `cn()`).

## AI Tooling (the meta-lesson)

This site was **written by the OpenCode CLI**, directed by a **5-agent dev team** (`dev-build`, `design-studio`, `game-dev`, `qa-review`, `ops-planning`) defined in `.opencode/` and governed by `AGENTS.md`. Markdown files are the context the agents follow — `AGENTS.md` (operating rules), `.opencode/TEAM-GUIDE.md` (crew behavior), `DESIGN.md` (design tokens), and the `ai-prompting-md/` brief set. A **Graphify** knowledge graph (`graphify-out/`) keeps codebase lookup cheap and scoped. The `/resources` page credits all of this — a live demonstration of AI-assisted dev practice.

## Development

```bash
npm install
npm run dev          # Vite dev server
npm run lint         # oxlint
npm run build        # tsc -b && vite build
python test-site.py  # Playwright tour of every route -> test-screenshots/ (expects the dev server on port 5174: npx vite --port 5174)
```

## Project Structure

```
src/
├── components/
│   ├── layout/          Layout, Navbar, MobileNav, Footer
│   ├── motion/          Motion wrappers (FadeIn, AnimatedTitle, PageHeader, RevealSection)
│   ├── ui/              shadcn primitives (card, badge, button, tabs, dialog, accordion)
│   ├── SplashScreen.tsx Pre-entry letter-by-letter splash
│   ├── PromptComparison.tsx  FrameworkTimeline.tsx  ActivityChips.tsx
│   ├── DetailDialog.tsx  CaseStudyCard.tsx  CredentialGroup.tsx
│   ├── WhatWeLearned.tsx  QrCard.tsx
├── data/                Content: site, navigation, promptExamples, caseStudies, certifications, references
├── pages/               Home, Lesson, CaseStudies, Activity, About, Resources
├── lib/utils.ts         cn() utility
├── App.tsx              <SplashScreen /> + <BrowserRouter> with six routes
└── index.css            Tailwind v4 design tokens (amber accent, stone text)
```

## Design System

Amber accent (`#F59E0B`) on a stone palette — see [`DESIGN.md`](DESIGN.md) for tokens/type/spacing/animation and anti-slop rules, and the full spec in [`ai-prompting-md/DESIGN_DIRECTION.md`](ai-prompting-md/DESIGN_DIRECTION.md).

## Docs Index

| Document | Purpose |
|---|---|
| [`AGENTS.md`](AGENTS.md) | Operating rules for AI agents: graphify-first lookup, the 5-crew team, the `qa-review` gate, lint/build evidence before "done" |
| [`DESIGN.md`](DESIGN.md) | Design tokens, typography, spacing, animation rules, anti-slop rules |
| [`ai-prompting-md/00_MASTER_BUILD_PROMPT.md`](ai-prompting-md/00_MASTER_BUILD_PROMPT.md) | The seed brief the site was built from |
| [`ai-prompting-md/01_MCP_SETUP_GUIDE.md`](ai-prompting-md/01_MCP_SETUP_GUIDE.md) | shadcn / Playwright / Graphify MCP setup + suggested order of operations |
| [`ai-prompting-md/02_UI_LIBRARY_REFERENCES.md`](ai-prompting-md/02_UI_LIBRARY_REFERENCES.md) | The real build stack, versions, and component → section mapping |
| [`ai-prompting-md/03_SITE_CONTENT_OUTLINE.md`](ai-prompting-md/03_SITE_CONTENT_OUTLINE.md) | Canonical page-by-page content outline (the shipped copy lives in `src/data/`) |
| [`ai-prompting-md/DESIGN_DIRECTION.md`](ai-prompting-md/DESIGN_DIRECTION.md) | The full design spec behind `DESIGN.md` |
| [`ai-prompting-md/content-md-guide/03_SITE_CONTENT_OUTLINE.md`](ai-prompting-md/content-md-guide/03_SITE_CONTENT_OUTLINE.md) | Legacy pointer → canonical `03_SITE_CONTENT_OUTLINE.md` |
| [`docs/superpowers/specs/2026-09-05-opencode-wiring-and-quality-pass-design.md`](docs/superpowers/specs/2026-09-05-opencode-wiring-and-quality-pass-design.md) | Approved wiring + quality-pass design (historical) |
| [`docs/superpowers/plans/2026-09-05-opencode-wiring-and-quality-pass.md`](docs/superpowers/plans/2026-09-05-opencode-wiring-and-quality-pass.md) | Step-by-step plan that implemented the design (historical) |

## Before the Demo

- Set `qrImageUrl` in [`src/data/site.ts`](src/data/site.ts) to a real QR image (until then the hero shows a dashed placeholder). `projectGithubUrl` is already set.
- The resume PDF ships at `src/assets/cv/Danniel_Canary_Quipia_ATS_resume_.pdf` and links from `/about`.

## Related

- Repository: <https://github.com/dannielcanaryquipia/artificial-intelligence-prompting>