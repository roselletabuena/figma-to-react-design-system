import { forwardRef, useCallback, useEffect, useId, useRef } from 'react';
import type { CheckboxFieldProps } from './CheckboxField.types';

// Figma Value Type=Unchecked draws a 1px border on the surface fill; checked and
// indeterminate drop the border and fill with the brand colour. Disabled overrides all.
// The icons are children of this span, so their visibility is driven from here by the
// sibling <input>'s :checked / :indeterminate state.
const boxClasses = [
  'inline-flex size-sds-400 shrink-0 items-center justify-center overflow-clip',
  'rounded-sds-100 border border-(--sds-color-border-brand-tertiary) bg-surface transition-colors',
  'text-icon-brand-on-brand peer-disabled:text-icon-disabled',
  'peer-checked:border-transparent peer-checked:bg-brand',
  'peer-indeterminate:border-transparent peer-indeterminate:bg-brand',
  'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-border-brand',
  'peer-disabled:border-border-disabled peer-disabled:bg-surface-disabled',
  '[&>svg]:hidden [&>svg]:size-full',
  'peer-checked:[&>[data-icon=check]]:block',
  'peer-indeterminate:[&>[data-icon=check]]:hidden',
  'peer-indeterminate:[&>[data-icon=minus]]:block',
].join(' ');

const svgProps = {
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/**
 * CheckboxField component adhering to the Simple Design System (SDS).
 *
 * A native checkbox (keyboard, form and screen reader support) with a Figma-styled box, label
 * and optional description. Checked, indeterminate and disabled styling is driven by the
 * pseudo-classes of the native input.
 */
export const CheckboxField = forwardRef<HTMLInputElement, CheckboxFieldProps>(
  ({ label, description, indeterminate = false, className = '', id, disabled, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const descriptionId = `${inputId}-description`;
    const innerRef = useRef<HTMLInputElement | null>(null);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = indeterminate;
    }, [indeterminate]);

    const classes = ['inline-flex flex-col items-start', className].filter(Boolean).join(' ');
    const dim = disabled ? 'opacity-50' : '';

    return (
      <div className={classes}>
        <label
          htmlFor={inputId}
          className={`flex items-center gap-sds-300 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <input
            aria-describedby={description ? descriptionId : undefined}
            {...props}
            ref={setRefs}
            id={inputId}
            type="checkbox"
            disabled={disabled}
            className="peer sr-only"
          />
          <span aria-hidden="true" className={boxClasses}>
            <svg {...svgProps} data-icon="check">
              <path d="M13.3333 4L6 11.3333L2.66667 8" />
            </svg>
            <svg {...svgProps} data-icon="minus">
              <path d="M3.33333 8H12.6667" />
            </svg>
          </span>
          <span className={`font-body-base text-text-default ${dim}`}>{label}</span>
        </label>
        {description ? (
          <p id={descriptionId} className={`flex gap-sds-300 font-body-base text-text-secondary ${dim}`}>
            <span aria-hidden="true" className="size-sds-400 shrink-0" />
            <span>{description}</span>
          </p>
        ) : null}
      </div>
    );
  },
);

CheckboxField.displayName = 'CheckboxField';
