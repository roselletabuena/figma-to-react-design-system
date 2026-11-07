/**
 * Simple Design System (SDS) - Design Tokens Package
 */

export * from './types';

/**
 * Constant mappings to SDS CSS variable names
 * Allows programmatic lookup in TypeScript components, inline styles, or canvas renderers.
 */
export const sdsTokens = {
  color: {
    background: {
      brand: {
        default: 'var(--sds-color-background-brand-default)',
        hover: 'var(--sds-color-background-brand-hover)',
        secondary: 'var(--sds-color-background-brand-secondary)',
        secondaryHover: 'var(--sds-color-background-brand-secondary-hover)',
        tertiary: 'var(--sds-color-background-brand-tertiary)',
        tertiaryHover: 'var(--sds-color-background-brand-tertiary-hover)',
      },
      default: {
        default: 'var(--sds-color-background-default-default)',
        hover: 'var(--sds-color-background-default-default-hover)',
        secondary: 'var(--sds-color-background-default-secondary)',
        secondaryHover: 'var(--sds-color-background-default-secondary-hover)',
        tertiary: 'var(--sds-color-background-default-tertiary)',
        tertiaryHover: 'var(--sds-color-background-default-tertiary-hover)',
      },
      neutral: {
        default: 'var(--sds-color-background-neutral-default)',
        hover: 'var(--sds-color-background-neutral-hover)',
        secondary: 'var(--sds-color-background-neutral-secondary)',
        tertiary: 'var(--sds-color-background-neutral-tertiary)',
      },
      danger: {
        default: 'var(--sds-color-background-danger-default)',
        hover: 'var(--sds-color-background-danger-hover)',
        secondary: 'var(--sds-color-background-danger-secondary)',
        tertiary: 'var(--sds-color-background-danger-tertiary)',
      },
      warning: {
        default: 'var(--sds-color-background-warning-default)',
        hover: 'var(--sds-color-background-warning-hover)',
        secondary: 'var(--sds-color-background-warning-secondary)',
        tertiary: 'var(--sds-color-background-warning-tertiary)',
      },
      positive: {
        default: 'var(--sds-color-background-positive-default)',
        hover: 'var(--sds-color-background-positive-hover)',
        secondary: 'var(--sds-color-background-positive-secondary)',
        tertiary: 'var(--sds-color-background-positive-tertiary)',
      },
      disabled: 'var(--sds-color-background-disabled-default)',
      utilities: {
        blanket: 'var(--sds-color-background-utilities-blanket)',
        overlay: 'var(--sds-color-background-utilities-overlay)',
        scrim: 'var(--sds-color-background-utilities-scrim)',
      },
    },
    text: {
      brand: {
        default: 'var(--sds-color-text-brand-default)',
        onBrand: 'var(--sds-color-text-brand-on-brand)',
        secondary: 'var(--sds-color-text-brand-secondary)',
        tertiary: 'var(--sds-color-text-brand-tertiary)',
      },
      default: {
        default: 'var(--sds-color-text-default-default)',
        secondary: 'var(--sds-color-text-default-secondary)',
        tertiary: 'var(--sds-color-text-default-tertiary)',
      },
      neutral: {
        default: 'var(--sds-color-text-neutral-default)',
        secondary: 'var(--sds-color-text-neutral-secondary)',
        tertiary: 'var(--sds-color-text-neutral-tertiary)',
      },
      danger: {
        default: 'var(--sds-color-text-danger-default)',
        secondary: 'var(--sds-color-text-danger-secondary)',
      },
      warning: {
        default: 'var(--sds-color-text-warning-default)',
        secondary: 'var(--sds-color-text-warning-secondary)',
      },
      positive: {
        default: 'var(--sds-color-text-positive-default)',
        secondary: 'var(--sds-color-text-positive-secondary)',
      },
      disabled: 'var(--sds-color-text-disabled-default)',
    },
    border: {
      brand: {
        default: 'var(--sds-color-border-brand-default)',
        secondary: 'var(--sds-color-border-brand-secondary)',
        tertiary: 'var(--sds-color-border-brand-tertiary)',
      },
      default: {
        default: 'var(--sds-color-border-default-default)',
        secondary: 'var(--sds-color-border-default-secondary)',
        tertiary: 'var(--sds-color-border-default-tertiary)',
      },
      neutral: {
        default: 'var(--sds-color-border-neutral-default)',
        secondary: 'var(--sds-color-border-neutral-secondary)',
      },
      danger: 'var(--sds-color-border-danger-default)',
      warning: 'var(--sds-color-border-warning-default)',
      positive: 'var(--sds-color-border-positive-default)',
      disabled: 'var(--sds-color-border-disabled-default)',
    },
    icon: {
      brand: {
        default: 'var(--sds-color-icon-brand-default)',
        onBrand: 'var(--sds-color-icon-brand-on-brand)',
        secondary: 'var(--sds-color-icon-brand-secondary)',
        tertiary: 'var(--sds-color-icon-brand-tertiary)',
      },
      default: {
        default: 'var(--sds-color-icon-default-default)',
        secondary: 'var(--sds-color-icon-default-secondary)',
        tertiary: 'var(--sds-color-icon-default-tertiary)',
      },
      neutral: {
        default: 'var(--sds-color-icon-neutral-default)',
        secondary: 'var(--sds-color-icon-neutral-secondary)',
        tertiary: 'var(--sds-color-icon-neutral-tertiary)',
      },
      danger: 'var(--sds-color-icon-danger-default)',
      warning: 'var(--sds-color-icon-warning-default)',
      positive: 'var(--sds-color-icon-positive-default)',
      disabled: 'var(--sds-color-icon-disabled-default)',
    },
  },
  size: {
    space: {
      0: 'var(--sds-size-space-0)',
      '050': 'var(--sds-size-space-050)',
      100: 'var(--sds-size-space-100)',
      150: 'var(--sds-size-space-150)',
      200: 'var(--sds-size-space-200)',
      300: 'var(--sds-size-space-300)',
      400: 'var(--sds-size-space-400)',
      600: 'var(--sds-size-space-600)',
      800: 'var(--sds-size-space-800)',
      1200: 'var(--sds-size-space-1200)',
      1600: 'var(--sds-size-space-1600)',
      2400: 'var(--sds-size-space-2400)',
      4000: 'var(--sds-size-space-4000)',
      negative: {
        100: 'var(--sds-size-space-negative-100)',
        200: 'var(--sds-size-space-negative-200)',
        300: 'var(--sds-size-space-negative-300)',
        400: 'var(--sds-size-space-negative-400)',
        600: 'var(--sds-size-space-negative-600)',
        800: 'var(--sds-size-space-negative-800)',
        1600: 'var(--sds-size-space-negative-1600)',
      },
    },
    radius: {
      100: 'var(--sds-size-radius-100)',
      200: 'var(--sds-size-radius-200)',
      400: 'var(--sds-size-radius-400)',
      full: 'var(--sds-size-radius-full)',
      small: 'var(--sds-size-radius-100)',
      base: 'var(--sds-size-radius-200)',
      large: 'var(--sds-size-radius-400)',
    },
    icon: {
      small: 'var(--sds-size-icon-small)',
      medium: 'var(--sds-size-icon-medium)',
      large: 'var(--sds-size-icon-large)',
    },
  },
  typography: {
    family: {
      sans: 'var(--sds-typography-family-sans)',
      serif: 'var(--sds-typography-family-serif)',
      mono: 'var(--sds-typography-family-mono)',
    },
    font: {
      titleHero: 'var(--sds-font-title-hero)',
      titlePage: 'var(--sds-font-title-page)',
      subtitle: 'var(--sds-font-subtitle)',
      heading: 'var(--sds-font-heading)',
      subheading: 'var(--sds-font-subheading)',
      bodyBase: 'var(--sds-font-body-base)',
      bodyStrong: 'var(--sds-font-body-strong)',
      bodyEmphasis: 'var(--sds-font-body-emphasis)',
      bodyLink: 'var(--sds-font-body-link)',
      bodySmall: 'var(--sds-font-body-small)',
      bodySmallStrong: 'var(--sds-font-body-small-strong)',
      bodyCode: 'var(--sds-font-body-code)',
      singleLineBodyBase: 'var(--sds-font-single-line-body-base)',
      singleLineBodySmallStrong: 'var(--sds-font-single-line-body-small-strong)',
    },
    lineHeight: {
      single: 'var(--sds-typography-single-line-height)',
      tight: 'var(--sds-typography-heading-line-height)',
      code: 'var(--sds-typography-code-line-height)',
      base: 'var(--sds-typography-body-line-height)',
    },
    letterSpacing: {
      hero: 'var(--sds-typography-letter-spacing-title-hero)',
      page: 'var(--sds-typography-letter-spacing-title-page)',
      heading: 'var(--sds-typography-letter-spacing-heading-base)',
      normal: 'var(--sds-typography-letter-spacing-default)',
    },
  },
  elevation: {
    100: 'var(--sds-effects-shadows-drop-shadow-100)',
    200: 'var(--sds-effects-shadows-drop-shadow-200)',
    300: 'var(--sds-effects-shadows-drop-shadow-300)',
    400: 'var(--sds-effects-shadows-drop-shadow-400)',
    500: 'var(--sds-effects-shadows-drop-shadow-500)',
    600: 'var(--sds-effects-shadows-drop-shadow-600)',
  },
  effects: {
    dropShadow: {
      100: 'var(--sds-effects-shadows-drop-shadow-100)',
      200: 'var(--sds-effects-shadows-drop-shadow-200)',
      300: 'var(--sds-effects-shadows-drop-shadow-300)',
      400: 'var(--sds-effects-shadows-drop-shadow-400)',
      500: 'var(--sds-effects-shadows-drop-shadow-500)',
      600: 'var(--sds-effects-shadows-drop-shadow-600)',
    },
    innerShadow: {
      100: 'var(--sds-effects-shadows-inner-shadow-100)',
      200: 'var(--sds-effects-shadows-inner-shadow-200)',
      300: 'var(--sds-effects-shadows-inner-shadow-300)',
      400: 'var(--sds-effects-shadows-inner-shadow-400)',
      500: 'var(--sds-effects-shadows-inner-shadow-500)',
      600: 'var(--sds-effects-shadows-inner-shadow-600)',
    },
    blur: {
      overlay: 'var(--sds-effects-backdrop-filter-blur-overlay)',
      blanket: 'var(--sds-effects-backdrop-filter-blur-blanket)',
      glass: 'var(--sds-effects-backdrop-filter-blur-glass)',
      layer: 'var(--sds-effects-filter-blur-layer)',
    },
  },
} as const;

