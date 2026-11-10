import type { HTMLAttributes, ReactNode } from 'react';

export interface DialogBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Dialog title (Figma `Text Heading`). Rendered with the heading text style. */
  heading?: ReactNode;
  /** Supporting copy below the heading (Figma `Body text`). */
  body?: ReactNode;
  /**
   * Action buttons, right-aligned in a `ButtonGroup` (Figma `Button Group`). Typically one or
   * more `Button`s, the primary action listed last.
   */
  actions?: ReactNode;
  /** Custom content that replaces `heading`, `body` and `actions` entirely (Figma `Slot`). */
  children?: ReactNode;
  /** Shows a close button in the top-right corner (Figma `dismissible`). */
  dismissible?: boolean;
  /** Called when the close button is activated. Only relevant when `dismissible` is true. */
  onDismiss?: () => void;
  className?: string;
}
