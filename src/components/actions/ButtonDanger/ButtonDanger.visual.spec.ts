import { test, expect } from '@playwright/test';

const storyUrl = (story: string) =>
  `/iframe.html?id=components-actions-buttondanger--${story}&viewMode=story`;

test.describe('ButtonDanger Visual Regression', () => {
  test('matches light mode screenshot snapshot', async ({ page }) => {
    await page.goto(storyUrl('all-variants'));
    await expect(page.locator('#storybook-root button').first()).toBeVisible();
    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-danger-light.png');
  });

  test('matches dark mode screenshot snapshot', async ({ page }) => {
    // The DarkMode story sets `parameters.theme = 'dark'`, so this also proves the decorator works.
    await page.goto(storyUrl('dark-mode'));
    await expect(page.locator('#storybook-root button').first()).toBeVisible();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('button-danger-dark.png');
  });
});
