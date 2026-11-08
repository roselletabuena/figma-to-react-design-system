import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../actions/Button';
import { Card } from './Card';
import type { CardVariant, CardDirection, CardAssetType } from './Card.types';

const variants: CardVariant[] = ['default', 'stroke'];
const directions: CardDirection[] = ['horizontal', 'vertical'];
const assetTypes: CardAssetType[] = ['icon', 'image'];

const defaultHeading = 'Title';
const defaultBody =
  'Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.';

const meta = {
  title: 'Components/Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    a11y: { test: 'error' },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: variants,
    },
    direction: {
      control: 'inline-radio',
      options: directions,
    },
    assetType: {
      control: 'inline-radio',
      options: assetTypes,
    },
    showAsset: { control: 'boolean' },
    heading: { control: 'text' },
    body: { control: 'text' },
    showActions: { control: 'boolean' },
    actions: { control: false },
    asset: { control: false },
    children: { control: false },
  },
  args: {
    variant: 'default',
    direction: 'horizontal',
    assetType: 'icon',
    showAsset: true,
    heading: defaultHeading,
    body: defaultBody,
    showActions: true,
    actions: <Button variant="neutral">Button</Button>,
  },
  decorators: [
    (Story) => (
      <div className="w-[440px] max-w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Stroke: Story = {
  args: {
    variant: 'stroke',
  },
};

export const Vertical: Story = {
  args: {
    variant: 'stroke',
    direction: 'vertical',
  },
};

export const Image: Story = {
  args: {
    variant: 'stroke',
    assetType: 'image',
  },
};

/** All 8 combinations from Figma: Variant (default, stroke) x Direction (horizontal, vertical) x Asset Type (icon, image). */
const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-600">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-sds-600">
      {variants.map((variant) =>
        directions.map((direction) =>
          assetTypes.map((assetType) => (
            <div key={`${variant}-${direction}-${assetType}`} className="w-[440px] max-w-full">
              <Card
                variant={variant}
                direction={direction}
                assetType={assetType}
                heading={`${defaultHeading} (${variant}, ${direction}, ${assetType})`}
                body={defaultBody}
                actions={<Button variant="neutral">Button</Button>}
              />
            </div>
          )),
        ),
      )}
    </div>
  </div>
);

export const AllVariants: Story = {
  decorators: [],
  render: () => <AllVariantsGrid />,
};

export const DarkMode: Story = {
  tags: ['!autodocs'],
  parameters: {
    theme: 'dark',
  },
  decorators: [],
  render: () => <AllVariantsGrid />,
};
