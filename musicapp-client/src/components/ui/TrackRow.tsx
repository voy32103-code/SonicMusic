"use client";

import React from "react";
import { Song } from "@/types";
import { usePlayerStore } from "@/store/usePlayerStore";

interface TrackRowProps {
  song: Song;
  index?: number;
  onPlay?: (song: Song) => void;
  showCover?: boolean;
  showAlbum?: boolean;
}

export default function TrackRow({
  song,
  index,
  onPlay,
  showCover = true,
  showAlbum = true,
}: TrackRowProps) {
  const fallbackCover = "https://lh3.googleusercontent.com/aida-public/AB6AXuBFJ75QftBCEQZedMmh3yH4oYVYb-qQmk_AoLXBB3-XtBxgOZg4Z48vyP8d_izRbC7VoK24IAJIG7vvtDxDGw3jzZldhzJTWueTOuzttSVZhXi2Fp-9bCfB3vB7YO_g9cyd8hGGpYv_WDOK-9vzLO8DsF3bNF5ULoUC1hTGbowSg0swCX3v4SmKAloyU1ZtzFGy6k0iDw14mAkzCQqJvdXiIIvHL0hqx9mWVXooDiGBFr55UY67AfblYwoc4g4vZnrW3zxZvPjDjAa1";
  const { playSong } = usePlayerStore();

  const handlePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    playSong(song);
    if (onPlay) {
      onPlay(song);
    }
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "3:42"; // Fallback duration
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div 
      className="grid grid-cols-[auto_1fr_auto_auto] md:grid-cols-[auto_1fr_1fr_auto_auto] gap-4 px-4 py-3 items-center rounded-lg hover:bg-surface-container-high transition-colors group cursor-pointer"
      onClick={handlePlay}
    >
      {/* Index & Play Button */}
      <div className="w-8 text-center text-on-surface-variant group-hover:text-primary font-medium text-sm">
        {index !== undefined && <span className="group-hover:hidden">{index + 1}</span>}
        <span 
          className={`material-symbols-outlined material-symbols-filled text-xl ${index !== undefined ? 'hidden group-hover:block' : 'group-hover:text-primary'} text-on-surface-variant`} 
        >
          play_arrow
        </span>
      </div>

      {/* Title & Cover */}
      <div className="flex items-center gap-4 min-w-0">
        {showCover && (
          <img 
            alt={song.title} 
            className="w-10 h-10 md:w-12 md:h-12 rounded object-cover flex-shrink-0 shadow-sm" 
            src={song.coverUrl || fallbackCover}
          />
        )}
        <div className="flex flex-col flex-grow min-w-0">
          <span className="font-bold text-on-surface text-sm md:text-base truncate group-hover:text-primary transition-colors">
            {song.title}
          </span>
          <span className="text-xs text-on-surface-variant group-hover:text-on-surface transition-colors truncate hover:underline">
            {song.artist}
          </span>
        </div>
      </div>

      {/* Album (Hidden on mobile) */}
      <div className={`hidden md:block text-sm text-on-surface-variant hover:text-white transition-colors hover:underline truncate pr-4 ${!showAlbum && 'invisible'}`}>
        {song.artist} {/* Fallback since Song doesn't have albumName natively yet */}
      </div>

      {/* Plays / Stats placeholder (Optional) */}
      <div className="hidden lg:block w-24 text-sm text-on-surface-variant text-right">
        {/* Placeholder for play count */}
      </div>

      {/* Duration & Like */}
      <div className="w-16 text-center text-sm text-on-surface-variant flex items-center justify-between">
        <span className="material-symbols-outlined opacity-0 group-hover:opacity-100 hover:text-white transition-all text-sm" onClick={(e) => e.stopPropagation()}>
          favorite
        </span>
        <span>{formatDuration(song.duration)}</span>
      </div>
    </div>
  );
}
