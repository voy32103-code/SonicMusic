import { test, expect } from '@playwright/test';

test.describe('Global Player Interactions', () => {
  test('should play a song from the Artist page', async ({ page }) => {
    // Navigate to the Artist page directly because it contains TrackRows
    await page.goto('/artist/1');

    // Wait for the page content to load
    const browseHeading = page.getByRole('heading', { name: /Popular/i }).first();
    await expect(browseHeading).toBeVisible();

    // Find the first TrackRow in the page by looking for the grid layout
    const firstTrackRow = page.locator('div.grid.cursor-pointer').first();
    await expect(firstTrackRow).toBeVisible();

    // Hover over the track row to reveal the play button
    await firstTrackRow.hover();

    // Click the track row itself (since our onClick is on the parent div)
    await firstTrackRow.click();

    // Verify the BottomPlayer updates
    // The player should now show the song info and the play button should turn into a pause button
    const bottomPlayer = page.locator('nav.fixed.bottom-0');
    await expect(bottomPlayer).toBeVisible();

    // Look for the pause icon in the bottom player, which indicates a song is actively playing
    const pauseButton = bottomPlayer.locator('span:has-text("pause")').first();
    await expect(pauseButton).toBeVisible();
    
    // Optionally click pause to test toggle functionality
    await pauseButton.click();
    
    // It should turn back into play_arrow
    const playButton = bottomPlayer.locator('span:has-text("play_arrow")').first();
    await expect(playButton).toBeVisible();
  });
});
