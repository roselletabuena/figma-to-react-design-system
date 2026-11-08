import { forwardRef } from 'react';
import type { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

// The Figma stroke is drawn inside the frame (a Medium button is 12 + 16 + 12 = 40px tall),
// so it is an inset ring rather than a border, which would add 2px to the box.
const baseClasses = [
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-sds-200 whitespace-nowrap',
  'rounded-sds-200 ring-1 ring-inset font-single-line-base transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand',
  // Disabled looks identical for every variant (Figma State=Disabled).
  'disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-text-disabled disabled:ring-border-disabled',
].join(' ');

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'p-sds-200',
  md: 'p-sds-300',
};

// Hover is gated on `enabled:` so a disabled button never picks up hover styles.
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-text-brand-on-brand ring-border-brand enabled:hover:bg-brand-hover',
  neutral:
    'bg-neutral-tertiary text-text-default ring-border-neutral-secondary enabled:hover:bg-neutral-tertiary-hover',
  subtle: 'bg-transparent text-text-default ring-transparent enabled:hover:ring-border-default',
};

// `*:size-full` stretches a direct <svg> child to fill the 16px slot.
const iconClasses = 'inline-flex size-sds-400 shrink-0 items-center justify-center *:size-full';

/**
 * Button component adhering to the Simple Design System (SDS).
 *
 * Hover and disabled states come from CSS (`:hover`) and the native `disabled` attribute.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      iconStart,
      iconEnd,
      type = 'button',
      className = '',
      ...props
    },
    ref,
  ) => {
    const classes = [baseClasses, sizeClasses[size], variantClasses[variant], className]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        {iconStart ? (
          <span aria-hidden="true" className={iconClasses}>
            {iconStart}
          </span>
        ) : null}
        {children}
        {iconEnd ? (
          <span aria-hidden="true" className={iconClasses}>
            {iconEnd}
          </span>
        ) : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
