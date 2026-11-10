import { test, expect, type Page } from '@playwright/test';

const storyUrl = (story: string) =>
  `/iframe.html?id=components-data-display-card--${story}&viewMode=story`;

// Wait until sample photos have decoded so snapshots never capture a half-loaded image.
const waitForImages = async (page: Page) => {
  await page.locator('#storybook-root img').first().waitFor();
  await page.evaluate(() => Promise.all(Array.from(document.images, (img) => img.decode())));
};

test.describe('Card Visual Regression', () => {
  test('matches light mode screenshot snapshot', async ({ page }) => {
    await page.goto(storyUrl('all-variants'));
    await waitForImages(page);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('card-light.png');
  });

  test('matches dark mode screenshot snapshot', async ({ page }) => {
    await page.goto(storyUrl('dark-mode'));
    await waitForImages(page);
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('card-dark.png');
  });
});
