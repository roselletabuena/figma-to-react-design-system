import type { Meta, StoryObj } from '@storybook/react-vite';
import avatarSample from '../../../assets/avatar-sample.png';
import { Avatar } from '../Avatar';
import { AvatarGroup } from './AvatarGroup';
import type { AvatarGroupSize, AvatarGroupSpacing } from './AvatarGroup.types';

const spacings: AvatarGroupSpacing[] = ['overlap', 'spaced'];
const sizes: AvatarGroupSize[] = ['lg', 'md', 'sm'];

const meta = {
  title: 'Components/Data Display/Avatar Group',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  argTypes: {
    spacing: {
      control: 'inline-radio',
      options: spacings,
    },
    size: {
      control: 'inline-radio',
      options: sizes,
    },
    max: { control: 'number' },
    overflow: { control: 'text' },
    showOverflow: { control: 'boolean' },
    children: { control: false },
  },
  args: {
    spacing: 'overlap',
    size: 'lg',
    overflow: '+1',
    showOverflow: true,
  },
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar src={avatarSample} alt="Alex Rivera" />
      <Avatar initials="B" alt="Blake Chen" />
      <Avatar src={avatarSample} alt="Charlie Kim" />
    </AvatarGroup>
  ),
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-600">
    {spacings.map((spacing) => (
      <div key={spacing} className="flex flex-col gap-sds-300">
        <span className="font-subheading text-text-secondary capitalize">{spacing}</span>
        <div className="flex flex-col gap-sds-400">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-sds-600">
              {/* With overflow badge */}
              <AvatarGroup spacing={spacing} size={size} overflow="+1" aria-label={`${spacing} ${size} with overflow`}>
                <Avatar src={avatarSample} alt="User 1" />
                <Avatar initials="F" alt="User 2" />
                <Avatar src={avatarSample} alt="User 3" />
              </AvatarGroup>

              {/* Without overflow badge */}
              <AvatarGroup spacing={spacing} size={size} showOverflow={false} aria-label={`${spacing} ${size} without overflow`}>
                <Avatar src={avatarSample} alt="User 1" />
                <Avatar initials="F" alt="User 2" />
                <Avatar src={avatarSample} alt="User 3" />
              </AvatarGroup>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const Default: Story = {};

export const Spaced: Story = {
  args: {
    spacing: 'spaced',
  },
};

export const WithoutOverflow: Story = {
  args: {
    showOverflow: false,
  },
};

export const WithMax: Story = {
  render: (args) => (
    <AvatarGroup {...args} max={3}>
      <Avatar src={avatarSample} alt="User 1" />
      <Avatar initials="A" alt="User 2" />
      <Avatar src={avatarSample} alt="User 3" />
      <Avatar initials="B" alt="User 4" />
      <Avatar src={avatarSample} alt="User 5" />
    </AvatarGroup>
  ),
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
