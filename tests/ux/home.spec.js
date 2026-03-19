import { test, expect } from '@playwright/test';

import {
  assertNoHorizontalOverflow,
  primeFullPageAssets,
  saveLocatorScreenshot,
  saveReviewScreenshot,
  settleAtScroll,
  waitForPageReady,
} from './helpers.js';

test.describe('Home UX review', () => {
  test('captures the key moments of the homepage experience', async ({ page }, testInfo) => {
    test.setTimeout(60_000);
    await page.goto('/');
    await waitForPageReady(page);

    await expect(page.locator('main')).toBeVisible();
    await assertNoHorizontalOverflow(page);

    await saveLocatorScreenshot(page.locator('header').first(), testInfo, 'home-header');
    await saveLocatorScreenshot(page.locator('main > *').first(), testInfo, 'home-hero');
    await saveReviewScreenshot(page, testInfo, 'home-first-viewport');

    await settleAtScroll(page, 0.35);
    await saveReviewScreenshot(page, testInfo, 'home-mid-viewport');

    await settleAtScroll(page, 0.82);
    await saveReviewScreenshot(page, testInfo, 'home-close-viewport');

    await saveLocatorScreenshot(page.locator('footer').first(), testInfo, 'home-footer');
    await primeFullPageAssets(page);
    await saveReviewScreenshot(page, testInfo, 'home-full-page', { fullPage: true });
  });
});
