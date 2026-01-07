import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  testMatch: ['app/**/*.test.ts', 'app/**/*.test.tsx'],
  timeout: 30000,
  use: {
    headless: true,
    browserName: 'chromium',
  }
});