using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MusicApp.Api.Entities
{
    public class Album : BaseEntity
    {
        [Required]
        [MaxLength(256)]
        public string Title { get; set; } = string.Empty;

        public string? CoverUrl { get; set; }

        public Guid ArtistId { get; set; }
        public Artist? Artist { get; set; }

        // Navigation property
        public ICollection<Song> Songs { get; set; } = new List<Song>();
    }
}
