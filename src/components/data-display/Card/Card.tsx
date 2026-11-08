import type { CardDirection, CardProps, CardVariant } from './Card.types';

const variantClasses: Record<CardVariant, string> = {
  stroke: 'bg-surface border border-border-default rounded-sds-200 p-sds-600',
  default: '',
};

const directionClasses: Record<CardDirection, string> = {
  horizontal: 'flex-wrap',
  vertical: 'flex-col',
};

const bodyDirectionClasses: Record<CardDirection, string> = {
  horizontal: 'flex-1',
  vertical: 'w-full',
};

const InfoIcon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full"
  >
    <circle cx="16" cy="16" r="13.333" />
    <path d="M16 21.333V16" />
    <path d="M16 10.667h.013" />
  </svg>
);

const ImagePlaceholder = () => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    stroke="currentColor"
    strokeWidth={6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full text-icon-tertiary opacity-20"
  >
    <rect x="30" y="30" width="100" height="100" rx="16" />
    <circle cx="103" cy="57" r="10" />
    <path d="M30 108l34-30 50 52" />
  </svg>
);

/**
 * Card component adhering to the Simple Design System (SDS).
 *
 * Width is set by the parent; content flows to fit. Pass `children` to replace the default
 * heading, body and actions.
 */
export const Card = ({
  heading = 'Title',
  body,
  variant = 'stroke',
  direction = 'horizontal',
  assetType = 'icon',
  asset = true,
  icon,
  imageSrc,
  imageAlt = '',
  actions,
  children,
  className = '',
  ...props
}: CardProps) => {
  const classes = [
    'flex items-start gap-sds-600 min-w-60 text-text-default',
    directionClasses[direction],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {assetType === 'icon' && asset && (
        <span aria-hidden="true" className="inline-flex size-sds-icon-medium shrink-0 text-icon-default">
          {icon ?? <InfoIcon />}
        </span>
      )}
      {assetType === 'image' && (
        <div className="relative size-40 min-w-40 shrink-0 overflow-hidden bg-neutral-tertiary">
          {imageSrc ? (
            <img src={imageSrc} alt={imageAlt} className="size-full object-cover" />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      )}
      <div className={`flex min-w-40 flex-col items-start gap-sds-400 ${bodyDirectionClasses[direction]}`}>
        {children ?? (
          <>
            <div className="flex w-full flex-col items-start gap-sds-200 break-words">
              <p className="font-heading w-full text-text-default">{heading}</p>
              {body && <p className="font-body-base w-full text-text-secondary">{body}</p>}
            </div>
            {actions && <div className="flex w-full items-center gap-sds-400">{actions}</div>}
          </>
        )}
      </div>
    </div>
  );
};

Card.displayName = 'Card';
