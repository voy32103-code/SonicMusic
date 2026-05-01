# Thiết kế Database Schema & API - Web Nghe Nhạc

Tài liệu này đi sâu vào kiến trúc dữ liệu và API, tập trung giải quyết triệt để vấn đề **N+1 Query**, hiệu suất truy vấn, và các **Business Logic kinh điển** để đảm bảo hệ thống không bị crash dưới tải trọng thực tế.

---

## 1. Database Schema (Relational SQL)

Sử dụng CSDL quan hệ (PostgreSQL/MySQL) là phù hợp nhất vì dữ liệu âm nhạc có tính liên kết chặt chẽ.

### Các bảng cốt lõi (Core Tables)

1.  **`Users`**
    *   `id` (PK, UUID)
    *   `email` (UNIQUE, INDEX)
    *   `password_hash`
    *   `created_at`

2.  **`Artists`**
    *   `id` (PK, UUID)
    *   `name` (INDEX)
    *   `avatar_url`

3.  **`Albums`**
    *   `id` (PK, UUID)
    *   `title`
    *   `artist_id` (FK -> `Artists.id`, INDEX)
    *   `cover_url`
    *   `release_date`

4.  **`Songs`** (Bảng chịu tải đọc nhiều nhất)
    *   `id` (PK, UUID)
    *   `title`
    *   `album_id` (FK -> `Albums.id`, INDEX)
    *   `artist_id` (FK -> `Artists.id`, INDEX) - *Lưu ý: Redundancy (Chuẩn hóa bậc thấp) ở đây để tối ưu tốc độ truy vấn, không cần JOIN qua bảng Album mới lấy được tên Artist.*
    *   `duration` (int - số giây)
    *   `file_url` (CDN link)
    *   `play_count` (BigInt - Cần xử lý cẩn thận)

5.  **`Playlists`**
    *   `id` (PK, UUID)
    *   `user_id` (FK -> `Users.id`, INDEX)
    *   `title`
    *   `is_public` (Boolean)

6.  **`Playlist_Songs`** (Bảng trung gian N-N)
    *   `playlist_id` (FK -> `Playlists.id`)
    *   `song_id` (FK -> `Songs.id`)
    *   `added_at`
    *   `order_index` (int - để sắp xếp thứ tự custom trong playlist)
    *   *(PK là composite key: `playlist_id`, `song_id`)*

---

## 2. Giải Quyết Bài Toán Truy Vấn & N+1 Query

**Vấn đề N+1 kinh điển ở Web Nghe nhạc:**
Khi API trả về danh sách 50 bài hát trong 1 Playlist, frontend cần hiển thị: Tên bài hát, Tên Ca sĩ, Ảnh Cover Album.
*   *Lỗi N+1 (ORM ngây thơ):* 1 query lấy 50 song_id. Sau đó ORM chạy 50 query để lấy Artist và 50 query lấy Album. Tổng cộng: 101 queries! Database sẽ "chết" nhanh chóng.

**Giải pháp (API & DB cấp): Eager Loading & JOINs**

Khi lấy danh sách bài hát, **BẮT BUỘC** phải dùng LEFT JOIN hoặc cơ chế Eager Loading (tùy Framework bạn dùng như Entity Framework, TypeORM, Prisma...) để gom thành 1 query duy nhất.

```sql
-- Ví dụ SQL thuần giải quyết N+1 cho API Get Playlist Detail
SELECT 
    s.id, s.title, s.file_url, s.duration,
    a.id as artist_id, a.name as artist_name,
    al.id as album_id, al.cover_url as album_cover
FROM Playlist_Songs ps
JOIN Songs s ON ps.song_id = s.id
JOIN Artists a ON s.artist_id = a.id
JOIN Albums al ON s.album_id = al.id
WHERE ps.playlist_id = 'id-cua-playlist'
ORDER BY ps.order_index ASC
LIMIT 50 OFFSET 0; 
```

---

## 3. Thiết kế API RESTful & Xử Lý Business Logic Kinh Điển

Dưới đây là các API cốt lõi và các "bẫy" logic (Gotchas) cần tránh.

### 3.1. API Lấy chi tiết Playlist (Cấp phát dữ liệu phát nhạc)
*   **Endpoint:** `GET /api/v1/playlists/{id}/songs`
*   **Business Logic Cần Có:**
    *   **Phân trang (Pagination):** Một playlist có thể có 2000 bài. KHÔNG BAO GIỜ trả về tất cả. Sử dụng **Cursor-based pagination** thay vì Offset/Limit để query truy xuất nhanh hơn ở những trang sâu.
    *   **Phân quyền (Authorization):** Nếu `is_public == false`, phải check xem `req.user.id` có bằng `playlist.user_id` không. Bỏ quên bước này là lỗi [IDOR](https://portswigger.net/web-security/access-control/idor) nguy hiểm.

### 3.2. API Tăng Lượt Nghe (Play Count)
Đây là API chịu tải cao (High Throughput) nhất hệ thống.
*   **Endpoint:** `POST /api/v1/songs/{id}/play`
*   **Lỗi Kinh Điển:**
    1.  *Race Condition:* Read giá trị cũ -> Cộng 1 -> Save. (Nếu 100 User nghe cùng lúc, lượt nghe chỉ tăng 1 thay vì 100).
    2.  *Spam:* User F5 liên tục hoặc gọi API liên tiếp để cày view.
    3.  *DB Lock:* Update row trong DB SQL liên tục làm lock row, gây nghẽn toàn hệ thống.
*   **Giải pháp (Kiến trúc thực tế):**
    *   **Logic chống Spam:** Frontend chỉ gọi API này khi bài hát đã phát được một khoảng thời gian hợp lý (VD: 30 giây hoặc 50% bài). Backend giới hạn Rate Limit theo IP + User ID.
    *   **Xử lý DB (Cấp độ 1):** Dùng Atomic Update `UPDATE Songs SET play_count = play_count + 1 WHERE id = {id}`.
    *   **Xử lý DB (Cấp độ Senior/High Scale):** KHÔNG ghi trực tiếp vào SQL. Ghi lượt play vào **Redis** (In-memory DB) hoặc đẩy event vào Message Queue (Kafka/RabbitMQ). Có một Background Worker (Cronjob) gom data từ Redis và batch update vào DB SQL mỗi 5 phút/lần.

### 3.3. API "Thích" (Like) bài hát 
*   **Endpoint:** `POST /api/v1/songs/{id}/like` (hoặc `PUT /me/likes/songs/{id}`)
*   **Business Logic Cần Có (Idempotency):**
    *   Tình huống: Mạng chập chờn, user bấm Like 2, 3 lần nhanh. App gửi 3 request POST.
    *   Lỗi: Gây lỗi Duplicate Key Exception ở DB hoặc Insert 3 dòng y hệt nhau làm rác data.
    *   Giải pháp: Handle ở DB bằng `INSERT IGNORE` (MySQL) hoặc `ON CONFLICT DO NOTHING` (PostgreSQL). API đảm bảo tính **Idempotent** (gọi 1 lần hay 100 lần kết quả State vẫn như nhau).

### 3.4. API Thêm bài hát vào Playlist cá nhân
*   **Endpoint:** `POST /api/v1/playlists/{playlist_id}/songs`
*   **Payload:** `{ "song_id": "uuid" }`
*   **Business Logic:**
    *   Check xem `req.user` có quyền edit playlist này không.
    *   **Logic kinh điển:** Check bài hát đã tồn tại trong playlist chưa? Nếu có, ném lỗi 409 Conflict (hoặc return success nhưng không làm gì cả, tùy UX). 
    *   Lấy số thứ tự lớn nhất hiện tại (`MAX(order_index)`) và gán cho bài mới thêm để đảm bảo tính sắp xếp.

---

## 4. Tổng Kết Cơ Sở Dữ Liệu: Các nguyên tắc vàng để không sập DB

1.  **Luôn có Index (Chỉ mục):** Tất cả các khóa ngoại (`album_id`, `artist_id`, `user_id`) phải được thiết lập Index. Truy vấn thiếu Index trên bảng > 100k dòng sẽ làm chết CPU của Server.
2.  **Xóa Mềm (Soft Delete):** Không bao giờ dùng lệnh `DELETE FROM Songs...`. Thêm cột `is_deleted = boolean`. Nếu lỡ tay xóa một bài hát có 10 triệu lượt nghe, bạn sẽ không thể lấy lại được Log và Data phân tích.
3.  **Toàn vẹn dữ liệu (Cascading):** Khi xóa một Playlist, phải chắc chắn bảng trung gian `Playlist_Songs` bị xóa theo (ON DELETE CASCADE) để tránh mồ côi dữ liệu (Orphan data). Nhưng KHÔNG được thiết lập cascade sang bảng `Songs`.
