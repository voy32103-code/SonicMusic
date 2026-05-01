# Sonic Immersive - Refactoring & Zustand Player Integration Plan

This plan outlines the architecture changes required to bring Sonic Immersive to enterprise-level quality by refactoring the UI components for DRY compliance and wiring up a fully functional global music player state via Zustand.

## User Review Required

> [!IMPORTANT]
> Please review this plan carefully as it will touch almost every page in the frontend to extract UI components and connect them to a global state. If you approve, I will begin execution immediately.

## Proposed Changes

### Phase 1: Component Extraction (Gom Component)
We will extract the repeated HTML blocks into reusable React components located in `src/components/ui/`.

#### [NEW] [MediaCard.tsx](file:///d:/Yen-Antigravity/Webnghenhac/musicapp-client/src/components/ui/MediaCard.tsx)
A generic, reusable card component for Albums, Artists, and Playlists. It will replace the duplicated "Standard Library Card" and "Recently Played" square cards in `page.tsx`, `library/page.tsx`, and `artist/[id]/page.tsx`.
- **Props**: `title`, `subtitle`, `imageUrl`, `onClickPlay`, `href` (for Link routing).

#### [NEW] [TrackRow.tsx](file:///d:/Yen-Antigravity/Webnghenhac/musicapp-client/src/components/ui/TrackRow.tsx)
A list item component representing a single song. It will replace the hardcoded track rows in `artist/[id]/page.tsx`, `search/page.tsx`, and `album/[id]/page.tsx`.
- **Props**: `song` (Song object), `index`, `onPlay`.

#### [MODIFY] Page Files
We will refactor the following files to use `<MediaCard>` and `<TrackRow>` instead of raw Tailwind HTML:
- `src/app/page.tsx`
- `src/app/library/page.tsx`
- `src/app/search/page.tsx`
- `src/app/artist/[id]/page.tsx`

---

### Phase 2: Global State Management (Zustand Player)
We will introduce Zustand to handle the global playback state.

#### [NEW] [usePlayerStore.ts](file:///d:/Yen-Antigravity/Webnghenhac/musicapp-client/src/store/usePlayerStore.ts)
A Zustand store managing the player state.
- **State**: `currentSong: Song | null`, `isPlaying: boolean`, `queue: Song[]`
- **Actions**: `playSong(song: Song)`, `pause()`, `resume()`, `setQueue(songs: Song[])`

#### [MODIFY] [BottomPlayer.tsx](file:///d:/Yen-Antigravity/Webnghenhac/musicapp-client/src/components/BottomPlayer.tsx)
Update the static bottom player to read from `usePlayerStore`.
- React to `currentSong` changes (update title, artist, cover art).
- Connect the Play/Pause button to `isPlaying`.
- (Optional but recommended) Embed an invisible `<audio>` element that actually plays `currentSong.sourceUrl` if available.

#### [MODIFY] Play Buttons Across App
Update the newly created `<TrackRow>` and `<MediaCard>` (and Hero sections) to dispatch `playSong(song)` when their respective play buttons are clicked, replacing static UI behavior with interactive global state updates.

## Verification Plan
1. **Manual Verification**: Run `npm run dev`. Navigate across Home, Library, and Search. Verify the UI remains visually identical but the code is much cleaner.
2. **State Verification**: Click a "Play" button on any track and verify that the `BottomPlayer` instantly updates to show the selected track's details and play state.
