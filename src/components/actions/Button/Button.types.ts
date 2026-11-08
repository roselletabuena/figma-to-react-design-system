import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'neutral' | 'subtle';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label (Figma `Label`). */
  children?: ReactNode;
  /**
   * Visual emphasis. `primary` is the brand fill, `neutral` a bordered grey fill, and
   * `subtle` is transparent until hovered.
   */
  variant?: ButtonVariant;
  /** `sm` = 32px tall (8px padding), `md` = 40px tall (12px padding). */
  size?: ButtonSize;
  /**
   * Icon shown before the label (Figma `Has Icon Start`). Rendered in a 16px slot, hidden
   * from assistive technology, and coloured by the button's text colour (`currentColor`).
   */
  iconStart?: ReactNode;
  /** Icon shown after the label (Figma `Has Icon End`). Same slot rules as `iconStart`. */
  iconEnd?: ReactNode;
  className?: string;
}
