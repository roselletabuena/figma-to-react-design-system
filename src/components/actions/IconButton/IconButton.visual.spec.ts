import { test, expect } from '@playwright/test';

const storyUrl = (story: string) =>
  `/iframe.html?id=components-actions-iconbutton--${story}&viewMode=story`;

const variants = ['Primary', 'Neutral', 'Subtle'] as const;

test.describe('IconButton Visual Regression', () => {
  test('matches light mode screenshot snapshot', async ({ page }) => {
    await page.goto(storyUrl('all-variants'));
    await page.locator('#storybook-root button').first().waitFor();
    await expect(page.locator('#storybook-root')).toHaveScreenshot('icon-button-light.png');
  });

  test('matches dark mode screenshot snapshot', async ({ page }) => {
    // The DarkMode story sets `parameters.theme = 'dark'`, so this also proves the decorator works.
    await page.goto(storyUrl('dark-mode'));
    await page.locator('#storybook-root button').first().waitFor();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('icon-button-dark.png');
  });

  // Hover can't be expressed in a static story, so drive it with the real pointer.
  for (const [story, theme] of [
    ['all-variants', 'light'],
    ['dark-mode', 'dark'],
  ] as const) {
    test(`matches ${theme} mode hover snapshots`, async ({ page }) => {
      await page.goto(storyUrl(story));
      for (const variant of variants) {
        // First match in DOM order is the Medium, enabled button of that variant.
        const button = page
          .locator(`#storybook-root button:enabled[aria-label="${variant}"]`)
          .first();
        await button.hover();
        await expect(button).toHaveScreenshot(
          `icon-button-hover-${variant.toLowerCase()}-${theme}.png`,
        );
      }
    });
  }
});
