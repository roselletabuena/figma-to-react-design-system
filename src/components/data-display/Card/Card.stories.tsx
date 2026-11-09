import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../actions/Button';
import { Card } from './Card';
import type { CardAssetType, CardDirection, CardVariant } from './Card.types';

const variants: CardVariant[] = ['stroke', 'default'];
const directions: CardDirection[] = ['horizontal', 'vertical'];
const assetTypes: CardAssetType[] = ['icon', 'image'];

const bodyText =
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
    variant: { control: 'inline-radio', options: variants },
    direction: { control: 'inline-radio', options: directions },
    assetType: { control: 'inline-radio', options: assetTypes },
    asset: { control: 'boolean' },
    heading: { control: 'text' },
    body: { control: 'text' },
  },
  args: {
    heading: 'Title',
    body: bodyText,
    variant: 'stroke',
    direction: 'horizontal',
    assetType: 'icon',
    asset: true,
    actions: <Button variant="neutral">Button</Button>,
  },
  decorators: [
    (Story) => (
      <div className="w-110">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every Figma variant: Asset Type x Direction x Variant. */
const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-600 bg-surface-secondary p-sds-400">
    {assetTypes.map((assetType) =>
      directions.map((direction) => (
        <div key={`${assetType}-${direction}`} className="flex gap-sds-600">
          {variants.map((variant) => (
            <Card
              key={variant}
              variant={variant}
              direction={direction}
              assetType={assetType}
              body={bodyText}
              actions={<Button variant="neutral">Button</Button>}
              className="w-110"
            />
          ))}
        </div>
      )),
    )}
  </div>
);

export const Default: Story = {};

export const Unframed: Story = { args: { variant: 'default' } };

export const Vertical: Story = { args: { direction: 'vertical' } };

export const Image: Story = { args: { assetType: 'image' } };

export const VerticalImage: Story = { args: { assetType: 'image', direction: 'vertical' } };

export const NoAsset: Story = { args: { asset: false, actions: undefined } };

export const AllVariants: Story = {
  parameters: { layout: 'padded' },
  decorators: [(Story) => <Story />],
  render: () => <AllVariantsGrid />,
};

export const DarkMode: Story = {
  // Applied by the theme decorator in .storybook/preview.tsx.
  tags: ['!autodocs'],
  parameters: { theme: 'dark', layout: 'padded' },
  decorators: [(Story) => <Story />],
  render: () => <AllVariantsGrid />,
};
