import { test, expect } from '@playwright/test';

const DEPLOYMENT_URL = 'https://tokenguard-pro-web.vercel.app';

test('TokenGuard Pro smoke test', async ({ page }) => {
  // Navigate to the deployed site
  await page.goto(DEPLOYMENT_URL);

  // Check that the page loads successfully
  await expect(page).toHaveTitle(/Stop Burning Tokens/i);

  // Check that main heading exists
  const heading = page.getByRole('heading', { name: /Stop Burning Tokens/i });
  await expect(heading).toBeVisible();

  // Check that upload section exists
  const uploadButton = page.getByText(/Upload your OpenClaw log file/i);
  await expect(uploadButton).toBeVisible();

  // Check for any console errors
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Reload to catch any errors
  await page.reload();

  // Assert no console errors
  expect(errors).toHaveLength(0);

  console.log('✓ Smoke test passed for:', DEPLOYMENT_URL);
});
