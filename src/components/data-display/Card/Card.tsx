import { forwardRef } from 'react';
import type { CardProps, CardVariant, CardDirection } from './Card.types';

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-transparent text-text-default',
  stroke: 'bg-surface text-text-default border border-border-default rounded-sds-200 p-sds-600',
};

const directionClasses: Record<CardDirection, string> = {
  horizontal: 'flex flex-row flex-wrap items-start gap-sds-600',
  vertical: 'flex flex-col items-start gap-sds-600',
};

const contentDirectionClasses: Record<CardDirection, string> = {
  horizontal: 'flex min-w-[200px] flex-1 flex-col gap-sds-400',
  vertical: 'flex w-full flex-col gap-sds-400',
};

/**
 * Default Info icon matching Figma's Info component (32x32).
 */
export const CardInfoIcon = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-full"
    aria-hidden="true"
  >
    <circle cx="16" cy="16" r="13" />
    <line x1="16" y1="15" x2="16" y2="22" strokeWidth={2.5} />
    <circle cx="16" cy="10" r="1.25" fill="currentColor" stroke="none" />
  </svg>
);

/**
 * Default Image placeholder icon matching Figma's Image frame (160x160).
 */
export const CardImageIcon = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-sds-icon-large text-icon-secondary"
    aria-hidden="true"
  >
    <rect x="4" y="6" width="32" height="28" rx="4" />
    <circle cx="13" cy="15" r="3" />
    <path d="M36 26l-9-9-15 15" />
    <path d="M25 25l4-4 7 7" />
  </svg>
);

/**
 * Card component adhering to the Simple Design System (SDS).
 *
 * Implements Figma node 2142:11380 with variants (default, stroke),
 * layout directions (horizontal, vertical), and asset types (icon, image).
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      direction = 'horizontal',
      assetType = 'icon',
      showAsset = true,
      asset,
      heading,
      headingLevel = 'h3',
      body,
      showActions = true,
      actions,
      children,
      className = '',
      ...props
    },
    ref,
  ) => {
    const classes = [
      'w-full box-border transition-colors text-left',
      variantClasses[variant],
      directionClasses[direction],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const HeadingTag = headingLevel;

    // Render default asset placeholder when `asset` is not provided
    const renderedAsset =
      asset ??
      (assetType === 'icon' ? <CardInfoIcon /> : <CardImageIcon />);

    const assetWrapperClasses =
      assetType === 'icon'
        ? 'size-sds-icon-medium shrink-0 text-icon-default inline-flex items-center justify-center'
        : 'size-sds-4000 shrink-0 rounded-sds-200 bg-neutral-tertiary flex items-center justify-center overflow-hidden';

    const hasContent = heading != null || body != null || actions != null || children != null;

    return (
      <div ref={ref} className={classes} {...props}>
        {showAsset ? (
          <div className={assetWrapperClasses}>{renderedAsset}</div>
        ) : null}

        {hasContent ? (
          <div className={contentDirectionClasses[direction]}>
            {heading != null || body != null ? (
              <div className="flex flex-col gap-sds-200">
                {heading != null ? (
                  typeof heading === 'string' ? (
                    <HeadingTag className="font-heading text-text-default m-0">
                      {heading}
                    </HeadingTag>
                  ) : (
                    heading
                  )
                ) : null}
                {body != null ? (
                  typeof body === 'string' ? (
                    <p className="font-body-base text-text-secondary m-0">
                      {body}
                    </p>
                  ) : (
                    body
                  )
                ) : null}
              </div>
            ) : null}

            {children}

            {showActions && actions != null ? (
              <div className="flex items-center gap-sds-400">{actions}</div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  },
);

Card.displayName = 'Card';
