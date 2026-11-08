import { forwardRef } from 'react';
import type { IconButtonProps, IconButtonSize, IconButtonVariant } from './IconButton.types';

// The Figma stroke is drawn inside the frame (a Medium button is 12 + 20 + 12 = 44px square),
// so it is an inset ring rather than a border, which would add 2px to the box.
const baseClasses = [
  'inline-flex shrink-0 cursor-pointer items-center justify-center overflow-clip',
  'rounded-sds-full ring-1 ring-inset transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand',
  // Disabled looks identical for every variant (Figma State=Disabled).
  'disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-icon-disabled disabled:ring-border-disabled',
].join(' ');

// The button is padding + the 20px icon slot, so it sizes itself: 8 + 20 + 8 and 12 + 20 + 12.
const sizeClasses: Record<IconButtonSize, string> = {
  sm: 'p-sds-200',
  md: 'p-sds-300',
};

// Figma fixes Subtle / Medium at a 40px square (the other Medium variants are 44px), so it gets
// an explicit size. The 20px icon is centred and overflows the 12px padding evenly.
const subtleMediumClasses = 'size-sds-icon-large';

// Hover is gated on `enabled:` so a disabled button never picks up hover styles.
const variantClasses: Record<IconButtonVariant, string> = {
  primary: 'bg-brand text-icon-brand-on-brand ring-border-brand enabled:hover:bg-brand-hover',
  neutral:
    'bg-surface-secondary text-icon-default ring-border-default enabled:hover:bg-surface-secondary-hover',
  subtle: 'bg-transparent text-icon-default ring-transparent enabled:hover:bg-surface-hover',
};

// The Figma icon frame is 20px. SDS has no 20px size token (icon tokens start at 24px), so this
// uses the 20px step of Tailwind's default spacing scale. `*:size-full` stretches a direct <svg>
// child to fill the slot.
const iconClasses = 'inline-flex size-5 shrink-0 items-center justify-center *:size-full';

/**
 * IconButton component adhering to the Simple Design System (SDS).
 *
 * A round, icon-only button. Hover and disabled states come from CSS (`:hover`) and the native
 * `disabled` attribute. An `aria-label` is required because there is no visible text.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { icon, variant = 'primary', size = 'md', type = 'button', className = '', ...props },
    ref,
  ) => {
    const classes = [
      baseClasses,
      sizeClasses[size],
      variant === 'subtle' && size === 'md' ? subtleMediumClasses : '',
      variantClasses[variant],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button ref={ref} type={type} className={classes} {...props}>
        <span aria-hidden="true" className={iconClasses}>
          {icon}
        </span>
      </button>
    );
  },
);

IconButton.displayName = 'IconButton';
