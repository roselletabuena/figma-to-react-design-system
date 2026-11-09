import { forwardRef } from 'react';
import type {
  CalendarButtonProps,
  CalendarButtonSize,
  CalendarButtonVariant,
} from './CalendarButton.types';

const baseClasses = [
  'inline-flex shrink-0 items-center justify-center select-none',
  'rounded-sds-200 transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand',
].join(' ');

const sizeClasses: Record<CalendarButtonSize, string> = {
  md: 'size-sds-icon-large font-body-base',
  sm: 'size-sds-icon-medium font-body-small',
};

const variantClasses: Record<CalendarButtonVariant, string> = {
  default:
    'bg-transparent text-text-default cursor-pointer enabled:hover:bg-surface enabled:hover:ring-1 enabled:hover:ring-inset enabled:hover:ring-border-default enabled:hover:text-text-default',
  hover: 'bg-surface text-text-default ring-1 ring-inset ring-border-default cursor-pointer',
  active: 'bg-brand text-text-brand-on-brand cursor-pointer enabled:hover:bg-brand-hover',
  range:
    'bg-surface-secondary text-text-default cursor-pointer enabled:hover:bg-surface-secondary-hover',
  disabled: 'bg-transparent text-text-disabled cursor-not-allowed',
  'range-disabled': 'bg-transparent text-text-disabled cursor-not-allowed',
  hidden: 'invisible pointer-events-none',
};

/**
 * CalendarButton primitive component adhering to the Simple Design System (SDS).
 *
 * Implements the Figma Calendar Button specification with support for all states:
 * Default, Hover, Active (selected), Range, Disabled, Range Disabled, and Hidden.
 */
export const CalendarButton = forwardRef<HTMLButtonElement, CalendarButtonProps>(
  (
    {
      children,
      variant,
      state,
      size = 'md',
      type = 'button',
      disabled,
      className = '',
      ...props
    },
    ref,
  ) => {
    const resolvedVariant: CalendarButtonVariant = state ?? variant ?? 'default';
    const isHidden = resolvedVariant === 'hidden';
    const isDisabled =
      disabled || resolvedVariant === 'disabled' || resolvedVariant === 'range-disabled';

    const classes = [
      baseClasses,
      sizeClasses[size],
      variantClasses[resolvedVariant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled || isHidden}
        aria-hidden={isHidden ? true : props['aria-hidden']}
        tabIndex={isHidden ? -1 : props.tabIndex}
        className={classes}
        {...props}
      >
        {isHidden ? null : children}
      </button>
    );
  },
);

CalendarButton.displayName = 'CalendarButton';
