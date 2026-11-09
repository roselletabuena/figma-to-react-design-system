import type { HTMLAttributes, ReactNode } from 'react';
import type { AvatarShape, AvatarSize } from '../Avatar';

export type AvatarBlockShape = AvatarShape;
export type AvatarBlockSize = AvatarSize;

export interface AvatarBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Primary label (Figma `Title`). Styled in strong body text.
   * If omitted, falls back to `children`.
   */
  title?: ReactNode;
  /**
   * Secondary supporting text (Figma `Description`). Styled in secondary body text.
   */
  description?: ReactNode;
  /**
   * Children content. If `title` is not provided, `children` is treated as the title.
   * If `title` is provided and `description` is not, `children` is treated as description.
   */
  children?: ReactNode;
  /**
   * Image URL passed to the underlying `Avatar` component.
   */
  src?: string;
  /**
   * Accessible alt text for the avatar image, or accessible label when initials are used.
   * If not provided, defaults to empty (decorative).
   */
  alt?: string;
  /**
   * Initials shown when no `src` is provided (e.g. "F").
   */
  initials?: string;
  /**
   * Avatar outline shape: `circle` (default) or `square`.
   */
  shape?: AvatarBlockShape;
  /**
   * Size of the avatar and typography: `sm`, `md`, or `lg`. Defaults to `lg`.
   */
  size?: AvatarBlockSize;
  /**
   * Optional custom avatar element to replace the default `Avatar`.
   */
  avatar?: ReactNode;
  className?: string;
}
