import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonDangerVariant = 'primary' | 'subtle';
export type ButtonDangerSize = 'sm' | 'md';

export interface ButtonDangerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label (Figma `Label`). */
  children?: ReactNode;
  /** `primary` is a filled destructive action; `subtle` is text-only until hovered. */
  variant?: ButtonDangerVariant;
  /** `md` = 12px padding (Figma `Medium`, 40px tall), `sm` = 8px padding (Figma `Small`, 32px tall). */
  size?: ButtonDangerSize;
  /**
   * Icon shown before the label (Figma `Has Icon Start`). Rendered in a 16px slot and
   * hidden from assistive tech; draw it with `currentColor` so it follows the button's text color.
   */
  iconStart?: ReactNode;
  /** Icon shown after the label (Figma `Has Icon End`). Same rules as `iconStart`. */
  iconEnd?: ReactNode;
  className?: string;
}
