"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/services/apiClient";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Đăng ký thất bại");
      }

      const { token } = await response.json();
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/; max-age=86400`;

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Đã xảy ra lỗi");
    }
  };

  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex items-center justify-center relative overflow-hidden antialiased">
      {/* Ambient Background Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Vibrant abstract background" 
          className="w-full h-full object-cover opacity-40 mix-blend-screen" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_Y2G5khVR6pTCk85gbkSUrY8Rm5UVN1dcc5CXrXh4PE2nqo-k2pqPHpHA3R0qjcFko6Zs_iZQUka7J7eRtL4dm89VHJJx3Cm0b22tmboeuZEKQJCyUHL8nIw5MRMVgrx2Zhp6eNfhT4XoxOqFogG-GHEMMXo7_NaHpUreoyt8Z0NecLRedz8qrK0BcosH9PAoPEJDEvauKmZt9a89H0bYq8826JUjFp5EiE9MC6PxFerPhFmiNK1gAho2oRk18afN-oFwgIyylz4_"
        />
        {/* Radial gradient to center focus on the form and obscure edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0e0e0e_80%)]"></div>
      </div>
      {/* Main Content Canvas / Glass Panel */}
      <main className="relative z-10 w-full max-w-[480px] px-6 py-12 md:py-0">
        {/* Registration Card Container */}
        <div className="bg-surface-container-high/60 backdrop-blur-3xl rounded-lg p-10 flex flex-col gap-10 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Subtle accent light inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
          {/* Header Section */}
          <div className="flex flex-col gap-3">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">The Sonic Immersive</span>
            <h1 className="font-headline text-4xl md:text-[2.5rem] leading-tight font-extrabold text-on-surface tracking-tight">
              Tham gia sân khấu.
            </h1>
            <p className="text-on-surface-variant text-sm max-w-[80%]">
              Tạo hồ sơ để truy cập những bản nhạc chất lượng cao.
            </p>
          </div>
          {/* Registration Form */}
          <form className="flex flex-col gap-6 w-full" onSubmit={handleSignUp}>
            {error && <div className="text-red-400 bg-red-900/20 p-3 rounded-lg text-sm">{error}</div>}
            {/* Input Group: Username */}
            <div className="flex flex-col gap-2 relative group">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider pl-1" htmlFor="username">Tên người dùng</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">person</span>
                <input 
                  className="w-full bg-surface-container-highest pt-4 pb-3 pl-12 pr-4 rounded-t-md border-b-2 border-outline-variant/15 focus:border-primary focus:outline-none text-on-surface placeholder:text-on-surface-variant/40 transition-colors" 
                  id="username" 
                  name="username" 
                  placeholder="Chọn tên hiển thị" 
                  required 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            {/* Input Group: Email */}
            <div className="flex flex-col gap-2 relative group">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider pl-1" htmlFor="email">Địa chỉ Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">mail</span>
                <input 
                  className="w-full bg-surface-container-highest pt-4 pb-3 pl-12 pr-4 rounded-t-md border-b-2 border-outline-variant/15 focus:border-primary focus:outline-none text-on-surface placeholder:text-on-surface-variant/40 transition-colors" 
                  id="email" 
                  name="email" 
                  placeholder="name@example.com" 
                  required 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {/* Input Group: Password */}
            <div className="flex flex-col gap-2 relative group">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider pl-1" htmlFor="password">Mật khẩu</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
                <input 
                  className="w-full bg-surface-container-highest pt-4 pb-3 pl-12 pr-4 rounded-t-md border-b-2 border-outline-variant/15 focus:border-primary focus:outline-none text-on-surface placeholder:text-on-surface-variant/40 transition-colors" 
                  id="password" 
                  name="password" 
                  placeholder="Tối thiểu 8 ký tự" 
                  required 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {/* Submit Action */}
            <div className="mt-4 flex flex-col gap-6">
              <button className="w-full py-4 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold text-base tracking-wide hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(79,254,126,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group" type="submit">
                Đăng ký
                <span className="material-symbols-outlined material-symbols-bold text-on-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
              {/* Secondary Navigation */}
              <p className="text-center text-sm text-on-surface-variant">
                Đã có tài khoản?{" "}
                <Link className="text-on-surface font-medium hover:text-primary transition-colors underline decoration-outline-variant/30 underline-offset-4 hover:decoration-primary" href="/login">Đăng nhập</Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
