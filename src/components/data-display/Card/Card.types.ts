import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'stroke';
export type CardDirection = 'horizontal' | 'vertical';
export type CardAssetType = 'icon' | 'image';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card visual style.
   * - `default`: Minimalist card without border or background container.
   * - `stroke`: Outlined card with background surface (`bg-surface`), border (`border-border-default`), and padding (`p-sds-600`).
   * @default 'default'
   */
  variant?: CardVariant;

  /**
   * Content flow direction.
   * - `horizontal`: Asset and content laid out side-by-side (`flex-row flex-wrap`).
   * - `vertical`: Asset stacked above content (`flex-col`).
   * @default 'horizontal'
   */
  direction?: CardDirection;

  /**
   * The type of default asset shown when no custom `asset` is provided.
   * - `icon`: 32px SVG icon (`size-sds-800`).
   * - `image`: 160px image container (`size-sds-4000`).
   * @default 'icon'
   */
  assetType?: CardAssetType;

  /**
   * Controls visibility of the asset slot (Figma `Asset`).
   * @default true
   */
  hasAsset?: boolean;

  /**
   * Custom asset element to render (e.g. custom icon or illustration).
   * Replaces the default icon/image placeholder when `hasAsset` is true.
   */
  asset?: ReactNode;

  /**
   * Image URL when using `assetType="image"`.
   * When provided, an `<img>` tag is rendered inside the 160x160 image slot.
   */
  imageSrc?: string;

  /**
   * Image alt text when using `imageSrc`.
   * @default ''
   */
  imageAlt?: string;

  /**
   * Card heading text or custom node (Figma `Heading`).
   */
  heading?: ReactNode;

  /**
   * Card body text or custom node (Figma `Body`).
   */
  body?: ReactNode;

  /**
   * Controls visibility of the action / button slot (Figma `Button`).
   * @default true
   */
  hasAction?: boolean;

  /**
   * Action element(s) rendered at the bottom of the card body (Figma `Button Group`).
   * Defaults to a neutral SDS Button when `hasAction` is true and no action is supplied.
   */
  action?: ReactNode;

  /**
   * Additional or custom content rendered inside the card body.
   */
  children?: ReactNode;

  className?: string;
}
