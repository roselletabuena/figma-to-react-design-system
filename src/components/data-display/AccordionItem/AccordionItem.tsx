import { forwardRef, useId, useState, type MouseEvent } from 'react';
import type { AccordionItemProps } from './AccordionItem.types';

const defaultContent =
  'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.';

/**
 * AccordionItem component adhering to the Simple Design System (SDS).
 *
 * Implements Figma Accordion Item (node-id=7753:4634) with State=Closed and State=Open.
 */
export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (
    {
      title = 'Title',
      children,
      content,
      state,
      open,
      defaultOpen = false,
      onToggle,
      onOpenChange,
      disabled = false,
      headingLevel = 'h3',
      className = '',
      id: customId,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const id = customId ?? generatedId;
    const triggerId = `${id}-trigger`;
    const panelId = `${id}-panel`;

    // Support both controlled (`open` or `state`) and uncontrolled (`defaultOpen`) usage.
    const isControlled = open !== undefined || state !== undefined;
    const controlledOpen = open !== undefined ? open : state === 'open';

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

    const handleToggle = (_e: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      const nextOpen = !isOpen;
      if (!isControlled) {
        setUncontrolledOpen(nextOpen);
      }
      onToggle?.(nextOpen);
      onOpenChange?.(nextOpen);
    };

    const containerClasses = [
      'w-full rounded-sds-200 border border-border-default p-sds-400 transition-colors duration-200',
      isOpen
        ? 'bg-surface'
        : disabled
          ? 'bg-surface-secondary'
          : 'bg-surface-secondary hover:bg-surface-secondary-hover',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const triggerClasses = [
      'group flex w-full items-center justify-between gap-sds-200 text-left transition-colors',
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand rounded-sds-100',
    ].join(' ');

    const contentToRender = children ?? content ?? defaultContent;

    const buttonElement = (
      <button
        id={triggerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={disabled}
        onClick={handleToggle}
        className={triggerClasses}
      >
        <span className="font-body-strong text-text-default flex-1">{title}</span>
        <svg
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`size-5 shrink-0 text-icon-default transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          <path d="M5 7.5L10 12.5L15 7.5" />
        </svg>
      </button>
    );

    const Heading = headingLevel !== 'none' ? headingLevel : null;

    return (
      <div ref={ref} id={id} className={containerClasses} {...props}>
        {Heading ? (
          <Heading className="m-0 font-normal leading-none">{buttonElement}</Heading>
        ) : (
          buttonElement
        )}
        {isOpen && (
          <div
            id={panelId}
            role="region"
            aria-labelledby={triggerId}
            className="mt-sds-200 font-body-base text-text-default"
          >
            {contentToRender}
          </div>
        )}
      </div>
    );
  },
);

AccordionItem.displayName = 'AccordionItem';
