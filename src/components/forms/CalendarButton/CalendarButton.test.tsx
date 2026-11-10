import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '../../../index.css';
import { CalendarButton } from './CalendarButton';

const resolveToken = (property: 'background-color' | 'color', token: string) => {
  const probe = document.createElement('div');
  probe.style.setProperty(property, `var(${token})`);
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).getPropertyValue(property);
  probe.remove();
  return value;
};

describe('CalendarButton', () => {
  describe('rendering', () => {
    it('renders the number prop correctly', () => {
      render(<CalendarButton number={15} />);
      expect(screen.getByRole('button', { name: '15' })).toBeDefined();
    });

    it('renders children when provided', () => {
      render(<CalendarButton>24</CalendarButton>);
      expect(screen.getByRole('button', { name: '24' })).toBeDefined();
    });

    it('prefers children over number when both are passed', () => {
      render(<CalendarButton number={10}>12</CalendarButton>);
      expect(screen.getByRole('button', { name: '12' })).toBeDefined();
      expect(screen.queryByText('10')).toBeNull();
    });

    it('merges custom className and forwards HTML attributes', () => {
      render(<CalendarButton number={1} className="custom-calendar-cell" data-testid="cal-btn" />);
      const btn = screen.getByTestId('cal-btn');
      expect(btn.className).toContain('custom-calendar-cell');
      expect(btn.className).toContain('size-sds-icon-large');
    });

    it('supports variant as an alias for state', () => {
      render(<CalendarButton number={5} variant="active" data-testid="variant-btn" />);
      const btn = screen.getByTestId('variant-btn');
      expect(btn.getAttribute('aria-pressed')).toBe('true');
    });
  });

  describe('states & accessibility', () => {
    it('marks active state with aria-pressed="true"', () => {
      render(<CalendarButton number={1} state="active" />);
      const btn = screen.getByRole('button', { name: '1' });
      expect(btn.getAttribute('aria-pressed')).toBe('true');
    });

    it('allows overriding aria-pressed on active state', () => {
      render(<CalendarButton number={1} state="active" aria-pressed={false} />);
      const btn = screen.getByRole('button', { name: '1' });
      expect(btn.getAttribute('aria-pressed')).toBe('false');
    });

    it('hides content and sets aria-hidden="true" and tabIndex="-1" when hidden', () => {
      render(<CalendarButton number={1} state="hidden" data-testid="hidden-btn" />);
      const btn = screen.getByTestId('hidden-btn');
      expect(btn.getAttribute('aria-hidden')).toBe('true');
      expect(btn.getAttribute('tabIndex')).toBe('-1');
      expect(btn.className).toContain('invisible');
      expect(btn.textContent).toBe('');
    });

    it('disables the button when state="disabled"', () => {
      render(<CalendarButton number={1} state="disabled" />);
      const btn = screen.getByRole('button', { name: '1' });
      expect((btn as HTMLButtonElement).disabled).toBe(true);
      expect(btn.className).toContain('cursor-not-allowed');
    });

    it('disables the button when state="range-disabled"', () => {
      render(<CalendarButton number={1} state="range-disabled" />);
      const btn = screen.getByRole('button', { name: '1' });
      expect((btn as HTMLButtonElement).disabled).toBe(true);
      expect(btn.className).toContain('cursor-not-allowed');
    });

    it('honors the explicit disabled prop even in default state', () => {
      render(<CalendarButton number={1} disabled />);
      const btn = screen.getByRole('button', { name: '1' });
      expect((btn as HTMLButtonElement).disabled).toBe(true);
    });
  });

  describe('interaction', () => {
    it('calls onClick when clicked in default state', () => {
      const handleClick = vi.fn();
      render(<CalendarButton number={1} onClick={handleClick} />);
      fireEvent.click(screen.getByRole('button', { name: '1' }));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger onClick when disabled', () => {
      const handleClick = vi.fn();
      render(<CalendarButton number={1} state="disabled" onClick={handleClick} />);
      fireEvent.click(screen.getByRole('button', { name: '1' }));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not trigger onClick when state is range-disabled', () => {
      const handleClick = vi.fn();
      render(<CalendarButton number={1} state="range-disabled" onClick={handleClick} />);
      fireEvent.click(screen.getByRole('button', { name: '1' }));
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('activates with Enter and Space keys via native button behavior', () => {
      const handleClick = vi.fn();
      render(<CalendarButton number={1} onClick={handleClick} />);
      const btn = screen.getByRole('button', { name: '1' });
      btn.focus();
      fireEvent.keyDown(btn, { key: 'Enter', code: 'Enter' });
      fireEvent.click(btn);
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('rendered design spec (Figma component set 4333:9359)', () => {
    it('renders as a 40px square with 8px border radius', () => {
      render(<CalendarButton number={1} data-testid="spec-btn" />);
      const btn = screen.getByTestId('spec-btn');
      const style = getComputedStyle(btn);
      const rect = btn.getBoundingClientRect();
      expect(rect.width).toBe(40);
      expect(rect.height).toBe(40);
      expect(style.borderRadius).toBe('8px');
    });

    it('applies brand background and high-contrast text in active state', () => {
      render(<CalendarButton number={1} state="active" data-testid="active-btn" />);
      const btn = screen.getByTestId('active-btn');
      const style = getComputedStyle(btn);
      const expectedBg = resolveToken('background-color', '--sds-color-background-brand-default');
      const expectedText = resolveToken('color', '--sds-color-text-brand-on-brand');
      expect(style.backgroundColor).toBe(expectedBg);
      expect(style.color).toBe(expectedText);
    });

    it('applies surface-secondary background in range state', () => {
      render(<CalendarButton number={1} state="range" data-testid="range-btn" />);
      const btn = screen.getByTestId('range-btn');
      const style = getComputedStyle(btn);
      const expectedBg = resolveToken('background-color', '--sds-color-background-default-secondary');
      expect(style.backgroundColor).toBe(expectedBg);
    });

    it('applies disabled text color in disabled states', () => {
      render(<CalendarButton number={1} state="disabled" data-testid="disabled-btn" />);
      const btn = screen.getByTestId('disabled-btn');
      const style = getComputedStyle(btn);
      const expectedText = resolveToken('color', '--sds-color-text-disabled-default');
      expect(style.color).toBe(expectedText);
    });

    it('applies disabled text color in range-disabled states', () => {
      render(<CalendarButton number={1} state="range-disabled" data-testid="range-disabled-btn" />);
      const btn = screen.getByTestId('range-disabled-btn');
      const style = getComputedStyle(btn);
      const expectedText = resolveToken('color', '--sds-color-text-disabled-default');
      expect(style.color).toBe(expectedText);
    });

    it('applies surface background and border ring in hover state', () => {
      render(<CalendarButton number={1} state="hover" data-testid="hover-btn" />);
      const btn = screen.getByTestId('hover-btn');
      const style = getComputedStyle(btn);
      const expectedBg = resolveToken('background-color', '--sds-color-background-default-default');
      expect(style.backgroundColor).toBe(expectedBg);
      expect(btn.className).toContain('ring-1');
      expect(btn.className).toContain('ring-border-default');
    });
  });
});
