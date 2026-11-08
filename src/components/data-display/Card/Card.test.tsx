import { createRef } from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders heading and body text correctly', () => {
    render(<Card heading="Card Title" body="This is the card description." />);
    expect(screen.getByText('Card Title')).toBeDefined();
    expect(screen.getByText('This is the card description.')).toBeDefined();
  });

  it('renders default variant with transparent background and no border', () => {
    const { container } = render(<Card heading="Title" body="Text" variant="default" />);
    const cardEl = container.firstElementChild as HTMLElement;
    expect(cardEl.className).toContain('bg-transparent');
    expect(cardEl.className).not.toContain('bg-surface');
    expect(cardEl.className).not.toContain('border-border-default');
  });

  it('renders stroke variant with surface background, border, and padding', () => {
    const { container } = render(<Card heading="Title" body="Text" variant="stroke" />);
    const cardEl = container.firstElementChild as HTMLElement;
    expect(cardEl.className).toContain('bg-surface');
    expect(cardEl.className).toContain('border');
    expect(cardEl.className).toContain('border-border-default');
    expect(cardEl.className).toContain('rounded-sds-200');
    expect(cardEl.className).toContain('p-sds-600');
  });

  it('renders horizontal direction layout classes by default', () => {
    const { container } = render(<Card heading="Title" body="Text" />);
    const cardEl = container.firstElementChild as HTMLElement;
    expect(cardEl.className).toContain('flex-row');
    expect(cardEl.className).toContain('gap-sds-600');
  });

  it('renders vertical direction layout classes', () => {
    const { container } = render(<Card heading="Title" body="Text" direction="vertical" />);
    const cardEl = container.firstElementChild as HTMLElement;
    expect(cardEl.className).toContain('flex-col');
    expect(cardEl.className).toContain('gap-sds-600');
  });

  it('renders default icon placeholder when assetType="icon" and showAsset is true', () => {
    const { container } = render(<Card heading="Title" assetType="icon" />);
    const iconWrapper = container.querySelector('.size-sds-icon-medium');
    expect(iconWrapper).toBeDefined();
    expect(iconWrapper?.querySelector('svg')).toBeDefined();
  });

  it('renders default image placeholder when assetType="image" and showAsset is true', () => {
    const { container } = render(<Card heading="Title" assetType="image" />);
    const imageWrapper = container.querySelector('.size-sds-4000');
    expect(imageWrapper).toBeDefined();
    expect(imageWrapper?.className).toContain('bg-neutral-tertiary');
    expect(imageWrapper?.querySelector('svg')).toBeDefined();
  });

  it('does not render asset slot when showAsset is false', () => {
    const { container } = render(<Card heading="Title" showAsset={false} />);
    expect(container.querySelector('.size-sds-icon-medium')).toBeNull();
    expect(container.querySelector('.size-sds-4000')).toBeNull();
  });

  it('renders custom asset node when provided', () => {
    render(<Card heading="Title" asset={<span data-testid="custom-asset">Custom</span>} />);
    expect(screen.getByTestId('custom-asset')).toBeDefined();
    expect(screen.getByText('Custom')).toBeDefined();
  });

  it('renders actions when provided', () => {
    render(
      <Card
        heading="Title"
        actions={<button type="button">Click Me</button>}
      />,
    );
    expect(screen.getByRole('button', { name: 'Click Me' })).toBeDefined();
  });

  it('does not render actions when showActions is false', () => {
    render(
      <Card
        heading="Title"
        showActions={false}
        actions={<button type="button">Click Me</button>}
      />,
    );
    expect(screen.queryByRole('button', { name: 'Click Me' })).toBeNull();
  });

  it('renders custom children within the content slot', () => {
    render(
      <Card heading="Title">
        <div data-testid="card-child">Child Content</div>
      </Card>,
    );
    expect(screen.getByTestId('card-child')).toBeDefined();
    expect(screen.getByText('Child Content')).toBeDefined();
  });

  it('renders custom children alone when no heading or body is passed', () => {
    render(
      <Card>
        <span data-testid="only-child">Direct Child</span>
      </Card>,
    );
    expect(screen.getByTestId('only-child')).toBeDefined();
  });

  it('renders with custom heading level', () => {
    render(<Card heading="Custom Level" headingLevel="h1" />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeDefined();
    expect(heading.textContent).toBe('Custom Level');
  });

  it('forwards ref to the root div element', () => {
    const ref = createRef<HTMLDivElement>();
    render(<Card ref={ref} heading="Ref Test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('passes additional HTML attributes and class names', () => {
    const { container } = render(
      <Card
        heading="Props Test"
        data-testid="card-root"
        aria-label="Important Card"
        className="custom-class"
      />,
    );
    const cardEl = container.firstElementChild as HTMLElement;
    expect(cardEl.getAttribute('data-testid')).toBe('card-root');
    expect(cardEl.getAttribute('aria-label')).toBe('Important Card');
    expect(cardEl.className).toContain('custom-class');
  });
});
