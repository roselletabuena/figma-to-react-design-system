import { test, expect } from '@playwright/test';

const storyUrl = (story: string) =>
  `/iframe.html?id=components-data-display-text--${story}&viewMode=story`;

test.describe('Text Visual Regression', () => {
  test('matches light mode screenshot snapshot', async ({ page }) => {
    await page.goto(storyUrl('default'));
    await expect(page.locator('#storybook-root')).toHaveScreenshot('text-light.png');
  });

  test('matches dark mode screenshot snapshot', async ({ page }) => {
    await page.goto(storyUrl('dark-mode'));
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('text-dark.png');
  });
});
