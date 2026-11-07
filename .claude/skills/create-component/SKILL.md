---
name: create-component
description: Scaffold and implement a new React design system component following the co-located architecture, SDS tokens, mandatory Storybook stories, and Playwright visual screenshot tests. Use when asked to create, add, or generate a component.
---

# Create Component Workflow

Use this skill whenever asked to create, implement, or scaffold a new component in `design-to-component`.

## Process

1. **Identify the Category**:
   Determine which folder under `src/components/` best fits the component:
   - `actions/` (e.g. Button, IconButton, SplitButton)
   - `navigation/` (e.g. TopAppBar, Tabs, Breadcrumbs, Pagination)
   - `forms/` (e.g. Input, Checkbox, Select, Switch, Slider)
   - `feedback/` (e.g. Alert, Badge, Modal, Toast, Tooltip)
   - `data-display/` (e.g. Card, Avatar, Table, List, Tag)
   - `layout/` (e.g. Stack, Grid, Container, Divider)

2. **Generate the Component Files**:
   Create `src/components/<category>/<ComponentName>/`:
   - `<ComponentName>.types.ts`: Props, variants, sizes.
   - `<ComponentName>.tsx`: React component using semantic SDS tokens (`bg-surface`, `text-text-default`, etc.).
   - `<ComponentName>.stories.tsx`: Storybook stories with `tags: ['autodocs']`, controls, and a `DarkMode` story (`theme: 'dark'`).
   - `<ComponentName>.test.tsx`: Unit tests with Vitest / Testing Library.
   - `<ComponentName>.visual.spec.ts`: Playwright visual screenshot regression test for Light & Dark mode.
   - `index.ts`: Export component and its types.

3. **Register in Barrels**:
   - Add export in `src/components/index.ts`:
     `export * from './<category>/<ComponentName>';`
   - Confirm export is available from the package root `src/index.ts`.

4. **Verify Quality**:
   - Run `npm run build` to verify type generation.
   - Run `npm run test` to verify unit tests pass.
   - Run `npm run test:visual:update` (or `npm run test:visual`) to capture/verify Playwright screenshot baselines.
   - Run `npm run lint` to confirm zero lint errors.
   - Ensure WCAG AA contrast and no raw hex/color values are used.

5. **Open the Pull Request**:
   - Once step 4 passes, follow the `create-component-pr` skill: it captures Storybook screenshots of every variant and size in light and dark mode, and opens a PR whose description embeds them for review.
