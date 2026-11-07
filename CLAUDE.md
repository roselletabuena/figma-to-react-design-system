# Claude Code Guidelines

## Codebase Knowledge Graph (Graphify)
The `graphify` skill is installed in `.claude/skills/graphify`. Detailed rule: [`.claude/rules/graphify.md`](file:///c:/Users/ADMIN/workspace/design-to-component/.claude/rules/graphify.md).

### When to Call Graphify
1. **Existing Graph (`graphify-out/graph.json` exists)**:
   - Always query the graph first for architecture, dependency, or component flow questions:
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

