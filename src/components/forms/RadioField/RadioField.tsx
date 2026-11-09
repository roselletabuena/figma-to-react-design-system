import { forwardRef, useId, type ChangeEventHandler } from 'react';
import type { RadioFieldProps } from './RadioField.types';

/**
 * RadioField component adhering to the Simple Design System (SDS).
 *
 * Implements the Figma "Radio Field" component (#9762:1412) with support for
 * label, description, checked/unchecked values, disabled state, and dark mode.
 */
export const RadioField = forwardRef<HTMLInputElement, RadioFieldProps>(
  (
    {
      id,
      label,
      children,
      description,
      hasDescription,
      disabled = false,
      checked,
      defaultChecked,
      className = '',
      onChange,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = `${inputId}-description`;
    const labelContent = label ?? children;
    const showDescription = hasDescription === false ? false : Boolean(description);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
      if (disabled) return;
      onChange?.(e);
    };

    const rootClasses = [
      'group inline-flex flex-col select-none',
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const labelClasses = [
      'font-body-base transition-colors',
      disabled ? 'text-text-disabled' : 'text-text-default',
    ].join(' ');

    const descriptionClasses = [
      'font-body-base transition-colors',
      disabled ? 'text-text-disabled' : 'text-text-secondary',
    ].join(' ');

    return (
      <label htmlFor={inputId} className={rootClasses}>
        <div className="flex items-center gap-sds-300">
          <span className="relative inline-flex size-sds-400 shrink-0 items-center justify-center">
            <input
              ref={ref}
              id={inputId}
              type="radio"
              disabled={disabled}
              checked={checked}
              defaultChecked={defaultChecked}
              onChange={handleChange}
              className="sr-only peer"
              aria-describedby={showDescription ? descriptionId : undefined}
              {...props}
            />
            {/* Outer circle */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-sds-full ring-1 ring-inset transition-colors ring-border-secondary bg-surface peer-checked:ring-border-brand peer-checked:bg-brand-secondary peer-disabled:bg-surface-disabled peer-disabled:ring-border-disabled peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-border-brand"
            />
            {/* Inner dot */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute size-2.5 rounded-sds-full transition-transform scale-0 peer-checked:scale-100 bg-text-default peer-disabled:bg-text-disabled"
            />
          </span>
          {labelContent ? <span className={labelClasses}>{labelContent}</span> : null}
        </div>
        {showDescription ? (
          <div className="flex items-center gap-sds-300">
            <span className="size-sds-400 shrink-0" aria-hidden="true" />
            <span id={descriptionId} className={descriptionClasses}>
              {description}
            </span>
          </div>
        ) : null}
      </label>
    );
  },
);

RadioField.displayName = 'RadioField';
