import Image from "next/image";
import Link from "next/link";
import TrackRow from "@/components/ui/TrackRow";
import MediaCard from "@/components/ui/MediaCard";

export default function ArtistProfilePage({ params }: { params: { id: string } }) {
  // Dummy data for tracks
  const popularTracks = [
    {
      id: "1",
      title: "Neon Genesis",
      artist: "Echoes of Tomorrow",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFJ75QftBCEQZedMmh3yH4oYVYb-qQmk_AoLXBB3-XtBxgOZg4Z48vyP8d_izRbC7VoK24IAJIG7vvtDxDGw3jzZldhzJTWueTOuzttSVZhXi2Fp-9bCfB3vB7YO_g9cyd8hGGpYv_WDOK-9vzLO8DsF3bNF5ULoUC1hTGbowSg0swCX3v4SmKAloyU1ZtzFGy6k0iDw14mAkzCQqJvdXiIIvHL0hqx9mWVXooDiGBFr55UY67AfblYwoc4g4vZnrW3zxZvPjDjAa1",
      sourceUrl: "",
      duration: 222
    },
    {
      id: "2",
      title: "Midnight Circuit",
      artist: "Midnight Circuit - Single",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBS8SyPqXEbx-LMCUYmkyb__y40s2TNdxKD4hepOqWj5tggr-cWckUdb1lRdJd4I15-9Zj5sSn5jOh0RANoXXFvhrPbAuNt0xmFX8QymeUlDP9TezSxKbZbgmjBNcq1SDoJ-_2VHlcbYEqMHG8en2e2AqXDHIXCHgjOo28YZdj1WZaupzKEbEurlQSkTPnuaNuakIMWnYArKDnCY_w54xiV293WdmuPaHYTU1mVj954OBhpoOQXIhydIuQK-ySt-v1cFZT5PDX_9h9A",
      sourceUrl: "",
      duration: 255
    },
    {
      id: "3",
      title: "Digital Horizon",
      artist: "Echoes of Tomorrow",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgORWHgTI2OC-IuzmlV3beWPz_MtqCKmR0h-MS2x4_ShpvXPEILbktq-S61xybzJEjA1hQnSnSxPVyK9DMId3mGLk0C9v8__Bxp6Xr8kwHzFZAnsx3UIi254AxXc6znG_UZDU62wB1OPInSP3RMuDEt3QMAFY5UXbeVhAIg2qOclkCGNsAO5NsjnUbjr5RDlY_lHk1NdvluTM3gmZxH6AAtW_qKKrva1U6IEwga1SpipLvrnLoayxu9sH8gYBkSoyrop5A8jo3JoVr",
      sourceUrl: "",
      duration: 190
    }
  ];

  const discography = [
    {
      id: "a1",
      title: "Echoes of Tomorrow",
      subtitle: "2023 • Album",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrF9W_mWNPWj7n2GJZwS9EU2p8GD8pHL71Rnls8gcpZMfi3GrfVTn43eMsjof43ZGii5xJkJl6RaU0wY_cBjATAagO82dHnYXPHp63RVSbCwpPC53hD6p0IdKwOzsvY8z6E1MojV0PRYMXadBzLGchQIt_ItQthyalQJennoeFzxlQyRWSD3JYhOOPRQUCKEiGuzUiYcxy6gJ-g5xHuQLwxpdlwgVeOiRH16P_URTIJfBrT4HTy_59UnUUX6D9i6rB5ErZsq7qXdDf"
    },
    {
      id: "a2",
      title: "System Override",
      subtitle: "2021 • Album",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPmiIc8znX6S_6UBA66P7pAszu9MS_lW46ufw0-fKm-82phSGJ-WqEzNMcR60NYx52HmrM_Ew4ck4z8fVSaXAaGkV5wAiRe8PTjPD3FyPQ5XDQgqut9Y7lWMuqQ9Iob6bPQiZaYWKxE2Q5XWJ1ev1nnCy2n55SB5aCZPBWMDBUq-YIMv9gp9rNV-W1HGzyeUBrMtoRglN5yUQzaNkVQ1Wuj0A1Kwr3l38TlaHss7OaoEPmlMitXrRVkqmPiwnfVUhNlLRqw2cxgA6i"
    },
    {
      id: "a3",
      title: "Midnight Circuit",
      subtitle: "2020 • Single",
      coverUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDyGwxk9Uk5HgA8quubuiDjALReyjNd__06O1bkoJNd1iZ60miBZqNJJNgm-EhqbHQzEeXr_NXhT7YYRy7bt1q92AJa7F8t89DXJi_WfpRfTrBRDmUBLp8jdtcdzXHteR2j6MeS6Zdxmf9D3cE3u9hDE1qoJJSWoReBhfOEy-bJlMPBHuUZB2xfsaaEnakS2zy8uAMsGR-Abtm41hGKC3axECzgCkoDVmhHFu4HuZY3uzqxecW7cjgPJ4QMZnOpb5mXXm8xPQ9b9pmi"
    }
  ];

  return (
    <div className="-mt-24 -mx-6 md:-mx-12">
      {/* Artist Hero Section */}
      <section className="relative w-full h-[614px] min-h-[400px] flex items-end">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Artist Cover" 
            className="w-full h-full object-cover opacity-80" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_O_Lkfa8p5HqBFTYaYea1Ejw-AMz53F5xd3XME6p3huV7R0bGTlprINtonT4PLgSiOJlz8ZpSB1YBdspu3-kGi3kLWt5Z_imvu4bLwvqrJXc_VHROZ_YsDQ1NFkCkfc7NmkLOWuUROzc-6xcvfX5yVNCNNedEDKY41gPdV4gB99R_fKOIArohCeIkeSmNBeOfOoxL62117C3PjgmA4KEfc-SgTY53IRXUXcZI8amZzbuI9JmCc3HSdyePcarp-lfgOMz_-QSd3MfR"
          />
          {/* Immersive Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 md:px-12 pb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined material-symbols-filled text-primary text-xl">verified</span>
            <span className="text-sm uppercase tracking-widest text-on-surface-variant font-bold">Verified Artist</span>
          </div>
          {/* Oversized Typography */}
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-on-surface mb-4 leading-none -ml-1">
            Aurora <br/> Synth
          </h1>
          <p className="text-on-surface-variant mb-8 text-lg font-medium">12,405,892 monthly listeners</p>

          <div className="flex items-center gap-4">
            {/* Kinetic Play Button */}
            <button className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center text-on-primary hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(79,254,126,0.15)] group">
              <span className="material-symbols-outlined material-symbols-filled text-4xl ml-1 group-hover:scale-110 transition-transform">play_arrow</span>
            </button>
            {/* Secondary Follow Button */}
            <button className="px-8 py-3 rounded-full border border-outline-variant/15 text-on-surface font-bold hover:bg-surface-container-high transition-colors tracking-wide">
              Follow
            </button>
            <button className="w-12 h-12 rounded-full border border-outline-variant/15 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors ml-auto md:ml-4">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content constraints */}
      <div className="px-6 md:px-12">
        {/* Content Grid (Tracks & Discography) */}
        <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Popular Tracks (8 columns) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h2 className="text-2xl font-bold tracking-tight">Popular</h2>
            <div className="flex flex-col gap-2">
              {popularTracks.map((song, idx) => (
                <TrackRow key={song.id} song={song} index={idx} />
              ))}
            </div>
          </div>
          
          {/* Right Column: Artist Pick / Tour (4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h2 className="text-2xl font-bold tracking-tight">Artist Pick</h2>
            {/* Featured Card */}
            <div className="bg-surface-container-high rounded-lg p-4 group cursor-pointer relative overflow-hidden flex flex-col gap-4">
              <img 
                alt="Live Event" 
                className="w-full h-48 object-cover rounded-md" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9hgk6OHv2nlbCmDvh3XbqM9HC8F_xOeFxEW-mi6UhgHF0K-JgLmjNEThDoZa0y8FSVZcaxoKRHUhz11mr811sdG3_gmz347aBbTZJYBmsk1U2JtE6fY2w_cyrynpBdNFF7qLJXbtyYf7DoYRTZ7tSYXjwj-TINbpERubHueMKyTE0lNIxSChNCBWBQCtlm4gcsl5uyJuNU7U-qdKEJjGFzvH4RO__3v_GKQU73gEPM2Es5c6lJkNJPe_TEw8-MTuVIUoHPMVtUjyr"
              />
              <div className="flex flex-col gap-1 z-10">
                <span className="text-xs uppercase tracking-widest text-primary font-bold">On Tour</span>
                <span className="text-lg font-bold">The Obsidian Tour 2024</span>
                <span className="text-sm text-on-surface-variant">Live in Berlin, London, Tokyo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Discography Section */}
        <section className="py-8 flex flex-col gap-6">
          <h2 className="text-2xl font-bold tracking-tight">Discography</h2>
          {/* Bento Grid inspired layout for albums */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {discography.map((album) => (
              <MediaCard 
                key={album.id}
                title={album.title}
                subtitle={album.subtitle}
                imageUrl={album.coverUrl}
                href={`/album/${album.id}`}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
