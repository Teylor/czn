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

  test.describe('Responsive - xs (480px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 480, height: 800 });
    });

    test('should display navigation links in a single column', async ({ page }) => {
      const gridColumns = await page.locator('section div.grid').first().evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });
      expect(gridColumns).toBe("472px");
    });
  });

  test.describe('Responsive - md (768px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
    });

    test('should display navigation links in two columns', async ({ page }) => {
      const gridColumns = await page.locator('section div.grid').first().evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });
      expect(gridColumns).toBe("342px 342px");
    });
  });

  test.describe('Responsive - lg (1024px)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1024, height: 768 });
    });

    test('should display navigation links in two columns', async ({ page }) => {
      const gridColumns = await page.locator('section div.grid').first().evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });
      expect(gridColumns).toBe("470px 470px");
    });

    test('should have translation animations', async ({ page }) => {
      const link1 = await page.locator('section div.grid a').nth(0);
      expect(link1).toHaveClass(/lg:translation-right-home/);
      const link2 = await page.locator('section div.grid a').nth(1);
      expect(link2).toHaveClass(/lg:translation-left-home/);
    });
  });
});
