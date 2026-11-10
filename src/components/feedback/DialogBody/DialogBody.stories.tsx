import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../actions/Button';
import { DialogBody } from './DialogBody';

const meta = {
  title: 'Components/Feedback/DialogBody',
  component: DialogBody,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    // Fail on axe violations for every DialogBody story.
    a11y: { test: 'error' },
  },
  argTypes: {
    heading: { control: 'text' },
    body: { control: 'text' },
    dismissible: { control: 'boolean' },
    actions: { control: false },
    children: { control: false },
  },
  args: {
    heading: 'Text Heading',
    body: 'Body text',
    dismissible: true,
    actions: (
      <>
        <Button variant="neutral">Button</Button>
        <Button variant="primary">Button</Button>
      </>
    ),
  },
} satisfies Meta<typeof DialogBody>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NotDismissible: Story = {
  args: { dismissible: false },
};

export const NoActions: Story = {
  args: { actions: undefined },
};

export const CustomContent: Story = {
  args: {
    heading: undefined,
    body: undefined,
    actions: undefined,
    children: (
      <div className="flex w-full flex-col gap-sds-300 text-text-default">
        <p className="w-full font-heading">Custom slot content</p>
        <p className="w-full font-body-base">
          Anything can go here instead of the default heading, body and actions layout.
        </p>
      </div>
    ),
  },
};

export const DarkMode: Story = {
  // Applied by the theme decorator in .storybook/preview.tsx. Excluded from Autodocs because the
  // theme is toggled on <html>, which would turn the whole docs page dark.
  tags: ['!autodocs'],
  parameters: {
    theme: 'dark',
  },
};
