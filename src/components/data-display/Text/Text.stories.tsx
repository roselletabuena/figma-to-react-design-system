import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta = {
  title: 'Components/Data Display/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  argTypes: {
    children: { control: 'text' },
  },
  args: {
    children: 'Text',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkMode: Story = {
  // Applied by the theme decorator in .storybook/preview.tsx.
  tags: ['!autodocs'],
  parameters: {
    theme: 'dark',
  },
};
