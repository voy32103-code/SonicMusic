using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MusicApp.Api.Entities
{
    public class Artist : BaseEntity
    {
        [Required]
        [MaxLength(256)]
        public string Name { get; set; } = string.Empty;

        public string? AvatarUrl { get; set; }

        // Navigation properties
        public ICollection<Album> Albums { get; set; } = new List<Album>();
        public ICollection<Song> Songs { get; set; } = new List<Song>();
    }
}
