import type { HTMLAttributes, ReactNode } from 'react';
import type { AvatarSize } from '../Avatar/Avatar.types';

export type AvatarGroupSpacing = 'overlap' | 'spaced';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /**
   * Spacing between avatars in the group.
   * - `overlap`: Avatars overlap with negative margin (-8px) and a subtle drop shadow (Figma `Spacing=Overlap`).
   * - `spaced`: Avatars have positive spacing (4px) with no drop shadow (Figma `Spacing=Spaced`).
   * @default 'overlap'
   */
  spacing?: AvatarGroupSpacing;
  /**
   * Optional size to apply to child Avatars that do not have an explicit size set.
   * @default 'lg'
   */
  size?: AvatarSize;
  /**
   * Whether to display the overflow indicator (Figma `Show Overflow`).
   * @default true
   */
  showOverflow?: boolean;
  /**
   * Number or text shown in the overflow indicator (Figma `Number`).
   * @default '+1'
   */
  number?: string;
  /**
   * Custom overflow element or content. Overrides `number` if provided.
   */
  overflow?: ReactNode;
  className?: string;
}
