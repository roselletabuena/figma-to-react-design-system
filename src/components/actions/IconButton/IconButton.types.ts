import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type IconButtonVariant = 'primary' | 'neutral' | 'subtle';
export type IconButtonSize = 'sm' | 'md';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label'> {
  /**
   * The icon to show (Figma `Icon` instance swap). Rendered in a 20px slot, hidden from
   * assistive technology, and coloured by the button's icon colour (`currentColor`), so use an
   * SVG that strokes or fills with `currentColor`.
   */
  icon: ReactNode;
  /**
   * Accessible name. Required because the button has no visible text, so without it a screen
   * reader announces an unlabeled button.
   */
  'aria-label': string;
  /**
   * Visual emphasis. `primary` is the brand fill, `neutral` a bordered grey fill, and
   * `subtle` is transparent until hovered.
   */
  variant?: IconButtonVariant;
  /** `sm` = 36px square (8px padding), `md` = 44px square (12px padding). */
  size?: IconButtonSize;
  className?: string;
}
