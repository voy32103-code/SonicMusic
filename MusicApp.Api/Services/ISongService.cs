using MusicApp.Api.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicApp.Api.Services
{
    public interface ISongService
    {
        Task<IEnumerable<SongDto>> GetAllSongsAsync();
        Task<SongDto?> GetSongByIdAsync(Guid id);
        Task<IEnumerable<SongDto>> SearchSongsAsync(string query);
    }
}
