import Link from "next/link";

export default function Sidebar() {
  return (
    <nav className="fixed left-0 top-0 h-full w-64 flex flex-col z-40 bg-black/95 backdrop-blur-2xl border-r border-white/5 py-8 hidden md:flex">
      {/* Brand Logo */}
      <div className="px-8 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl play-button-gradient flex items-center justify-center">
            <span className="material-symbols-outlined text-black font-bold">graphic_eq</span>
          </div>
          <div>
            <h1 className="text-xl font-black text-white italic tracking-tighter leading-none">SONIC</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mt-0.5">Immersive</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Links */}
      <div className="flex flex-col gap-2 px-4 flex-1">
        <Link 
          href="/" 
          className="flex items-center gap-4 text-white font-bold py-3.5 px-6 rounded-full bg-white/5 transition-all hover:bg-white/10 group active:scale-95"
        >
          <span className="material-symbols-outlined filled text-primary group-hover:scale-110 transition-transform">home</span>
          <span className="text-sm tracking-tight text-glow">Home</span>
        </Link>
        
        <Link 
          href="/search" 
          className="flex items-center gap-4 text-on-surface-variant hover:text-white transition-all py-3.5 px-6 rounded-full hover:bg-white/5 group active:scale-95"
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">search</span>
          <span className="text-sm tracking-tight">Search</span>
        </Link>
        
        <Link 
          href="/library" 
          className="flex items-center gap-4 text-on-surface-variant hover:text-white transition-all py-3.5 px-6 rounded-full hover:bg-white/5 group active:scale-95"
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">library_music</span>
          <span className="text-sm tracking-tight">Your Library</span>
        </Link>
      </div>

      {/* Playlist & Actions */}
      <div className="px-6 space-y-4">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-xs font-bold text-white mb-1">Create Playlist</p>
          <p className="text-[10px] text-on-surface-variant mb-3">Build your personal music collection</p>
          <button className="w-full py-2.5 rounded-xl play-button-gradient text-black font-bold text-xs uppercase tracking-wider active:scale-95 transition-all">
            Start Now
          </button>
        </div>
      </div>
    </nav>
  );
}
