# MCP Setup Guide — shadcn, Playwright, and VengeanceUI

> **How to use this file:** Run these setup steps once, in your project folder, before asking your coding agent to build UI. This connects your agent directly to component registries and a real browser, so it can pull polished components and test the site itself instead of you doing it by hand.

---

## 1. shadcn/ui MCP Server (official)

**What it does:** Gives your coding agent direct, live access to the shadcn/ui component registry — it can browse, search, and install components/blocks using plain-English prompts instead of you copy-pasting code manually.

### Setup (Claude Code)
```bash
pnpm dlx shadcn@latest mcp init --client claude
```
Or manually add to your project's `.mcp.json`:
```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```
Restart Claude Code, then run `/mcp` — you should see `shadcn` listed as **Connected**.

### Setup (Cursor)
Add the same block to `.cursor/mcp.json`, then enable it under Cursor Settings → MCP.

### Example prompts once connected
```
List all available shadcn/ui components and blocks.
Add a card component and a badge component to this project.
Show me shadcn's dashboard-01 block, I want to adapt its layout for a case-studies grid.
Install a navigation-menu component styled for a left sidebar nav.
```

---

## 2. Playwright MCP Server (official, Microsoft)

**What it does:** Gives your agent a real, controllable browser. Instead of you manually resizing your browser window to check responsiveness, you can ask the agent to open the site, navigate every route, resize the viewport, and report what it sees (or take screenshots) — genuinely useful for the "fully responsive" requirement in the master prompt.

### Setup (Claude Code)
```bash
claude mcp add playwright npx @playwright/mcp@latest
```
Or manually add to `.mcp.json`:
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```
First-time browser download (once per machine):
```bash
npx playwright install
```

### Example prompts once connected
```
Start the dev server, then open localhost:5173 in a browser and navigate to every route in the nav. Report any console errors.
Resize the viewport to 375x812 (iPhone) and take a snapshot of the home page. Then do the same at 768px and 1280px. Tell me what breaks.
Click through the /activity page interaction and confirm the reveal logic actually works.
Check that every image has alt text and every interactive element is reachable by keyboard (Tab).
```

This is a genuinely good practice to demo live if a panel member asks about your dev workflow — using a browser-automation MCP for testing is a real, current AI-assisted engineering technique, not a gimmick.

---

## 3. VengeanceUI — no official MCP, use it directly

VengeanceUI is a free, MIT-licensed, copy-paste animated component library (React + Tailwind + Framer Motion) aimed at landing pages — good for the Home page hero and any section that wants a bit of motion polish. It does **not** currently publish its own MCP server, so pull it in one of two ways:

**Option A — direct copy-paste (simplest):**
```
Go to the VengeanceUI docs, find a component that fits [hero section / animated feature grid / etc.], and copy its source directly into src/components/.
```

**Option B — via a registry MCP that indexes it:**
Some community component marketplaces (e.g. 21st.dev, shadcn.io) index third-party libraries including Aceternity-style animated components and can be pulled through their own MCP servers if you want everything sourced through one pipeline. This is optional — don't add a third MCP server just for this if Option A is fast enough.

---

## 4. Suggested Order of Operations

1. Scaffold the project from `00_MASTER_BUILD_PROMPT.md` first — routing, pages, data layer, base Tailwind styling.
2. Connect the **shadcn MCP** and pull in structural components (cards, nav, badges, tabs) as you build out each page.
3. Pull 1–2 **VengeanceUI** components by hand for the hero and one standout animated moment (per the "spend your motion budget in one place" design principle).
4. Once the site is functionally complete, connect **Playwright MCP** and have the agent walk every route at three breakpoints, fixing whatever it finds.
5. Do a final manual pass yourself the night before — sit in the audience's seat and click through it as a stranger would.
