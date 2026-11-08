---
name: create-component-pr
description: Open a pull request for a newly created design system component, with a review-ready description that has Storybook screenshots for every variant and size in both light and dark mode. Use after create-component finishes, or when asked to open or prepare a PR for a component.
---

# Create Component PR

Turn a finished component into a pull request a reviewer can judge without running Storybook. Run this after the `create-component` skill's verify step passes. Never merge the PR.

## Preconditions

- `npm run build`, `npm run lint`, `npm run test` and `npm run test:visual` pass (see `create-component` step 4).
- The component's stories cover everything a reviewer should see. Add stories first if they do not:
  - one story per **variant** (for example `Default`, `Initial`, `Square`),
  - one matrix story (conventionally `AllVariants`) that shows every **variant x size** combination,
  - the conventional `DarkMode` story (it is skipped when capturing, because dark is captured for every story).
- The working tree holds only this component's changes. Anything unrelated is committed or stashed separately.

## Process

1. **Branch and commit**
   - Never commit to `main`. Create `feat/<component-name-kebab>` from `main`.
   - Commit with the `git-atomic-commit` skill. Match the repo's style, for example `feat: add Avatar component from Simple Design System`.

2. **Capture screenshots**
   - Start Storybook in the background: `npm run storybook -- --ci` (it serves on port 6006).
   - Run the capture script. The prefix is the story id up to the double dash, for example `components-data-display-avatar`:
     ```bash
     node .agents/skills/create-component-pr/scripts/capture-screenshots.mjs <story-id-prefix> <out-dir>
     ```
   - `<out-dir>` must be outside the repo (the session scratchpad or `$(mktemp -d)`) so the PNGs are never committed by accident.
   - It writes `<story>-light.png`, `<story>-dark.png` for every story, plus `manifest.json` (story name and file names).
   - Open at least the matrix images and check them: both themes look intentional and nothing is clipped. If a theme looks wrong, fix the component, not the screenshot.
   - Stop Storybook when finished.

3. **Publish the screenshots**
   - `gh` cannot attach images to a PR body, so the images go to a separate `pr-assets` branch and are linked by commit SHA. This keeps the PR diff clean.
     ```bash
     COMMIT_TRAILER="<attribution line from the session>" \
       bash .agents/skills/create-component-pr/scripts/publish-screenshots.sh <out-dir> <component-kebab>/<short-sha-of-branch-tip>
     ```
   - It creates `pr-assets` as an orphan branch on first use, pushes, and prints one `<file> <url>` line per image on stdout, plus `repo: <owner>/<repo>` on stderr. Use the URLs verbatim in the PR body and keep the repo slug for step 5.
   - Pushing `pr-assets` is outward-facing: only do it as part of opening the PR the user asked for.

4. **Write the PR body** to a file (outside the repo), using the template below. Every screenshot is an `<img src="<url>">` tag with a URL printed in step 3. Never put a URL or an `<img>` tag inside backticks or a code block (it then shows as literal text instead of an image), and never link the Playwright baseline PNGs in `*.visual.spec.ts-snapshots/` (that opens GitHub's file page, not an image).

5. **Push and open the PR** with the REST API. `gh pr create` and `gh pr edit` use GraphQL, which cloud sessions block (see [Cloud sessions](#cloud-sessions)); `gh api` works everywhere.
   ```bash
   REPO=<owner>/<repo>   # the `repo:` line from step 3
   git push -u origin <branch>   # feat/<component-name-kebab>, or the branch the session assigned
   gh api "repos/$REPO/pulls" -f title="feat: add <ComponentName> component" \
     -f head=<branch> -f base=main -F body=@<body-file> --jq .html_url
   ```
   If the session supplies a PR attribution line, end the body with it. Give the user the PR URL.
   Where `gh` is restricted (for example a session that only allows the GitHub MCP tools), open the PR with `create_pull_request` (as a draft) and change it with `update_pull_request` instead. Those tools can corrupt image URLs, so step 6 is mandatory there; see [If the body is corrupted](#if-the-body-is-corrupted).

6. **Verify the body renders images. This is a gate: do not report the PR as done, tick the checklist, or quote an image count until it passes.** Read the body back from GitHub; what you sent is not proof of what was stored. The count must be two per story in `manifest.json` (light and dark), and none may sit inside backticks:
   ```bash
   gh api "repos/$REPO/pulls/<number>" --jq .body | grep -o '<img src="https://github.com/[^"]*' | wc -l
   gh api "repos/$REPO/pulls/<number>" --jq .body | grep -c '`.*<img'   # expect 0
   gh api "repos/$REPO/pulls/<number>" --jq .body | grep -c '&lt;img\|`https://'   # expect 0
   ```
   Without `gh`, read the body with `pull_request_read` (method `get`) and check the same by eye: every screenshot is a literal `<img src="https://...">`, with no `&lt;`, no backtick runs around a URL, and the count matches. If it does not, go to [If the body is corrupted](#if-the-body-is-corrupted).

7. **After review feedback**: commit the fix, then repeat steps 2, 3 (with the new short SHA) and update the body so the screenshots match the final code:
   ```bash
   gh api -X PATCH "repos/$REPO/pulls/<number>" -F body=@<body-file>
   ```

## PR body template

Use `<img width="...">` so large images do not blow up the table.

```markdown
## Summary
<One or two sentences: what the component is and which Figma / SDS component it implements.>

## Screenshots

### All variants and sizes
| Light | Dark |
| --- | --- |
| <img src="<all-variants-light url>" width="360" alt="All variants, light"> | <img src="<all-variants-dark url>" width="360" alt="All variants, dark"> |

### Per variant
| Variant | Light | Dark |
| --- | --- | --- |
| Default | <img src="<default-light url>" width="200" alt="Default, light"> | <img src="<default-dark url>" width="200" alt="Default, dark"> |
| <Variant> | ... | ... |

## Variants and sizes
| Prop | Values |
| --- | --- |
| variant | ... |
| size | ... |

## Changes
- `src/components/<category>/<ComponentName>/` (component, types, stories, unit tests, visual spec, barrel)
- Barrel exports in `src/components/index.ts`
- `docs/figma-component-status.md` (component marked done, with its code path and implementation date)

## Checks
- [x] `npm run build`
- [x] `npm run lint`
- [x] `npm run test`
- [x] `npm run test:visual`
- [x] Verified in light and dark mode; semantic SDS tokens only, no raw values
```

Rows come from `manifest.json`: one row per story, in the order captured. If a prop has a size or shape that no story shows on its own, it must still appear in the "All variants and sizes" matrix.

## Cloud sessions

These steps also run in Claude Code on the web / `claude --cloud`, where the VM differs from a local machine:

- **`gh pr` / `gh issue` are blocked.** The GitHub proxy rejects GraphQL with a 403 (`GitHub GraphQL is not available from Claude Code sessions`). Steps 5 to 7 use `gh api` (REST) for that reason. Do not fall back to a PR body that only links the committed baseline images.
- **Browser.** The VM has Chrome at `$CHROME_PATH`; `capture-screenshots.mjs` uses it automatically. Do not run `npx playwright install`: Playwright's download host may not be reachable.
- **`origin` is a proxy URL**, not `github.com`. `publish-screenshots.sh` reads `owner/repo` from its last two path segments. If the `repo:` line it prints is wrong, re-run with `GITHUB_REPO=<owner>/<repo>`.
- **Working branch.** If the session assigned one (cloud sessions use `claude/<name>`), commit, push and open the PR from it instead of creating `feat/<component-name-kebab>`.
- **Visual baselines are per OS.** Playwright names them `...-chromium-linux.png` or `...-chromium-win32.png`. A component whose baselines exist only for Windows fails `npm run test:visual` on Linux. Say so in the PR instead of treating it as caused by the new component.
- **Git version.** The publish script falls back to `git checkout --orphan` when Git is older than 2.42.

## If the body is corrupted

Seen with the GitHub MCP body writer: after a create or update, some screenshot URLs come back wrapped in runs of backticks (and `<` escaped as `&lt;`), so those images show as text. The same content produces the same corruption every time, so resending it, renaming files or changing alt text does not help.

1. Resend the body once, then stop; do not loop.
2. Prefer the REST path in step 5 (`gh api -X PATCH`). If `gh` is not permitted, ask the user to allow it for this repo.
3. As a last resort, put each still-broken image's URL as plain text on its own line (bare URLs were not corrupted), and tell the user exactly which images are links rather than inline, and why.
4. Never state that all screenshots render unless the read-back in step 6 proved it.

## Notes

- The links use `https://github.com/<owner>/<repo>/blob/<sha>/<path>?raw=true`, which renders in PR descriptions for private and public repos.
- `.claude/skills/create-component-pr` and `.agents/skills/create-component-pr` are mirrors (the scripts are invoked from the `.agents` path). Change both together.
- Re-running the publish script with identical images creates no new commit and prints the existing URLs.
- Scripts need `@playwright/test` (already a devDependency), Git (2.42 or newer is not required, see above), and a logged-in `gh` (in cloud sessions the proxy authenticates `gh api` for you).
