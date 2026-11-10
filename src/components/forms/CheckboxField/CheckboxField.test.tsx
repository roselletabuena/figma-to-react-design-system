import { createRef } from 'react';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { CheckboxField } from './CheckboxField';

/** Resolves a semantic token to the computed value it has right now (theme-aware). */
const resolveToken = (property: 'background-color' | 'border-color', token: string) => {
  const probe = document.createElement('div');
  probe.style.setProperty(property, `var(${token})`);
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).getPropertyValue(property);
  probe.remove();
  return value;
};

describe('CheckboxField', () => {
  describe('rendering', () => {
    it('renders an unchecked native checkbox named by its label', () => {
      render(<CheckboxField label="Accept terms" />);
      const checkbox = screen.getByRole('checkbox', { name: 'Accept terms' }) as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('renders description copy', () => {
      render(<CheckboxField label="Accept terms" description="Read the fine print." />);
      expect(screen.getByText('Read the fine print.')).toBeDefined();
    });

    it('associates description copy with the input via aria-describedby', () => {
      render(<CheckboxField label="Accept terms" description="Read the fine print." />);
      const checkbox = screen.getByRole('checkbox');
      const description = screen.getByText('Read the fine print.');
      expect(checkbox.getAttribute('aria-describedby')).toBe(description.id);
    });

    it('shows error copy instead of the description and marks the input invalid', () => {
      render(
        <CheckboxField
          label="Accept terms"
          description="Read the fine print."
          error="You must accept to continue."
        />,
      );
      expect(screen.queryByText('Read the fine print.')).toBeNull();
      const error = screen.getByText('You must accept to continue.');
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox.getAttribute('aria-invalid')).toBe('true');
      expect(checkbox.getAttribute('aria-describedby')).toBe(error.id);
    });

    it('marks the input required and shows a visible asterisk', () => {
      render(<CheckboxField label="Accept terms" required />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.required).toBe(true);
      expect(screen.getByText('*')).toBeDefined();
    });

    it('sets the indeterminate DOM property without checking the input', () => {
      render(<CheckboxField label="Select all" indeterminate />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.indeterminate).toBe(true);
      expect(checkbox.checked).toBe(false);
    });

    it('merges a custom className and forwards HTML attributes to the input', () => {
      render(<CheckboxField label="Accept terms" className="custom" name="terms" />);
      expect(screen.getByRole('checkbox').getAttribute('name')).toBe('terms');
      expect(screen.getByText('Accept terms').closest('label')?.className).toContain('custom');
    });

    it('forwards its ref to the input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<CheckboxField ref={ref} label="Accept terms" />);
      expect(ref.current).toBe(screen.getByRole('checkbox'));
    });
  });

  describe('interaction', () => {
    it('toggles when clicked', async () => {
      render(<CheckboxField label="Accept terms" />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      await userEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
      await userEvent.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });

    it('calls onChange when toggled', async () => {
      const onChange = vi.fn();
      render(<CheckboxField label="Accept terms" onChange={onChange} />);
      await userEvent.click(screen.getByRole('checkbox'));
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('toggles from the keyboard', async () => {
      render(<CheckboxField label="Accept terms" />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      await userEvent.tab();
      expect(document.activeElement).toBe(checkbox);
      await userEvent.keyboard(' ');
      expect(checkbox.checked).toBe(true);
    });

    it('does not toggle or take focus when disabled', async () => {
      const onChange = vi.fn();
      render(<CheckboxField label="Accept terms" disabled onChange={onChange} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.disabled).toBe(true);
      await userEvent.tab();
      expect(document.activeElement).not.toBe(checkbox);
      await userEvent.click(checkbox, { force: true });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  // Rendered against the real stylesheet, driven by the Tailwind `peer-checked` /
  // `peer-indeterminate` CSS variants so the box tracks the real input state.
  describe('rendered design spec', () => {
    let noTransitions: HTMLStyleElement;

    beforeEach(() => {
      noTransitions = document.createElement('style');
      noTransitions.textContent = '*, *::before, *::after { transition: none !important; }';
      document.head.appendChild(noTransitions);
    });

    afterEach(() => {
      noTransitions.remove();
      document.documentElement.classList.remove('dark');
    });

    it('box uses the default border token until checked', () => {
      render(<CheckboxField label="Accept terms" />);
      const box = screen.getByRole('checkbox').nextElementSibling as HTMLElement;
      expect(getComputedStyle(box).borderColor).toBe(
        resolveToken('border-color', '--sds-color-border-default-default'),
      );
    });

    it('box fills with the brand tokens once checked', async () => {
      render(<CheckboxField label="Accept terms" />);
      const checkbox = screen.getByRole('checkbox');
      const box = checkbox.nextElementSibling as HTMLElement;
      await userEvent.click(checkbox);
      expect(getComputedStyle(box).backgroundColor).toBe(
        resolveToken('background-color', '--sds-color-background-brand-default'),
      );
      expect(getComputedStyle(box).borderColor).toBe(
        resolveToken('border-color', '--sds-color-border-brand-default'),
      );
    });

    it('box uses the danger border token when an error is set', () => {
      render(<CheckboxField label="Accept terms" error="Required" />);
      const box = screen.getByRole('checkbox').nextElementSibling as HTMLElement;
      expect(getComputedStyle(box).borderColor).toBe(
        resolveToken('border-color', '--sds-color-border-danger-default'),
      );
    });

    it('box uses the disabled tokens even when pre-checked', () => {
      render(<CheckboxField label="Accept terms" disabled defaultChecked />);
      const box = screen.getByRole('checkbox').nextElementSibling as HTMLElement;
      expect(getComputedStyle(box).backgroundColor).toBe(
        resolveToken('background-color', '--sds-color-background-disabled-default'),
      );
      expect(getComputedStyle(box).borderColor).toBe(
        resolveToken('border-color', '--sds-color-border-disabled-default'),
      );
    });

    it('flips the checked box tokens between light and dark mode', async () => {
      render(<CheckboxField label="Accept terms" defaultChecked />);
      const box = screen.getByRole('checkbox').nextElementSibling as HTMLElement;

      document.documentElement.classList.remove('dark');
      const light = getComputedStyle(box).backgroundColor;
      document.documentElement.classList.add('dark');
      const dark = getComputedStyle(box).backgroundColor;

      expect(dark).not.toBe(light);
    });
  });
});
