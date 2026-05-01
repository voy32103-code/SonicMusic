# Task List: Khởi tạo Base Project Web Nghe Nhạc

- [x] Khởi tạo thư mục và C# Web API (`MusicApp.Api`). (Vui lòng chạy lệnh: `dotnet new webapi -n MusicApp.Api -o MusicApp.Api --use-controllers`)
- [x] Cài đặt gói Entity Framework Core & thư viện Npgsql cho PostgreSQL. (Vui lòng chạy lệnh cài đặt trong thư mục MusicApp.Api: `dotnet add package Microsoft.EntityFrameworkCore.Design` và `dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL`)
- [x] Thiết kế `BaseEntity.cs` (Soft delete base).
- [x] Thiết kế `User.cs`, `Artist.cs`, `Album.cs`.
- [x] Thiết kế `Song.cs` (Core data).
- [x] Thiết kế `Playlist.cs` & `PlaylistSong.cs` (Quan hệ N-N).
- [x] Cấu hình `MusicDbContext.cs` với Fluent API chặn mồ côi data.
- [x] Chạy lệnh Build kiểm tra lỗi C# Syntax. (Vui lòng chạy lệnh: `dotnet build` sau khi tạo project)
