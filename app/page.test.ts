import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main header', async ({ page }) => {
    await expect(page.locator('a.inline-block.hover\\:opacity-80.transition-opacity')).toBeVisible();
  });

  test('should display the main footer', async ({ page }) => {
    await expect(page.locator('footer.bottom-0')).toBeVisible();
    await expect(page.locator('footer.bottom-0')).toContainText('© 2024 Chaos Zero Nightmare Roster Manager. All rights reserved.');
  });

  test('should display the roster manager header', async ({ page }) => {
    await expect(page.locator('header.container')).toBeVisible();
    await expect(page.locator('header h1 span.block')).toContainText('Roster Manager');
  });

  test('should display all navigation links', async ({ page }) => {
    const expectedLinks = [
      { text: 'Combatants', href: '/combatants' },
      { text: 'Partners', href: '/partners' },
      { text: 'Save Datas', href: '/savedata' },
      { text: 'Memory Fragments', href: '/fragments' },
      { text: 'Teams', href: '/teams' },
    ];

    for (const link of expectedLinks) {
      const linkElement = page.locator(`a[href="${link.href}"]`);
      await expect(linkElement).toBeVisible();
      await expect(linkElement).toContainText(link.text);
    }
  });

  test('should navigate to Combatants page', async ({ page }) => {
    await page.click('a[href="/combatants"]');
    await expect(page).toHaveURL('/combatants');
  });

  test('should navigate to Partners page', async ({ page }) => {
    await page.click('a[href="/partners"]');
    await expect(page).toHaveURL('/partners');
  });

  test('should navigate to SaveData page', async ({ page }) => {
    await page.click('a[href="/savedata"]');
    await expect(page).toHaveURL('/savedata');
  });

  test('should navigate to Fragments page', async ({ page }) => {
    await page.click('a[href="/fragments"]');
    await expect(page).toHaveURL('/fragments');
  });

  test('should navigate to Teams page', async ({ page }) => {
    await page.click('a[href="/teams"]');
    await expect(page).toHaveURL('/teams');
  });
});
