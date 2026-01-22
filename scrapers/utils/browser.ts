import { chromium, type Browser, type Page } from 'playwright';

let browser: Browser | null = null;

export async function getBrowser(): Promise<Browser> {
  if (!browser) {
    browser = await chromium.launch({ headless: true/* , slowMo: 250 */ }); // true & remove slowMo for production (false to see the browser)
  }
  return browser;
}

export async function getPage(): Promise<Page> {
  const b = await getBrowser();
  const context = await b.newContext();
  return context.newPage();
}

export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
  }
}
