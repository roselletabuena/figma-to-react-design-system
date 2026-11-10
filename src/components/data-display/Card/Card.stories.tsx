import type { Meta, StoryObj } from '@storybook/react-vite';
import cardSample from '../../../assets/card-sample.png';
import { Card } from './Card';
import type { CardAssetType, CardDirection, CardVariant } from './Card.types';

const variants: CardVariant[] = ['default', 'stroke'];
const directions: CardDirection[] = ['horizontal', 'vertical'];
const assetTypes: CardAssetType[] = ['icon', 'image'];

const sampleHeading = 'Title';
const sampleBody =
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
    hasAsset: { control: 'boolean' },
    hasAction: { control: 'boolean' },
    heading: { control: 'text' },
    body: { control: 'text' },
    imageSrc: { control: 'text' },
    imageAlt: { control: 'text' },
    asset: { control: false },
    action: { control: false },
  },
  args: {
    variant: 'default',
    direction: 'horizontal',
    assetType: 'icon',
    hasAsset: true,
    hasAction: true,
    heading: sampleHeading,
    body: sampleBody,
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

/**
 * All 8 variants defined in Figma Simple Design System (node 2142:11380):
 * Asset Type (Icon / Image) x Variant (Default / Stroke) x Direction (Horizontal / Vertical).
 */
const AllVariantsGrid = () => (
  <div className="flex flex-col gap-sds-800 p-sds-600 max-w-[960px] w-full">
    <div className="flex flex-col gap-sds-400">
      <h2 className="font-heading text-text-default">Icon Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-sds-600 items-start">
        <div className="flex flex-col gap-sds-200">
          <span className="font-body-small-strong text-text-secondary">Default / Horizontal</span>
          <Card
            variant="default"
            direction="horizontal"
            assetType="icon"
            heading={sampleHeading}
            body={sampleBody}
          />
        </div>
        <div className="flex flex-col gap-sds-200">
          <span className="font-body-small-strong text-text-secondary">Stroke / Horizontal</span>
          <Card
            variant="stroke"
            direction="horizontal"
            assetType="icon"
            heading={sampleHeading}
            body={sampleBody}
          />
        </div>
        <div className="flex flex-col gap-sds-200">
          <span className="font-body-small-strong text-text-secondary">Default / Vertical</span>
          <Card
            variant="default"
            direction="vertical"
            assetType="icon"
            heading={sampleHeading}
            body={sampleBody}
          />
        </div>
        <div className="flex flex-col gap-sds-200">
          <span className="font-body-small-strong text-text-secondary">Stroke / Vertical</span>
          <Card
            variant="stroke"
            direction="vertical"
            assetType="icon"
            heading={sampleHeading}
            body={sampleBody}
          />
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-sds-400">
      <h2 className="font-heading text-text-default">Image Cards</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-sds-600 items-start">
        <div className="flex flex-col gap-sds-200">
          <span className="font-body-small-strong text-text-secondary">Default / Horizontal</span>
          <Card
            variant="default"
            direction="horizontal"
            assetType="image"
            imageSrc={cardSample}
            imageAlt="Sample preview"
            heading={sampleHeading}
            body={sampleBody}
          />
        </div>
        <div className="flex flex-col gap-sds-200">
          <span className="font-body-small-strong text-text-secondary">Stroke / Horizontal</span>
          <Card
            variant="stroke"
            direction="horizontal"
            assetType="image"
            imageSrc={cardSample}
            imageAlt="Sample preview"
            heading={sampleHeading}
            body={sampleBody}
          />
        </div>
        <div className="flex flex-col gap-sds-200">
          <span className="font-body-small-strong text-text-secondary">Default / Vertical</span>
          <Card
            variant="default"
            direction="vertical"
            assetType="image"
            imageSrc={cardSample}
            imageAlt="Sample preview"
            heading={sampleHeading}
            body={sampleBody}
          />
        </div>
        <div className="flex flex-col gap-sds-200">
          <span className="font-body-small-strong text-text-secondary">Stroke / Vertical</span>
          <Card
            variant="stroke"
            direction="vertical"
            assetType="image"
            imageSrc={cardSample}
            imageAlt="Sample preview"
            heading={sampleHeading}
            body={sampleBody}
          />
        </div>
      </div>
    </div>
  </div>
);

export const Default: Story = {
  args: {
    variant: 'default',
    direction: 'horizontal',
    assetType: 'icon',
  },
};

export const Stroke: Story = {
  args: {
    variant: 'stroke',
    direction: 'horizontal',
    assetType: 'icon',
  },
};

export const Vertical: Story = {
  args: {
    variant: 'default',
    direction: 'vertical',
    assetType: 'icon',
  },
};

export const VerticalStroke: Story = {
  args: {
    variant: 'stroke',
    direction: 'vertical',
    assetType: 'icon',
  },
};

export const WithImage: Story = {
  args: {
    variant: 'stroke',
    direction: 'horizontal',
    assetType: 'image',
    imageSrc: cardSample,
    imageAlt: 'Sample illustration',
  },
};

export const WithImageVertical: Story = {
  args: {
    variant: 'stroke',
    direction: 'vertical',
    assetType: 'image',
    imageSrc: cardSample,
    imageAlt: 'Sample illustration',
  },
};

export const WithoutAsset: Story = {
  args: {
    variant: 'stroke',
    hasAsset: false,
  },
};

export const AllVariants: Story = {
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
  render: () => <AllVariantsGrid />,
};

export const DarkMode: Story = {
  tags: ['!autodocs'],
  parameters: {
    theme: 'dark',
  },
  decorators: [
    (Story) => (
      <div className="w-full">
        <Story />
      </div>
    ),
  ],
  render: () => <AllVariantsGrid />,
};
