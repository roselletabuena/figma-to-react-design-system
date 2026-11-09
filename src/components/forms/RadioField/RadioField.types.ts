import type { InputHTMLAttributes, ReactNode } from 'react';

export type RadioFieldState = 'default' | 'disabled';
export type RadioFieldValueType = 'checked' | 'unchecked';

// Aliases for blueprint compatibility
export type RadioFieldVariant = RadioFieldState;
export type RadioFieldSize = 'md';

export interface RadioFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Primary label text for the radio option (Figma `Label`).
   * Can also be passed as `children`.
   */
  label?: ReactNode;

  /**
   * Supporting description text placed below the label (Figma `Description`).
   */
  description?: ReactNode;

  /**
   * Whether to display the description row (Figma `Has Description`).
   * Defaults to `true` when `description` is provided, `false` otherwise.
   */
  hasDescription?: boolean;

  /**
   * Optional custom className for the root container label element.
   */
  className?: string;
}
