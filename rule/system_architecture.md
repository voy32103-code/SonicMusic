# Kiến Trúc Hệ Thống Nâng Cao - Web Nghe Nhạc (Enterprise Level)

Tài liệu này thiết kế kiến trúc hệ thống phục vụ scale (mở rộng) lớn, giải quyết 4 bài toán cốt lõi của một nền tảng âm nhạc thực thụ: Streaming Protocol, Caching, Search Engine và Frontend State Management.

---

## 1. Bài toán rớt mạng & Tốc độ tải: Giao thức HLS & CDN

Thay vì trả về 1 file MP3 10MB nguyên khối và bắt trình duyệt người dùng "cân" toàn bộ, hệ thống chuyên nghiệp sử dụng **HLS (HTTP Live Streaming)**.

### Kiến trúc luồng (Workflow):
1. **Upload:** Admin/Nghệ sĩ upload file audio gốc (WAV, FLAC, MP3 320kbps).
2. **Transcoding (Chuyển mã):** Hệ thống có 1 Worker chạy nền (dùng kịch bản FFmpeg) gọt giũa file âm thanh thành nhiều bitrate khác nhau (128kbps, 320kbps) và **băm nhỏ** thành các đoạn dài ~10 giây (các file `.ts`). Cuối cùng tạo ra một file Playlist index `.m3u8`.
3. **Storage & CDN:** Toàn bộ file text `.m3u8` và các file chunk `.ts` được đưa lên Cloud Storage (Amazon S3) và kết nối với **CDN** (Cloudflare hoặc AWS Cloudfront).
4. **Playback:**
   * Khi user bấm Play, API chỉ trả về link CDN của file `.m3u8`.
   * Trình duyệt hoặc thư viện phát nhạc (như `hls.js` hoặc native audio element) sẽ đọc file index này và **liên tục request từng chunk 10s một** dựa trên chất lượng mạng hiện tại của người dùng.
   * *Kết quả:* Không tải dư thừa data. Tua (Seek) cực nhanh vì chỉ request chunk ở timestamp đó. Mạng yếu hệ thống tự nhảy xuống tệp chất lượng thấp không gây buffering mệt mỏi.

---

## 2. Bài toán Tải Trang Chủ Cực Nhanh: Redis Caching Layer

Trang chủ là màn hình luôn được gọi đầu tiên với hàng chục Playlist, Top 100, Trending... Việc SQL tính toán và truy vấn dữ liệu này hàng trăm nghìn lần mỗi giây là nguyên nhân chính gây sập Server.

### Kiến trúc bộ đệm (Caching Architecture):
1. **Cronjob / Background Worker:**
   * Setup các Cronjob ngầm chạy định kỳ (VD: Top Trending chạy mỗi 15 phút, Playlist đề xuất chạy mỗi giờ).
   * Worker này sẽ thực hiện các SQL Query phức tạp (JOIN bảng, COUNT lượt nghe, sắp xếp...).
   * Sau khi có JSON Result, lưu thẳng cục JSON đó vào **Redis** (Data structure store in-memory cực nhanh) với một cái Key cố định (VD: `home:top_trending:vn`).
2. **API Tiếp nhận:**
   * Các truy vấn `GET /api/v1/home` từ người dùng **không bao giờ đụng vào SQL Database**.
   * API server (Node.js/C#) chỉ đơn giản lấy data JSON từ `Redis.Get("home:...")` và bắn thẳng về Frontend.
   * *Kết quả:* Query từ Redis tốn `< 5ms`. Database SQL ở phía sau hoàn toàn rảnh rỗi chỉ làm nhiệm vụ Write (lưu data) thay vì Read (đọc data).

---

## 3. Bài toán Tìm kiếm Tức Thời: Elasticsearch

Tìm kiếm ở thanh Search Bar (Typeahead) đòi hỏi tốc độ gần như realtime và phải xử lý được việc user gõ sai chữ (Typo tolerance - gõ "Sơn Tung" ra "Sơn Tùng"). Dùng lệnh `WHERE name LIKE '%...%'` trên SQL không thể đáp ứng được cả 2 điều kiện này.

### Kiến trúc Search:
1. **Database Master (SQL):** Vẫn là nơi lưu trữ Source of Truth (chính xác tuyệt đối).
2. **Search Engine Layer (Elasticsearch / Meilisearch):** Một server riêng biệt chuyên lập chỉ mục (Indexing) text.
3. **Đồng bộ hóa (Synchronization):** 
   * Khi Admin thêm bài hát/nghệ sĩ mới vào SQL DB.
   * Thông qua Event Driven (Kafka) hoặc cơ chế CDC (Debezium theo dõi log DB), dữ liệu mới đó sẽ ngay lập tức được "Bắn" sang Elasticsearch để Indexing.
4. **API Search:**
   * Khi user gõ ký tự vào ô Search, API `GET /api/v1/search?q=...` sẽ query trực tiếp vào Elasticsearch, bỏ qua SQL DB.
   * *Kết quả:* ElasticSearch trả về kết quả trong `< 10ms`, bỏ qua các lỗi gõ sai chữ cơ bản và hỗ trợ Full-text cực kỳ tốt.

---

## 4. Bài toán Trải nghiệm nghe nhạc (Frontend State & Queue)

Để khi user bấm chuyển trang mà nhạc không bị tắt, Frontend bắt buộc là mô hình SPA (Single Page Application - React, Vue, Angular).

### Quản lý Trạng thái Trình Phát (Player State Management):
Sử dụng Global State (Zustand, Redux) tách biệt hoàn toàn với trang UI đang hiển thị. State chứa:
* `currentSong`: Thông tin bài hát đang phát.
* `isPlaying`, `volume`, `progress`.
* `originalQueue`: Danh sách bài trong Playlis gốc (Thứ tự gốc 1->50).
* `activeQueue`: Danh sách bài **thực tế** trình phát đang follow theo.

### Thuật toán Trộn (Shuffle Logic):
**Lỗi kinh điển:** Khi bấm Shuffle, thay đổi thẳng mảng Queue gốc. Sau đó bỏ tắt Shuffle thì không biết đường xếp lại bài như ban đầu.

**Giải pháp chuẩn xác:**
1. Khi bấn Shuffle: 
   * Giữ nguyên mảng `originalQueue`.
   * Lấy `originalQueue` copy ra mảng mới, dùng thuật toán Fisher-Yates để xáo trộn toàn bộ ngẫu nhiên.
   * Đưa bài hát đang phát (CurrentSong) lên vị trí Index số 0 của mảng bị xáo trộn.
   * Gán mảng bị xáo trộn đè lên `activeQueue` (Trình phát chỉ đọc `activeQueue`).
2. Khi tắt Shuffle:
   * Tìm vị trí của `currentSong` (Bài đang phát hiện tại) ở trong `originalQueue` cũ.
   * Gán `activeQueue = originalQueue`.
   * Chỉnh con trỏ trình phát về đúng Index tìm được ở trên.

### Đồng bộ LocalStorage:
* Hàm `activeQueue` và `currentSong` phải liên tục sync xuống LocalStorage ở trình duyệt. 
* Nếu người dùng vô tình bấm F5 (Reload Web), lần khởi tạo App đầu tiên sẽ đọc state từ LocalStorage, khôi phục lại ngay bài đang nghe dở và danh sách phát chờ (Queue). Tính liên tục (Continuity) được giữ vững tuyệt đối.
