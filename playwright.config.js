import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/ux',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: true,
    timeout: 120000,
  },
  projects: [
    {
      name: 'desktop',
      use: { browserName: 'chromium', viewport: { width: 1440, height: 1400 }, deviceScaleFactor: 2 },
    },
    {
      name: 'tablet',
      use: { browserName: 'chromium', viewport: { width: 834, height: 1194 }, deviceScaleFactor: 2 },
    },
    {
      name: 'mobile',
      use: { browserName: 'chromium', ...devices['iPhone 13'] },
    },
  ],
});
