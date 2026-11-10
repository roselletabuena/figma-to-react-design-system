import { Button } from '../../actions/Button';
import { ButtonGroup } from '../../actions/ButtonGroup';
import type {
  CardAssetType,
  CardDirection,
  CardProps,
  CardVariant,
} from './Card.types';

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-transparent',
  stroke: 'bg-surface border border-border-default rounded-sds-200 p-sds-600',
};

const directionClasses: Record<CardDirection, string> = {
  horizontal: 'flex-row flex-wrap items-start gap-sds-600',
  vertical: 'flex-col items-start gap-sds-600',
};

/**
 * 32px Info icon from Figma Simple Design System (node 4039:11823).
 * Uses `currentColor` to adapt dynamically to the theme's icon/text color tokens.
 */
const InfoIcon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-sds-800 shrink-0 text-icon-default"
    aria-hidden="true"
  >
    <path d="M16.0001 21.3333V16M16.0001 10.6666H16.0134M29.3334 16C29.3334 23.3638 23.3639 29.3333 16.0001 29.3333C8.63628 29.3333 2.66675 23.3638 2.66675 16C2.66675 8.63616 8.63628 2.66663 16.0001 2.66663C23.3639 2.66663 29.3334 8.63616 29.3334 16Z" />
  </svg>
);

/**
 * Default asset renderer based on Figma Card asset specifications.
 */
const renderDefaultAsset = (
  assetType: CardAssetType,
  imageSrc?: string,
  imageAlt: string = '',
) => {
  if (assetType === 'icon') {
    return <InfoIcon />;
  }

  return (
    <div
      className="w-sds-4000 h-sds-4000 shrink-0 rounded-sds-200 overflow-hidden bg-surface-secondary flex items-center justify-center"
      data-testid="card-image-container"
    >
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt}
          className="size-full object-cover"
        />
      ) : (
        <div
          className="size-full bg-surface-secondary"
          role="img"
          aria-label={imageAlt || 'Image placeholder'}
        />
      )}
    </div>
  );
};

/**
 * Card component adhering to the Simple Design System (SDS).
 *
 * Implements the Figma Card component set (node 2142:11380), supporting
 * Default and Stroke variants, Horizontal and Vertical directions, and
 * Icon or Image assets with configurable headings, bodies, and actions.
 */
export const Card = ({
  variant = 'default',
  direction = 'horizontal',
  assetType = 'icon',
  hasAsset = true,
  asset,
  imageSrc,
  imageAlt = '',
  heading,
  body,
  hasAction = true,
  action,
  children,
  className = '',
  ...props
}: CardProps) => {
  const classes = [
    'flex w-full text-text-default transition-colors',
    variantClasses[variant],
    directionClasses[direction],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const resolvedAsset = hasAsset
    ? (asset ?? renderDefaultAsset(assetType, imageSrc, imageAlt))
    : null;

  const hasTextContent = Boolean(heading || body || children);

  return (
    <div className={classes} {...props}>
      {resolvedAsset}
      <div className="flex-1 min-w-[200px] flex flex-col gap-sds-400 w-full">
        {hasTextContent && (
          <div className="flex flex-col gap-sds-200 w-full">
            {heading &&
              (typeof heading === 'string' ? (
                <h3 className="font-heading text-text-default">{heading}</h3>
              ) : (
                heading
              ))}
            {body &&
              (typeof body === 'string' ? (
                <p className="font-body-base text-text-secondary">{body}</p>
              ) : (
                body
              ))}
            {children}
          </div>
        )}
        {hasAction && (
          <div className="w-full flex items-center">
            {action !== undefined ? (
              action
            ) : (
              <ButtonGroup align="start">
                <Button variant="neutral" size="md">
                  Button
                </Button>
              </ButtonGroup>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

Card.displayName = 'Card';
