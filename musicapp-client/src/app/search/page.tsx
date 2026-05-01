import Image from "next/image";
import Link from "next/link";
import { SongService } from "@/services/apiClient";
import { Song } from "@/types";
import TrackRow from "@/components/ui/TrackRow";

// Sử dụng ISR thay vì force-dynamic
export const revalidate = 60;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  let songs: Song[] = [];

  if (query) {
    try {
      songs = await SongService.searchSongs(query);
    } catch (error) {
      console.error("Search error:", error);
    }
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-4xl md:text-[3.5rem] font-bold text-on-surface tracking-tight mb-4">
          {query ? `Search results for "${query}"` : "Browse all"}
        </h2>
      </div>

      {query && songs.length === 0 ? (
        <div className="text-on-surface-variant py-8">
          No tracks found for "{query}". Try a different keyword.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {songs.map((song, index) => (
            <TrackRow 
              key={song.id} 
              song={song} 
              index={index} 
              onPlay={(s) => console.log("Play song", s.title)} 
            />
          ))}
          
          {!query && (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-8">
               <div className="bg-surface-container-high rounded-lg overflow-hidden group cursor-pointer h-32 md:h-40 flex items-end p-4 relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary-container/10"></div>
                 <h3 className="text-xl font-bold text-on-surface truncate relative z-10">Pop</h3>
               </div>
               <div className="bg-surface-container-high rounded-lg overflow-hidden group cursor-pointer h-32 md:h-40 flex items-end p-4 relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-tertiary/30 to-tertiary-container/10"></div>
                 <h3 className="text-xl font-bold text-on-surface truncate relative z-10">Electronic</h3>
               </div>
               <div className="bg-surface-container-high rounded-lg overflow-hidden group cursor-pointer h-32 md:h-40 flex items-end p-4 relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-secondary-container/10"></div>
                 <h3 className="text-xl font-bold text-on-surface truncate relative z-10">Hip Hop</h3>
               </div>
               <div className="bg-surface-container-high rounded-lg overflow-hidden group cursor-pointer h-32 md:h-40 flex items-end p-4 relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-error/30 to-error-container/10"></div>
                 <h3 className="text-xl font-bold text-on-surface truncate relative z-10">Rock</h3>
               </div>
             </div>
          )}
        </div>
      )}
    </>
  );
}
