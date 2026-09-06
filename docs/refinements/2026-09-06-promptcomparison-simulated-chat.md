# Prompt Comparison — Simulated Chat Refinement

Date: 2026-09-06
Status: Shipped (part of the Home + Lesson before/after prompt demo)

## 1. Summary

`PromptComparison` (used on the Home and Lesson pages) was refined from a static
prompt → response side-by-side into an **interactive simulated chat**. Instead of
reading the weak/improved prompt and its AI answer as plain text, the visitor now
*plays through* the exchange the way they would in a real chat interface:

1. The prompt box shows a **blinking caret** (`|`) and a **`type the prompt` hint**.
2. Clicking it **types the prompt out, character by character**.
3. When typing finishes, an **Enter button** appears on the right.
4. Pressing Enter shows an LLM-style **loading state** in the AI response box.
5. The AI response then **streams in** until it is complete.

This turns the "see the difference" demo from informational into experiential —
the visitor watches the weak request being *typed* and a vague answer *streaming
back*, which makes the contrast with the CTFC-improved prompt tangible instead of
illustrated.

## 2. The Interaction (state machine)

Each prompt box runs a lifecycle of six phases:

```
idle ──click/Enter──▶ typing ──last char──▶ awaitEnter ──Enter──▶ loading ──1.2s──▶ streaming ──last char──▶ complete
```

| Phase | Prompt box | AI response box |
|---|---|---|
| `idle` | Blinking caret + `type the prompt` hint | "Waiting for your prompt…" |
| `typing` | Letters reveal one-by-one, no caret | "Waiting for your prompt…" |
| `awaitEnter` | Full prompt text + **Enter button** on the right | "Waiting for your prompt…" |
| `loading` | Full prompt | "thinking…" spinner |
| `streaming` | Full prompt | Response characters stream in with a colored caret |
| `complete` | Full prompt (caret hidden) | Full response + `answered` / `responded` badge |

The demo **ends when the response completes** — no replay control, by design.

## 3. Design Decisions

| Question | Decision |
|---|---|
| Toggle behavior | **Carry state across modes.** Weak and Improved are two isolated runs inside one shared container; switching toggle swaps which mode is shown without resetting the other. Completed work is still there when you toggle back. |
| End state | Ends when the response is fully streamed (no reset/replay). |
| Idle affordance | Blinking caret + `type the prompt` hint text. The caret is the primary affordance; the hint clarifies what to do. Both disappear when typing starts. |
| Typing animation | **Authorized exception** to the project's "no typing animations" rule — documented in `DESIGN.md`, scoped to this component only. |
| Activation | Clicking the prompt box, or pressing **Enter** / **Space** while it is focused. |
| Motion tokens | Reuses the project easing `[0.16, 1, 0.3, 1]` (ease-out-expo) and the 500ms prompt-toggle transition already defined in `DESIGN.md`. |
| Reduced motion | `useReducedMotion()` short-circuits every step: click → full prompt + Enter, Enter → full response immediately. No blink/spin (global reduced-motion CSS also kills them as a fallback). |

## 4. Implementation

**File:** `src/components/PromptComparison.tsx` (full rewrite, no new dependencies).

### State shape

```ts
type Phase = "idle" | "typing" | "awaitEnter" | "loading" | "streaming" | "complete";

interface RunState { phase: Phase; typedLen: number; respLen: number; }
```

State is **per-mode**, so each mode is an isolated run:

```ts
const [runs, setRuns] = useState<Record<Mode, RunState>>({
  weak: { phase: "idle", typedLen: 0, respLen: 0 },
  improved: { phase: "idle", typedLen: 0, respLen: 0 },
});
```

Toggling only changes which `RunState` is read/written, which is what makes the
"carry state across modes" behavior trivial and race-free.

### Timing constants

| Constant | Value | Meaning |
|---|---|---|
| `CHAR_DELAY` | 26ms | Per-character interval while typing the prompt |
| `THINK_DELAY` | 1200ms | Pause in the AI box ("thinking…") before the response starts |
| `RESP_CHAR_DELAY` | 12ms | Per-character interval while streaming the response |

Typing and streaming run on `setInterval` ticks that increment `typedLen` / `respLen`
via **functional state updates** (never stale `mode`), and transition to the next
phase the moment the target length is reached. Intervals are cleaned up on unmount,
and each effect re-binds when `mode` changes, so toggling mid-flow leaves no orphaned
timers.

### DOM / accessibility structure

- The prompt **box** is a plain styled `div`.
- The **text area inside it** is the interactive element: it becomes `role="button"`
  only while activatable (`idle` / `awaitEnter`), keeps a stable `tabIndex` so focus
  is not lost when typing starts, and handles Enter **and Space** activation.
- In `idle`, a **blinking caret** (`SpanCaret`) and a **`type the prompt` hint** are
  shown; both vanish the moment typing starts. The caret uses `align-baseline` so it
  sits exactly on the text baseline.
- The **Enter button** is a real `<button>` rendered as a sibling of the text area —
  not nested inside it (no button-in-button anti-pattern).
- Every phase is announced: idle → `aria-label="Type the prompt"`, awaitEnter →
  `"…press Enter to send"`.

### Reduced motion

Rather than run the animations and detect reduced motion *inside* the effects, the
short-circuit lives in the two **handlers**:

- `handlePromptActivate` → jumps `idle` straight to `awaitEnter` with the full prompt.
- `handleSubmit` → jumps `awaitEnter` straight to `complete` with the full response.

This means no animation fires at all under `prefers-reduced-motion`, and the lint
clean (no synced setState-in-effect warnings).

## 5. Animation Breakdown

| Element | Animation | Token / values |
|---|---|---|
| Prompt typing | Character reveal via interval | 26ms/char, no easing needed (discrete) |
| Response streaming | Character reveal via interval | 12ms/char |
| Blinking caret (prompt) | `animate-pulse` block rendered as `bg-current` | idle only — hidden when typing starts |
| Blinking caret (stream) | `animate-pulse` block in `text-red` / `text-emerald` | matches mode color |
| Loading | `CircleNotch` + `animate-spin`, "thinking…" | 1200ms think delay then stream |
| Enter button entrance | `motion.button` `opacity 0→1, scale 0.8→1` | 200ms, `[0.16, 1, 0.3, 1]` |
| Mode toggle crossfade | `AnimatePresence` `mode="wait"`, `opacity + y: ±12` | 500ms, `[0.16, 1, 0.3, 1]` |

All transitions animate only `transform` / `opacity` (GPU-composited), per the
project's performance rule.

## 6. QA Findings Addressed

The `qa-review` gate ran on the first pass and raised five findings; all were
addressed before ship:

| Finding | Fix |
|---|---|
| Nested interactive (Enter button inside a `role="button"` container) | Enter button is now a **sibling** of the activatable text area |
| `role="button"` ignored Space-key activation | `onKeyDown` now handles Enter **and** Space with `preventDefault()` |
| Focus lost when `tabIndex` flipped 0→-1 mid-flow | `tabIndex` stays `0` through `awaitEnter`; only drops after submit |
| 4 new lint warnings (`set-state-in-effect` / missing `updateRun` dep) | Reduced-motion jumps moved into the handlers; effects use functional updates only — diff is lint-warning-free |
| Streaming interval recreated every tick | Removed `respLen` from the effect deps; single interval per mode |

No blockers were raised. The nested-interactive, Space, focus, lint, and timer-churn
items are the only actionable ones and are all resolved.

## 7. Files Changed

| File | Change |
|---|---|
| `src/components/PromptComparison.tsx` | Full rewrite — simulated chat flow (see §4) |
| `DESIGN.md` | Added the authorized typing-animation exception for this component |

## 8. Verification

```bash
npm run lint                     # 0 errors, 0 new warnings in PromptComparison.tsx
npm run build                    # tsc -b && vite build — clean
python test-site.py              # full route tour (playwright)
```

An ad-hoc Playwright script additionally asserted **13/13 checks**: idle-only-caret,
AI box waiting, Enter hidden until typed, full prompt typed, Enter appears, thinking
indicator, response streamed, thinking gone, fresh improved idle, improved typed,
improved response, and **state carried back** after toggling Weak → Improved → Weak
— with zero console errors.

## 9. Design-System Impact

`DESIGN.md` (Animation Rules section) now reads:

> **Authorized exception — simulated chat demo (`PromptComparison`):**
> character-by-character prompt typing and AI response streaming, plus the blinking
> caret and "thinking…" spinner, are the point of that component. They are gated: the
> whole interaction respects `useReducedMotion()`… Do not reuse these typing
> animations anywhere else.

The exception is deliberately narrow — typing animations remain banned everywhere
else in the system.