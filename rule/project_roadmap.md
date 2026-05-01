# Lộ Trình Triển Khai (Roadmap) - Web Nghe Nhạc

Với tư cách là Tech Lead, quy tắc đầu tiên của tôi là: **Không code lan man. Code đến đâu phải chạy được (shippable) đến đó.** 

Dự án này rất lớn, nếu ôm đồm làm "HLS Streaming" hay "Elasticsearch" ngay từ đầu, bạn sẽ nản và dự án sẽ "chết lâm sàng". Chúng ta sẽ code theo mô hình **Agile MVP (Minimum Viable Product)**. Xây dựng bộ khung chạy được trước, rồi mới "lắp đồ chơi" xịn vào sau.

Dưới đây là 5 Giai đoạn (Phases) tôi giao cho bạn thực hiện.

---

## Phase 1: Bắt mạng & Chuẩn bị nền tảng (Sprint 1)
*Mục tiêu: Dựng xong móng nhà, kết nối được Front-Back.*

1. **Chốt Tech-Stack:**
   * Dựa theo thói quen của bạn, tôi đề xuất: **Backend C# (.NET 8 Web API)** + **Database PostgreSQL** (vì ef core support rất khỏe) + **Frontend ReactJS / Next.js**.
2. **Khởi tạo Database:**
   * Dựa vào file `database_api_design.md`, viết các file Entities và chạy `Entity Framework Migrations` để tạo các bảng Users, Artists, Albums, Songs, Playlists.
3. **Cài đặt Seed Data (Cực kỳ quan trọng):**
   * Đừng test bằng data trống. Phải viết file **Data Seeder** tự động bơm 50 bài hát fake, 5 Artists, 3 Albums vào Database. Data mp3 dùng các link nhạc free/no-copyright tạm thời.
4. **Setup Storage:**
   * Đăng ký một tài khoản [Cloudinary](https://cloudinary.com/) (miễn phí) hoặc AWS S3 để chuẩn bị chỗ chứa ảnh bìa và file audio.

---

## Phase 2: Core Frontend - Linh hồn của App (Sprint 2)
*Mục tiêu: Làm cho ra dáng cái máy nghe nhạc, chưa cần gọi API Database vội.*

1. **Dựng UI Global Layout:** 
   * Thanh Sidebar (Menu), Header, Main Content Area.
   * **Quan trọng:** Thanh Music Player cắm cứng ở dưới cùng màn hình (Bottom Bar). Bấm chuyển trang qua lại thì thanh này NGHIÊM CẤM bị chớp hay render lại.
2. **Quản lý Global State (Zustand hoặc Redux):**
   * Khởi tạo file `usePlayerStore.js`.
   * Gắn hard-code 1 mảng JSON gồm 3 bài hát fake vào State này làm `queue`.
3. **Xử lý Audio Element (HTML5 `<audio>`):**
   * Gắn ref vào thẻ Audio. Làm tính năng Play/Pause.
   * Làm thanh Tien Trình (Progress bar) chạy theo thời gian thực. Bấm vào thanh trượt (Seek) thì nhạc tua đi.
   * Làm nút Next/Prev (cập nhật Index của state `queue` lên/xuống).
   * **Nghiệm thu:** Trình phát phát ra tiếng, tua được, chuyển bài được bằng data Fake cứng.

---

## Phase 3: Kết nối Backend (CRUD & Phân trang) (Sprint 3)
*Mục tiêu: Dẹp data Fake, bắt đầu lấy data thật từ DB.*

1. **API Songs & Gỡ lỗi N+1:**
   * Viết `GET /api/songs` phân trang. Dùng thư viện Map (AutoMapper) ở C# + Eager Loading (`.Include().ThenInclude()`) để trả về JSON phẳng chứa đủ thông tin Song + Artist + Album.
2. **Trang Chủ (Home):**
   * Gọi API render danh sách Bài hát mới nhất.
   * Click vào 1 bài hát trên giao diện -> Dispatch action bắn bài hát đó vào `usePlayerStore` -> Trình phát dưới đáy web kêu lên ngay lập tức.
3. **Quản lý User & Like:**
   * Dựng sương sương hệ thống Login (JWT Token Header).
   * Làm API Like bài hát (Nhớ xử lý rác/spam `ON CONFLICT DO NOTHING` tôi đã nhắc). Nút trái tim ngoài UI đổi màu đỏ ngay khi API trả về 200 OK.

---

## Phase 4: Thuật toán nâng cao & Playlist (Sprint 4)
*Mục tiêu: Xử lý các logic "khoai" nhất ở phía người dùng.*

1. **Logic Xáo Trộn (Shuffle):**
   * Áp dụng thuật toán *Fisher-Yates* để nhân bản `originalQueue` thành `activeQueue`. 
   * Trình phát giờ sẽ đọc từ `activeQueue`. 
2. **Đếm View API:**
   * Gửi API Update Play Count khi bài hát phát được > 10 giây (dùng `useEffect` kết hợp gài biến theo dõi thời lượng play gốc).
3. **Playlist cá nhân:**
   * CRUD Playlists & Add bài hát vào playlist. 
   * Xử lý lỗi *Race condition* khi API Update Play Count bị gọi liên tục. Bắt đầu setup Background Worker Update theo chu kỳ (tùy chọn).

---

## Phase 5: "Lên đỉnh" Senior (Performance & Streaming) (Sprint 5)
*Mục tiêu: Đem khoe với nhà tuyển dụng/khách hàng.*

Ở Phase này tôi không ép deadline. Rảnh mới làm!
1. Đập file MP3 đi, bắt đầu setup Node.js Worker tự động convert Mp3 -> các đoạn chunk HLS (`.m3u8`).
2. Sửa Frontend, bỏ thẻ `<audio src="...mp3">` cơ bản đi, cài thư viện `hls.js` vào để load. Cắt mạng test thử độ mượt.
3. Setup **Redis** cho API Trang Chủ.
4. Đẩy hệ thống lên Docker và Deploy lên Server thực tế (VPS Linux).

---

🔥 **Nhiệm vụ đầu tiên cho em (Dựa trên Phase 1):**
Em hãy tạo solution C# mới, setup EF Core với cấu trúc Entities theo file Database Schema. Làm xong đẩy lên Git báo anh review. Em cần anh hỗ trợ chạy script tạo Project base không?
