import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ColorPrimitives: Story = {
  render: () => {
    const scales = ['100', '200', '300', '400', '500', '600', '700', '800', '900', '1000'];
    const palettes = ['brand', 'gray', 'slate', 'green', 'red', 'yellow', 'pink'];

    return (
      <div className="flex flex-col gap-6 p-6 max-w-4xl font-sans text-text-default">
        <div>
          <h2 className="text-2xl font-bold mb-2">Color Primitives (@color_primitives)</h2>
          <p className="text-text-secondary text-sm">
            Core raw palette scales (100–1000) mapped 1:1 from Figma Simple Design System.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {palettes.map((palette) => (
            <div key={palette} className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold capitalize">{palette}</span>
              <div className="grid grid-cols-10 gap-1.5">
                {scales.map((step) => (
                  <div key={step} className="flex flex-col items-center gap-1">
                    <div
                      className="w-full h-12 rounded-sds-100 border border-border-default shadow-xs"
                      style={{ backgroundColor: `var(--sds-color-${palette}-${step})` }}
                    />
                    <span className="text-[10px] text-text-secondary">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const SemanticColors: Story = {
  render: () => {
    const categories = [
      {
        title: 'Background Surfaces',
        tokens: [
          { name: '--sds-color-background-default-default', desc: 'Main Surface' },
          { name: '--sds-color-background-default-secondary', desc: 'Secondary Surface' },
          { name: '--sds-color-background-default-tertiary', desc: 'Subtle Well / Input' },
          { name: '--sds-color-background-brand-default', desc: 'Brand Primary' },
          { name: '--sds-color-background-neutral-default', desc: 'Neutral Fill' },
          { name: '--sds-color-background-positive-default', desc: 'Success / Positive' },
          { name: '--sds-color-background-danger-default', desc: 'Danger / Error' },
          { name: '--sds-color-background-warning-default', desc: 'Warning' },
        ],
      },
      {
        title: 'Text & Foreground',
        tokens: [
          { name: '--sds-color-text-default-default', desc: 'Primary Text' },
          { name: '--sds-color-text-default-secondary', desc: 'Secondary Text' },
          { name: '--sds-color-text-default-tertiary', desc: 'Tertiary / Muted' },
          { name: '--sds-color-text-brand-default', desc: 'Brand Accent Text' },
          { name: '--sds-color-text-positive-default', desc: 'Success Text' },
          { name: '--sds-color-text-danger-default', desc: 'Danger Text' },
        ],
      },
      {
        title: 'Borders & Outlines',
        tokens: [
          { name: '--sds-color-border-default-default', desc: 'Default Divider' },
          { name: '--sds-color-border-default-secondary', desc: 'Medium Border' },
          { name: '--sds-color-border-brand-default', desc: 'Brand Border / Focus' },
          { name: '--sds-color-border-danger-default', desc: 'Error Border' },
        ],
      },
    ];

    return (
      <div className="flex flex-col gap-6 p-6 max-w-4xl font-sans text-text-default">
        <div>
          <h2 className="text-2xl font-bold mb-2">Semantic Tokens (@color)</h2>
          <p className="text-text-secondary text-sm">
            Contextual aliases that adapt automatically across Light and Dark modes.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category.title} className="flex flex-col gap-3">
            <h3 className="text-base font-semibold border-b border-border-default pb-1">
              {category.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {category.tokens.map((token) => (
                <div
                  key={token.name}
                  className="flex flex-col p-3 rounded-sds-200 border border-border-default bg-surface gap-2"
                >
                  <div
                    className="w-full h-10 rounded-sds-100 border border-border-default"
                    style={{ backgroundColor: `var(${token.name})` }}
                  />
                  <div>
                    <div className="text-xs font-semibold">{token.desc}</div>
                    <code className="text-[10px] text-text-secondary break-all">{token.name}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const SpacingAndRadius: Story = {
  render: () => {
    const spacingTokens = [
      { name: '100', val: '0.25rem (4px)' },
      { name: '200', val: '0.5rem (8px)' },
      { name: '300', val: '0.75rem (12px)' },
      { name: '400', val: '1rem (16px)' },
      { name: '600', val: '1.5rem (24px)' },
      { name: '800', val: '2rem (32px)' },
      { name: '1200', val: '3rem (48px)' },
    ];

    const radiusTokens = [
      { name: '100', val: '0.25rem (4px)' },
      { name: '200', val: '0.5rem (8px)' },
      { name: '400', val: '1rem (16px)' },
      { name: 'full', val: '9999px (Pill)' },
    ];

    return (
      <div className="flex flex-col gap-8 p-6 max-w-4xl font-sans text-text-default">
        <div>
          <h2 className="text-2xl font-bold mb-2">Spacing & Border Radius (@size)</h2>
          <p className="text-text-secondary text-sm">
            Core layout and curvature tokens defined in rem units for responsive scale.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold border-b border-border-default pb-1">Spacing</h3>
          <div className="flex flex-col gap-2">
            {spacingTokens.map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <span className="w-24 text-xs font-mono text-text-secondary">
                  --sds-space-{item.name}
                </span>
                <div
                  className="h-5 bg-brand rounded-sds-100"
                  style={{ width: `var(--sds-size-space-${item.name})` }}
                />
                <span className="text-xs text-text-secondary">{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold border-b border-border-default pb-1">Radius</h3>
          <div className="flex gap-4">
            {radiusTokens.map((item) => (
              <div
                key={item.name}
                className="w-20 h-20 border-2 border-brand flex flex-col items-center justify-center p-2 text-center"
                style={{ borderRadius: `var(--sds-size-radius-${item.name})` }}
              >
                <span className="text-xs font-semibold">{item.name}</span>
                <span className="text-[10px] text-text-secondary">{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
