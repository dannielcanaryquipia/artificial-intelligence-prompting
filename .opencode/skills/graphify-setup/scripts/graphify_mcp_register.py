#!/usr/bin/env python3
"""Register the graphify MCP server in a project's opencode.jsonc.

Run from the project root. Reads graphify-out/.graphify_python for the
interpreter path, then merges an mcp.graphify block into
<project>/opencode.jsonc (creates it if absent). JSONC comments are stripped
before parsing; the original is preserved at <config>.bak if modified.
Stdlib only. Use --dry-run to preview without writing.
"""

import argparse
import json
import os
import shutil
import sys
from pathlib import Path

SCHEMA = "https://opencode.ai/config.json"


def strip_jsonc_comments(text):
    out = []
    i = 0
    n = len(text)
    in_string = False
    in_line = False
    in_block = False
    while i < n:
        c = text[i]
        nxt = text[i + 1] if i + 1 < n else ""
        if in_line:
            if c == "\n":
                in_line = False
                out.append(c)
            i += 1
            continue
        if in_block:
            if c == "*" and nxt == "/":
                in_block = False
                i += 2
            else:
                i += 1
            continue
        if not in_string:
            if c == "/" and nxt == "/":
                in_line = True
                i += 2
                continue
            if c == "/" and nxt == "*":
                in_block = True
                i += 2
                continue
        if c == '"':
            in_string = not in_string
        out.append(c)
        i += 1
    return "".join(out)


def find_interpreter(project: Path):
    py_file = project / "graphify-out" / ".graphify_python"
    if not py_file.exists():
        raise SystemExit("ERROR: graphify-out/.graphify_python not found — run /graphify or graphify extract first")
    raw = py_file.read_text(encoding="utf-8-sig").strip()
    return raw.strip('"')


def build_mcp_block(project: Path):
    interpreter = find_interpreter(project)
    graph_path = (project / "graphify-out" / "graph.json").resolve()
    if not graph_path.exists():
        raise SystemExit(f"ERROR: graph.json not found at {graph_path}")
    return {
        "type": "local",
        "command": [interpreter, "-m", "graphify.serve", str(graph_path)],
        "enabled": True,
    }


def load_config(config_path: Path):
    if not config_path.exists():
        return None, False
    raw = config_path.read_text(encoding="utf-8")
    had_comments = ("//" in raw) or ("/*" in raw)
    try:
        config = json.loads(strip_jsonc_comments(raw))
    except json.JSONDecodeError as e:
        raise SystemExit(f"ERROR: could not parse {config_path}: {e}. No changes made.")
    return config, had_comments


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--project", default=os.getcwd(), help="project root (default: cwd)")
    ap.add_argument("--dry-run", action="store_true", help="print resulting config without writing")
    args = ap.parse_args()

    project = Path(args.project).resolve()
    config_path = project / "opencode.jsonc"
    if not config_path.exists() and (project / "opencode.json").exists():
        config_path = project / "opencode.json"

    mcp = build_mcp_block(project)
    config, had_comments = load_config(config_path)

    if config is None:
        config = {"$schema": SCHEMA, "mcp": {"graphify": mcp}}
        changed = True
    else:
        mcp_block = config.setdefault("mcp", {})
        existing = mcp_block.get("graphify")
        if existing == mcp:
            print(f"graphify MCP already registered in {config_path}")
            return
        mcp_block["graphify"] = mcp
        changed = True

    rendered = json.dumps(config, indent=2, ensure_ascii=False) + "\n"

    if args.dry_run:
        print(rendered)
        return

    if config_path.exists():
        shutil.copy2(config_path, str(config_path) + ".bak")
        if had_comments:
            print(f"NOTE: {config_path} contained comments; they were stripped on rewrite "
                  f"(original kept at {config_path}.bak)")
    config_path.write_text(rendered, encoding="utf-8")
    print(f"Registered graphify MCP in {config_path}")
    print("Restart opencode to load the MCP server.")


if __name__ == "__main__":
    main()
