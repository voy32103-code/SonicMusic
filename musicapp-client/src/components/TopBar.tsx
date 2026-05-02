"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserInfo {
  username: string;
  role: string;
}

function getUserFromToken(): UserInfo | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(atob(base64));
    const username =
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"] ||
      payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] ||
      payload.name ||
      payload.email ||
      "";
    const role =
      payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ||
      payload.role ||
      "User";
    return { username, role };
  } catch {
    return null;
  }
}

export default function TopBar() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setUser(null);
    router.push("/login");
  };

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
            placeholder="Tìm kiếm bài hát, nghệ sĩ hoặc album..." 
            type="text" 
          />
        </form>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 rounded-full border border-white/10 text-white/80 hover:text-white hover:border-white/20 transition-all text-[11px] font-bold uppercase tracking-widest bg-white/5">
          Hỗ trợ
        </button>
        <div className="w-[1px] h-6 bg-white/10 mx-2"></div>

        {user ? (
          /* Logged-in state */
          <div className="flex items-center gap-3 relative group">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <span className="text-primary font-bold text-sm">
                  {user.username.substring(0, 1).toUpperCase()}
                </span>
              </div>
              <span className="text-white text-sm font-semibold">
                Xin chào, <span className="text-primary">{user.username}</span>
              </span>
              <span className="material-symbols-outlined text-white/50 text-sm">expand_more</span>
            </div>

            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-56 bg-surface-container-high border border-outline-variant/20 rounded-xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {user.role === "Admin" && (
                <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-primary hover:bg-white/5 transition-colors">
                  <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
                  Bảng điều khiển
                </Link>
              )}
              <Link href="/library" className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-primary hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-lg">library_music</span>
                Thư viện của tôi
              </Link>
              <div className="h-[1px] bg-outline-variant/15 my-1 mx-3"></div>
              <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-error hover:bg-error/5 transition-colors w-full text-left">
                <span className="material-symbols-outlined text-lg">logout</span>
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          /* Logged-out state */
          <div className="flex items-center gap-2">
            <Link href="/login" className="px-6 py-2 rounded-full bg-white text-black hover:scale-105 transition-transform text-[13px] font-bold tracking-wide shadow-lg">
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
