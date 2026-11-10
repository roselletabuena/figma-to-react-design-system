import { afterEach, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { Card } from './Card';
import { Button } from '../../actions/Button';

/** Resolves a semantic token to the computed value it has right now (theme-aware). */
const resolveToken = (property: 'background-color' | 'color' | 'border-color', token: string) => {
  const probe = document.createElement('div');
  probe.style.setProperty(property, `var(${token})`);
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).getPropertyValue(property);
  probe.remove();
  return value;
};

describe('Card', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  describe('rendering and content', () => {
    it('renders heading and body text', () => {
      render(<Card heading="Card Title" body="Card description body" />);
      expect(screen.getByRole('heading', { level: 3, name: 'Card Title' })).toBeDefined();
      expect(screen.getByText('Card description body')).toBeDefined();
    });

    it('renders custom children in place of or along with body', () => {
      render(
        <Card heading="Title">
          <div data-testid="custom-child">Custom Child Content</div>
        </Card>,
      );
      expect(screen.getByTestId('custom-child')).toBeDefined();
      expect(screen.getByText('Custom Child Content')).toBeDefined();
    });

    it('renders custom ReactNode heading and body', () => {
      render(
        <Card
          heading={<span data-testid="custom-heading">Custom Heading</span>}
          body={<span data-testid="custom-body">Custom Body</span>}
        />,
      );
      expect(screen.getByTestId('custom-heading')).toBeDefined();
      expect(screen.getByTestId('custom-body')).toBeDefined();
    });
  });

  describe('variants and layout', () => {
    it('applies default variant classes (clean background, no border/padding)', () => {
      render(<Card heading="Title" data-testid="card" />);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('bg-transparent');
      expect(card.classList.contains('border-border-default')).toBe(false);
      expect(card.classList.contains('p-sds-600')).toBe(false);
    });

    it('applies stroke variant classes (surface background, border, rounded, padding)', () => {
      render(<Card variant="stroke" heading="Title" data-testid="card" />);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('bg-surface');
      expect(card.className).toContain('border-border-default');
      expect(card.className).toContain('rounded-sds-200');
      expect(card.className).toContain('p-sds-600');
    });

    it('applies horizontal layout by default', () => {
      render(<Card heading="Title" data-testid="card" />);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('flex-row');
      expect(card.className).toContain('flex-wrap');
      expect(card.className).toContain('gap-sds-600');
    });

    it('applies vertical layout when direction="vertical"', () => {
      render(<Card direction="vertical" heading="Title" data-testid="card" />);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('flex-col');
      expect(card.className).toContain('gap-sds-600');
    });
  });

  describe('asset handling', () => {
    it('renders default icon asset when assetType="icon"', () => {
      render(<Card heading="Title" assetType="icon" />);
      const svg = document.querySelector('svg');
      expect(svg).not.toBeNull();
      expect(svg?.className.baseVal).toContain('size-sds-800');
      expect(svg?.className.baseVal).toContain('text-icon-default');
    });

    it('renders default image container when assetType="image"', () => {
      render(<Card heading="Title" assetType="image" />);
      const container = screen.getByTestId('card-image-container');
      expect(container).toBeDefined();
      expect(container.className).toContain('w-sds-4000');
      expect(container.className).toContain('h-sds-4000');
    });

    it('renders img with imageSrc and imageAlt when assetType="image"', () => {
      render(
        <Card
          heading="Title"
          assetType="image"
          imageSrc="/test-image.jpg"
          imageAlt="Test Preview"
        />,
      );
      const img = screen.getByRole('img', { name: 'Test Preview' });
      expect(img.getAttribute('src')).toBe('/test-image.jpg');
    });

    it('renders custom asset when passed', () => {
      render(
        <Card
          heading="Title"
          asset={<div data-testid="custom-asset">Custom Asset</div>}
        />,
      );
      expect(screen.getByTestId('custom-asset')).toBeDefined();
    });

    it('hides asset when hasAsset={false}', () => {
      render(<Card heading="Title" hasAsset={false} />);
      expect(document.querySelector('svg')).toBeNull();
      expect(screen.queryByTestId('card-image-container')).toBeNull();
    });
  });

  describe('action handling', () => {
    it('renders default neutral button when hasAction is true and no action provided', () => {
      render(<Card heading="Title" hasAction={true} />);
      const button = screen.getByRole('button', { name: 'Button' });
      expect(button).toBeDefined();
    });

    it('renders custom action when provided', () => {
      render(
        <Card
          heading="Title"
          action={
            <Button variant="primary" data-testid="custom-btn">
              Explore
            </Button>
          }
        />,
      );
      expect(screen.getByTestId('custom-btn')).toBeDefined();
      expect(screen.getByRole('button', { name: 'Explore' })).toBeDefined();
    });

    it('hides action when hasAction={false}', () => {
      render(<Card heading="Title" hasAction={false} />);
      expect(screen.queryByRole('button')).toBeNull();
    });
  });

  describe('theming and design tokens', () => {
    it('uses SDS surface background and border tokens for stroke variant, flipping in dark mode', () => {
      render(
        <Card
          variant="stroke"
          heading="Title"
          data-testid="card"
          className="transition-none"
        />,
      );
      const card = screen.getByTestId('card');

      const readColors = () => {
        const style = getComputedStyle(card);
        return {
          background: style.backgroundColor,
          border: style.borderColor,
          text: style.color,
        };
      };

      const light = readColors();
      expect(light.background).toBe(resolveToken('background-color', '--sds-color-background-default-default'));
      expect(light.border).toBe(resolveToken('border-color', '--sds-color-border-default-default'));
      expect(light.text).toBe(resolveToken('color', '--sds-color-text-default-default'));

      document.documentElement.classList.add('dark');
      const dark = readColors();
      expect(dark.background).toBe(resolveToken('background-color', '--sds-color-background-default-default'));
      expect(dark.border).toBe(resolveToken('border-color', '--sds-color-border-default-default'));
      expect(dark.text).toBe(resolveToken('color', '--sds-color-text-default-default'));

      // Verify that dark mode values flip
      expect(dark.background).not.toBe(light.background);
      expect(dark.text).not.toBe(light.text);
    });
  });

  describe('props passthrough', () => {
    it('merges custom className and forwards HTML attributes', () => {
      render(
        <Card
          heading="Title"
          className="custom-card-class"
          data-testid="card-element"
          aria-label="Test Card"
        />,
      );
      const card = screen.getByTestId('card-element');
      expect(card.className).toContain('custom-card-class');
      expect(card.getAttribute('aria-label')).toBe('Test Card');
    });
  });
});
