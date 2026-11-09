import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Visual / functional state for CalendarButton adhering to Simple Design System (SDS).
 */
export type CalendarButtonVariant =
  | 'default'
  | 'hover'
  | 'active'
  | 'hidden'
  | 'disabled'
  | 'range'
  | 'range-disabled';

/**
 * Alias for `CalendarButtonVariant` to match Figma's `State` property naming.
 */
export type CalendarButtonState = CalendarButtonVariant;

/**
 * Size variants for the calendar button cell.
 * `md` (40px) matches the canonical Simple Design System Figma specification.
 */
export type CalendarButtonSize = 'sm' | 'md';

export interface CalendarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Day number, label, or custom content rendered inside the button. */
  children?: ReactNode;
  /**
   * Component variant / state. Matches Figma's `State` property.
   * @default 'default'
   */
  variant?: CalendarButtonVariant;
  /**
   * Alias for `variant` matching Figma naming (`State=Default`, `State=Active`, etc.).
   */
  state?: CalendarButtonState;
  /**
   * Size of the calendar cell.
   * @default 'md'
   */
  size?: CalendarButtonSize;
  /** Optional additional CSS class names. */
  className?: string;
}
