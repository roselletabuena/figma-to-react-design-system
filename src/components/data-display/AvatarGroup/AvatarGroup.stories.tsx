import type { Meta, StoryObj } from '@storybook/react-vite';
import avatarSample from '../../../assets/avatar-sample.png';
import { Avatar } from '../Avatar';
import type { AvatarSize } from '../Avatar/Avatar.types';
import { AvatarGroup } from './AvatarGroup';
import type { AvatarGroupSpacing } from './AvatarGroup.types';

const spacings: AvatarGroupSpacing[] = ['overlap', 'spaced'];
const sizes: AvatarSize[] = ['lg', 'md', 'sm'];

const renderSampleAvatars = (size?: AvatarSize) => (
  <>
    <Avatar size={size} src={avatarSample} alt="User 1" />
    <Avatar size={size} src={avatarSample} alt="User 2" />
    <Avatar size={size} initials="F" alt="User 3" />
  </>
);

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
    showOverflow: { control: 'boolean' },
    number: { control: 'text' },
    children: { control: false },
  },
  args: {
    spacing: 'overlap',
    size: 'lg',
    showOverflow: true,
    number: '+1',
  },
  render: (args) => (
    <AvatarGroup {...args}>
      {renderSampleAvatars(args.size)}
    </AvatarGroup>
  ),
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Matrix of Spacing variants x Sizes, with and without overflow. */
const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-600">
    {spacings.map((spacing) => (
      <div key={spacing} className="flex flex-col gap-sds-300">
        <span className="font-body-small-strong text-text-secondary capitalize">
          Spacing: {spacing}
        </span>
        <div className="flex flex-col gap-sds-300">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-sds-600">
              <AvatarGroup spacing={spacing} size={size} showOverflow number="+1">
                {renderSampleAvatars(size)}
              </AvatarGroup>
              <AvatarGroup spacing={spacing} size={size} showOverflow={false}>
                {renderSampleAvatars(size)}
              </AvatarGroup>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const Default: Story = {
  args: {
    spacing: 'overlap',
  },
};

export const Spaced: Story = {
  args: {
    spacing: 'spaced',
  },
};

export const WithoutOverflow: Story = {
  args: {
    spacing: 'overlap',
    showOverflow: false,
  },
};

export const CustomOverflow: Story = {
  args: {
    spacing: 'overlap',
    number: '+12',
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
