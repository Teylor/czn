import { Page } from '@playwright/test';

export interface LocalStorageHelper {
  setItem: (key: string, value: unknown) => Promise<void>;
  getItem: <T>(key: string) => Promise<T | null>;
  clear: () => Promise<void>;
  seedData: (data: Record<string, unknown>) => Promise<void>;
}

export function createStorageHelper(page: Page): LocalStorageHelper {
  return {
    async setItem(key: string, value: unknown) {
      await page.evaluate(([k, v]) => {
        localStorage.setItem(k, JSON.stringify(v));
      }, [key, value] as const);
    },

    async getItem<T>(key: string): Promise<T | null> {
      return page.evaluate((k) => {
        const item = localStorage.getItem(k);
        return item ? JSON.parse(item) : null;
      }, key);
    },

    async clear() {
      await page.evaluate(() => localStorage.clear());
    },

    async seedData(data: Record<string, unknown>) {
      await page.evaluate((d) => {
        Object.entries(d).forEach(([key, value]) => {
          localStorage.setItem(key, JSON.stringify(value));
        });
      }, data);
    }
  };
}
