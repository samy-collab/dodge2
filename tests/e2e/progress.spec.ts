import { test, expect } from '@playwright/test';

test('opens progress journey', async ({ page }) => {
  await page.goto('/auth');
  await expect(page.getByText(/historico confiavel/i)).toBeVisible();
});

