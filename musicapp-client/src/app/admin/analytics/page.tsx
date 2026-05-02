"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminAnalyticsPage() {
  const router = useRouter();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex selection:bg-primary-container selection:text-on-primary-container font-body">
      <style dangerouslySetInnerHTML={{ __html: `
        .glass-gradient { background: linear-gradient(135deg, rgba(79, 254, 126, 0.1) 0%, rgba(7, 216, 94, 0.05) 100%); }
        .ambient-shadow { box-shadow: 0 0 40px 0 rgba(255, 255, 255, 0.06); }
        .ghost-border { border: 1px solid rgba(72, 72, 71, 0.15); }
      ` }} />

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
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] bg-transparent hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin/revenue">
            <span className="material-symbols-outlined text-xl transition-colors duration-300">payments</span>
            <span>Doanh thu</span>
          </Link>
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#4ffe7e] font-bold bg-transparent bg-surface-container-high/50 group opacity-80 scale-[0.98] relative" href="/admin/analytics">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-primary shadow-[0_0_10px_rgba(79,254,126,0.5)]"></div>
            <span className="material-symbols-outlined text-xl transition-colors duration-300 [&]:[font-variation-settings:'FILL'_1]">insights</span>
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
        {/* TopAppBar (Mobile & Web) */}
        <header className="flex justify-between items-center w-full px-8 py-4 bg-[#0e0e0e]/80 backdrop-blur-xl docked full-width top-0 z-40 sticky transition-colors font-['Plus_Jakarta_Sans'] font-medium text-sm tracking-tight">
          <div className="flex items-center gap-4 md:hidden">
            <span className="text-2xl font-black tracking-tighter text-[#4ffe7e]">Sonic Admin</span>
          </div>
          <div className="hidden md:flex items-center gap-4 w-1/3">
            {/* Search could go here based on "search_bar": "on_left" */}
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-on-surface md:hidden text-center absolute left-1/2 transform -translate-x-1/2">Phân tích</h2>
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

        <div className="p-6 md:p-10 lg:p-12 space-y-12">
          {/* Page Header */}
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-[3.5rem] leading-none font-bold tracking-tight text-on-surface mb-4">Phân tích sâu</h1>
            <p className="text-on-surface-variant text-lg max-w-2xl">Hành vi nghe nhạc, phân bố địa lý và chỉ số giữ chân trên nền tảng.</p>
          </div>

          {/* Key Metrics Bento */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-surface-container-high rounded-lg p-8 flex flex-col justify-between h-48 ghost-border ambient-shadow relative overflow-hidden group">
              <div className="absolute inset-0 glass-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex justify-between items-start relative z-10">
                <p className="text-on-surface-variant text-sm font-medium tracking-wide">Tổng lượt nghe</p>
                <span className="material-symbols-outlined text-primary text-xl">graphic_eq</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold text-on-surface tracking-tighter mb-1">0</h3>
                <p className="text-on-surface-variant text-sm flex items-center gap-1"><span className="material-symbols-outlined text-[1rem]">horizontal_rule</span> Không có dữ liệu</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-surface-container-high rounded-lg p-8 flex flex-col justify-between h-48 ghost-border ambient-shadow relative overflow-hidden group">
              <div className="absolute inset-0 glass-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex justify-between items-start relative z-10">
                <p className="text-on-surface-variant text-sm font-medium tracking-wide">Phiên TB</p>
                <span className="material-symbols-outlined text-primary text-xl">timer</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold text-on-surface tracking-tighter mb-1">0m</h3>
                <p className="text-on-surface-variant text-sm flex items-center gap-1"><span className="material-symbols-outlined text-[1rem]">horizontal_rule</span> Không có dữ liệu</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="bg-surface-container-high rounded-lg p-8 flex flex-col justify-between h-48 ghost-border ambient-shadow relative overflow-hidden group">
              <div className="absolute inset-0 glass-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex justify-between items-start relative z-10">
                <p className="text-on-surface-variant text-sm font-medium tracking-wide">Tỷ lệ hoàn thành</p>
                <span className="material-symbols-outlined text-primary text-xl">check_circle</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-4xl font-bold text-on-surface tracking-tighter mb-1">0%</h3>
                <p className="text-on-surface-variant text-sm flex items-center gap-1"><span className="material-symbols-outlined text-[1rem]">horizontal_rule</span> Không có dữ liệu</p>
              </div>
            </div>
          </section>

          {/* Complex Charts Area */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Large Chart (Geographic Heatmap Concept) */}
            <div className="lg:col-span-2 bg-surface-container-high rounded-lg p-8 ghost-border ambient-shadow relative min-h-[400px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-on-surface">Bản đồ phản hồi toàn cầu</h3>
                <button className="bg-surface-container-highest hover:bg-surface-variant px-4 py-2 rounded-full text-sm font-medium text-on-surface-variant transition-colors ghost-border">Lọc <span className="material-symbols-outlined text-[1rem] align-middle ml-1">filter_list</span></button>
              </div>
              {/* Abstract Map Representation */}
              <div className="flex-grow rounded-xl bg-surface relative overflow-hidden flex items-center justify-center border border-outline-variant/10">
                <img alt="World map data visualization" className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-screen" data-alt="abstract dark map visualization with glowing green dots indicating high density areas over a deep black background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoWRPePLgNcffbzb4dnXTea-f8DeDZRN-KyIdsluvZK91l5LKHhtKIrPYb_T6pl17ZnwfiuNkXLYGEXNs9gOnZfrQSMQ3zyeWO-m70rM85xs2k9vBrGD9Ei4zrs-vCrwtUtyiZCYThS80jCNIGk6mAl8vhNmWsU-w6zdr4LjuE-MnHg-ykJTjep8XZA1b_SLzvD5VTdK426-BhwpbupMNtdmvk3XOLD9xPSlJLe0ttP_ws7H2IRmd3tUTJf6vEAiuikANmkujeja9a" />
                {/* Simulated Heatmap points */}
                <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full blur-[8px] animate-pulse"></div>
                <div className="absolute top-1/3 left-1/2 w-8 h-8 bg-primary rounded-full blur-[12px] opacity-70"></div>
                <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-primary-container rounded-full blur-[10px] opacity-80"></div>
                <div className="absolute bottom-4 left-4 bg-surface-container-highest/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium text-on-surface ghost-border">
                  Người nghe trực tiếp: <span className="text-primary font-bold">0</span>
                </div>
              </div>
            </div>
            {/* Vertical Stack (Top Genres) */}
            <div className="bg-surface-container-high rounded-lg p-8 ghost-border ambient-shadow flex flex-col">
              <h3 className="text-xl font-bold text-on-surface mb-6">Phong cách thịnh hành</h3>
              <div className="space-y-6 flex-grow">
                {/* Genre Item */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-on-surface">Deep Ambient</span>
                    <span className="text-on-surface-variant">45%</span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                    <div className="bg-primary h-full rounded-full w-[45%]"></div>
                  </div>
                </div>
                {/* Genre Item */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-on-surface">Spatial Techno</span>
                    <span className="text-on-surface-variant">28%</span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                    <div className="bg-primary-container h-full rounded-full w-[28%]"></div>
                  </div>
                </div>
                {/* Genre Item */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-on-surface">Neo-Classical</span>
                    <span className="text-on-surface-variant">15%</span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                    <div className="bg-secondary-dim h-full rounded-full w-[15%]"></div>
                  </div>
                </div>
                {/* Genre Item */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-on-surface">Binaural Beats</span>
                    <span className="text-on-surface-variant">12%</span>
                  </div>
                  <div className="w-full bg-surface-container-highest rounded-full h-2 overflow-hidden">
                    <div className="bg-tertiary-dim h-full rounded-full w-[12%]"></div>
                  </div>
                </div>
              </div>
              <button className="mt-6 w-full py-3 rounded-full border border-outline-variant/15 text-sm font-medium hover:bg-surface-variant transition-colors flex justify-center items-center gap-2">
                Xem tất cả <span className="material-symbols-outlined text-[1rem]">arrow_forward</span>
              </button>
            </div>
          </section>

          {/* Cohort Retention Visual */}
          <section className="bg-surface-container-low rounded-lg p-8 relative overflow-hidden pt-12">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-container to-surface"></div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-on-surface mb-2">Giữ chân người dùng</h3>
                <p className="text-on-surface-variant text-sm">Tỷ lệ quay lại trong 8 tuần sau đăng ký.</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface text-sm font-medium ghost-border">Hàng tuần</button>
                <button className="px-4 py-2 rounded-full bg-transparent text-on-surface-variant hover:text-on-surface text-sm font-medium">Hàng tháng</button>
              </div>
            </div>
            {/* Abstract Cohort Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[700px] grid grid-cols-9 gap-1 text-xs text-center text-on-surface-variant mb-2">
                <div className="text-left pl-2">Cohort</div>
                <div>W1</div><div>W2</div><div>W3</div><div>W4</div><div>W5</div><div>W6</div><div>W7</div><div>W8</div>
              </div>
              <div className="min-w-[700px] space-y-1">
                <div className="text-sm text-on-surface-variant p-8 text-center border border-outline-variant/15 rounded-lg bg-surface-container-lowest mt-4">
                  Không có dữ liệu nhóm.
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
