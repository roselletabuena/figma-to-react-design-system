# Rule: When to Use Graphify

Graphify converts a codebase into a navigable knowledge graph with AST code extraction, semantic document indexing, community detection, and query tools.

## Trigger Conditions

### 1. Fast Path — Existing Graph (`graphify-out/graph.json` exists)
When `graphify-out/graph.json` is present in the repository root:
- **Always query the graph first** for questions about architecture, code flow, component relationships, dependencies, and system structure.
- Execute:
  - `graphify query "<question>"` — BFS traversal for broad conceptual/architectural questions.
  - `graphify query "<question>" --dfs` — Trace deep execution flows or sequential dependencies.
  - `graphify path "<SourceNode>" "<TargetNode>"` — Find the shortest connection path between two components or modules.
  - `graphify explain "<Node>"` — Summarize a module, component, or concept within the context of the whole system.
- Do not fall back to manual recursive file grepping when the answer is already structured in the graph.

### 2. Building a Knowledge Graph (Explicit or High-Value Situations)
Run the Graphify pipeline (`/graphify .` or `graphify`) when:
- The user explicitly asks to graphify, map, or analyze repository architecture.
- Onboarding or performing a comprehensive architectural audit of an unfamiliar/complex codebase.
- Investigating structural integrity: detecting god nodes, bridge nodes, tight coupling, circular dependencies, or orphan components.
- Connecting documentation, specs, and design tokens to their code implementations across directories.

### 3. Incremental Updates (`--update`)
- When the codebase has undergone significant additions or refactoring and `graphify-out/` already exists, run `graphify . --update` to re-extract modified files without re-indexing the entire repository.

---

## When NOT to Call Graphify

Do **NOT** invoke Graphify for:
- **Targeted Lookups**: Single-symbol definitions or simple file searches (e.g. "where is `Button` exported?") when no graph exists yet. Use `grep`, `glob`, or direct file reading instead.
- **Atomic Code Changes**: Writing a single component, editing CSS, fixing typos, linting, or formatting.
- **Short-Lived Tasks**: Running tests, building packages (`vite build`), or managing dependencies.
- **Missing Graph & Simple Queries**: Never block a quick question on building a full graph from scratch if a simple search gives the answer in seconds.

