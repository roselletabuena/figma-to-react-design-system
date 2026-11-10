import { afterEach, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { Avatar } from '../Avatar';
import { AvatarGroup } from './AvatarGroup';

/** Resolves a semantic token to the computed value it has right now (theme-aware). */
const resolveToken = (property: 'background-color' | 'color', token: string) => {
  const probe = document.createElement('div');
  probe.style.setProperty(property, `var(${token})`);
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).getPropertyValue(property);
  probe.remove();
  return value;
};

describe('AvatarGroup', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  describe('rendering and structure', () => {
    it('renders child avatars and group container', () => {
      render(
        <AvatarGroup data-testid="group">
          <Avatar initials="A" />
          <Avatar initials="B" />
        </AvatarGroup>
      );
      expect(screen.getByRole('group')).toBeDefined();
      expect(screen.getByText('A')).toBeDefined();
      expect(screen.getByText('B')).toBeDefined();
    });

    it('renders with role="group" and forwards HTML attributes', () => {
      render(
        <AvatarGroup aria-label="Team members" className="custom-class" data-testid="group">
          <Avatar initials="A" />
        </AvatarGroup>
      );
      const group = screen.getByTestId('group');
      expect(group.getAttribute('aria-label')).toBe('Team members');
      expect(group.className).toContain('custom-class');
    });
  });

  describe('spacing variants', () => {
    it('applies overlap classes by default', () => {
      render(
        <AvatarGroup data-testid="group">
          <Avatar initials="A" />
          <Avatar initials="B" />
        </AvatarGroup>
      );
      const group = screen.getByTestId('group');
      expect(group.className).toContain('gap-sds-200');

      const avatarsSlot = group.firstElementChild as HTMLElement;
      expect(avatarsSlot.className).toContain('-space-x-sds-200');
      expect(avatarsSlot.className).toContain('*:shadow-sds-200');
    });

    it('applies spaced classes when spacing="spaced"', () => {
      render(
        <AvatarGroup spacing="spaced" data-testid="group">
          <Avatar initials="A" />
          <Avatar initials="B" />
        </AvatarGroup>
      );
      const group = screen.getByTestId('group');
      expect(group.className).toContain('gap-sds-100');

      const avatarsSlot = group.firstElementChild as HTMLElement;
      expect(avatarsSlot.className).toContain('gap-sds-100');
      expect(avatarsSlot.className).not.toContain('-space-x-sds-200');
      expect(avatarsSlot.className).not.toContain('*:shadow-sds-200');
    });

    it.each([
      ['sm', '-space-x-sds-100', 'gap-sds-100'],
      ['md', '-space-x-sds-150', 'gap-sds-150'],
      ['lg', '-space-x-sds-200', 'gap-sds-200'],
    ] as const)('scales overlap spacing and parent gap at %s size', (size, overlapClass, gapClass) => {
      render(
        <AvatarGroup size={size} spacing="overlap" data-testid="group">
          <Avatar initials="A" />
          <Avatar initials="B" />
        </AvatarGroup>
      );
      const group = screen.getByTestId('group');
      expect(group.className).toContain(gapClass);
      const avatarsSlot = group.firstElementChild as HTMLElement;
      expect(avatarsSlot.className).toContain(overlapClass);
    });
  });

  describe('overflow indicator', () => {
    it('renders default overflow indicator (+1) when showOverflow is true', () => {
      render(
        <AvatarGroup>
          <Avatar initials="A" />
        </AvatarGroup>
      );
      const overflow = screen.getByText('+1');
      expect(overflow).toBeDefined();
      expect(overflow.getAttribute('aria-label')).toBe('+1 more');
    });

    it('renders custom number text', () => {
      render(
        <AvatarGroup number="+99">
          <Avatar initials="A" />
        </AvatarGroup>
      );
      const overflow = screen.getByText('+99');
      expect(overflow).toBeDefined();
      expect(overflow.getAttribute('aria-label')).toBe('+99 more');
    });

    it('renders custom overflow ReactNode', () => {
      render(
        <AvatarGroup overflow={<span data-testid="custom-overflow">More</span>}>
          <Avatar initials="A" />
        </AvatarGroup>
      );
      expect(screen.getByTestId('custom-overflow')).toBeDefined();
    });

    it('hides overflow indicator when showOverflow is false', () => {
      render(
        <AvatarGroup showOverflow={false}>
          <Avatar initials="A" />
        </AvatarGroup>
      );
      expect(screen.queryByText('+1')).toBeNull();
    });
  });

  describe('size propagation', () => {
    it('propagates size prop to child avatars without explicit size', () => {
      render(
        <AvatarGroup size="sm">
          <Avatar initials="A" />
          <Avatar initials="B" />
        </AvatarGroup>
      );
      expect(screen.getByText('A').className).toContain('size-sds-icon-small');
      expect(screen.getByText('B').className).toContain('size-sds-icon-small');
    });

    it('propagates size prop to child avatars inside a fragment', () => {
      render(
        <AvatarGroup size="sm">
          <>
            <Avatar initials="A" />
            <Avatar initials="B" />
          </>
        </AvatarGroup>
      );
      expect(screen.getByText('A').className).toContain('size-sds-icon-small');
      expect(screen.getByText('B').className).toContain('size-sds-icon-small');
    });

    it('does not override explicit child size', () => {
      render(
        <AvatarGroup size="sm">
          <Avatar initials="A" size="lg" />
          <Avatar initials="B" />
        </AvatarGroup>
      );
      expect(screen.getByText('A').className).toContain('size-sds-icon-large');
      expect(screen.getByText('B').className).toContain('size-sds-icon-small');
    });
  });

  describe('rendered design spec', () => {
    it('uses semantic secondary surface and text tokens, flipping in dark mode', () => {
      render(
        <AvatarGroup number="+1">
          <Avatar initials="A" />
        </AvatarGroup>
      );
      const overflowBadge = screen.getByText('+1');

      const read = () => {
        const style = getComputedStyle(overflowBadge);
        return { background: style.backgroundColor, text: style.color };
      };

      const light = read();
      expect(light.background).toBe(
        resolveToken('background-color', '--sds-color-background-default-secondary')
      );
      expect(light.text).toBe(resolveToken('color', '--sds-color-text-default-default'));

      document.documentElement.classList.add('dark');
      const dark = read();
      expect(dark.background).toBe(
        resolveToken('background-color', '--sds-color-background-default-secondary')
      );
      expect(dark.text).toBe(resolveToken('color', '--sds-color-text-default-default'));
      expect(dark.background).not.toBe(light.background);
      expect(dark.text).not.toBe(light.text);
    });

    it('applies 8px radius and 14px body font to overflow indicator at large size', () => {
      render(
        <AvatarGroup number="+1" size="lg">
          <Avatar initials="A" />
        </AvatarGroup>
      );
      const style = getComputedStyle(screen.getByText('+1'));
      expect(parseFloat(style.borderTopLeftRadius)).toBe(8);
      expect(parseFloat(style.fontSize)).toBe(14);
    });

    it('applies 8px gap for overlap and 4px gap for spaced at large size', () => {
      const { rerender } = render(
        <AvatarGroup spacing="overlap" size="lg" data-testid="group">
          <Avatar initials="A" />
        </AvatarGroup>
      );
      let style = getComputedStyle(screen.getByTestId('group'));
      expect(parseFloat(style.gap)).toBe(8);

      rerender(
        <AvatarGroup spacing="spaced" size="lg" data-testid="group">
          <Avatar initials="A" />
        </AvatarGroup>
      );
      style = getComputedStyle(screen.getByTestId('group'));
      expect(parseFloat(style.gap)).toBe(4);
    });
  });
});
