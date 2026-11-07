import type { Meta, StoryObj } from '@storybook/react-vite';
import { TopAppBar } from '../TopAppBar';

const meta: Meta<typeof TopAppBar> = {
  title: 'Material 3/TopAppBar',
  component: TopAppBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TopAppBar>;

export const SmallCentered: Story = {
  args: {
    title: 'Label',
  },
};

export const WithSupportingText: Story = {
  args: {
    title: 'Label',
    supportingText: 'Supporting text',
  },
};

export const WithCustomAvatar: Story = {
  args: {
    title: 'Page Title',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&fit=crop&crop=faces',
  },
};
