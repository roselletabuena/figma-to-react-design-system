import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import '../../../index.css';
import { ButtonDanger } from './ButtonDanger';

describe('ButtonDanger', () => {
  it('renders its label as a button', () => {
    render(<ButtonDanger>Delete</ButtonDanger>);
    expect(screen.getByRole('button', { name: 'Delete' })).toBeDefined();
  });

  it('defaults to type="button" so it never submits a form by accident', () => {
    render(<ButtonDanger>Delete</ButtonDanger>);
    expect(screen.getByRole('button').getAttribute('type')).toBe('button');
  });

  it('allows type to be overridden', () => {
    render(<ButtonDanger type="submit">Delete</ButtonDanger>);
    expect(screen.getByRole('button').getAttribute('type')).toBe('submit');
  });

  it('calls onClick when enabled', () => {
    const onClick = vi.fn();
    render(<ButtonDanger onClick={onClick}>Delete</ButtonDanger>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn();
    render(
      <ButtonDanger disabled onClick={onClick}>
        Delete
      </ButtonDanger>,
    );
    const button = screen.getByRole('button') as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  describe('variant', () => {
    it('uses the filled danger surface for primary (default)', () => {
      render(<ButtonDanger>Delete</ButtonDanger>);
      expect(screen.getByRole('button').className).toContain('bg-danger');
    });

    it('is transparent until hovered for subtle', () => {
      render(<ButtonDanger variant="subtle">Delete</ButtonDanger>);
      const { className } = screen.getByRole('button');
      expect(className).toContain('bg-transparent');
      expect(className).toContain('text-text-danger');
    });
  });

  describe('size', () => {
    it('uses 12px padding for md (default)', () => {
      render(<ButtonDanger>Delete</ButtonDanger>);
      expect(screen.getByRole('button').className).toContain('p-sds-300');
    });

    it('uses 8px padding for sm', () => {
      render(<ButtonDanger size="sm">Delete</ButtonDanger>);
      expect(screen.getByRole('button').className).toContain('p-sds-200');
    });
  });

  describe('icons', () => {
    it('renders no icon slots by default', () => {
      render(<ButtonDanger>Delete</ButtonDanger>);
      expect(screen.getByRole('button').querySelector('[aria-hidden="true"]')).toBeNull();
    });

    it('renders icons before and after the label, hidden from assistive tech', () => {
      render(
        <ButtonDanger
          iconStart={<svg data-testid="start" />}
          iconEnd={<svg data-testid="end" />}
        >
          Delete
        </ButtonDanger>,
      );
      const button = screen.getByRole('button', { name: 'Delete' });
      const start = screen.getByTestId('start');
      const end = screen.getByTestId('end');
      expect(start.parentElement?.getAttribute('aria-hidden')).toBe('true');
      expect(end.parentElement?.getAttribute('aria-hidden')).toBe('true');
      // DOM order: start icon, label, end icon.
      expect(button.firstElementChild?.contains(start)).toBe(true);
      expect(button.lastElementChild?.contains(end)).toBe(true);
    });
  });

  it('merges a custom className', () => {
    render(<ButtonDanger className="w-full">Delete</ButtonDanger>);
    expect(screen.getByRole('button').className).toContain('w-full');
  });
});
