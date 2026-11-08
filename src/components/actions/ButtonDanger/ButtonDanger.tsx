import { forwardRef } from 'react';
import type { ButtonDangerProps, ButtonDangerSize, ButtonDangerVariant } from './ButtonDanger.types';

// The Figma stroke is drawn inside the frame (a Medium button is 12 + 16 + 12 = 40px tall),
// so it is an inset ring rather than a border, which would add 2px to the box.
const baseClasses = [
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-sds-200 whitespace-nowrap',
  'rounded-sds-200 ring-1 ring-inset font-single-line-base transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-danger',
  // Disabled looks identical for every variant (Figma State=Disabled).
  'disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-text-disabled disabled:ring-border-disabled',
].join(' ');

const sizeClasses: Record<ButtonDangerSize, string> = {
  sm: 'p-sds-200',
  md: 'p-sds-300',
};

// Hover is gated on `enabled:` so a disabled button never picks up hover styles.
const variantClasses: Record<ButtonDangerVariant, string> = {
  primary:
    'bg-danger text-text-danger-on-danger ring-border-danger-secondary enabled:hover:bg-danger-hover enabled:hover:ring-border-danger',
  subtle:
    'bg-transparent text-text-danger ring-transparent enabled:hover:bg-danger-tertiary-hover enabled:hover:ring-border-danger',
};

// `*:size-full` stretches a direct <svg> child to fill the 16px slot.
const iconClasses = 'inline-flex size-sds-400 shrink-0 items-center justify-center *:size-full';

/**
 * ButtonDanger component adhering to the Simple Design System (SDS).
 *
 * For destructive or negative actions. Hover and disabled states come from CSS (`:hover`)
 * and the native `disabled` attribute.
 */
export const ButtonDanger = forwardRef<HTMLButtonElement, ButtonDangerProps>(
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

ButtonDanger.displayName = 'ButtonDanger';
