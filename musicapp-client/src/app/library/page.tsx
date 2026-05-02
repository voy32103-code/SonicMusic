import { AlbumService } from "@/services/apiClient";
import { Album, Artist } from "@/types";
import MediaCard from "@/components/ui/MediaCard";

// Sử dụng ISR thay vì force-dynamic
export const revalidate = 60;

export default async function LibraryPage() {
  let albums: Album[] = [];
  const artists: Artist[] = [];

  try {
    albums = await AlbumService.getAllAlbums();
  } catch (error) {
    console.error("Error fetching library data:", error);
  }

  return (
    <>
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl md:text-[3.5rem] font-bold text-on-surface tracking-tight mb-8">Thư viện của bạn</h2>
        {/* Filters */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <button className="px-6 py-2 rounded-full bg-primary text-on-primary text-sm font-medium whitespace-nowrap transition-transform hover:scale-105 shadow-[0_4px_20px_rgba(79,254,126,0.15)]">
            Danh sách phát
          </button>
          <button className="px-6 py-2 rounded-full bg-surface-container-highest text-on-surface text-sm font-medium whitespace-nowrap transition-transform hover:scale-105 hover:bg-surface-bright">
            Nghệ sĩ
          </button>
          <button className="px-6 py-2 rounded-full bg-surface-container-highest text-on-surface text-sm font-medium whitespace-nowrap transition-transform hover:scale-105 hover:bg-surface-bright">
            Album
          </button>
        </div>
      </div>

      {/* Library Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Liked Songs Special Card (Bento spanning 2 cols) */}
        <div className="col-span-2 row-span-1 bg-surface-container-high rounded-lg overflow-hidden group cursor-pointer relative h-64 md:h-80 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
          <img 
            alt="Liked Songs Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOWrdPp6WbtymV3pvrzzct3MWFZ7OXVG-8aHAHZ0XRkMNuquuV5L1eKItK_nJ3EhWzhLRJ9cFli8gBuz38NS6ZSeQB3tdr4vhxk9Fhbc2xwawZXrohqcN3FYpbKxIgCwXCeqVCmeXR9zRYj8GFaWhbe6RGNo8QuC5Bva2hMh7KPFMdLESpSH0mMWzlAr5auPdlyfHGL8mfysCXkCvPRhTqgdPIoCp9XiWFBEeyQKXzKzt6ebp0-KbdgBlfSsonT9yDSjSEg7UgBmag"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/40 to-transparent"></div>
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="mb-4 bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(79,254,126,0.3)]">
              <span className="material-symbols-outlined material-symbols-filled">favorite</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Bài hát đã thích</h3>
            <p className="text-on-surface-variant text-sm font-medium">428 bài hát</p>
          </div>
        </div>

        {/* Dynamic Albums mapped as Library Cards */}
        {albums.map((album) => (
          <MediaCard
            key={album.id}
            title={album.title}
            subtitle={`Album • ${album.artistName}`}
            imageUrl={album.coverUrl}
            href={`/album/${album.id}`}
          />
        ))}

        {/* Dynamic Artists mapped as Library Cards */}
        {artists.map((artist) => (
          <MediaCard
            key={artist.id}
            title={artist.name}
            subtitle="Nghệ sĩ"
            imageUrl={artist.avatarUrl}
            href={`/artist/${artist.id}`}
            className="text-center"
          />
        ))}
        
        {/* Placeholder if lists are empty but we want some dummy content for visual structure */}
        {albums.length === 0 && artists.length === 0 && (
          <>
            <div className="bg-surface-container-high rounded-lg overflow-hidden group cursor-pointer h-64 md:h-80 flex flex-col">
              <div className="relative flex-1 overflow-hidden">
                <img 
                  alt="Midnight Drive" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQggUVduqSc8ZOoTmulhDh4qM68AED0hPmVyPqauQtdfI5wkJNWvdCOE6ItZBT_n3T9xpSDnuSBapnOuTmtkzEHK4_yZ6BpnZL1D7cW7xe4EyfpAmHMOWzme3EwcRsc2UJu_IvjODpH68zidpukhs5S7ctx_e53-lrvkzHMeWBasWutnQ0lijH7VwqHvQUj_P_QGyyh-Mwfov_z4VwwnfYA9N_gGkGIbAZa9e7GM4xf3K__eGlhRSyJ1VLhgykxRqVcDOgSAJ-oBbs"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high to-transparent opacity-80"></div>
              </div>
              <div className="p-5 relative bg-surface-container-high z-10 flex-shrink-0">
                <h3 className="text-lg font-bold text-on-surface truncate">Midnight Drive</h3>
                <p className="text-sm text-on-surface-variant mt-1">Danh sách phát • The Sonic Immersive</p>
              </div>
            </div>
            <div className="bg-surface-container-high rounded-lg overflow-hidden group cursor-pointer h-64 md:h-80 flex flex-col items-center justify-center p-6 text-center hover:bg-surface-container-highest transition-colors">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                <img 
                  alt="Echo Collective" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoAHuHOSWQ_2RvpvmA76hQ0mmOEX-CPkddKZjZkEVUYXWLAo9Ohdqzm7b7YnBJHjSurjU3uag4aOT2Q4Y2Puw8zTwhtyPxvQo2b5zmCh4Q9SMQ6Kwn-xjvISgSNpCkfkVnmg3ncS_SSxaSshA7FfqoJlQ7W1Cb3tMWTmkRx42bq7IIIjiUff1ViBc0EiSLqvSqDfm8rAVIoUwZHgaea1m8x3o2T4jihlyXafHD7cdkC0vqu2riltDJpRdIE7OcnZGowFUZeduxic5u"
                />
              </div>
              <h3 className="text-lg font-bold text-on-surface truncate w-full group-hover:text-primary transition-colors">Echo Collective</h3>
              <p className="text-sm text-on-surface-variant mt-1">Nghệ sĩ</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
