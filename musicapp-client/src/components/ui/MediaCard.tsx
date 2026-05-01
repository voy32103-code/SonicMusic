"use client";

import Link from "next/link";
import React from "react";

interface MediaCardProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  href?: string;
  onClickPlay?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export default function MediaCard({
  title,
  subtitle,
  imageUrl,
  href,
  onClickPlay,
  className = "",
}: MediaCardProps) {
  const fallbackImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuBQggUVduqSc8ZOoTmulhDh4qM68AED0hPmVyPqauQtdfI5wkJNWvdCOE6ItZBT_n3T9xpSDnuSBapnOuTmtkzEHK4_yZ6BpnZL1D7cW7xe4EyfpAmHMOWzme3EwcRsc2UJu_IvjODpH68zidpukhs5S7ctx_e53-lrvkzHMeWBasWutnQ0lijH7VwqHvQUj_P_QGyyh-Mwfov_z4VwwnfYA9N_gGkGIbAZa9e7GM4xf3K__eGlhRSyJ1VLhgykxRqVcDOgSAJ-oBbs";

  const CardContent = (
    <div className={`bg-surface-container-low hover:bg-surface-container-high transition-colors duration-300 p-4 rounded-xl group cursor-pointer relative shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col h-full ${className}`}>
      <div className="relative w-full aspect-square rounded-lg overflow-hidden mb-4 shadow-lg flex-shrink-0">
        <img 
          alt={title} 
          className="w-full h-full object-cover" 
          src={imageUrl || fallbackImage}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button 
          onClick={onClickPlay}
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full play-button-gradient flex items-center justify-center text-on-primary shadow-[0_4px_20px_rgba(79,254,126,0.4)] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out z-10 hover:scale-105"
        >
          <span className="material-symbols-outlined material-symbols-filled text-2xl">play_arrow</span>
        </button>
      </div>
      <h4 className="font-bold text-on-surface text-base truncate">{title}</h4>
      {subtitle && <p className="text-sm text-on-surface-variant truncate mt-1">{subtitle}</p>}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
