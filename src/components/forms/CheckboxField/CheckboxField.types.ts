import type { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children'> {
  /** Label text (Figma `Label`). */
  label: ReactNode;
  /** Secondary text under the label (Figma `Description`). Omit to hide it (Figma `Has Description`). */
  description?: ReactNode;
  /**
   * Mixed state (Figma `Value Type=Indeterminate`): shows a minus instead of a check.
   * Sets the native `indeterminate` property.
   */
  indeterminate?: boolean;
  /** Class names for the outer wrapper. */
  className?: string;
}
