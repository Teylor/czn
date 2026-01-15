import { test, expect } from '@playwright/test';

test.describe('Error States', () => {
  test.describe('Missing localStorage keys', () => {
    test('should handle missing combatants key', async ({ page }) => {
      await page.goto('/combatants');
      // Should show empty state, not error
      await expect(page.locator('a:has-text("Add Combatant")')).toBeVisible();
      const items = page.locator('.border.border-zinc-300.rounded-md');
      await expect(items).toHaveCount(0);
    });

    test('should handle missing partners key', async ({ page }) => {
      await page.goto('/partners');
      await expect(page.locator('a:has-text("Add Partner")')).toBeVisible();
      const items = page.locator('.border.border-zinc-300.rounded-md');
      await expect(items).toHaveCount(0);
    });

    test('should handle missing fragments key', async ({ page }) => {
      await page.goto('/fragments');
      await expect(page.locator('a:has-text("Add Memory Fragments")')).toBeVisible();
      const items = page.locator('.border.border-zinc-300.rounded-md');
      await expect(items).toHaveCount(0);
    });
  });

  test.describe('Empty arrays', () => {
    test('should handle empty combatants array', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.setItem('combatants', '[]');
      });

      await page.goto('/combatants');
      await expect(page.locator('a:has-text("Add Combatant")')).toBeVisible();
      const items = page.locator('.border.border-zinc-300.rounded-md');
      await expect(items).toHaveCount(0);
    });

    test('should handle empty partners array', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.setItem('partners', '[]');
      });

      await page.goto('/partners');
      await expect(page.locator('a:has-text("Add Partner")')).toBeVisible();
      const items = page.locator('.border.border-zinc-300.rounded-md');
      await expect(items).toHaveCount(0);
    });
  });

  test.describe('Non-existent edit pages', () => {
    test('should handle non-existent combatant ID', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.setItem('combatants', '[]');
      });

      await page.goto('/combatants/add/non-existent-id-12345');
      // Should not crash, should show form with default values
      await expect(page.locator('h1:has-text("Level")')).toBeVisible();
    });

    test('should handle non-existent partner ID', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.setItem('partners', '[]');
      });

      await page.goto('/partners/add/non-existent-id-12345');
      await expect(page.locator('h1:has-text("Level")')).toBeVisible();
    });

    test('should handle non-existent fragment ID', async ({ page }) => {
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.setItem('fragments', '[]');
      });

      await page.goto('/fragments/add/non-existent-id-12345');
      await expect(page.locator('button:has-text("Select Set")')).toBeVisible();
    });
  });
});
