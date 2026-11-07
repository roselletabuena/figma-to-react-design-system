import { createRef } from 'react';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { Button } from './Button';
import type { ButtonVariant } from './Button.types';

/** Resolves a semantic token to the computed value it has right now (theme-aware). */
const resolveToken = (property: 'background-color' | 'color', token: string) => {
  const probe = document.createElement('div');
  probe.style.setProperty(property, `var(${token})`);
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).getPropertyValue(property);
  probe.remove();
  return value;
};

/**
 * The colour of the 1px inset ring (Tailwind `ring-*`), read from the computed box-shadow.
 * Tailwind's shadow stack also carries empty `0 0 #0000` layers, so pick the 1px inset one.
 */
const ringColor = (el: Element) => {
  const shadow = getComputedStyle(el).boxShadow;
  // Computed layer form: "rgb(r, g, b) 0px 0px 0px 1px inset"
  return shadow.match(/(rgba?\([^)]*\)) 0px 0px 0px 1px inset/)?.[1] ?? shadow;
};

/** Resolves a token to the colour string `getComputedStyle` reports for it. */
const resolveColor = (token: string) => resolveToken('color', token);

describe('Button', () => {
  describe('rendering', () => {
    it('renders its label inside a native button', () => {
      render(<Button>Save</Button>);
      expect(screen.getByRole('button', { name: 'Save' })).toBeDefined();
    });

    it('defaults to a primary medium button of type "button"', () => {
      render(<Button>Save</Button>);
      const button = screen.getByRole('button');
      expect(button.getAttribute('type')).toBe('button');
      expect(button.className).toContain('bg-brand');
      expect(button.className).toContain('p-sds-300');
    });

    it('lets a consumer opt in to type="submit"', () => {
      render(<Button type="submit">Save</Button>);
      expect(screen.getByRole('button').getAttribute('type')).toBe('submit');
    });

    it('merges a custom className and forwards HTML attributes', () => {
      render(
        <Button className="custom" data-testid="button">
          Save
        </Button>,
      );
      const button = screen.getByTestId('button');
      expect(button.className).toContain('custom');
      expect(button.className).toContain('bg-brand');
    });

    it('forwards its ref to the button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<Button ref={ref}>Save</Button>);
      expect(ref.current).toBe(screen.getByRole('button'));
    });
  });

  describe('icons', () => {
    it('renders no icon slots by default', () => {
      render(<Button>Save</Button>);
      expect(document.querySelector('[aria-hidden="true"]')).toBeNull();
    });

    it('renders start and end icons around the label, hidden from assistive tech', () => {
      render(
        <Button iconStart={<svg data-testid="start" />} iconEnd={<svg data-testid="end" />}>
          Save
        </Button>,
      );
      const button = screen.getByRole('button', { name: 'Save' });
      const start = screen.getByTestId('start');
      const end = screen.getByTestId('end');
      expect(start.parentElement?.getAttribute('aria-hidden')).toBe('true');
      expect(end.parentElement?.getAttribute('aria-hidden')).toBe('true');
      // Order is start icon, label, end icon.
      expect(Array.from(button.childNodes).map((n) => n.textContent)).toEqual(['', 'Save', '']);
      expect(button.firstElementChild).toBe(start.parentElement);
      expect(button.lastElementChild).toBe(end.parentElement);
    });

    it('can show just one icon', () => {
      render(<Button iconEnd={<svg data-testid="end" />}>Next</Button>);
      expect(document.querySelectorAll('[aria-hidden="true"]')).toHaveLength(1);
    });
  });

  describe('interaction', () => {
    it('calls onClick when clicked', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Save</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('activates from the keyboard', async () => {
      const onClick = vi.fn();
      render(<Button onClick={onClick}>Save</Button>);
      await userEvent.tab();
      expect(document.activeElement).toBe(screen.getByRole('button'));
      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick or take focus when disabled', async () => {
      const onClick = vi.fn();
      render(
        <Button disabled onClick={onClick}>
          Save
        </Button>,
      );
      const button = screen.getByRole('button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
      await userEvent.tab();
      expect(document.activeElement).not.toBe(button);
      await userEvent.click(button, { force: true });
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  // Rendered against the real stylesheet: values come from the Figma Button spec
  // (component set 4185:3778).
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
        <Button size={size} data-testid="button">
          Button
        </Button>,
      );
      const style = getComputedStyle(screen.getByTestId('button'));
      expect(parseFloat(style.paddingTop)).toBe(padding);
      expect(parseFloat(style.paddingLeft)).toBe(padding);
      // The 1px stroke is inside the frame in Figma, so it must not add to the height.
      expect(parseFloat(style.height)).toBe(height);
    });

    it('lays out icon, label and icon on an 8px gap with 16px icon slots', () => {
      render(
        <Button iconStart={<svg data-testid="start" />} iconEnd={<svg />} data-testid="button">
          Button
        </Button>,
      );
      const style = getComputedStyle(screen.getByTestId('button'));
      expect(style.display).toBe('inline-flex');
      expect(parseFloat(style.columnGap)).toBe(8);
      expect(style.alignItems).toBe('center');
      expect(style.justifyContent).toBe('center');
      const slot = screen.getByTestId('start').parentElement as HTMLElement;
      expect(parseFloat(getComputedStyle(slot).width)).toBe(16);
      expect(parseFloat(getComputedStyle(slot).height)).toBe(16);
      // The svg fills the slot even without explicit dimensions.
      expect(parseFloat(getComputedStyle(screen.getByTestId('start')).width)).toBe(16);
    });

    it('has an 8px corner radius and a 1px stroke', () => {
      render(<Button data-testid="button">Button</Button>);
      const style = getComputedStyle(screen.getByTestId('button'));
      expect(parseFloat(style.borderTopLeftRadius)).toBe(8);
      expect(style.boxShadow).toContain('inset');
      expect(style.boxShadow).toMatch(/0px 0px 0px 1px/);
    });

    it('uses the single-line body type: 16px at 100% line height', () => {
      render(<Button data-testid="button">Button</Button>);
      const style = getComputedStyle(screen.getByTestId('button'));
      expect(parseFloat(style.fontSize)).toBe(16);
      expect(parseFloat(style.lineHeight)).toBe(16);
      expect(style.fontWeight).toBe('400');
    });

    it.each([
      [
        'primary',
        '--sds-color-background-brand-default',
        '--sds-color-text-brand-on-brand',
        '--sds-color-border-brand-default',
      ],
      [
        'neutral',
        '--sds-color-background-neutral-tertiary',
        '--sds-color-text-default-default',
        '--sds-color-border-neutral-secondary',
      ],
    ] as const)('%s uses its semantic fill, text and stroke tokens', (variant, bg, text, ring) => {
      render(
        <Button variant={variant} data-testid="button">
          Button
        </Button>,
      );
      const button = screen.getByTestId('button');
      const style = getComputedStyle(button);
      expect(style.backgroundColor).toBe(resolveToken('background-color', bg));
      expect(style.color).toBe(resolveColor(text));
      expect(ringColor(button)).toBe(resolveColor(ring));
    });

    it('subtle is transparent with no visible stroke until hovered', () => {
      render(
        <Button variant="subtle" data-testid="button">
          Button
        </Button>,
      );
      const button = screen.getByTestId('button');
      const style = getComputedStyle(button);
      expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
      expect(style.color).toBe(resolveColor('--sds-color-text-default-default'));
      expect(ringColor(button)).toBe('rgba(0, 0, 0, 0)');
    });

    it.each([
      ['primary', '--sds-color-background-brand-hover'],
      ['neutral', '--sds-color-background-neutral-tertiary-hover'],
    ] as const)('%s changes its fill on hover', async (variant, hoverToken) => {
      render(
        <Button variant={variant} data-testid="button">
          Button
        </Button>,
      );
      const button = screen.getByTestId('button');
      const before = getComputedStyle(button).backgroundColor;
      await userEvent.hover(button);
      const after = getComputedStyle(button).backgroundColor;
      expect(after).toBe(resolveToken('background-color', hoverToken));
      expect(after).not.toBe(before);
    });

    it('subtle gains a stroke on hover and keeps a transparent fill', async () => {
      render(
        <Button variant="subtle" data-testid="button">
          Button
        </Button>,
      );
      const button = screen.getByTestId('button');
      await userEvent.hover(button);
      expect(ringColor(button)).toBe(resolveColor('--sds-color-border-default-default'));
      expect(getComputedStyle(button).backgroundColor).toBe('rgba(0, 0, 0, 0)');
    });

    it.each(['primary', 'neutral', 'subtle'] as ButtonVariant[])(
      '%s is styled identically when disabled, and ignores hover',
      async (variant) => {
        render(
          <Button variant={variant} disabled data-testid="button">
            Button
          </Button>,
        );
        const button = screen.getByTestId('button');
        const read = () => ({
          background: getComputedStyle(button).backgroundColor,
          text: getComputedStyle(button).color,
          ring: ringColor(button),
          cursor: getComputedStyle(button).cursor,
        });

        const resting = read();
        expect(resting.background).toBe(
          resolveToken('background-color', '--sds-color-background-disabled-default'),
        );
        expect(resting.text).toBe(resolveColor('--sds-color-text-disabled-default'));
        expect(resting.ring).toBe(resolveColor('--sds-color-border-disabled-default'));
        expect(resting.cursor).toBe('not-allowed');

        await userEvent.hover(button, { force: true });
        expect(read()).toEqual(resting);
      },
    );

    it('flips every variant between light and dark mode', () => {
      const variants: ButtonVariant[] = ['primary', 'neutral'];
      render(
        <>
          {variants.map((variant) => (
            <Button key={variant} variant={variant} data-testid={variant}>
              Button
            </Button>
          ))}
        </>,
      );
      const read = (variant: ButtonVariant) => {
        const style = getComputedStyle(screen.getByTestId(variant));
        return { background: style.backgroundColor, text: style.color };
      };

      for (const variant of variants) {
        document.documentElement.classList.remove('dark');
        const light = read(variant);
        document.documentElement.classList.add('dark');
        const dark = read(variant);
        expect(dark.background).not.toBe(light.background);
        expect(dark.text).not.toBe(light.text);
      }
    });
  });
});
