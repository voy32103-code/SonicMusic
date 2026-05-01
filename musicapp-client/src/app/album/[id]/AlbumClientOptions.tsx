"use client";

import { usePlayerStore } from "@/store/usePlayerStore";
import { Song } from "@/types";

interface AlbumClientOptionsProps {
  songs: Song[];
}

export default function AlbumClientOptions({ songs }: AlbumClientOptionsProps) {
  const { activeQueue, setQueue, playSong, isPlaying, togglePlay, currentIndex } = usePlayerStore();

  // Kiểm tra xem Album này có đang được phát không
  const isThisAlbumPlaying = activeQueue.length > 0 && songs.length > 0 && songs.some(s => s.id === activeQueue[currentIndex]?.id);

  const handlePlayAlbum = () => {
    if (!songs || songs.length === 0) return;
    
    if (isThisAlbumPlaying) {
      togglePlay();
    } else {
      setQueue(songs);
      playSong(songs[0]);
    }
  };

  return (
    <div className="flex items-center gap-8">
      <button 
        onClick={handlePlayAlbum}
        className="w-16 h-16 rounded-full play-button-gradient flex items-center justify-center text-black shadow-[0_0_30px_rgba(79,254,126,0.2)] transition-all hover:scale-105 active:scale-95 group relative"
      >
        <div className="absolute inset-0 rounded-full play-button-gradient blur-xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
        <span className="material-symbols-outlined filled text-[40px] relative z-10 translate-x-0.5">
          {isThisAlbumPlaying && isPlaying ? 'pause' : 'play_arrow'}
        </span>
      </button>
      
      <div className="flex items-center gap-4">
        <button className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:text-white transition-all active:scale-90">
          <span className="material-symbols-outlined text-[24px]">favorite</span>
        </button>
        <button className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:text-white transition-all active:scale-90">
          <span className="material-symbols-outlined text-[24px]">download</span>
        </button>
        <button className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/50 hover:text-white transition-all active:scale-90">
          <span className="material-symbols-outlined text-[24px]">more_horiz</span>
        </button>
      </div>
    </div>
  );
}
