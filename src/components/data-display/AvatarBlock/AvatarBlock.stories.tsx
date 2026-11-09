import type { Meta, StoryObj } from '@storybook/react-vite';
import avatarSample from '../../../assets/avatar-sample.png';
import { AvatarBlock } from './AvatarBlock';
import type { AvatarBlockShape, AvatarBlockSize } from './AvatarBlock.types';

const sizes: AvatarBlockSize[] = ['lg', 'md', 'sm'];
const shapes: AvatarBlockShape[] = ['circle', 'square'];

const meta = {
  title: 'Components/Data Display/Avatar Block',
  component: AvatarBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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
    title: { control: 'text' },
    description: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
    initials: { control: 'text' },
    avatar: { control: false },
    children: { control: false },
  },
  args: {
    size: 'lg',
    shape: 'circle',
    title: 'Title',
    description: 'Description',
  },
} satisfies Meta<typeof AvatarBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Grid displaying every variant across all sizes (lg, md, sm). */
const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-600">
    <div className="flex flex-col gap-sds-400">
      <span className="font-body-small-strong text-text-secondary uppercase tracking-wider">
        Default (Circle Image)
      </span>
      <div className="flex items-center gap-sds-600">
        {sizes.map((size) => (
          <AvatarBlock
            key={size}
            size={size}
            src={avatarSample}
            alt="Roselle Tabuena"
            title="Roselle Tabuena"
            description="Product Designer"
          />
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-sds-400">
      <span className="font-body-small-strong text-text-secondary uppercase tracking-wider">
        Initial (Circle)
      </span>
      <div className="flex items-center gap-sds-600">
        {sizes.map((size) => (
          <AvatarBlock
            key={size}
            size={size}
            initials="F"
            alt="Foo Bar"
            title="Foo Bar"
            description="Engineering Lead"
          />
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-sds-400">
      <span className="font-body-small-strong text-text-secondary uppercase tracking-wider">
        Square Image
      </span>
      <div className="flex items-center gap-sds-600">
        {sizes.map((size) => (
          <AvatarBlock
            key={size}
            size={size}
            shape="square"
            src={avatarSample}
            alt="Roselle Tabuena"
            title="Roselle Tabuena"
            description="Product Designer"
          />
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-sds-400">
      <span className="font-body-small-strong text-text-secondary uppercase tracking-wider">
        Square Initial
      </span>
      <div className="flex items-center gap-sds-600">
        {sizes.map((size) => (
          <AvatarBlock
            key={size}
            size={size}
            shape="square"
            initials="F"
            alt="Foo Bar"
            title="Foo Bar"
            description="Engineering Lead"
          />
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-sds-400">
      <span className="font-body-small-strong text-text-secondary uppercase tracking-wider">
        Title Only
      </span>
      <div className="flex items-center gap-sds-600">
        {sizes.map((size) => (
          <AvatarBlock
            key={size}
            size={size}
            src={avatarSample}
            alt="Roselle Tabuena"
            title="Roselle Tabuena"
          />
        ))}
      </div>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    src: avatarSample,
    alt: 'Roselle Tabuena',
    title: 'Roselle Tabuena',
    description: 'Product Designer',
  },
};

export const Initial: Story = {
  args: {
    initials: 'F',
    alt: 'Foo Bar',
    title: 'Foo Bar',
    description: 'Engineering Lead',
  },
};

export const Square: Story = {
  args: {
    src: avatarSample,
    alt: 'Roselle Tabuena',
    shape: 'square',
    title: 'Roselle Tabuena',
    description: 'Product Designer',
  },
};

export const SquareInitial: Story = {
  args: {
    initials: 'F',
    alt: 'Foo Bar',
    shape: 'square',
    title: 'Foo Bar',
    description: 'Engineering Lead',
  },
};

export const TitleOnly: Story = {
  args: {
    src: avatarSample,
    alt: 'Roselle Tabuena',
    title: 'Roselle Tabuena',
    description: undefined,
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
