import type { HTMLAttributes, ReactNode } from 'react';
import type { AvatarShape, AvatarSize } from '../Avatar';

export type AvatarBlockSize = AvatarSize;
export type AvatarBlockShape = AvatarShape;

export interface AvatarBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Primary title or name (Figma `Title`).
   */
  title: ReactNode;

  /**
   * Secondary description or subtitle (Figma `Description`), e.g. role, email, or status.
   */
  description?: ReactNode;

  /**
   * Custom avatar slot. When provided, this element is rendered in place of the default `Avatar`.
   */
  avatar?: ReactNode;

  /**
   * Image URL for the default avatar.
   */
  src?: string;

  /**
   * Accessible alt text for the default avatar.
   * If omitted and `src` is provided, it defaults to decorative (`alt=""`).
   */
  alt?: string;

  /**
   * Initials for the default avatar (e.g. "F") when no `src` is provided.
   */
  initials?: string;

  /**
   * Avatar shape. Defaults to `'circle'`.
   */
  shape?: AvatarBlockShape;

  /**
   * Size of the avatar block.
   * - `'sm'`: 24px avatar, small typography, 8px gap
   * - `'md'`: 32px avatar, base typography, 12px gap
   * - `'lg'`: 40px avatar, base typography, 12px gap (default, matches Figma)
   */
  size?: AvatarBlockSize;

  className?: string;
}
