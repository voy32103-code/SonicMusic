using System;
using System.ComponentModel.DataAnnotations;

namespace MusicApp.Api.Entities
{
    public class Transaction : BaseEntity
    {
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(50)]
        public string Type { get; set; } = "SubscriptionPayment"; // SubscriptionPayment, ArtistPayout

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Completed"; // Pending, Completed, Failed

        public Guid? UserId { get; set; }
        public User? User { get; set; }

        public Guid? ArtistId { get; set; }
        public Artist? Artist { get; set; }

        [MaxLength(256)]
        public string Description { get; set; } = string.Empty;
    }
}
