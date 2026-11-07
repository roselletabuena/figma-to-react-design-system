import { afterEach, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { Avatar } from './Avatar';

/** Resolves a semantic token to the computed value it has right now (theme-aware). */
const resolveToken = (property: 'background-color' | 'color', token: string) => {
  const probe = document.createElement('div');
  probe.style.setProperty(property, `var(${token})`);
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).getPropertyValue(property);
  probe.remove();
  return value;
};

describe('Avatar', () => {
  describe('type', () => {
    it('renders initials when no src is provided', () => {
      render(<Avatar initials="F" />);
      expect(screen.getByText('F')).toBeDefined();
      expect(document.querySelector('img')).toBeNull();
    });

    it('renders an image with alt text when src is provided', () => {
      render(<Avatar src="/photo.png" alt="Profile photo" />);
      const img = screen.getByRole('img', { name: 'Profile photo' });
      expect(img.getAttribute('src')).toBe('/photo.png');
    });

    it('prefers the image over initials when both are provided', () => {
      render(<Avatar src="/photo.png" initials="F" />);
      expect(document.querySelector('img')).not.toBeNull();
      expect(screen.queryByText('F')).toBeNull();
    });

    it('treats the image as decorative when no alt is given', () => {
      render(<Avatar src="/photo.png" />);
      expect(document.querySelector('img')?.getAttribute('alt')).toBe('');
      expect(screen.queryByRole('img')).toBeNull();
    });
  });

  describe('accessibility', () => {
    it('labels initials as an image when alt is provided', () => {
      render(<Avatar initials="F" alt="Foo Bar" />);
      expect(screen.getByRole('img', { name: 'Foo Bar' })).toBeDefined();
    });

    it('exposes initials as plain text when no alt is provided', () => {
      render(<Avatar initials="F" />);
      expect(screen.queryByRole('img')).toBeNull();
      expect(screen.getByText('F')).toBeDefined();
    });
  });

  describe('size and shape', () => {
    it('defaults to a large circle', () => {
      render(<Avatar initials="F" />);
      const classes = screen.getByText('F').className;
      expect(classes).toContain('size-sds-icon-large');
      expect(classes).toContain('rounded-sds-full');
      expect(classes).toContain('font-subheading');
    });

    it.each([
      ['sm', 'size-sds-icon-small', 'font-body-small'],
      ['md', 'size-sds-icon-medium', 'font-body-base'],
      ['lg', 'size-sds-icon-large', 'font-subheading'],
    ] as const)('applies the %s size and type ramp', (size, sizeClass, fontClass) => {
      render(<Avatar initials="F" size={size} />);
      const classes = screen.getByText('F').className;
      expect(classes).toContain(sizeClass);
      expect(classes).toContain(fontClass);
    });

    it.each([
      ['sm', 'rounded-sds-100'],
      ['md', 'rounded-sds-200'],
      ['lg', 'rounded-sds-200'],
    ] as const)('scales square corners at %s', (size, radiusClass) => {
      render(<Avatar initials="F" size={size} shape="square" />);
      expect(screen.getByText('F').className).toContain(radiusClass);
    });

    it('uses semantic brand tokens for initials', () => {
      render(<Avatar initials="F" />);
      const classes = screen.getByText('F').className;
      expect(classes).toContain('bg-brand');
      expect(classes).toContain('text-text-brand-on-brand');
    });

    it('does not paint a brand background behind images', () => {
      render(<Avatar src="/photo.png" alt="Profile photo" />);
      const root = screen.getByRole('img').parentElement;
      expect(root?.className).not.toContain('bg-brand');
    });
  });

  describe('props passthrough', () => {
    it('merges a custom className and forwards HTML attributes', () => {
      render(<Avatar initials="F" className="custom" data-testid="avatar" />);
      const root = screen.getByTestId('avatar');
      expect(root.className).toContain('custom');
      expect(root.className).toContain('size-sds-icon-large');
    });
  });

  // Rendered against the real stylesheet: values come from the Figma Avatar spec (node 9762:1103).
  describe('rendered design spec', () => {
    afterEach(() => {
      document.documentElement.classList.remove('dark');
    });

    it.each([
      ['sm', 24, 14, 19.6],
      ['md', 32, 16, 22.4],
      ['lg', 40, 20, 24],
    ] as const)('%s is %ipx square with %ipx type at %f line-height', (size, box, font, lineHeight) => {
      render(<Avatar initials="F" size={size} data-testid="avatar" />);
      const style = getComputedStyle(screen.getByTestId('avatar'));
      expect(parseFloat(style.width)).toBe(box);
      expect(parseFloat(style.height)).toBe(box);
      expect(parseFloat(style.fontSize)).toBe(font);
      expect(parseFloat(style.lineHeight)).toBeCloseTo(lineHeight, 1);
    });

    it.each([
      ['circle', 'sm', 9999],
      ['circle', 'lg', 9999],
      ['square', 'sm', 4],
      ['square', 'md', 8],
      ['square', 'lg', 8],
    ] as const)('%s %s has a %ipx corner radius', (shape, size, radius) => {
      render(<Avatar initials="F" shape={shape} size={size} data-testid="avatar" />);
      const style = getComputedStyle(screen.getByTestId('avatar'));
      expect(parseFloat(style.borderTopLeftRadius)).toBe(radius);
    });

    it('fills the box with a cropped image', () => {
      render(<Avatar src="/photo.png" alt="Profile photo" size="md" data-testid="avatar" />);
      const img = screen.getByRole('img');
      const style = getComputedStyle(img);
      expect(style.objectFit).toBe('cover');
      expect(parseFloat(style.width)).toBe(32);
      expect(parseFloat(style.height)).toBe(32);
    });

    it('uses the brand surface and on-brand text, flipping in dark mode', () => {
      render(<Avatar initials="F" data-testid="avatar" />);
      const avatar = screen.getByTestId('avatar');
      const read = () => {
        const style = getComputedStyle(avatar);
        return { background: style.backgroundColor, text: style.color };
      };

      const light = read();
      expect(light.background).toBe(resolveToken('background-color', '--sds-color-background-brand-default'));
      expect(light.text).toBe(resolveToken('color', '--sds-color-text-brand-on-brand'));

      document.documentElement.classList.add('dark');
      const dark = read();
      expect(dark.background).toBe(resolveToken('background-color', '--sds-color-background-brand-default'));
      expect(dark.text).toBe(resolveToken('color', '--sds-color-text-brand-on-brand'));
      expect(dark.background).not.toBe(light.background);
      expect(dark.text).not.toBe(light.text);
    });
  });
});
