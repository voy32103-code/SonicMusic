using System;
using System.Collections.Generic;

namespace MusicApp.Api.DTOs
{
    public class AlbumDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string CoverUrl { get; set; } = string.Empty;
        public string ArtistName { get; set; } = string.Empty;
        public List<SongDto> Songs { get; set; } = new();
    }
}
