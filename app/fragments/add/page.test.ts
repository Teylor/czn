import { test, expect } from '../../../tests/fixtures';

test.describe('Add Fragment Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fragments/add');
  });

  test.describe('Page Structure', () => {
    test('should display set selector', async ({ page }) => {
      await expect(page.locator('button:has-text("Select Set")')).toBeVisible();
    });

    test('should display piece selector', async ({ page }) => {
      await page.click('button:has-text("Select Set")');
      await page.locator('.absolute.top-full.left-0.right-0 button').first().click();
      await expect(page.locator('button:has-text("Select Piece")')).toBeVisible();
    });

    test('should display Save and Cancel buttons', async ({ page }) => {
      await expect(page.locator('button:has-text("Save")')).toBeVisible();
      await expect(page.locator('a:has-text("Cancel")')).toBeVisible();
    });
  });

  test.describe('Set Selector', () => {
    test('should open dropdown when clicking set selector', async ({ page }) => {
      await page.click('button:has-text("Select Set")');
      const dropdown = page.locator('.absolute.top-full.left-0.right-0');
      await expect(dropdown).toBeVisible();
    });

    test('should select a set and update button text', async ({ page }) => {
      await page.click('button:has-text("Select Set")');
      await page.locator('.absolute.top-full.left-0.right-0 button').first().click();

      await expect(page.locator('button:has-text("Select Set")')).not.toBeVisible();
    });
  });

  test.describe('Piece Selector', () => {
    test('should enable piece selector after selecting set', async ({ page }) => {
      await page.click('button:has-text("Select Set")');
      await page.locator('.absolute.top-full.left-0.right-0 button').first().click();

      await page.click('button:has-text("Select Piece")');
      const dropdown = page.locator('.absolute.top-full.left-1.right-1');
      await expect(dropdown).toBeVisible();
    });
  });

  test.describe('Main Stat Selector', () => {
    test('should show main stat selector after selecting piece', async ({ page }) => {
      await page.click('button:has-text("Select Set")');
      await page.locator('.absolute.top-full.left-0.right-0 button').first().click();

      await page.click('button:has-text("Select Piece")');
      await page.locator('.absolute.top-full.left-1.right-1 button').first().click();

      await expect(page.locator('button.m-5.px-3.py-2.font-bold')).toBeVisible();
    });
  });
});
