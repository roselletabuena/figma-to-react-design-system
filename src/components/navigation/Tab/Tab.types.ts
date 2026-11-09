import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface TabProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Tab label (Figma `Label`). */
  children?: ReactNode;
  /** Whether this tab is the selected one (Figma `Active`). Sets `aria-selected`. */
  active?: boolean;
  className?: string;
}
