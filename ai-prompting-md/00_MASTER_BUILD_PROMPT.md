# Master Build Prompt — "Prompting 101" Demo Teaching Site

> **How to use this file:** Paste this entire document as your first message to your coding agent (Claude Code, Cursor, or Windsurf) inside a fresh project folder. It is written as a single detailed brief, not a template — the agent should make real design decisions from it, not fill in boilerplate.

---

## 1. Role & Intent

You are acting as a senior frontend engineer and visual designer building a **real, interactive, production-quality website** — not a slide deck, not a static template, not a generic "AI landing page." This site is the live visual centerpiece for an on-site IT Instructor demo teaching at The Lewis College. The topic is **AI Prompting**, taught from the perspective of a working developer (not a marketer). The audience evaluating this site is a hiring panel + possibly IT students, so it must look and feel like something a skilled full-stack dev built, not something copy-pasted from a SaaS starter kit.

Treat the content in this brief — and in `03_SITE_CONTENT_OUTLINE.md` — as real content. Do not invent placeholder lorem ipsum. The authoritative content file is `03_SITE_CONTENT_OUTLINE.md`; the former `content-md-guide/` sketch pages were consolidated back into it, and that folder now just holds a pointer. This repo is the reference implementation — `src/data/` and `src/pages/` show exactly what shipped.

---

## 2. Tech Stack (pinned — this repo is the reference implementation)

- **React 19** + **Vite 8** with **TypeScript** (`npm run dev` → localhost; `npm run build` → `tsc -b && vite build`)
- **react-router-dom v7** for client-side routing (multi-page feel, not a single scroll page)
- **Tailwind CSS v4** (loaded via `@tailwindcss/postcss`) — utility-first, no inline styles, design tokens in `src/index.css`
- **shadcn/ui** components, adapted to the project's amber design tokens — see `02_UI_LIBRARY_REFERENCES.md`
- **Radix UI** (the `radix-ui` package) for the accessible, unstyled primitives shadcn/ui wraps (Slot, Tabs, and friends)
- **Motion** (`import ... from "motion/react"`, formerly Framer Motion) for the deliberate animated moments: `FadeIn`, `PageHeader`, `RevealSection` (scroll reveals), `AnimatedTitle` + `SplashScreen` (one-shot letter-by-letter title reveal on load), `FrameworkTimeline`, `ActivityChips` — all hand-built, no extra component library (the "one animated moment" rule still holds; the splash is a single, brief entrance)
- **@phosphor-icons/react** for icons
- **oxlint** for linting (`npm run lint`)
- **Playwright** (`test-site.py` + `@playwright/test`) for the route-by-route QA tour
- No backend needed — this is a static, client-only site. Any "interactivity" is simulated in-browser with local component state, not real API calls to an LLM.

Run setup commands directly (what the reference repo's `package.json` actually contains):
```bash
npm create vite@latest prompting-101-demo -- --template react-ts
cd prompting-101-demo
npm install
npm i react-router-dom motion @phosphor-icons/react radix-ui class-variance-authority clsx tailwind-merge cn
npm i -D tailwindcss @tailwindcss/postcss postcss autoprefixer oxlint
npx shadcn@latest init   # then add: card, button, badge, tabs, dialog, accordion
```

---

## 3. Design Direction (do not default to generic AI-page styling)

Before writing any code, produce a short design plan (palette, type, layout, principles) and self-critique it against these generic defaults — revise anything that matches them:
- warm cream background + terracotta accent (Claude-tell)
- near-black background + single neon accent
- identical rounded SaaS cards with the same soft grey shadow on everything
- ALL-CAPS tracked eyebrow labels above every heading, middle-dot separators, monospace data labels, arrows appended to every button

**Ground the design in the actual subject matter**: this is a site about *precision instruction* — the craft of telling an AI system exactly what you mean. That idea (clarity, structure, before/after transformation) should shape the visual language, not a generic "AI/tech" mood board of glowing orbs and gradients.

Suggested starting direction (adapt, don't copy blindly):
- **Color**: a grounded, technical palette — think terminal/editor inspired but warm, not cold-corporate. Pick one confident accent color tied to "transformation" (e.g., a signal amber or a deep teal) rather than a generic purple-blue AI gradient.
- **Type**: one strong monospace or slab-serif for anything representing "prompts" or code-like content (reinforces the instructional/technical theme), paired with a clean humanist sans for body copy. Two families max.
- **Layout**: left-aligned, editorial, generous line length under 80 characters for body text. Consider a persistent left or top nav rather than a single hero-then-scroll layout, since this is a multi-page router-based site.
- **The one animated moment**: the before/after prompt transformation on the homepage (see Interactivity below) is the natural place to spend your motion budget. Keep hover states and page transitions subtle and purposeful, not decorative.

Build to a quality floor: fully responsive (mobile-first, test at 375px / 768px / 1280px+), visible keyboard focus states, respects `prefers-reduced-motion`, accessible color contrast.

---

## 4. Site Architecture (react-router routes)

| Route | Page | Purpose |
|---|---|---|
| `/` | **Home** | Hero + live before/after prompt demo + objectives |
| `/lesson` | **Lesson** | The actual lesson proper: prompt anatomy framework, IT-context examples |
| `/case-studies` | **Case Studies** | Real projects built via structured prompting (from resume) |
| `/activity` | **Try It** | Interactive prompt-rewriting exercise (the classroom activity) |
| `/about` | **About** | Instructor background, certifications, and why this instructor is credible |
| `/resources` | **Resources** | Curated reference list (courses + the real build stack that powers this very site — see file 02) |

Use a persistent layout (`<Layout>`) with nav + footer wrapping all routes via `<Outlet />`.

---

## 5. Page-by-Page Requirements

### `/` Home
- One-shot animated splash (`SplashScreen`) plays before the app mounts — a letter-by-letter headline reveal in JetBrains Mono — then hands off to the router. Respects `prefers-reduced-motion`.
- Hero: a short, confident headline about prompting as a skill (not clickbait). Subheadline naming the presenter and the college context is optional — keep focus on content, not self-promotion.
- **Live before/after demo** (the interactive centerpiece): use the featured **Danniel nested-loop bug** example from `03_SITE_CONTENT_OUTLINE.md` (Home section). Show his buggy `findDuplicates` code, the weak prompt ("fix my code, it's not working"), and its rewritten CTFC prompt side-by-side, with both outputs written by hand (no live API call) so the quality difference is visible. This is the single most important interactive element on the site; make it good. Link to `/lesson` for the full breakdown.
- Three objective cards (define prompting, identify components, apply the framework).

### `/lesson`
- Present the prompting framework (Context → Task → Format/Constraints) as an actual visual diagram or interactive stepper, not a bullet list.
- Unpack the featured **Danniel nested-loop bug** in full (code block + weak/improved prompts + real captured output), then add the two more IT before/after examples from `03_SITE_CONTENT_OUTLINE.md` (understanding an error, learning a new tool). Pull real examples — write realistic prompt/output pairs.
- Embed the lesson plan and lesson outline directly on this page (required by the demo teaching invitation — no printed handout).

### `/case-studies`
- 3–4 cards drawn from real project work (see `03_SITE_CONTENT_OUTLINE.md`): the 5-agent dev orchestration system, the Frames-to-SVG pipeline, Graphify knowledge-graph tooling. Each card: what it does, what structured prompting made possible, one concrete detail.

### `/activity`
- An interactive "rewrite this prompt" exercise: show a weak prompt, let the visitor (or the classroom, live) select which elements are missing (Context / Task / Format / Constraints) via clickable chips, then reveal an improved version. This should feel like an actual mini-tool, not a static image.

### `/about`
- Certifications organized by issuer (Anthropic AI, DataCamp, Cisco, TESDA) — see content file. Present as a clean grid or list, not a wall of badges.
- One short paragraph on background (BSIT Cum Laude, hands-on dev experience) — human, not resume-dump tone.

### `/resources`
- Two sections: (1) further learning resources on AI prompting, (2) an honest "how this site was built" section listing the real build stack (React, Vite, Tailwind, shadcn/ui, Radix UI, Motion, Phosphor Icons) plus the AI tooling used to build it (OpenCode CLI, Graphify knowledge graph, markdown agent files) — this doubles as a live demonstration of AI-assisted development practice, which is directly relevant to the IT Instructor role. Pull content from `02_UI_LIBRARY_REFERENCES.md`.

---

## 6. Interactivity Checklist (this must be a real interactive site, not a template)

- [ ] Before/after prompt comparison with working toggle/slider state
- [ ] Framework stepper or diagram with clickable/expandable steps
- [ ] Activity page with actual click-to-reveal or drag interaction
- [ ] Working client-side routing with active nav states
- [ ] Mobile nav (hamburger or bottom nav) that actually opens/closes
- [ ] Dark/light mode toggle is optional but a nice touch if time allows — skip if it dilutes focus

---

## 7. Data Layer

Keep content out of JSX where reasonable. Create a `src/data/` folder:
- `promptExamples.ts` — array of before/after prompt pairs
- `caseStudies.ts` — project data
- `certifications.ts` — grouped by issuer
- `references.ts` — learning resources + build stack credits (see file 02)

This makes the site easy to edit live if you want to tweak content the night before.

---

## 8. Acceptance Checklist Before You Consider This Done

- [ ] Runs cleanly with `npm run dev`, no console errors
- [ ] All 6 routes work and are reachable from nav
- [ ] Fully responsive at mobile/tablet/desktop (verify with the Playwright MCP setup in file 01)
- [ ] No lorem ipsum, no placeholder images with broken alt text
- [ ] Passes a basic accessibility pass (semantic HTML, alt text, focus states, contrast)
- [ ] The design does not visually resemble a generic Bootstrap/SaaS template — it should look intentional and tied to the subject matter
- [ ] Lesson plan and lesson outline are visibly present on `/lesson` (required by the invitation)

---

Once scaffolding is done, refer to `01_MCP_SETUP_GUIDE.md` to pull polished components instead of building every UI element from scratch, and `02_UI_LIBRARY_REFERENCES.md` for which library to use for which section.
