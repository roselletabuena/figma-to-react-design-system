import { forwardRef } from 'react';
import { ButtonGroup } from '../../actions/ButtonGroup';
import { IconButton } from '../../actions/IconButton';
import type { DialogBodyProps } from './DialogBody.types';

// Figma caps overlays at 600px wide so lines of body text stay short. No SDS size token reaches
// that far, so this is the one arbitrary value in the component.
const baseClasses = [
  'relative flex w-full max-w-[600px] flex-col gap-sds-600',
  'rounded-sds-200 border border-border-default bg-surface p-sds-800 shadow-sds-400',
].join(' ');

// Figma "X" icon (20px, 1.5 stroke). Stroke is `currentColor` so it follows the close button's
// icon colour in every theme.
const CloseIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 5 5 15M5 5l10 10" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

/**
 * DialogBody component adhering to the Simple Design System (SDS).
 *
 * The content panel of a Dialog/Modal: a heading, body copy and right-aligned actions, with an
 * optional close button. Pass `children` to replace the default layout with custom content.
 */
export const DialogBody = forwardRef<HTMLDivElement, DialogBodyProps>(
  (
    { heading, body, actions, dismissible = true, onDismiss, children, className = '', ...props },
    ref,
  ) => {
    const classes = [baseClasses, className].filter(Boolean).join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children ?? (
          <>
            {(heading || body) && (
              <div className="flex w-full flex-col gap-sds-300 text-text-default">
                {heading ? <h2 className="w-full font-heading">{heading}</h2> : null}
                {body ? <p className="w-full font-body-base">{body}</p> : null}
              </div>
            )}
            {actions ? <ButtonGroup align="end">{actions}</ButtonGroup> : null}
          </>
        )}
        {dismissible ? (
          // Figma offsets the close button 7px from each edge so the 20px icon sits centred in
          // the 32px body padding; not on the 4px spacing scale.
          <IconButton
            aria-label="Close"
            icon={<CloseIcon />}
            variant="subtle"
            size="sm"
            onClick={onDismiss}
            className="absolute right-[7px] top-[7px]"
          />
        ) : null}
      </div>
    );
  },
);

DialogBody.displayName = 'DialogBody';
