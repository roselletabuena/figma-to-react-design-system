import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import type { ButtonSize, ButtonVariant } from './Button.types';

const variants: ButtonVariant[] = ['primary', 'neutral', 'subtle'];
const sizes: ButtonSize[] = ['md', 'sm'];

const labels: Record<ButtonVariant, string> = {
  primary: 'Primary',
  neutral: 'Neutral',
  subtle: 'Subtle',
};

// Figma "Star" and "X" icons (16px, 1.6 stroke). Stroke is `currentColor` so the icon follows
// the button's text colour in every variant, state and theme.
const iconProps = {
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const StarIcon = () => (
  <svg {...iconProps}>
    <path d="M8.00016 1.33325L10.0602 5.50659L14.6668 6.17992L11.3335 9.42659L12.1202 14.0133L8.00016 11.8466L3.88016 14.0133L4.66683 9.42659L1.3335 6.17992L5.94016 5.50659L8.00016 1.33325Z" />
  </svg>
);

const XIcon = () => (
  <svg {...iconProps}>
    <path d="M12 4L8 8M8 8L4 12M8 8L4 4M8 8L12 12" />
  </svg>
);

const meta = {
  title: 'Components/Actions/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    // Fail on axe violations for every Button story. axe skips disabled controls for colour
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
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    iconStart: { control: false },
    iconEnd: { control: false },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every Figma variant: Variant x Size, with and without icons, plus the disabled state. */
const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-600">
    {sizes.map((size) => (
      <div key={size} className="grid grid-cols-3 items-center justify-items-start gap-sds-400">
        {variants.map((variant) => (
          <div key={variant} className="contents">
            <Button variant={variant} size={size}>
              {labels[variant]}
            </Button>
            <Button variant={variant} size={size} iconStart={<StarIcon />} iconEnd={<XIcon />}>
              {labels[variant]}
            </Button>
            <Button variant={variant} size={size} disabled>
              {labels[variant]}
            </Button>
          </div>
        ))}
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

export const WithIcons: Story = {
  args: {
    iconStart: <StarIcon />,
    iconEnd: <XIcon />,
  },
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
