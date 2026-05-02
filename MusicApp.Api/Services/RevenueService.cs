using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MusicApp.Api.Data;
using MusicApp.Api.DTOs;

namespace MusicApp.Api.Services
{
    public class RevenueService : IRevenueService
    {
        private readonly MusicDbContext _context;

        public RevenueService(MusicDbContext context)
        {
            _context = context;
        }

        public async Task<AdminRevenueDto> GetRevenueDashboardAsync()
        {
            // Calculate MRR: sum of active subscription prices
            var mrr = await _context.Subscriptions
                .Where(s => s.Status == "Active")
                .SumAsync(s => s.Price);

            // Calculate Gross YTD: sum of completed subscription payments this year
            var currentYear = DateTime.UtcNow.Year;
            var grossYtd = await _context.Transactions
                .Where(t => t.Type == "SubscriptionPayment" && t.Status == "Completed" && t.CreatedAt.Year == currentYear)
                .SumAsync(t => t.Amount);

            // Calculate Net Profit Margin
            // For simplicity: (Gross - Total Payouts) / Gross * 100
            var totalPayouts = await _context.Transactions
                .Where(t => t.Type == "ArtistPayout" && t.Status == "Cleared" && t.CreatedAt.Year == currentYear)
                .SumAsync(t => Math.Abs(t.Amount));

            decimal netProfitMargin = 0;
            if (grossYtd > 0)
            {
                netProfitMargin = ((grossYtd - totalPayouts) / grossYtd) * 100m;
            }

            // Plan Distributions
            var activeSubs = await _context.Subscriptions
                .Where(s => s.Status == "Active")
                .ToListAsync();

            var totalActive = activeSubs.Count;
            var individualCount = activeSubs.Count(s => s.PlanType == "Individual");
            var duoCount = activeSubs.Count(s => s.PlanType == "Duo");
            var familyCount = activeSubs.Count(s => s.PlanType == "Family");

            var planDistribution = new PlanDistributionDto
            {
                IndividualPercentage = totalActive > 0 ? (individualCount * 100m) / totalActive : 0,
                DuoPercentage = totalActive > 0 ? (duoCount * 100m) / totalActive : 0,
                FamilyPercentage = totalActive > 0 ? (familyCount * 100m) / totalActive : 0
            };

            // Recent Transactions (Limit to 10)
            var recentTransactions = await _context.Transactions
                .Include(t => t.User)
                .Include(t => t.Artist)
                .OrderByDescending(t => t.CreatedAt)
                .Take(10)
                .Select(t => new TransactionDto
                {
                    Id = t.Id,
                    Amount = t.Amount,
                    Type = t.Type,
                    Status = t.Status,
                    Description = t.Description,
                    Date = t.CreatedAt,
                    EntityName = t.Type == "ArtistPayout" ? (t.Artist != null ? t.Artist.Name : "Unknown") : (t.User != null ? (string.IsNullOrEmpty(t.User.Username) ? t.User.Email : t.User.Username) : "Unknown")
                })
                .ToListAsync();

            return new AdminRevenueDto
            {
                MonthlyRecurringRevenue = mrr,
                GrossRevenueYTD = grossYtd,
                NetProfitMargin = netProfitMargin,
                PlanDistribution = planDistribution,
                RecentTransactions = recentTransactions
            };
        }
    }
}
