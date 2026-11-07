/**
 * Simple Design System (SDS) - TypeScript Token Types
 * Provides compile-time safety and intellisense for token names, categories, and modes.
 */

export type SDSThemeMode = 'light' | 'dark' | 'system';

export type SDSColorPrimitive =
  | 'brand'
  | 'gray'
  | 'slate'
  | 'green'
  | 'red'
  | 'yellow'
  | 'pink'
  | 'black'
  | 'white';

export type SDSColorShade =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '1000';

export type SDSSpacing =
  | '0'
  | '050'
  | '100'
  | '150'
  | '200'
  | '300'
  | '400'
  | '600'
  | '800'
  | '1200'
  | '1600'
  | '2400'
  | '4000';

export type SDSSpacingNegative =
  | '100'
  | '200'
  | '300'
  | '400'
  | '600'
  | '800'
  | '1600';

export type SDSRadius = '100' | '200' | '400' | 'full';

export type SDSRadiusRole = 'small' | 'base' | 'large' | 'full';

export type SDSDepth = '0' | '025' | '100' | '200' | '400' | '800' | '1200';

export type SDSElevationLevel = '100' | '200' | '300' | '400' | '500' | '600';

export type SDSTypographyScale =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10';

export type SDSTypographyRole =
  | 'title-hero'
  | 'title-page'
  | 'subtitle'
  | 'heading'
  | 'subheading'
  | 'body-base'
  | 'body-strong'
  | 'body-emphasis'
  | 'body-link'
  | 'body-small'
  | 'body-small-strong'
  | 'body-code'
  | 'single-line-body-base'
  | 'single-line-body-small-strong';

