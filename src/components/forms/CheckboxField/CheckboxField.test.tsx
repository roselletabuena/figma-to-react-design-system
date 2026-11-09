import { createRef } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '../../../index.css';
import { CheckboxField } from './CheckboxField';

describe('CheckboxField', () => {
  it('renders the label and description', () => {
    render(<CheckboxField label="Accept" description="Terms apply" />);
    expect(screen.getByText('Accept')).toBeDefined();
    expect(screen.getByText('Terms apply')).toBeDefined();
  });

  it('is labelled by the label and described by the description', () => {
    render(<CheckboxField label="Accept" description="Terms apply" />);
    const input = screen.getByRole('checkbox', { name: 'Accept' });
    expect(input.getAttribute('aria-describedby')).toBeTruthy();
    expect(screen.getByRole('checkbox', { description: 'Terms apply' })).toBe(input);
  });

  it('omits the description row when no description is given', () => {
    const { container } = render(<CheckboxField label="Accept" />);
    expect(container.querySelector('p')).toBeNull();
    expect(screen.getByRole('checkbox').hasAttribute('aria-describedby')).toBe(false);
  });

  it('toggles and calls onChange when the label is clicked', () => {
    const onChange = vi.fn();
    render(<CheckboxField label="Accept" onChange={onChange} />);
    fireEvent.click(screen.getByText('Accept'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(true);
  });

  it('reflects the indeterminate prop on the native input', () => {
    const { rerender } = render(<CheckboxField label="Accept" indeterminate />);
    const input = screen.getByRole('checkbox') as HTMLInputElement;
    expect(input.indeterminate).toBe(true);
    rerender(<CheckboxField label="Accept" indeterminate={false} />);
    expect(input.indeterminate).toBe(false);
  });

  it('does not toggle when disabled', () => {
    const onChange = vi.fn();
    render(<CheckboxField label="Accept" disabled onChange={onChange} />);
    fireEvent.click(screen.getByText('Accept'));
    expect(onChange).not.toHaveBeenCalled();
    expect((screen.getByRole('checkbox') as HTMLInputElement).disabled).toBe(true);
  });

  it('forwards the ref and extra props to the input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<CheckboxField ref={ref} label="Accept" name="terms" value="yes" />);
    expect(ref.current?.name).toBe('terms');
    expect(ref.current?.value).toBe('yes');
  });

  it('applies className to the wrapper', () => {
    const { container } = render(<CheckboxField label="Accept" className="custom" />);
    expect((container.firstChild as HTMLElement).className).toContain('custom');
  });

  it('shows the check icon when checked and the minus when indeterminate', () => {
    const { container, rerender } = render(<CheckboxField label="A" checked onChange={() => {}} />);
    const check = container.querySelector('[data-icon=check]') as Element;
    const minus = container.querySelector('[data-icon=minus]') as Element;
    expect(getComputedStyle(check).display).toBe('block');
    expect(getComputedStyle(minus).display).toBe('none');
    rerender(<CheckboxField label="A" checked indeterminate onChange={() => {}} />);
    expect(getComputedStyle(check).display).toBe('none');
    expect(getComputedStyle(minus).display).toBe('block');
  });
});
