import { test, expect } from '@playwright/test';

const storyUrl = (story: string) =>
  `/iframe.html?id=components-actions-buttondanger--${story}&viewMode=story`;

const variants = ['Primary', 'Subtle'] as const;

test.describe('ButtonDanger Visual Regression', () => {
  test('matches light mode screenshot snapshot', async ({ page }) => {
    await page.goto(storyUrl('all-variants'));
    await page.locator('#storybook-root button').first().waitFor();
    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-danger-light.png');
  });

  test('matches dark mode screenshot snapshot', async ({ page }) => {
    // The DarkMode story sets `parameters.theme = 'dark'`, so this also proves the decorator works.
    await page.goto(storyUrl('dark-mode'));
    await page.locator('#storybook-root button').first().waitFor();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-danger-dark.png');
  });

  // Hover can't be expressed in a static story, so drive it with the real pointer.
  for (const [story, theme] of [
    ['all-variants', 'light'],
    ['dark-mode', 'dark'],
  ] as const) {
    test(`matches ${theme} mode hover snapshots`, async ({ page }) => {
      await page.goto(storyUrl(story));
      for (const variant of variants) {
        // First match in DOM order is the Medium, enabled, no-icon button of that variant.
        const button = page
          .locator('#storybook-root button:enabled')
          .filter({ hasText: new RegExp(`^${variant}$`) })
          .first();
        await button.hover();
        await expect(button).toHaveScreenshot(
          `button-danger-hover-${variant.toLowerCase()}-${theme}.png`,
        );
      }
    });
  }
});
