import { forwardRef, Children, isValidElement, cloneElement } from 'react';
import type { AvatarProps } from '../Avatar/Avatar.types';
import type {
  AvatarGroupProps,
  AvatarGroupSize,
  AvatarGroupSpacing,
} from './AvatarGroup.types';

const groupGapClasses: Record<AvatarGroupSpacing, string> = {
  overlap: 'gap-sds-200',
  spaced: 'gap-sds-100',
};

const slotClasses: Record<AvatarGroupSpacing, Record<AvatarGroupSize, string>> = {
  overlap: {
    sm: '-space-x-sds-100 *:shadow-sds-200',
    md: '-space-x-sds-150 *:shadow-sds-200',
    lg: '-space-x-sds-200 *:shadow-sds-200',
  },
  spaced: {
    sm: 'gap-sds-100',
    md: 'gap-sds-100',
    lg: 'gap-sds-100',
  },
};

/**
 * AvatarGroup component adhering to the Simple Design System (SDS).
 *
 * Displays a group of avatars either overlapping with a drop shadow or spaced side-by-side,
 * with an optional overflow count indicator.
 */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      spacing = 'overlap',
      size = 'lg',
      max,
      overflow,
      showOverflow = true,
      className = '',
      ...props
    },
    ref,
  ) => {
    const rawChildren = Children.toArray(children);
    const hasMax = typeof max === 'number' && max >= 0 && max < rawChildren.length;
    const visibleChildren = hasMax ? rawChildren.slice(0, max) : rawChildren;
    const remainingCount = hasMax ? rawChildren.length - max : 0;

    const computedOverflow = overflow ?? (remainingCount > 0 ? `+${remainingCount}` : null);
    const renderOverflow = showOverflow && computedOverflow !== null && computedOverflow !== undefined;

    const renderedChildren = visibleChildren.map((child) => {
      if (isValidElement<AvatarProps>(child)) {
        return cloneElement(child, {
          size: child.props.size ?? size,
        });
      }
      return child;
    });

    const rootClasses = [
      'inline-flex items-center',
      groupGapClasses[spacing],
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const avatarsClasses = [
      'inline-flex items-center',
      slotClasses[spacing][size],
    ]
      .filter(Boolean)
      .join(' ');

    const overflowClasses =
      'inline-flex shrink-0 items-center justify-center rounded-sds-200 bg-surface-secondary px-sds-100 py-sds-050 font-body-small text-text-default min-w-sds-icon-small select-none whitespace-nowrap';

    return (
      <div ref={ref} role="group" className={rootClasses} {...props}>
        <div className={avatarsClasses}>{renderedChildren}</div>
        {renderOverflow && (
          <span
            className={overflowClasses}
            aria-label={typeof computedOverflow === 'string' ? computedOverflow : undefined}
          >
            {computedOverflow}
          </span>
        )}
      </div>
    );
  },
);

AvatarGroup.displayName = 'AvatarGroup';
