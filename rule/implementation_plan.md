# Khởi tạo Base Project Nghe Nhạc: C# .NET API & EF Core

Mục tiêu: Chạy lệnh dựng bộ khung server backend (Web API) và khai báo lập trình các model CSDL (Entities) theo đúng thiết kế chống N+1 đã thống nhất.

## User Review Required
> [!IMPORTANT]
> Vui lòng xác nhận rằng bạn đã cài đặt phiên bản .NET 8.0 SDK trên máy.
> Đây là bản nháp các thao tác tôi định làm. Bạn xem qua và trả lời nhanh 2 câu hỏi ở mục "Open Questions" phía dưới để tôi chốt lệnh chạy nhé!

## Proposed Changes

### Khởi tạo Project & Infrastructure
Chúng ta chọn điểm rơi kiến trúc **N-Tier Minimal** (Trong 1 Project API chia cấu trúc thư mục rõ ràng) để phù hợp cho việc bạn code 1 mình nhưng vẫn đủ scale sau này.

- Sẽ chạy lệnh CLI: `dotnet new webapi -n MusicApp.Api -o MusicApp.Api --use-controllers` tại thư mục hiện tại.
- Thêm các Packages chuẩn bị chiến EF Core:
  - `Microsoft.EntityFrameworkCore.Design`
  - `Microsoft.EntityFrameworkCore.SqlServer` (Hoặc PostgreSQL, chờ bạn confirm).

### Các Entity Core sẽ được tạo (Thực thi Schema)

Tôi sẽ điêu khắc các class C# kế thừa từ 1 class Base để hỗ trợ Soft Delete (Xóa mềm):

#### [NEW] `MusicApp.Api/Entities/BaseEntity.cs`
- Lõi dùng chung: `Guid Id`, `DateTime CreatedAt`, `bool IsDeleted`.

#### [NEW] `MusicApp.Api/Entities/User.cs`
- Chứa `Email`, `PasswordHash`. Mối quan hệ: 1 User có nhiều Playlists.

#### [NEW] `MusicApp.Api/Entities/Artist.cs`
- Chứa `Name`, `AvatarUrl`. Mối quan hệ: 1 Artist có nhiều Albums, nhiều Songs.

#### [NEW] `MusicApp.Api/Entities/Album.cs`
- Chứa `Title`, `ArtistId`, `CoverUrl`. Mối quan hệ: 1 Album có nhiều Songs.

#### [NEW] `MusicApp.Api/Entities/Song.cs`
- Table quan trọng nhất. Cấu hình Index sẵn. Chứa `Duration`, `PlayCount`, `FileUrl`.

#### [NEW] `MusicApp.Api/Entities/Playlist.cs` và `PlaylistSong.cs`
- Table quản lý quan hệ N-N giữa Nhạc và Playlist. Xử lý logic sắp xếp order.

#### [NEW] `MusicApp.Api/Data/MusicDbContext.cs`
- Trái tim của Entity Framework. Mọi mapping quan hệ (Foreign Keys), Unique Email, cấu hình chống khóa ngoại mồ côi (Cascade Delete) sẽ được code thẳng bằng `Fluent API` vào file này.

---

## Open Questions

> [!WARNING]
> Xin hãy confirm 2 chi tiết sau để tôi bắt đầu code ngay:
> 1. **Loại Database:** Bạn muốn dùng **SQL Server** hay **PostgreSQL**? Nếu dùng Windows, thường .NET anh em chuộng SQL Server hơn vì có sẵn SSMS, nhưng tùy bạn chọn.
> 2. **Lưu trữ Audio:** Tạm thời các `cover_url` và `file_url` ta sẽ lưu kiểu String dài để mai mốt map link Cloudinary/S3 có ổn không?

## Verification Plan
1. Tôi chạy lệnh CLI tạo project và add package.
2. Tôi đổ code tạo 7 file class entity.
3. Tôi chạy lệnh `dotnet build` nội bộ xem có lỗi lầm nào không.
4. Xong xuôi giao lại bạn kiểm tra.
