using System.Collections.Generic;
using System.Threading.Tasks;
using MusicApp.Api.DTOs;

namespace MusicApp.Api.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<AdminDashboardMetricsDto> GetDashboardMetricsAsync();
        Task<UserDto?> UpdateUserRoleAsync(Guid userId, string newRole);
        Task<bool> DeleteUserAsync(Guid userId);
    }
}
