# Project Instructions & Agent Guidelines

## Design System & Tokens (Mandatory)
All visual styling in this repository must strictly adhere to the Simple Design System (SDS) token architecture. Detailed rule: [`.agents/rules/design-tokens.md`](file:///c:/Users/ADMIN/workspace/design-to-component/.agents/rules/design-tokens.md).

### Core Principles
1. **Zero Raw Values**: Never write hardcoded colors (`#hex`, `rgb()`), arbitrary Tailwind brackets (`bg-[#...]`), or arbitrary spacing (`p-[13px]`).
2. **Semantic Tokens Only**: Always use semantic tokens (`bg-surface`, `text-text-default`, `border-border-default`) rather than raw primitive colors.
3. **Dual Mode / Theming**: Every component must support both Light and Dark modes seamlessly and meet WCAG 2.1 AA contrast standards.
4. **Storybook Verification**: Every component must have an accompanying Storybook story tested in both themes.

---

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
