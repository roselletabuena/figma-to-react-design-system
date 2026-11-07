import type { HTMLAttributes } from 'react';

export type AvatarShape = 'circle' | 'square';
export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /**
   * Image URL. When provided the avatar renders the image (Figma `Type=Image`),
   * otherwise it falls back to `initials` (Figma `Type=Initial`).
   */
  src?: string;
  /**
   * Accessible name. For images it is the `<img>` alt text; for initials it labels the
   * avatar as `role="img"`. Leave empty when the avatar is decorative (e.g. beside a name).
   */
  alt?: string;
  /**
   * Initials shown when no `src` is given. Use a single character (e.g. `A`): the avatar
   * is fixed-size and clips overflow, so longer values (e.g. `AA`) will be cut off.
   */
  initials?: string;
  /** Avatar outline. Square corners scale with size (4px small, 8px medium/large). */
  shape?: AvatarShape;
  /** `sm` = 24px, `md` = 32px, `lg` = 40px. */
  size?: AvatarSize;
  className?: string;
}
