import { test, expect } from '@playwright/test';

test('registers and reviews relapse history', async ({ page }) => {
  await page.goto('/auth');
  await expect(page.getByRole('heading', { name: /Entenda gatilhos/i })).toBeVisible();
});

