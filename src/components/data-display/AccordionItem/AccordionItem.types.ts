import type { HTMLAttributes, ReactNode } from 'react';

export type AccordionItemState = 'open' | 'closed';

export interface AccordionItemProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onChange' | 'content' | 'onToggle'> {
  /**
   * Title displayed in the accordion header.
   * Corresponds to Figma `Title` text property.
   * @default 'Title'
   */
  title?: ReactNode;

  /**
   * Content displayed when the accordion item is open.
   * Corresponds to Figma `Content` text property.
   */
  children?: ReactNode;

  /**
   * Alternative prop for content, matching Figma's `Content` property.
   * Rendered if `children` is not provided.
   */
  content?: ReactNode;

  /**
   * Visual variant/state matching Figma `State` property ('open' | 'closed').
   */
  state?: AccordionItemState;

  /**
   * Controlled open state.
   */
  open?: boolean;

  /**
   * Initial open state when uncontrolled.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * Callback fired when the open state changes.
   */
  onToggle?: (open: boolean) => void;

  /**
   * Alias for `onToggle`.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Whether the accordion item is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Heading element tag wrapping the trigger button for accessibility.
   * @default 'h3'
   */
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'none';

  /**
   * Additional class name for the accordion item container.
   */
  className?: string;
}
