import { Children, cloneElement, Fragment, isValidElement, type ReactNode } from 'react';
import type { AvatarSize } from '../Avatar/Avatar.types';
import type { AvatarGroupProps, AvatarGroupSpacing } from './AvatarGroup.types';

const parentGapClasses: Record<AvatarGroupSpacing, Record<AvatarSize, string>> = {
  overlap: {
    sm: 'gap-sds-100',
    md: 'gap-sds-150',
    lg: 'gap-sds-200',
  },
  spaced: {
    sm: 'gap-sds-100',
    md: 'gap-sds-100',
    lg: 'gap-sds-100',
  },
};

const avatarsWrapperClasses: Record<AvatarGroupSpacing, Record<AvatarSize, string>> = {
  overlap: {
    sm: 'flex items-center -space-x-sds-100 *:shadow-sds-200',
    md: 'flex items-center -space-x-sds-150 *:shadow-sds-200',
    lg: 'flex items-center -space-x-sds-200 *:shadow-sds-200',
  },
  spaced: {
    sm: 'flex items-center gap-sds-100',
    md: 'flex items-center gap-sds-100',
    lg: 'flex items-center gap-sds-100',
  },
};

const overflowSizeClasses: Record<AvatarSize, string> = {
  sm: 'min-w-sds-600 px-sds-050 py-sds-050 text-xs',
  md: 'min-w-sds-600 px-sds-100 py-sds-050 font-body-small',
  lg: 'min-w-sds-600 px-sds-100 py-sds-100 font-body-small',
};

/**
 * AvatarGroup component adhering to the Simple Design System (SDS).
 *
 * Renders a collection of avatars with either overlapping or spaced layout,
 * and an optional overflow count indicator.
 */
export const AvatarGroup = ({
  children,
  spacing = 'overlap',
  size = 'lg',
  showOverflow = true,
  number = '+1',
  overflow,
  className = '',
  ...props
}: AvatarGroupProps) => {
  const hasOverflow = showOverflow && Boolean(overflow ?? number);
  const overflowContent = overflow ?? number;
  const overflowLabel =
    typeof overflowContent === 'string' ? `${overflowContent} more` : undefined;

  const cloneChild = (child: ReactNode): ReactNode => {
    if (isValidElement(child)) {
      if (child.type === Fragment) {
        const fragmentProps = child.props as { children?: ReactNode };
        return (
          <Fragment key={child.key}>
            {Children.map(fragmentProps.children, cloneChild)}
          </Fragment>
        );
      }
      const childProps = child.props as Record<string, unknown>;
      if (size && childProps.size === undefined) {
        return cloneElement(child, { size } as Record<string, unknown>);
      }
    }
    return child;
  };

  const clonedChildren = Children.map(children, cloneChild);

  const classes = [
    'inline-flex items-center',
    parentGapClasses[spacing][size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const overflowClasses = [
    'inline-flex shrink-0 items-center justify-center rounded-sds-200 bg-surface-secondary text-text-default text-center select-none',
    overflowSizeClasses[size],
  ].join(' ');

  return (
    <div role="group" className={classes} {...props}>
      <div className={avatarsWrapperClasses[spacing][size]}>{clonedChildren}</div>
      {hasOverflow && (
        <span className={overflowClasses} aria-label={overflowLabel}>
          {overflowContent}
        </span>
      )}
    </div>
  );
};

AvatarGroup.displayName = 'AvatarGroup';
