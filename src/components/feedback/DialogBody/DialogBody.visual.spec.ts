import { test, expect } from '@playwright/test';

const storyUrl = (story: string) =>
  `/iframe.html?id=components-feedback-dialogbody--${story}&viewMode=story`;

test.describe('DialogBody Visual Regression', () => {
  for (const [story, theme] of [
    ['default', 'light'],
    ['dark-mode', 'dark'],
  ] as const) {
    test(`matches ${theme} mode screenshot snapshot`, async ({ page }) => {
      await page.goto(storyUrl(story));
      await page.locator('#storybook-root h2').first().waitFor();
      if (theme === 'dark') {
        await expect(page.locator('html')).toHaveClass(/dark/);
      }
      await expect(page.locator('#storybook-root')).toHaveScreenshot(
        `dialog-body-${theme}.png`,
      );
    });
  }

  test('matches the not-dismissible variant screenshot', async ({ page }) => {
    await page.goto(storyUrl('not-dismissible'));
    await page.locator('#storybook-root h2').first().waitFor();
    await expect(page.locator('#storybook-root')).toHaveScreenshot(
      'dialog-body-not-dismissible.png',
    );
  });

  test('matches the no-actions variant screenshot', async ({ page }) => {
    await page.goto(storyUrl('no-actions'));
    await page.locator('#storybook-root h2').first().waitFor();
    await expect(page.locator('#storybook-root')).toHaveScreenshot('dialog-body-no-actions.png');
  });

  test('matches the custom-content variant screenshot', async ({ page }) => {
    await page.goto(storyUrl('custom-content'));
    await page.locator('#storybook-root p').first().waitFor();
    await expect(page.locator('#storybook-root')).toHaveScreenshot(
      'dialog-body-custom-content.png',
    );
  });
});
