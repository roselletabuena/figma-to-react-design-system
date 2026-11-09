import { afterEach, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { AvatarBlock } from './AvatarBlock';

const resolveToken = (property: 'background-color' | 'color', token: string) => {
  const probe = document.createElement('div');
  probe.style.setProperty(property, `var(${token})`);
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).getPropertyValue(property);
  probe.remove();
  return value;
};

describe('AvatarBlock', () => {
  describe('content', () => {
    it('renders title and description', () => {
      render(
        <AvatarBlock
          title="Jane Doe"
          description="Software Engineer"
          initials="J"
        />,
      );
      expect(screen.getByText('Jane Doe')).toBeDefined();
      expect(screen.getByText('Software Engineer')).toBeDefined();
      expect(screen.getByText('J')).toBeDefined();
    });

    it('renders children as title when title prop is not provided', () => {
      render(<AvatarBlock initials="J">Jane Doe</AvatarBlock>);
      expect(screen.getByText('Jane Doe')).toBeDefined();
    });

    it('renders children as description when title prop is provided', () => {
      render(
        <AvatarBlock title="Jane Doe" initials="J">
          Software Engineer
        </AvatarBlock>,
      );
      expect(screen.getByText('Jane Doe')).toBeDefined();
      expect(screen.getByText('Software Engineer')).toBeDefined();
    });

    it('renders title without description', () => {
      render(<AvatarBlock title="Jane Doe" initials="J" />);
      expect(screen.getByText('Jane Doe')).toBeDefined();
      expect(screen.queryByText('Software Engineer')).toBeNull();
    });
  });

  describe('avatar', () => {
    it('renders image avatar when src is provided', () => {
      render(
        <AvatarBlock
          title="Jane Doe"
          src="/avatar.png"
          alt="Profile photo"
        />,
      );
      const img = screen.getByRole('img', { name: 'Profile photo' });
      expect(img.getAttribute('src')).toBe('/avatar.png');
    });

    it('renders initials when no src is provided', () => {
      render(<AvatarBlock title="Jane Doe" initials="JD" />);
      expect(screen.getByText('JD')).toBeDefined();
      expect(document.querySelector('img')).toBeNull();
    });

    it('supports custom avatar slot', () => {
      render(
        <AvatarBlock
          title="Jane Doe"
          avatar={<span data-testid="custom-avatar">Custom</span>}
        />,
      );
      expect(screen.getByTestId('custom-avatar')).toBeDefined();
      expect(screen.getByText('Custom')).toBeDefined();
    });
  });

  describe('sizes and styling', () => {
    it('defaults to size lg and shape circle', () => {
      render(
        <AvatarBlock
          title="Jane Doe"
          description="Engineer"
          initials="J"
          data-testid="block"
        />,
      );
      const root = screen.getByTestId('block');
      expect(root.className).toContain('gap-sds-300');

      const title = screen.getByText('Jane Doe');
      expect(title.className).toContain('font-body-strong');
      expect(title.className).toContain('text-text-default');

      const desc = screen.getByText('Engineer');
      expect(desc.className).toContain('font-body-base');
      expect(desc.className).toContain('text-text-secondary');
    });

    it.each([
      ['sm', 'gap-sds-200', 'font-body-small-strong', 'font-body-small'],
      ['md', 'gap-sds-300', 'font-body-strong', 'font-body-small'],
      ['lg', 'gap-sds-300', 'font-body-strong', 'font-body-base'],
    ] as const)(
      'applies correct size classes for %s',
      (size, expectedGap, expectedTitleFont, expectedDescFont) => {
        render(
          <AvatarBlock
            size={size}
            title="Jane Doe"
            description="Engineer"
            initials="J"
            data-testid={`block-${size}`}
          />,
        );
        const root = screen.getByTestId(`block-${size}`);
        expect(root.className).toContain(expectedGap);

        const title = screen.getByText('Jane Doe');
        expect(title.className).toContain(expectedTitleFont);

        const desc = screen.getByText('Engineer');
        expect(desc.className).toContain(expectedDescFont);
      },
    );
  });

  describe('props passthrough', () => {
    it('merges custom className and forwards div attributes', () => {
      render(
        <AvatarBlock
          title="Jane Doe"
          className="custom-block-class"
          data-testid="block-root"
          aria-label="User card"
        />,
      );
      const root = screen.getByTestId('block-root');
      expect(root.className).toContain('custom-block-class');
      expect(root.getAttribute('aria-label')).toBe('User card');
    });
  });

  describe('rendered design spec & theme', () => {
    afterEach(() => {
      document.documentElement.classList.remove('dark');
    });

    it('applies SDS text tokens that flip in dark mode', () => {
      render(
        <AvatarBlock
          title="Jane Doe"
          description="Product Designer"
          initials="JD"
        />,
      );
      const title = screen.getByText('Jane Doe');
      const desc = screen.getByText('Product Designer');

      const readColors = () => ({
        titleColor: getComputedStyle(title).color,
        descColor: getComputedStyle(desc).color,
      });

      const light = readColors();
      expect(light.titleColor).toBe(
        resolveToken('color', '--sds-color-text-default-default'),
      );
      expect(light.descColor).toBe(
        resolveToken('color', '--sds-color-text-default-secondary'),
      );

      document.documentElement.classList.add('dark');
      const dark = readColors();
      expect(dark.titleColor).toBe(
        resolveToken('color', '--sds-color-text-default-default'),
      );
      expect(dark.descColor).toBe(
        resolveToken('color', '--sds-color-text-default-secondary'),
      );
      expect(dark.titleColor).not.toBe(light.titleColor);
      expect(dark.descColor).not.toBe(light.descColor);
    });
  });
});
