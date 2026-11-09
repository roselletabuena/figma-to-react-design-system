import type { Meta, StoryObj } from '@storybook/react-vite';
import { CheckboxField } from './CheckboxField';

const meta = {
  title: 'Components/Forms/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    description: 'Description',
    checked: true,
    onChange: () => {},
  },
} satisfies Meta<typeof CheckboxField>;

export default meta;
type Story = StoryObj<typeof meta>;

const noop = () => {};

// Figma dims disabled text to 50% opacity. WCAG exempts disabled controls from the contrast
// requirement, but axe only recognises that for the control itself, not the description row.
const disabledA11y = { a11y: { config: { rules: [{ id: 'color-contrast', enabled: false }] } } };

/** Every Figma variant: Value Type x State (disabled in the right column). */
const AllVariantsGrid = () => (
  <div className="grid grid-cols-2 gap-x-sds-800 gap-y-sds-600">
    {[
      { checked: true },
      { checked: false },
      { checked: false, indeterminate: true },
    ].map((value, i) => (
      <div key={i} className="contents">
        <CheckboxField label="Label" description="Description" onChange={noop} {...value} />
        <CheckboxField label="Label" description="Description" onChange={noop} disabled {...value} />
      </div>
    ))}
  </div>
);

export const Default: Story = {};

export const Unchecked: Story = { args: { checked: false } };

export const Indeterminate: Story = { args: { checked: false, indeterminate: true } };

export const WithoutDescription: Story = { args: { description: undefined } };

export const Disabled: Story = { args: { disabled: true }, parameters: disabledA11y };

export const AllVariants: Story = {
  parameters: disabledA11y,
  render: () => <AllVariantsGrid />,
};

export const DarkMode: Story = {
  // Applied by the theme decorator in .storybook/preview.tsx.
  tags: ['!autodocs'],
  parameters: { theme: 'dark', ...disabledA11y },
  render: () => <AllVariantsGrid />,
};
