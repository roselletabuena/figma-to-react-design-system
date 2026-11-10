import { forwardRef } from 'react';
import type { CalendarButtonProps, CalendarButtonState } from './CalendarButton.types';

const baseClasses = [
  'inline-flex shrink-0 items-center justify-center',
  'size-sds-icon-large p-sds-400 rounded-sds-200',
  'font-body-base text-center select-none transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand',
].join(' ');

const stateClasses: Record<CalendarButtonState, string> = {
  default:
    'bg-transparent text-text-default cursor-pointer enabled:hover:bg-surface enabled:hover:ring-1 enabled:hover:ring-inset enabled:hover:ring-border-default',
  hover:
    'bg-surface text-text-default ring-1 ring-inset ring-border-default cursor-pointer',
  active:
    'bg-brand text-text-brand-on-brand cursor-pointer enabled:hover:bg-brand-hover',
  range:
    'bg-surface-secondary text-text-default cursor-pointer enabled:hover:bg-surface-secondary-hover',
  disabled:
    'bg-transparent text-text-disabled cursor-not-allowed',
  'range-disabled':
    'bg-transparent text-text-disabled cursor-not-allowed',
  hidden:
    'invisible pointer-events-none cursor-default select-none',
};

/**
 * CalendarButton primitive adhering to the Simple Design System (SDS).
 *
 * Represents an individual day button within a date picker or calendar grid.
 * Adheres strictly to SDS semantic tokens, supporting dual light/dark modes and
 * full accessibility keyboard and screen-reader standards.
 */
export const CalendarButton = forwardRef<HTMLButtonElement, CalendarButtonProps>(
  (
    {
      children,
      number,
      state: stateProp,
      variant: variantProp,
      type = 'button',
      disabled: disabledProp,
      className = '',
      ...props
    },
    ref,
  ) => {
    const resolvedState: CalendarButtonState = stateProp ?? variantProp ?? 'default';
    const isDisabled = disabledProp ?? (resolvedState === 'disabled' || resolvedState === 'range-disabled');
    const isHidden = resolvedState === 'hidden';

    const classes = [baseClasses, stateClasses[resolvedState], className]
      .filter(Boolean)
      .join(' ');

    const content = isHidden ? null : (children ?? (number !== undefined ? String(number) : ''));

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-hidden={isHidden ? true : undefined}
        tabIndex={isHidden ? -1 : undefined}
        aria-pressed={resolvedState === 'active' ? (props['aria-pressed'] ?? true) : props['aria-pressed']}
        className={classes}
        {...props}
      >
        {content}
      </button>
    );
  },
);

CalendarButton.displayName = 'CalendarButton';
