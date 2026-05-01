import { test, expect } from '@playwright/test';

test.describe('Home Page & Navigation Navigation', () => {
  test('should load the home page correctly', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Check if the main heading is visible (Good evening or The Sonic Immersive depending on page)
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should navigate to Library via Sidebar', async ({ page }) => {
    await page.goto('/');

    // Click on the "Your Library" link in the sidebar
    // Adjusting the locator to find the link by its text
    const libraryLink = page.getByRole('link', { name: /Library/i });
    await expect(libraryLink).toBeVisible();
    await libraryLink.click();

    // Verify that the URL changed to /library
    await expect(page).toHaveURL(/.*\/library/);

    // Verify the Library page heading
    const libraryHeading = page.getByRole('heading', { name: /Liked Songs/i });
    await expect(libraryHeading).toBeVisible();
  });
});
