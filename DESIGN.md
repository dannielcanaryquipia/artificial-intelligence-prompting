# Design System — Prompting 101

> Quick reference for consistent design decisions. Full spec lives in [`ai-prompting-md/DESIGN_DIRECTION.md`](ai-prompting-md/DESIGN_DIRECTION.md).

---

## Color Tokens

### Light Mode (only)

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `surface` | `#FAFAF9` | `bg-surface` | Page background |
| `surface-raised` | `#F5F5F4` | `bg-surface-raised` | Card backgrounds, alternated sections |
| `surface-border` | `#E7E5E4` | `border-surface-border` | Borders, dividers |
| `accent` | `#F59E0B` | `bg-accent` / `text-accent` | CTAs, active states, interactive highlights |
| `accent-hover` | `#FBBF24` | `hover:bg-accent-hover` | Hover state |
| `accent-active` | `#D97706` | `bg-accent-active` | Pressed state |
| `accent-tint` | `#FFFBEB` | `bg-accent-tint` | Tinted highlight backgrounds |
| `accent-deep` | `#B45309` | `text-accent-deep` | Small accent text on tint (labels, chip titles) |
| `content-primary` | `#292524` | `text-content-primary` | Body text (stone-800, not pure black) |
| `content-secondary` | `#78716C` | `text-content-secondary` | Captions, labels |
| `content-muted` | `#A8A29E` | `text-content-muted` | Disabled, placeholder |

### Semantic Colors

| Color | Base | Tint | Use |
|---|---|---|---|
| **Amber** | `#F59E0B` | `#FFFBEB` | Accent, CTAs, nav active |
| **Emerald** | `#10B981` | `#ECFDF5` | Success, "improved" prompt |
| **Red** | `#EF4444` | `#FEF2F2` | Error, "weak" prompt |
| **Blue** | `#3B82F6` | `#EFF6FF` | Informational, "context" element |
| **Purple** | `#7C3AED` | `#F5F3FF` | "Constraints" element (deliberate exception to the no-purple rule, single flat token) |

---

## Typography

| Family | Font | Use |
|---|---|---|
| `font-mono` | **JetBrains Mono** | Prompt text, code, labels, "terminal" content |
| `font-sans` | **Inter** | Body copy, headlines, navigation, UI |

### Type Scale

| Element | Classes |
|---|---|
| Page headline (h1) | `font-sans text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight` |
| Section headline (h2) | `font-sans text-xl md:text-2xl font-semibold` |
| Subhead (h3) | `font-sans text-lg font-semibold` |
| Body | `font-sans text-base leading-relaxed` |
| Caption / label | `font-sans text-sm` |
| Prompt text | `font-mono text-sm leading-relaxed` |
| Code label | `font-mono text-xs uppercase tracking-wider` |

### Max Widths

- Body text: `max-w-prose` (65ch)
- Reading content: `max-w-reading` (72ch)

---

## Component Patterns

### Prompt States

| State | Background | Border | Label Color | Text Color |
|---|---|---|---|---|
| **Weak** | `bg-red-tint` | `border-l-4 border-l-red` | `text-red` | `text-content-primary` |
| **Improved** | `bg-emerald-tint` | `border-l-4 border-l-emerald` | `text-emerald` | `text-content-primary` |

### Card Pattern

```tsx
<Card className="bg-surface
                 border-surface-border
                 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5">
  <CardContent className="pt-6">
    {/* content */}
  </CardContent>
</Card>
```

### Badge Pattern

```tsx
<Badge variant="secondary" className="font-mono">{tag}</Badge>
<Badge variant="outline" className="font-mono text-xs">{duration}</Badge>
```

### Button Pattern

```tsx
<Button variant="default" className="bg-accent hover:bg-accent-active text-white">
  Label
</Button>
<Button variant="destructive" className="font-mono gap-2">
  <Warning size={16} /> Weak Prompt
</Button>
```

---

## Spacing Rhythm

| Context | Spacing |
|---|---|
| Section padding | `py-16 md:py-24` |
| Section horizontal | `px-4 sm:px-6` |
| Content max-width | `max-w-4xl mx-auto` |
| Card gap | `gap-3` or `gap-4` |
| Element spacing | `space-y-3` or `space-y-4` |
| Chip gap | `gap-3` |

---

## Animation Rules

| Interaction | Animation | Duration |
|---|---|---|
| Page entrance | `opacity: 0 → 1, y: 20 → 0` | 600ms |
| Route transition | `opacity: 0 → 1` crossfade | 200ms |
| Button hover | `scale: 1.02` | 150ms |
| Button press | `scale: 0.98` | 100ms |
| Card hover | `translate-y: -2px` + shadow | 200ms |
| Chip select | `scale: 0.95` tap | instant |
| Prompt toggle | `opacity + y: 12 → 0` | 500ms |

**Easing:** `[0.16, 1, 0.3, 1]` (ease-out-expo) for all page/prompt transitions.

**Banned:** No parallax, no scroll-hijack, no infinite loops, no typing animations.

All motion respects `useReducedMotion()` from `motion/react`.

---

## Anti-Slop Rules

- Stone palette + amber accent only. No purple/blue gradients (exception: the flat `purple` token used for the "Constraints" element — see color table above, not a gradient and not the main accent).
- Left-aligned hero, left-aligned body copy. No centered text blocks (except hero headline).
- No ALL-CAPS eyebrows above every heading.
- No generic "Get Started" / "Learn More" CTAs.
- Cards only when elevation communicates hierarchy.
- `max-w-prose` (65ch) on body text always.
- Single `<h1>` per page, proper heading hierarchy.

---

## File Structure

```
src/
├── components/
│   ├── layout/          Layout, Navbar, MobileNav, Footer
│   ├── motion/          Motion wrappers (FadeIn, AnimatedTitle, PageHeader, RevealSection)
│   ├── ui/              shadcn primitives (card, badge, button, tabs, dialog, accordion)
│   ├── SplashScreen.tsx Pre-entry splash (letter-by-letter title reveal)
│   ├── PromptComparison.tsx
│   ├── FrameworkTimeline.tsx
│   ├── ActivityChips.tsx
│   ├── DetailDialog.tsx
│   ├── CaseStudyCard.tsx
│   ├── CredentialGroup.tsx
│   ├── WhatWeLearned.tsx
│   └── QrCard.tsx
├── data/                Content files (site, navigation, promptExamples, caseStudies, certifications, references)
├── pages/               Home, Lesson, CaseStudies, Activity, About, Resources
├── lib/
│   └── utils.ts         cn() utility
├── App.tsx              Router setup, <SplashScreen /> before <BrowserRouter>
├── main.tsx
└── index.css            Tailwind v4 tokens
```