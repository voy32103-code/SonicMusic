# Kế hoạch thực hiện Bước Tiếp Theo: Cấu hình PostgreSQL & Data Seeder

Theo lộ trình `project_roadmap.md`, bước tiếp theo của chúng ta nằm ở phần còn lại của Phase 1: **Khởi tạo Database, cấu hình kết nối thực tế và thiết lập Data Seeder**. 

## Mục tiêu
1. Kết nối ứng dụng `.NET Web API` với hệ quản trị CSDL PostgreSQL.
2. Sinh ra dữ liệu mẫu (Fake Data) gồm Nghệ sĩ, Album, Bài hát để phục vụ việc làm UI/Frontend sau này.

## User Review Required
> [!IMPORTANT]
> Cần bạn xác nhận thông tin đăng nhập PostgreSQL ở dưới phần Open Questions để chuỗi `ConnectionString` được cấu hình chính xác vào hệ thống.

## Proposed Changes

Chúng ta sẽ điều chỉnh và thêm các tệp sau:

### Tệp Cấu hình & Khởi động
#### [MODIFY] [appsettings.json](file:///d:/Yen-Antigravity/Webnghenhac/MusicApp.Api/appsettings.json)
- Bổ sung chuỗi kết nối (Connection String) trỏ tới PostgreSQL Local của bạn.

#### [MODIFY] [Program.cs](file:///d:/Yen-Antigravity/Webnghenhac/MusicApp.Api/Program.cs)
- Chèn dịch vụ kết nối `MusicDbContext` vào `builder.Services` dùng `UseNpgsql`.
- Gọi hàm tự động Seed Data nếu DB chưa có dữ liệu.

### Thành phần tạo Dữ liệu Mẫu (Data Seeder)
#### [NEW] [DataSeeder.cs](file:///d:/Yen-Antigravity/Webnghenhac/MusicApp.Api/Data/DataSeeder.cs)
- Viết 1 class tĩnh (static) để kiểm tra: Nếu `dbContext.Songs.Any()` trả về false (CSDL chưa có dữ liệu), chúng ta sẽ tự động tạo:
  - 5 Nghệ sĩ (Artist)
  - 3 Album cho mỗi nghệ sĩ
  - Tồng cộng 50 bài hát với thông tin giả lập, trong đó FileUrl có thể tạm gán các link MP3 nhúng miễn phí.

## Open Questions
> [!WARNING]
> Xin hãy xác nhận 1 thông tin rất quan trọng trước khi tôi viết mã:
> **Tài khoản và Mật khẩu PostgreSQL local của bạn là gì?** 
> Mặc định thường là: User = `postgres`, Password = `postgres`, Port = `5432`. Nếu bạn cấu hình khác, vui lòng cung cấp để tôi điền vào `appsettings.json`.

## Verification Plan
1. Tôi sẽ tiến hành tạo `DataSeeder.cs` và sửa `Program.cs`, `appsettings.json`.
2. Tôi sẽ hướng dẫn bạn chạy 2 lệnh tạo Migrations bằng Terminal (vì hệ thống đang chặn tôi chạy tác vụ ngầm).
3. Sau khi chạy, nếu Database xuất hiện 50 bản ghi bài hát, bước này coi như hoàn tất mỹ mãn.
