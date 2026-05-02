using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MusicApp.Api.Data;
using MusicApp.Api.DTOs;

namespace MusicApp.Api.Services
{
    public class UserService : IUserService
    {
        private readonly MusicDbContext _context;

        public UserService(MusicDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            return await _context.Users
                .OrderByDescending(u => u.CreatedAt)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Email = u.Email,
                    Username = u.Username,
                    Role = u.Role,
                    CreatedAt = u.CreatedAt
                })
                .ToListAsync();
        }

        public async Task<AdminDashboardMetricsDto> GetDashboardMetricsAsync()
        {
            var totalUsers = await _context.Users.CountAsync();
            var totalArtists = await _context.Users.CountAsync(u => u.Role == "Artist" || u.Role == "Admin"); // Mock logic

            return new AdminDashboardMetricsDto
            {
                TotalUsers = totalUsers,
                TotalArtists = totalArtists,
                MonthlyRevenue = 42100000m, // Mock value, corresponds to 42.1M
                ActiveSubscriptions = 2300000 // Mock value, corresponds to 2.3M
            };
        }
        public async Task<UserDto?> UpdateUserRoleAsync(Guid userId, string newRole)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return null;

            user.Role = newRole;
            await _context.SaveChangesAsync();

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.Username,
                Role = user.Role,
                CreatedAt = user.CreatedAt
            };
        }

        public async Task<bool> DeleteUserAsync(Guid userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return false;

            // Soft delete — consistent with global query filter (IsDeleted)
            user.IsDeleted = true;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
