---
name: create-components-parallel
description: Create several design system components at once by dispatching one sub-agent per component, each running the create-component skill in its own git worktree, then finishing visual baselines and pull requests one component at a time. Use when asked to create, build or implement multiple components, "in parallel", "the next N components", or every component on a Figma page.
---

# Create Components in Parallel

Fan out the `create-component` skill across sub-agents. You are the coordinator: you pick the components, dispatch the agents, and collect results. You do not write component code yourself. Never merge a PR and never commit to `main`.

The work is split in two phases because some steps cannot run in parallel:

| Step | Parallel-safe? | Why |
| :--- | :--- | :--- |
| Write files, `npm run build`, `lint`, `test` | Yes | Each agent has its own worktree. |
| `test:visual`, Storybook, screenshots | **No** | Storybook and `playwright.config.ts` are fixed to port 6006, and Playwright reuses whatever is already on that port, so one agent's tests can run against another agent's code. |
| Publishing screenshots, opening PRs | **No** | All screenshots go to one shared `pr-assets` branch. |

So phase 1 builds in parallel and phase 2 finishes one component at a time.

## Preflight

1. Run from the main checkout. `git fetch`, then confirm the branch is `main`, up to date, and the tree is clean. Worktrees start from the committed `HEAD`, so uncommitted changes (including `docs/figma-component-status.md` and the skills) would be missing from every agent. If the tree is dirty, stop and tell the user what to commit first.
2. Build the list of components:
   - **Names given:** use them.
   - **"Next N" or a Figma page:** take rows with Status `todo` and Kind `component` from `docs/figma-component-status.md`, top to bottom. `primitive` rows are built with their parent, not on their own.
   - Drop anything already `done` or already present under `src/components/`.
3. Read each component's Figma link from the tracker; the URL gives `fileKey` and `nodeId`. If a component is not in the tracker, ask the user for its Figma URL.
4. **Size limit:** if the list has more than 8 components, do the first 8, then stop and ask before continuing. Each component becomes a PR.
5. **Waves:** at most 4 components per wave (installs, Figma rate limits, CPU). Finish a wave completely (phase 1, then phase 2) before starting the next.
6. Never put two components in one wave if one is built from the other (for example a Group and its Item). Build the dependency in an earlier wave.
7. State the final list and wave plan in one message, then continue. Do not wait for a reply.
8. Note the attribution lines your own session instructions require for commits and PR bodies, if any. Sub-agents start cold and do not see them, so you pass them into every prompt below.

## Phase 1: build in parallel

Send **one message containing all the Agent calls for the wave** so they run together. For each component use `subagent_type: "general-purpose"` and `isolation: "worktree"` with this prompt, filled in:

```
You are building one design system component in your own git worktree. Other agents are building other components in parallel in their own worktrees.

Component: <Name>
Figma: <url> (fileKey <key>, nodeId <id>). This is the design source of truth.
Build together with it: <primitive rows, or "nothing else">
Attribution: end commit messages with "<commit line>" <omit this line if there is none>

1. `git switch -c feat/<name-kebab>`, then `npm ci`.
2. Read the Figma MCP guidance first (the figma-design-to-code skill; if it is not installed, ReadMcpResourceTool server `claude_ai_Figma`, uri `skill://figma/figma-design-to-code/SKILL.md`). Then call create_session and get_design_context for the node.
3. Invoke the create-component skill (Skill tool, skill "create-component", args "<Name> <Figma url>") and follow it, with these overrides:
   - Step 4: run `npm run build`, `npm run lint` and `npm run test` only. Do NOT run `npm run test:visual`, `npm run test:visual:update` or Storybook: port 6006 is shared with the other agents.
   - Step 5 (tracker): edit only this component's rows. Leave the `(done/total)` heading counts and the `Progress:` line alone; they conflict across parallel PRs.
   - Step 6 (pull request): skip it. Do not push and do not open a PR.
4. Commit on your branch with the git-atomic-commit skill, in the style `feat: add <Name> component from Simple Design System`.
5. Touch nothing outside `src/components/<category>/<Name>/`, `src/components/index.ts` and `docs/figma-component-status.md`.
6. Your final message must be exactly this block and nothing else:
   RESULT: built | failed
   worktree: <absolute path from `git rev-parse --show-toplevel`>
   branch: <branch>
   component_path: <src/components/...>
   story_prefix: <for example components-data-display-avatar>
   stories: <comma-separated story names>
   checks: build=<pass|fail> lint=<pass|fail> test=<pass|fail>
   deviations: <where the result differs from the Figma design, or "none">
   failure: <the failing output if RESULT is failed, else "none">
```

Sub-agents run in the background and notify you when they finish. Wait for every notification; do not poll or sleep.

Mark each component by its `RESULT` line. A `failed` component gets one retry with its `failure` text added to the prompt (SendMessage to the same agent; load it with ToolSearch if it is deferred). If it still fails, leave it, report it, and move on. Do not block the others.

## Phase 2: visual baselines and PRs, one at a time

For each `built` component, start one sub-agent, wait for its completion notification, then start the next. Never run two at once: they would share port 6006 and the `pr-assets` branch. Use `subagent_type: "general-purpose"` without worktree isolation, with this prompt:

```
Finish component <Name>. It is built and committed on branch <branch> in the worktree <path>. Work only in that worktree: start every command with `cd <path> &&` or use absolute paths.
Attribution: end commit messages and the PR body with "<commit line>" and "<PR line>" <omit what does not apply>

1. Run `npm run test:visual:update` to create the baselines, then `npm run test:visual` to confirm they pass, and commit the baselines.
2. Follow the create-component-pr skill from step 2 through step 6 (the branch and commit already exist). Storybook on port 6006 is yours alone; stop it when you are done.
3. Never merge the PR.
4. Your final message must be exactly this block and nothing else:
   RESULT: opened | failed
   pr: <PR URL, or "none">
   images: <image count from the step 6 check> of <expected: 2 x stories>
   failure: <the exact failure, or "none">
```

If `RESULT` is `failed` or `images` does not match, say so in the report. Do not count it as done.

## Final report

Give the user one table, then the follow-ups:

| Component | Branch | PR | Status |
| :--- | :--- | :--- | :--- |

- Say which components failed and why, and list any `deviations` from the Figma design.
- **Merge conflicts are expected.** Every PR adds a line to `src/components/index.ts` and edits `docs/figma-component-status.md`. After the first merge, rebase the others and keep both sides.
- **Tracker counts are stale.** The `(done/total)` headings and `Progress:` line were left alone. Recount `| done |` rows after merging (the next `create-component` run does this in step 5).
- The worktrees stay on disk because they hold the PR branches and may be needed for review fixes. After a PR merges, remove its worktree with `git worktree remove <path>`.

## Notes

- `.claude/skills/create-components-parallel` and `.agents/skills/create-components-parallel` are mirrors. Change both together.
- Each worktree needs its own `node_modules`; `npm ci` in every agent is slow but safe.
- To run phase 2 in parallel too, make the Storybook port configurable in `playwright.config.ts` and give each agent its own port and its own screenshot branch. This skill does not assume that.
