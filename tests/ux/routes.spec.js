import { test, expect } from '@playwright/test';

import {
  assertNoHorizontalOverflow,
  primeFullPageAssets,
  saveLocatorScreenshot,
  saveReviewScreenshot,
  waitForPageReady,
} from './helpers.js';

const routes = [
  { path: '/', slug: 'home', chrome: true },
  { path: '/menu', slug: 'menu', chrome: true },
  { path: '/menu/mar', slug: 'menu-mar', chrome: true },
  { path: '/menu/tierra', slug: 'menu-tierra', chrome: true },
  { path: '/menu/mar?entry=qr&lang=es', slug: 'menu-mar-qr', chrome: false },
];

for (const route of routes) {
  test(`route review: ${route.slug}`, async ({ page }, testInfo) => {
    test.setTimeout(60_000);

    await page.goto(route.path);
    await waitForPageReady(page);

    await expect(page.locator('main')).toBeVisible();
    await assertNoHorizontalOverflow(page);

    if (route.chrome) {
      await saveLocatorScreenshot(page.locator('header').first(), testInfo, `${route.slug}-header`);
    }
    await saveReviewScreenshot(page, testInfo, `${route.slug}-first-viewport`);
    if (route.chrome) {
      await saveLocatorScreenshot(page.locator('footer').first(), testInfo, `${route.slug}-footer`);
    }
    await primeFullPageAssets(page);
    await saveReviewScreenshot(page, testInfo, `${route.slug}-full-page`, { fullPage: true });
  });
}
