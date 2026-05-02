using System;
using System.ComponentModel.DataAnnotations;

namespace MusicApp.Api.Entities
{
    public class Subscription : BaseEntity
    {
        [Required]
        public Guid UserId { get; set; }
        public User? User { get; set; }

        [Required]
        [MaxLength(50)]
        public string PlanType { get; set; } = "Individual"; // Individual, Duo, Family

        [Required]
        [MaxLength(50)]
        public string Status { get; set; } = "Active"; // Active, Canceled, PastDue

        public decimal Price { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
