import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarButton } from './CalendarButton';
import type { CalendarButtonSize, CalendarButtonVariant } from './CalendarButton.types';

const variants: CalendarButtonVariant[] = [
  'default',
  'hover',
  'active',
  'range',
  'disabled',
  'range-disabled',
  'hidden',
];

const sizes: CalendarButtonSize[] = ['md', 'sm'];

const meta = {
  title: 'Components/Forms/CalendarButton',
  component: CalendarButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: variants,
      description: 'Visual and functional state of the calendar date button',
    },
    state: {
      control: 'select',
      options: variants,
      description: 'Alias for variant matching Figma naming',
    },
    size: {
      control: 'inline-radio',
      options: sizes,
      description: 'Cell dimension size',
    },
    children: {
      control: 'text',
      description: 'Date or number displayed inside cell',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables button interactions',
    },
  },
  args: {
    children: '1',
    variant: 'default',
    size: 'md',
  },
} satisfies Meta<typeof CalendarButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-800 p-sds-400">
    {/* Matrix: State x Size */}
    {sizes.map((size) => (
      <div key={size} className="flex flex-col gap-sds-300">
        <span className="font-body-small text-text-default font-semibold uppercase tracking-wider">
          Size: {size.toUpperCase()} ({size === 'md' ? '40px - Figma canonical' : '32px'})
        </span>
        <div className="flex items-center gap-sds-300">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-sds-100">
              <CalendarButton variant={variant} size={size}>
                {variant === 'hidden' ? '' : '1'}
              </CalendarButton>
              <span className="font-body-small text-text-default text-xs">
                {variant}
              </span>
            </div>
          ))}
        </div>
      </div>
    ))}

    {/* Example Calendar Week Row (Figma row composition) */}
    <div className="flex flex-col gap-sds-300">
      <span className="font-body-small text-text-default font-semibold uppercase tracking-wider">
        Calendar Week Row Example (Figma composition)
      </span>
      <div className="flex items-center gap-sds-050 rounded-sds-200 border border-border-default p-sds-200 bg-surface">
        <CalendarButton variant="default">7</CalendarButton>
        <CalendarButton variant="default">8</CalendarButton>
        <CalendarButton variant="active">9</CalendarButton>
        <CalendarButton variant="range">10</CalendarButton>
        <CalendarButton variant="range">11</CalendarButton>
        <CalendarButton variant="range">12</CalendarButton>
        <CalendarButton variant="active">13</CalendarButton>
      </div>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    children: '1',
    variant: 'default',
  },
};

export const Hover: Story = {
  args: {
    children: '1',
    variant: 'hover',
  },
};

export const Active: Story = {
  args: {
    children: '1',
    variant: 'active',
  },
};

export const Range: Story = {
  args: {
    children: '1',
    variant: 'range',
  },
};

export const Disabled: Story = {
  args: {
    children: '1',
    variant: 'disabled',
  },
};

export const RangeDisabled: Story = {
  args: {
    children: '1',
    variant: 'range-disabled',
  },
};

export const Hidden: Story = {
  args: {
    children: '1',
    variant: 'hidden',
  },
  render: (args) => (
    <div className="border border-dashed border-border-default rounded-sds-200">
      <CalendarButton {...args} />
    </div>
  ),
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
