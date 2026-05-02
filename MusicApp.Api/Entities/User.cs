using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MusicApp.Api.Entities
{
    public class User : BaseEntity
    {
        [Required]
        [MaxLength(256)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(256)]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Role { get; set; } = "User";

        // Navigation property
        public ICollection<Playlist> Playlists { get; set; } = new List<Playlist>();
    }
}
