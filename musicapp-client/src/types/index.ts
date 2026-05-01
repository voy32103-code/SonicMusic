export interface Artist {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string; // Tên tác giả lúc fetch map từ join trả về
  coverUrl: string; // Ảnh dính từ Album
  sourceUrl: string; // Link MP3
  duration?: number;
}

export interface Album {
  id: string;
  title: string;
  coverUrl: string;
  artistName: string;
  songs?: Song[];
}
