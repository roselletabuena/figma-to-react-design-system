import { createRef } from 'react';
import { afterEach, beforeEach, describe, it, expect } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { InputField } from './InputField';

const resolveColor = (token: string) => {
  const probe = document.createElement('div');
  probe.style.setProperty('color', `var(${token})`);
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return value;
};

describe('InputField', () => {
  let noTransitions: HTMLStyleElement;

  beforeEach(() => {
    // `transition-colors` makes getComputedStyle report a mid-transition colour after a theme
    // change. Disable it so assertions read the settled value.
    noTransitions = document.createElement('style');
    noTransitions.textContent = '*, *::before, *::after { transition: none !important; }';
    document.head.appendChild(noTransitions);
  });

  afterEach(() => {
    noTransitions.remove();
    document.documentElement.classList.remove('dark');
  });

  it('renders a text input labelled by its label', () => {
    render(<InputField label="Name" />);
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeDefined();
  });

  it('renders no label, description or error unless provided', () => {
    const { container } = render(<InputField aria-label="Bare" />);
    expect(container.querySelector('label')).toBeNull();
    expect(container.querySelectorAll('p')).toHaveLength(0);
  });

  it('links description and error to the input via aria-describedby', () => {
    render(<InputField label="Name" description="Helper" error="Required" invalid />);
    const input = screen.getByRole('textbox');
    const ids = input.getAttribute('aria-describedby')?.split(' ') ?? [];
    expect(ids).toHaveLength(2);
    expect(document.getElementById(ids[0])?.textContent).toBe('Helper');
    expect(document.getElementById(ids[1])?.textContent).toBe('Required');
    expect(input.getAttribute('aria-invalid')).toBe('true');
  });

  it('forwards its ref and HTML attributes', () => {
    const ref = createRef<HTMLInputElement>();
    render(<InputField ref={ref} placeholder="Value" name="n" />);
    expect(ref.current).toBe(screen.getByRole('textbox'));
    expect(ref.current?.getAttribute('name')).toBe('n');
  });

  it('accepts typing', async () => {
    render(<InputField label="Name" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    await userEvent.click(input);
    await userEvent.keyboard('hello');
    expect(input.value).toBe('hello');
  });

  it('is natively disabled when disabled', () => {
    render(<InputField label="Name" disabled />);
    expect((screen.getByRole('textbox') as HTMLInputElement).disabled).toBe(true);
  });

  describe('rendered design spec', () => {
    it('is 40px tall with 16px/12px padding, 8px radius and a 1px inset stroke', () => {
      render(<InputField label="Name" />);
      const style = getComputedStyle(screen.getByRole('textbox'));
      expect(parseFloat(style.height)).toBe(40);
      expect(parseFloat(style.paddingLeft)).toBe(16);
      expect(parseFloat(style.paddingTop)).toBe(12);
      expect(parseFloat(style.borderTopLeftRadius)).toBe(8);
      expect(style.boxShadow).toMatch(/0px 0px 0px 1px/);
    });

    it('stacks label and input on an 8px gap', () => {
      const { container } = render(<InputField label="Name" />);
      const style = getComputedStyle(container.firstElementChild as Element);
      expect(parseFloat(style.rowGap)).toBe(8);
    });

    it('uses the danger stroke and message colour when invalid', () => {
      render(<InputField label="Name" invalid error="Bad" />);
      expect(getComputedStyle(screen.getByText('Bad')).color).toBe(
        resolveColor('--sds-color-text-danger-default'),
      );
      expect(getComputedStyle(screen.getByRole('textbox')).boxShadow).toContain(
        resolveColor('--sds-color-border-danger-default'),
      );
    });

    it('uses disabled tokens when disabled', () => {
      render(<InputField label="Name" disabled />);
      const style = getComputedStyle(screen.getByRole('textbox'));
      expect(style.color).toBe(resolveColor('--sds-color-text-disabled-default'));
      expect(style.cursor).toBe('not-allowed');
      expect(getComputedStyle(screen.getByText('Name')).color).toBe(
        resolveColor('--sds-color-text-disabled-default'),
      );
    });

    it('flips colours between light and dark mode', () => {
      render(<InputField label="Name" />);
      const input = screen.getByRole('textbox');
      document.documentElement.classList.remove('dark');
      const light = getComputedStyle(input).backgroundColor;
      document.documentElement.classList.add('dark');
      expect(getComputedStyle(input).backgroundColor).not.toBe(light);
    });
  });
});
