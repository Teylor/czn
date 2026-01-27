import { test, expect } from '@playwright/test';

test.describe('Application Navigation', () => {
  test('should navigate through all main pages without errors', async ({ page }) => {
    const routes = [
      '/',
      '/combatants',
      '/combatants/add',
      '/partners',
      '/partners/add',
      '/fragments',
      '/fragments/add',
      '/savedata',
      '/savedata/add',
      '/teams',
      '/teams/add',
    ];

    for (const route of routes) {
      await page.goto(route);
      await expect(page).toHaveURL(route);
    }
  });

  test('should maintain consistent Home link across all list pages', async ({ page }) => {
    const pagesWithHome = [
      '/combatants',
      '/partners',
      '/fragments',
      '/savedata',
      '/teams'
    ];

    for (const route of pagesWithHome) {
      await page.goto(route);
      await page.click('a.inline-block.hover\\:opacity-80.transition-opacity');
      await expect(page).toHaveURL('/');
    }
  });

  test('should navigate to add pages from list pages', async ({ page }) => {
    const listPages = [
      { list: '/combatants', add: '/combatants/add', button: 'Add Combatant' },
      { list: '/partners', add: '/partners/add', button: 'Add Partner' },
      { list: '/fragments', add: '/fragments/add', button: 'Add Memory Fragments' },
      { list: '/savedata', add: '/savedata/add', button: 'Add Save Data' },
      { list: '/teams', add: '/teams/add', button: 'Add Team' },
    ];

    for (const { list, add, button } of listPages) {
      await page.goto(list);
      await page.click(`a:has-text("${button}")`);
      await expect(page).toHaveURL(add);
    }
  });

  test('should return to list pages from add pages via Cancel', async ({ page }) => {
    const addPages = [
      { add: '/combatants/add', list: '/combatants' },
      { add: '/partners/add', list: '/partners' },
      { add: '/fragments/add', list: '/fragments' },
      { add: '/savedata/add', list: '/savedata' },
      { add: '/teams/add', list: '/teams' },
    ];

    for (const { add, list } of addPages) {
      await page.goto(add);
      await page.click('a:has-text("Cancel")');
      await expect(page).toHaveURL(list);
    }
  });
});
