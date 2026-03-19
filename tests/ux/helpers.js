import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

export async function waitForPageReady(page, options = {}) {
  const { settleMs = 1400 } = options;

  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
  await page.locator('main').waitFor({ state: 'visible' });
  await ensureFontsAndImagesReady(page, { includeOffscreen: false, timeoutMs: 5000 });
  await page.waitForTimeout(settleMs);
}

export async function saveReviewScreenshot(page, testInfo, name, options = {}) {
  const artifactDir = join(process.cwd(), 'tests', 'artifacts', testInfo.project.name);
  mkdirSync(artifactDir, { recursive: true });

  const path = join(artifactDir, `${name}.png`);
  await page.screenshot({
    path,
    fullPage: false,
    animations: 'disabled',
    caret: 'hide',
    scale: 'device',
    ...options,
  });

  return path;
}

export async function saveLocatorScreenshot(locator, testInfo, name, options = {}) {
  const artifactDir = join(process.cwd(), 'tests', 'artifacts', testInfo.project.name);
  mkdirSync(artifactDir, { recursive: true });

  const path = join(artifactDir, `${name}.png`);
  await locator.scrollIntoViewIfNeeded();
  await locator.screenshot({
    path,
    animations: 'disabled',
    caret: 'hide',
    scale: 'device',
    ...options,
  });

  return path;
}

export async function assertNoHorizontalOverflow(page) {
  const hasOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 2
  );

  if (hasOverflow) {
    throw new Error('Horizontal overflow detected');
  }
}

export async function settleAtScroll(page, progress, options = {}) {
  const { settleMs = 450 } = options;

  await page.evaluate((scrollProgress) => {
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 0);
    window.scrollTo(0, maxScroll * scrollProgress);
  }, progress);

  await page.waitForTimeout(settleMs);
  await ensureFontsAndImagesReady(page, { includeOffscreen: false, timeoutMs: 3500 });
}

export async function primeFullPageAssets(page) {
  for (const progress of [0, 0.35, 0.68, 1]) {
    await settleAtScroll(page, progress, { settleMs: 350 });
  }

  await ensureFontsAndImagesReady(page, { includeOffscreen: true, timeoutMs: 4500 });
  await settleAtScroll(page, 0, { settleMs: 350 });
}

async function ensureFontsAndImagesReady(page, options = {}) {
  const { includeOffscreen = false, timeoutMs = 4000 } = options;

  await page.evaluate(
    async ({ includeOffscreen, timeoutMs }) => {
      const withTimeout = (promise, limitMs) =>
        Promise.race([
          promise,
          new Promise((resolve) => {
            window.setTimeout(resolve, limitMs);
          }),
        ]);

      const isRelevantImage = (img) => {
        if (includeOffscreen) {
          return true;
        }

        const rect = img.getBoundingClientRect();
        const isInViewport =
          rect.bottom >= -80 &&
          rect.right >= -80 &&
          rect.top <= window.innerHeight + 80 &&
          rect.left <= window.innerWidth + 80 &&
          rect.width > 0 &&
          rect.height > 0;

        return isInViewport || img.loading !== 'lazy' || img.dataset.heroImage !== undefined;
      };

      if (document.fonts?.ready) {
        await withTimeout(document.fonts.ready, Math.min(timeoutMs, 2500));
      }

      const images = Array.from(document.images).filter(isRelevantImage);

      await Promise.all(
        images.map((img) =>
          withTimeout(
            (async () => {
              if (img.complete) {
                if (img.naturalWidth > 0 && typeof img.decode === 'function') {
                  try {
                    await img.decode();
                  } catch {
                    // Ignore decode failures for cross-origin images that still rendered.
                  }
                }
                return;
              }

              await new Promise((resolve) => {
                const done = () => resolve();
                img.addEventListener('load', done, { once: true });
                img.addEventListener('error', done, { once: true });
              });
            })(),
            timeoutMs
          )
        )
      );
    },
    { includeOffscreen, timeoutMs }
  );
}
