import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { AvatarBlock } from './AvatarBlock';
import { Avatar } from '../Avatar';

describe('AvatarBlock', () => {
  describe('content', () => {
    it('renders title and description', () => {
      render(<AvatarBlock title="Roselle Tabuena" description="Design Engineer" />);
      expect(screen.getByText('Roselle Tabuena')).toBeDefined();
      expect(screen.getByText('Design Engineer')).toBeDefined();
    });

    it('renders only title when description is omitted', () => {
      render(<AvatarBlock title="Roselle Tabuena" />);
      expect(screen.getByText('Roselle Tabuena')).toBeDefined();
      expect(screen.queryByText('Design Engineer')).toBeNull();
    });

    it('supports custom ReactNode for title and description', () => {
      render(
        <AvatarBlock
          title={<span data-testid="custom-title">Custom Title</span>}
          description={<span data-testid="custom-desc">Custom Desc</span>}
        />
      );
      expect(screen.getByTestId('custom-title')).toBeDefined();
      expect(screen.getByTestId('custom-desc')).toBeDefined();
    });
  });

  describe('avatar rendering', () => {
    it('renders an image avatar when src is provided', () => {
      render(<AvatarBlock title="Jane Doe" src="/photo.png" alt="Jane photo" />);
      const img = screen.getByRole('img', { name: 'Jane photo' });
      expect(img.getAttribute('src')).toBe('/photo.png');
    });

    it('renders initials when initials is provided', () => {
      render(<AvatarBlock title="Jane Doe" initials="J" />);
      expect(screen.getByText('J')).toBeDefined();
      expect(document.querySelector('img')).toBeNull();
    });

    it('renders a custom avatar element passed via avatar prop', () => {
      render(
        <AvatarBlock
          title="Jane Doe"
          avatar={<Avatar initials="C" data-testid="custom-avatar" />}
        />
      );
      expect(screen.getByTestId('custom-avatar')).toBeDefined();
      expect(screen.getByText('C')).toBeDefined();
    });

    it('renders nothing in the avatar slot when avatar={null}', () => {
      const { container } = render(<AvatarBlock title="Jane Doe" avatar={null} />);
      expect(container.querySelector('img')).toBeNull();
      expect(screen.getByText('Jane Doe')).toBeDefined();
    });
  });

  describe('size and layout', () => {
    it('defaults to large size with body strong title and body base description', () => {
      render(<AvatarBlock title="Jane Doe" description="Engineering" />);
      const titleEl = screen.getByText('Jane Doe');
      const descEl = screen.getByText('Engineering');

      expect(titleEl.className).toContain('font-body-strong');
      expect(descEl.className).toContain('font-body-base');
    });

    it('applies small size typography and spacing when size="sm"', () => {
      const { container } = render(
        <AvatarBlock title="Jane Doe" description="Engineering" size="sm" />
      );
      const root = container.firstElementChild as HTMLElement;
      const titleEl = screen.getByText('Jane Doe');
      const descEl = screen.getByText('Engineering');

      expect(root.className).toContain('gap-sds-200');
      expect(titleEl.className).toContain('font-body-small-strong');
      expect(descEl.className).toContain('font-body-small');
    });

    it('applies medium size typography and spacing when size="md"', () => {
      const { container } = render(
        <AvatarBlock title="Jane Doe" description="Engineering" size="md" />
      );
      const root = container.firstElementChild as HTMLElement;
      const titleEl = screen.getByText('Jane Doe');
      const descEl = screen.getByText('Engineering');

      expect(root.className).toContain('gap-sds-300');
      expect(titleEl.className).toContain('font-body-strong');
      expect(descEl.className).toContain('font-body-base');
    });
  });

  describe('tokens and styling', () => {
    it('uses semantic SDS text tokens for title and description', () => {
      render(<AvatarBlock title="Title" description="Description" />);
      expect(screen.getByText('Title').className).toContain('text-text-default');
      expect(screen.getByText('Description').className).toContain('text-text-secondary');
    });

    it('merges custom className and forwards HTML attributes', () => {
      render(
        <AvatarBlock
          title="Title"
          data-testid="block-root"
          className="custom-block-class"
        />
      );
      const root = screen.getByTestId('block-root');
      expect(root.className).toContain('custom-block-class');
      expect(root.className).toContain('flex items-start');
    });
  });
});
