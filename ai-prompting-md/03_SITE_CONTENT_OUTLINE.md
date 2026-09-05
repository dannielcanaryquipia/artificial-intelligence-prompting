# Site Content Outline — Real Copy, Not Placeholder

> **How to use this file:** This is actual content for every page, written from your resume and the lesson plan already discussed. Hand this to your coding agent alongside the master prompt so it never has to invent filler text. Adjust tone/wording to sound like you when you review it.

---

## Home (`/`)

**Headline (pick one, or write your own in this register):**
- "A prompt is an instruction. Treat it like one."
- "The difference between a vague request and a working answer."

**Subheadline:** A short lesson on prompting as a real, learnable skill for IT work — not a trick, a technique.

**Objectives (3 cards):**
1. **Understand** what a prompt actually is and why quality changes output quality
2. **Apply** a simple framework — Context, Task, Format, Constraints — to any prompt
3. **Recognize** how prompting shows up in everyday IT work: debugging, documentation, learning new tools

**Live before/after demo — sample pair to build:**
- *Weak prompt:* "fix my code"
- *Improved prompt:* "Here's a Python function that's throwing a `KeyError` on line 12 [paste snippet]. Explain why the error happens, then show the corrected version. Keep the fix minimal — don't restructure the rest of the function."
- *Simulated weak output:* a generic, unhelpful two-line non-answer
- *Simulated improved output:* a specific explanation + a properly scoped fix

---

## Lesson (`/lesson`)

**Framework (4 steps, present as an interactive diagram):**
1. **Context** — what's the situation? (e.g., "I'm a second-year IT student working on a database assignment")
2. **Task** — what exactly do you want done? (be specific, not vague)
3. **Format** — how should the answer be structured? (a list, code only, step-by-step, a short paragraph)
4. **Constraints** — what should it avoid or stay within? (length, tools allowed, don't rewrite everything)

**IT-context before/after examples (build 2–3 of these):**

*Example — SQL debugging*
- Weak: "why doesn't my query work"
- Improved: "This SQL query is supposed to return customers with more than 3 orders but it's returning everyone. [paste query]. What's wrong with the HAVING clause, and how do I fix just that part?"

*Example — understanding an error message*
- Weak: "what does this error mean"
- Improved: "I'm getting `ECONNREFUSED` when my Node app tries to connect to PostgreSQL locally. I'm using Docker. Explain the most likely cause in plain terms, then give me 2–3 things to check in order."

*Example — learning a new tool quickly*
- Weak: "teach me react router"
- Improved: "I already know React basics (components, props, useState). Explain react-router-dom v6 assuming that background — just the parts I need to build a 5-page site with a shared nav. Skip the beginner React explanation."

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

**Interaction:** Show this weak prompt: *"help me with my assignment"*

Let the visitor click chips for what's missing: `Context` / `Task` / `Format` / `Constraints` — clicking each reveals what's missing and why it matters, then a "See the fix" button reveals a properly structured rewrite.

**Live-classroom version:** ask the audience to shout out what they'd add first — mirror their answer against the framework in real time.

---

## About / Credentials (`/about`)

**Short bio paragraph (adapt tone to your voice):**
BS Information Technology graduate, Cum Laude, from Sorsogon State University (2026). Background spans full-stack development (React, React Native, Supabase/PostgreSQL) and hands-on IT networking and field installations — plus a genuine, daily practice of AI-assisted development.

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
- Google Prompting Essentials (free, Coursera) — 5-step framework, no experience needed
- Anthropic's Prompt Engineering documentation — more technical, best if you're writing prompts for coding/dev tasks
- Google AI Essentials — broader intro to gen AI concepts for total beginners

**Section 2 — How this site was built:**
Pull directly from `02_UI_LIBRARY_REFERENCES.md` — list each library used (shadcn/ui, Magic UI, Aceternity UI, VengeanceUI, Origin UI, 21st.dev) with a one-line description and link. Frame this honestly: "This site itself was built using AI-assisted development — here's the toolchain."
