using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MusicApp.Api.Entities
{
    public class Song : BaseEntity
    {
        [Required]
        [MaxLength(256)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string FileUrl { get; set; } = string.Empty;

        public int Duration { get; set; } // in seconds
        public int PlayCount { get; set; } = 0;

        public Guid ArtistId { get; set; }
        public Artist? Artist { get; set; }

        public Guid? AlbumId { get; set; }
        public Album? Album { get; set; }

        // Navigation property
        public ICollection<PlaylistSong> PlaylistSongs { get; set; } = new List<PlaylistSong>();
    }
}
