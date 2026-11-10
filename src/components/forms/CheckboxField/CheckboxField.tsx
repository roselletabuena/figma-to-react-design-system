import { forwardRef, useEffect, useId, useRef } from 'react';
import type { CheckboxFieldProps } from './CheckboxField.types';

// 12px glyphs centred in the 20px box (box has no 20px SDS size token, so it uses the 20px step
// of Tailwind's default scale, the same reasoning IconButton uses for its icon slot).
const CheckGlyph = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 6.25L4.75 8.5L9.5 3.5" />
  </svg>
);

const DashGlyph = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M2.5 6H9.5" />
  </svg>
);

// `*:size-full` stretches the direct <svg> child to fill the 12px glyph slot (same pattern as
// IconButton's icon slot).
const glyphCheckedClasses =
  'pointer-events-none absolute inset-1 opacity-0 transition-opacity *:size-full peer-checked:opacity-100';
const glyphIndeterminateClasses =
  'pointer-events-none absolute inset-1 opacity-0 transition-opacity *:size-full peer-indeterminate:opacity-100';

/**
 * CheckboxField component adhering to the Simple Design System (SDS).
 *
 * A native checkbox input wrapped in its own `<label>`, with an optional description or error
 * line below it. The box and glyphs are decorative siblings of the (visually hidden) input,
 * driven by the `peer-checked` / `peer-focus-visible` CSS variants, so checked and focus styling
 * track the real input state in both controlled and uncontrolled usage.
 */
export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  (
    {
      label,
      description,
      error,
      indeterminate = false,
      disabled,
      required,
      className = '',
      id,
      ...props
    },
    forwardedRef,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const generatedId = useId();
    const helpId = `${id ?? generatedId}-help`;
    const helpText = error ?? description;
    const hasHelpText = helpText != null && helpText !== '';

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const setRefs = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    // Disabled wins outright: it drops the checked/indeterminate fill entirely rather than
    // layering on top of it, so there is no state where disabled and checked styling compete.
    const boxClasses = [
      'pointer-events-none absolute inset-0 rounded-sds-100 border bg-surface transition-colors',
      'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-border-brand',
      disabled
        ? 'border-border-disabled bg-surface-disabled'
        : [
            error ? 'border-border-danger' : 'border-border-default',
            'peer-checked:border-brand peer-checked:bg-brand peer-indeterminate:border-brand peer-indeterminate:bg-brand',
          ].join(' '),
    ].join(' ');

    const glyphToneClass = disabled ? 'text-icon-disabled' : 'text-icon-brand-on-brand';
    const checkGlyphClasses = `${glyphCheckedClasses} ${glyphToneClass}`;
    const dashGlyphClasses = `${glyphIndeterminateClasses} ${glyphToneClass}`;

    const labelTextClasses = `font-body-base ${disabled ? 'text-text-disabled' : 'text-text-default'}`;
    const helpTextClasses = `font-body-small ${
      disabled ? 'text-text-disabled' : error != null ? 'text-text-danger' : 'text-text-secondary'
    }`;

    return (
      <label
        className={`inline-flex items-start gap-sds-200 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      >
        <span className="relative inline-flex size-5 shrink-0">
          <input
            {...props}
            ref={setRefs}
            type="checkbox"
            id={id}
            disabled={disabled}
            required={required}
            aria-invalid={error != null ? true : undefined}
            aria-describedby={hasHelpText ? helpId : undefined}
            className="peer absolute inset-0 cursor-pointer opacity-0 disabled:cursor-not-allowed"
          />
          <span aria-hidden="true" className={boxClasses} />
          <span aria-hidden="true" className={checkGlyphClasses}>
            <CheckGlyph />
          </span>
          <span aria-hidden="true" className={dashGlyphClasses}>
            <DashGlyph />
          </span>
        </span>
        <span className="flex flex-col gap-sds-050">
          <span className={labelTextClasses}>
            {label}
            {required ? (
              <span aria-hidden="true" className="text-text-danger">
                {' '}
                *
              </span>
            ) : null}
          </span>
          {hasHelpText ? (
            <span id={helpId} className={helpTextClasses}>
              {helpText}
            </span>
          ) : null}
        </span>
      </label>
    );
  },
);

CheckboxField.displayName = 'CheckboxField';
