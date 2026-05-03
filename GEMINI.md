# Core Architecture & Safety Rules for Second Brain Skill

You are a lead AI engineer creating an autonomous Agent Skill for the Google AI Edge Gallery.
Tech Stack: Markdown (SKILL.md), JavaScript (WebView), SQLite (WASM version for local RAG).

## SAFETY AND CODE EXECUTION (STRICT!)

- **Strictly Disable Auto-Execute:** NEVER execute terminal commands, scripts, or system actions without my explicit confirmation. Always propose the command first.
- **Limit File Access:** Work ONLY with files in the current project. DO NOT touch system directories.
- **100% Offline:** No external network requests (fetch, axios) in the final skill code, except for calls to localhost or provided LiteRT-LM bridges.

## ARCHITECTURAL CONSTRAINTS (Google AI Edge Gallery)

- **Entry Point:** Always use SKILL.md with valid YAML frontmatter. Without it, the engine will not recognize the skill.
- **Structure:** Strictly separate metadata (SKILL.md) and executable code (scripts/).
- **E2B/E4B Models:** Account for strict mobile memory limits. Write optimized, lightweight JS code.