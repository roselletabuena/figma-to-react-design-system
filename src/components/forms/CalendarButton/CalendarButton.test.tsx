import { describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import '../../../index.css';
import { CalendarButton } from './CalendarButton';

describe('CalendarButton', () => {
  describe('rendering', () => {
    it('renders text children correctly', () => {
      render(<CalendarButton>15</CalendarButton>);
      expect(screen.getByRole('button', { name: '15' })).toBeDefined();
    });

    it('renders default variant with expected classes', () => {
      render(<CalendarButton>1</CalendarButton>);
      const button = screen.getByRole('button', { name: '1' });
      expect(button.className).toContain('size-sds-icon-large');
      expect(button.className).toContain('rounded-sds-200');
      expect(button.className).toContain('text-text-default');
    });

    it('renders active variant with brand colors', () => {
      render(<CalendarButton variant="active">12</CalendarButton>);
      const button = screen.getByRole('button', { name: '12' });
      expect(button.className).toContain('bg-brand');
      expect(button.className).toContain('text-text-brand-on-brand');
    });

    it('renders hover variant with surface and ring classes', () => {
      render(<CalendarButton variant="hover">5</CalendarButton>);
      const button = screen.getByRole('button', { name: '5' });
      expect(button.className).toContain('bg-surface');
      expect(button.className).toContain('ring-border-default');
    });

    it('renders range variant with surface-secondary background', () => {
      render(<CalendarButton variant="range">10</CalendarButton>);
      const button = screen.getByRole('button', { name: '10' });
      expect(button.className).toContain('bg-surface-secondary');
      expect(button.className).toContain('text-text-default');
    });

    it('renders disabled variant with text-disabled and disabled attribute', () => {
      render(<CalendarButton variant="disabled">28</CalendarButton>);
      const button = screen.getByRole('button', { name: '28' });
      expect(button.className).toContain('text-text-disabled');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('renders range-disabled variant with disabled attribute and text-disabled', () => {
      render(<CalendarButton variant="range-disabled">29</CalendarButton>);
      const button = screen.getByRole('button', { name: '29' });
      expect(button.className).toContain('text-text-disabled');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('renders hidden state without content and invisible', () => {
      const { container } = render(<CalendarButton variant="hidden">1</CalendarButton>);
      const button = container.querySelector('button');
      expect(button).toBeDefined();
      expect(button?.className).toContain('invisible');
      expect(button?.className).toContain('pointer-events-none');
      expect(button?.getAttribute('aria-hidden')).toBe('true');
      expect(button?.hasAttribute('disabled')).toBe(true);
      expect(button?.textContent).toBe('');
    });

    it('accepts `state` prop as alias for `variant`', () => {
      render(<CalendarButton state="active">9</CalendarButton>);
      const button = screen.getByRole('button', { name: '9' });
      expect(button.className).toContain('bg-brand');
    });
  });

  describe('sizes', () => {
    it('applies medium size by default (40px canonical Figma)', () => {
      render(<CalendarButton>1</CalendarButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('size-sds-icon-large');
      expect(button.className).toContain('font-body-base');
    });

    it('applies small size when size="sm" is passed', () => {
      render(<CalendarButton size="sm">1</CalendarButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('size-sds-icon-medium');
      expect(button.className).toContain('font-body-small');
    });
  });

  describe('interactions', () => {
    it('calls onClick when clicked in default state', async () => {
      const handleClick = vi.fn();
      render(<CalendarButton onClick={handleClick}>2</CalendarButton>);

      await userEvent.click(screen.getByRole('button', { name: '2' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('activates with Enter key', async () => {
      const handleClick = vi.fn();
      render(<CalendarButton onClick={handleClick}>3</CalendarButton>);

      await userEvent.tab();
      expect(document.activeElement).toBe(screen.getByRole('button', { name: '3' }));
      await userEvent.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger onClick when disabled', async () => {
      const handleClick = vi.fn();
      render(
        <CalendarButton disabled onClick={handleClick}>
          5
        </CalendarButton>,
      );

      const button = screen.getByRole('button', { name: '5' }) as HTMLButtonElement;
      expect(button.disabled).toBe(true);
      await userEvent.tab();
      expect(document.activeElement).not.toBe(button);
      await userEvent.click(button, { force: true });
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not trigger onClick when variant="disabled"', async () => {
      const handleClick = vi.fn();
      render(
        <CalendarButton variant="disabled" onClick={handleClick}>
          6
        </CalendarButton>,
      );

      const button = screen.getByRole('button', { name: '6' }) as HTMLButtonElement;
      expect(button.disabled).toBe(true);
      await userEvent.click(button, { force: true });
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('ref forwarding and props', () => {
    it('forwards ref to button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<CalendarButton ref={ref}>7</CalendarButton>);
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    it('merges custom className', () => {
      render(<CalendarButton className="custom-test-class">8</CalendarButton>);
      expect(screen.getByRole('button').className).toContain('custom-test-class');
    });
  });
});
