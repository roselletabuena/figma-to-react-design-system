import type { HTMLAttributes, ReactNode } from 'react';

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** The text to display. */
  children?: ReactNode;
  className?: string;
}
