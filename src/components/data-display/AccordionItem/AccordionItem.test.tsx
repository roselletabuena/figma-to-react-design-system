import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { AccordionItem } from './AccordionItem';

describe('AccordionItem', () => {
  it('renders title and defaults to collapsed state', () => {
    render(<AccordionItem title="Test Title" content="Test Content" />);

    const button = screen.getByRole('button', { name: /Test Title/i });
    expect(button).toBeDefined();
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByText('Test Content')).toBeNull();
  });

  it('expands and collapses on click when uncontrolled', () => {
    render(<AccordionItem title="Clickable Accordion" content="Collapsible Content" />);

    const button = screen.getByRole('button', { name: /Clickable Accordion/i });
    expect(screen.queryByText('Collapsible Content')).toBeNull();

    // Click to open
    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Collapsible Content')).toBeDefined();

    // Click to close
    fireEvent.click(button);
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(screen.queryByText('Collapsible Content')).toBeNull();
  });

  it('respects defaultOpen=true', () => {
    render(<AccordionItem title="Default Open" content="Open Content" defaultOpen />);

    const button = screen.getByRole('button', { name: /Default Open/i });
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(screen.getByText('Open Content')).toBeDefined();
  });

  it('respects controlled open prop', () => {
    const { rerender } = render(
      <AccordionItem title="Controlled Title" content="Controlled Content" open={false} />,
    );

    expect(screen.queryByText('Controlled Content')).toBeNull();

    rerender(<AccordionItem title="Controlled Title" content="Controlled Content" open={true} />);
    expect(screen.getByText('Controlled Content')).toBeDefined();
  });

  it('respects controlled state="open" and state="closed"', () => {
    const { rerender } = render(
      <AccordionItem title="State Title" content="State Content" state="open" />,
    );

    expect(screen.getByText('State Content')).toBeDefined();

    rerender(<AccordionItem title="State Title" content="State Content" state="closed" />);
    expect(screen.queryByText('State Content')).toBeNull();
  });

  it('calls onToggle and onOpenChange when toggled', () => {
    const handleToggle = vi.fn();
    const handleOpenChange = vi.fn();

    render(
      <AccordionItem
        title="Callback Title"
        content="Callback Content"
        onToggle={handleToggle}
        onOpenChange={handleOpenChange}
      />,
    );

    const button = screen.getByRole('button', { name: /Callback Title/i });
    fireEvent.click(button);

    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(handleToggle).toHaveBeenCalledWith(true);
    expect(handleOpenChange).toHaveBeenCalledTimes(1);
    expect(handleOpenChange).toHaveBeenCalledWith(true);
  });

  it('does not toggle when disabled', () => {
    const handleToggle = vi.fn();
    render(
      <AccordionItem
        title="Disabled Title"
        content="Disabled Content"
        disabled
        onToggle={handleToggle}
      />,
    );

    const button = screen.getByRole('button', { name: /Disabled Title/i });
    expect(button).toHaveProperty('disabled', true);

    fireEvent.click(button);
    expect(handleToggle).not.toHaveBeenCalled();
    expect(screen.queryByText('Disabled Content')).toBeNull();
  });

  it('supports children as content', () => {
    render(
      <AccordionItem title="Children Title" defaultOpen>
        <span data-testid="custom-child">Custom Child Element</span>
      </AccordionItem>,
    );

    expect(screen.getByTestId('custom-child')).toBeDefined();
  });

  it('implements correct ARIA accessibility attributes', () => {
    render(<AccordionItem id="faq-1" title="Accessible Accordion" content="Accessible details" defaultOpen />);

    const button = screen.getByRole('button', { name: /Accessible Accordion/i });
    const region = screen.getByRole('region');

    expect(button.getAttribute('id')).toBe('faq-1-trigger');
    expect(button.getAttribute('aria-controls')).toBe('faq-1-panel');
    expect(button.getAttribute('aria-expanded')).toBe('true');

    expect(region.getAttribute('id')).toBe('faq-1-panel');
    expect(region.getAttribute('aria-labelledby')).toBe('faq-1-trigger');
  });

  it('supports custom headingLevel or none', () => {
    const { container: c1 } = render(
      <AccordionItem title="H2 Heading" headingLevel="h2" />,
    );
    expect(c1.querySelector('h2')).toBeDefined();

    const { container: c2 } = render(
      <AccordionItem title="No Heading" headingLevel="none" />,
    );
    expect(c2.querySelector('h1, h2, h3, h4, h5, h6')).toBeNull();
  });

  it('forwards ref to outer container', () => {
    const ref = createRef<HTMLDivElement>();
    render(<AccordionItem ref={ref} title="Ref Test" />);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
