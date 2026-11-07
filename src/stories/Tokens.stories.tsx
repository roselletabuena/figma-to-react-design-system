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
    const backgroundSections = [
      {
        subtitle: 'Default / Surfaces',
        tokens: [
          { name: '--sds-color-background-default-default', desc: 'Default Surface' },
          { name: '--sds-color-background-default-default-hover', desc: 'Default Hover' },
          { name: '--sds-color-background-default-secondary', desc: 'Secondary Surface' },
          { name: '--sds-color-background-default-secondary-hover', desc: 'Secondary Hover' },
          { name: '--sds-color-background-default-tertiary', desc: 'Tertiary Well' },
          { name: '--sds-color-background-default-tertiary-hover', desc: 'Tertiary Hover' },
        ],
      },
      {
        subtitle: 'Brand Surfaces',
        tokens: [
          { name: '--sds-color-background-brand-default', desc: 'Brand Primary' },
          { name: '--sds-color-background-brand-hover', desc: 'Brand Hover' },
          { name: '--sds-color-background-brand-secondary', desc: 'Brand Subtle' },
          { name: '--sds-color-background-brand-secondary-hover', desc: 'Brand Subtle Hover' },
          { name: '--sds-color-background-brand-tertiary', desc: 'Brand Tint' },
          { name: '--sds-color-background-brand-tertiary-hover', desc: 'Brand Tint Hover' },
        ],
      },
      {
        subtitle: 'Neutral & Feedback',
        tokens: [
          { name: '--sds-color-background-neutral-default', desc: 'Neutral Default' },
          { name: '--sds-color-background-positive-default', desc: 'Positive Default' },
          { name: '--sds-color-background-positive-secondary', desc: 'Positive Subtle' },
          { name: '--sds-color-background-warning-default', desc: 'Warning Default' },
          { name: '--sds-color-background-warning-secondary', desc: 'Warning Subtle' },
          { name: '--sds-color-background-danger-default', desc: 'Danger Default' },
          { name: '--sds-color-background-danger-secondary', desc: 'Danger Subtle' },
          { name: '--sds-color-background-disabled-default', desc: 'Disabled Fill' },
        ],
      },
      {
        subtitle: 'Modal & Backdrop Utilities',
        tokens: [
          { name: '--sds-color-background-utilities-scrim', desc: 'Scrim (Subtle White Wash)' },
          { name: '--sds-color-background-utilities-blanket', desc: 'Blanket (Dark Backdrop)' },
          { name: '--sds-color-background-utilities-overlay', desc: 'Overlay (Semi-transparent)' },
        ],
      },
    ];

    const textSections = [
      {
        subtitle: 'Default & Brand Text',
        tokens: [
          { name: '--sds-color-text-default-default', desc: 'Primary Text' },
          { name: '--sds-color-text-default-secondary', desc: 'Secondary / Subtitle' },
          { name: '--sds-color-text-default-tertiary', desc: 'Tertiary / Caption' },
          { name: '--sds-color-text-brand-default', desc: 'Brand Foreground' },
          { name: '--sds-color-text-brand-on-brand', desc: 'On Brand (High Contrast)' },
          { name: '--sds-color-text-brand-secondary', desc: 'Brand Muted' },
        ],
      },
      {
        subtitle: 'Feedback & Disabled Text',
        tokens: [
          { name: '--sds-color-text-positive-default', desc: 'Positive Text' },
          { name: '--sds-color-text-warning-default', desc: 'Warning Text' },
          { name: '--sds-color-text-danger-default', desc: 'Danger Text' },
          { name: '--sds-color-text-neutral-default', desc: 'Neutral Text' },
          { name: '--sds-color-text-disabled-default', desc: 'Disabled Text' },
        ],
      },
    ];

    const iconSections = [
      {
        subtitle: 'Icon Tints & States',
        tokens: [
          { name: '--sds-color-icon-default-default', desc: 'Primary Icon' },
          { name: '--sds-color-icon-default-secondary', desc: 'Secondary Icon' },
          { name: '--sds-color-icon-default-tertiary', desc: 'Tertiary Icon' },
          { name: '--sds-color-icon-brand-default', desc: 'Brand Icon' },
          { name: '--sds-color-icon-brand-on-brand', desc: 'On Brand Icon' },
          { name: '--sds-color-icon-positive-default', desc: 'Positive Icon' },
          { name: '--sds-color-icon-warning-default', desc: 'Warning Icon' },
          { name: '--sds-color-icon-danger-default', desc: 'Danger Icon' },
          { name: '--sds-color-icon-disabled-default', desc: 'Disabled Icon' },
        ],
      },
    ];

    const borderSections = [
      {
        subtitle: 'Divider & Stroke Tints',
        tokens: [
          { name: '--sds-color-border-default-default', desc: 'Default Divider' },
          { name: '--sds-color-border-default-secondary', desc: 'Medium Border' },
          { name: '--sds-color-border-default-tertiary', desc: 'Strong Border' },
          { name: '--sds-color-border-brand-default', desc: 'Brand Focus / Active' },
          { name: '--sds-color-border-positive-default', desc: 'Positive Border' },
          { name: '--sds-color-border-warning-default', desc: 'Warning Border' },
          { name: '--sds-color-border-danger-default', desc: 'Error Border' },
          { name: '--sds-color-border-disabled-default', desc: 'Disabled Outline' },
        ],
      },
    ];

    const renderGrid = (items: { name: string; desc: string }[], isText = false, isBorder = false) => (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map((token) => (
          <div
            key={token.name}
            className="flex flex-col p-3 rounded-sds-200 border border-border-default bg-surface gap-2"
          >
            {isText ? (
              <div className="h-10 flex items-center justify-center rounded-sds-100 bg-surface-secondary">
                <span className="font-semibold text-sm" style={{ color: `var(${token.name})` }}>
                  Aa Text
                </span>
              </div>
            ) : isBorder ? (
              <div
                className="w-full h-10 rounded-sds-100 bg-surface-secondary flex items-center justify-center"
                style={{ border: `2px solid var(${token.name})` }}
              >
                <span className="text-[10px] text-text-secondary">border</span>
              </div>
            ) : (
              <div
                className="w-full h-10 rounded-sds-100 border border-border-default shadow-xs"
                style={{ backgroundColor: `var(${token.name})` }}
              />
            )}
            <div>
              <div className="text-xs font-semibold">{token.desc}</div>
              <code className="text-[9px] text-text-secondary break-all block mt-0.5">
                {token.name}
              </code>
            </div>
          </div>
        ))}
      </div>
    );

    return (
      <div className="flex flex-col gap-10 p-6 max-w-6xl font-sans text-text-default">
        <div>
          <h2 className="text-2xl font-bold mb-2">Color Foundation (@color)</h2>
          <p className="text-text-secondary text-sm">
            Complete 4-matrix color system mapped directly from Figma SDS node 226-13679. Supports
            both Light & Dark themes automatically.
          </p>
        </div>

        {/* Note from Figma */}
        <div className="p-4 rounded-sds-200 border border-border-brand bg-brand-secondary text-text-default text-xs leading-relaxed">
          <span className="font-bold">Theming Notice:</span> To theme the Simple Design System for
          your brand, update the primitive brand ramp (100–1000). All four semantic collections
          (Background, Border, Icon, and Text) adapt automatically.
        </div>

        {/* 1. Backgrounds */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold border-b border-border-default pb-1">1. Background</h3>
          {backgroundSections.map((sec) => (
            <div key={sec.subtitle} className="flex flex-col gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {sec.subtitle}
              </h4>
              {renderGrid(sec.tokens)}
            </div>
          ))}
        </div>

        {/* 2. Text */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold border-b border-border-default pb-1">2. Text</h3>
          {textSections.map((sec) => (
            <div key={sec.subtitle} className="flex flex-col gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {sec.subtitle}
              </h4>
              {renderGrid(sec.tokens, true)}
            </div>
          ))}
        </div>

        {/* 3. Icon */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold border-b border-border-default pb-1">3. Icon</h3>
          {iconSections.map((sec) => (
            <div key={sec.subtitle} className="flex flex-col gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {sec.subtitle}
              </h4>
              {renderGrid(sec.tokens)}
            </div>
          ))}
        </div>

        {/* 4. Border */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-bold border-b border-border-default pb-1">4. Border</h3>
          {borderSections.map((sec) => (
            <div key={sec.subtitle} className="flex flex-col gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {sec.subtitle}
              </h4>
              {renderGrid(sec.tokens, false, true)}
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const SpacingAndRadius: Story = {
  render: () => {
    const radiusTokens = [
      { name: 'Small', token: '--sds-size-radius-100', val: '0.25rem (4px)', desc: 'Badges, tags, small controls' },
      { name: 'Base', token: '--sds-size-radius-200', val: '0.5rem (8px)', desc: 'Standard buttons, cards, inputs' },
      { name: 'Large', token: '--sds-size-radius-400', val: '1rem (16px)', desc: 'Modals, popovers, containers' },
      { name: 'Full', token: '--sds-size-radius-full', val: '9999px (Pill)', desc: 'Avatars, pill badges, switch toggles' },
    ];

    const gapSteps = [
      { name: 'Space 100', pos: '4px', neg: '-4px', posVar: '--sds-size-space-100', negVar: '--sds-size-space-negative-100' },
      { name: 'Space 200', pos: '8px', neg: '-8px', posVar: '--sds-size-space-200', negVar: '--sds-size-space-negative-200' },
      { name: 'Space 300', pos: '12px', neg: '-12px', posVar: '--sds-size-space-300', negVar: '--sds-size-space-negative-300' },
      { name: 'Space 400', pos: '16px', neg: '-16px', posVar: '--sds-size-space-400', negVar: '--sds-size-space-negative-400' },
      { name: 'Space 600', pos: '24px', neg: '-24px', posVar: '--sds-size-space-600', negVar: '--sds-size-space-negative-600' },
      { name: 'Space 1600', pos: '64px', neg: '-64px', posVar: '--sds-size-space-1600', negVar: '--sds-size-space-negative-1600' },
    ];

    const componentPadding = [
      { name: 'Space 100', val: '0.25rem (4px)', varName: '--sds-size-space-100' },
      { name: 'Space 200', val: '0.5rem (8px)', varName: '--sds-size-space-200' },
      { name: 'Space 300', val: '0.75rem (12px)', varName: '--sds-size-space-300' },
      { name: 'Space 400', val: '1rem (16px)', varName: '--sds-size-space-400' },
      { name: 'Space 600', val: '1.5rem (24px)', varName: '--sds-size-space-600' },
      { name: 'Space 800', val: '2rem (32px)', varName: '--sds-size-space-800' },
    ];

    const sectionPadding = [
      { name: 'Space 800', val: '2rem (32px)', varName: '--sds-size-space-800' },
      { name: 'Space 1600', val: '4rem (64px)', varName: '--sds-size-space-1600' },
      { name: 'Space 2400', val: '6rem (96px)', varName: '--sds-size-space-2400' },
      { name: 'Space 4000', val: '10rem (160px)', varName: '--sds-size-space-4000' },
    ];

    return (
      <div className="flex flex-col gap-10 p-6 max-w-6xl font-sans text-text-default">
        <div>
          <h2 className="text-2xl font-bold mb-2">Size Foundation (@size)</h2>
          <p className="text-text-secondary text-sm">
            Geometry, layout, and curvature scale directly mapped from Figma Simple Design System node 226-13680.
          </p>
        </div>

        {/* Note from Figma */}
        <div className="p-4 rounded-sds-200 border border-border-brand bg-brand-secondary text-text-default text-xs leading-relaxed">
          <span className="font-bold">Unified Space Principle:</span> SDS consolidates Padding, Gap, and Margin into a single unified Space scale (100–4000) that can be applied consistently to any layout dimension.
        </div>

        {/* 1. Radius */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold border-b border-border-default pb-1">1. Radius</h3>
          <p className="text-xs text-text-secondary">Standardized corner radii scale from 4px curves up to pill shapes.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {radiusTokens.map((item) => (
              <div
                key={item.name}
                className="flex flex-col p-4 rounded-sds-200 border border-border-default bg-surface gap-3 items-center"
              >
                <div
                  className="w-20 h-20 bg-surface-secondary border-2 border-border-brand flex items-center justify-center shadow-sds-200"
                  style={{ borderRadius: `var(${item.token})` }}
                >
                  <span className="text-xs font-semibold text-text-secondary">{item.name}</span>
                </div>
                <div className="w-full text-center">
                  <div className="text-sm font-bold text-text-default">{item.name}</div>
                  <div className="text-xs font-mono text-text-brand mt-0.5">{item.val}</div>
                  <code className="text-[10px] text-text-secondary block mt-1">{item.token}</code>
                  <p className="text-[11px] text-text-secondary mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Space -> Gap (Positive & Negative) */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold border-b border-border-default pb-1">2. Space → Gap (Positive & Negative)</h3>
          <p className="text-xs text-text-secondary">
            Demonstrates positive gaps for layout separation and negative gaps for overlapping elements (e.g., avatar stacks, overlapping cards).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Positive Gap Column */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Positive Gap (Separation)
              </h4>
              <div className="flex flex-col gap-3">
                {gapSteps.map((step) => (
                  <div
                    key={step.name}
                    className="p-3 rounded-sds-200 border border-border-default bg-surface flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold">{step.name}</div>
                      <div className="text-[11px] text-text-secondary font-mono">{step.pos}</div>
                      <code className="text-[10px] text-text-secondary">{step.posVar}</code>
                    </div>
                    <div
                      className="flex items-center p-2 rounded-sds-100 bg-surface-secondary"
                      style={{ gap: `var(${step.posVar})` }}
                    >
                      <div className="w-8 h-8 rounded-sds-100 bg-brand text-[10px] font-bold text-text-brand-on-brand flex items-center justify-center shadow-xs">
                        1
                      </div>
                      <div className="w-8 h-8 rounded-sds-100 bg-brand text-[10px] font-bold text-text-brand-on-brand flex items-center justify-center shadow-xs">
                        2
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Negative Gap Column */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Negative Gap (Overlap)
              </h4>
              <div className="flex flex-col gap-3">
                {gapSteps.map((step) => (
                  <div
                    key={step.name}
                    className="p-3 rounded-sds-200 border border-border-default bg-surface flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold">{step.name} (Negative)</div>
                      <div className="text-[11px] text-text-secondary font-mono">{step.neg}</div>
                      <code className="text-[10px] text-text-secondary">{step.negVar}</code>
                    </div>
                    <div
                      className="flex items-center p-2 rounded-sds-100 bg-surface-secondary"
                      style={{ gap: `var(${step.negVar})` }}
                    >
                      <div className="w-8 h-8 rounded-sds-100 bg-neutral text-[10px] font-bold text-text-default flex items-center justify-center shadow-xs z-10 border border-border-default">
                        A
                      </div>
                      <div className="w-8 h-8 rounded-sds-100 bg-brand text-[10px] font-bold text-text-brand-on-brand flex items-center justify-center shadow-xs z-0 border border-border-default">
                        B
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Space -> Padding (Component vs Section) */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold border-b border-border-default pb-1">3. Space → Padding</h3>
          <p className="text-xs text-text-secondary">
            Hierarchical spacing tiers: Micro-layouts (Component Scale) vs Macro-layouts (Section Scale).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Component Scale */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Component Scale (4px – 32px)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {componentPadding.map((pad) => (
                  <div
                    key={pad.name}
                    className="flex flex-col p-3 rounded-sds-200 border border-border-default bg-surface gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold">{pad.name}</span>
                      <span className="text-[10px] font-mono text-text-secondary">{pad.val}</span>
                    </div>
                    <div
                      className="rounded-sds-100 bg-surface-secondary border border-dashed border-border-default flex items-center justify-center"
                      style={{ padding: `var(${pad.varName})` }}
                    >
                      <div className="w-full h-6 bg-brand rounded-sds-100 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-text-brand-on-brand">inner</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Scale */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Section Scale (32px – 160px)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sectionPadding.map((pad) => (
                  <div
                    key={pad.name}
                    className="flex flex-col p-3 rounded-sds-200 border border-border-default bg-surface gap-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold">{pad.name}</span>
                      <span className="text-[10px] font-mono text-text-secondary">{pad.val}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 bg-brand rounded-sds-100"
                        style={{ width: `min(100%, var(${pad.varName}))` }}
                      />
                    </div>
                    <code className="text-[10px] text-text-secondary">{pad.varName}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const Typography: Story = {
  render: () => {
    const typographySections = [
      {
        title: 'Title',
        description: 'Large display titles for hero areas, landing pages, and primary page headers.',
        items: [
          {
            name: 'Title Hero',
            className: 'font-title-hero',
            sample: 'Title Hero',
            specs: 'Inter · Bold (700) · 72px (4.5rem) · Line height 1.2 · Tracking -0.03em',
            token: '--sds-font-title-hero',
          },
          {
            name: 'Title Page',
            className: 'font-title-page',
            sample: 'Title Page',
            specs: 'Inter · Bold (700) · 48px (3.0rem) · Line height 1.2 · Tracking -0.02em',
            token: '--sds-font-title-page',
          },
          {
            name: 'Subtitle',
            className: 'font-subtitle',
            sample: 'Subtitle',
            specs: 'Inter · Regular (400) · 32px (2.0rem) · Line height 1.2',
            token: '--sds-font-subtitle',
          },
        ],
      },
      {
        title: 'Heading',
        description: 'Section and card headings. By default, styles point to medium variables.',
        items: [
          {
            name: 'Heading',
            className: 'font-heading',
            sample: 'Heading',
            specs: 'Inter · SemiBold (600) · 24px (1.5rem) · Line height 1.2 · Tracking -0.02em',
            token: '--sds-font-heading',
          },
          {
            name: 'Subheading',
            className: 'font-subheading',
            sample: 'Subheading',
            specs: 'Inter · Regular (400) · 20px (1.25rem) · Line height 1.2',
            token: '--sds-font-subheading',
          },
        ],
      },
      {
        title: 'Body',
        description: 'Standard multi-line body typography with 1.4 line height for comfortable readability.',
        items: [
          {
            name: 'Body Base',
            className: 'font-body-base',
            sample: 'Body Base: The quick brown fox jumps over the lazy dog.',
            specs: 'Inter · Regular (400) · 16px (1.0rem) · Line height 1.4',
            token: '--sds-font-body-base',
          },
          {
            name: 'Body Strong',
            className: 'font-body-strong',
            sample: 'Body Strong: The quick brown fox jumps over the lazy dog.',
            specs: 'Inter · SemiBold (600) · 16px (1.0rem) · Line height 1.4',
            token: '--sds-font-body-strong',
          },
          {
            name: 'Body Emphasis',
            className: 'font-body-emphasis',
            sample: 'Body Emphasis: The quick brown fox jumps over the lazy dog.',
            specs: 'Inter · Regular Italic (400) · 16px (1.0rem) · Line height 1.4',
            token: '--sds-font-body-emphasis',
          },
          {
            name: 'Body Link',
            className: 'font-body-link',
            sample: 'Body Link: The quick brown fox jumps over the lazy dog.',
            specs: 'Inter · Regular (400) · 16px (1.0rem) · Line height 1.4 · Underline',
            token: '--sds-font-body-link',
          },
          {
            name: 'Body Small',
            className: 'font-body-small',
            sample: 'Body Small: The quick brown fox jumps over the lazy dog.',
            specs: 'Inter · Regular (400) · 14px (0.875rem) · Line height 1.4',
            token: '--sds-font-body-small',
          },
          {
            name: 'Body Small Strong',
            className: 'font-body-small-strong',
            sample: 'Body Small Strong: The quick brown fox jumps over the lazy dog.',
            specs: 'Inter · SemiBold (600) · 14px (0.875rem) · Line height 1.4',
            token: '--sds-font-body-small-strong',
          },
          {
            name: 'Body Code',
            className: 'font-body-code',
            sample: 'const token = "sds-typography-scale-03";',
            specs: 'Roboto Mono · Regular (400) · 16px (1.0rem) · Line height 1.3',
            token: '--sds-font-body-code',
          },
        ],
      },
      {
        title: 'Single Line (UI Components)',
        description:
          'Dedicated single-line variants with 1.0 (100%) line height to ensure pixel-perfect vertical centering in Buttons, Badges, and Text Inputs.',
        items: [
          {
            name: 'Single Line / Body Base',
            className: 'font-single-line-base',
            sample: 'Single Line Body Base',
            specs: 'Inter · Regular (400) · 16px (1.0rem) · Line height 1.0 (100%)',
            token: '--sds-font-single-line-body-base',
          },
          {
            name: 'Single Line / Body Small Strong',
            className: 'font-single-line-small-strong',
            sample: 'Single Line Body Small Strong',
            specs: 'Inter · SemiBold (600) · 14px (0.875rem) · Line height 1.0 (100%)',
            token: '--sds-font-single-line-body-small-strong',
          },
        ],
      },
    ];

    return (
      <div className="flex flex-col gap-10 p-6 max-w-5xl font-sans text-text-default">
        <div>
          <h2 className="text-2xl font-bold mb-2">Typography Foundation (@typography)</h2>
          <p className="text-text-secondary text-sm">
            Exact 1:1 mapping from Figma Simple Design System node 226-13829. Includes Titles,
            Headings, Body scales, Code, and Single-Line variants for UI controls.
          </p>
        </div>

        {typographySections.map((section) => (
          <div key={section.title} className="flex flex-col gap-4">
            <div>
              <h3 className="text-lg font-bold border-b border-border-default pb-1">
                {section.title}
              </h3>
              <p className="text-xs text-text-secondary mt-1">{section.description}</p>
            </div>

            <div className="flex flex-col gap-3">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  className="flex flex-col gap-2 p-4 rounded-sds-200 border border-border-default bg-surface"
                >
                  <div className="flex items-center justify-between border-b border-border-default pb-2">
                    <span className="text-xs font-semibold text-text-secondary">{item.name}</span>
                    <code className="text-[10px] text-text-secondary bg-surface-secondary px-2 py-0.5 rounded-sds-100">
                      {item.token}
                    </code>
                  </div>
                  <div className={`${item.className} text-text-default py-1 overflow-x-auto`}>
                    {item.sample}
                  </div>
                  <div className="text-[11px] text-text-secondary font-mono">{item.specs}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Effects: Story = {
  render: () => {
    const elevationLevels = [
      { level: '100', desc: 'Subtle card border & baseline surface', token: '--sds-effects-shadows-drop-shadow-100', innerToken: '--sds-effects-shadows-inner-shadow-100', tailwind: 'shadow-sds-100' },
      { level: '200', desc: 'Interactive card hover & dropdown lift', token: '--sds-effects-shadows-drop-shadow-200', innerToken: '--sds-effects-shadows-inner-shadow-200', tailwind: 'shadow-sds-200' },
      { level: '300', desc: 'Floating toolbars & small menus', token: '--sds-effects-shadows-drop-shadow-300', innerToken: '--sds-effects-shadows-inner-shadow-300', tailwind: 'shadow-sds-300' },
      { level: '400', desc: 'Flyouts, popovers & sticky panels', token: '--sds-effects-shadows-drop-shadow-400', innerToken: '--sds-effects-shadows-inner-shadow-400', tailwind: 'shadow-sds-400' },
      { level: '500', desc: 'Drawers & bottom action sheets', token: '--sds-effects-shadows-drop-shadow-500', innerToken: '--sds-effects-shadows-inner-shadow-500', tailwind: 'shadow-sds-500' },
      { level: '600', desc: 'Global modals, dialogs & alerts', token: '--sds-effects-shadows-drop-shadow-600', innerToken: '--sds-effects-shadows-inner-shadow-600', tailwind: 'shadow-sds-600' },
    ];

    const blurEffects = [
      {
        name: 'Overlay',
        type: 'Backdrop Filter',
        desc: 'Modal backdrops and dimmed sheets with 50% opacity wash',
        className: 'backdrop-blur-sds-overlay bg-black/50 text-white',
        token: '--sds-effects-backdrop-filter-blur-overlay',
      },
      {
        name: 'Blanket',
        type: 'Backdrop Filter',
        desc: 'High-contrast blackout backdrops with 70% opacity wash',
        className: 'backdrop-blur-sds-blanket bg-black/70 text-white',
        token: '--sds-effects-backdrop-filter-blur-blanket',
      },
      {
        name: 'Glass',
        type: 'Backdrop Filter',
        desc: 'Frosted glass navigation headers and floating surfaces',
        className: 'backdrop-blur-sds-glass bg-white/80 dark:bg-black/60 text-text-default border border-white/20',
        token: '--sds-effects-backdrop-filter-blur-glass',
      },
      {
        name: 'Layer',
        type: 'Element Filter',
        desc: 'Direct blur applied to background images or artwork',
        className: 'blur-sds-layer bg-brand text-text-brand-on-brand',
        token: '--sds-effects-filter-blur-layer',
      },
    ];

    return (
      <div className="flex flex-col gap-10 p-6 max-w-6xl font-sans text-text-default">
        <div>
          <h2 className="text-2xl font-bold mb-2">Effects Foundation (@effects)</h2>
          <p className="text-text-secondary text-sm">
            Complete elevation, inner depth, and atmospheric blur system from Figma SDS node 226-13682.
          </p>
        </div>

        {/* Note from Figma */}
        <div className="p-4 rounded-sds-200 border border-border-brand bg-brand-secondary text-text-default text-xs leading-relaxed">
          <span className="font-bold">Elevation Customization:</span> To change the effects within the Simple Design System to look like your brand, change the depth offsets and opacity values stored within each Style.
        </div>

        {/* 1. Drop Shadows */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold border-b border-border-default pb-1">1. Drop Shadows (Elevation 100–600)</h3>
          <p className="text-xs text-text-secondary">
            Ambient and directional shadows illustrating elevation height above the canvas. Shown frameless (left) and with border (right) as in Figma.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {elevationLevels.map((item) => (
              <div
                key={item.level}
                className="flex flex-col p-4 rounded-sds-200 border border-border-default bg-surface-secondary gap-4"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">Level {item.level}</span>
                  <code className="text-[10px] text-text-secondary">{item.tailwind}</code>
                </div>
                <div className="flex items-center justify-around gap-3 p-4 bg-surface rounded-sds-100">
                  {/* Frameless */}
                  <div
                    className="w-16 h-16 rounded-sds-200 bg-surface flex items-center justify-center text-[10px] font-semibold text-text-secondary"
                    style={{ boxShadow: `var(${item.token})` }}
                  >
                    Clean
                  </div>
                  {/* With Border */}
                  <div
                    className="w-16 h-16 rounded-sds-200 bg-surface border border-border-default flex items-center justify-center text-[10px] font-semibold text-text-secondary"
                    style={{ boxShadow: `var(${item.token})` }}
                  >
                    Border
                  </div>
                </div>
                <p className="text-[11px] text-text-secondary">{item.desc}</p>
                <code className="text-[9px] text-text-secondary break-all font-mono">{item.token}</code>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Inner Shadows */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold border-b border-border-default pb-1">2. Inner Shadows (Inset Depth 100–600)</h3>
          <p className="text-xs text-text-secondary">
            Recessed shadows used for sunken wells, active/pressed button states, input troughs, and tactile elements.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {elevationLevels.map((item) => (
              <div
                key={item.level}
                className="flex flex-col p-3 rounded-sds-200 border border-border-default bg-surface gap-3 items-center text-center"
              >
                <div
                  className="w-16 h-16 rounded-sds-200 bg-surface-secondary border border-border-default flex items-center justify-center text-xs font-bold text-text-secondary"
                  style={{ boxShadow: `var(${item.innerToken})` }}
                >
                  {item.level}
                </div>
                <div>
                  <div className="text-xs font-bold">Inner {item.level}</div>
                  <code className="text-[8px] text-text-secondary break-all block mt-1">
                    {item.innerToken}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Blur Effects */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold border-b border-border-default pb-1">3. Blur & Frosted Glass Effects</h3>
          <p className="text-xs text-text-secondary">
            Backdrop filter blurs for modal curtains, floating navigations, and direct layer blurs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {blurEffects.map((item) => (
              <div
                key={item.name}
                className="flex flex-col p-3 rounded-sds-200 border border-border-default bg-surface gap-3"
              >
                <div className="text-xs font-bold flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="text-[10px] text-text-secondary font-normal">{item.type}</span>
                </div>
                {/* Visual container with rich pattern underneath */}
                <div className="relative w-full h-28 rounded-sds-100 overflow-hidden flex items-center justify-center p-3 bg-gradient-to-tr from-brand-secondary via-brand to-neutral">
                  <div className="absolute inset-0 flex items-center justify-center text-white/20 font-black text-2xl select-none">
                    BACKGROUND
                  </div>
                  <div
                    className={`relative z-10 w-full h-full rounded-sds-100 flex flex-col items-center justify-center p-2 text-center shadow-xs ${item.className}`}
                  >
                    <span className="text-xs font-bold">{item.name}</span>
                    <span className="text-[9px] opacity-80 mt-0.5">2px Blur</span>
                  </div>
                </div>
                <p className="text-[11px] text-text-secondary">{item.desc}</p>
                <code className="text-[9px] text-text-secondary break-all font-mono">{item.token}</code>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
