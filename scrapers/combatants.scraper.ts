import * as fs from 'fs';
import * as path from 'path';
import { getPage, closeBrowser } from './utils/browser';
import { downloadImage } from './utils/download';
import { slugify } from './utils/slugify';

const SOURCE_URL = 'https://game8.co/games/Chaos-Zero-Nightmare/archives/558105';
const OUTPUT_TS = path.join(__dirname, '..', 'lib', 'Combatants.ts');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'combatants');

interface CombatantData {
  id: string;
  name: string;
  type: string;
  attribute: string;
  rarity: number;
}

const TYPE_MAP: Record<string, string> = {
  'striker': 'STRIKER',
  'hunter': 'HUNTER',
  'controller': 'CONTROLLER',
  'ranger': 'RANGER',
  'psionic': 'PSIONIC',
  'vanguard': 'VANGUARD',
};

const ATTRIBUTE_MAP: Record<string, string> = {
  'passion': 'PASSION',
  'void': 'VOID',
  'instinct': 'INSTINCT',
  'order': 'ORDER',
  'justice': 'JUSTICE',
};

const RARITY_MAP: Record<number, string> = {
  4: 'FOUR_STAR',
  5: 'FIVE_STAR',
};

async function scrapeCombatants(): Promise<CombatantData[]> {
  const page = await getPage();
  const combatants: CombatantData[] = [];

  console.log('Navigating to combatants page...');
  await page.goto(SOURCE_URL, { waitUntil: 'networkidle' });

  // Scroll the custom scrollbar container to load all elements
  // The gridView has an inner empty div whose style.height grows as content loads
  const heightDiv = await page.$('[class^="style-module__gridView"] > div');

  const collectedLinks = new Map<string, string>(); // href -> name

  const collectVisibleLinks = async () => {
    const links = await page.$$eval(
      '[class^="style-module__gridView"] a[href*="/games/Chaos-Zero-Nightmare/archives/"]',
      (els) => els.map((el) => ({
        href: el.getAttribute('href') || '',
        name: el.textContent?.trim() || '',
      }))
    );
    for (const { href, name } of links) {
      if (href && name && name.length >= 2 && !collectedLinks.has(href)) {
        // Filter out main list pages
        if (!href.includes('558105') && !href.includes('558133') && !href.includes('560980')) {
          collectedLinks.set(href, name);
        }
      }
    }
  };

  if (heightDiv) {
    console.log('Scrolling to load all combatants...');
    let previousHeight = 0;
    let currentHeight = await heightDiv.evaluate((el) => parseInt(el.style.height) || el.scrollHeight);

    await collectVisibleLinks();

    while (previousHeight !== currentHeight) {
      previousHeight = currentHeight;

      await heightDiv.evaluate((el) => {
        el.scrollTop += 250;
      });
      await page.waitForTimeout(1000); // Wait for new content to load

      // Collect visible links at this scroll position
      await collectVisibleLinks();

      currentHeight = await heightDiv.evaluate((el) => parseInt(el.style.height) || el.scrollHeight);
      console.log(`  Height: ${previousHeight} -> ${currentHeight}`);
    }

    // Scroll back to top (optional, for consistency)
    await heightDiv.evaluate((el) => {
      el.scrollTop = 0;
    });
    console.log('Finished scrolling, all elements should be loaded');
  }

  // Find all combatant links
  const combatantLinks = await page.$$eval(
    '[class^="style-module__gridView"] a[href*="/games/Chaos-Zero-Nightmare/archives/"]',
    (links) => {
      const seen = new Set<string>();
      return links
        .filter((link) => {
          const href = link.getAttribute('href') || '';
          const text = link.textContent?.trim() || '';
          // Filter out main list pages
          if (href.includes('558105') || href.includes('558133') || href.includes('560980')) {
            return false;
          }
          if (!text || seen.has(href) || text.length < 2) return false;
          seen.add(href);
          return true;
        })
        .map((link) => ({
          href: link.getAttribute('href') || '',
          name: link.textContent?.trim() || '',
        }));
    }
  );

  console.log('combatantLinks:', combatantLinks);
  console.log(`Found ${combatantLinks.length} potential combatant links`);

  for (const { href, name } of combatantLinks) {
    if (!name || name.length < 2) continue;

    try {
      const fullUrl = href.startsWith('http') ? href : `https://game8.co${href}`;
      console.log(`Scraping: ${name} (${fullUrl})`);

      await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });

      // Extract rarity
      const combatantRarity = await page.locator('h3:has-text("Basic Information") + table tr:has-text("Rarity") td').textContent();
      console.log('rarity:', combatantRarity?.trim().toLowerCase());
      let rarity = 4;
      if (combatantRarity?.trim().toLowerCase().includes('★★★★★')) {
        rarity = 5;
      }

      // Extract type
      const combatantType = await page.locator('h3:has-text("Basic Information") + table tr:has-text("Type") td').textContent();
      console.log('type:', combatantType?.trim().toLowerCase());
      let type = 'STRIKER';
      for (const [key, value] of Object.entries(TYPE_MAP)) {
        if (combatantType?.trim().toLowerCase().includes(key)) {
          type = value;
          break;
        }
      }

      // Extract attribute
      const combatantAttribute = await page.locator('h3:has-text("Basic Information") + table tr:has-text("Attribute") td').textContent();
      console.log('attribute:', combatantAttribute?.trim().toLowerCase());
      let attribute = 'PASSION';
      for (const [key, value] of Object.entries(ATTRIBUTE_MAP)) {
        if (combatantAttribute?.trim().toLowerCase().includes(key)) {
          attribute = value;
          break;
        }
      }

      // Download combatant image
      const imgSrc = await page.$eval(
        '.a-table img[src*="img.game8"]',
        (img) => img.getAttribute('src') || ''
      ).catch(() => '');

      if (imgSrc) {
        const imgPath = path.join(IMAGES_DIR, `${slugify(name)}.png`);
        try {
          await downloadImage(imgSrc, imgPath);
          console.log(`  Downloaded image: ${imgPath}`);
        } catch (err) {
          console.log(`  Failed to download image: ${err}`);
        }
      }

      combatants.push({
        id: slugify(name),
        name,
        type,
        attribute,
        rarity,
      });

      await page.waitForTimeout(500);
    } catch (err) {
      console.log(`  Error scraping ${name}: ${err}`);
    }
  }

  await page.close();
  return combatants;
}

function generateTypeScript(combatants: CombatantData[]): string {
  const entries = combatants.map((c) => `  {
    id: "${c.id}",
    name: "${c.name}",
    type: CombatantType.${c.type},
    attribute: CombatantAttribute.${c.attribute},
    rarity: CombatantRarity.${RARITY_MAP[c.rarity]}
  }`).join(',\n');

  return `import { CombatantType } from "@/sections/domain/combatant/Combatant";
import { CombatantAttribute, CombatantRarity } from "@/sections/domain/combatant/Combatant";

export const COMBATANTS = [
${entries}
];
`;
}

async function main() {
  console.log('Starting Combatants scraper...');

  try {
    const combatants = await scrapeCombatants();
    console.log(`\nScraped ${combatants.length} combatants`);

    if (combatants.length > 0) {
      const tsContent = generateTypeScript(combatants);
      fs.writeFileSync(OUTPUT_TS, tsContent);
      console.log(`\nGenerated: ${OUTPUT_TS}`);
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await closeBrowser();
  }
}

main();
