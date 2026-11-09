import { forwardRef } from 'react';
import type { TabProps } from './Tab.types';

// Figma: 12px / 4px padding, 4px top radius, 1px bottom border, Body Base type.
// Hover (Figma State=Hover) is a CSS :hover that fills the tab; it is not a prop.
const baseClasses = [
  'inline-flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap',
  'px-sds-300 py-sds-100 rounded-t-sds-100 border-b bg-transparent font-body-base transition-colors',
  'hover:bg-surface-hover',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand',
].join(' ');

// The semantic neutral border/tertiary-text tokens have no Tailwind alias, so reference the
// semantic CSS variables directly.
const activeClasses = 'border-b-[var(--sds-color-border-neutral-default)] text-text-neutral';
const inactiveClasses =
  'border-b-[var(--sds-color-border-neutral-tertiary)] text-[color:var(--sds-color-text-neutral-tertiary)]';

/**
 * Tab component adhering to the Simple Design System (SDS).
 *
 * A single tab; compose several inside a `role="tablist"` container.
 */
export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ children = 'Label', active = false, type = 'button', className = '', ...props }, ref) => {
    const classes = [baseClasses, active ? activeClasses : inactiveClasses, className]
      .filter(Boolean)
      .join(' ');
    return (
      <button
        ref={ref}
        type={type}
        role="tab"
        aria-selected={active}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Tab.displayName = 'Tab';
