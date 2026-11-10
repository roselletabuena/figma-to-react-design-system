import type { Meta, StoryObj } from '@storybook/react-vite';
import avatarSample from '../../../assets/avatar-sample.png';
import { AvatarBlock } from './AvatarBlock';
import type { AvatarBlockShape, AvatarBlockSize } from './AvatarBlock.types';

const sizes: AvatarBlockSize[] = ['lg', 'md', 'sm'];
const shapes: AvatarBlockShape[] = ['circle', 'square'];

const meta = {
  title: 'Components/Data Display/AvatarBlock',
  component: AvatarBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
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
    title: 'Title',
    description: 'Description',
    size: 'lg',
    shape: 'circle',
  },
} satisfies Meta<typeof AvatarBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Grid showing shapes x sizes for both image and initials. */
const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-600">
    {shapes.map((shape) => (
      <div key={shape} className="flex flex-col gap-sds-400">
        <span className="font-body-small-strong text-text-secondary uppercase">
          {shape}
        </span>
        <div className="flex flex-col gap-sds-300">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-sds-600">
              <AvatarBlock
                shape={shape}
                size={size}
                src={avatarSample}
                alt="Profile photo"
                title={`${shape} ${size}`}
                description="Image avatar"
              />
              <AvatarBlock
                shape={shape}
                size={size}
                initials="F"
                title={`${shape} ${size}`}
                description="Initials avatar"
              />
              <AvatarBlock
                shape={shape}
                size={size}
                src={avatarSample}
                alt="Profile photo"
                title={`${shape} ${size}`}
              />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    src: avatarSample,
    alt: 'Profile photo',
  },
};

export const Initial: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    initials: 'F',
  },
};

export const Square: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    src: avatarSample,
    alt: 'Profile photo',
    shape: 'square',
  },
};

export const SquareInitial: Story = {
  args: {
    title: 'Title',
    description: 'Description',
    initials: 'F',
    shape: 'square',
  },
};

export const TitleOnly: Story = {
  args: {
    title: 'Title',
    src: avatarSample,
    alt: 'Profile photo',
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
