import type { HTMLAttributes, ReactNode } from 'react';

export type TagVariant = 'primary' | 'secondary';
export type TagScheme = 'brand' | 'neutral' | 'positive' | 'danger' | 'warning';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  /** The tag label. */
  children?: ReactNode;
  /** Fill emphasis. Primary is a solid fill, secondary is a softer tint. */
  variant?: TagVariant;
  /** Colour scheme. */
  scheme?: TagScheme;
  /** Shows the trailing remove (X) button. */
  removable?: boolean;
  /** Called when the remove button is clicked. */
  onRemove?: () => void;
  /** Accessible name of the remove button. Defaults to "Remove". */
  removeLabel?: string;
  className?: string;
}
