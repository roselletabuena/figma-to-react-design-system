import { test, expect } from '@playwright/test';

const storyUrl = (story: string) =>
  `/iframe.html?id=components-forms-calendarbutton--${story}&viewMode=story`;

test.describe('CalendarButton Visual Regression', () => {
  test('matches light mode screenshot snapshot', async ({ page }) => {
    await page.goto(storyUrl('all-variants'));
    await page.locator('#storybook-root button').first().waitFor();
    await expect(page.locator('#storybook-root')).toHaveScreenshot('calendarbutton-light.png');
  });

  test('matches dark mode screenshot snapshot', async ({ page }) => {
    await page.goto(storyUrl('dark-mode'));
    await page.locator('#storybook-root button').first().waitFor();
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('calendarbutton-dark.png');
  });
});
