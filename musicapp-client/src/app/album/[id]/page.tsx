import Image from "next/image";
import Link from "next/link";
import AlbumClientOptions from "@/app/album/[id]/AlbumClientOptions";
import AlbumSongsList from "@/app/album/[id]/AlbumSongsList";
import { AlbumService } from "@/services/apiClient";
import { Album } from "@/types";

// Tắt bộ nhớ cache để test real-time lúc dev
export const dynamic = "force-dynamic";

export default async function AlbumPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  let album: Album | null = null;

  try {
    album = await AlbumService.getAlbumById(resolvedParams.id);
  } catch (error) {
    console.error("Lỗi khi tải chi tiết Album từ Backend:", error);
  }

  if (!album) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-4xl text-white/20">search_off</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 italic">Không tìm thấy Album</h2>
        <p className="text-white/40 mb-8 max-w-xs">Bản thu bạn đang tìm kiếm đã bị di chuyển hoặc xóa khỏi hệ thống.</p>
        <Link href="/" className="px-8 py-3 rounded-full play-button-gradient text-black font-black text-xs uppercase tracking-widest active:scale-95 transition-all">
          Quay lại
        </Link>
      </div>
    );
  }

  return (
    <div className="relative -mt-20">
      {/* Immersive Backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden -z-10 select-none pointer-events-none">
        <img 
          src={album.coverUrl || "https://via.placeholder.com/600"} 
          className="w-full h-full object-cover blur-[100px] opacity-40 scale-125"
          alt="Backdrop blur"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>
      </div>

      <div className="pt-28 px-4 md:px-0">
        <div className="flex flex-col md:flex-row gap-10 items-end mb-12">
          {/* Cover Art */}
          <div className="relative group shrink-0">
            <div className="w-64 h-64 md:w-72 md:h-72 rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 group-hover:scale-[1.02] transition-transform duration-700">
              <img 
                src={album.coverUrl || "https://via.placeholder.com/400"} 
                className="w-full h-full object-cover"
                alt={album.title}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full play-button-gradient flex items-center justify-center text-black shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
              <span className="material-symbols-outlined filled text-3xl">play_arrow</span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4">
            <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
              Bộ sưu tập • Lưu trữ
            </span>
            <div className="space-y-1">
              <h1 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter leading-tight drop-shadow-2xl">
                {album.title}
              </h1>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full play-button-gradient flex items-center justify-center">
                  <span className="material-symbols-outlined text-black text-xs font-bold">person</span>
                </div>
                <p className="text-lg md:text-xl font-bold text-white hover:text-primary transition-colors cursor-pointer">
                  {album.artistName}
                </p>
                <span className="text-white/20">•</span>
                <p className="text-white/40 text-sm font-medium tracking-wide">
                  {album.songs?.length || 0} Bài hát • 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="mb-10 flex items-center gap-6 relative z-10">
          <AlbumClientOptions songs={album.songs || []} />
        </div>

        {/* Tracks Area */}
        <div className="relative z-10 glass-panel rounded-[2.5rem] p-4 md:p-8 border border-white/5 shadow-inner">
          <div className="flex text-[10px] text-white/30 font-bold uppercase tracking-[0.2em] pb-6 border-b border-white/5 mb-6 px-6">
            <div className="w-12 text-center">#</div>
            <div className="flex-1">Tác phẩm Âm nhạc</div>
            <div className="w-24 text-right">Thời lượng</div>
          </div>

          <AlbumSongsList songs={album.songs || []} />
        </div>
      </div>
    </div>
  );
}
