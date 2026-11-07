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
   - It creates `pr-assets` as an orphan branch on first use, pushes, and prints one `<file> <url>` line per image. Use those URLs verbatim in the PR body.
   - Pushing `pr-assets` is outward-facing: only do it as part of opening the PR the user asked for.

4. **Write the PR body** to a file (outside the repo), using the template below.

5. **Push and open the PR**
   ```bash
   git push -u origin feat/<component-name-kebab>
   gh pr create --base main --title "feat: add <ComponentName> component" --body-file <body-file>
   ```
   If the session supplies a PR attribution line, end the body with it. Give the user the PR URL.

6. **After review feedback**: commit the fix, then repeat steps 2, 3 (with the new short SHA) and `gh pr edit --body-file` so the screenshots match the final code.

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

## Checks
- [x] `npm run build`
- [x] `npm run lint`
- [x] `npm run test`
- [x] `npm run test:visual`
- [x] Verified in light and dark mode; semantic SDS tokens only, no raw values
```

Rows come from `manifest.json`: one row per story, in the order captured. If a prop has a size or shape that no story shows on its own, it must still appear in the "All variants and sizes" matrix.

## Notes

- The links use `https://github.com/<owner>/<repo>/blob/<sha>/<path>?raw=true`, which renders in PR descriptions for private and public repos.
- Re-running the publish script with identical images creates no new commit and prints the existing URLs.
- Scripts need `@playwright/test` (already a devDependency), Git 2.42 or newer, and a logged-in `gh`.
