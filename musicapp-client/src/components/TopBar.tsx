"use client";

export default function TopBar() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] flex justify-between items-center h-20 px-12 z-30 bg-transparent transition-all border-none">
      <div className="flex-1 flex items-center gap-6">
        {/* Navigation buttons */}
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white/50 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-white/50 hover:text-white transition-colors">
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        {/* Minimalist Search */}
        <form action="/search" className="relative w-80 group hidden lg:block">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors text-xl">search</span>
          <input 
            name="q"
            className="w-full bg-white/5 text-white placeholder-white/30 rounded-full py-2.5 pl-12 pr-4 outline-none border border-white/5 focus:border-primary/50 focus:bg-white/10 transition-all text-xs font-medium" 
            placeholder="Search for tracks, artists, or albums..." 
            type="text" 
          />
        </form>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded-full border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-all text-[11px] font-bold uppercase tracking-widest bg-white/5">
          Support
        </button>
        <div className="w-[1px] h-6 bg-white/10 mx-2"></div>
        <button className="flex items-center gap-2 pr-1 pl-3 py-1 rounded-full bg-black/40 border border-white/5 hover:border-white/10 transition-all group">
          <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">Premium User</span>
          <div className="w-8 h-8 rounded-full play-button-gradient flex items-center justify-center">
            <span className="material-symbols-outlined text-black text-lg font-bold">person</span>
          </div>
        </button>
      </div>
    </header>
  );
}
