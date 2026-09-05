---
name: graphify-setup
description: "One-command onboarding of a vibe-coding project onto graphify. Builds the project knowledge graph, wires opencode AND Claude Code to consult the graph before exploring (no more mass-grepping), registers the graphify MCP server for zero-token structure lookups, installs auto-rebuild git hooks, and generates a token-cheap PROJECT-MAP.md for boot-time orientation. Use when the user says /graphify-setup, wants to add graphify integration to a project, or wants the AI to understand a project structure without spending tokens grepping."
---

# /graphify-setup

Onboard any project folder so AI assistants understand its structure from a prebuilt graph instead of mass-grepping files. Run **from the project root** (the directory where you will vibe-code). Everything is headless and scriptable; no interactive prompts.

## Prerequisites

- `graphify` CLI available (verify with `graphify --help`; if missing, it is installed in `C:\Users\Danniel Canary\AppData\Local\pipx\pipx\venvs\graphifyy`).
- This skill's scripts live next to this file in `scripts/` (`graphify_project_map.py`, `graphify_mcp_register.py`). They are stdlib-only, so any Python runs them.
- If the project is a git repo, the post-commit hook step works; otherwise it is skipped gracefully.

## Steps (run in order, from the project root)

### 1. Build the graph (headless, no LLM interaction)

```bash
graphify extract . --code-only
graphify cluster-only .
```

- `--code-only` indexes code via local AST — **zero API cost, no API key needed**. Use it for the first pass.
- If an LLM backend key is available (GOOGLE_API_KEY / ANTHROPIC_API_KEY / OPENAI_API_KEY / DEEPSEEK_API_KEY in the environment), drop `--code-only` so semantic extraction also indexes docs, papers, and images. You can upgrade later: run `/graphify . --update` per the graphify skill to add semantic content incrementally.
- `cluster-only` generates `GRAPH_REPORT.md`, `graph.html`, and `.graphify_labels.json`. If it prints `no LLM backend configured`, it keeps `Community N` placeholders — fine, proceed; labeling can be redone with `graphify label . --missing-only` once a key is set.

Verify: `graphify-out/graph.json` exists and has nodes (`graphify god-nodes --top 5` works).

### 2. Wire opencode (AGENTS.md section + tool.execute.before plugin)

```bash
graphify opencode install
```

This writes a `## graphify` section to `AGENTS.md` and installs a `tool.execute.before` plugin that steers the assistant toward graph queries before file-system exploration. Verify: `AGENTS.md` contains `## graphify`.

### 3. Wire Claude Code (CLAUDE.md section + PreToolUse hook)

```bash
graphify claude install
```

Verify: `CLAUDE.md` contains `## graphify`.

### 4. Install auto-rebuild git hooks (post-commit / post-checkout)

```bash
graphify hook install
```

Rebuilds the graph automatically after every commit (AST-only re-extraction; doc/image changes need a manual `/graphify . --update`). If a hook already exists, graphify appends. Verify with `graphify hook status`.

### 5. Register the MCP server in opencode config

```bash
<python> "<skill_dir>/scripts/graphify_mcp_register.py" --project .
```

`<python>` is the interpreter from `graphify-out/.graphify_python` (or any python — the scripts are stdlib-only). Use `$(cat graphify-out/.graphify_python)` where supported.

This merges an `mcp.graphify` block into the project's `opencode.jsonc` (creates the file if absent; preserves other keys; backs up the original to `.bak` if modified; JSONC comments are stripped on rewrite). The MCP server exposes `query_graph`, `get_node`, `get_neighbors`, `get_community`, `god_nodes`, `graph_stats`, `shortest_path` — so the assistant answers structural questions with zero token burn on discovery.

Preview without writing: add `--dry-run`. Restart opencode to load the server.

### 6. Generate the boot-time map (~1.5-2K tokens)

```bash
<python> "<skill_dir>/scripts/graphify_project_map.py"
```

Writes `graphify-out/PROJECT-MAP.md`: corpus stats, god nodes, top communities with member files, top-level layout. This is the artifact the assistants read *first* at session start (the 63KB GRAPH_REPORT.md is too heavy). The AGENTS.md/CLAUDE.md sections installed above already reference the graph; if they do not mention PROJECT-MAP.md explicitly, the map is still useful — point to it.

### 7. Prove the savings

```bash
graphify benchmark
```

Print the token-reduction numbers in chat so the user sees the measured win.

## Verification checklist

- [ ] `graphify-out/graph.json` exists, `graphify god-nodes` returns hubs
- [ ] `AGENTS.md` contains `## graphify`; `CLAUDE.md` contains `## graphify`
- [ ] `graphify hook status` shows hooks installed (skip for non-git folders)
- [ ] `opencode.jsonc` parses and contains `mcp.graphify`
- [ ] `graphify-out/PROJECT-MAP.md` exists and is small (check the `≈N tokens` footer)
- [ ] benchmark numbers printed

## Uninstall / rollback

```bash
graphify opencode uninstall   # removes AGENTS.md section + plugin
graphify claude uninstall     # removes CLAUDE.md section + PreToolUse hook
graphify hook uninstall       # removes git hooks
```

Delete the `mcp.graphify` block from `opencode.jsonc` (`.bak` has the original) and remove `graphify-out/` if no longer wanted.

## Notes

- **Freshness**: git hooks cover code changes; run `/graphify . --update` after doc/image changes, or `graphify watch .` for a background watcher daemon.
- **Multi-assistant**: this wires opencode + Claude Code. Other tools (Cursor, Codex, Gemini, Aider, etc.) have native installers — `graphify <platform> install` (see `graphify --help`).
- **Windows**: paths with spaces are handled by the scripts; always invoke graphify via the full `.graphify_python` path if `graphify` is not on PATH in the target shell.
- **Semantic cost**: the first pass is `--code-only` (free). Adding semantic extraction later costs LLM tokens — that is the only step with a price tag.
