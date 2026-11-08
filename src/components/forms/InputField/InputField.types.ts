import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label above the input (Figma `Has Label` / `Label`). Omit to hide it. */
  label?: ReactNode;
  /** Helper text between the label and the input (Figma `Has Description`). */
  description?: ReactNode;
  /** Message below the input (Figma `Has Error` / `Error`). Omit to hide it. */
  error?: ReactNode;
  /**
   * Figma `State=Error`: danger stroke and danger-coloured message, and sets `aria-invalid`.
   * Without it a message passed via `error` renders in the default text colour, as in Figma.
   */
  invalid?: boolean;
  /** Figma `State=Disabled`: disabled fill, stroke and text. Uses the native `disabled` attribute. */
  disabled?: boolean;
  /** Classes for the outer wrapper. */
  className?: string;
}
