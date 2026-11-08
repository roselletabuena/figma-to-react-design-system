import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders heading, body and actions', () => {
    render(<Card heading="Hello" body="World" actions={<button>Go</button>} />);
    expect(screen.getByText('Hello')).toBeDefined();
    expect(screen.getByText('World')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Go' })).toBeDefined();
  });

  it('defaults to a stroke horizontal card with semantic tokens', () => {
    render(<Card data-testid="card" />);
    const classes = screen.getByTestId('card').className;
    expect(classes).toContain('bg-surface');
    expect(classes).toContain('border-border-default');
    expect(classes).toContain('rounded-sds-200');
    expect(classes).toContain('flex-wrap');
  });

  it('removes the frame for the default variant', () => {
    render(<Card variant="default" data-testid="card" />);
    const classes = screen.getByTestId('card').className;
    expect(classes).not.toContain('bg-surface');
    expect(classes).not.toContain('border-border-default');
  });

  it('stacks content for the vertical direction', () => {
    render(<Card direction="vertical" data-testid="card" />);
    expect(screen.getByTestId('card').className).toContain('flex-col');
  });

  it('shows a decorative icon by default and hides it when asset is false', () => {
    const { container, rerender } = render(<Card />);
    expect(container.querySelector('svg')).not.toBeNull();
    expect(container.querySelector('[aria-hidden="true"]')).not.toBeNull();
    rerender(<Card asset={false} />);
    expect(container.querySelector('svg')).toBeNull();
  });

  it('renders a custom icon', () => {
    render(<Card icon={<i data-testid="custom" />} />);
    expect(screen.getByTestId('custom')).toBeDefined();
  });

  it('renders an image with alt text, or a placeholder without src', () => {
    const { container, rerender } = render(<Card assetType="image" imageSrc="/a.png" imageAlt="Photo" />);
    expect(screen.getByRole('img', { name: 'Photo' }).getAttribute('src')).toBe('/a.png');
    rerender(<Card assetType="image" />);
    expect(container.querySelector('img')).toBeNull();
    expect(container.querySelector('svg')).not.toBeNull();
  });

  it('replaces default content with children', () => {
    render(
      <Card heading="Hidden">
        <span>Custom</span>
      </Card>,
    );
    expect(screen.getByText('Custom')).toBeDefined();
    expect(screen.queryByText('Hidden')).toBeNull();
  });

  it('merges className and forwards attributes', () => {
    render(<Card className="custom" data-testid="card" />);
    expect(screen.getByTestId('card').className).toContain('custom');
  });
});
