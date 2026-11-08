import type { ButtonDangerProps, ButtonDangerSize, ButtonDangerVariant } from './ButtonDanger.types';

// Figma has no border on the Subtle default state and a 1px inside stroke elsewhere, with a fixed
// 40px / 32px height. An inset ring reproduces that without shifting the layout between states.
const base =
  'inline-flex shrink-0 cursor-pointer items-center justify-center gap-sds-200 overflow-clip whitespace-nowrap rounded-sds-200 font-single-line-base ring-1 ring-inset transition-colors ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand ' +
  'disabled:cursor-not-allowed disabled:bg-disabled disabled:text-text-disabled disabled:ring-border-disabled';

const variantClasses: Record<ButtonDangerVariant, string> = {
  primary:
    'bg-danger text-text-on-danger ring-border-danger-secondary enabled:hover:bg-danger-hover enabled:hover:ring-border-danger',
  subtle:
    'bg-transparent text-text-danger ring-transparent enabled:hover:bg-danger-tertiary-hover enabled:hover:ring-border-danger',
};

const sizeClasses: Record<ButtonDangerSize, string> = {
  sm: 'p-sds-200',
  md: 'p-sds-300',
};

const iconSlot = 'inline-flex size-sds-400 shrink-0 [&>svg]:size-full';

/**
 * ButtonDanger component adhering to the Simple Design System (SDS).
 *
 * A destructive-action button (Figma "Button Danger"). Hover is a CSS state and Disabled is the
 * native `disabled` attribute, so both behave correctly for keyboard and assistive tech users.
 */
export const ButtonDanger = ({
  children,
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  type = 'button',
  className = '',
  ...props
}: ButtonDangerProps) => {
  const classes = [base, variantClasses[variant], sizeClasses[size], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} className={classes} {...props}>
      {iconStart ? (
        <span className={iconSlot} aria-hidden="true">
          {iconStart}
        </span>
      ) : null}
      {children}
      {iconEnd ? (
        <span className={iconSlot} aria-hidden="true">
          {iconEnd}
        </span>
      ) : null}
    </button>
  );
};

ButtonDanger.displayName = 'ButtonDanger';
