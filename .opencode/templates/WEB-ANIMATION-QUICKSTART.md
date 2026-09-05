# Web Animation — Project Quick Start

> How to use the `web-animation` skill in any React project.

---

## Prerequisites

Your project needs:
- React 18+
- `framer-motion` installed

```bash
npm install framer-motion
```

## Usage

### Option 1: Copy components into your project

Copy the components and hooks you need from `.opencode/skills/web-animation/` into your project:

```
src/
├── components/
│   ├── RevealSection.tsx
│   ├── StaggerContainer.tsx
│   ├── FadeIn.tsx
│   └── HoverCard.tsx
└── hooks/
    └── useScrollReveal.ts
```

### Option 2: Import directly (monorepo / same workspace)

```tsx
import { RevealSection, FadeIn, HoverCard } from ".opencode/skills/web-animation";
```

## Quick Examples

### Scroll reveal
```tsx
import { RevealSection } from ".opencode/skills/web-animation";

<RevealSection>
  <h2>This fades in when scrolled into view</h2>
</RevealSection>

<RevealSection delay={0.15} direction="left">
  <div>Slides in from the left with delay</div>
</RevealSection>
```

### Staggered list
```tsx
import { StaggerContainer, StaggerItem } from ".opencode/skills/web-animation";

<StaggerContainer>
  <StaggerItem>First</StaggerItem>
  <StaggerItem>Second</StaggerItem>
  <StaggerItem>Third</StaggerItem>
</StaggerContainer>
```

### Mount animation
```tsx
import { FadeIn } from ".opencode/skills/web-animation";

<FadeIn slide delay={0.2}>
  <p>Slides up 200ms after mount</p>
</FadeIn>
```

### Hover card
```tsx
import { HoverCard } from ".opencode/skills/web-animation";

<HoverCard className="bg-white border rounded-lg p-4">
  <CardContent>Hover me for a subtle lift</CardContent>
</HoverCard>
```

### Vanilla CSS hook (no Framer Motion)
```tsx
import { useScrollReveal } from ".opencode/skills/web-animation";

const { ref, isVisible } = useScrollReveal();

<div
  ref={ref}
  className={`transition-all duration-600 ${isVisible ? "opacity-100" : "opacity-0"}`}
>
  Plain CSS version
</div>
```

## Design Tokens

All animations use the tokens defined in `DESIGN.md`:
- **Easing:** `[0.16, 1, 0.3, 1]` (ease-out-expo)
- **Entrance:** 600ms, opacity + translateY
- **Hover:** 150-200ms, scale + shadow
- **Route transition:** 200ms crossfade

## Accessibility

Every component automatically checks `prefers-reduced-motion`. If the user has reduced motion enabled, animations are disabled and content renders immediately.

## Adding More Animation

When you need complex timelines, scroll-linked scrub, or SVG morphing, install GSAP:

```bash
npm install gsap
```

Then use the `gsap-core` skill for patterns.
