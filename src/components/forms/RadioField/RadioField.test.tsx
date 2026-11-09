import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { createRef } from 'react';
import '../../../index.css';
import { RadioField } from './RadioField';

/** Resolves a semantic token to the computed value it has right now (theme-aware). */
const resolveToken = (property: 'background-color' | 'color', token: string) => {
  const probe = document.createElement('div');
  probe.style.setProperty(property, `var(${token})`);
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).getPropertyValue(property);
  probe.remove();
  return value;
};

describe('RadioField', () => {
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

  describe('rendering', () => {
    it('renders label and description correctly', () => {
      render(<RadioField label="Option 1" description="Additional info" />);
      expect(screen.getByText('Option 1')).toBeDefined();
      expect(screen.getByText('Additional info')).toBeDefined();
    });

    it('renders label passed via children', () => {
      render(<RadioField>Option Child</RadioField>);
      expect(screen.getByText('Option Child')).toBeDefined();
    });

    it('hides description when hasDescription is false', () => {
      render(<RadioField label="Option 1" description="Additional info" hasDescription={false} />);
      expect(screen.getByText('Option 1')).toBeDefined();
      expect(screen.queryByText('Additional info')).toBeNull();
    });

    it('hides description when description is omitted', () => {
      render(<RadioField label="Option 1" />);
      expect(screen.getByText('Option 1')).toBeDefined();
    });
  });

  describe('accessibility', () => {
    it('associates input with label using htmlFor', () => {
      render(<RadioField label="Accessible Radio" id="radio-test-id" />);
      const radio = screen.getByRole('radio', { name: 'Accessible Radio' });
      expect(radio).toBeDefined();
      expect(radio.getAttribute('id')).toBe('radio-test-id');
    });

    it('links description with aria-describedby', () => {
      render(<RadioField label="Radio" description="Help text" id="my-radio" />);
      const radio = screen.getByRole('radio');
      const desc = screen.getByText('Help text');
      expect(radio.getAttribute('aria-describedby')).toBe('my-radio-description');
      expect(desc.getAttribute('id')).toBe('my-radio-description');
    });

    it('does not set aria-describedby when description is omitted or disabled', () => {
      render(<RadioField label="Radio" id="my-radio" />);
      const radio = screen.getByRole('radio');
      expect(radio.getAttribute('aria-describedby')).toBeNull();
    });
  });

  describe('interaction', () => {
    it('toggles checked state when clicked in uncontrolled mode', () => {
      render(<RadioField label="Option 1" defaultChecked={false} />);
      const radio = screen.getByRole('radio') as HTMLInputElement;
      expect(radio.checked).toBe(false);

      fireEvent.click(screen.getByText('Option 1'));
      expect(radio.checked).toBe(true);
    });

    it('calls onChange when clicked', () => {
      const handleChange = vi.fn();
      render(<RadioField label="Option 1" onChange={handleChange} />);
      fireEvent.click(screen.getByRole('radio'));
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it('does not call onChange when disabled', () => {
      const handleChange = vi.fn();
      render(<RadioField label="Option 1" disabled onChange={handleChange} />);
      const radio = screen.getByRole('radio') as HTMLInputElement;
      expect(radio.disabled).toBe(true);

      fireEvent.click(radio);
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('props passthrough', () => {
    it('forwards ref to the native input element', () => {
      const ref = createRef<HTMLInputElement>();
      render(<RadioField ref={ref} label="Radio ref" />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('merges custom className on root element', () => {
      render(<RadioField label="Option" className="custom-root-class" data-testid="radio-root" />);
      const labelEl = screen.getByText('Option').closest('label');
      expect(labelEl?.className).toContain('custom-root-class');
    });

    it('passes through input attributes like name and value', () => {
      render(<RadioField label="Option" name="group-1" value="opt-val" />);
      const radio = screen.getByRole('radio') as HTMLInputElement;
      expect(radio.name).toBe('group-1');
      expect(radio.value).toBe('opt-val');
    });
  });

  describe('rendered design spec & theme', () => {
    it('applies semantic text tokens and cursor when enabled', () => {
      render(<RadioField label="Option" description="Desc" />);
      const labelText = screen.getByText('Option');
      const descText = screen.getByText('Desc');
      const rootLabel = labelText.closest('label');

      expect(labelText.className).toContain('text-text-default');
      expect(descText.className).toContain('text-text-secondary');
      expect(rootLabel?.className).toContain('cursor-pointer');
    });

    it('applies disabled text tokens and cursor when disabled', () => {
      render(<RadioField label="Option" description="Desc" disabled />);
      const labelText = screen.getByText('Option');
      const descText = screen.getByText('Desc');
      const rootLabel = labelText.closest('label');

      expect(labelText.className).toContain('text-text-disabled');
      expect(descText.className).toContain('text-text-disabled');
      expect(rootLabel?.className).toContain('cursor-not-allowed');
    });

    it('uses semantic tokens that flip in dark mode', () => {
      render(<RadioField label="Option" description="Desc" />);
      const labelText = screen.getByText('Option');
      const descText = screen.getByText('Desc');

      const readColors = () => ({
        label: getComputedStyle(labelText).color,
        description: getComputedStyle(descText).color,
      });

      const light = readColors();
      expect(light.label).toBe(resolveToken('color', '--sds-color-text-default-default'));
      expect(light.description).toBe(resolveToken('color', '--sds-color-text-default-secondary'));

      document.documentElement.classList.add('dark');
      const dark = readColors();
      expect(dark.label).toBe(resolveToken('color', '--sds-color-text-default-default'));
      expect(dark.description).toBe(resolveToken('color', '--sds-color-text-default-secondary'));
      expect(dark.label).not.toBe(light.label);
      expect(dark.description).not.toBe(light.description);
    });
  });
});
