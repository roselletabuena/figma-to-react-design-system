import { createRef } from 'react';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { ButtonDanger } from './ButtonDanger';
import type { ButtonDangerVariant } from './ButtonDanger.types';

/** Resolves a semantic token to the computed value it has right now (theme-aware). */
const resolveToken = (property: 'background-color' | 'color', token: string) => {
  const probe = document.createElement('div');
  probe.style.setProperty(property, `var(${token})`);
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).getPropertyValue(property);
  probe.remove();
  return value;
};

/** The colour of the 1px inset ring (Tailwind `ring-*`), read from the computed box-shadow. */
const ringColor = (el: Element) => {
  const shadow = getComputedStyle(el).boxShadow;
  return shadow.match(/(rgba?\([^)]*\)) 0px 0px 0px 1px inset/)?.[1] ?? shadow;
};

describe('ButtonDanger', () => {
  describe('rendering', () => {
    it('renders its label inside a native button', () => {
      render(<ButtonDanger>Delete</ButtonDanger>);
      expect(screen.getByRole('button', { name: 'Delete' })).toBeDefined();
    });

    it('defaults to a primary medium button of type "button"', () => {
      render(<ButtonDanger>Delete</ButtonDanger>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('type')).toBe('button');
      expect(button.className).toContain('bg-danger');
      expect(button.className).toContain('p-sds-300');
    });

    it('lets a consumer opt in to type="submit"', () => {
      render(<ButtonDanger type="submit">Delete</ButtonDanger>);
      expect(screen.getByRole('button').getAttribute('type')).toBe('submit');
    });

    it('merges a custom className and forwards HTML attributes', () => {
      render(
        <ButtonDanger className="custom" data-testid="button">
          Delete
        </ButtonDanger>,
      );
      const button = screen.getByTestId('button');
      expect(button.className).toContain('custom');
      expect(button.className).toContain('bg-danger');
    });

    it('forwards its ref to the button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<ButtonDanger ref={ref}>Delete</ButtonDanger>);
      expect(ref.current).toBe(screen.getByRole('button'));
    });
  });

  describe('icons', () => {
    it('renders no icon slots by default', () => {
      render(<ButtonDanger>Delete</ButtonDanger>);
      expect(document.querySelector('[aria-hidden="true"]')).toBeNull();
    });

    it('renders start and end icons around the label, hidden from assistive tech', () => {
      render(
        <ButtonDanger iconStart={<svg data-testid="start" />} iconEnd={<svg data-testid="end" />}>
          Delete
        </ButtonDanger>,
      );
      const button = screen.getByRole('button', { name: 'Delete' });
      const start = screen.getByTestId('start');
      const end = screen.getByTestId('end');
      expect(start.parentElement?.getAttribute('aria-hidden')).toBe('true');
      expect(end.parentElement?.getAttribute('aria-hidden')).toBe('true');
      expect(Array.from(button.childNodes).map((n) => n.textContent)).toEqual(['', 'Delete', '']);
      expect(button.firstElementChild).toBe(start.parentElement);
      expect(button.lastElementChild).toBe(end.parentElement);
    });
  });

  describe('interaction', () => {
    it('calls onClick when clicked', async () => {
      const onClick = vi.fn();
      render(<ButtonDanger onClick={onClick}>Delete</ButtonDanger>);
      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('activates from the keyboard', async () => {
      const onClick = vi.fn();
      render(<ButtonDanger onClick={onClick}>Delete</ButtonDanger>);
      await userEvent.tab();
      expect(document.activeElement).toBe(screen.getByRole('button'));
      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick or take focus when disabled', async () => {
      const onClick = vi.fn();
      render(
        <ButtonDanger disabled onClick={onClick}>
          Delete
        </ButtonDanger>,
      );
      const button = screen.getByRole('button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
      await userEvent.tab();
      expect(document.activeElement).not.toBe(button);
      await userEvent.click(button, { force: true });
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  // Rendered against the real stylesheet: values come from the Figma Button Danger spec
  // (component set 185:852).
  describe('rendered design spec', () => {
    let noTransitions: HTMLStyleElement;

    beforeEach(() => {
      // `transition-colors` makes getComputedStyle report a mid-transition colour right after a
      // hover or theme change. Disable it so assertions read the settled value.
      noTransitions = document.createElement('style');
      noTransitions.textContent = '*, *::before, *::after { transition: none !important; }';
      document.head.appendChild(noTransitions);
    });

    afterEach(() => {
      noTransitions.remove();
      document.documentElement.classList.remove('dark');
    });

    it.each([
      ['sm', 8, 32],
      ['md', 12, 40],
    ] as const)('%s has %ipx padding and is %ipx tall', (size, padding, height) => {
      render(
        <ButtonDanger size={size} data-testid="button">
          Button
        </ButtonDanger>,
      );
      const style = getComputedStyle(screen.getByTestId('button'));
      expect(parseFloat(style.paddingTop)).toBe(padding);
      expect(parseFloat(style.paddingLeft)).toBe(padding);
      expect(parseFloat(style.height)).toBe(height);
    });

    it('has an 8px radius, 8px gap, 16px slots and single-line body type', () => {
      render(
        <ButtonDanger iconStart={<svg data-testid="start" />} data-testid="button">
          Button
        </ButtonDanger>,
      );
      const style = getComputedStyle(screen.getByTestId('button'));
      expect(parseFloat(style.borderTopLeftRadius)).toBe(8);
      expect(parseFloat(style.columnGap)).toBe(8);
      expect(parseFloat(style.fontSize)).toBe(16);
      expect(parseFloat(style.lineHeight)).toBe(16);
      expect(style.boxShadow).toMatch(/0px 0px 0px 1px/);
      const slot = screen.getByTestId('start').parentElement as HTMLElement;
      expect(parseFloat(getComputedStyle(slot).width)).toBe(16);
    });

    it('primary uses the danger fill, on-danger text and secondary danger stroke', () => {
      render(<ButtonDanger data-testid="button">Button</ButtonDanger>);
      const style = getComputedStyle(screen.getByTestId('button'));
      expect(style.backgroundColor).toBe(
        resolveToken('background-color', '--sds-color-background-danger-default'),
      );
      expect(style.color).toBe(resolveToken('color', '--sds-color-text-danger-on-danger'));
      expect(ringColor(screen.getByTestId('button'))).toBe(
        resolveToken('color', '--sds-color-border-danger-secondary'),
      );
    });

    it('subtle is transparent with danger text and no visible stroke', () => {
      render(
        <ButtonDanger variant="subtle" data-testid="button">
          Button
        </ButtonDanger>,
      );
      const style = getComputedStyle(screen.getByTestId('button'));
      expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
      expect(style.color).toBe(resolveToken('color', '--sds-color-text-danger-default'));
      expect(ringColor(screen.getByTestId('button'))).toBe('rgba(0, 0, 0, 0)');
    });

    it.each([
      ['primary', '--sds-color-background-danger-hover'],
      ['subtle', '--sds-color-background-danger-tertiary-hover'],
    ] as [ButtonDangerVariant, string][])('%s hover uses %s and a danger stroke', async (variant, bgToken) => {
      render(
        <ButtonDanger variant={variant} data-testid="button">
          Button
        </ButtonDanger>,
      );
      const button = screen.getByTestId('button');
      await userEvent.hover(button);
      expect(getComputedStyle(button).backgroundColor).toBe(resolveToken('background-color', bgToken));
      expect(ringColor(button)).toBe(resolveToken('color', '--sds-color-border-danger-default'));
    });

    it.each(['primary', 'subtle'] as const)('%s disabled looks identical and ignores hover', async (variant) => {
      render(
        <ButtonDanger variant={variant} disabled data-testid="button">
          Button
        </ButtonDanger>,
      );
      const button = screen.getByTestId('button');
      await userEvent.hover(button, { force: true });
      const style = getComputedStyle(button);
      expect(style.backgroundColor).toBe(
        resolveToken('background-color', '--sds-color-background-disabled-default'),
      );
      expect(style.color).toBe(resolveToken('color', '--sds-color-text-disabled-default'));
      expect(ringColor(button)).toBe(resolveToken('color', '--sds-color-border-disabled-default'));
    });

    it('flips the danger fill in dark mode', () => {
      render(<ButtonDanger data-testid="button">Button</ButtonDanger>);
      const button = screen.getByTestId('button');
      const light = getComputedStyle(button).backgroundColor;
      document.documentElement.classList.add('dark');
      const dark = getComputedStyle(button).backgroundColor;
      expect(dark).toBe(resolveToken('background-color', '--sds-color-background-danger-default'));
      expect(dark).not.toBe(light);
    });
  });
});
