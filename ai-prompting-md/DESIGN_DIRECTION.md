# Design Direction & Beautification Plan — Prompting 101

> **Design Studio crew output.** This document is the ground-truth design spec for `dev-build`. Every value, token, and component source below is actionable — adapt to code, do not improvise from it.

---

## 0. Design Read

> **Reading this as:** Instructional teaching demo site for an IT instructor panel + students, with a technical/editorial language (terminal warmth meets humanist clarity), leaning toward Tailwind v4 + shadcn/ui primitives + one restrained Aceternity/VengeanceUI animated moment.

**Audience:** IT department hiring panel (evaluating technical competence) + college students (learning from the lesson). The site must signal "skilled developer built this" — not "a template was filled in."

**Vibe words from the brief:** "grounded, technical, terminal/editor inspired but warm, not cold-corporate." This is not a SaaS pitch. It's a teaching tool that happens to be a website.

---

## 1. Design Dials

| Dial | Value | Rationale |
|---|---|---|
| **DESIGN_VARIANCE** | **7** | Editorial layout with left-aligned, generous whitespace. Not chaotic, not symmetric-soulless. Think: a well-designed course handout, not a Dribbble shot. |
| **MOTION_INTENSITY** | **4** | One deliberate animated moment (before/after transformation). Everything else: subtle hover states, focus feedback, page transitions. No parallax, no scroll-hijack, no infinite loops. |
| **VISUAL_DENSITY** | **4** | Standard web-app spacing. Content breathes. 65ch body max-width. Section gaps of `py-16` to `py-24`. Not an art gallery, not a cockpit. |

---

## 2. Color System

A terminal/editor-inspired palette with **warmth** — not cold blue-grey corporate. The single accent color is **signal amber** (transform/warning light — ties directly to the "before/after" transformation concept).

### 2.1 Primary Accent

| Token | Hex | Tailwind class | Use |
|---|---|---|---|
| `amber-500` | `#F59E0B` | `text-amber-500` / `bg-amber-500` | CTAs, active nav, interactive highlights, "improved" state indicator |
| `amber-400` | `#FBBF24` | `text-amber-400` | Hover state, lighter accent |
| `amber-600` | `#D97706` | `text-amber-600` | Active/pressed state |
| `amber-50` | `#FFFBEB` | `bg-amber-50` | Tinted highlight backgrounds, "good" prompt output bg |
| `amber-950` | `#451A03` | `text-amber-950` | Amber on light backgrounds (high contrast) |

### 2.2 Neutral Base

| Token | Hex | Tailwind class | Use |
|---|---|---|---|
| `stone-50` | `#FAFAF9` | `bg-stone-50` | Page background (light mode) |
| `stone-100` | `#F5F5F4` | `bg-stone-100` | Card backgrounds, section alternation |
| `stone-200` | `#E7E5E4` | `bg-stone-200` | Borders, dividers, input outlines |
| `stone-500` | `#78716C` | `text-stone-500` | Secondary text, captions |
| `stone-800` | `#292524` | `text-stone-800` | Body text (not pure black) |
| `stone-950` | `#0C0A09` | `bg-stone-950` / `text-stone-950` | Dark mode background, near-black text |

**Why stone over slate/zinc:** Stone has a subtle warm undertone that reads "editorial/workshop" rather than "enterprise dashboard." It pairs naturally with amber.

### 2.3 Semantic Colors

| Token | Hex | Tailwind class | Use |
|---|---|---|---|
| `emerald-500` | `#10B981` | `text-emerald-500` | Success, "correct" prompt state, activity reveal |
| `emerald-50` | `#ECFDF5` | `bg-emerald-50` | Success background tint |
| `red-500` | `#EF4444` | `text-red-500` | Error, "weak" prompt indicator, validation |
| `red-50` | `#FEF2F2` | `bg-red-50` | Error background tint |
| `blue-500` | `#3B82F6` | `text-blue-500` | Informational callouts, "context" element |
| `blue-50` | `#EFF6FF` | `bg-blue-50` | Info background tint |

### 2.4 Tailwind Config Extension

```js
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic aliases for design system clarity
        surface: {
          DEFAULT: '#FAFAF9',    // stone-50
          raised: '#F5F5F4',     // stone-100
          border: '#E7E5E4',     // stone-200
        },
        accent: {
          DEFAULT: '#F59E0B',    // amber-500
          hover: '#FBBF24',      // amber-400
          active: '#D97706',     // amber-600
          tint: '#FFFBEB',       // amber-50
          deep: '#451A03',       // amber-950
        },
        content: {
          primary: '#292524',    // stone-800
          secondary: '#78716C',  // stone-500
          muted: '#A8A29E',      // stone-400
        },
        // Dark mode overrides
        dark: {
          surface: '#0C0A09',    // stone-950
          raised: '#1C1917',     // stone-900
          border: '#292524',     // stone-800
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        'prose': '65ch',
        'reading': '72ch',
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 3. Typography System

Two families. One signals "technical precision" (monospace for prompts/code). One signals "humanist clarity" (sans for body). No serif — this is an instructional site, not a luxury brand.

### 3.1 Monospace — JetBrains Mono

**Used for:** All prompt text, code snippets, framework step labels, "terminal" content, before/after prompt display.

| Property | Value |
|---|---|
| Font | **JetBrains Mono** (free, Google Fonts) |
| Weights | 400 (regular), 500 (medium), 700 (bold) |
| Sizes | `text-xs` (12px) for code labels, `text-sm` (14px) for prompt text, `text-base` (16px) for featured prompts |
| Line height | `leading-relaxed` (1.625) for prompt blocks |
| Tracking | Normal (no extra tracking) |
| Install | Google Fonts CDN or self-host via `@font-face` |

**Why JetBrains Mono over Fira Code / Source Code Pro:** JetBrains Mono has a taller x-height (better readability at small sizes), ligature support, and a slightly warmer tone than the colder Source Code Pro. It reads as "developer tooling" without feeling like a legacy terminal.

### 3.2 Sans-Serif — Inter

**Used for:** All body copy, headlines, navigation, UI labels, descriptions.

| Property | Value |
|---|---|
| Font | **Inter** (free, Google Fonts) |
| Weights | 400 (body), 500 (medium emphasis), 600 (semibold, subheads), 700 (bold, headlines) |
| Sizes | `text-sm` (14px) for UI labels, `text-base` (16px) body, `text-lg` (18px) for subheads, `text-2xl` (24px) to `text-4xl` (36px) for headlines |
| Line height | `leading-relaxed` (1.625) for body, `leading-tight` (1.25) for headlines |
| Tracking | `tracking-tight` for headlines, normal for body |

**Why Inter over Geist/Satoshi:** Inter is the most readable sans-serif at body sizes on screens, has extensive weight coverage, and is the standard for instructional/technical content. For this project, readability and familiarity beat design-industry novelty.

### 3.3 Type Scale Examples

```html
<!-- Hero headline -->
<h1 class="font-sans text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-stone-800">
  A prompt is an instruction. Treat it like one.
</h1>

<!-- Section subhead -->
<h2 class="font-sans text-xl md:text-2xl font-semibold text-stone-800">
  The Prompting Framework
</h2>

<!-- Body copy -->
<p class="font-sans text-base text-stone-800 leading-relaxed max-w-prose">
  A prompt is a structured instruction. The quality of what you put in directly determines the quality of what you get out.
</p>

<!-- Prompt text (the "before/after" content) -->
<div class="font-mono text-sm text-stone-800 bg-stone-100 rounded-lg p-4 border border-stone-200">
  fix my code
</div>

<!-- Code label -->
<span class="font-mono text-xs text-stone-500 uppercase tracking-wider">Weak prompt</span>
```

---

## 4. Component Mapping

Pull from these sources via MCP or copy-paste. **Do not hand-build components that exist in these libraries.**

| Site Section | Component Needed | Source | MCP / Method |
|---|---|---|---|
| **Home Hero** | Background treatment (subtle animated grid or gradient) | **Aceternity UI** — Background Gradient or Spinning Text (restrained) | Copy-paste from Aceternity docs. ONE effect only. |
| **Before/After Demo** | Side-by-side comparison with toggle state | **21st.dev search** → find "comparison slider" or "before after" component. Fall back to shadcn `Tabs` + custom layout | `shadcn` MCP for Tabs primitive; custom wiring for the content |
| **Lesson Framework** | Interactive vertical timeline / stepper | **Magic UI** — Timeline component | Copy-paste from Magic UI docs. Adapt to 4-step framework. |
| **Case Study Cards** | Card grid with image, title, description | **shadcn/ui** — Card component | `shadcn` MCP: `install card component` |
| **Activity Chips** | Toggle group / clickable chip selector | **Origin UI** — Toggle Group or Chip component | Copy-paste from Origin UI. Simpler than shadcn for this. |
| **Credentials Grid** | Badge + issuer grouping | **shadcn/ui** — Badge component | `shadcn` MCP: `install badge component` |
| **Nav (top)** | Navigation with active states, mobile hamburger | **shadcn/ui** — Navigation Menu or custom with shadcn Button | `shadcn` MCP for primitives; hand-wire responsive behavior |
| **Footer** | Simple link list + attribution | **Custom** using Tailwind | No library needed — straightforward layout |
| **Page Transitions** | Subtle fade/slide on route change | **Framer Motion** (`motion/react`) `AnimatePresence` | `npm install motion` |
| **Mobile Nav** | Slide-out drawer or bottom sheet | **shadcn/ui** — Sheet component | `shadcn` MCP: `install sheet component` |

### 4.1 Component Installation Order

1. `npx shadcn@latest add card badge tabs navigation-menu sheet`
2. Copy-paste from Aceternity UI docs → `src/components/hero-background.tsx`
3. Copy-paste from Magic UI docs → `src/components/framework-timeline.tsx`
4. Copy-paste from Origin UI docs → `src/components/activity-chips.tsx`
5. Wire Framer Motion `AnimatePresence` for route transitions

---

## 5. Layout Architecture

### 5.1 Persistent Layout Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx          # Main layout wrapper
│   │   ├── Navbar.tsx          # Top navigation
│   │   ├── MobileNav.tsx       # Mobile slide-out menu
│   │   └── Footer.tsx          # Site footer
│   ├── ui/                     # shadcn primitives (card, badge, tabs, etc.)
│   ├── home/                   # Home page sections
│   ├── lesson/                 # Lesson page sections
│   ├── case-studies/           # Case study cards
│   ├── activity/               # Activity page interaction
│   ├── about/                  # Credentials grid
│   └── resources/              # Resource listings
├── data/
│   ├── promptExamples.ts
│   ├── caseStudies.ts
│   ├── certifications.ts
│   └── references.ts
├── pages/
│   ├── Home.tsx
│   ├── Lesson.tsx
│   ├── CaseStudies.tsx
│   ├── Activity.tsx
│   ├── About.tsx
│   └── Resources.tsx
├── App.tsx                     # Router setup
└── main.tsx
```

### 5.2 Nav Style Decision

**Top navigation** (not sidebar). Rationale:
- This is a 6-page teaching site, not a complex app. Top nav is the expected pattern.
- A sidebar eats horizontal space that body copy needs for `max-w-prose` (65ch).
- Top nav is easier to collapse to hamburger on mobile.

**Nav spec:**

| Property | Value |
|---|---|
| Position | `sticky top-0 z-40` |
| Height | `h-16` (64px) — under the 80px cap |
| Background | `bg-stone-50/80 backdrop-blur-md` (subtle glassmorphism on scroll) |
| Border | `border-b border-stone-200` |
| Max width | `max-w-7xl mx-auto` |
| Logo/brand | Text only: "Prompting 101" in `font-mono font-semibold text-stone-800` |
| Links | `font-sans text-sm font-medium text-stone-500 hover:text-amber-500` |
| Active link | `text-amber-500` with `border-b-2 border-amber-500` |
| Mobile | Hamburger icon (`Menu` from `@phosphor-icons/react`) → Sheet component (slide from left) |

### 5.3 Footer Spec

| Property | Value |
|---|---|
| Background | `bg-stone-100` |
| Border | `border-t border-stone-200` |
| Content | Left: "Prompting 101 — The Lewis College" in `font-sans text-sm text-stone-500` |
| | Right: Navigation links repeated in small text |
| Padding | `py-8` |
| Max width | `max-w-7xl mx-auto px-6` |

---

## 6. Animation Budget

**Principle from the brief:** "Spend your motion budget in one place."

### 6.1 THE ONE Animated Moment: Before/After Prompt Transformation

This is the **homepage interactive centerpiece**. All significant motion goes here.

**Interaction design:**
- Default state: shows the weak prompt ("fix my code") + its bad output
- User clicks "See the improved version" or toggles a switch
- The prompt text **cross-fades** and **expands** (simulating typing/restructuring)
- The output section **slides up** with a subtle `y: 20 → 0` + `opacity: 0 → 1` reveal
- The "improved" state gets a subtle amber left-border accent to visually distinguish it

**Technical implementation:**
```tsx
// Use motion/react AnimatePresence for the toggle
import { motion, AnimatePresence } from "motion/react";

// Transition config
const promptTransition = {
  duration: 0.5,
  ease: [0.16, 1, 0.3, 1], // ease-out-expo
};

// The animated wrapper
<AnimatePresence mode="wait">
  <motion.div
    key={isImproved ? "improved" : "weak"}
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={promptTransition}
  >
    {/* Prompt content */}
  </motion.div>
</AnimatePresence>
```

### 6.2 Subtle Page Transitions

- **Route change:** `AnimatePresence mode="wait"` with a simple `opacity: 0 → 1` fade (200ms). No slide, no scale. Just a clean crossfade.
- **Implementation:** Wrap `<Outlet />` in `motion.div` with `key={location.pathname}`.

### 6.3 Micro-Interactions (allowed)

| Interaction | Animation | Duration |
|---|---|---|
| Button hover | `scale: 1.02` + subtle shadow increase | 150ms |
| Button active/press | `scale: 0.98` (tactile push) | 100ms |
| Card hover | `translate-y: -2px` + shadow elevation | 200ms |
| Nav link hover | Color transition `text-stone-500 → text-amber-500` | 150ms |
| Focus ring | `ring-2 ring-amber-400 ring-offset-2` (native focus-visible) | instant |
| Activity chip select | `scale: 1.05` + background color change | 200ms |

### 6.4 What NOT to Animate

- **NO** scroll-triggered reveals on the homepage (the content fits in viewport; scroll reveals are for long-scroll landing pages)
- **NO** parallax effects
- **NO** infinite loops (no spinning logos, no pulsing badges)
- **NO** hover-triggered floating/bobbing on cards
- **NO** text typing animations on headlines
- **NO** page-load entrance animations on every section (only the hero gets a subtle `opacity: 0 → 1` on mount)
- **NO** staggered card entrance on page load (the page is short enough that the user sees everything quickly)

### 6.5 Reduced Motion

All motion respects `prefers-reduced-motion: reduce`. Implementation:

```tsx
import { useReducedMotion } from "motion/react";

// In any animated component:
const reduce = useReducedMotion();

// Replace animation props with instant:
const safeTransition = reduce ? { duration: 0 } : promptTransition;
```

---

## 7. Anti-Slop Checklist

### 7.1 What to AVOID (Design-Taste-Frontend Rules)

| Pattern | Why it's banned | What to do instead |
|---|---|---|
| Warm cream `#f5f1ea` + terracotta `#b6553a` accent | Classic Claude/AI tell | Use stone + amber (our palette) |
| AI purple/blue gradient `#7C3AED → #3B82F6` | Universal AI slop | Single amber accent, no gradients on text |
| Generic SaaS rounded cards with grey shadow on everything | Template feel | Cards only when elevation communicates hierarchy. Use `border` + whitespace for grouping |
| ALL-CAPS tracked eyebrow above every heading | The #1 AI tell per design-taste-frontend | Maximum 1 eyebrow per 3 sections. Most sections: headline alone is enough |
| `Inter` as the only font, `slate-900` everywhere | LLM default | JetBrains Mono + Inter, stone palette |
| Centered hero with neon glow blob | Generic AI landing page | Left-aligned hero, amber accent, no glow blobs |
| Three identical feature cards in a row | Template pattern | Vary card layouts: one full-width, two half-width, or asymmetric grid |
| "Get Started" / "Learn More" / "Try It Free" as CTA labels | Generic CTAs | Specific labels: "See the framework" / "Try it yourself" |
| Em-dashes as design flourish (`—`) | Banned in design-taste-frontend | Use commas, periods, or sentence restructuring |
| `text-gradient bg-clip-text` on headlines | AI tell | Solid color headlines in `text-stone-800` |
| Glassmorphism on every card | Overused | Only on nav bar (subtle `backdrop-blur-md`) |

### 7.2 How to Look Like a Skilled Dev Built It

1. **The before/after demo is genuinely good.** This is the centerpiece. If it works well, the whole site feels competent. Invest the most time here.
2. **Consistent spacing rhythm.** Use a Tailwind spacing scale (`gap-4`, `gap-6`, `gap-8`) — never arbitrary pixel values. Section padding: `py-16 md:py-24`.
3. **Real content, not filler.** Every prompt example is realistic. Every certification is from the content file. No lorem ipsum, no placeholder images.
4. **Keyboard focus states are visible.** Every interactive element has a visible focus ring (`focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2`). This signals accessibility awareness.
5. **Mobile-first responsive.** Test at 375px, 768px, 1280px. The nav collapses cleanly. Cards stack on mobile. The before/after demo works on a phone.
6. **Data layer separation.** Content lives in `src/data/`, not hardcoded in JSX. This signals "I think about architecture."
7. **Semantic HTML.** `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`. Not div soup.
8. **Alt text on every image.** Descriptive, not generic.
9. **TypeScript.** Even if the content files are simple, TypeScript signals professionalism.
10. **The resources page is honest.** It lists the actual libraries used to build the site. This is a meta-demonstration of the lesson itself — structured, specific, real.

### 7.3 Layout Rules to Enforce

- **Hero fits in viewport.** Headline max 2 lines on desktop. Subtext max 20 words. CTAs visible without scroll.
- **Nav renders on one line at desktop.** If 6 links don't fit, condense labels.
- **Section-layout repetition ban.** Don't use the same layout family (3-column cards, zigzag text+image) for consecutive sections. Alternate: full-width → two-column → single-column → cards.
- **Max 1 eyebrow per 3 sections.** Hero counts as 1. So for 6 sections, max 3 eyebrows total (but realistically: 1-2).
- **Body text max-width: 65ch.** Use `max-w-prose` or `max-w-[65ch]`. Wider than that and readability drops.
- **No centered text blocks** except the hero headline. Body copy and section headlines: left-aligned.

---

## 8. Dark Mode Consideration

The brief says dark/light mode is optional. **Recommendation: ship light-only for v1.** Rationale:
- This is a demo teaching site, not a product. The panel evaluates technical competence, not UI feature completeness.
- Light mode is the natural reading mode for educational content.
- Dark mode adds implementation + testing time with low payoff for this context.
- If time allows post-v1, add a toggle using Tailwind `dark:` variants with the stone palette inverted.

**If dark mode is added later:**

| Light | Dark |
|---|---|
| `bg-stone-50` | `bg-stone-950` |
| `bg-stone-100` | `bg-stone-900` |
| `text-stone-800` | `text-stone-100` |
| `text-stone-500` | `text-stone-400` |
| `border-stone-200` | `border-stone-800` |
| `bg-amber-500` (CTA) | `bg-amber-500` (same — amber stays recognizable) |
| `bg-amber-50` | `bg-amber-950` |
| `text-amber-500` | `text-amber-400` (slightly lighter for dark bg contrast) |

---

## 9. Accessibility Baseline

| Requirement | Implementation |
|---|---|
| Color contrast | WCAG AA minimum (4.5:1 body, 3:1 large text). Amber-500 on stone-50 = 3.0:1 (border/.decorative only). Amber-500 on stone-950 = 4.8:1 (passes for body). Use amber-600 for text on light backgrounds. |
| Focus states | `focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2` on all interactive elements |
| Keyboard nav | All interactive elements reachable via Tab. No keyboard traps. |
| Reduced motion | All animation gated behind `useReducedMotion()` / `prefers-reduced-motion` |
| Semantic HTML | `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>`, `<header>` |
| Alt text | Descriptive alt text on all images. Empty alt (`alt=""`) only on decorative images. |
| Heading hierarchy | Single `<h1>` per page. `<h2>` for sections. `<h3>` for subsections. No skipped levels. |
| Link purpose | All links have descriptive text (no "click here" / "learn more" without context) |

---

## 10. File Checklist for dev-build

After scaffolding, these files should exist:

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   ├── MobileNav.tsx
│   │   └── Footer.tsx
│   ├── ui/                          ← shadcn components (card, badge, tabs, sheet, button)
│   ├── PromptComparison.tsx          ← THE animated before/after demo
│   ├── FrameworkTimeline.tsx         ← Magic UI timeline for 4-step framework
│   ├── ActivityChips.tsx             ← Origin UI chip selector
│   ├── CaseStudyCard.tsx             ← shadcn card adapted
│   └── CredentialBadge.tsx           ← shadcn badge adapted
├── data/
│   ├── promptExamples.ts
│   ├── caseStudies.ts
│   ├── certifications.ts
│   └── references.ts
├── pages/
│   ├── Home.tsx
│   ├── Lesson.tsx
│   ├── CaseStudies.tsx
│   ├── Activity.tsx
│   ├── About.tsx
│   └── Resources.tsx
├── App.tsx
├── main.tsx
├── index.css                         ← Tailwind directives + font imports
└── tailwind.config.ts                ← Extended with design tokens
```

---

## 11. Summary for dev-build

**Read this first:** This is an instructional teaching site. The design exists to serve the content, not to impress with visual tricks. Every design decision ties back to the lesson topic: clarity, structure, transformation.

**The one thing that must be great:** The before/after prompt comparison on the homepage. If that interaction feels polished and convincing, the site succeeds. Everything else is supporting structure.

**The one thing that must NOT happen:** The site must not look like it came from a template gallery. Stone palette + amber accent + JetBrains Mono for prompts + left-aligned editorial layout = a distinctive, intentional visual language that no generic Bootstrap/Tailwind starter kit would produce.

**Component sources are real.** shadcn, Aceternity, Magic UI, Origin UI, VengeanceUI — all free, all MIT. Pull via MCP or copy-paste. Don't hand-build what these libraries already ship.

**Motion budget:** Spend it on the before/after toggle. Everything else gets subtle hover states and a page crossfade. No parallax, no scroll-hijack, no infinite loops. Respect `prefers-reduced-motion`.
