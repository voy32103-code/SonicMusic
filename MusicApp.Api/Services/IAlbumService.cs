using MusicApp.Api.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MusicApp.Api.Services
{
    public interface IAlbumService
    {
        Task<IEnumerable<AlbumDto>> GetAllAlbumsAsync();
        Task<AlbumDto?> GetAlbumByIdAsync(Guid id);
    }
}
