import { test, expect } from '../../tests/fixtures';
import { createSaveData } from '../../tests/fixtures/test-data';

test.describe('SaveData List Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/savedata');
  });

  test.describe('Empty State', () => {
    test('should display Add button when list is empty', async ({ page }) => {
      await expect(page.locator('a:has-text("Add Save Data")')).toBeVisible();
    });

    test('should display Home link', async ({ page }) => {
      await expect(page.locator('a:has-text("Home")')).toBeVisible();
    });

    test('should show no items in grid when localStorage is empty', async ({ page }) => {
      const items = page.locator('.border.border-zinc-300.rounded-md');
      await expect(items).toHaveCount(0);
    });
  });

  test.describe('With Data', () => {
    test('should display all save data from localStorage', async ({ page, storage }) => {
      const savedata = [
        createSaveData({ id: 'sd1', name: 'SaveData1' }),
        createSaveData({ id: 'sd2', name: 'SaveData2' }),
      ];
      await storage.seedData({ savedata });
      await page.goto('/savedata');

      await expect(page.locator('text=SaveData1')).toBeVisible();
      await expect(page.locator('text=SaveData2')).toBeVisible();
    });

    test('should show delete button for each item', async ({ page, storage }) => {
      const savedata = [
        createSaveData({ id: 'sd1', name: 'Test1' }),
        createSaveData({ id: 'sd2', name: 'Test2' }),
      ];
      await storage.seedData({ savedata });
      await page.goto('/savedata');

      const deleteButtons = page.locator('button[aria-label="Delete save data"]');
      await expect(deleteButtons).toHaveCount(2);
    });
  });

  test.describe('Delete Functionality', () => {
    test('should remove item from list when delete button clicked', async ({ page, storage }) => {
      const savedata = [createSaveData({ id: 'del1', name: 'ToDelete' })];
      await storage.seedData({ savedata });
      await page.goto('/savedata');

      await expect(page.locator('text=ToDelete')).toBeVisible();
      await page.click('button[aria-label="Delete save data"]');
      await expect(page.locator('text=ToDelete')).not.toBeVisible();
    });

    test('should update localStorage after deletion', async ({ page, storage }) => {
      const savedata = [createSaveData({ id: 'del2', name: 'ToDeleteStorage' })];
      await storage.seedData({ savedata });
      await page.goto('/savedata');

      await page.click('button[aria-label="Delete save data"]');

      const updatedSaveData = await storage.getItem<unknown[]>('savedata');
      expect(updatedSaveData).toHaveLength(0);
    });
  });

  test.describe('Toggle Owned Functionality', () => {
    test('should display LF by default when owned is false', async ({ page, storage }) => {
      const savedata = [createSaveData({ id: 'toggle1', name: 'Test1', owned: false })];
      await storage.seedData({ savedata });
      await page.goto('/savedata');

      const toggle = page.locator('.absolute.top-1.left-1').first();
      await expect(toggle.locator('text=LF')).toBeVisible();
    });

    test('should display Owned when owned is true', async ({ page, storage }) => {
      const savedata = [createSaveData({ id: 'toggle2', name: 'Test2', owned: true })];
      await storage.seedData({ savedata });
      await page.goto('/savedata');

      const toggle = page.locator('.absolute.top-1.left-1').first();
      await expect(toggle.locator('text=Owned')).toBeVisible();
    });

    test('should toggle from LF to Owned when clicked', async ({ page, storage }) => {
      const savedata = [createSaveData({ id: 'toggle3', name: 'Test3', owned: false })];
      await storage.seedData({ savedata });
      await page.goto('/savedata');

      const toggle = page.locator('.absolute.top-1.left-1').first();
      await expect(toggle.locator('text=LF')).toBeVisible();

      await toggle.click();

      await expect(toggle.locator('text=Owned')).toBeVisible();
      await expect(toggle.locator('text=LF')).not.toBeVisible();
    });

    test('should toggle from Owned to LF when clicked', async ({ page, storage }) => {
      const savedata = [createSaveData({ id: 'toggle4', name: 'Test4', owned: true })];
      await storage.seedData({ savedata });
      await page.goto('/savedata');

      const toggle = page.locator('.absolute.top-1.left-1').first();
      await expect(toggle.locator('text=Owned')).toBeVisible();

      await toggle.click();

      await expect(toggle.locator('text=LF')).toBeVisible();
      await expect(toggle.locator('text=Owned')).not.toBeVisible();
    });

    test('should update localStorage when toggled', async ({ page, storage }) => {
      const savedata = [createSaveData({ id: 'toggle5', name: 'Test5', owned: false })];
      await storage.seedData({ savedata });
      await page.goto('/savedata');

      const toggle = page.locator('.absolute.top-1.left-1').first();
      await toggle.click();

      const updatedSaveData = await storage.getItem<any[]>('savedata');
      expect(updatedSaveData).not.toBeNull();
      expect(updatedSaveData).toHaveLength(1);
      expect(updatedSaveData![0].owned).toBe(true);
    });

    test('should persist toggle state across page reloads', async ({ page, storage }) => {
      const savedata = [createSaveData({ id: 'toggle6', name: 'Test6', owned: false })];
      await storage.seedData({ savedata });
      await page.goto('/savedata');

      const toggle = page.locator('.absolute.top-1.left-1').first();
      await toggle.click();
      await expect(toggle.locator('text=Owned')).toBeVisible();

      await page.goto('/savedata');

      const toggleAfterReload = page.locator('.absolute.top-1.left-1').first();
      await expect(toggleAfterReload.locator('text=Owned')).toBeVisible();
    });

    test('should only toggle the clicked item when multiple items exist', async ({ page, storage }) => {
      const savedata = [
        createSaveData({ id: 'toggle7', name: 'Test7', owned: false }),
        createSaveData({ id: 'toggle8', name: 'Test8', owned: false }),
      ];
      await storage.seedData({ savedata });
      await page.goto('/savedata');

      const toggles = page.locator('.absolute.top-1.left-1');
      await expect(toggles).toHaveCount(2);

      await toggles.first().click();

      await expect(toggles.first().locator('text=Owned')).toBeVisible();
      await expect(toggles.nth(1).locator('text=LF')).toBeVisible();

      const updatedSaveData = await storage.getItem<any[]>('savedata');
      expect(updatedSaveData).not.toBeNull();
      expect(updatedSaveData![0].owned).toBe(true);
      expect(updatedSaveData![1].owned).toBe(false);
    });
  });

  test.describe('Navigation', () => {
    test('should navigate to add page when clicking Add button', async ({ page }) => {
      await page.click('a:has-text("Add Save Data")');
      await expect(page).toHaveURL('/savedata/add');
    });

    test('should navigate to home when clicking Home link', async ({ page }) => {
      await page.click('a:has-text("Home")');
      await expect(page).toHaveURL('/');
    });

    test('should navigate to edit page when clicking on item', async ({ page, storage }) => {
      const sd = createSaveData({ id: 'edit-test-123', name: 'EditMe' });
      await storage.seedData({ savedata: [sd] });
      await page.goto('/savedata');

      await page.click('a[href="/savedata/add/edit-test-123"]');
      await expect(page).toHaveURL('/savedata/add/edit-test-123');
    });
  });
});
