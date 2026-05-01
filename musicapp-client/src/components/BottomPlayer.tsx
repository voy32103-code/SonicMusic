"use client";
import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/store/usePlayerStore";

// Hàm định dạng giây thành mm:ss
const formatTime = (timeInSeconds: number) => {
  if (isNaN(timeInSeconds)) return "0:00";
  const m = Math.floor(timeInSeconds / 60);
  const s = Math.floor(timeInSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export default function BottomPlayer() {
  const { activeQueue, currentIndex, isPlaying, togglePlay, nextSong, prevSong, fetchSongs, isShuffle, toggleShuffle } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);

  const currentTrack = activeQueue[currentIndex];

  // Sync isPlaying state with Audio element
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => console.log("Autoplay prevented: ", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Handle Time Update for Progress Bar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  // Handle Progress Bar Click (Seek)
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Refactor: Bỏ JSX style prop và xử lý DOM trực tiếp để chiều ý ESLint khắt khe nhất
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${progressPercentage}%`;
    }
  }, [progressPercentage]);

  if (!currentTrack) return null;

  return (
    <nav className="fixed bottom-0 left-0 w-full h-24 bg-black/80 backdrop-blur-3xl border-t border-white/5 z-50 flex justify-between items-center px-8 md:px-12 text-white">
      
      {/* Hidden Audio Element */}
      <audio 
        ref={audioRef}
        src={currentTrack.sourceUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Now Playing Info (Left) */}
      <div className="flex items-center gap-4 w-[30%] min-w-[200px]">
        <div className="relative group cursor-pointer">
          <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 shadow-2xl transition-transform group-hover:scale-105">
            <img 
              className="w-full h-full object-cover" 
              src={currentTrack.coverUrl || "https://via.placeholder.com/150"}
              alt={currentTrack.title}
            />
          </div>
          <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-lg">expand_less</span>
          </div>
        </div>
        <div className="overflow-hidden">
          <h4 className="text-white font-bold text-sm truncate hover:underline cursor-pointer">{currentTrack.title}</h4>
          <p className="text-white/50 text-[11px] truncate hover:text-white transition-colors cursor-pointer">{currentTrack.artist}</p>
        </div>
        <button className="ml-2 text-white/30 hover:text-primary transition-all active:scale-90">
          <span className="material-symbols-outlined text-[20px]">favorite</span>
        </button>
      </div>
      
      {/* Playback Controls & Progress (Center) */}
      <div className="flex flex-col items-center justify-center w-[40%] max-w-xl">
        <div className="flex items-center gap-8 mb-2.5">
          <button onClick={toggleShuffle} className={`transition-colors active:scale-90 ${isShuffle ? 'text-primary' : 'text-white/40 hover:text-white'}`}>
            <span className="material-symbols-outlined text-[22px]">shuffle</span>
          </button>
          
          <button onClick={prevSong} className="text-white/70 hover:text-white transition-colors active:scale-90">
            <span className="material-symbols-outlined text-[28px]">skip_previous</span>
          </button>
          
          <button 
            onClick={togglePlay} 
            className="w-12 h-12 rounded-full play-button-gradient flex items-center justify-center text-black transition-all active:scale-95 group relative"
          >
            <div className="absolute inset-0 rounded-full play-button-gradient blur-md opacity-50 group-hover:opacity-80 transition-opacity"></div>
            <span className="material-symbols-outlined filled text-[32px] relative z-10">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          
          <button onClick={nextSong} className="text-white/70 hover:text-white transition-colors active:scale-90">
            <span className="material-symbols-outlined text-[28px]">skip_next</span>
          </button>

          <button className="text-white/40 hover:text-white transition-colors active:scale-90">
            <span className="material-symbols-outlined text-[22px]">repeat</span>
          </button>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full flex items-center gap-3 text-[10px] font-bold text-white/40 tracking-wider">
          <span className="w-10 text-right">{formatTime(currentTime)}</span>
          <div 
            onClick={handleSeek}
            className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer relative group"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div 
              ref={progressRef}
              className="h-full play-button-gradient rounded-full relative transition-[width] duration-150 ease-linear shadow-[0_0_10px_rgba(79,254,126,0.3)]"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-xl scale-0 group-hover:scale-100 transition-transform border-2 border-primary"></div>
            </div>
          </div>
          <span className="w-10">{formatTime(duration || currentTrack.duration || 0)}</span>
        </div>
      </div>
      
      {/* Extras (Right) */}
      <div className="flex items-center justify-end gap-5 w-[30%]">
        <button className="text-white/40 hover:text-white transition-all hidden lg:block">
          <span className="material-symbols-outlined text-[20px]">mic_external_on</span>
        </button>
        <button className="text-white/40 hover:text-white transition-all hidden lg:block">
          <span className="material-symbols-outlined text-[20px]">queue_music</span>
        </button>
        <div className="flex items-center gap-2 group min-w-[120px]">
          <button className="text-white/60 hover:text-white transition-all active:scale-90">
            <span className="material-symbols-outlined text-[22px]">volume_up</span>
          </button>
          <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer relative">
            <div className="h-full play-button-gradient w-2/3 rounded-full absolute left-0 top-0 shadow-[0_0_8px_rgba(79,254,126,0.2)]"></div>
          </div>
        </div>
        <button className="text-white/40 hover:text-white transition-all">
          <span className="material-symbols-outlined text-[20px]">fullscreen</span>
        </button>
      </div>
    </nav>
  );
}
