import * as fs from 'fs'; 
import * as path from 'path';
import { getPage, closeBrowser } from './utils/browser';
import { downloadImage } from './utils/download';
import { slugify } from './utils/slugify';

const SOURCE_URL = 'https://game8.co/games/Chaos-Zero-Nightmare/archives/558133';
const OUTPUT_TS = path.join(__dirname, '..', 'lib', 'Partners.ts');
const IMAGES_DIR = path.join(__dirname, '..', 'public', 'partners');

interface PartnerData {
  id: string;
  name: string;
  type: string;
  rarity: number;
  passive: string;
  skill: string;
}

const TYPE_MAP: Record<string, string> = {
  'striker': 'STRIKER',
  'hunter': 'HUNTER',
  'controller': 'CONTROLLER',
  'ranger': 'RANGER',
  'psionic': 'PSIONIC',
  'vanguard': 'VANGUARD',
};

const RARITY_MAP: Record<number, string> = {
  3: 'THREE_STAR',
  4: 'FOUR_STAR',
  5: 'FIVE_STAR',
};

async function scrapePartners(): Promise<PartnerData[]> {
  const page = await getPage();
  const partners: PartnerData[] = [];

  console.log('Navigating to partners page...');
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
    console.log('Scrolling to load all partners...');
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

  // Find all partner links
  const partnerLinks = await page.$$eval(
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

  console.log('partnerLinks:', partnerLinks);
  console.log(`Found ${partnerLinks.length} potential partner links`);

  for (const { href, name } of partnerLinks) {
    if (!name || name.length < 2) continue;

    try {
      const fullUrl = href.startsWith('http') ? href : `https://game8.co${href}`;
      console.log(`Scraping: ${name} (${fullUrl})`);

      await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 30000 });

      const pageText = await page.$eval('body', (body) => body.textContent || '');
      const pageTextLower = pageText.toLowerCase();

      // Extract rarity
      let rarity = 3;
      if (pageText.includes('★★★★★') || pageTextLower.includes('5-star') || pageTextLower.includes('5 star')) {
        rarity = 5;
      } else if (pageText.includes('★★★★') || pageTextLower.includes('4-star') || pageTextLower.includes('4 star')) {
        rarity = 4;
      }

      // Extract type
      let type = 'STRIKER';
      for (const [key, value] of Object.entries(TYPE_MAP)) {
        if (pageTextLower.includes(key)) {
          type = value;
          break;
        }
      }

      // Try to extract passive and skill from page content
      // Look for sections that mention "Partner Effect" or "Passive" and "Ego Skill"
      let passive = '';
      let skill = '';

      // Try to find passive effect TODO
      /* const passiveMatch = pageText.match(/Partner Effect[:\s]*([^]*?)(?:Ego Skill|Unique Skill|$)/i);
      if (passiveMatch) {
        passive = passiveMatch[1].trim().substring(0, 500);
      }

      // Try to find ego skill
      const skillMatch = pageText.match(/(?:Ego Skill|Unique Skill)[:\s]*([^]*?)(?:Stats|Bonus|$)/i);
      if (skillMatch) {
        skill = skillMatch[1].trim().substring(0, 200);
      } */

      // Download partner image
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

      partners.push({
        id: slugify(name),
        name,
        type,
        rarity,
        passive: passive || 'TODO: Add passive effect',
        skill: skill || 'TODO: Add skill',
      });

      await page.waitForTimeout(500);
    } catch (err) {
      console.log(`  Error scraping ${name}: ${err}`);
    }
  }

  await page.close();
  return partners;
}

function generateTypeScript(partners: PartnerData[]): string {
  const entries = partners.map((p) => `  {
    id: "${p.id}",
    name: "${p.name}",
    type: ParterType.${p.type},
    rarity: PartnerRarity.${RARITY_MAP[p.rarity]},
    passive: \`${p.passive.replace(/`/g, "'")}\`,
    skill: \`${p.skill.replace(/`/g, "'")}\`
  }`).join(',\n');

  return `import { ParterType, PartnerRarity } from "@/sections/domain/partner/Partner";

export const PARTNERS = [
${entries}
];
`;
}

async function main() {
  console.log('Starting Partners scraper...');

  try {
    const partners = await scrapePartners();
    console.log(`\nScraped ${partners.length} partners`);

    if (partners.length > 0) {
      const tsContent = generateTypeScript(partners);
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
