import type { ButtonGroupAlign, ButtonGroupProps } from './ButtonGroup.types';

// 16px between buttons in every alignment (Figma `--sds-size-space-400`).
const baseClasses = 'flex w-full gap-sds-400';

// `*:` targets the direct children (the buttons). Justify shares the row equally; Stack makes
// each button fill the column. `*:min-w-0` lets a long label shrink instead of overflowing.
const alignClasses: Record<ButtonGroupAlign, string> = {
  start: 'items-center justify-start',
  end: 'items-center justify-end',
  center: 'items-center justify-center',
  justify: 'items-center *:min-w-0 *:grow *:basis-0',
  stack: 'flex-col items-start justify-center *:w-full',
};

/**
 * ButtonGroup component adhering to the Simple Design System (SDS).
 *
 * A layout wrapper for related `Button`s; it sets the spacing and alignment only.
 */
export const ButtonGroup = ({
  children,
  align = 'start',
  className = '',
  ...props
}: ButtonGroupProps) => {
  const classes = [baseClasses, alignClasses[align], className].filter(Boolean).join(' ');

  return (
    <div role="group" className={classes} {...props}>
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';
