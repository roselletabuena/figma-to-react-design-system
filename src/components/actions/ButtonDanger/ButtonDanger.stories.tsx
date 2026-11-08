import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonDanger } from './ButtonDanger';
import type { ButtonDangerSize, ButtonDangerVariant } from './ButtonDanger.types';

const variants: ButtonDangerVariant[] = ['primary', 'subtle'];
const sizes: ButtonDangerSize[] = ['md', 'sm'];

// Star / X icons from the Figma design. Strokes use `currentColor` so they follow the label color
// in every variant, state and theme instead of baking in a hex value per state.
const StarIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 1.33333L10.06 5.50667L14.6667 6.18L11.3333 9.42667L12.12 14.0133L8 11.8467L3.88 14.0133L4.66667 9.42667L1.33333 6.18L5.94 5.50667L8 1.33333Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4L8 8M8 8L4 12M8 8L4 4M8 8L12 12"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta = {
  title: 'Components/Actions/ButtonDanger',
  component: ButtonDanger,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    size: { control: 'inline-radio', options: sizes },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    iconStart: { control: false },
    iconEnd: { control: false },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
} satisfies Meta<typeof ButtonDanger>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every Figma variant: Variant x Size x State (hover is forced via the Hover column's `:hover`). */
const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-400">
    {sizes.map((size) =>
      variants.map((variant) => (
        <div key={`${size}-${variant}`} className="flex items-center gap-sds-600">
          <ButtonDanger variant={variant} size={size}>
            Button
          </ButtonDanger>
          <ButtonDanger variant={variant} size={size} iconStart={<StarIcon />} iconEnd={<XIcon />}>
            Button
          </ButtonDanger>
          <ButtonDanger variant={variant} size={size} disabled>
            Button
          </ButtonDanger>
          <ButtonDanger
            variant={variant}
            size={size}
            disabled
            iconStart={<StarIcon />}
            iconEnd={<XIcon />}
          >
            Button
          </ButtonDanger>
        </div>
      )),
    )}
  </div>
);

export const Default: Story = {};

export const Subtle: Story = {
  args: { variant: 'subtle' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithIcons: Story = {
  args: { iconStart: <StarIcon />, iconEnd: <XIcon /> },
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
