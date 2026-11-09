import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioField } from './RadioField';

const meta = {
  title: 'Components/Forms/RadioField',
  component: RadioField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    hasDescription: { control: 'boolean' },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    description: 'Description',
    hasDescription: true,
    disabled: false,
  },
} satisfies Meta<typeof RadioField>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * All variants: State (Default / Disabled) x Value Type (Unchecked / Checked) x Has Description.
 */
const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-600">
    <div className="flex items-start gap-sds-800">
      <div className="flex flex-col gap-sds-400">
        <span className="font-subheading text-text-default">Default (Unchecked)</span>
        <RadioField name="grid-default-unchecked" label="Label" description="Description" defaultChecked={false} />
        <RadioField name="grid-default-unchecked-nodesc" label="Label" hasDescription={false} defaultChecked={false} />
      </div>
      <div className="flex flex-col gap-sds-400">
        <span className="font-subheading text-text-default">Default (Checked)</span>
        <RadioField name="grid-default-checked" label="Label" description="Description" defaultChecked={true} />
        <RadioField name="grid-default-checked-nodesc" label="Label" hasDescription={false} defaultChecked={true} />
      </div>
    </div>
    <div className="flex items-start gap-sds-800">
      <div className="flex flex-col gap-sds-400">
        <span className="font-subheading text-text-default">Disabled (Unchecked)</span>
        <RadioField name="grid-disabled-unchecked" label="Label" description="Description" disabled defaultChecked={false} />
        <RadioField name="grid-disabled-unchecked-nodesc" label="Label" hasDescription={false} disabled defaultChecked={false} />
      </div>
      <div className="flex flex-col gap-sds-400">
        <span className="font-subheading text-text-default">Disabled (Checked)</span>
        <RadioField name="grid-disabled-checked" label="Label" description="Description" disabled defaultChecked={true} />
        <RadioField name="grid-disabled-checked-nodesc" label="Label" hasDescription={false} disabled defaultChecked={true} />
      </div>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    label: 'Label',
    description: 'Description',
    defaultChecked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Label',
    description: 'Description',
    checked: true,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  args: {
    label: 'Label',
    description: 'Description',
    disabled: true,
    defaultChecked: false,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Label',
    description: 'Description',
    disabled: true,
    checked: true,
    onChange: () => {},
  },
};

export const WithoutDescription: Story = {
  args: {
    label: 'Label',
    hasDescription: false,
    defaultChecked: false,
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
