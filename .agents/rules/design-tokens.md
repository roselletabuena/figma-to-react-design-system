# Rule: Mandatory Design Token Usage & Architecture

All visual styling across components, pages, stories, and stylesheets in this repository MUST be derived exclusively from the design system's token pipeline (`src/tokens/` and Tailwind CSS v4 `@theme` mappings).

---

## 1. Zero Raw Values Policy

Writing hardcoded, arbitrary, or "magic" visual values is strictly prohibited:

| Prohibited ❌ | Required Alternative ✅ | Explanation |
| :--- | :--- | :--- |
| `#FEF7FF`, `#1D1B20`, `rgba(0,0,0,0.5)` | `bg-surface`, `text-text-default`, `var(--sds-color-background-default-default)` | Hardcoded colors break theme switching and dark mode |
| `bg-[#121212]`, `text-[#e0e0e0]` | `bg-surface-secondary`, `text-text-default` | Arbitrary Tailwind brackets defeat design token consistency |
| `p-[14px]`, `gap-[7px]`, `margin: 13px` | `p-sds-300` (12px), `p-sds-400` (16px), `var(--sds-size-space-200)` | All spacing must align with the SDS 4px/8px scale |
| `rounded-[6px]`, `rounded-[10px]` | `rounded-sds-100` (4px), `rounded-sds-200` (8px), `rounded-sds-400` (16px) | Radii must adhere to standardized token curves |
| Direct primitive use in components (`var(--sds-color-gray-900)`) | Semantic tokens (`text-text-default`, `var(--sds-color-text-default-default)`) | Primitives do not switch between light and dark modes |

---

## 2. Token Hierarchy

When building or styling components, resolve tokens from the correct tier:

```
Tier 1: Primitives (src/tokens/primitives/)
  └── Palettes (gray-100..1000, brand-100..1000, etc.)
  └── Raw sizing (space-100, radius-200, scale-03)
      │
      ▼
Tier 2: Semantics (src/tokens/semantics/)  <--- ALWAYS USE IN COMPONENTS
  └── Backgrounds: --sds-color-background-[surface|brand|danger|positive|neutral]-*
  └── Text: --sds-color-text-[default|secondary|tertiary|brand|danger|positive]-*
  └── Borders: --sds-color-border-[default|secondary|brand|danger|positive]-*
  └── Sizing & Radius: --sds-size-space-*, --sds-size-radius-*
      │
      ▼
Tier 3: Consumables (Tailwind v4 @theme & TS exports)
  └── Tailwind classes: bg-surface, text-text-default, p-sds-200, rounded-sds-full
  └── TypeScript constants: import { sdsTokens } from './tokens'
```

---

## 3. Implementation Patterns

### Pattern A: Tailwind CSS v4 Utility Classes (Preferred)
```tsx
// ✅ Correct: Using mapped semantic utilities
export const Card = ({ title, description }: CardProps) => (
  <div className="bg-surface text-text-default border border-border-default rounded-sds-200 p-sds-400 shadow-sds-100">
    <h3 className="text-base font-semibold text-text-default">{title}</h3>
    <p className="text-sm text-text-secondary mt-sds-100">{description}</p>
  </div>
);
```

### Pattern B: CSS Modules / Dedicated Stylesheets
```css
/* ✅ Correct: Using semantic CSS custom properties */
.custom-card {
  background-color: var(--sds-color-background-default-default);
  color: var(--sds-color-text-default-default);
  border: var(--sds-size-stroke-border) solid var(--sds-color-border-default-default);
  border-radius: var(--sds-size-radius-200);
  padding: var(--sds-size-space-400);
  box-shadow: var(--sds-effects-shadows-drop-shadow-100);
}
```

### Pattern C: Dynamic JS / Canvas / SVG Props
```tsx
import { sdsTokens } from './tokens';

// ✅ Correct: Type-safe token reference
export const StatusIndicator = ({ status }: { status: 'positive' | 'danger' }) => (
  <circle
    r="6"
    fill={status === 'positive' ? sdsTokens.color.background.positive.default : sdsTokens.color.background.danger.default}
  />
);
```

---

## 4. Theming & Dark Mode Contract

1. **Dual Mode Compatibility**: Every component must look intentional and maintain WCAG 2.1 AA contrast ($\ge 4.5:1$ for normal text, $\ge 3:1$ for UI components) in both Light mode and Dark mode.
2. **Never Assume White / Black**: Never hardcode `#fff` for "cards" or `#000` for "text". Always use `bg-surface` and `text-text-default`, which automatically flip under dark mode.
3. **Interactive & Hover States**: Use semantic hover states (e.g. `hover:bg-surface-secondary` or `hover:bg-brand-hover`).

---

## 5. Storybook & Verification Requirements

1. **Storybook Pairing**: Every new component must have a corresponding `.stories.tsx` file.
2. **Dark Mode Inspection**: Verify component rendering by toggling dark mode in Storybook.
3. **Build & Test Gate**: Verify changes with `npm run build` and `npm run test` before committing.
