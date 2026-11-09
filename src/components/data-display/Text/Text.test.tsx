import { afterEach, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { Text } from './Text';

describe('Text', () => {
  afterEach(() => {
    document.documentElement.classList.remove('dark');
  });

  it('renders children in a paragraph', () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText('Hello').tagName).toBe('P');
  });

  it('uses semantic tokens', () => {
    render(<Text>Hello</Text>);
    const classes = screen.getByText('Hello').className;
    expect(classes).toContain('font-body-base');
    expect(classes).toContain('text-text-default');
  });

  it('merges className and forwards attributes', () => {
    render(
      <Text className="custom" data-testid="t">
        Hello
      </Text>,
    );
    expect(screen.getByTestId('t').className).toContain('custom');
  });

  it('renders 16px type at 1.4 line-height and flips color in dark mode', () => {
    render(<Text data-testid="t">Hello</Text>);
    const el = screen.getByTestId('t');
    const style = getComputedStyle(el);
    expect(parseFloat(style.fontSize)).toBe(16);
    expect(parseFloat(style.lineHeight)).toBeCloseTo(22.4, 1);
    const light = style.color;
    document.documentElement.classList.add('dark');
    expect(getComputedStyle(el).color).not.toBe(light);
  });
});
