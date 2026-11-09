import { test, expect } from '@playwright/test';

const storyUrl = (story: string) =>
  `/iframe.html?id=components-forms-checkboxfield--${story}&viewMode=story`;

test.describe('CheckboxField Visual Regression', () => {
  test('matches light mode screenshot snapshot', async ({ page }) => {
    await page.goto(storyUrl('all-variants'));
    await page.locator('#storybook-root input').first().waitFor({ state: 'attached' });
    await expect(page.locator('#storybook-root')).toHaveScreenshot('checkbox-field-light.png');
  });

  test('matches dark mode screenshot snapshot', async ({ page }) => {
    await page.goto(storyUrl('dark-mode'));
    await page.locator('#storybook-root input').first().waitFor({ state: 'attached' });
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('#storybook-root')).toHaveScreenshot('checkbox-field-dark.png');
  });
});
