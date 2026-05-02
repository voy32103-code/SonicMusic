import { Album, Song, Artist } from "@/types";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5089/api";

/**
 * Hàm hỗ trợ Timeout cho fetch
 */
async function fetchWithTimeout(resource: string, options: RequestInit & { timeout?: number } = {}) {
  const { timeout = 8000 } = options;
  
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal  
  });
  clearTimeout(id);

  return response;
}

/**
 * Hàm gọi API chung
 * @param endpoint - VD: "/songs"
 * @param options - Tùy chọn Fetch (method, headers, body)
 */
export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetchWithTimeout(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error("API call timed out");
    } else {
      console.error("Fetch API bị lỗi:", error);
    }
    throw error;
  }
}

// ----------------------------------------
// CÁC HÀM GỌI API CỤ THỂ THEO CHỨC NĂNG
// ----------------------------------------

export const SongService = {
  /** Lấy danh sách tất cả bài hát */
  getAllSongs: () => fetchApi<Song[]>("/songs"),
  
  /** Lấy thông tin 1 bài hát cụ thể */
  getSongById: (id: string) => fetchApi<Song>(`/songs/${id}`),

  /** Tìm kiếm bài hát theo từ khóa */
  searchSongs: (query: string) => fetchApi<Song[]>(`/songs/search?q=${encodeURIComponent(query)}`).catch(() => []),
};

export const AlbumService = {
  /** Lấy danh sách tất cả Album */
  getAllAlbums: () => fetchApi<Album[]>("/Albums"),

  /** Lấy thông tin 1 Album cụ thể */
  getAlbumById: (id: string) => fetchApi<Album>(`/Albums/${id}`),
};
