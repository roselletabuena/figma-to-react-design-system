import type { HTMLAttributes, ReactNode } from 'react';
import type { AvatarSize } from '../Avatar/Avatar.types';

export type AvatarGroupSpacing = 'overlap' | 'spaced';
export type AvatarGroupSize = AvatarSize;

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** The avatars in the group. Usually `Avatar` components. */
  children?: ReactNode;
  /**
   * Spacing between avatars (Figma `Spacing`).
   * - `overlap`: Avatars overlap with a drop shadow (Figma `Spacing=Overlap`).
   * - `spaced`: Avatars are placed side-by-side with a 4px gap and no shadow (Figma `Spacing=Spaced`).
   * @default 'overlap'
   */
  spacing?: AvatarGroupSpacing;
  /**
   * Default avatar size passed down to child `Avatar`s that do not specify their own size (Figma `Size`).
   * - `sm` = 24px, `md` = 32px, `lg` = 40px.
   * @default 'lg'
   */
  size?: AvatarGroupSize;
  /**
   * Maximum number of visible avatars before truncating into an overflow badge.
   * When exceeded, only the first `max` avatars are rendered and the remainder is counted.
   */
  max?: number;
  /**
   * Custom content or count to display in the overflow badge (Figma `Number`).
   * E.g. `'+1'`, `'+99'`, or `'5'`.
   * Automatically computed when `max` is provided and exceeded.
   */
  overflow?: ReactNode;
  /**
   * Whether to display the overflow badge (Figma `Show Overflow`).
   * When false, the overflow badge is omitted even if `max` or `overflow` is set.
   * @default true
   */
  showOverflow?: boolean;
  className?: string;
}
