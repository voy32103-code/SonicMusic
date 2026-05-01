# Yêu cầu tính năng - Trang Web Nghe Nhạc (Music Streaming App)

Tài liệu này tóm tắt các tính năng cốt lõi cần thiết cho một ứng dụng nghe nhạc, tập trung vào trải nghiệm người dùng cuối và quản lý nội dung.

## 1. Dành cho Người dùng (End-User)

### 1.1. Trình phát nhạc (Music Player) - *Cốt lõi*
*   **Điều khiển cơ bản:** Play, Pause, Next, Previous.
*   **Thanh tiến trình (Progress Bar):** Tua nhạc (Seek), hiển thị thời gian hiện tại/tổng thời gian.
*   **Âm lượng (Volume):** Điều chỉnh âm lượng, Mute.
*   **Chế độ phát:** Lặp lại (Repeat one, Repeat all), Phát ngẫu nhiên (Shuffle).
*   **Hiển thị thông tin:** Tên bài hát, nghệ sĩ, ảnh bìa (cover art) đang phát.
*   **Trình phát nổi (Mini Player / Persistent Player):** Nhạc vẫn tiếp tục phát và điều khiển được khi chuyển qua các trang khác trong web.

### 1.2. Khám phá & Tìm kiếm (Discovery & Search)
*   **Trang chủ (Trang khám phá):** Hiển thị Top trending, Playlist đề xuất, Album mới phát hành, Nghệ sĩ nổi bật.
*   **Tìm kiếm (Search):** Tìm kiếm thời gian thực (Real-time/Typeahead search) theo tên bài hát, nghệ sĩ, album.
*   **Phân loại theo Thể loại (Genres/Moods):** Duyệt nhạc theo Pop, Rock, Chill, Nhạc Acoustic...

### 1.3. Quản lý Thư viện Cá nhân (Personal Library)
*   **Playlist cá nhân:** Tạo mới, chỉnh sửa (thêm/xóa bài hát, đổi tên), xóa playlist.
*   **Yêu thích (Liked Songs):** Đánh dấu bài hát yêu thích (Heart icon) và gom vào một playlist riêng.
*   **Lịch sử nghe nhạc (Recently Played):** Hiển thị danh sách các bài hát vừa nghe.

### 1.4. Tương tác (Tùy chọn nâng cao)
*   **Lời bài hát (Lyrics):** Hiển thị đồng bộ theo thời gian thực (Karaoke style) hoặc dạng text tĩnh.
*   **Chia sẻ (Share):** Copy link bài hát/playlist để chia sẻ lên mạng xã hội.

---

## 2. Dành cho Admin/Hệ thống (Quản lý nội dung)

*   **Quản lý Bài hát/Album:**
    *   Tải lên (Upload) file âm thanh (.mp3, .wav) và hình ảnh cover.
    *   Thêm/Sửa/Xóa thông tin metadata (Tên, ca sĩ, thể loại, năm phát hành).
*   **Quản lý Ca sĩ (Artists):** Thêm hồ sơ ca sĩ, hình ảnh cập nhật.
*   **Quản lý Playlist hệ thống:** Tạo các playlist public cho Trang chủ.

---

## 3. Kiến trúc Frontend (Gợi ý)

Vì bạn đã có UI/UX, để trải nghiệm mượt mà không bị ngắt quãng nhạc khi chuyển trang, **bắt buộc** phải sử dụng kiến trúc **SPA (Single Page Application)**.
*   Trình phát nhạc sẽ nằm ở layout tổng (Global State), không bị re-render khi chuyển Route.
