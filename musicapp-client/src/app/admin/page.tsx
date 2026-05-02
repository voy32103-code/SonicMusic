"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminService, AdminDashboardMetrics } from "@/services/adminService";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<AdminDashboardMetrics | null>(null);
  
  useEffect(() => {
    adminService.getMetrics()
      .then(setMetrics)
      .catch(console.error);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <div className="bg-surface text-on-background antialiased flex h-screen overflow-hidden font-body">
      {/* SideNavBar (Shared Component) */}
      <nav className="hidden md:flex flex-col h-screen w-72 fixed left-0 top-0 bg-[#131313] p-8 gap-y-6 z-50 border-r border-outline-variant/10 transition-colors duration-300">
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
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#4ffe7e] font-bold bg-transparent bg-surface-container-high/50 group opacity-80 scale-[0.98] relative" href="/admin">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-primary shadow-[0_0_10px_rgba(79,254,126,0.5)]"></div>
            <span className="material-symbols-outlined text-xl transition-colors duration-300 [&]:[font-variation-settings:'FILL'_1]">dashboard</span>
            <span>Tổng quan</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] bg-transparent hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin/users">
            <span className="material-symbols-outlined text-xl transition-colors duration-300">group</span>
            <span>Người dùng</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] bg-transparent hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin/content">
            <span className="material-symbols-outlined text-xl transition-colors duration-300">library_music</span>
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

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 flex flex-col h-screen overflow-hidden relative bg-surface">
        {/* Ambient Background Element */}
        <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        
        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-8 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl docked full-width top-0 z-40 sticky transition-colors font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight border-b border-outline-variant/10">
          <div className="flex items-center gap-4 md:hidden">
            <span className="text-2xl font-black tracking-tighter text-[#4ffe7e]">Sonic Admin</span>
          </div>
          <div className="hidden md:flex items-center gap-4 w-1/3">
            <div className="relative hidden sm:block w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
              <input className="bg-surface-container-high text-on-surface rounded-full py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/15 text-sm placeholder:text-on-surface-variant transition-all" placeholder="Tìm kiếm..." type="text"/>
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-on-surface md:hidden text-center absolute left-1/2 transform -translate-x-1/2">Tổng quan</h2>
          <div className="flex items-center gap-4 ml-auto">
            <button className="text-[#adaaaa] hover:text-white transition-colors duration-300 scale-95 active:scale-90 p-2 rounded-full hover:bg-surface-container-high">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <button className="text-[#adaaaa] hover:text-white transition-colors duration-300 scale-95 active:scale-90 p-2 rounded-full hover:bg-surface-container-high">
              <span className="material-symbols-outlined text-xl">settings</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden ml-2 ghost-border">
              <img alt="Admin profile" className="w-full h-full object-cover" data-alt="close up portrait of a young person with soft studio lighting and dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Uvkz81Q2AUfkEa3x0C02io327H0MPfTITHrJCpl4M0T3sinn1p0RiSLv_UbhEcqGTIszteoyPIfqHxLFyg6szZyXDI11z5s9MSF9LV-U9f6mIT3iJ9eIZNDS31bbwDYwFw1JufwRp_PxMabcA3hpmxW_d4sFyphOZ2vCmIs3kPSYQiQr4Mkv2Mcyd4uco8EIAcnTc6yMujoFMvXJdBxO2h0n7AZ-N_6iJNRM_ty1RYO0RD4lLfUvPSkfYDT3r3gqFgA3v5YZn5mB" />
            </div>
          </div>
        </header>

        {/* Scrollable Canvas */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 pb-24 pt-6 custom-scrollbar">
          {/* Page Header */}
          <div className="mb-12 flex justify-between items-end">
            <div>
              <h1 className="text-[3.5rem] font-extrabold tracking-tight leading-none text-on-surface mb-2">Tổng quan</h1>
              <p className="text-on-surface-variant text-lg">Chỉ số hệ thống và hiệu suất tổng thể.</p>
            </div>
            <div className="hidden md:flex gap-2">
              <span className="bg-surface-container-high px-4 py-2 rounded-full text-xs font-bold text-primary tracking-widest uppercase border border-outline-variant/15 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                Dữ liệu trực tiếp
              </span>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Metrics Row */}
            <div className="col-span-1 md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Metric Card 1 */}
              <div className="bg-surface-container-high/60 backdrop-blur-2xl border border-outline-variant/15 rounded-lg p-6 hover:bg-surface-container-highest transition-colors duration-300 shadow-[0_0_40px_rgba(255,255,255,0.06)] relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-500"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <p className="text-on-surface-variant text-sm font-medium mb-1">Tổng người dùng</p>
                    <h3 className="text-3xl font-bold text-on-surface tracking-tight">{metrics ? metrics.totalUsers : "-"}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center border border-outline-variant/15">
                    <span className="material-symbols-outlined text-xl">group</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary relative z-10">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span className="font-bold">+14.2%</span>
                  <span className="text-on-surface-variant ml-1">so với tháng trước</span>
                </div>
              </div>
              {/* Metric Card 2 */}
              <div className="bg-surface-container-high/60 backdrop-blur-2xl border border-outline-variant/15 rounded-lg p-6 hover:bg-surface-container-highest transition-colors duration-300 shadow-[0_0_40px_rgba(255,255,255,0.06)] relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary/10 rounded-full blur-xl group-hover:bg-tertiary/20 transition-all duration-500"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <p className="text-on-surface-variant text-sm font-medium mb-1">Gói Premium</p>
                    <h3 className="text-3xl font-bold text-on-surface tracking-tight">{metrics ? metrics.activeSubscriptions : "-"}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-container text-tertiary flex items-center justify-center border border-outline-variant/15">
                    <span className="material-symbols-outlined text-xl">workspace_premium</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary relative z-10">
                  <span className="font-bold"></span>
                  <span className="text-on-surface-variant ml-1">Trực tiếp</span>
                </div>
              </div>
              {/* Metric Card 3 */}
              <div className="bg-surface-container-high/60 backdrop-blur-2xl border border-outline-variant/15 rounded-lg p-6 hover:bg-surface-container-highest transition-colors duration-300 shadow-[0_0_40px_rgba(255,255,255,0.06)] relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-500"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <p className="text-on-surface-variant text-sm font-medium mb-1">Doanh thu tháng</p>
                    <h3 className="text-3xl font-bold text-on-surface tracking-tight">{metrics ? `$${(metrics.monthlyRevenue / 1000000).toFixed(1)}M` : "-"}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center border border-outline-variant/15">
                    <span className="material-symbols-outlined text-xl">payments</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary relative z-10">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span className="font-bold">+8.4%</span>
                  <span className="text-on-surface-variant ml-1">so với tháng trước</span>
                </div>
              </div>
              {/* Metric Card 4 */}
              <div className="bg-surface-container-high/60 backdrop-blur-2xl border border-outline-variant/15 rounded-lg p-6 hover:bg-surface-container-highest transition-colors duration-300 shadow-[0_0_40px_rgba(255,255,255,0.06)] relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary-fixed/10 rounded-full blur-xl group-hover:bg-secondary-fixed/20 transition-all duration-500"></div>
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div>
                    <p className="text-on-surface-variant text-sm font-medium mb-1">Tổng nghệ sĩ</p>
                    <h3 className="text-3xl font-bold text-on-surface tracking-tight">{metrics ? metrics.totalArtists : "-"}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface-container text-secondary-fixed flex items-center justify-center border border-outline-variant/15">
                    <span className="material-symbols-outlined text-xl">mic</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-primary relative z-10">
                  <span className="font-bold"></span>
                  <span className="text-on-surface-variant ml-1">Trực tiếp</span>
                </div>
              </div>
            </div>

            {/* Main Chart Area */}
            <div className="col-span-1 md:col-span-8 bg-surface-container-high/60 backdrop-blur-2xl border border-outline-variant/15 rounded-lg p-8 shadow-[0_0_40px_rgba(255,255,255,0.06)] flex flex-col min-h-[400px]">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-on-surface">Phân tích tăng trưởng</h2>
                  <p className="text-on-surface-variant text-sm mt-1">Người dùng hoạt động trong 30 ngày qua</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 rounded-full bg-surface-container-highest text-on-surface text-xs font-bold hover:bg-surface-bright transition-colors">Người dùng</button>
                  <button className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant text-xs font-bold hover:text-on-surface transition-colors">Doanh thu</button>
                </div>
              </div>
              {/* Faux Chart Representation */}
              <div className="flex-1 relative w-full h-full mt-4 flex items-end border-b border-l border-outline-variant/20 pb-4 pl-4">
                <div className="absolute left-[-30px] top-0 bottom-0 flex flex-col justify-between text-[10px] text-on-surface-variant py-4">
                  <span>15M</span>
                  <span>10M</span>
                  <span>5M</span>
                  <span>0</span>
                </div>
                <div className="w-full h-full relative overflow-hidden">
                  <svg className="w-full h-full absolute top-0 left-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="chartGlow" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#4ffe7e" stopOpacity="0.3"></stop>
                        <stop offset="100%" stopColor="#4ffe7e" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                    <path d="M0,80 Q20,70 40,50 T80,30 T100,10 L100,100 L0,100 Z" fill="url(#chartGlow)"></path>
                    <path d="M0,80 Q20,70 40,50 T80,30 T100,10" fill="none" stroke="#4ffe7e" strokeLinecap="round" strokeWidth="2"></path>
                  </svg>
                  {/* Data points */}
                  <div className="absolute w-3 h-3 bg-primary rounded-full border-2 border-surface shadow-[0_0_10px_#4ffe7e] left-[40%] top-[48%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-surface-container-highest px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none border border-outline-variant/15">
                      Trước đó
                    </div>
                  </div>
                  <div className="absolute w-3 h-3 bg-primary rounded-full border-2 border-surface shadow-[0_0_10px_#4ffe7e] right-0 top-[9%] -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
                    <div className="absolute bottom-full right-0 mb-2 bg-surface-container-highest px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none border border-outline-variant/15">
                      Hiện tại
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Panel Area */}
            <div className="col-span-1 md:col-span-4 flex flex-col gap-8">
              {/* Recent Activity */}
              <div className="bg-surface-container-high/60 backdrop-blur-2xl border border-outline-variant/15 rounded-lg p-6 flex-1 shadow-[0_0_40px_rgba(255,255,255,0.06)]">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-on-surface">Hoạt động hệ thống</h2>
                  <button className="text-primary text-sm hover:underline">Xem tất cả</button>
                </div>
                <div className="space-y-6">
                  <div className="text-sm text-on-surface-variant p-4 text-center">
                    Không có hoạt động gần đây.
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Now Table */}
            <div className="col-span-1 md:col-span-12 bg-surface-container-high/60 backdrop-blur-2xl border border-outline-variant/15 rounded-lg p-8 mt-4 shadow-[0_0_40px_rgba(255,255,255,0.06)]">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-on-surface">Xu hướng hiện tại</h2>
                  <p className="text-on-surface-variant text-sm mt-1">Những nội dung nổi bật toàn cầu</p>
                </div>
                <button className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-highest transition-colors flex items-center justify-center border border-outline-variant/15">
                  <span className="material-symbols-outlined text-on-surface">more_vert</span>
                </button>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-on-surface-variant text-xs uppercase tracking-wider border-b border-outline-variant/20">
                      <th className="pb-4 font-medium pl-2 w-12">#</th>
                      <th className="pb-4 font-medium">Bài hát / Nghệ sĩ</th>
                      <th className="pb-4 font-medium">Lượt nghe (24h)</th>
                      <th className="pb-4 font-medium">Doanh thu Ước</th>
                      <th className="pb-4 font-medium text-right pr-4">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-outline-variant/10">
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-on-surface-variant">
                        Không có dữ liệu xu hướng.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-center">
                <button className="px-6 py-2 rounded-full border border-outline-variant/30 text-on-surface hover:bg-surface-container-highest transition-colors text-sm font-bold">Tải thêm</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
