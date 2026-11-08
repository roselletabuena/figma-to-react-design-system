import { createRef } from 'react';
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { IconButton } from './IconButton';
import type { IconButtonVariant } from './IconButton.types';

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

const Icon = () => <svg data-testid="icon" viewBox="0 0 20 20" />;

describe('IconButton', () => {
  describe('rendering', () => {
    it('renders an icon-only native button named by its aria-label', () => {
      render(<IconButton icon={<Icon />} aria-label="Favorite" />);
      expect(screen.getByRole('button', { name: 'Favorite' })).toBeDefined();
      expect(screen.getByTestId('icon')).toBeDefined();
    });

    it('defaults to a primary medium button of type "button"', () => {
      render(<IconButton icon={<Icon />} aria-label="Favorite" />);
      const button = screen.getByRole('button');
      expect(button.getAttribute('type')).toBe('button');
      expect(button.className).toContain('bg-brand');
      expect(button.className).toContain('p-sds-300');
    });

    it('lets a consumer opt in to type="submit"', () => {
      render(<IconButton icon={<Icon />} aria-label="Save" type="submit" />);
      expect(screen.getByRole('button').getAttribute('type')).toBe('submit');
    });

    it('merges a custom className and forwards HTML attributes', () => {
      render(
        <IconButton icon={<Icon />} aria-label="Favorite" className="custom" data-testid="button" />,
      );
      const button = screen.getByTestId('button');
      expect(button.className).toContain('custom');
      expect(button.className).toContain('bg-brand');
    });

    it('forwards its ref to the button element', () => {
      const ref = createRef<HTMLButtonElement>();
      render(<IconButton ref={ref} icon={<Icon />} aria-label="Favorite" />);
      expect(ref.current).toBe(screen.getByRole('button'));
    });
  });

  describe('icon', () => {
    it('renders the icon in a slot hidden from assistive technology', () => {
      render(<IconButton icon={<Icon />} aria-label="Favorite" />);
      const slot = screen.getByTestId('icon').parentElement;
      expect(slot?.getAttribute('aria-hidden')).toBe('true');
      expect(slot?.parentElement).toBe(screen.getByRole('button'));
    });
  });

  describe('interaction', () => {
    it('calls onClick when clicked', async () => {
      const onClick = vi.fn();
      render(<IconButton icon={<Icon />} aria-label="Favorite" onClick={onClick} />);
      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('activates from the keyboard', async () => {
      const onClick = vi.fn();
      render(<IconButton icon={<Icon />} aria-label="Favorite" onClick={onClick} />);
      await userEvent.tab();
      expect(document.activeElement).toBe(screen.getByRole('button'));
      await userEvent.keyboard('{Enter}');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick or take focus when disabled', async () => {
      const onClick = vi.fn();
      render(<IconButton icon={<Icon />} aria-label="Favorite" disabled onClick={onClick} />);
      const button = screen.getByRole('button') as HTMLButtonElement;
      expect(button.disabled).toBe(true);
      await userEvent.tab();
      expect(document.activeElement).not.toBe(button);
      await userEvent.click(button, { force: true });
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  // Rendered against the real stylesheet: values come from the Figma Icon Button spec
  // (component set 11:11508).
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
      ['primary', 'sm', 8, 36],
      ['neutral', 'sm', 8, 36],
      ['subtle', 'sm', 8, 36],
      ['primary', 'md', 12, 44],
      ['neutral', 'md', 12, 44],
    ] as const)('%s %s has %ipx padding and is a %ipx square', (variant, size, padding, edge) => {
      render(
        <IconButton
          variant={variant}
          size={size}
          icon={<Icon />}
          aria-label="Favorite"
          data-testid="button"
        />,
      );
      const style = getComputedStyle(screen.getByTestId('button'));
      expect(parseFloat(style.paddingTop)).toBe(padding);
      expect(parseFloat(style.paddingLeft)).toBe(padding);
      // The 1px stroke is inside the frame in Figma, so it must not add to the size.
      expect(parseFloat(style.width)).toBe(edge);
      expect(parseFloat(style.height)).toBe(edge);
    });

    it('subtle medium is a fixed 40px square, as drawn in Figma', () => {
      render(
        <IconButton
          variant="subtle"
          size="md"
          icon={<Icon />}
          aria-label="Favorite"
          data-testid="button"
        />,
      );
      const style = getComputedStyle(screen.getByTestId('button'));
      expect(parseFloat(style.width)).toBe(40);
      expect(parseFloat(style.height)).toBe(40);
    });

    it('centres a 20px icon slot and stretches the svg to fill it', () => {
      render(<IconButton icon={<Icon />} aria-label="Favorite" data-testid="button" />);
      const style = getComputedStyle(screen.getByTestId('button'));
      expect(style.display).toBe('inline-flex');
      expect(style.alignItems).toBe('center');
      expect(style.justifyContent).toBe('center');
      const slot = screen.getByTestId('icon').parentElement as HTMLElement;
      expect(parseFloat(getComputedStyle(slot).width)).toBe(20);
      expect(parseFloat(getComputedStyle(slot).height)).toBe(20);
      expect(parseFloat(getComputedStyle(screen.getByTestId('icon')).width)).toBe(20);
    });

    it('is fully round with a 1px inset stroke', () => {
      render(<IconButton icon={<Icon />} aria-label="Favorite" data-testid="button" />);
      const style = getComputedStyle(screen.getByTestId('button'));
      // Any radius of at least half the edge renders a circle.
      expect(parseFloat(style.borderTopLeftRadius)).toBeGreaterThanOrEqual(22);
      expect(style.boxShadow).toContain('inset');
      expect(style.boxShadow).toMatch(/0px 0px 0px 1px/);
    });

    it.each([
      [
        'primary',
        '--sds-color-background-brand-default',
        '--sds-color-icon-brand-on-brand',
        '--sds-color-border-brand-default',
      ],
      [
        'neutral',
        '--sds-color-background-default-secondary',
        '--sds-color-icon-default-default',
        '--sds-color-border-default-default',
      ],
    ] as const)('%s uses its semantic fill, icon and stroke tokens', (variant, bg, icon, ring) => {
      render(
        <IconButton
          variant={variant}
          icon={<Icon />}
          aria-label="Favorite"
          data-testid="button"
        />,
      );
      const button = screen.getByTestId('button');
      const style = getComputedStyle(button);
      expect(style.backgroundColor).toBe(resolveToken('background-color', bg));
      expect(style.color).toBe(resolveColor(icon));
      expect(ringColor(button)).toBe(resolveColor(ring));
    });

    it('subtle is transparent with no visible stroke until hovered', () => {
      render(
        <IconButton
          variant="subtle"
          icon={<Icon />}
          aria-label="Favorite"
          data-testid="button"
        />,
      );
      const button = screen.getByTestId('button');
      const style = getComputedStyle(button);
      expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
      expect(style.color).toBe(resolveColor('--sds-color-icon-default-default'));
      expect(ringColor(button)).toBe('rgba(0, 0, 0, 0)');
    });

    it.each([
      ['primary', '--sds-color-background-brand-hover'],
      ['neutral', '--sds-color-background-default-secondary-hover'],
      ['subtle', '--sds-color-background-default-default-hover'],
    ] as const)('%s changes its fill on hover', async (variant, hoverToken) => {
      render(
        <IconButton
          variant={variant}
          icon={<Icon />}
          aria-label="Favorite"
          data-testid="button"
        />,
      );
      const button = screen.getByTestId('button');
      const before = getComputedStyle(button).backgroundColor;
      await userEvent.hover(button);
      const after = getComputedStyle(button).backgroundColor;
      expect(after).toBe(resolveToken('background-color', hoverToken));
      expect(after).not.toBe(before);
    });

    it('subtle gains no stroke on hover', async () => {
      render(
        <IconButton
          variant="subtle"
          icon={<Icon />}
          aria-label="Favorite"
          data-testid="button"
        />,
      );
      const button = screen.getByTestId('button');
      await userEvent.hover(button);
      expect(ringColor(button)).toBe('rgba(0, 0, 0, 0)');
    });

    it.each(['primary', 'neutral', 'subtle'] as IconButtonVariant[])(
      '%s is styled identically when disabled, and ignores hover',
      async (variant) => {
        render(
          <IconButton
            variant={variant}
            icon={<Icon />}
            aria-label="Favorite"
            disabled
            data-testid="button"
          />,
        );
        const button = screen.getByTestId('button');
        const read = () => ({
          background: getComputedStyle(button).backgroundColor,
          icon: getComputedStyle(button).color,
          ring: ringColor(button),
          cursor: getComputedStyle(button).cursor,
        });

        const resting = read();
        expect(resting.background).toBe(
          resolveToken('background-color', '--sds-color-background-disabled-default'),
        );
        expect(resting.icon).toBe(resolveColor('--sds-color-icon-disabled-default'));
        expect(resting.ring).toBe(resolveColor('--sds-color-border-disabled-default'));
        expect(resting.cursor).toBe('not-allowed');

        await userEvent.hover(button, { force: true });
        expect(read()).toEqual(resting);
      },
    );

    it('flips every variant between light and dark mode', () => {
      const variants: IconButtonVariant[] = ['primary', 'neutral'];
      render(
        <>
          {variants.map((variant) => (
            <IconButton
              key={variant}
              variant={variant}
              icon={<Icon />}
              aria-label={variant}
              data-testid={variant}
            />
          ))}
        </>,
      );
      const read = (variant: IconButtonVariant) => {
        const style = getComputedStyle(screen.getByTestId(variant));
        return { background: style.backgroundColor, icon: style.color };
      };

      for (const variant of variants) {
        document.documentElement.classList.remove('dark');
        const light = read(variant);
        document.documentElement.classList.add('dark');
        const dark = read(variant);
        expect(dark.background).not.toBe(light.background);
        expect(dark.icon).not.toBe(light.icon);
      }
    });
  });
});
