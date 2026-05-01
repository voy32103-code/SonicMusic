import Image from "next/image";
import Link from "next/link";
import { AlbumService } from "@/services/apiClient";
import { Album } from "@/types";
import MediaCard from "@/components/ui/MediaCard";

// Sử dụng ISR (Incremental Static Regeneration) thay vì force-dynamic
export const revalidate = 60;

export default async function Home() {
  // Lấy dữ liệu Album từ Backend .NET
  let albums: Album[] = [];
  try {
    albums = await AlbumService.getAllAlbums();
  } catch (error) {
    console.error("Lỗi khi tải Albums từ Backend:", error);
  }

  return (
    <>
      {/* Hero / Greetings */}
      <section className="mb-12">
        <h2 className="text-5xl font-headline font-black text-on-surface tracking-tighter mb-8 leading-none">Good Evening.</h2>
        
        {/* Made For You Grid - Asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large Featured Mix */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 relative rounded-xl overflow-hidden group bg-surface-container-high cursor-pointer h-[320px]">
            <img 
              alt="Discover Weekly" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOs6VfniFecD7oWU4apnZ5oMPdGSltRQTNMA1yRwBaJOCUMkcmMebRsfHJsmFGe7M0C-7rDCoECVaH8AAXOkaIZp3U06Uu8hBFaF_UWO-vI6grRBHl3MUq4Pw7Bg0Y5tbo6C-1MNJNZMeAQPf06_sV5UL8UBkijUSpqoLEDtlRlNsdEWSQ4EwxJJBC1byn0suZZViDDgxIQ_rQwhvtiIF1PGLQsVfwRknumSnxTVrBz0sw3k3DolAKa5-ik82Xkf2Rh9vi_dhz9Ti5"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end">
              <div>
                <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Made For You</p>
                <h3 className="text-3xl font-black text-on-surface leading-tight">Discover Weekly</h3>
                <p className="text-on-surface-variant mt-2 max-w-md line-clamp-2">New music, handpicked just for you based on your immersive listening habits.</p>
              </div>
              <button className="w-16 h-16 rounded-full play-button-gradient flex items-center justify-center text-on-primary shadow-[0_8px_30px_rgba(79,254,126,0.3)] opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                <span className="material-symbols-outlined material-symbols-filled text-3xl">play_arrow</span>
              </button>
            </div>
          </div>
          
          {/* Smaller Grid Items */}
          <div className="relative rounded-xl overflow-hidden group bg-surface-container-high cursor-pointer h-[150px] flex items-center">
            <div className="w-[150px] h-[150px] flex-shrink-0 relative">
              <img 
                alt="Daily Mix 1" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgiuNrYeHTh5pXB58MteOcol3xbewjd6O5CSmGxKso3wmoI_8oBVFlIbdr7pX5Q9eLFOkEdbyBj4mhltUol8K9Z32RTJaU8dLsH55BnrglJBWgsRgQqOFJq1Gqbb2orZOd74d9b8IhjA6aKTBYt-6v5O8hqX0rDnpmOgwsh4QUREr9MLE3IoGWXmKXKRv5x0vpBICrIxYXZN4AHlzRX0A2y6jq6yb0xZ-2G9u5ctSqddY6556iFWfJMWX0i5x4GE2nEcJKOESTy_y3"
              />
            </div>
            <div className="p-6 flex-1 bg-surface-container-high h-full flex flex-col justify-center relative">
              <h4 className="font-bold text-lg text-on-surface">Daily Mix 1</h4>
              <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full play-button-gradient flex items-center justify-center text-on-primary shadow-[0_4px_20px_rgba(79,254,126,0.3)] opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                <span className="material-symbols-outlined material-symbols-filled text-2xl">play_arrow</span>
              </button>
            </div>
          </div>
          
          <div className="relative rounded-xl overflow-hidden group bg-surface-container-high cursor-pointer h-[150px] flex items-center">
            <div className="w-[150px] h-[150px] flex-shrink-0 relative">
              <img 
                alt="Release Radar" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf025VSPUWc6KaKJhhSyS0xnsZldRfrgJsI7YsXHOCaxrSJBLVpYVNMDFwHNXFsShd8st05RzLeNjhJSaFvR_ub8u4gr6tdxHk81Yq0OKI3xWLAmmaGXb2IVnkeWOlZAtUjscxwYU8Om660ON8No-KIQV5chAw-ooKZeko9Hp52DGYFKbg7eKmvNeqfYbk_pVEG4JLOokS1o9GXf623E8ZLShoRIFqXuHFZCNDoKkPjVfHXnPepuKKq2XdD58pfPsEM1xa6dIPxIKO"
              />
            </div>
            <div className="p-6 flex-1 bg-surface-container-high h-full flex flex-col justify-center relative">
              <h4 className="font-bold text-lg text-on-surface">Release Radar</h4>
              <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full play-button-gradient flex items-center justify-center text-on-primary shadow-[0_4px_20px_rgba(79,254,126,0.3)] opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                <span className="material-symbols-outlined material-symbols-filled text-2xl">play_arrow</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Played / Albums - Square Cards */}
      <section className="mb-16">
        <div className="flex justify-between items-end mb-8">
          <h3 className="text-3xl font-bold text-on-surface tracking-tight">Recently Played</h3>
          <Link href="/library" className="text-on-surface-variant hover:text-primary transition-colors font-bold text-sm tracking-wide uppercase">
            Show All
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {albums.map((album: Album) => (
            <MediaCard
              key={album.id}
              title={album.title}
              subtitle={album.artistName}
              imageUrl={album.coverUrl}
              href={`/album/${album.id}`}
            />
          ))}
        </div>
        
        {albums.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
            <span className="material-symbols-outlined text-4xl text-white/20 mb-4 font-light italic">album</span>
            <p className="text-white/40 text-sm italic font-medium">No albums found. Connect your sonic database.</p>
          </div>
        )}
      </section>
    </>
  );
}
