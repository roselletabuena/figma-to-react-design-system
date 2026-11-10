import { createRef } from 'react';
import { afterEach, describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { DialogBody } from './DialogBody';

describe('DialogBody', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  describe('rendering', () => {
    it('renders the heading and body text', () => {
      render(<DialogBody heading="Delete file?" body="This can't be undone." />);
      expect(screen.getByRole('heading', { name: 'Delete file?' })).toBeDefined();
      expect(screen.getByText("This can't be undone.")).toBeDefined();
    });

    it('renders actions right-aligned in a button group', () => {
      render(
        <DialogBody heading="Heading" actions={<button type="button">Confirm</button>} />,
      );
      const button = screen.getByRole('button', { name: 'Confirm' });
      expect(screen.getByRole('group')).toContainElement(button);
    });

    it('omits the heading, body and action group when not provided', () => {
      render(<DialogBody />);
      expect(screen.queryByRole('heading')).toBeNull();
      expect(screen.queryByRole('group')).toBeNull();
    });

    it('renders children instead of heading, body and actions when provided', () => {
      render(
        <DialogBody heading="Heading" body="Body" actions={<button type="button">Go</button>}>
          <p>Custom slot</p>
        </DialogBody>,
      );
      expect(screen.getByText('Custom slot')).toBeDefined();
      expect(screen.queryByRole('heading')).toBeNull();
      expect(screen.queryByRole('button', { name: 'Go' })).toBeNull();
    });

    it('merges a custom className and forwards HTML attributes', () => {
      render(<DialogBody className="custom" data-testid="dialog-body" />);
      const dialog = screen.getByTestId('dialog-body');
      expect(dialog.className).toContain('custom');
      expect(dialog.className).toContain('bg-surface');
    });

    it('forwards its ref to the root element', () => {
      const ref = createRef<HTMLDivElement>();
      render(<DialogBody ref={ref} data-testid="dialog-body" />);
      expect(ref.current).toBe(screen.getByTestId('dialog-body'));
    });
  });

  describe('dismiss button', () => {
    it('shows a labelled close button by default', () => {
      render(<DialogBody heading="Heading" />);
      expect(screen.getByRole('button', { name: 'Close' })).toBeDefined();
    });

    it('hides the close button when dismissible is false', () => {
      render(<DialogBody heading="Heading" dismissible={false} />);
      expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
    });

    it('calls onDismiss when the close button is activated', async () => {
      const onDismiss = vi.fn();
      render(<DialogBody heading="Heading" onDismiss={onDismiss} />);
      await userEvent.click(screen.getByRole('button', { name: 'Close' }));
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    it('still renders the close button alongside custom children', () => {
      render(
        <DialogBody>
          <p>Custom slot</p>
        </DialogBody>,
      );
      expect(screen.getByRole('button', { name: 'Close' })).toBeDefined();
    });
  });

  // Rendered against the real stylesheet: values come from the Figma Dialog Body spec
  // (component 9762:696).
  describe('rendered design spec', () => {
    it('has 32px padding, an 8px radius and a 600px max width', () => {
      render(<DialogBody heading="Heading" data-testid="dialog-body" />);
      const style = getComputedStyle(screen.getByTestId('dialog-body'));
      expect(parseFloat(style.paddingTop)).toBe(32);
      expect(parseFloat(style.paddingLeft)).toBe(32);
      expect(parseFloat(style.borderTopLeftRadius)).toBe(8);
      expect(style.maxWidth).toBe('600px');
    });

    it('flips its surface and text colour between light and dark mode', () => {
      render(<DialogBody heading="Heading" data-testid="dialog-body" />);
      const dialog = screen.getByTestId('dialog-body');

      document.documentElement.classList.remove('dark');
      const light = {
        background: getComputedStyle(dialog).backgroundColor,
        text: getComputedStyle(screen.getByRole('heading')).color,
      };

      document.documentElement.classList.add('dark');
      const dark = {
        background: getComputedStyle(dialog).backgroundColor,
        text: getComputedStyle(screen.getByRole('heading')).color,
      };

      expect(dark.background).not.toBe(light.background);
      expect(dark.text).not.toBe(light.text);
    });
  });
});
