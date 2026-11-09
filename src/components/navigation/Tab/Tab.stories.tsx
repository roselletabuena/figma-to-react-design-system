import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab } from './Tab';

const meta = {
  title: 'Components/Navigation/Tab',
  component: Tab,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  argTypes: {
    active: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Label',
    active: false,
  },
  // A tab must sit inside a tablist (axe: aria-required-parent).
  decorators: [
    (Story) => (
      <div role="tablist" className="flex items-center gap-sds-400">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Active x Default. Hover is shown by pointing at a tab. */
const AllVariantsGrid = () => (
  <>
    <Tab>Label</Tab>
    <Tab active>Label</Tab>
  </>
);

export const Default: Story = {};

export const Active: Story = {
  args: { active: true },
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
