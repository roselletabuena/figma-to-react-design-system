import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputField } from './InputField';

const meta = {
  title: 'Components/Forms/InputField',
  component: InputField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Label',
    defaultValue: 'Value',
  },
  decorators: [
    (Story) => (
      <div className="w-[240px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every Figma variant: State (Default, Disabled, Error) x Value Type (Value, Placeholder). */
const AllVariantsGrid = () => (
  <div className="grid w-[760px] grid-cols-3 gap-sds-600">
    <InputField label="Label" defaultValue="Value" />
    <InputField label="Label" defaultValue="Value" disabled />
    <InputField label="Label" defaultValue="Value" invalid />
    <InputField label="Label" placeholder="Value" />
    <InputField label="Label" placeholder="Value" disabled />
    <InputField label="Label" placeholder="Value" invalid />
  </div>
);

export const Default: Story = {};

export const Placeholder: Story = {
  args: { defaultValue: undefined, placeholder: 'Value' },
};

export const WithDescription: Story = {
  args: { description: 'Description' },
};

export const WithError: Story = {
  args: { error: 'Error' },
};

export const Invalid: Story = {
  args: { invalid: true, error: 'Error' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  decorators: [(Story) => <Story />],
  render: () => <AllVariantsGrid />,
};

export const DarkMode: Story = {
  // Applied by the theme decorator in .storybook/preview.tsx. Excluded from Autodocs because
  // the theme is toggled on <html>, which would turn the whole docs page dark.
  tags: ['!autodocs'],
  parameters: { theme: 'dark', layout: 'padded' },
  decorators: [(Story) => <Story />],
  render: () => <AllVariantsGrid />,
};
