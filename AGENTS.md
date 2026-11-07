# Project Instructions & Agent Guidelines

## Codebase Knowledge Graph (Graphify)
This repository includes the `graphify` skill (in `.agents/skills/graphify`). Detailed rule: [`.agents/rules/graphify.md`](file:///c:/Users/ADMIN/workspace/design-to-component/.agents/rules/graphify.md).

### When to Call Graphify
1. **Existing Graph (`graphify-out/graph.json` exists)**:
   - For any question regarding system architecture, dependency relationships, component flow, or cross-module connections, query the graph first:
     - `graphify query "<question>"`
     - `graphify path "<source>" "<target>"`
     - `graphify explain "<node>"`
2. **New Knowledge Graph Generation**:
   - Run `/graphify .` when requested or when auditing large/unfamiliar architectural patterns.
3. **Incremental Updates**:
   - Run `graphify . --update` after major file additions or refactoring.
4. **Do NOT Use For**:
   - Quick single-file/symbol lookups without a graph (use `grep` / direct file reads).
   - Atomic component edits, linting, or routine builds.

