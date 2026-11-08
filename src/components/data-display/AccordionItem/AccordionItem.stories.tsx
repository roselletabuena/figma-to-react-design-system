import type { Meta, StoryObj } from '@storybook/react-vite';
import { AccordionItem } from './AccordionItem';
import type { AccordionItemState } from './AccordionItem.types';

const states: AccordionItemState[] = ['closed', 'open'];

const meta = {
  title: 'Components/Data Display/Accordion Item',
  component: AccordionItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  argTypes: {
    state: {
      control: 'inline-radio',
      options: states,
    },
    title: { control: 'text' },
    content: { control: 'text' },
    disabled: { control: 'boolean' },
    open: { control: 'boolean' },
    defaultOpen: { control: 'boolean' },
  },
  args: {
    title: 'Title',
    content:
      'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.',
  },
  decorators: [
    (Story) => (
      <div className="w-[640px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccordionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * All variants of Accordion Item matching Figma component states (Closed, Open) plus Disabled.
 */
const AllVariantsGrid = () => (
  <div className="flex w-[640px] max-w-full flex-col gap-sds-400">
    <AccordionItem
      title="State = Closed"
      content="Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list."
      state="closed"
    />
    <AccordionItem
      title="State = Open"
      content="Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list."
      state="open"
    />
    <AccordionItem
      title="State = Disabled"
      content="This accordion item cannot be interacted with."
      disabled
    />
  </div>
);

export const Default: Story = {
  args: {
    title: 'Title',
    content:
      'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.',
  },
};

export const Closed: Story = {
  args: {
    title: 'Closed Accordion Item',
    content:
      'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.',
    state: 'closed',
  },
};

export const Open: Story = {
  args: {
    title: 'Open Accordion Item',
    content:
      'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.',
    state: 'open',
  },
};

export const Disabled: Story = {
  args: {
    title: 'Disabled Accordion Item',
    content: 'Disabled accordion item content.',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => <AllVariantsGrid />,
};

export const DarkMode: Story = {
  tags: ['!autodocs'],
  parameters: {
    theme: 'dark',
  },
  render: () => <AllVariantsGrid />,
};
