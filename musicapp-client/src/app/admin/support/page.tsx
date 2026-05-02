"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSupportPage() {
  const router = useRouter();
  
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };

  return (
    <div className="bg-surface text-on-surface flex h-screen overflow-hidden antialiased font-body selection:bg-primary selection:text-on-primary">
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
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] bg-transparent hover:text-[#4ffe7e] hover:translate-x-1 transition-all duration-300 font-semibold text-base group" href="/admin/analytics">
            <span className="material-symbols-outlined text-xl transition-colors duration-300">insights</span>
            <span>Phân tích</span>
          </Link>
        </div>
        
        {/* Footer Links */}
        <div className="flex flex-col gap-2 mt-auto">
          <Link className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#4ffe7e] font-bold bg-transparent bg-surface-container-high/50 group opacity-80 scale-[0.98] relative" href="/admin/support">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-primary shadow-[0_0_10px_rgba(79,254,126,0.5)]"></div>
            <span className="material-symbols-outlined text-xl transition-colors duration-300 [&]:[font-variation-settings:'FILL'_1]">help_outline</span>
            <span>Hỗ trợ</span>
          </Link>
          <a className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#adaaaa] bg-transparent hover:text-error hover:translate-x-1 transition-all duration-300 font-semibold text-base group cursor-pointer" onClick={handleLogout}>
            <span className="material-symbols-outlined text-xl transition-colors duration-300">logout</span>
            <span>Đăng xuất</span>
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="md:ml-72 flex-1 flex flex-col h-screen overflow-hidden relative bg-surface">
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
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-on-surface md:hidden text-center absolute left-1/2 transform -translate-x-1/2">Hỗ trợ</h2>
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 pb-32 md:pb-12">
          
          {/* Hero Section */}
          <section className="relative px-6 md:px-16 pt-12 md:pt-24 pb-16 overflow-hidden">
            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-full md:w-2/3 h-full bg-gradient-to-bl from-primary/5 to-transparent -z-10 pointer-events-none rounded-bl-full blur-3xl opacity-50"></div>
            <div className="max-w-4xl relative z-10">
              {/* Large asymmetric typography */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-on-surface leading-[1.1] mb-6">
                Chúng tôi có thể <br /> giúp gì cho bạn?
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl font-light mb-12">
                Tìm kiếm trong cơ sở kiến thức hoặc chọn danh mục bên dưới để giải quyết vấn đề của bạn.
              </p>
              {/* Search Input */}
              <div className="relative w-full max-w-2xl group">
                <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant text-2xl group-focus-within:text-primary transition-colors">search</span>
                <input className="w-full bg-surface-container-high border-0 border-b-2 border-outline-variant/15 text-on-surface text-lg py-5 pl-16 pr-6 rounded-t-lg focus:ring-0 focus:border-primary transition-all placeholder:text-on-surface-variant/50 shadow-[0_4px_40px_rgba(0,0,0,0.3)] focus:bg-surface-container-highest" placeholder="Tìm câu trả lời..." type="text" />
              </div>
            </div>
          </section>

          {/* FAQ Categories (Bento Grid) */}
          <section className="px-6 md:px-16 py-12 relative z-10">
            <h2 className="text-2xl font-bold text-on-surface mb-8 tracking-tight">Câu hỏi thường gặp</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <a className="group block bg-surface-container-high rounded-lg p-8 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(79,254,126,0.05)] hover:-translate-y-1 transition-all duration-300" href="#">
                <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-3xl text-primary">manage_accounts</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2">Tài khoản</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Quản lý hồ sơ, đặt lại mật khẩu và cài đặt bảo mật.</p>
                {/* Ghostly arrow */}
                <span className="material-symbols-outlined absolute bottom-8 right-8 text-outline-variant opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">arrow_forward</span>
              </a>
              {/* Card 2 */}
              <a className="group block bg-surface-container-high rounded-lg p-8 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(79,254,126,0.05)] hover:-translate-y-1 transition-all duration-300" href="#">
                <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-3xl text-primary">credit_card</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2">Thanh toán</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Cập nhật phương thức thanh toán, xem hóa đơn và gói đăng ký.</p>
                <span className="material-symbols-outlined absolute bottom-8 right-8 text-outline-variant opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">arrow_forward</span>
              </a>
              {/* Card 3 */}
              <a className="group block bg-surface-container-high rounded-lg p-8 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(79,254,126,0.05)] hover:-translate-y-1 transition-all duration-300" href="#">
                <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-3xl text-primary">graphic_eq</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2">Sự cố phát nhạc</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">Khắc phục lỗi âm thanh, đồng bộ ngoại tuyến và giới hạn thiết bị.</p>
                <span className="material-symbols-outlined absolute bottom-8 right-8 text-outline-variant opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">arrow_forward</span>
              </a>
            </div>
          </section>

          {/* Contact Form Section (Asymmetric Layout) */}
          <section className="px-6 md:px-16 py-16 mb-16 relative z-10">
            <div className="bg-surface-container-low rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {/* Left: Form */}
              <div className="w-full md:w-7/12 p-10 md:p-16">
                <h2 className="text-3xl font-bold text-on-surface mb-2">Vẫn cần hỗ trợ?</h2>
                <p className="text-on-surface-variant mb-10">Chuyên gia của chúng tôi sẵn sàng giúp bạn.</p>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-on-surface-variant mb-2 uppercase tracking-wider">Tên của bạn</label>
                      <input className="w-full bg-surface-container-highest border-0 border-b border-outline-variant/30 text-on-surface py-3 px-4 rounded-t-sm focus:ring-0 focus:border-primary transition-colors focus:bg-surface-bright/50" placeholder="Nguyễn Văn A" type="text" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-on-surface-variant mb-2 uppercase tracking-wider">Địa chỉ Email</label>
                      <input className="w-full bg-surface-container-highest border-0 border-b border-outline-variant/30 text-on-surface py-3 px-4 rounded-t-sm focus:ring-0 focus:border-primary transition-colors focus:bg-surface-bright/50" placeholder="email@example.com" type="email" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-on-surface-variant mb-2 uppercase tracking-wider">Loại vấn đề</label>
                    <select title="Loại vấn đề" className="w-full bg-surface-container-highest border-0 border-b border-outline-variant/30 text-on-surface py-3 px-4 rounded-t-sm focus:ring-0 focus:border-primary transition-colors appearance-none outline-none">
                      <option>Chọn danh mục...</option>
                      <option>Truy cập tài khoản</option>
                      <option>Thanh toán & Gói đăng ký</option>
                      <option>Kỹ thuật & Phát nhạc</option>
                      <option>Khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-on-surface-variant mb-2 uppercase tracking-wider">Tin nhắn</label>
                    <textarea className="w-full bg-surface-container-highest border-0 border-b border-outline-variant/30 text-on-surface py-3 px-4 rounded-t-sm focus:ring-0 focus:border-primary transition-colors resize-none focus:bg-surface-bright/50" placeholder="Mô tả vấn đề của bạn..." rows={4}></textarea>
                  </div>
                  <button className="inline-flex items-center gap-3 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold py-4 px-8 rounded-full hover:scale-[1.02] transition-transform duration-300 shadow-[0_10px_20px_rgba(79,254,126,0.15)] mt-4" type="submit">
                    Gửi yêu cầu
                    <span className="material-symbols-outlined text-lg">send</span>
                  </button>
                </form>
              </div>
              
              {/* Right: Immersive Imagery */}
              <div className="w-full md:w-5/12 relative min-h-[300px] md:min-h-full bg-surface-container-highest">
                <img alt="Studio Support" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" data-alt="close up of an analog audio mixing console in a dark studio setting with glowing green LED meters" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcu-tNsb7IGQ70elLWbGuHta493O7Hayywfzp0eWsIH4tX3ka0NshwFU-KX572VSZ13nKMApqhF0vKbyiF9xdesKT20cU4Y7435YuVH7f9Zusw0TvFloctAgyh8tT6DfluLkQsAlYoEr__cXdi8CSxvmC9TA8F-8_Ku26-QNftnuiTCzK4EsJkxxYKDHE2hGcCZMXSIfJsoEDT5cm_CxiqhCokiz9ZAbEpRpvUAMQEapf8rOlydd4Q1A5HpFiCHiWQS4nFOHhbIccO" />
                {/* Gradient overlay to blend image into container */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low via-transparent to-transparent md:block hidden"></div>
                {/* Floating abstract element */}
                <div className="absolute bottom-12 right-12 text-right">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background/50 backdrop-blur-md border border-outline-variant/15 mb-4">
                    <span className="material-symbols-outlined text-primary text-2xl">support_agent</span>
                  </div>
                  <p className="text-on-surface font-bold text-lg">Hoạt động 24/7</p>
                  <p className="text-on-surface-variant text-sm">Luôn trực tuyến.</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
