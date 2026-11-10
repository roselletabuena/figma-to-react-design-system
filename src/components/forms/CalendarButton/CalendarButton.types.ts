import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type CalendarButtonState =
  | 'default'
  | 'hover'
  | 'active'
  | 'hidden'
  | 'disabled'
  | 'range'
  | 'range-disabled';

/**
 * Variant is an alias for State, matching standard design system variant terminology.
 */
export type CalendarButtonVariant = CalendarButtonState;

export interface CalendarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Day number or custom content to display.
   * If both `children` and `number` are provided, `children` takes precedence.
   */
  children?: ReactNode;

  /**
   * Numeric or string day representation (e.g. 1, 15, '31'). Matches Figma `Number` property.
   */
  number?: number | string;

  /**
   * Visual and interactive state of the calendar cell (Figma `State`).
   * - `default`: standard selectable day in the active month
   * - `hover`: preview hover style with border ring and surface background
   * - `active`: selected day date with solid brand background and high-contrast text
   * - `hidden`: invisible placeholder maintaining 40x40px calendar grid alignment
   * - `disabled`: non-interactive day (e.g., outside allowed range or other month)
   * - `range`: day falling within a multi-day selected range
   * - `range-disabled`: day within a range that is non-selectable
   * @default 'default'
   */
  state?: CalendarButtonState;

  /**
   * Alias for `state`.
   */
  variant?: CalendarButtonVariant;

  /**
   * Optional custom CSS class names.
   */
  className?: string;
}
