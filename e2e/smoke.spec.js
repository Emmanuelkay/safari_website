import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads and shows hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Savanna/i);
    await expect(page.locator('nav')).toBeVisible();
  });

  test('has working navigation links', async ({ page }) => {
    await page.goto('/');
    // Check that the navbar has key links
    await expect(page.locator('a[href="/#packages"]').first()).toBeVisible();
    await expect(page.locator('a[href="/#booking"]').first()).toBeVisible();
  });

  test('shows package cards', async ({ page }) => {
    await page.goto('/');
    // Scroll to packages section
    await page.locator('#packages').scrollIntoViewIfNeeded();
    // Should have package cards visible
    await expect(page.locator('#packages')).toBeVisible();
  });

  test('shows booking section', async ({ page }) => {
    await page.goto('/');
    await page.locator('#booking').scrollIntoViewIfNeeded();
    await expect(page.locator('#booking')).toBeVisible();
  });
});

test.describe('404 Page', () => {
  test('shows 404 for unknown routes', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    await expect(page.locator('text=404')).toBeVisible();
    await expect(page.locator('text=Trail Not Found')).toBeVisible();
  });

  test('has back to home link', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    const homeLink = page.locator('a[href="/"]');
    await expect(homeLink).toBeVisible();
  });
});

test.describe('Legal Pages', () => {
  test('privacy page loads', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.locator('text=Privacy Policy')).toBeVisible();
    await expect(page.locator('text=Information We Collect')).toBeVisible();
  });

  test('terms page loads', async ({ page }) => {
    await page.goto('/terms');
    await expect(page.locator('text=Terms of Service')).toBeVisible();
    await expect(page.locator('text=Cancellation')).toBeVisible();
  });
});

test.describe('About Page', () => {
  test('about page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('Booking Status Page', () => {
  test('status lookup page loads with form', async ({ page }) => {
    await page.goto('/booking/status');
    await expect(page.locator('text=Check Your Booking')).toBeVisible();
    await expect(page.locator('#booking-ref')).toBeVisible();
    await expect(page.locator('#booking-email')).toBeVisible();
  });
});

test.describe('Accessibility', () => {
  test('navbar has correct aria attributes', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
  });

  test('language button has aria-expanded', async ({ page }) => {
    await page.goto('/');
    const langBtn = page.locator('button[aria-label="Select language"]');
    await expect(langBtn).toHaveAttribute('aria-expanded', 'false');
    await langBtn.click();
    await expect(langBtn).toHaveAttribute('aria-expanded', 'true');
  });

  test('html lang attribute matches', async ({ page }) => {
    await page.goto('/');
    const lang = await page.locator('html').getAttribute('lang');
    expect(['en', 'de', 'fr', 'es', 'zh', 'ru']).toContain(lang);
  });
});

test.describe('Cookie Consent', () => {
  test('shows cookie banner on first visit', async ({ page, context }) => {
    await context.clearCookies();
    // Clear localStorage
    await page.goto('/');
    await page.evaluate(() => localStorage.removeItem('cookie-consent'));
    await page.reload();
    // Wait for the delayed banner
    await expect(page.locator('text=Got it')).toBeVisible({ timeout: 5000 });
  });
});
