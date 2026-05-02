import { create } from "zustand";
import { Song } from "@/types";

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  activeQueue: Song[];
  currentIndex: number;
  isShuffle: boolean;
  
  // Actions
  playSong: (song: Song) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  setQueue: (songs: Song[]) => void;
  nextSong: () => void;
  prevSong: () => void;
  fetchSongs: () => Promise<void>;
  toggleShuffle: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  currentSong: null,
  isPlaying: false,
  activeQueue: [],
  currentIndex: 0,
  isShuffle: false,

  playSong: (song) => set((state) => {
    // If song is already in queue, jump to it. Else, add it and play
    const index = state.activeQueue.findIndex(s => s.id === song.id);
    if (index >= 0) {
      return { currentSong: song, isPlaying: true, currentIndex: index };
    }
    return { 
      currentSong: song, 
      isPlaying: true, 
      activeQueue: [song, ...state.activeQueue],
      currentIndex: 0
    };
  }),
  togglePlay: () => set((state) => {
    if (!state.currentSong) return state;
    return { isPlaying: !state.isPlaying };
  }),
  pause: () => set({ isPlaying: false }),
  resume: () => set((state) => {
    if (!state.currentSong) return state;
    return { isPlaying: true };
  }),
  setQueue: (songs) => set({ activeQueue: songs, currentIndex: 0, currentSong: songs[0] || null }),
  nextSong: () => set((state) => {
    if (state.activeQueue.length === 0) return state;
    const nextIdx = state.isShuffle 
      ? Math.floor(Math.random() * state.activeQueue.length)
      : (state.currentIndex + 1) % state.activeQueue.length;
    return { currentIndex: nextIdx, currentSong: state.activeQueue[nextIdx], isPlaying: true };
  }),
  prevSong: () => set((state) => {
    if (state.activeQueue.length === 0) return state;
    const prevIdx = state.isShuffle
      ? Math.floor(Math.random() * state.activeQueue.length)
      : (state.currentIndex - 1 + state.activeQueue.length) % state.activeQueue.length;
    return { currentIndex: prevIdx, currentSong: state.activeQueue[prevIdx], isPlaying: true };
  }),
  fetchSongs: async () => {
    // Dummy implementation for now to prevent crashing
  },
  toggleShuffle: () => set((state) => ({ isShuffle: !state.isShuffle })),
}));
