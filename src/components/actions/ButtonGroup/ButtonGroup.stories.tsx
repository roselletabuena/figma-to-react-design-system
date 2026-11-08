import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { ButtonGroup } from './ButtonGroup';
import type { ButtonGroupAlign } from './ButtonGroup.types';

const aligns: ButtonGroupAlign[] = ['start', 'end', 'center', 'justify', 'stack'];

const meta = {
  title: 'Components/Actions/Button Group',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  argTypes: {
    align: {
      control: 'inline-radio',
      options: aligns,
    },
    children: { control: false },
  },
  args: {
    align: 'start',
  },
  // Figma frames are 240px wide; the group itself fills its container.
  decorators: [
    (Story) => (
      <div className="w-60">
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <ButtonGroup {...args}>
      <Button variant="subtle">Button</Button>
      <Button variant="primary">Button</Button>
    </ButtonGroup>
  ),
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const AllAlignmentsGrid = () => (
  <div className="flex w-60 flex-col gap-sds-600">
    {aligns.map((align) => (
      <ButtonGroup key={align} align={align} aria-label={align}>
        <Button variant="subtle">Button</Button>
        <Button variant="primary">Button</Button>
      </ButtonGroup>
    ))}
  </div>
);

export const Default: Story = {};

export const End: Story = { args: { align: 'end' } };

export const Center: Story = { args: { align: 'center' } };

export const Justify: Story = { args: { align: 'justify' } };

export const Stack: Story = { args: { align: 'stack' } };

export const AllVariants: Story = {
  decorators: [],
  render: () => <AllAlignmentsGrid />,
};

export const DarkMode: Story = {
  // Applied by the theme decorator in .storybook/preview.tsx. Excluded from Autodocs because
  // the theme is toggled on <html>, which would turn the whole docs page dark.
  tags: ['!autodocs'],
  parameters: {
    theme: 'dark',
  },
  decorators: [],
  render: () => <AllAlignmentsGrid />,
};
