using System;

namespace MusicApp.Api.DTOs
{
    public class SongDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Artist { get; set; } = string.Empty;
        public string CoverUrl { get; set; } = string.Empty;
        public string SourceUrl { get; set; } = string.Empty;
        public int Duration { get; set; }
    }
}
