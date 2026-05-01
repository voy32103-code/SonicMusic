using Microsoft.EntityFrameworkCore;
using MusicApp.Api.Entities;

namespace MusicApp.Api.Data
{
    public static class DataSeeder
    {
        public static async Task SeedDataAsync(MusicDbContext context)
        {
            // Tự động Apply Migrations nếu chưa có
            await context.Database.MigrateAsync();

            // Nếu DB đã có data bài hát, bỏ qua việc tạo fake data
            if (await context.Songs.AnyAsync())
            {
                return;
            }

            // 1. Tạo 5 Nghệ sĩ
            var artists = new List<Artist>();
            for (int i = 1; i <= 5; i++)
            {
                artists.Add(new Artist
                {
                    Id = Guid.NewGuid(),
                    Name = $"Nghệ sĩ Demo {i}",
                    AvatarUrl = $"https://api.dicebear.com/7.x/avataaars/svg?seed=Artist{i}"
                });
            }
            await context.Artists.AddRangeAsync(artists);

            // 2. Tạo mỗi Nghệ sĩ 3 Album
            var albums = new List<Album>();
            foreach (var artist in artists)
            {
                for (int i = 1; i <= 3; i++)
                {
                    albums.Add(new Album
                    {
                        Id = Guid.NewGuid(),
                        Title = $"Album Demo số {i} của {artist.Name}",
                        ArtistId = artist.Id,
                        CoverUrl = $"https://api.dicebear.com/7.x/identicon/svg?seed=Album{artist.Id}{i}"
                    });
                }
            }
            await context.Albums.AddRangeAsync(albums);

            // 3. Tạo 50 bài hát
            var songs = new List<Song>();
            int songCount = 0;
            
            // Link nhạc MP3 sample miễn phí
            var sampleAudio = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

            foreach (var album in albums)
            {
                for (int i = 1; i <= 4; i++) // 15 albums * 4 ~ 60 bài
                {
                    songCount++;
                    songs.Add(new Song
                    {
                        Id = Guid.NewGuid(),
                        Title = $"Bài hát nhạc trẻ Demo {songCount}",
                        FileUrl = sampleAudio,
                        Duration = 180 + (songCount % 60), // Ngẫu nhiên 3~4 phút
                        PlayCount = songCount * 12,
                        ArtistId = album.ArtistId,
                        AlbumId = album.Id
                    });

                    if (songCount >= 50) break;
                }
                if (songCount >= 50) break;
            }

            await context.Songs.AddRangeAsync(songs);
            await context.SaveChangesAsync();
        }
    }
}
