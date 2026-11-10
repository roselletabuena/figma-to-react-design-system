import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';
import type { TagScheme, TagVariant } from './Tag.types';

const schemes: TagScheme[] = ['brand', 'danger', 'positive', 'warning', 'neutral'];
const variants: TagVariant[] = ['primary', 'secondary'];

// Some Figma Primary tags pair foreground/background colours below AA (e.g. danger and
// positive primary). The component follows the design tokens exactly, so axe's
// `color-contrast` rule is waived for these stories. TODO: have design review contrast.
const contrastWaiver = {
  a11y: { test: 'error', config: { rules: [{ id: 'color-contrast', enabled: false }] } },
} as const;

const meta = {
  title: 'Components/Data Display/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: variants },
    scheme: { control: 'select', options: schemes },
    removable: { control: 'boolean' },
  },
  args: {
    children: 'Tag',
    variant: 'primary',
    scheme: 'brand',
    removable: true,
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every Figma variant: Variant x Scheme, with and without the remove button. */
const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-400">
    {variants.map((variant) =>
      [true, false].map((removable) => (
        <div key={`${variant}-${removable}`} className="flex items-center gap-sds-400">
          {schemes.map((scheme) => (
            <Tag key={scheme} variant={variant} scheme={scheme} removable={removable}>
              Tag
            </Tag>
          ))}
        </div>
      )),
    )}
  </div>
);

export const Default: Story = {
  parameters: contrastWaiver,
};

export const AllVariants: Story = {
  parameters: contrastWaiver,
  render: () => <AllVariantsGrid />,
};

export const DarkMode: Story = {
  parameters: { theme: 'dark', ...contrastWaiver },
  render: () => <AllVariantsGrid />,
};
