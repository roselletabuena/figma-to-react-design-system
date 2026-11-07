import type { AvatarProps, AvatarShape, AvatarSize } from './Avatar.types';

const sizeClasses: Record<AvatarSize, string> = {
  sm: 'size-sds-icon-small font-body-small',
  md: 'size-sds-icon-medium font-body-base',
  lg: 'size-sds-icon-large font-subheading',
};

const shapeClasses: Record<AvatarShape, Record<AvatarSize, string>> = {
  circle: {
    sm: 'rounded-sds-full',
    md: 'rounded-sds-full',
    lg: 'rounded-sds-full',
  },
  square: {
    sm: 'rounded-sds-100',
    md: 'rounded-sds-200',
    lg: 'rounded-sds-200',
  },
};

/**
 * Avatar component adhering to the Simple Design System (SDS).
 *
 * Shows an image when `src` is provided, otherwise a single-character initial on a brand surface.
 */
export const Avatar = ({
  src,
  alt,
  initials,
  shape = 'circle',
  size = 'lg',
  className = '',
  ...props
}: AvatarProps) => {
  const hasImage = Boolean(src);
  // Initials are text, so label the avatar as an image only when the consumer names it.
  const labelProps = !hasImage && alt ? ({ role: 'img', 'aria-label': alt } as const) : {};

  const classes = [
    'relative inline-flex shrink-0 items-center justify-center overflow-hidden whitespace-nowrap',
    hasImage ? '' : 'bg-brand text-text-brand-on-brand',
    sizeClasses[size],
    shapeClasses[shape][size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...labelProps} {...props}>
      {hasImage ? <img src={src} alt={alt ?? ''} className="size-full object-cover" /> : initials}
    </span>
  );
};

Avatar.displayName = 'Avatar';
