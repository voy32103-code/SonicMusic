"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import BottomPlayer from "./BottomPlayer";

export default function MainLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Define which paths should hide the main navigation and player
  const isStandalonePage = pathname?.startsWith("/login") || pathname?.startsWith("/signup") || pathname?.startsWith("/admin") || pathname?.startsWith("/now-playing");

  if (isStandalonePage) {
    return (
      <main className="w-full min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      <Sidebar />
      <TopBar />
      <main className="md:ml-64 pt-24 pb-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <BottomPlayer />
    </>
  );
}
