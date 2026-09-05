# Site Content Outline — Real Copy, Not Placeholder

> **How to use this file:** This is actual content for every page, written from your resume and the lesson plan already discussed. Hand this to your coding agent alongside the master prompt so it never has to invent filler text. Adjust tone/wording to sound like you when you review it.

> **Source of truth:** this file is canonical. The former `content-md-guide/` pages were consolidated back into this file; `content-md-guide/03_SITE_CONTENT_OUTLINE.md` is now a pointer here. Edit this file when content changes.

---

## Home (`/`)

**Headline (pick one, or write your own in this register):**
- "A prompt is an instruction. Treat it like one."
- "The difference between a vague request and a working answer."

**Subheadline:** A short lesson on prompting as a real, learnable skill for IT work — not a trick, a technique.

**Pre-entry splash:** `SplashScreen` plays once on load before the app mounts — a letter-by-letter headline reveal in JetBrains Mono — then unmounts and hands off to `/`. Respects `prefers-reduced-motion` (text appears immediately, no animation).

**QR code container (hero):** framed card holding the class QR code — set the image in `src/data/site.ts` (`qrImageUrl`); a dashed placeholder box renders until then. The hero is a 2-column grid: text + GitHub button left, QR card right; on mobile the QR card comes FIRST (inverted via `order-*`), then the title and subtext. On desktop the hero fills the viewport (below the sticky navbar) so each page lands showing only its own content.

**Objectives (3 cards, each opens a detail dialog on click):**
1. **Understand** what a prompt actually is and why quality changes output quality — *dialog answers "What is a prompt?" and "Does prompt quality change output quality?"*
2. **Apply** a simple framework — Context, Task, Format, Constraints — to any prompt — *dialog explains the four pieces and why the framework works*
3. **Recognize** how prompting shows up in everyday IT work: debugging, documentation, learning new tools — *dialog gives workplace examples and frames it as a habit*

**Live before/after demo — recurring character: Danniel, a first-year student**

Danniel's buggy code (meant to return only numbers that repeat in an array):
```javascript
function findDuplicates(arr) {
  let duplicates = [];
  for (let i = 0; i <= arr.length; i++) {
    for (let j = 0; j <= arr.length; j++) {
      if (arr[i] === arr[j]) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}
```
It's supposed to return only numbers that appear more than once. Instead it returns every number, and sometimes crashes with `undefined`.

- *Weak prompt:* "fix my code, it's not working" [pastes function]
- *Improved (CTFC) prompt:* "I'm Danniel, a first-year student learning JavaScript for-loops this week. This nested loop is supposed to return only numbers that appear more than once, but it's returning every number instead. Find the bug(s) in the loop conditions and comparison logic. List each bug with a one-line explanation, then show corrected code only for the affected lines. Don't rewrite the whole function using a different approach like `Set` — I need to understand what's wrong with the loop version specifically, since that's what we're learning this week."
- *Weak output:* rewrites the whole function using `Set` instead — technically works, but ignores what was asked and never explains the actual bug
- *Improved output:* (1) `i <= arr.length` / `j <= arr.length` should be `<` — off-by-one past the last valid index; (2) missing `i !== j` check — every element matches itself, so every item gets pushed instead of just real repeats

This is the strongest live-demo moment: the weak answer isn't *wrong*, it solves a different problem than the one asked — a subtler, more convincing lesson than "AI gave a bad answer." Use this same example as the hero on Home, then unpack it in full on `/lesson` alongside the other IT-context examples below.

---

## Lesson (`/lesson`)

**Framework (4 steps, present as an interactive diagram):**
1. **Context** — what's the situation? (e.g., "I'm Danniel, a first-year student learning JavaScript for-loops this week")
2. **Task** — what exactly do you want done? (be specific, not vague) (e.g., "Find the bug(s) in the loop conditions and comparison logic")
3. **Format** — how should the answer be structured? (a list, code only, step-by-step, a short paragraph) (e.g., "List each bug with a one-line explanation, then show corrected code only for the affected lines")
4. **Constraints** — what should it avoid or stay within? (length, tools allowed, don't rewrite everything) (e.g., "Don't rewrite the whole function with a different approach like `Set` — this week's topic is for-loops")

**IT-context before/after examples (Danniel, same first-year student):**

*Danniel's nested-loop bug* — the featured example (see the full write-up above); unpack it here in full on `/lesson` with the actual code block, weak/improved prompts, and the real captured output.

*Example — understanding an error message*
- Weak: "what does this error mean"
- Improved: "I'm Danniel, a first-year student working in VSCode on a React app built with Vite and React Router v7. I added a new page file `src/pages/About.tsx` because I read React Router does file-based routing, but when I open `/about` the page is blank and the console shows `No route matches location "/about"`. Explain why in plain terms — tell me the difference between file-based routing and the `<Routes>` I already have in `App.tsx`, then show me the smallest change to make `/about` work. Don't rewrite my whole `App.tsx`, just the line(s) that need to change."

*Example — learning a new tool quickly*
- Weak: "teach me react router"
- Improved: "I'm Danniel, a first-year student who already knows React basics (components, props, useState). Explain react-router-dom v7 assuming that background — just the parts I need to build a 5-page site with a shared nav. Skip the beginner React explanation."

**Lesson plan (embed directly on this page, required for the demo teaching):**
- Objectives (see above)
- Motivation/hook (2–3 min): live weak-vs-improved prompt comparison
- Lesson proper (10–12 min): framework + IT-context examples
- Application (5–7 min): class activity, rewrite a bad prompt together
- Wrap-up (2–3 min): why this matters for IT work specifically
- Assessment (2 min): one-sentence exit check — "what's one thing you'll change in your next prompt?"

---

## Case Studies (`/case-studies`)

Build 3–4 cards from real project work:

**1. AI-Orchestrated Development Tooling**
A portable 5-agent "dev team" system (Developer, Design, Game Dev, QA/Review, Ops/Planning subagents), each with defined output contracts, deployable into any project. Includes a curated library of 260+ development skills. This is structured prompting applied at the level of an entire workflow, not a single request.

**2. Graphify — Codebase Knowledge Graph**
A custom tool that parses a codebase into a searchable knowledge graph (nodes, edges, community clusters), so an AI coding agent can understand project structure without re-reading the full codebase — cutting token usage and improving prompt context quality during development.

**3. Frames-to-SVG Extractor**
An automated Node.js pipeline that converts a generative-AI logo animation video into lightweight, infinite-resolution SVG frame sequences — directed an AI coding agent to generate the vectorization script and playback component. A concrete example of using structured prompts to direct an agent through a multi-step technical pipeline.

**4. Kitchen One — Capstone Project** *(optional 4th card)*
A restaurant management mobile app (React Native, Expo, Supabase) with role-based access and an automatic rider-assignment algorithm — built from Figma wireframes through to a working, user-tested product.

---

## Activity (`/activity`)

**Interaction:** set the scene with a "What's the problem?" reveal card (Danniel, a complete beginner, has never asked an AI for a plan before, so he types the first thing that comes to mind), then show this weak prompt: *"create a learning roadmap for AI prompting"*

Let the visitor click chips for what's missing: `Context` / `Task` / `Format` / `Constraints` — clicking each reveals what's missing and why it matters, then a "See the improved version" button reveals the rewritten CTFC prompt (beginner skill level, study-and-work goal, week-by-week format, under 30 min/day with free resources only).

**Live-classroom version:** ask the audience to shout out what they'd add first — mirror their answer against the framework in real time.

---

## About (`/about`)

**Short bio paragraph (adapt tone to your voice):**
BS Information Technology graduate, Cum Laude, from Sorsogon State University (2026). Background spans full-stack development (React, React Native, Supabase/PostgreSQL) and hands-on IT networking and field installations — plus a genuine, daily practice of AI-assisted development.

**Instructor photo container:** framed portrait above the bio (image sourced from `src/assets/about-image/profile.jpg`), followed by social icons (LinkedIn, GitHub, Facebook, Instagram, Email) configured in `src/data/site.ts`.

**Certifications, grouped by issuer:**

*Anthropic AI (16)*
Claude 101 · Claude with the Anthropic API · Claude Code in Action · Claude with Amazon Bedrock · Claude with Google Vertex AI · Introduction to Model Context Protocol · Model Context Protocol: Advanced Topics · Introduction to Agent Skills · Introduction to Subagents · Introduction to Claude Cowork · AI Fluency: Framework & Foundations · AI Fluency: AI Capabilities & Limitations · AI Fluency for Students · AI Fluency for Educators · AI Fluency for Nonprofits · Teaching the AI Fluency Framework

*DataCamp (6)*
Joining Data in SQL · Introduction to Relational Databases in SQL · Intermediate SQL · Database Design · Data Manipulation in SQL · AI Ethics

*Cisco Networking Academy (4)*
Networking Basics · Introduction to Modern AI · Apply AI: Analyze Customer Reviews · Apply AI: Update Your Resume

*TESDA National Certificate II*
Computer Systems Servicing · Technical Drafting · Bread & Pastry Production

*Other*
code.org: The Hour of Code

**Optional callout line:** "AI Fluency for Educators" and "Teaching the AI Fluency Framework" are two of the certifications directly behind how this lesson was structured.

---

## Resources (`/resources`)

**Section 1 — Learning resources for AI prompting:**
- Anthropic Skilljar (free Resource Hub) — the same course catalog the certifications on this site come from, with a guided "AI Fluency" track
- Cisco Networking Academy — Apply AI — Cisco's free "Prompt Like an Engineer" course
- W3Schools — free, practical web dev and SQL references; the technical companion for real coding-class prompts

**Section 2 — How this site was built:**
Pull directly from `02_UI_LIBRARY_REFERENCES.md` — the real build stack (React, Vite, Tailwind CSS, shadcn/ui, Radix UI, Motion, React Router, Phosphor Icons) plus the AI tooling used to build it (OpenCode CLI, Graphify). Frame this honestly: "This site itself was built using AI-assisted development — here's the toolchain."