# UI Component Library References

> **How to use this file:** These are free, real component libraries — not invented. Use the "prompt" under each one to ask your coding agent to pull the relevant component. This same list (trimmed to name + one-line description) should appear on the site's `/resources` page under "How this site was built" — it's honest, and it doubles as a small demonstration of AI-assisted dev practice during your demo.

---

## 1. shadcn/ui — the foundation
**What it is:** The base component system (50+ accessible, unstyled-by-default primitives — buttons, cards, tabs, dialogs) that most of the libraries below are built on top of. Free, open source, installs via CLI or MCP.
**Use for:** Cards, nav, tabs, badges — the structural skeleton of every page.
**Prompt:**
```
Using the shadcn MCP, install a card, tabs, and badge component and adapt them to this project's color tokens defined in tailwind.config.
```

## 2. Magic UI — free animated components
**What it is:** 150+ animated React + Tailwind + Framer Motion components, MIT licensed, fully free (no pro tier gate on the core library).
**Use for:** The animated timeline (great fit for the prompting framework steps on `/lesson`), marquee/logo-style credential strip on `/about`.
**Prompt:**
```
Find Magic UI's timeline component and adapt it to show the four-step prompting framework (Context, Task, Format, Constraints) as an interactive vertical timeline.
```

## 3. Aceternity UI — animated landing-page effects
**What it is:** ~260+ motion-rich components (aurora backgrounds, bento grids, 3D cards, scroll reveals), published as a shadcn-compatible registry. Free tier covers most components; some templates are paid.
**Use for:** A restrained hero background treatment on `/` — pick ONE effect, don't stack several (per the "spend your motion budget in one place" principle).
**Prompt:**
```
Show me Aceternity UI's bento-grid and aurora-background components. I want to use exactly one of these, sparingly, on the homepage hero — recommend which fits a technical/instructional tone rather than a flashy SaaS tone.
```

## 4. VengeanceUI — free animated landing components
**What it is:** MIT-licensed, copy-paste animated component library focused on landing pages.
**Use for:** One standout section — e.g. a feature-grid or animated CTA section.
**Prompt:**
```
Pull a feature-grid component from VengeanceUI's docs and adapt its copy to describe the four objectives of this lesson.
```
See `01_MCP_SETUP_GUIDE.md` section 3 for how to pull this one in (no dedicated MCP yet).

## 5. Origin UI — clean, unstyled-friendly primitives
**What it is:** Free, Tailwind + React components with a plainer, less "flashy" aesthetic than the animation-heavy libraries above.
**Use for:** Form-like or utility elements on `/activity` (the chip-select interaction) where clarity matters more than flourish.
**Prompt:**
```
Find Origin UI's chip/toggle-group component and adapt it for a "select which prompt elements are missing" interaction.
```

## 6. 21st.dev — component marketplace / search layer
**What it is:** A searchable marketplace indexing components from shadcn/ui, Aceternity, Magic UI, and many independent design engineers, each with a live preview and installable source. Free to browse; some installs are rate-limited without an account.
**Use for:** A single search point when you're not sure which library has what you need.
**Prompt:**
```
Search 21st.dev for a "before/after comparison slider" component I can adapt for showing weak vs. improved prompts side by side.
```

---

## Suggested Component → Section Mapping

| Site section | Library | Component type |
|---|---|---|
| Home hero | Aceternity UI (one effect only) | Background treatment |
| Before/after prompt demo | 21st.dev search → shadcn primitives | Toggle/slider |
| Lesson framework diagram | Magic UI | Interactive timeline |
| Case study cards | shadcn/ui | Card grid |
| Activity chip interaction | Origin UI | Toggle group / chips |
| Credentials grid | shadcn/ui | Badge + card grid |
| Feature/objectives section | VengeanceUI | Animated feature grid |

---

## Attribution note for the `/resources` page

All libraries above are free and open source (MIT or similarly permissive licenses) at the component level. When you credit them on the site, a simple line per library is enough — name, one-sentence description, link to the docs. This is good practice regardless of the job interview context.
