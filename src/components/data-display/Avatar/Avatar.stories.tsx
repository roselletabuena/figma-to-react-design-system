import type { Meta, StoryObj } from '@storybook/react-vite';
import avatarSample from '../../../assets/avatar-sample.png';
import { Avatar } from './Avatar';
import type { AvatarShape, AvatarSize } from './Avatar.types';

const sizes: AvatarSize[] = ['lg', 'md', 'sm'];
const shapes: AvatarShape[] = ['circle', 'square'];

const meta = {
  title: 'Components/Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    // Fail on axe violations (e.g. missing alt text / labels) for every Avatar story.
    // axe does not evaluate single-character text, so initials contrast is not covered here;
    // it is verified from the tokens instead (12.8:1 light, 15.3:1 dark; AA needs 4.5:1).
    a11y: { test: 'error' },
  },
  argTypes: {
    size: {
      control: 'inline-radio',
      options: sizes,
    },
    shape: {
      control: 'inline-radio',
      options: shapes,
    },
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
  },
  args: {
    size: 'lg',
    shape: 'circle',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every Figma variant: Type (image / initial) x Size x Shape. */
const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-400">
    {shapes.map((shape) => (
      <div key={shape} className="flex items-center gap-sds-600">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-sds-200">
            <Avatar shape={shape} size={size} src={avatarSample} alt="" />
            <Avatar shape={shape} size={size} initials="F" />
          </div>
        ))}
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    src: avatarSample,
    alt: 'Profile photo',
  },
};

export const Initial: Story = {
  args: {
    initials: 'F',
    alt: 'Foo',
  },
};

export const Square: Story = {
  args: {
    src: avatarSample,
    alt: 'Profile photo',
    shape: 'square',
  },
};

export const SquareInitial: Story = {
  args: {
    initials: 'F',
    alt: 'Foo',
    shape: 'square',
  },
};

export const AllVariants: Story = {
  render: () => <AllVariantsGrid />,
};

export const DarkMode: Story = {
  // Applied by the theme decorator in .storybook/preview.tsx. Excluded from Autodocs because
  // the theme is toggled on <html>, which would turn the whole docs page dark.
  tags: ['!autodocs'],
  parameters: {
    theme: 'dark',
  },
  render: () => <AllVariantsGrid />,
};
