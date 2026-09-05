# Design Tokens — Animation

> Canonical animation values for all projects. The `web-animation` skill reads these.

---

## Easing

| Token | Value | Use |
|-------|-------|-----|
| `ease-out-expo` | `[0.16, 1, 0.3, 1]` | Default for all Motion/CSS transitions |
| `ease-in-out-smooth` | `[0.4, 0, 0.2, 1]` | Multi-step transitions |
| `ease-spring` | spring with stiffness 300, damping 24 | Bouncy interactions |
| `ease-bounce` | spring with stiffness 400, damping 10 | Playful emphasis |

## Durations

| Token | Value | Use |
|-------|-------|-----|
| `duration-instant` | `100ms` | Micro-feedback (button press) |
| `duration-fast` | `150ms` | Hover states, toggles |
| `duration-normal` | `200ms` | Card hover, tooltips |
| `duration-slow` | `400ms` | Page-level reveals |
| `duration-entrance` | `600ms` | Section entrance animations |
| `duration-route` | `200ms` | Route/page crossfade |

## Entrance Animations

| Pattern | Properties | Duration | Easing |
|---------|-----------|----------|--------|
| Fade in | `opacity: 0→1` | 600ms | ease-out-expo |
| Slide up | `opacity: 0→1, y: 20→0` | 600ms | ease-out-expo |
| Slide from left | `opacity: 0→1, x: 40→0` | 600ms | ease-out-expo |
| Slide from right | `opacity: 0→1, x: -40→0` | 600ms | ease-out-expo |
| Scale in | `opacity: 0→1, scale: 0.95→1` | 400ms | ease-out-expo |

## Micro-Interactions

| Pattern | Properties | Duration | Easing |
|---------|-----------|----------|--------|
| Button hover | `scale: 1.02` | 150ms | ease-out-expo |
| Button press | `scale: 0.98` | 100ms | ease-out-expo |
| Card hover | `translateY: -2px, shadow` | 200ms | ease-out-expo |
| Link underline | `width: 0→100%` | 200ms | ease-out-expo |

## Stagger

| Pattern | Delay per child | Use |
|---------|----------------|-----|
| List reveal | `100ms` | Feature lists, nav items |
| Grid reveal | `80ms` | Card grids, image galleries |
| Hero cascade | `150ms` | Title → subtitle → CTA sequence |

## Banned Patterns

- **Parallax scroll-hijack** — no scroll-position-linked element displacement
- **Infinite loops** — except loading indicators (spinner, shimmer)
- **Typing animations** — character-by-character reveal
- **Layout thrashing** — never animate `width`, `height`, `top`, `left`, `margin`, `padding`

## Performance Rules

1. Only animate `transform` and `opacity` (GPU-composited)
2. Use `will-change: transform` before animation, remove after
3. Prefer CSS transitions for simple hover states (no JS overhead)
4. Use Motion's `layout` prop for layout animations
5. Always check `prefers-reduced-motion` and disable animations if set

## Accessibility

Every animation pattern MUST include:

```tsx
// Framer Motion
const prefersReduced = useReducedMotion();
if (prefersReduced) return <div>{children}</div>;

// CSS fallback
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}
```
