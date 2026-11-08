import { forwardRef, useId } from 'react';
import type { InputFieldProps } from './InputField.types';

const textClasses = 'font-body-base';

// The Figma stroke is drawn inside the frame (12 + 16 + 12 = 40px tall), so it is an inset ring.
const inputClasses = [
  // Browsers clamp an input's line box to `normal`, so the 40px Figma height is set explicitly
  // (12 + 16 + 12) rather than derived from the 100% line height.
  'block h-[calc(var(--sds-size-space-400)+2*var(--sds-size-space-300))] w-full min-w-[120px] overflow-clip rounded-sds-200 px-sds-400 py-sds-300',
  'bg-surface text-text-default ring-1 ring-inset ring-border-default',
  'font-single-line-base placeholder:text-text-tertiary transition-colors',
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand',
  'aria-[invalid=true]:ring-border-danger',
  'disabled:cursor-not-allowed disabled:bg-surface-disabled disabled:text-text-disabled',
  'disabled:ring-border-disabled disabled:placeholder:text-text-disabled',
].join(' ');

const isPresent = (node: unknown) => node !== undefined && node !== null && node !== false;

/**
 * InputField component adhering to the Simple Design System (SDS).
 *
 * A native text input with an optional label, description and error message wired up for
 * assistive technology (`htmlFor`, `aria-describedby`, `aria-invalid`).
 */
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, description, error, invalid = false, disabled = false, id, className = '', ...props },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = `${inputId}-description`;
    const errorId = `${inputId}-error`;
    const hasDescription = isPresent(description);
    const hasError = isPresent(error);
    const describedBy =
      [props['aria-describedby'], hasDescription ? descriptionId : '', hasError ? errorId : '']
        .filter(Boolean)
        .join(' ') || undefined;

    return (
      <div className={['flex flex-col items-start gap-sds-200', className].filter(Boolean).join(' ')}>
        {label ? (
          <label
            htmlFor={inputId}
            className={`${textClasses} w-full ${disabled ? 'text-text-disabled' : 'text-text-default'}`}
          >
            {label}
          </label>
        ) : null}
        {hasDescription ? (
          <p id={descriptionId} className={`${textClasses} w-full text-text-secondary`}>
            {description}
          </p>
        ) : null}
        <input
          ref={ref}
          type="text"
          {...props}
          id={inputId}
          disabled={disabled}
          aria-invalid={invalid ? true : props['aria-invalid']}
          aria-describedby={describedBy}
          className={inputClasses}
        />
        {hasError ? (
          <p
            id={errorId}
            className={`${textClasses} ${invalid && !disabled ? 'text-text-danger' : 'text-text-default'}`}
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

InputField.displayName = 'InputField';
