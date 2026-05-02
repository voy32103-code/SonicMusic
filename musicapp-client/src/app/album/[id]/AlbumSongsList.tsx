"use client";

import { usePlayerStore } from "@/store/usePlayerStore";
import { Song } from "@/types";

interface AlbumSongsListProps {
  songs: Song[];
}

export default function AlbumSongsList({ songs }: AlbumSongsListProps) {
  const { setQueue, playSong, activeQueue, currentIndex, isPlaying, togglePlay } = usePlayerStore();

  const handlePlaySpecificSong = (song: Song, index: number) => {
    if (activeQueue[currentIndex]?.id === song.id) {
      togglePlay();
      return;
    }
    setQueue(songs);
    playSong(song);
  };

  return (
    <div className="space-y-1">
      {songs?.map((song: Song, index: number) => {
        const isThisSongPlaying = activeQueue[currentIndex]?.id === song.id;

        return (
          <div 
            key={song.id} 
            onClick={() => handlePlaySpecificSong(song, index)}
            className={`flex items-center py-4 px-6 rounded-2xl group transition-all cursor-pointer relative overflow-hidden ${
              isThisSongPlaying 
              ? 'bg-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]' 
              : 'hover:bg-white/5'
            }`}
          >
            {/* Playing Indicator Background */}
            {isThisSongPlaying && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 play-button-gradient rounded-r-full shadow-[4px_0_15px_rgba(79,254,126,0.5)]"></div>
            )}

            {/* Index / State Icon */}
            <div className="w-10 flex items-center justify-center shrink-0">
              {isThisSongPlaying ? (
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full play-button-gradient blur-md absolute inset-0 opacity-40 ${isPlaying ? 'animate-pulse' : ''}`}></div>
                  <span className="material-symbols-outlined text-primary text-xl relative z-10 font-bold select-none">
                    {isPlaying ? 'graphic_eq' : 'play_arrow'}
                  </span>
                </div>
              ) : (
                <div className="relative w-8 h-8 flex items-center justify-center">
                  <span className="text-white/20 font-bold text-xs group-hover:opacity-0 transition-opacity select-none">{index + 1}</span>
                  <span className="material-symbols-outlined text-white absolute opacity-0 group-hover:opacity-100 transition-opacity text-xl">play_arrow</span>
                </div>
              )}
            </div>

            {/* Track Info */}
            <div className="flex-1 px-4 min-w-0">
              <p className={`font-bold text-sm truncate transition-colors ${isThisSongPlaying ? 'text-primary drop-shadow-sm' : 'text-white/90 group-hover:text-white'}`}>
                {song.title}
              </p>
              <p className={`text-[11px] font-medium uppercase tracking-[0.1em] mt-0.5 truncate ${isThisSongPlaying ? 'text-primary/60' : 'text-white/30 group-hover:text-white/50'}`}>
                {song.artist}
              </p>
            </div>

            {/* Icons & Actions */}
            <div className="flex items-center gap-6 shrink-0 ml-4">
              <button className={`material-symbols-outlined text-[20px] transition-all hover:scale-110 active:scale-90 ${isThisSongPlaying ? 'text-primary opacity-100' : 'text-white/10 group-hover:text-white/30 opacity-0 group-hover:opacity-100'}`}>
                favorite
              </button>
              <div className={`text-[11px] font-bold tracking-widest tabular-nums w-12 text-right transition-colors ${isThisSongPlaying ? 'text-primary' : 'text-white/30'}`}>
                {Math.floor((song.duration || 0) / 60)}:{((song.duration || 0) % 60).toString().padStart(2, '0')}
              </div>
              <button className="material-symbols-outlined text-white/10 hover:text-white/40 transition-colors opacity-0 group-hover:opacity-100">
                more_horiz
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
