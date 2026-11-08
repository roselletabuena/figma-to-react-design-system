import type { HTMLAttributes, ReactNode } from 'react';

export type CardVariant = 'default' | 'stroke';
export type CardDirection = 'horizontal' | 'vertical';
export type CardAssetType = 'icon' | 'image';
export type CardHeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Card visual style.
   * - `default`: uncontained layout without outer border or padding (Figma `Variant=Default`).
   * - `stroke`: contained card with border, background surface, and padding (Figma `Variant=Stroke`).
   * @default 'default'
   */
  variant?: CardVariant;
  /**
   * Direction of the card layout.
   * - `horizontal`: asset and content side-by-side (Figma `Direction=Horizontal`).
   * - `vertical`: asset stacked above content (Figma `Direction=Vertical`).
   * @default 'horizontal'
   */
  direction?: CardDirection;
  /**
   * Asset type to display.
   * - `icon`: 32x32 icon (Figma `Asset Type=Icon`).
   * - `image`: 160x160 image frame (Figma `Asset Type=Image`).
   * @default 'icon'
   */
  assetType?: CardAssetType;
  /**
   * Whether to display the asset slot (Figma `Asset` boolean property).
   * @default true
   */
  showAsset?: boolean;
  /**
   * Custom asset element to render. If omitted and `showAsset` is true,
   * a default icon or image placeholder is rendered based on `assetType`.
   */
  asset?: ReactNode;
  /**
   * Title or heading of the card (Figma `Heading` property).
   */
  heading?: ReactNode;
  /**
   * Heading HTML element level.
   * @default 'h3'
   */
  headingLevel?: CardHeadingLevel;
  /**
   * Body or description text of the card (Figma `Body` property).
   */
  body?: ReactNode;
  /**
   * Whether to display the actions slot (Figma `Button` boolean property).
   * @default true
   */
  showActions?: boolean;
  /**
   * Action element(s), such as `Button` or `ButtonGroup`.
   */
  actions?: ReactNode;
  /**
   * Custom child content. When provided along with heading/body, renders inside the content area.
   */
  children?: ReactNode;
  className?: string;
}
