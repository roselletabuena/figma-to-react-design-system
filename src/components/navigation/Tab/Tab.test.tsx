import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { render, screen } from '@testing-library/react';
import '../../../index.css';
import { Tab } from './Tab';

const resolveColor = (token: string) => {
  const probe = document.createElement('div');
  probe.style.setProperty('color', `var(${token})`);
  document.body.appendChild(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return value;
};

describe('Tab', () => {
  it('renders its label as a tab', () => {
    render(<Tab>Overview</Tab>);
    expect(screen.getByRole('tab', { name: 'Overview' })).toBeDefined();
  });

  it('is inactive by default and reflects active in aria-selected', () => {
    const { rerender } = render(<Tab>One</Tab>);
    expect(screen.getByRole('tab').getAttribute('aria-selected')).toBe('false');
    rerender(<Tab active>One</Tab>);
    expect(screen.getByRole('tab').getAttribute('aria-selected')).toBe('true');
  });

  it('merges className, forwards attributes and ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <Tab ref={ref} className="custom" data-testid="tab">
        One
      </Tab>,
    );
    expect(screen.getByTestId('tab').className).toContain('custom');
    expect(ref.current).toBe(screen.getByRole('tab'));
  });

  it('calls onClick', async () => {
    const onClick = vi.fn();
    render(<Tab onClick={onClick}>One</Tab>);
    await userEvent.click(screen.getByRole('tab'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('matches the Figma geometry', () => {
    render(<Tab data-testid="tab">One</Tab>);
    const style = getComputedStyle(screen.getByTestId('tab'));
    expect(parseFloat(style.paddingLeft)).toBe(12);
    expect(parseFloat(style.paddingTop)).toBe(4);
    expect(parseFloat(style.borderTopLeftRadius)).toBe(4);
    expect(parseFloat(style.borderBottomWidth)).toBe(1);
  });

  it('uses neutral text and border tokens for active and inactive', () => {
    render(
      <>
        <Tab data-testid="off">Off</Tab>
        <Tab active data-testid="on">
          On
        </Tab>
      </>,
    );
    const off = getComputedStyle(screen.getByTestId('off'));
    const on = getComputedStyle(screen.getByTestId('on'));
    expect(off.color).toBe(resolveColor('--sds-color-text-neutral-tertiary'));
    expect(on.color).toBe(resolveColor('--sds-color-text-neutral-default'));
    expect(off.borderBottomColor).toBe(resolveColor('--sds-color-border-neutral-tertiary'));
    expect(on.borderBottomColor).toBe(resolveColor('--sds-color-border-neutral-default'));
  });
});
