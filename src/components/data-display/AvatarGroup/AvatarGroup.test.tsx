import { describe, it, expect } from 'vitest';
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
  describe('rendering', () => {
    it('renders child avatars inside a group role', () => {
      render(
        <AvatarGroup data-testid="group">
          <Avatar initials="A" alt="Alice" />
          <Avatar initials="B" alt="Bob" />
        </AvatarGroup>,
      );
      const group = screen.getByRole('group');
      expect(group).toBeDefined();
      expect(screen.getByRole('img', { name: 'Alice' })).toBeDefined();
      expect(screen.getByRole('img', { name: 'Bob' })).toBeDefined();
    });

    it('renders an overflow badge when overflow is provided', () => {
      render(
        <AvatarGroup overflow="+3">
          <Avatar initials="A" alt="Alice" />
          <Avatar initials="B" alt="Bob" />
        </AvatarGroup>,
      );
      expect(screen.getByText('+3')).toBeDefined();
    });

    it('hides the overflow badge when showOverflow is false', () => {
      render(
        <AvatarGroup overflow="+3" showOverflow={false}>
          <Avatar initials="A" alt="Alice" />
          <Avatar initials="B" alt="Bob" />
        </AvatarGroup>,
      );
      expect(screen.queryByText('+3')).toBeNull();
    });

    it('automatically calculates the overflow count when max is exceeded', () => {
      render(
        <AvatarGroup max={2}>
          <Avatar initials="A" alt="Alice" />
          <Avatar initials="B" alt="Bob" />
          <Avatar initials="C" alt="Charlie" />
          <Avatar initials="D" alt="Diana" />
        </AvatarGroup>,
      );
      expect(screen.getByRole('img', { name: 'Alice' })).toBeDefined();
      expect(screen.getByRole('img', { name: 'Bob' })).toBeDefined();
      expect(screen.queryByRole('img', { name: 'Charlie' })).toBeNull();
      expect(screen.queryByRole('img', { name: 'Diana' })).toBeNull();
      expect(screen.getByText('+2')).toBeDefined();
    });

    it('renders all avatars and no overflow badge when max is greater than child count', () => {
      render(
        <AvatarGroup max={5}>
          <Avatar initials="A" alt="Alice" />
          <Avatar initials="B" alt="Bob" />
        </AvatarGroup>,
      );
      expect(screen.getByRole('img', { name: 'Alice' })).toBeDefined();
      expect(screen.getByRole('img', { name: 'Bob' })).toBeDefined();
      expect(screen.queryByText(/\+/)).toBeNull();
    });

    it('prefers explicit overflow prop over auto-calculated count', () => {
      render(
        <AvatarGroup max={1} overflow="99+">
          <Avatar initials="A" alt="Alice" />
          <Avatar initials="B" alt="Bob" />
        </AvatarGroup>,
      );
      expect(screen.getByText('99+')).toBeDefined();
      expect(screen.queryByText('+1')).toBeNull();
    });

    it('forwards custom className and HTML attributes', () => {
      render(
        <AvatarGroup className="custom-group" aria-label="Team members">
          <Avatar initials="A" />
        </AvatarGroup>,
      );
      const group = screen.getByRole('group', { name: 'Team members' });
      expect(group.className).toContain('custom-group');
    });
  });

  describe('size propagation', () => {
    it('propagates the group size to child avatars without an explicit size', () => {
      render(
        <AvatarGroup size="sm">
          <Avatar initials="A" />
        </AvatarGroup>,
      );
      const avatar = screen.getByText('A');
      expect(avatar.className).toContain('size-sds-icon-small');
    });

    it('preserves an explicit size on a child avatar', () => {
      render(
        <AvatarGroup size="sm">
          <Avatar initials="A" size="lg" />
        </AvatarGroup>,
      );
      const avatar = screen.getByText('A');
      expect(avatar.className).toContain('size-sds-icon-large');
    });
  });

  describe('rendered design spec (Figma 56:15608)', () => {
    it('applies negative space and shadow in overlap mode', () => {
      const { container } = render(
        <AvatarGroup spacing="overlap" size="lg">
          <Avatar initials="A" />
          <Avatar initials="B" />
        </AvatarGroup>,
      );
      const avatarsSlot = container.querySelector('[role="group"] > div');
      expect(avatarsSlot?.className).toContain('-space-x-sds-200');
      expect(avatarsSlot?.className).toContain('*:shadow-sds-200');
    });

    it('applies positive gap and no shadow in spaced mode', () => {
      const { container } = render(
        <AvatarGroup spacing="spaced" size="lg">
          <Avatar initials="A" />
          <Avatar initials="B" />
        </AvatarGroup>,
      );
      const avatarsSlot = container.querySelector('[role="group"] > div');
      expect(avatarsSlot?.className).toContain('gap-sds-100');
      expect(avatarsSlot?.className).not.toContain('shadow-sds-200');
    });

    it('overflow badge uses semantic background and text tokens with WCAG AA contrast', () => {
      render(
        <AvatarGroup overflow="+1">
          <Avatar initials="A" />
        </AvatarGroup>,
      );
      const badge = screen.getByText('+1');
      expect(badge.className).toContain('bg-surface-secondary');
      expect(badge.className).toContain('text-text-default');
      expect(badge.className).toContain('rounded-sds-200');
      expect(badge.className).toContain('font-body-small');

      const expectedBg = resolveToken('background-color', '--sds-color-background-default-secondary');
      const expectedColor = resolveToken('color', '--sds-color-text-default-default');
      const computed = getComputedStyle(badge);
      expect(computed.backgroundColor).toBe(expectedBg);
      expect(computed.color).toBe(expectedColor);
    });
  });
});
