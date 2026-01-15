import { test as base, expect } from '@playwright/test';
import { createStorageHelper, LocalStorageHelper } from './storage';

type TestFixtures = {
  storage: LocalStorageHelper;
};

export const test = base.extend<TestFixtures>({
  storage: async ({ page, baseURL }, use) => {
    const storage = createStorageHelper(page);
    // Navigate to base URL to enable localStorage access
    await page.goto(baseURL || '/');
    await storage.clear();
    await use(storage);
  },
});

export { expect };
