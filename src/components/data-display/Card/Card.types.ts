import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'stroke' | 'default';
export type CardDirection = 'horizontal' | 'vertical';
export type CardAssetType = 'icon' | 'image';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card title (Figma `Heading`). */
  heading?: ReactNode;
  /** Supporting text under the heading (Figma `Body`). */
  body?: ReactNode;
  /** `stroke` adds a surface fill, border, radius and padding; `default` is unframed. */
  variant?: CardVariant;
  /** `horizontal` places the asset beside the content; `vertical` stacks it above. */
  direction?: CardDirection;
  /** Whether the asset is a 32px icon or a 160px image (Figma `Asset Type`). */
  assetType?: CardAssetType;
  /** Show the asset (Figma `Asset`). Images are always shown. */
  asset?: boolean;
  /** Custom icon for `assetType="icon"`. Defaults to an info icon. Hidden from assistive tech. */
  icon?: ReactNode;
  /** Image source for `assetType="image"`. A neutral placeholder is shown when omitted. */
  imageSrc?: string;
  /** Alt text for `imageSrc`. Leave empty when the image is decorative. */
  imageAlt?: string;
  /** Actions below the text (Figma `Button`), typically a `Button`. */
  actions?: ReactNode;
  /** Replaces the heading, body and actions with custom content (Figma slot). */
  children?: ReactNode;
  className?: string;
}
