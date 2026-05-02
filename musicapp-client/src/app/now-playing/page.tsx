"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePlayerStore } from "@/store/usePlayerStore";

// Format seconds to mm:ss
const formatTime = (timeInSeconds: number) => {
  if (isNaN(timeInSeconds)) return "0:00";
  const m = Math.floor(timeInSeconds / 60);
  const s = Math.floor(timeInSeconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export default function NowPlayingPage() {
  const {
    activeQueue,
    currentIndex,
    isPlaying,
    togglePlay,
    nextSong,
    prevSong,
    fetchSongs,
    isShuffle,
    toggleShuffle,
  } = usePlayerStore();

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

  // Progress bar width via ref
  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${progressPercentage}%`;
    }
  }, [progressPercentage]);

  // Fallback data for display
  const trackTitle = currentTrack?.title || "Neon Requiem";
  const trackArtist = currentTrack?.artist || "Kavinsky ft. The Midnight";
  const trackCover =
    currentTrack?.coverUrl ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDYKIvIWux3mbfOcBTLPiEO3hGlO4DYtfoWyNgop0I7Q2lE2QGc5B_v1ngMTXkXH4jF0z3ZlbvCYy7BMWR2r7R27IYdO0pYTF8UGfNfFjI0Gof7iUiqmuil7FzCj_rQKBz-pEyw52hkPgpaGbTcZcPIxsWT5KojSYol28WOopLGtNtxHNte---PGwGupYbTgi8-FQEvspL_cG0022QHUXvOb3oMbnwoG52O2Re0mWP9hJhcos6QwUMjKfRdZqus5BKqOnaipl60S-rA";
  const trackMiniCover =
    currentTrack?.coverUrl ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBoHKLinSi4qPZS6nnxzzOCfgb63WTV1DS9P88FjhraclUYoqDv17_8uY6fnszdi-uVR9gquX4AN9-6lIVEQgcquhJxv0755DvsPpWgbw8e7nXlEKDVYkhckBBK7sv9nQUbTs0GjFXET7IsauBwbhcsnrZgyJak30bC6Fsw6T-ikFHWM-kyjKkuiEE_UJMVGAwyOv0LAA2PweuIWmxSMF9MHeTSh5WT94kQ2J_NHG9WIJfRX3IctH_9okn3CPS2IcIo7pDIcT46ipLU";

  return (
    <div className="bg-background text-on-surface h-screen overflow-hidden flex font-body selection:bg-primary/30">
      {/* Hidden Audio Element */}
      {currentTrack && (
        <audio
          ref={audioRef}
          src={currentTrack.sourceUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={nextSong}
          onLoadedMetadata={handleTimeUpdate}
        />
      )}

      {/* Ambient Background Layer */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#1a0f2e]/60 via-background to-background pointer-events-none transition-colors duration-1000"></div>

      {/* SideNavBar */}
      <nav className="fixed left-0 top-0 h-full w-64 flex-col z-40 bg-surface-container-low border-none shadow-none text-sm tracking-tight hidden md:flex">
        <div className="p-8">
          <h1 className="text-2xl font-black text-primary italic mb-1 truncate" title="The Sonic Immersive">
            The Sonic Immersive
          </h1>
          <p className="text-on-surface-variant text-xs font-medium">Âm thanh cao cấp</p>
        </div>
        <div className="flex-1 px-4 py-4 space-y-2">
          <Link
            className="flex items-center gap-4 text-on-surface-variant hover:text-white transition-all duration-300 py-3 px-6 rounded-full hover:bg-surface-container-high group"
            href="/"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">home</span>
            <span className="font-medium">Trang chủ</span>
          </Link>
          <Link
            className="flex items-center gap-4 text-on-surface-variant hover:text-white transition-all duration-300 py-3 px-6 rounded-full hover:bg-surface-container-high group"
            href="/search"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">search</span>
            <span className="font-medium">Tìm kiếm</span>
          </Link>
          <Link
            className="flex items-center gap-4 text-on-surface-variant hover:text-white transition-all duration-300 py-3 px-6 rounded-full hover:bg-surface-container-high group"
            href="/library"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">library_music</span>
            <span className="font-medium">Thư viện</span>
          </Link>

          {/* Now Playing Indicator */}
          <div className="mt-8 px-6 pb-2">
            <span className="text-xs uppercase tracking-widest text-on-surface-variant font-bold">Đang phát</span>
          </div>
          <div className="flex items-center gap-4 text-white font-bold py-3 px-6 rounded-full bg-surface-container-high scale-[1.02] transition-all">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              graphic_eq
            </span>
            <span>Bài hát hiện tại</span>
          </div>
        </div>
        <div className="p-6">
          <button className="w-full py-4 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-sm tracking-wide hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(79,254,126,0.3)] transition-all duration-300">
            Tạo Playlist
          </button>
        </div>
      </nav>

      {/* TopAppBar */}
      <header className="hidden md:flex justify-between items-center h-16 px-8 ml-64 w-[calc(100%-16rem)] fixed top-0 right-0 z-30 bg-background/80 backdrop-blur-xl transition-all font-medium">
        <div className="flex-1 flex items-center">
          {/* Search bar placeholder - hidden on this page */}
        </div>
        <div className="flex items-center gap-6">
          <button className="text-white hover:scale-110 hover:text-white transition-all duration-300">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="text-white hover:scale-110 hover:text-white transition-all duration-300">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 ml-0 md:ml-64 mt-0 md:mt-16 h-[calc(100vh-6rem)] md:h-[calc(100vh-4rem)] overflow-y-auto z-10 relative no-scrollbar">
        <div className="max-w-[1600px] mx-auto p-6 md:p-12 lg:p-16 w-full h-full min-h-[800px] flex flex-col xl:flex-row gap-12 lg:gap-24 relative">
          {/* Left Side: Album Art & Details */}
          <div className="w-full xl:w-5/12 flex flex-col justify-center h-full relative z-20 shrink-0">
            {/* Immersive Album Art Container */}
            <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] group">
              <img
                alt="Ảnh bìa album"
                className="w-full h-full object-cover transition-transform duration-[10s] ease-out group-hover:scale-105"
                src={trackCover}
              />
              {/* Subtle inner shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent"></div>
            </div>
            {/* Track Info */}
            <div className="mt-10 flex flex-col items-start w-full">
              <div className="flex justify-between items-end w-full mb-2">
                <div className="flex-1 pr-6">
                  <h2
                    className="text-[3.5rem] leading-[1.1] font-bold text-on-surface tracking-tight mb-2 truncate"
                    title={trackTitle}
                  >
                    {trackTitle}
                  </h2>
                  <h3 className="text-2xl text-on-surface-variant font-medium">{trackArtist}</h3>
                </div>
                <button className="text-primary hover:scale-110 transition-transform mb-2 shrink-0">
                  <span
                    className="material-symbols-outlined text-[2rem]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                </button>
              </div>
              {/* Metadata Badges */}
              <div className="flex items-center gap-3 mt-4">
                <span className="bg-surface-container-highest px-3 py-1 rounded-md text-xs font-bold tracking-wider text-on-surface uppercase">
                  Lossless
                </span>
                <span className="bg-surface-container-highest px-3 py-1 rounded-md text-xs font-bold tracking-wider text-on-surface uppercase">
                  Atmos
                </span>
                <span className="text-on-surface-variant text-sm pl-2">2023 • Synthetix EP</span>
              </div>
            </div>
          </div>

          {/* Right Side: Lyrics & Queue Panel */}
          <div className="w-full xl:w-7/12 h-full flex flex-col justify-center z-20">
            {/* Tab Headers */}
            <div className="flex items-center gap-8 mb-12 border-b border-surface-container-highest pb-4">
              <button className="text-2xl font-bold text-primary relative">
                Lời bài hát
                <div className="absolute -bottom-[18px] left-0 w-full h-1 bg-primary rounded-t-full"></div>
              </button>
              <button className="text-xl font-medium text-on-surface-variant hover:text-on-surface transition-colors">
                Hàng đợi
              </button>
              <button className="text-xl font-medium text-on-surface-variant hover:text-on-surface transition-colors">
                Thông tin nghệ sĩ
              </button>
            </div>

            {/* Synchronized Lyrics Display */}
            <div className="flex-1 overflow-y-auto pr-8 no-scrollbar relative" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
              <div className="space-y-8 pb-32">
                <p className="text-3xl lg:text-4xl font-bold text-on-surface-variant/40 hover:text-on-surface-variant transition-colors cursor-pointer leading-tight tracking-tight blur-[1px] hover:blur-none">
                  Midnight city, lights are blinding
                </p>
                <p className="text-3xl lg:text-4xl font-bold text-on-surface-variant/40 hover:text-on-surface-variant transition-colors cursor-pointer leading-tight tracking-tight blur-[1px] hover:blur-none">
                  Driving fast, the past is winding
                </p>
                {/* Active Lyric Line */}
                <div className="relative py-4 pl-6 border-l-4 border-primary bg-surface-container-low/30 -ml-6 rounded-r-2xl backdrop-blur-sm">
                  <p className="text-4xl lg:text-5xl font-black text-on-surface leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary-container drop-shadow-[0_0_15px_rgba(79,254,126,0.3)]">
                    But I can&apos;t outrun the echo of you
                  </p>
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-on-surface-variant/40 hover:text-on-surface-variant transition-colors cursor-pointer leading-tight tracking-tight blur-[1px] hover:blur-none">
                  Neon tears on digital streets
                </p>
                <p className="text-3xl lg:text-4xl font-bold text-on-surface-variant/40 hover:text-on-surface-variant transition-colors cursor-pointer leading-tight tracking-tight blur-[1px] hover:blur-none">
                  Heartbeats sync to synthetic beats
                </p>
                <p className="text-3xl lg:text-4xl font-bold text-on-surface-variant/40 hover:text-on-surface-variant transition-colors cursor-pointer leading-tight tracking-tight blur-[1px] hover:blur-none">
                  In this grid, we&apos;re lost and found
                </p>
                <p className="text-3xl lg:text-4xl font-bold text-on-surface-variant/40 hover:text-on-surface-variant transition-colors cursor-pointer leading-tight tracking-tight blur-[1px] hover:blur-none">
                  Waiting for the sun to break the sound
                </p>
              </div>

              {/* Gradient overlay to fade lyrics top/bottom */}
              <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-background to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
        {/* Bottom spacing for the player */}
        <div className="h-32"></div>
      </main>

      {/* Mobile BottomNavBar / Playback Controls */}
      <nav className="fixed bottom-0 left-0 w-full h-24 z-50 flex justify-between items-center px-6 bg-surface-container-low shadow-[0_-4px_20px_rgba(0,0,0,0.5)] text-[10px] uppercase tracking-widest text-on-surface-variant md:hidden">
        <button onClick={prevSong} className="flex flex-col items-center gap-1 hover:text-white transition-all w-16">
          <span className="material-symbols-outlined text-[24px]">skip_previous</span>
          <span className="truncate">Trước</span>
        </button>
        <button onClick={togglePlay} className="flex flex-col items-center gap-1 text-primary scale-125 transition-all w-16">
          <span
            className="material-symbols-outlined text-[32px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {isPlaying ? "pause_circle" : "play_circle"}
          </span>
          <span className="truncate font-bold text-white">{isPlaying ? "Tạm dừng" : "Phát"}</span>
        </button>
        <button onClick={nextSong} className="flex flex-col items-center gap-1 hover:text-white transition-all w-16">
          <span className="material-symbols-outlined text-[24px]">skip_next</span>
          <span className="truncate">Tiếp</span>
        </button>
        <button className="flex flex-col items-center gap-1 hover:text-white transition-all w-16">
          <span className="material-symbols-outlined text-[24px]">volume_up</span>
          <span className="truncate">Âm lượng</span>
        </button>
        <Link href="/" className="flex flex-col items-center gap-1 hover:text-white transition-all w-16">
          <span className="material-symbols-outlined text-[24px]">open_in_full</span>
          <span className="truncate">Thu gọn</span>
        </Link>
      </nav>

      {/* Desktop Bottom Player Bar */}
      <div className="hidden md:flex fixed bottom-0 left-64 w-[calc(100%-16rem)] h-28 bg-surface-container-low/90 backdrop-blur-2xl z-50 items-center px-8 border-t border-surface-container-highest/30 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
        {/* Now Playing Mini Info */}
        <div className="flex items-center gap-4 w-1/4 min-w-[200px]">
          <img
            alt="Ảnh bìa nhỏ"
            className="w-16 h-16 rounded-xl object-cover shadow-lg"
            src={trackMiniCover}
          />
          <div className="flex flex-col">
            <span className="text-on-surface font-bold text-sm truncate w-40">{trackTitle}</span>
            <span className="text-on-surface-variant text-xs truncate w-40">{trackArtist}</span>
          </div>
          <button className="ml-2 text-primary hover:scale-110 transition-transform">
            <span
              className="material-symbols-outlined text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
          </button>
        </div>

        {/* Central Controls & Progress */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-6 mb-3">
            <button
              onClick={toggleShuffle}
              className={`transition-colors ${isShuffle ? "text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
            >
              <span className="material-symbols-outlined">shuffle</span>
            </button>
            <button
              onClick={prevSong}
              className="text-on-surface-variant hover:text-on-surface transition-colors hover:scale-110"
            >
              <span className="material-symbols-outlined text-3xl">skip_previous</span>
            </button>
            {/* Play Button with Gradient Glow */}
            <button
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center hover:scale-105 transition-all shadow-[0_0_20px_rgba(79,254,126,0.2)]"
            >
              <span
                className="material-symbols-outlined text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </button>
            <button
              onClick={nextSong}
              className="text-on-surface-variant hover:text-on-surface transition-colors hover:scale-110"
            >
              <span className="material-symbols-outlined text-3xl">skip_next</span>
            </button>
            <button className="text-primary hover:text-primary-dim transition-colors">
              <span className="material-symbols-outlined">repeat</span>
            </button>
          </div>
          {/* Progress Bar */}
          <div className="w-full flex items-center gap-4 text-xs font-medium text-on-surface-variant">
            <span>{formatTime(currentTime)}</span>
            <div
              onClick={handleSeek}
              className="flex-1 h-1.5 bg-surface-container-highest rounded-full overflow-hidden cursor-pointer group relative"
            >
              <div
                ref={progressRef}
                className="h-full bg-primary rounded-full group-hover:bg-primary-container transition-colors relative"
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"></div>
              </div>
            </div>
            <span>{formatTime(duration || currentTrack?.duration || 0)}</span>
          </div>
        </div>

        {/* Right Controls (Volume & Actions) */}
        <div className="w-1/4 min-w-[200px] flex items-center justify-end gap-4">
          <button className="text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-xl">mic</span>
          </button>
          <button className="text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-xl">queue_music</span>
          </button>
          <button className="text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-xl">devices</span>
          </button>
          <div className="flex items-center gap-2 w-28 ml-2">
            <span className="material-symbols-outlined text-on-surface-variant text-sm">volume_up</span>
            <div className="flex-1 h-1 bg-surface-container-highest rounded-full overflow-hidden cursor-pointer group">
              <div className="h-full bg-on-surface-variant w-[80%] rounded-full group-hover:bg-primary transition-colors"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
