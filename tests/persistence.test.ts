import { test, expect } from './fixtures';
import { createCombatant, createPartner, createFragment } from './fixtures/test-data';

test.describe('LocalStorage Persistence', () => {
  test.describe('Combatants', () => {
    test('should persist data across page reloads', async ({ page, storage }) => {
      const combatant = createCombatant({ id: 'persist-test', name: 'PersistTest' });
      await storage.setItem('combatants', [combatant]);

      await page.goto('/combatants');
      await expect(page.locator('text=PersistTest')).toBeVisible();

      await page.reload();
      await expect(page.locator('text=PersistTest')).toBeVisible();
    });

    test('should persist data across navigation', async ({ page, storage }) => {
      const combatant = createCombatant({ id: 'nav-test', name: 'NavTest' });
      await storage.setItem('combatants', [combatant]);

      await page.goto('/combatants');
      await page.click('a:has-text("Home")');
      await page.click('a[href="/combatants"]');

      await expect(page.locator('text=NavTest')).toBeVisible();
    });
  });

  test.describe('Partners', () => {
    test('should persist data across page reloads', async ({ page, storage }) => {
      const partner = createPartner({ id: 'persist-test', name: 'PersistPartner' });
      await storage.setItem('partners', [partner]);

      await page.goto('/partners');
      await expect(page.locator('text=PersistPartner')).toBeVisible();

      await page.reload();
      await expect(page.locator('text=PersistPartner')).toBeVisible();
    });
  });

  test.describe('Fragments', () => {
    test('should persist data across page reloads', async ({ page, storage }) => {
      const fragment = createFragment({ id: 'persist-test', setType: 'PersistSet' });
      await storage.setItem('fragments', [fragment]);

      await page.goto('/fragments');
      await expect(page.locator('text=PersistSet')).toBeVisible();

      await page.reload();
      await expect(page.locator('text=PersistSet')).toBeVisible();
    });
  });

  test.describe('Multiple Data Types', () => {
    test('should maintain separate localStorage keys for different data types', async ({ page, storage }) => {
      const combatant = createCombatant({ id: 'multi-c', name: 'MultiCombatant' });
      const partner = createPartner({ id: 'multi-p', name: 'MultiPartner' });
      const fragment = createFragment({ id: 'multi-f', setType: 'MultiSet' });

      await storage.seedData({
        combatants: [combatant],
        partners: [partner],
        fragments: [fragment]
      });

      await page.goto('/combatants');
      await expect(page.locator('text=MultiCombatant')).toBeVisible();

      await page.goto('/partners');
      await expect(page.locator('text=MultiPartner')).toBeVisible();

      await page.goto('/fragments');
      await expect(page.locator('text=MultiSet')).toBeVisible();
    });
  });
});
