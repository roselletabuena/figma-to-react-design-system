import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxField } from './CheckboxField';

const meta = {
  title: 'Components/Forms/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    // Fail on axe violations for every CheckboxField story. axe skips disabled controls for
    // colour contrast (WCAG exempts them), so the enabled states are what this guards.
    a11y: { test: 'error' },
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
  },
  args: {
    label: 'Accept terms and conditions',
  },
} satisfies Meta<typeof CheckboxField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every Figma state: unchecked, checked, indeterminate, error and disabled. */
const AllStatesGrid = () => (
  <div className="flex flex-col gap-sds-400">
    <CheckboxField label="Unchecked" />
    <CheckboxField label="Checked" defaultChecked />
    <CheckboxField label="Indeterminate" indeterminate />
    <CheckboxField label="With description" description="Supporting copy goes here." />
    <CheckboxField label="With error" error="This field is required." />
    <CheckboxField label="Required" required />
    <CheckboxField label="Disabled" disabled />
    <CheckboxField label="Disabled, checked" disabled defaultChecked />
  </div>
);

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: 'You agree to our Terms of Service and Privacy Policy.',
  },
};

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

export const WithError: Story = {
  args: {
    error: 'You must accept the terms to continue.',
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
};

export const AllStates: Story = {
  render: () => <AllStatesGrid />,
};

export const DarkMode: Story = {
  // Applied by the theme decorator in .storybook/preview.tsx. Excluded from Autodocs because
  // the theme is toggled on <html>, which would turn the whole docs page dark.
  tags: ['!autodocs'],
  parameters: {
    theme: 'dark',
  },
  render: () => <AllStatesGrid />,
};
