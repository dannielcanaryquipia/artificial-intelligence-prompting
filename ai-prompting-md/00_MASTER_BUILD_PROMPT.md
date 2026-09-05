# Master Build Prompt — "Prompting 101" Demo Teaching Site

> **How to use this file:** Paste this entire document as your first message to your coding agent (Claude Code, Cursor, or Windsurf) inside a fresh project folder. It is written as a single detailed brief, not a template — the agent should make real design decisions from it, not fill in boilerplate.

---

## 1. Role & Intent

You are acting as a senior frontend engineer and visual designer building a **real, interactive, production-quality website** — not a slide deck, not a static template, not a generic "AI landing page." This site is the live visual centerpiece for an on-site IT Instructor demo teaching at The Lewis College. The topic is **AI Prompting**, taught from the perspective of a working developer (not a marketer). The audience evaluating this site is a hiring panel + possibly IT students, so it must look and feel like something a skilled full-stack dev built, not something copy-pasted from a SaaS starter kit.

Treat the content in this brief — and in `03_SITE_CONTENT_OUTLINE.md` — as real content. Do not invent placeholder lorem ipsum.

---

## 2. Tech Stack (pinned)

- **React 18+** with **Vite** (fast local dev, `npm run dev` → localhost)
- **react-router-dom v6+** for client-side routing (multi-page feel, not a single scroll page)
- **Tailwind CSS v3/v4** — utility-first, no inline styles
- **TypeScript** preferred (fallback to JS if the agent's tooling struggles)
- Optional: **Framer Motion / Motion** for the one deliberate animated moment (see Design Direction)
- No backend needed — this is a static, client-only site. Any "interactivity" (below) is simulated in-browser with local component state, not real API calls to an LLM.

Run setup commands directly:
```bash
npm create vite@latest prompting-101-demo -- --template react-ts
cd prompting-101-demo
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install react-router-dom
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
| `/about` | **Credentials** | Certifications, background, why this instructor is credible |
| `/resources` | **Resources** | Curated reference list (courses + UI component libraries used to build this very site — see file 02) |

Use a persistent layout (`<Layout>`) with nav + footer wrapping all routes via `<Outlet />`.

---

## 5. Page-by-Page Requirements

### `/` Home
- Hero: a short, confident headline about prompting as a skill (not clickbait). Subheadline naming the presenter and the college context is optional — keep focus on content, not self-promotion.
- **Live before/after demo** (the interactive centerpiece): a toggle or slider component showing a weak prompt and its rewritten, structured version side-by-side, with the *simulated* output quality visibly different (write both outputs by hand — no live API call needed). This is the single most important interactive element on the site; make it good.
- Three objective cards (define prompting, identify components, apply the framework).

### `/lesson`
- Present the prompting framework (Context → Task → Format/Constraints) as an actual visual diagram or interactive stepper, not a bullet list.
- 2–3 more before/after examples specific to IT work (debugging a SQL query, explaining an error, generating a network config outline). Pull real examples — write realistic prompt/output pairs.
- Embed the lesson plan and lesson outline directly on this page (required by the demo teaching invitation — no printed handout).

### `/case-studies`
- 3–4 cards drawn from real project work (see `03_SITE_CONTENT_OUTLINE.md`): the 5-agent dev orchestration system, the Frames-to-SVG pipeline, Graphify knowledge-graph tooling. Each card: what it does, what structured prompting made possible, one concrete detail.

### `/activity`
- An interactive "rewrite this prompt" exercise: show a weak prompt, let the visitor (or the classroom, live) select which elements are missing (Context / Task / Format / Constraints) via clickable chips, then reveal an improved version. This should feel like an actual mini-tool, not a static image.

### `/about`
- Certifications organized by issuer (Anthropic AI, DataCamp, Cisco, TESDA) — see content file. Present as a clean grid or list, not a wall of badges.
- One short paragraph on background (BSIT Cum Laude, hands-on dev experience) — human, not resume-dump tone.

### `/resources`
- Two sections: (1) further learning resources on AI prompting, (2) an honest "how this site was built" section listing the UI component libraries and MCP tooling used — this doubles as a live demonstration of AI-assisted development practice, which is directly relevant to the IT Instructor role. Pull content from `02_UI_LIBRARY_REFERENCES.md`.

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
- `references.ts` — learning resources + UI library credits (see file 02)

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
