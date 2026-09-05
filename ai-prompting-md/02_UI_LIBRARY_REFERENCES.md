# UI & Build Stack References — The Real Build, Not Mock Libraries

> **How to use this file:** This project is built on a small, real, production stack — not a pile of copy-paste demo libraries. This file documents exactly what is installed (see `package.json`) and where each piece is used. The same list (trimmed to name + one-line description) appears on the site's `/resources` page under "How this site was built" — it's honest, and it doubles as a demonstration of AI-assisted dev practice during your demo.

---

## The stack (all real, all pinned in `package.json`)

### React 19 — `https://react.dev`
**What it is:** The UI library. `react ^19.2.8`.
**Used for:** Every component and page in `src/`. Declarative components + client-side state.

### Vite 8 — `https://vite.dev`
**What it is:** The build tool and dev server (`vite ^8.2.2`), with `@vitejs/plugin-react`.
**Used for:** `npm run dev` → localhost; `npm run build` → `tsc -b && vite build`.

### TypeScript — `https://www.typescriptlang.org`
**What it is:** Typed JavaScript (`typescript ~6.0.2`). Interfaces for data (`PromptExample`, `CertificationIssuer`, `BuildStack`, `CaseStudy`, `NavItem`, …) keep content structured and safe to edit.
**Used for:** All `src/` source; strict-mode builds via `tsc -b`.

### Tailwind CSS v4 — `https://tailwindcss.com`
**What it is:** Utility-first CSS (`tailwindcss ^4.3.3`, loaded through `@tailwindcss/postcss`). Design tokens (ink/paper families, `accent`/`accent-deep`/`accent-tint`, `surface-border`) are defined as CSS variables in `src/index.css` and consumed by arbitrary-value utilities.
**Used for:** All styling — no inline styles, no CSS modules.

### shadcn/ui — `https://ui.shadcn.com`
**What it is:** Accessible, unstyled-by-default components (Card, Button, Badge, Tabs, Dialog, Accordion) installed via the shadcn CLI and adapted to this project's amber design tokens — not copy-pasted marketing blocks.
**Used for:** The structural skeleton: card grids, badges, buttons, the objective dialogs (`Dialog` on `/`), and the embedded lesson plan (`Accordion` on `/lesson`). Pull new components with:
```
npx shadcn@latest add card button badge tabs dialog accordion
```

### Radix UI — `https://www.radix-ui.com`
**What it is:** The headless, accessible primitives that shadcn/ui wraps (`radix-ui ^1.6.7` — Slot, Dialog, Accordion, and friends). We depend on it transitively and directly; it's why the Dialog and Accordion interactions keep full keyboard + screen-reader behavior.

### Motion — `https://motion.dev` (formerly Framer Motion)
**What it is:** The animation library (`motion ^13.2.0`), imported as `motion/react`.
**Used for:** The deliberate animated moments — the generic wrappers in `src/components/motion/` (`FadeIn`, `PageHeader`, `RevealSection` honoring `prefers-reduced-motion`, `AnimatedTitle`), plus the bespoke `SplashScreen` (letter-by-letter title reveal on load), `FrameworkTimeline` (the `/lesson` stepper), and `ActivityChips` (the `/activity` interaction) in `src/components/`. No extra component library — motion budget spent in one place.

### React Router v7 — `https://reactrouter.com`
**What it is:** Client-side routing (`react-router-dom ^7.18.3`).
**Used for:** The persistent `<Layout>` with nav + footer wrapping all six routes via `<Outlet />`.

### Phosphor Icons — `https://phosphoricons.com`
**What it is:** An icon set (`@phosphor-icons/react ^2.1.10`).
**Used for:** Section icons (Lightbulb, Target, Wrench), social icons on `/about`, framework step icons, footer icons.

### Utility glue
**What it is:** `class-variance-authority` + `clsx` + `tailwind-merge` (via `cn()`), plus the `cn` helper package — the standard shadcn class-composition stack.
**Used for:** Variant-aware button/badge classes.

### Drinks, for quality
**What it is:** `oxlint ^1.79.0` (`npm run lint`) and Playwright (`test-site.py` + `@playwright/test`) for the route-by-route QA tour.
**Used for:** The "evidence before done" gate on every change.

---

## AI tooling that built the site (not UI libraries — dev workflow)

- **OpenCode CLI** — the 5-agent dev team (dev-build, design-studio, game-dev, qa-review, ops-planning) that scaffolded, wired, and reviewed the site.
- **Graphify** — the project knowledge graph (AST-parsed) used for codebase navigation; kept current with `graphify update .`.
- **Markdown instruction files** — `AGENTS.md`, `.opencode/TEAM-GUIDE.md`, this `ai-prompting-md/` brief set. The master prompt (file 00) is the seed; these are the operating rules.

---

## Suggested Component → Section Mapping (what actually shipped)

| Site section | Source | Component |
|---|---|---|
| Home hero + before/after demo | shadcn Card + hand-built demo (`PromptComparison`) | Static comparison, no live API |
| Lesson framework diagram | Hand-built with `motion/react` | `FrameworkTimeline` stepper |
| Case study cards | shadcn/ui | Card grid |
| Activity chip interaction | Hand-built with `motion/react` | `ActivityChips` toggle chips |
| Credentials grid | shadcn/ui | Badge grid via `CredentialGroup` |
| Pre-entry splash | Hand-built with `motion/react` | `SplashScreen` + `AnimatedTitle` |
| Scroll reveals + page headers | Hand-built with `motion/react` | `RevealSection`, `PageHeader` |
| Lesson wrap-up | shadcn/ui | `Accordion` (embedded lesson plan) |
| Icons | Phosphor Icons | Section + social icons |

---

## Attribution note for the `/resources` page

Every stack entry above is free and open source. The `/resources` page credits each one (name, one-sentence description, docs link) from `src/data/references.ts` (`buildStack` + `learningResources`) — honest, accurate, and a working example of AI-assisted engineering during your demo.