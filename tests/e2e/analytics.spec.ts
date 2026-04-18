import { test, expect } from '@playwright/test';

test('opens trigger analytics journey', async ({ page }) => {
  await page.goto('/auth');
  await expect(page.getByText(/Privado e focado/i)).toBeVisible();
});

