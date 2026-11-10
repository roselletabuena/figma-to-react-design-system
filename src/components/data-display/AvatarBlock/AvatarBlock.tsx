import type { AvatarBlockProps, AvatarBlockSize } from './AvatarBlock.types';
import { Avatar } from '../Avatar';

interface SizeLayout {
  gap: string;
  avatarSize: 'sm' | 'md' | 'lg';
  titleClass: string;
  descriptionClass: string;
}

const sizeConfig: Record<AvatarBlockSize, SizeLayout> = {
  sm: {
    gap: 'gap-sds-200',
    avatarSize: 'sm',
    titleClass: 'font-body-small-strong',
    descriptionClass: 'font-body-small',
  },
  md: {
    gap: 'gap-sds-300',
    avatarSize: 'md',
    titleClass: 'font-body-strong',
    descriptionClass: 'font-body-base',
  },
  lg: {
    gap: 'gap-sds-300',
    avatarSize: 'lg',
    titleClass: 'font-body-strong',
    descriptionClass: 'font-body-base',
  },
};

/**
 * AvatarBlock component adhering to the Simple Design System (SDS).
 *
 * Pairs an `Avatar` with a title and optional description in auto-layout.
 */
export const AvatarBlock = ({
  title,
  description,
  avatar,
  src,
  alt,
  initials,
  shape = 'circle',
  size = 'lg',
  className = '',
  ...props
}: AvatarBlockProps) => {
  const config = sizeConfig[size] ?? sizeConfig.lg;

  const renderAvatar = () => {
    if (avatar !== undefined) {
      return avatar;
    }
    return (
      <Avatar
        src={src}
        alt={alt ?? ''}
        initials={initials}
        shape={shape}
        size={config.avatarSize}
        aria-hidden={!alt && !src ? true : undefined}
      />
    );
  };

  const classes = ['flex items-start', config.gap, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <div className="shrink-0 leading-none">{renderAvatar()}</div>
      <div className="flex flex-col gap-sds-050 min-w-0">
        <div className={`${config.titleClass} text-text-default`}>{title}</div>
        {description && (
          <div className={`${config.descriptionClass} text-text-secondary`}>{description}</div>
        )}
      </div>
    </div>
  );
};

AvatarBlock.displayName = 'AvatarBlock';
