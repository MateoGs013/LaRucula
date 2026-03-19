import { test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

import { waitForPageReady } from './helpers.js';

const routes = ['/', '/menu', '/story', '/visit'];

for (const route of routes) {
  test(`a11y baseline: ${route}`, async ({ page }, testInfo) => {
    await page.goto(route);
    await waitForPageReady(page);

    const results = await new AxeBuilder({ page }).analyze();
    const seriousAndCritical = results.violations.filter(
      (violation) => violation.impact === 'serious' || violation.impact === 'critical'
    );

    await testInfo.attach(`a11y-${route.replaceAll('/', '_') || 'home'}.json`, {
      body: JSON.stringify(
        {
          route,
          totalViolations: results.violations.length,
          seriousAndCritical: seriousAndCritical.length,
          violations: results.violations.map((violation) => ({
            id: violation.id,
            impact: violation.impact,
            description: violation.description,
            help: violation.help,
            nodes: violation.nodes.length,
          })),
        },
        null,
        2
      ),
      contentType: 'application/json',
    });
  });
}
