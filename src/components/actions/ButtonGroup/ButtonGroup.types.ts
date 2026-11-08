import type { HTMLAttributes, ReactNode } from 'react';

export type ButtonGroupAlign = 'start' | 'end' | 'center' | 'justify' | 'stack';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** The buttons in the group (Figma `Button Start` / `Button End`). Usually `Button`s. */
  children?: ReactNode;
  /**
   * How the buttons are laid out (Figma `Align`). `start`, `center` and `end` pack them to
   * that side of a row, `justify` shares the row equally, and `stack` puts them in a
   * column, each full width.
   */
  align?: ButtonGroupAlign;
  className?: string;
}
