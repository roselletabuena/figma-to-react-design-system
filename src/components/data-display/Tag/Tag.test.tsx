import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '../../../index.css';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders its label', () => {
    render(<Tag>Design</Tag>);
    expect(screen.getByText('Design')).toBeDefined();
  });

  it('shows the remove button by default', () => {
    render(<Tag>Design</Tag>);
    expect(screen.getByRole('button', { name: 'Remove' })).toBeDefined();
  });

  it('hides the remove button when removable is false', () => {
    render(<Tag removable={false}>Design</Tag>);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('calls onRemove when the remove button is clicked', () => {
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>Design</Tag>);
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('uses a custom remove label', () => {
    render(<Tag removeLabel="Remove Design">Design</Tag>);
    expect(screen.getByRole('button', { name: 'Remove Design' })).toBeDefined();
  });

  it.each(['brand', 'positive', 'danger', 'warning'] as const)(
    'uses the %s tokens for the scheme',
    (scheme) => {
      render(<Tag scheme={scheme}>Tag</Tag>);
      expect(screen.getByText('Tag').className).toContain(`background-${scheme}`);
    },
  );

  it('uses the neutral default tokens for the neutral scheme', () => {
    render(<Tag scheme="neutral">Tag</Tag>);
    expect(screen.getByText('Tag').className).toContain('background-default-tertiary');
  });

  it('uses different fills for primary and secondary', () => {
    render(
      <>
        <Tag variant="primary">One</Tag>
        <Tag variant="secondary">Two</Tag>
      </>,
    );
    expect(screen.getByText('One').className).not.toBe(screen.getByText('Two').className);
  });

  it('merges a custom className and forwards props', () => {
    render(
      <Tag className="extra" data-testid="tag">
        Tag
      </Tag>,
    );
    expect(screen.getByTestId('tag').className).toContain('extra');
  });
});
