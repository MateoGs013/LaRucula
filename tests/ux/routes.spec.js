import { test, expect } from '@playwright/test';

import {
  assertNoHorizontalOverflow,
  primeFullPageAssets,
  saveLocatorScreenshot,
  saveReviewScreenshot,
  waitForPageReady,
} from './helpers.js';

const routes = [
  { path: '/', slug: 'home' },
  { path: '/menu', slug: 'menu' },
  { path: '/story', slug: 'story' },
  { path: '/visit', slug: 'visit' },
];

for (const route of routes) {
  test(`route review: ${route.slug}`, async ({ page }, testInfo) => {
    await page.goto(route.path);
    await waitForPageReady(page);

    await expect(page.locator('main')).toBeVisible();
    await assertNoHorizontalOverflow(page);

    await saveLocatorScreenshot(page.locator('header').first(), testInfo, `${route.slug}-header`);
    await saveReviewScreenshot(page, testInfo, `${route.slug}-first-viewport`);
    await saveLocatorScreenshot(page.locator('footer').first(), testInfo, `${route.slug}-footer`);
    await primeFullPageAssets(page);
    await saveReviewScreenshot(page, testInfo, `${route.slug}-full-page`, { fullPage: true });
  });
}
