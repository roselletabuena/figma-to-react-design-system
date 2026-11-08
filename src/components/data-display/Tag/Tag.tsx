import type { TagProps, TagScheme, TagVariant } from './Tag.types';

// Colour classes per scheme and variant (Figma Scheme x Variant x State). Hover is a CSS
// `:hover` rule instead of a prop, so the Figma "Hover" state is covered for free.
const colorClasses: Record<TagScheme, Record<TagVariant, string>> = {
  brand: {
    primary:
      'bg-(--sds-color-background-brand-default) text-(--sds-color-text-brand-on-brand) hover:bg-(--sds-color-background-brand-hover)',
    secondary:
      'bg-(--sds-color-background-brand-tertiary) text-(--sds-color-text-brand-on-brand-tertiary) hover:bg-(--sds-color-background-brand-tertiary-hover)',
  },
  neutral: {
    primary:
      'bg-(--sds-color-background-default-tertiary) text-(--sds-color-text-default-default) hover:bg-(--sds-color-background-default-tertiary-hover)',
    secondary:
      'bg-(--sds-color-background-default-secondary) text-(--sds-color-text-default-default) hover:bg-(--sds-color-background-default-secondary-hover)',
  },
  positive: {
    primary:
      'bg-(--sds-color-background-positive-default) text-(--sds-color-text-positive-on-positive) hover:bg-(--sds-color-background-positive-hover)',
    secondary:
      'bg-(--sds-color-background-positive-secondary) text-(--sds-color-text-positive-on-positive-secondary) hover:bg-(--sds-color-background-positive-secondary-hover)',
  },
  danger: {
    primary:
      'bg-(--sds-color-background-danger-default) text-(--sds-color-text-danger-on-danger) hover:bg-(--sds-color-background-danger-hover)',
    secondary:
      'bg-(--sds-color-background-danger-secondary) text-(--sds-color-text-danger-on-danger-secondary) hover:bg-(--sds-color-background-danger-secondary-hover)',
  },
  warning: {
    primary:
      'bg-(--sds-color-background-warning-default) text-(--sds-color-text-warning-on-warning) hover:bg-(--sds-color-background-warning-hover)',
    secondary:
      'bg-(--sds-color-background-warning-secondary) text-(--sds-color-text-warning-on-warning-secondary) hover:bg-(--sds-color-background-warning-secondary-hover)',
  },
};

const baseClasses =
  'inline-flex items-center justify-center gap-sds-200 p-sds-200 rounded-sds-200 whitespace-nowrap font-single-line-base transition-colors';

const removeClasses =
  'inline-flex size-sds-400 shrink-0 cursor-pointer items-center justify-center rounded-sds-100 border-0 bg-transparent p-0 text-current focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current';

/**
 * Tag component adhering to the Simple Design System (SDS).
 *
 * A compact label (chip) with an optional remove button.
 */
export const Tag = ({
  children,
  variant = 'primary',
  scheme = 'brand',
  removable = true,
  onRemove,
  removeLabel = 'Remove',
  className = '',
  ...props
}: TagProps) => {
  const classes = [baseClasses, colorClasses[scheme][variant], className].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {children}
      {removable ? (
        <button type="button" className={removeClasses} aria-label={removeLabel} onClick={onRemove}>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-full"
          >
            <path d="M12 4L8 8M8 8L4 12M8 8L4 4M8 8L12 12" />
          </svg>
        </button>
      ) : null}
    </span>
  );
};

Tag.displayName = 'Tag';
