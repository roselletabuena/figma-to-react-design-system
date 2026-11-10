import type { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label shown next to the checkbox (Figma `Label`). */
  label: ReactNode;
  /** Supporting copy shown below the label. Ignored when `error` is set. */
  description?: ReactNode;
  /**
   * Error copy shown below the label (Figma `Error`). Replaces `description`, switches the box
   * border and helper text to the danger tokens, and marks the input `aria-invalid`.
   */
  error?: ReactNode;
  /**
   * Shows the dash glyph instead of the checkmark (Figma `Indeterminate`), for a parent checkbox
   * where some but not all children are checked. This is a visual-only DOM property with no HTML
   * attribute, so it is applied imperatively; it does not change the input's `checked` value.
   */
  indeterminate?: boolean;
  className?: string;
}
