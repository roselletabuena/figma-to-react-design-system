import { test, expect, type Page } from '@playwright/test';

const storyUrl = (story: string) =>
  `/iframe.html?id=components-data-display-avatar--${story}&viewMode=story`;

// Wait until the sample photo has decoded so the snapshot never captures a half-loaded image.
const waitForImages = async (page: Page) => {
  await page.locator('#storybook-root img').first().waitFor();
  await page.evaluate(() => Promise.all(Array.from(document.images, (img) => img.decode())));
};

test.describe('Avatar Visual Regression', () => {
  test('matches light mode screenshot snapshot', async ({ page }) => {
    await page.goto(storyUrl('all-variants'));
    await waitForImages(page);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('avatar-light.png');
  });

  test('matches dark mode screenshot snapshot', async ({ page }) => {
    // The DarkMode story sets `parameters.theme = 'dark'`, so this also proves the decorator works.
    await page.goto(storyUrl('dark-mode'));
    await waitForImages(page);
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('avatar-dark.png');
  });
});
