using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MusicApp.Api.Data;
using MusicApp.Api.DTOs;

namespace MusicApp.Api.Services
{
    public class SongService : ISongService
    {
        private readonly MusicDbContext _context;

        public SongService(MusicDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SongDto>> GetAllSongsAsync()
        {
            return await _context.Songs
                .Include(s => s.Artist)
                .Include(s => s.Album)
                .Select(s => new SongDto
                {
                    Id = s.Id,
                    Title = s.Title,
                    Artist = s.Artist != null ? s.Artist.Name : "Unknown Artist",
                    CoverUrl = s.Album != null ? s.Album.CoverUrl : (s.Artist != null ? s.Artist.AvatarUrl : ""),
                    SourceUrl = s.FileUrl,
                    Duration = s.Duration
                })
                .ToListAsync();
        }

        public async Task<SongDto?> GetSongByIdAsync(Guid id)
        {
            return await _context.Songs
                .Include(s => s.Artist)
                .Include(s => s.Album)
                .Where(s => s.Id == id)
                .Select(s => new SongDto
                {
                    Id = s.Id,
                    Title = s.Title,
                    Artist = s.Artist != null ? s.Artist.Name : "Unknown Artist",
                    CoverUrl = s.Album != null ? s.Album.CoverUrl : (s.Artist != null ? s.Artist.AvatarUrl : ""),
                    SourceUrl = s.FileUrl,
                    Duration = s.Duration
                })
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<SongDto>> SearchSongsAsync(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                return new List<SongDto>();

            var q = query.ToLower();
            return await _context.Songs
                .Include(s => s.Artist)
                .Include(s => s.Album)
                .Where(s => s.Title.ToLower().Contains(q) || 
                           (s.Artist != null && s.Artist.Name.ToLower().Contains(q)))
                .Select(s => new SongDto
                {
                    Id = s.Id,
                    Title = s.Title,
                    Artist = s.Artist != null ? s.Artist.Name : "Unknown Artist",
                    CoverUrl = s.Album != null ? s.Album.CoverUrl : (s.Artist != null ? s.Artist.AvatarUrl : ""),
                    SourceUrl = s.FileUrl,
                    Duration = s.Duration
                })
                .Take(20)
                .ToListAsync();
        }
    }
}
