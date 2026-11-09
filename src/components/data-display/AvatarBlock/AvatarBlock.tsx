import type { AvatarBlockProps, AvatarBlockSize } from './AvatarBlock.types';
import { Avatar } from '../Avatar';

const sizeClasses: Record<AvatarBlockSize, { gap: string; title: string; description: string }> = {
  sm: {
    gap: 'gap-sds-200',
    title: 'font-body-small-strong',
    description: 'font-body-small',
  },
  md: {
    gap: 'gap-sds-300',
    title: 'font-body-strong',
    description: 'font-body-small',
  },
  lg: {
    gap: 'gap-sds-300',
    title: 'font-body-strong',
    description: 'font-body-base',
  },
};

/**
 * AvatarBlock component adhering to the Simple Design System (SDS).
 *
 * Displays an Avatar alongside a title and an optional description line.
 */
export const AvatarBlock = ({
  title,
  description,
  children,
  src,
  alt = '',
  initials,
  shape = 'circle',
  size = 'lg',
  avatar,
  className = '',
  ...props
}: AvatarBlockProps) => {
  const resolvedTitle = title ?? (description !== undefined ? undefined : children);
  const resolvedDescription = description ?? (title !== undefined ? children : undefined);
  const sizeConfig = sizeClasses[size];

  const renderedAvatar =
    avatar ?? (
      <Avatar
        src={src}
        alt={alt}
        initials={initials}
        shape={shape}
        size={size}
      />
    );

  return (
    <div
      className={`inline-flex items-center ${sizeConfig.gap} ${className}`.trim()}
      {...props}
    >
      {renderedAvatar}
      {(resolvedTitle || resolvedDescription) && (
        <div className="flex flex-col justify-center gap-sds-050 min-w-0">
          {resolvedTitle && (
            <span className={`${sizeConfig.title} text-text-default`}>
              {resolvedTitle}
            </span>
          )}
          {resolvedDescription && (
            <span className={`${sizeConfig.description} text-text-secondary`}>
              {resolvedDescription}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

AvatarBlock.displayName = 'AvatarBlock';
