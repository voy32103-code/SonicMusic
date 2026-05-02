"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { adminService, AdminRevenueDto } from "@/services/adminService";

export default function AdminRevenuePage() {
  const router = useRouter();
  const [revenue, setRevenue] = useState<AdminRevenueDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const data = await adminService.getRevenue();
        setRevenue(data);
      } catch (error) {
        console.error("Failed to fetch revenue:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen overflow-x-hidden flex font-body antialiased">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-panel {
            background: rgba(32, 32, 31, 0.4);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        }
        .ghost-border { border: 1px solid rgba(72, 72, 71, 0.15); }
        .neon-gradient {
            background: linear-gradient(135deg, #4ffe7e 0%, #07d85e 100%);
        }
        .neon-glow {
            box-shadow: 0 0 40px rgba(79, 254, 126, 0.1);
        }
        .text-gradient {
            background: linear-gradient(135deg, #ffffff 0%, #adaaaa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(72, 72, 71, 0.5);
            border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(79, 254, 126, 0.5);
        }
      ` }} />

      {/* SideNavBar (Shared Component) */}
      <nav className="hidden md:flex flex-col h-screen w-72 fixed left-0 top-0 bg-[#131313] p-8 gap-y-6 z-50 border-r border-outline-variant/10">
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
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] bg-transparent hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin/content">
            <span className="material-symbols-outlined text-xl transition-colors duration-300">library_music</span>
            <span>Nội dung</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#4ffe7e] font-bold bg-transparent bg-surface-container-high/50 group opacity-80 scale-[0.98] relative" href="/admin/revenue">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-primary shadow-[0_0_10px_rgba(79,254,126,0.5)]"></div>
            <span className="material-symbols-outlined text-xl transition-colors duration-300 [&]:[font-variation-settings:'FILL'_1]">payments</span>
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
      <main className="flex-1 md:ml-72 flex flex-col min-h-screen relative">
        {/* Ambient Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-tertiary/5 blur-[100px]"></div>
        </div>

        {/* TopAppBar */}
        <header className="flex justify-between items-center w-full px-8 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl docked full-width top-0 z-40 sticky font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight transition-colors">
          <div className="flex items-center gap-4">
            <div className="md:hidden text-2xl font-black tracking-tighter text-[#4ffe7e]">Sonic Admin</div>
            <div className="hidden md:block text-xl font-bold tracking-tight text-white">Vận hành doanh thu</div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
              <input className="bg-surface-container-high text-on-surface rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-1 focus:ring-primary ghost-border text-sm placeholder:text-on-surface-variant transition-all" placeholder="Tìm giao dịch..." type="text"/>
            </div>
            <button className="text-[#adaaaa] hover:text-white transition-colors duration-300 scale-95 active:scale-90 relative">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            </button>
            <button className="text-[#adaaaa] hover:text-white transition-colors duration-300 scale-95 active:scale-90">
              <span className="material-symbols-outlined text-xl">settings</span>
            </button>
            <img alt="Admin profile" className="w-9 h-9 rounded-full object-cover ghost-border cursor-pointer scale-95 active:scale-90 transition-transform" data-alt="close up portrait of a male professional in soft studio lighting against a dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHs5phEOeiZ3tnxexJPFSf3_xGVOWXKQ0YbKU6A1cUKY1_NoTTRnG6ln9rGiTSlwdcv7_QamjGF0VTpIceYpgIIw2lImvC2hyd-OvWxrBTL6Gfk3IKZ-XCXH38a-Nk2Frcd2UwRU2qCXT6T1V62-tgBm0yn9bk6ahm36Z9bbdeb1ht_2Mt38EsI4UGiyfXqlb4Qgp5CUtX6NIIrnQ9Gcb116dbAvVcUGIof5w6rgWBAqrmbsNuF8PVq5ADFanwlrFXK-hKSBajo5Vt"/>
          </div>
        </header>

        {/* Canvas */}
        <div className="flex-1 p-8 z-10 relative">
          {/* Hero Title Area */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-[3.5rem] leading-none font-extrabold tracking-[-0.02em] mb-2 text-gradient">Nhịp tài chính</h2>
              <p className="text-on-surface-variant text-base flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                Theo dõi trực tiếp cho tháng 10/2023
              </p>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 rounded-full bg-surface-container-high text-on-surface font-semibold text-sm ghost-border hover:bg-surface-container-highest transition-colors flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">calendar_today</span>
                Tháng này
              </button>
              <button className="px-5 py-2.5 rounded-full neon-gradient text-on-primary font-bold text-sm hover:scale-[1.02] transition-transform neon-glow flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">download</span>
                Xuất báo cáo
              </button>
            </div>
          </div>

          {/* Core Metrics Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* MRR */}
            <div className="bg-surface-container-high rounded-lg p-6 ghost-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[6rem]">trending_up</span>
              </div>
              <div className="relative z-10">
                <p className="text-on-surface-variant text-sm font-medium mb-1">Doanh thu định kỳ hàng tháng</p>
                <h3 className="text-4xl font-bold tracking-tight mb-4">
                  {isLoading ? "..." : `$${revenue?.monthlyRecurringRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex items-center text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-sm mr-1">arrow_upward</span>
                    12.4%
                  </span>
                  <span className="text-on-surface-variant">so với tháng trước</span>
                </div>
              </div>
            </div>
            {/* Gross Rev */}
            <div className="bg-surface-container-high rounded-lg p-6 ghost-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[6rem]">account_balance_wallet</span>
              </div>
              <div className="relative z-10">
                <p className="text-on-surface-variant text-sm font-medium mb-1">Tổng doanh thu (Năm)</p>
                <h3 className="text-4xl font-bold tracking-tight mb-4">
                  {isLoading ? "..." : `$${revenue?.grossRevenueYTD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex items-center text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-sm mr-1">arrow_upward</span>
                    8.1%
                  </span>
                  <span className="text-on-surface-variant">so với mục tiêu</span>
                </div>
              </div>
            </div>
            {/* Net Profit */}
            <div className="bg-surface-container-high rounded-lg p-6 ghost-border relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-[6rem]">savings</span>
              </div>
              <div className="relative z-10">
                <p className="text-on-surface-variant text-sm font-medium mb-1">Biên lợi nhuận ròng</p>
                <h3 className="text-4xl font-bold tracking-tight mb-4">
                  {isLoading ? "..." : `${revenue?.netProfitMargin.toFixed(1)}%`}
                </h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="flex items-center text-error bg-error/10 px-2 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-sm mr-1">arrow_downward</span>
                    1.2%
                  </span>
                  <span className="text-on-surface-variant">do tỷ lệ chi trả cao hơn</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Split Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Charts & Breakdown (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Revenue Trend Chart Area */}
              <div className="bg-surface-container-high rounded-lg p-8 ghost-border relative overflow-hidden">
                <div className="flex justify-between items-center mb-8 relative z-10">
                  <h3 className="text-xl font-bold text-on-surface">Quỹ đạo doanh thu</h3>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-semibold hover:text-white transition-colors">W</button>
                    <button className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold ring-1 ring-primary/50">M</button>
                    <button className="px-3 py-1 rounded-full bg-surface-container-highest text-on-surface-variant text-xs font-semibold hover:text-white transition-colors">Y</button>
                  </div>
                </div>
                {/* Abstract Chart Representation */}
                <div className="h-64 w-full relative flex items-end gap-2 z-10">
                  {/* Background Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between border-b border-surface-container-highest border-opacity-50 pb-6">
                    <div className="w-full border-t border-surface-container-highest border-opacity-30"></div>
                    <div className="w-full border-t border-surface-container-highest border-opacity-30"></div>
                    <div className="w-full border-t border-surface-container-highest border-opacity-30"></div>
                    <div className="w-full border-t border-surface-container-highest border-opacity-30"></div>
                  </div>
                  {/* Bars */}
                  <div className="flex-1 bg-surface-container-highest rounded-t-sm h-[0%] hover:bg-surface-container-lowest transition-colors relative group"><div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-surface-container-lowest py-1 px-2 rounded">$0</div></div>
                  <div className="flex-1 bg-surface-container-highest rounded-t-sm h-[0%] hover:bg-surface-container-lowest transition-colors"></div>
                  <div className="flex-1 bg-surface-container-highest rounded-t-sm h-[0%] hover:bg-surface-container-lowest transition-colors"></div>
                  <div className="flex-1 bg-surface-container-highest rounded-t-sm h-[0%] hover:bg-surface-container-lowest transition-colors"></div>
                  <div className="flex-1 bg-surface-container-highest rounded-t-sm h-[0%] hover:bg-surface-container-lowest transition-colors"></div>
                  <div className="flex-1 bg-surface-container-highest rounded-t-sm h-[0%] hover:bg-surface-container-lowest transition-colors"></div>
                  <div className="flex-1 bg-surface-container-highest rounded-t-sm h-[0%] neon-glow relative group">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs bg-surface-container-lowest py-1 px-2 rounded font-bold border border-primary/30 opacity-0">$0</div>
                  </div>
                  {/* X Axis Labels */}
                  <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-on-surface-variant font-medium mt-2">
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span className="text-primary">Oct</span>
                  </div>
                </div>
              </div>

              {/* Subscription Breakdown Bento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Breakdown Stats */}
                <div className="bg-surface-container-high rounded-lg p-8 ghost-border">
                  <h3 className="text-lg font-bold mb-6 text-on-surface">Phân bổ gói</h3>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-on-surface font-medium">Cá nhân</span>
                        <span className="text-primary font-bold">{revenue?.planDistribution?.individualPercentage.toFixed(0) || 0}%</span>
                      </div>
                      {/* eslint-disable-next-line */}
                      <div className="w-full bg-surface-container-highest rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${revenue?.planDistribution?.individualPercentage || 0}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-on-surface font-medium">Duo</span>
                        <span className="text-secondary font-bold">{revenue?.planDistribution?.duoPercentage.toFixed(0) || 0}%</span>
                      </div>
                      {/* eslint-disable-next-line */}
                      <div className="w-full bg-surface-container-highest rounded-full h-2">
                        <div className="bg-secondary h-2 rounded-full" style={{ width: `${revenue?.planDistribution?.duoPercentage || 0}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-on-surface font-medium">Gia đình</span>
                        <span className="text-tertiary font-bold">{revenue?.planDistribution?.familyPercentage.toFixed(0) || 0}%</span>
                      </div>
                      {/* eslint-disable-next-line */}
                      <div className="w-full bg-surface-container-highest rounded-full h-2">
                        <div className="bg-tertiary h-2 rounded-full" style={{ width: `${revenue?.planDistribution?.familyPercentage || 0}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mini Promo/Highlight Card */}
                <div className="rounded-lg p-8 relative overflow-hidden group">
                  {/* Background Image with Gradient Overlay */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="abstract visualization of sound waves in dark green and black neon colors"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/80 to-transparent"></div>
                  <div className="relative z-10 h-full flex flex-col justify-end">
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold backdrop-blur-md border border-primary/30 self-start mb-4">Thông tin</span>
                    <h4 className="text-xl font-bold mb-2 text-white leading-tight">Gói Gia đình đóng góp 40% tăng trưởng MRR mới</h4>
                    <a className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all" href="#">
                      Xem báo cáo chi tiết <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Artist Payouts (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="bg-surface-container-low rounded-lg p-6 h-full flex flex-col relative overflow-hidden border border-outline-variant/10">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">account_balance</span>
                    Hàng đợi thanh toán
                  </h3>
                  <button className="text-on-surface-variant hover:text-white transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
                {/* Pending Total */}
                <div className="mb-8 bg-surface-container-highest p-4 rounded-xl border border-outline-variant/20">
                  <p className="text-on-surface-variant text-xs font-medium uppercase tracking-wider mb-1">Chờ thanh toán</p>
                  <h4 className="text-2xl font-bold text-on-surface flex items-center gap-2">
                    $0.00
                  </h4>
                  <div className="mt-4 flex gap-2">
                    <button className="flex-1 py-2 rounded-full bg-surface-container-high text-white text-xs font-semibold hover:bg-surface-container-highest transition-colors border border-outline-variant/30">Xem xét</button>
                    <button className="flex-1 py-2 rounded-full bg-on-surface text-surface text-xs font-bold hover:bg-surface-variant transition-colors">Xử lý tất cả</button>
                  </div>
                </div>

                {/* Transaction List */}
                <h5 className="text-sm font-semibold text-on-surface-variant mb-4">Giao dịch gần đây</h5>
                <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {isLoading ? (
                    <div className="p-4 text-center text-sm text-on-surface-variant">Đang tải giao dịch...</div>
                  ) : revenue?.recentTransactions && revenue.recentTransactions.length > 0 ? (
                    revenue.recentTransactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-highest transition-colors cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant overflow-hidden">
                            {tx.type === "ArtistPayout" ? (
                              <span className="material-symbols-outlined">library_music</span>
                            ) : (
                              <span className="material-symbols-outlined">person</span>
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-white group-hover:text-primary transition-colors">{tx.entityName || "Không rõ"}</p>
                            <p className="text-xs text-on-surface-variant">{tx.description} • {new Date(tx.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-bold ${tx.amount < 0 ? 'text-white' : 'text-primary'}`}>
                            {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </p>
                          {tx.status === "Cleared" || tx.status === "Completed" ? (
                            <p className="text-[10px] text-primary flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[12px]">check_circle</span> {tx.status}</p>
                          ) : tx.status === "Failed" ? (
                            <p className="text-[10px] text-error flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[12px]">error</span> {tx.status}</p>
                          ) : (
                            <p className="text-[10px] text-on-surface-variant flex items-center justify-end gap-1"><span className="material-symbols-outlined text-[12px]">pending</span> {tx.status}</p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-on-surface-variant">Không có giao dịch gần đây.</div>
                  )}
                </div>
                <div className="pt-4 mt-auto border-t border-outline-variant/10 text-center">
                  <a className="text-sm text-on-surface-variant hover:text-white font-medium transition-colors" href="#">Xem tất cả thanh toán</a>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Spacer for visual breathing room */}
          <div className="h-16 w-full"></div>
        </div>
      </main>
    </div>
  );
}
