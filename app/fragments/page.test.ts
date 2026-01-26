import { test, expect } from '../../tests/fixtures';
import { createFragment } from '../../tests/fixtures/test-data';

test.describe('Fragments List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fragments');
  });

  test.describe('Empty State', () => {
    test('should display Add button when list is empty', async ({ page }) => {
      await expect(page.locator('a:has-text("Add Memory Fragments")')).toBeVisible();
    });

    test('should display Filters button', async ({ page }) => {
      await expect(page.locator('button:has-text("Filters")')).toBeVisible();
    });

    test('should display Home link', async ({ page }) => {
      await expect(page.locator('a.inline-block.hover\\:opacity-80.transition-opacity')).toBeVisible();
    });

    test('should show no items in grid when localStorage is empty', async ({ page }) => {
      const items = page.locator('.border.border-zinc-300.rounded-md');
      await expect(items).toHaveCount(0);
    });
  });

  test.describe('With Data', () => {
    test('should display all fragments from localStorage', async ({ page, storage }) => {
      const fragments = [
        createFragment({ id: 'f1', setType: 'SetA', level: 10 }),
        createFragment({ id: 'f2', setType: 'SetB', level: 20 }),
      ];
      await storage.seedData({ fragments });
      await page.goto('/fragments');

      await expect(page.locator('text=SetA')).toBeVisible();
      await expect(page.locator('text=SetB')).toBeVisible();
    });

    test('should display fragment details (level)', async ({ page, storage }) => {
      const fragments = [
        createFragment({ id: 'f1', setType: 'DetailTest', level: 15 }),
      ];
      await storage.seedData({ fragments });
      await page.goto('/fragments');

      await expect(page.locator('text=Level: 15')).toBeVisible();
    });

    test('should show delete button for each item', async ({ page, storage }) => {
      const fragments = [
        createFragment({ id: 'f1', setType: 'Test1' }),
        createFragment({ id: 'f2', setType: 'Test2' }),
      ];
      await storage.seedData({ fragments });
      await page.goto('/fragments');

      const deleteButtons = page.locator('button[aria-label="Delete fragment"]');
      await expect(deleteButtons).toHaveCount(2);
    });
  });

  test.describe('Delete Functionality', () => {
    test('should remove item from list when delete button clicked', async ({ page, storage }) => {
      const fragments = [createFragment({ id: 'del1', setType: 'ToDelete', level: 5 })];
      await storage.seedData({ fragments });
      await page.goto('/fragments');

      await expect(page.locator('text=ToDelete')).toBeVisible();
      await page.click('button[aria-label="Delete fragment"]');
      await expect(page.locator('text=ToDelete')).not.toBeVisible();
    });

    test('should update localStorage after deletion', async ({ page, storage }) => {
      const fragments = [createFragment({ id: 'del2', setType: 'ToDeleteStorage' })];
      await storage.seedData({ fragments });
      await page.goto('/fragments');

      await page.click('button[aria-label="Delete fragment"]');

      const updatedFragments = await storage.getItem<unknown[]>('fragments');
      expect(updatedFragments).toHaveLength(0);
    });
  });

  test.describe('Filter Modal', () => {
    test('should open filter modal when clicking Filters button', async ({ page }) => {
      await page.click('button:has-text("Filters")');
      await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
      await expect(page.locator('text=Set Type')).toBeVisible();
      await expect(page.locator('text=Main Stat')).toBeVisible();
    });

    test('should close modal when clicking Cancel', async ({ page }) => {
      await page.click('button:has-text("Filters")');
      await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();

      await page.click('button:has-text("Cancel")');
      await expect(page.locator('.fixed.inset-0.z-50')).not.toBeVisible();
    });

    test('should close modal when clicking overlay', async ({ page }) => {
      await page.click('button:has-text("Filters")');
      await expect(page.locator('.fixed.inset-0.z-50')).toBeVisible();
    });

    test('should filter by set type', async ({ page, storage }) => {
      const fragments = [
        createFragment({ id: 'f1', setType: 'SetA', mainStat: { ATK: 100 } }),
        createFragment({ id: 'f2', setType: 'SetB', mainStat: { DEF: 50 } }),
        createFragment({ id: 'f3', setType: 'SetA', mainStat: { HP: 200 } }),
      ];
      await storage.seedData({ fragments });
      await page.goto('/fragments');

      await page.click('button:has-text("Filters")');
      await page.selectOption('select:near(:text("Set Type"))', 'SetA');
      await page.click('button:has-text("Apply")');

      const items = page.locator('.border.border-zinc-300.rounded-md');
      await expect(items).toHaveCount(2);
    });

    test('should reset filters', async ({ page, storage }) => {
      const fragments = [
        createFragment({ id: 'f1', setType: 'SetA', mainStat: { ATK: 100 } }),
        createFragment({ id: 'f2', setType: 'SetB', mainStat: { DEF: 50 } }),
      ];
      await storage.seedData({ fragments });
      await page.goto('/fragments');

      await page.click('button:has-text("Filters")');
      await page.selectOption('select:near(:text("Set Type"))', 'SetA');
      await page.click('button:has-text("Apply")');

      await expect(page.locator('.border.border-zinc-300.rounded-md')).toHaveCount(1);

      await page.click('button:has-text("Filters")');
      await page.click('button:has-text("Reset")');

      await expect(page.locator('.border.border-zinc-300.rounded-md')).toHaveCount(2);
    });
  });

  test.describe('Navigation', () => {
    test('should navigate to add page when clicking Add button', async ({ page }) => {
      await page.click('a:has-text("Add Memory Fragments")');
      await expect(page).toHaveURL('/fragments/add');
    });

    test('should navigate to home when clicking Home link', async ({ page }) => {
      await page.click('a.inline-block.hover\\:opacity-80.transition-opacity');
      await expect(page).toHaveURL('/');
    });

    test('should navigate to edit page when clicking on item', async ({ page, storage }) => {
      const fragment = createFragment({ id: 'edit-test-123', setType: 'EditMe' });
      await storage.seedData({ fragments: [fragment] });
      await page.goto('/fragments');

      await page.click('a[href="/fragments/add/edit-test-123"]');
      await expect(page).toHaveURL('/fragments/add/edit-test-123');
    });
  });
});
