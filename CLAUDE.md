# Claude Code Guidelines

## Design System & Tokens (Mandatory)
All visual styling in this repository must strictly adhere to the Simple Design System (SDS) token architecture. Detailed rule: [`.claude/rules/design-tokens.md`](file:///c:/Users/ADMIN/workspace/design-to-component/.claude/rules/design-tokens.md).

### Core Principles
1. **Zero Raw Values**: Never write hardcoded colors (`#hex`, `rgb()`), arbitrary Tailwind brackets (`bg-[#...]`), or arbitrary spacing (`p-[13px]`).
2. **Semantic Tokens Only**: Always use semantic tokens (`bg-surface`, `text-text-default`, `border-border-default`) rather than raw primitive colors.
3. **Dual Mode / Theming**: Every component must support both Light and Dark modes seamlessly and meet WCAG 2.1 AA contrast standards.
4. **Storybook Verification**: Every component must have an accompanying Storybook story tested in both themes.

---

## Component Architecture & Storybook Standard (Mandatory)
All UI components must adhere to the 5-file co-located structure and include Storybook stories with dark mode and a11y tests. Detailed rule: [`.claude/rules/component-architecture.md`](file:///c:/Users/ADMIN/workspace/design-to-component/.claude/rules/component-architecture.md).

### Core Structure:
- Category layout: `src/components/<category>/<ComponentName>/`
- Co-located files: `.tsx`, `.types.ts`, `.stories.tsx`, `.test.tsx`, `index.ts`
- Barrel export in `src/components/index.ts` and `src/index.ts`
- Pull request: when a component is finished, open a PR whose description embeds a screenshot of every variant and size in light and dark mode, following [`.claude/skills/create-component-pr`](.claude/skills/create-component-pr/SKILL.md). It works in cloud sessions too (see its "Cloud sessions" section). Never merge the PR.

---

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
