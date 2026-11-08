import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonDangerVariant = 'primary' | 'subtle';
export type ButtonDangerSize = 'sm' | 'md';

export interface ButtonDangerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label (Figma `Label`). */
  children?: ReactNode;
  /**
   * Visual emphasis. `primary` is the solid danger fill; `subtle` is transparent with danger
   * text until hovered.
   */
  variant?: ButtonDangerVariant;
  /** `sm` = 32px tall (8px padding), `md` = 40px tall (12px padding). */
  size?: ButtonDangerSize;
  /**
   * Icon shown before the label (Figma `Has Icon Start`). Rendered in a 16px slot, hidden
   * from assistive technology, and coloured by the button's text colour (`currentColor`).
   */
  iconStart?: ReactNode;
  /** Icon shown after the label (Figma `Has Icon End`). Same slot rules as `iconStart`. */
  iconEnd?: ReactNode;
  className?: string;
}
