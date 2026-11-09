import type { TextProps } from './Text.types';

/**
 * Text component adhering to the Simple Design System (SDS).
 *
 * Body Base paragraph (16px / 1.4) in the default text color.
 */
export const Text = ({ children, className = '', ...props }: TextProps) => {
  const classes = ['font-body-base text-text-default break-words', className].filter(Boolean).join(' ');

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
};

Text.displayName = 'Text';
