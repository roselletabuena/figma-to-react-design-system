# Rule: Component Architecture & Storybook Standard

All React components created in this repository MUST strictly follow the standard co-located folder structure, export conventions, mandatory Storybook test stories, and Playwright visual screenshot tests defined here.

---

## 1. Directory Structure & Categorization

All UI components live in `src/components/` grouped into semantic category folders:

```
src/components/
├── actions/         # Button, IconButton, SplitButton, LinkButton
├── navigation/      # TopAppBar, NavigationRail, Tabs, Breadcrumbs, Pagination
├── forms/           # TextField, Checkbox, Radio, Switch, Select, Slider
├── feedback/        # Alert, Badge, Modal/Dialog, Toast, Tooltip, ProgressIndicator
├── data-display/    # Card, Avatar, Table, List, Accordion, Tag
└── layout/          # Stack, Grid, Container, Divider, Spacer
```

---

## 2. Mandatory Component Anatomy

Every component folder (`src/components/<category>/<ComponentName>/`) MUST contain:

```
src/components/<category>/<ComponentName>/
├── <ComponentName>.tsx          # React implementation using SDS semantic tokens
├── <ComponentName>.types.ts    # TypeScript interface and type definitions
├── <ComponentName>.stories.tsx  # Storybook stories (autodocs, variants, dual-mode)
├── <ComponentName>.test.tsx     # Vitest component unit tests
├── <ComponentName>.visual.spec.ts # Playwright visual regression screenshot tests
└── index.ts                     # Component barrel export
```

*(Optional: `<ComponentName>.css` is permitted only if custom CSS is needed beyond Tailwind v4 classes).*

---

## 3. Standard File Templates

When creating a new component (e.g. `{{ComponentName}}`), the AI must use the following blueprints:

### File 1: `{{ComponentName}}.types.ts`
```ts
import type { ReactNode, HTMLAttributes } from 'react';

export type {{ComponentName}}Variant = 'default' | 'primary' | 'secondary';
export type {{ComponentName}}Size = 'sm' | 'md' | 'lg';

export interface {{ComponentName}}Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: {{ComponentName}}Variant;
  size?: {{ComponentName}}Size;
  className?: string;
}
```

### File 2: `{{ComponentName}}.tsx`
```tsx
import React from 'react';
import type { {{ComponentName}}Props } from './{{ComponentName}}.types';

/**
 * {{ComponentName}} component adhering to the Simple Design System (SDS).
 */
export const {{ComponentName}} = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}: {{ComponentName}}Props) => {
  return (
    <div
      className={`bg-surface text-text-default border border-border-default rounded-sds-200 transition-colors ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

{{ComponentName}}.displayName = '{{ComponentName}}';
```

### File 3: `{{ComponentName}}.stories.tsx` (Mandatory Storybook)
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { {{ComponentName}} } from './{{ComponentName}}';

const meta = {
  title: 'Components/{{CategoryName}}/{{ComponentName}}',
  component: {{ComponentName}},
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof {{ComponentName}}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '{{ComponentName}} Content',
    variant: 'default',
    size: 'md',
  },
};

export const DarkMode: Story = {
  parameters: {
    theme: 'dark',
  },
  args: {
    ...Default.args,
  },
};
```

### File 4: `{{ComponentName}}.test.tsx` (Vitest Unit Test)
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { {{ComponentName}} } from './{{ComponentName}}';

describe('{{ComponentName}}', () => {
  it('renders children correctly', () => {
    render(<{{ComponentName}}>Test Content</{{ComponentName}}>);
    expect(screen.getByText('Test Content')).toBeDefined();
  });
});
```

### File 5: `{{ComponentName}}.visual.spec.ts` (Playwright Screenshot / Visual Quality)
```ts
import { test, expect } from '@playwright/test';

test.describe('{{ComponentName}} Visual Regression', () => {
  test('matches light and dark mode screenshot snapshots', async ({ page }) => {
    // Navigate to Storybook iframe for this component story
    await page.goto('/iframe.html?id=components-{{CategorySlug}}-{{ComponentNameSlug}}--default');
    
    // Light mode snapshot
    await expect(page.locator('#storybook-root')).toHaveScreenshot('{{ComponentNameSlug}}-light.png');

    // Switch to dark mode snapshot
    await page.locator('html').evaluate((el) => el.classList.add('dark'));
    await expect(page.locator('#storybook-root')).toHaveScreenshot('{{ComponentNameSlug}}-dark.png');
  });
});
```

### File 6: `index.ts`
```ts
export { {{ComponentName}} } from './{{ComponentName}}';
export type { {{ComponentName}}Props, {{ComponentName}}Variant, {{ComponentName}}Size } from './{{ComponentName}}.types';
```

---

## 4. Barrel Export Obligations

Whenever a component is added:
1. Export it in `src/components/index.ts`:
   ```ts
   export * from './<category>/<ComponentName>';
   ```
2. Verify it is accessible via the library root `src/index.ts`.

---

## 5. Design Token Compliance & Verification Checklist

Before finalizing any component:
- [ ] **No raw hex/rgb values**; uses semantic SDS tokens (`bg-surface`, `text-text-default`, etc.).
- [ ] **Storybook autodocs** and Controls work without TypeScript warnings.
- [ ] **Tested in Dark Mode** via Storybook story with `theme: 'dark'`.
- [ ] **Unit tests pass**: `npm run test`.
- [ ] **Visual screenshot tests run**: `npm run test:visual` (or update with `npm run test:visual:update`).
- [ ] **`npm run build` and `npm run lint` pass** cleanly.
