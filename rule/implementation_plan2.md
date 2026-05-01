# Convert HTML Templates to Next.js Pages

This plan outlines the steps to convert the provided HTML/Tailwind templates into functional Next.js components and pages for the `musicapp-client` project.

## Proposed Changes

### 1. Home Page (`src/app/page.tsx`)
- **Action**: Replace the existing placeholder UI with the provided "Home" template.
- **Details**:
  - Implement the "Good Evening" hero section with the "Made For You" asymmetric grid (Discover Weekly, Daily Mix 1, Release Radar).
  - Implement the "Recently Played" square cards section.
  - Keep the data integration for Albums (using `AlbumService.getAllAlbums()`) but map it to the "Recently Played" or a new section that fits the new design system.

### 2. Library Page (`src/app/library/page.tsx`)
- **Action**: Create a new page.
- **Details**:
  - Implement the "Your Library" header and category filters (Playlists, Artists, Albums).
  - Build the Library Grid including the special Bento-style "Liked Songs" card spanning 2 columns, and standard cards for playlists/artists.
  - Setup routing in the side navigation to point to `/library`.

### 3. Artist Profile (`src/app/artist/[id]/page.tsx`)
- **Action**: Create a new dynamic page.
- **Details**:
  - Implement the immersive Hero section with oversized typography and kinetic play button.
  - Build the Content Grid with "Popular Tracks" and "Artist Pick" sections.
  - Implement the "Discography" section using the Bento Grid layout.

### 4. Authentication Pages
- **Action**: Create new pages for Login and Sign Up.
- **Details**:
  - **Login (`src/app/(auth)/login/page.tsx`)**: Implement the immersive background stage and glassmorphism login form with email/password and social login buttons.
  - **Sign Up (`src/app/(auth)/signup/page.tsx`)**: Implement the registration card with a radial gradient background and the corresponding form fields.
  - Create a common layout `src/app/(auth)/layout.tsx` to hide the SideNavBar and BottomPlayer on authentication pages (or handle it via conditional rendering in the root layout).

### 5. Layout Adjustments (`src/app/layout.tsx` & `src/components/SideNavBar.tsx`)
- Ensure that the side navigation links for Home, Search, and Library point to the correct routes (`/`, `/search`, `/library`).
- Integrate the newly styled components into the existing layout without breaking the persistent BottomPlayer.

## Open Questions

> [!WARNING]
> **Data Binding for New Pages**
> Currently, we have `AlbumService` and `SongService`. For the **Artist Profile** and **Library** pages, do we have corresponding backend APIs ready (e.g., `ArtistService`, `PlaylistService`), or should I use mock data/static UI for now until the Phase 3 backend tasks (like PlaylistsController) are complete?

> [!IMPORTANT]
> **Layout Strategy for Auth Pages**
> The Login and Sign Up pages have distinct full-screen background designs without the side navigation and bottom player. I will create a route group `(auth)` and adjust the main `layout.tsx` to hide the global navigation components when the pathname starts with `/login` or `/signup`. Does this approach sound good?

## Verification Plan
1. Navigate to `/`, `/library`, `/artist/123`, `/login`, and `/signup` to verify the UI precisely matches the provided HTML/Tailwind templates.
2. Check responsiveness across mobile and desktop breakpoints.
3. Verify that the global persistent player still functions smoothly across the new pages (except auth pages).
