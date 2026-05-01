using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MusicApp.Api.Data;
using MusicApp.Api.DTOs;

namespace MusicApp.Api.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly MusicDbContext _context;

        public AlbumService(MusicDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<AlbumDto>> GetAllAlbumsAsync()
        {
            return await _context.Albums
                .Include(a => a.Artist)
                .Select(a => new AlbumDto
                {
                    Id = a.Id,
                    Title = a.Title,
                    CoverUrl = a.CoverUrl,
                    ArtistName = a.Artist != null ? a.Artist.Name : "Unknown Artist"
                })
                .ToListAsync();
        }

        public async Task<AlbumDto?> GetAlbumByIdAsync(Guid id)
        {
            return await _context.Albums
                .Include(a => a.Artist)
                .Include(a => a.Songs)
                .Where(a => a.Id == id)
                .Select(a => new AlbumDto
                {
                    Id = a.Id,
                    Title = a.Title,
                    CoverUrl = a.CoverUrl,
                    ArtistName = a.Artist != null ? a.Artist.Name : "Unknown Artist",
                    Songs = a.Songs.Select(s => new SongDto
                    {
                        Id = s.Id,
                        Title = s.Title,
                        Artist = a.Artist != null ? a.Artist.Name : "Unknown Artist", // Phẳng hóa dũ liệu cho Frontend dễ đọc
                        CoverUrl = a.CoverUrl,
                        SourceUrl = s.FileUrl,
                        Duration = s.Duration
                    }).ToList()
                })
                .FirstOrDefaultAsync();
        }
    }
}
