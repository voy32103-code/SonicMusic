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
          <span className="text-sm tracking-tight text-glow">Trang chủ</span>
        </Link>
        
        <Link 
          href="/search" 
          className="flex items-center gap-4 text-on-surface-variant hover:text-white transition-all py-3.5 px-6 rounded-full hover:bg-white/5 group active:scale-95"
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">search</span>
          <span className="text-sm tracking-tight">Tìm kiếm</span>
        </Link>
        
        <Link 
          href="/library" 
          className="flex items-center gap-4 text-on-surface-variant hover:text-white transition-all py-3.5 px-6 rounded-full hover:bg-white/5 group active:scale-95"
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform">library_music</span>
          <span className="text-sm tracking-tight">Thư viện</span>
        </Link>

        {/* Now Playing Indicator */}
        <div className="mt-8 px-6 pb-2">
          <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Đang phát</span>
        </div>
        <Link 
          href="/now-playing" 
          className="flex items-center gap-4 text-white font-bold py-3 px-6 rounded-full bg-white/10 scale-[1.02] transition-all shadow-[0_0_15px_rgba(79,254,126,0.1)]"
        >
          <span className="material-symbols-outlined text-primary filled">graphic_eq</span>
          <span className="text-sm tracking-tight text-glow">Bài hát hiện tại</span>
        </Link>
      </div>

      {/* Playlist & Actions */}
      <div className="px-6 space-y-4">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
          <p className="text-xs font-bold text-white mb-1">Tạo Playlist</p>
          <p className="text-[10px] text-on-surface-variant mb-3">Xây dựng bộ sưu tập âm nhạc của bạn</p>
          <button className="w-full py-2.5 rounded-xl play-button-gradient text-black font-bold text-xs uppercase tracking-wider active:scale-95 transition-all">
            Bắt đầu ngay
          </button>
        </div>
      </div>
    </nav>
  );
}
