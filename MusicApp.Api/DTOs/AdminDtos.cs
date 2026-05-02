using System;

namespace MusicApp.Api.DTOs
{
    public class UserDto
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }

    public class AdminDashboardMetricsDto
    {
        public int TotalUsers { get; set; }
        public int TotalArtists { get; set; }
        public decimal MonthlyRevenue { get; set; }
        public int ActiveSubscriptions { get; set; }
    }

    public class AdminRevenueDto
    {
        public decimal MonthlyRecurringRevenue { get; set; }
        public decimal GrossRevenueYTD { get; set; }
        public decimal NetProfitMargin { get; set; }
        public PlanDistributionDto PlanDistribution { get; set; } = new();
        public List<TransactionDto> RecentTransactions { get; set; } = new();
    }

    public class PlanDistributionDto
    {
        public decimal IndividualPercentage { get; set; }
        public decimal DuoPercentage { get; set; }
        public decimal FamilyPercentage { get; set; }
    }

    public class TransactionDto
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string EntityName { get; set; } = string.Empty;
    }
}
