import { test, expect } from '../../../../tests/fixtures';
import { createFragment } from '../../../../tests/fixtures/test-data';

test.describe('Edit Fragment Page', () => {
  const testFragment = createFragment({
    id: 'edit-test-123',
    setType: 'atk',
    piece: 2,
    level: 15,
    mainStat: { ATK: 100 },
    subStats: [{ DEF: 50 }]
  });

  test.beforeEach(async ({ page, storage }) => {
    await storage.seedData({ fragments: [testFragment] });
    await page.goto('/fragments/add/edit-test-123');
  });

  test.describe('Data Loading', () => {
    test('should load existing fragment data', async ({ page }) => {
      await expect(page.locator('text=Black Wing')).toBeVisible();
    });

    test('should disable set selector in edit mode', async ({ page }) => {
      const selector = page.locator('button:has-text("Black Wing")');
      await expect(selector).toBeDisabled();
    });

    test('should disable set type in edit mode', async ({ page }) => {
      const selector = page.locator('button:has-text("II")');
      await expect(selector).toBeDisabled();
    });
  });

  test.describe('Update Functionality', () => {
    test('should update fragment in localStorage', async ({ page, storage }) => {
      await page.click('button:has-text("Save")');

      await expect(page).toHaveURL('/fragments');

      const fragments = await storage.getItem<unknown[]>('fragments');
      expect(fragments).toHaveLength(1);
    });

    test('should preserve other fragments when updating', async ({ page, storage }) => {
      const otherFragment = createFragment({ id: 'other-123', setType: 'OtherSet' });
      await storage.setItem('fragments', [testFragment, otherFragment]);
      await page.reload();

      await page.click('button:has-text("Save")');

      const fragments = await storage.getItem<unknown[]>('fragments');
      expect(fragments).toHaveLength(2);
    });
  });

  test.describe('Navigation', () => {
    test('should navigate back to list on cancel', async ({ page }) => {
      await page.click('a:has-text("Cancel")');
      await expect(page).toHaveURL('/fragments');
    });
  });

  test.describe('Error Handling', () => {
    test('should handle non-existent ID gracefully', async ({ page, storage }) => {
      await storage.clear();
      await page.goto('/fragments/add/non-existent-id');

      await expect(page.locator('button:has-text("Select Set")')).toBeVisible();
    });
  });
});
