import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';
import type { IconButtonSize, IconButtonVariant } from './IconButton.types';

const variants: IconButtonVariant[] = ['primary', 'neutral', 'subtle'];
const sizes: IconButtonSize[] = ['md', 'sm'];

const labels: Record<IconButtonVariant, string> = {
  primary: 'Primary',
  neutral: 'Neutral',
  subtle: 'Subtle',
};

// Figma "Star" icon (20px, 2 stroke). Stroke is `currentColor` so the icon follows the button's
// icon colour in every variant, state and theme.
const StarIcon = () => (
  <svg
    viewBox="0 0 20 20"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 1.66667L12.575 6.88333L18.3333 7.725L14.1667 11.7833L15.15 17.5167L10 14.8083L4.85 17.5167L5.83333 11.7833L1.66667 7.725L7.425 6.88333L10 1.66667Z" />
  </svg>
);

const meta = {
  title: 'Components/Actions/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    // Fail on axe violations for every IconButton story. axe skips disabled controls for colour
    // contrast (WCAG exempts them), so the enabled states are what this guards.
    a11y: { test: 'error' },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: variants,
    },
    size: {
      control: 'inline-radio',
      options: sizes,
    },
    'aria-label': { control: 'text' },
    disabled: { control: 'boolean' },
    icon: { control: false },
  },
  args: {
    icon: <StarIcon />,
    'aria-label': 'Favorite',
    variant: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every Figma variant: Variant x Size, enabled (top row) and disabled (bottom row). */
const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-600">
    {sizes.map((size) => (
      <div key={size} className="grid grid-cols-3 items-center justify-items-center gap-sds-400">
        {[false, true].map((disabled) =>
          variants.map((variant) => (
            <IconButton
              key={`${variant}-${disabled}`}
              variant={variant}
              size={size}
              disabled={disabled}
              icon={<StarIcon />}
              aria-label={labels[variant]}
            />
          )),
        )}
      </div>
    ))}
  </div>
);

export const Default: Story = {};

export const Neutral: Story = {
  args: { variant: 'neutral' },
};

export const Subtle: Story = {
  args: { variant: 'subtle' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Disabled: Story = {
  args: { disabled: true },
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
