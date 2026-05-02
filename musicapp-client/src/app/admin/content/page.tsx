"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminService, SongDto } from "@/services/adminService";

export default function AdminContentPage() {
  const router = useRouter();
  const [songs, setSongs] = useState<SongDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const data = await adminService.getSongs();
        setSongs(data);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen overflow-hidden antialiased font-body">
      {/* SideNavBar (Shared Component) */}
      <nav className="hidden md:flex flex-col h-screen w-72 fixed left-0 top-0 bg-[#131313] p-8 gap-y-6 z-50">
        {/* Brand Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden shrink-0">
            <img 
              alt="Sonic Immersive Logo" 
              className="w-full h-full object-cover mix-blend-screen opacity-80" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrYwEdD1OAQQjT7E1HtayEhT2WKm6CVcuSdAmED5Pufa5pxAXKNHIpP_gMpgQlB_hAWe9yAW1mfr3xFOBR5rmA4-3FbKlBwFUJ3CLhK53ldtK-j3xuBHjBpPvRIABXOk1sM4KsfU8k914t_iq0SMBvPry2eSQ1o4RlQyM-flitIodWjTp7nPQ2n6c28Jto880SdXYd556kMTteXyv0Kpz35fSPvzZYOs2DRT49Z36vzTMU72Md1xUrIqDfDSGzUcgOPfgPVYiwOuW0"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-headline tracking-tight">Sonic Immersive</h1>
            <p className="text-sm text-primary font-medium tracking-wide">Bảng điều khiển</p>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-col gap-2 flex-grow">
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] bg-transparent hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin">
            <span className="material-symbols-outlined text-xl transition-colors duration-300">dashboard</span>
            <span>Tổng quan</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] bg-transparent hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin/users">
            <span className="material-symbols-outlined text-xl transition-colors duration-300">group</span>
            <span>Người dùng</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#4ffe7e] font-bold bg-transparent bg-surface-container-high/50 group opacity-80 scale-[0.98]" href="/admin/content">
            <span className="material-symbols-outlined text-xl transition-colors duration-300 [&]:[font-variation-settings:'FILL'_1]">library_music</span>
            <span>Nội dung</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] bg-transparent hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin/revenue">
            <span className="material-symbols-outlined text-xl transition-colors duration-300">payments</span>
            <span>Doanh thu</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] bg-transparent hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin/analytics">
            <span className="material-symbols-outlined text-xl transition-colors duration-300">insights</span>
            <span>Phân tích</span>
          </Link>
        </div>
        
        {/* Footer Links */}
        <div className="flex flex-col gap-2 mt-auto">
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] bg-transparent hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin/support">
            <span className="material-symbols-outlined text-xl transition-colors duration-300">help_outline</span>
            <span>Hỗ trợ</span>
          </Link>
          <a className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] bg-transparent hover:text-error hover:translate-x-1 transition-all duration-300 font-semibold text-base group cursor-pointer" onClick={handleLogout}>
            <span className="material-symbols-outlined text-xl transition-colors duration-300">logout</span>
            <span>Đăng xuất</span>
          </a>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="flex-1 md:ml-72 flex flex-col h-screen overflow-hidden">
        {/* TopAppBar (Shared Component) - Rendered for Mobile & Content Search context */}
        <header className="flex justify-between items-center w-full px-8 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl docked full-width top-0 z-40 md:hidden border-b border-surface-container-low/30">
          <div className="flex items-center gap-4">
            <button className="text-[#adaaaa] hover:text-white transition-colors duration-300 scale-95 active:scale-90 transition-transform md:hidden">
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
            <h2 className="text-2xl font-black tracking-tighter text-[#4ffe7e] font-['Plus_Jakarta_Sans']">Sonic Admin</h2>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-[#adaaaa] hover:text-white transition-colors duration-300 scale-95 active:scale-90 transition-transform md:hidden">
              <span className="material-symbols-outlined text-xl">search</span>
            </button>
            <button className="text-[#adaaaa] hover:text-white transition-colors duration-300 scale-95 active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <button className="text-[#adaaaa] hover:text-white transition-colors duration-300 scale-95 active:scale-90 transition-transform">
              <span className="material-symbols-outlined text-xl">settings</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant/30 shrink-0">
              <img 
                alt="Admin profile" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9s9wmIOWCkl5IOR-FPm0qGJVQ9o-4GWmK449zR2359ftw_IFMSjk63_w8UxcPNOsR_EKrttThgqkn7lDeL8ckqq4QVQOd-Q28ZB4Q8fC_LTaATSpAI6t6PGGXquh_BW6quzd7o-0t-F3kLmS8KdVCm_lEVYChGNIgtMC6-uyd1h4n0qA6bn2QY0ZTgBxQsX_i23jeWo0uRlb824SEwtCWTn9dVDOla2ty9bhYKCQdq0tfQiKdxCtWVfTivnTbTCG_Gn_75aSFhNOJ"
              />
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12 bg-surface custom-scrollbar">
          {/* Page Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-[3.5rem] font-headline font-black tracking-[-0.02em] leading-none mb-4 text-on-surface">Thư viện nội dung</h2>
              <p className="text-on-surface-variant text-sm max-w-md font-medium leading-relaxed">Quản lý hệ sinh thái âm thanh. Quản lý bài hát, kiểm duyệt tải lên và xây dựng trải nghiệm âm nhạc.</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <button className="h-12 px-6 rounded-full flex items-center justify-center gap-2 border border-outline-variant/15 bg-transparent text-white hover:bg-surface-container-high transition-colors font-semibold text-sm">
                <span className="material-symbols-outlined text-lg">cloud_upload</span>
                Nhập hàng loạt
              </button>
              <button className="h-12 px-8 rounded-full flex items-center justify-center gap-2 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-sm shadow-[0_4px_24px_rgba(79,254,126,0.2)] hover:scale-[1.02] transition-transform duration-300">
                <span className="material-symbols-outlined text-lg font-bold [&]:[font-variation-settings:'FILL'_1]">add</span>
                Thêm nội dung mới
              </button>
            </div>
          </div>

          {/* Content Layout: Main Library + Moderation Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Library Area (Col 1-8) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* Search & Filters Bar */}
              <div className="flex flex-col sm:flex-row gap-4 bg-surface-container-high/40 p-4 rounded-lg border border-outline-variant/15 backdrop-blur-xl">
                {/* Search Input */}
                <div className="relative flex-1 group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>
                  <input 
                    className="w-full bg-surface-container-highest/50 h-12 rounded-lg pl-12 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary focus:bg-surface-container-highest transition-all border-none" 
                    placeholder="Tìm bài hát, nghệ sĩ, ISRC..." 
                    type="text"
                  />
                </div>
                {/* Tabs / Filters */}
                <div className="flex items-center gap-2 bg-surface-container-low rounded-lg p-1 shrink-0 overflow-x-auto no-scrollbar">
                  <button className="px-5 py-2.5 rounded-md bg-surface-container-highest text-primary font-bold text-sm transition-colors whitespace-nowrap shadow-[0_2px_8px_rgba(0,0,0,0.2)]">Bài hát</button>
                  <button className="px-5 py-2.5 rounded-md text-on-surface-variant hover:text-white hover:bg-surface-container-high/50 font-semibold text-sm transition-colors whitespace-nowrap">Album</button>
                  <button className="px-5 py-2.5 rounded-md text-on-surface-variant hover:text-white hover:bg-surface-container-high/50 font-semibold text-sm transition-colors whitespace-nowrap">Nghệ sĩ</button>
                  <button className="px-5 py-2.5 rounded-md text-on-surface-variant hover:text-white hover:bg-surface-container-high/50 font-semibold text-sm transition-colors whitespace-nowrap">Danh sách phát</button>
                </div>
              </div>

              {/* Library Table/List */}
              <div className="bg-surface-container-high rounded-lg overflow-hidden flex flex-col">
                {/* Table Header */}
                <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-6 py-4 bg-surface-container-highest/30 border-b border-outline-variant/10 items-center text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  <div className="w-10 flex justify-center">
                    <span className="material-symbols-outlined text-sm">check_box_outline_blank</span>
                  </div>
                  <div>Chi tiết bài hát</div>
                  <div className="w-32 hidden md:block">Thể loại</div>
                  <div className="w-24 hidden sm:block">Trạng thái</div>
                  <div className="w-12 text-center">Thao tác</div>
                </div>

                {/* List Items */}
                <div className="flex flex-col divide-y divide-outline-variant/5">
                  {isLoading ? (
                    <div className="p-8 text-center text-on-surface-variant font-medium">Đang tải thư viện nội dung...</div>
                  ) : songs.length === 0 ? (
                    <div className="p-8 text-center text-on-surface-variant font-medium">Không tìm thấy bài hát.</div>
                  ) : (
                    songs.map((song) => (
                      <div key={song.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-6 py-4 items-center hover:bg-surface-container-highest/20 transition-colors group cursor-pointer">
                        <div className="w-10 flex justify-center text-outline-variant group-hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-xl">check_box_outline_blank</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded bg-surface-container-lowest overflow-hidden shrink-0 relative group-hover:shadow-[0_0_15px_rgba(79,254,126,0.15)] transition-shadow">
                            <img 
                              alt={`${song.title} Cover`}
                              className="w-full h-full object-cover" 
                              src={song.coverUrl || "https://placehold.co/100x100/131313/4ffe7e?text=Audio"}
                            />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="material-symbols-outlined text-white [&]:[font-variation-settings:'FILL'_1]">play_arrow</span>
                            </div>
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-base font-bold text-on-surface truncate group-hover:text-primary transition-colors">{song.title}</h4>
                            <p className="text-sm text-on-surface-variant truncate">{song.artist}</p>
                          </div>
                        </div>
                        <div className="w-32 hidden md:flex items-center">
                          <span className="px-2 py-1 rounded bg-surface-container-low text-xs text-on-surface font-medium border border-outline-variant/15">Track</span>
                        </div>
                        <div className="w-24 hidden sm:flex items-center">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(79,254,126,0.8)]"></span>
                            Đã xuất bản
                          </span>
                        </div>
                        <div className="w-12 flex justify-center">
                          <button className="text-on-surface-variant hover:text-white transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Bulk Actions Bar (Visible when item selected) */}
                <div className="bg-primary/10 border-t border-primary/20 px-6 py-4 flex items-center justify-between mt-auto">
                  <span className="text-sm font-bold text-primary">Đã chọn 1 bài hát</span>
                  <div className="flex items-center gap-3">
                    <button className="h-8 px-4 rounded text-xs font-bold text-white bg-surface-container-highest hover:bg-surface-container-highest/80 transition-colors border border-outline-variant/15">Sửa metadata</button>
                    <button className="h-8 px-4 rounded text-xs font-bold text-white bg-surface-container-highest hover:bg-surface-container-highest/80 transition-colors border border-outline-variant/15">Thêm vào danh sách phát</button>
                    <button className="h-8 px-4 rounded text-xs font-bold text-error bg-error/10 hover:bg-error/20 transition-colors">Xóa</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Moderation Queue Sidebar (Col 9-12) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-surface-container-high rounded-lg p-6 border border-outline-variant/15 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold font-headline text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-error">warning</span>
                    Hàng đợi kiểm duyệt
                  </h3>
                  <span className="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-bold flex items-center justify-center">0</span>
                </div>
                
                <div className="flex flex-col gap-4">
                  <div className="text-sm text-on-surface-variant p-4 text-center">
                    Hàng đợi trống. Không có mục nào cần kiểm duyệt.
                  </div>
                </div>
                
                <button className="mt-6 w-full py-3 text-sm font-bold text-on-surface-variant hover:text-white transition-colors">Xem tất cả vi phạm</button>
              </div>

              {/* Quick Stats Bento */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-low rounded-lg p-5 border border-outline-variant/15 flex flex-col justify-between aspect-square">
                  <span className="material-symbols-outlined text-primary mb-2">library_music</span>
                  <div>
                    <div className="text-3xl font-black font-headline text-white tracking-tight">{songs.length}</div>
                    <div className="text-xs text-on-surface-variant font-medium mt-1">Tổng bài hát</div>
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-lg p-5 border border-outline-variant/15 flex flex-col justify-between aspect-square">
                  <span className="material-symbols-outlined text-primary mb-2">publish</span>
                  <div>
                    <div className="text-3xl font-black font-headline text-white tracking-tight">0</div>
                    <div className="text-xs text-on-surface-variant font-medium mt-1">Xuất bản tuần này</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Padding */}
          <div className="h-24"></div>
        </div>
      </main>
    </div>
  );
}
