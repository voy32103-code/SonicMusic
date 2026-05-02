using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MusicApp.Api.DTOs;
using MusicApp.Api.Services;

namespace MusicApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private static readonly HashSet<string> AllowedRoles = new(StringComparer.OrdinalIgnoreCase)
        {
            "User", "Artist", "Admin"
        };

        private readonly IUserService _userService;
        private readonly IRevenueService _revenueService;

        public AdminController(IUserService userService, IRevenueService revenueService)
        {
            _userService = userService;
            _revenueService = revenueService;
        }

        [HttpGet("metrics")]
        public async Task<ActionResult<AdminDashboardMetricsDto>> GetMetrics()
        {
            var metrics = await _userService.GetDashboardMetricsAsync();
            var revenue = await _revenueService.GetRevenueDashboardAsync();
            metrics.MonthlyRevenue = revenue.MonthlyRecurringRevenue;
            
            return Ok(metrics);
        }

        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
        {
            var users = await _userService.GetAllUsersAsync();
            return Ok(users);
        }

        [HttpGet("revenue")]
        public async Task<ActionResult<AdminRevenueDto>> GetRevenueDashboard()
        {
            var revenue = await _revenueService.GetRevenueDashboardAsync();
            return Ok(revenue);
        }

        [HttpPut("users/{userId}/role")]
        public async Task<IActionResult> UpdateUserRole(Guid userId, [FromBody] UpdateRoleRequest request)
        {
            // Fix #2: Validate role against allowed values
            if (!AllowedRoles.Contains(request.Role))
            {
                return BadRequest(new { message = $"Invalid role '{request.Role}'. Allowed: {string.Join(", ", AllowedRoles)}" });
            }

            var updated = await _userService.UpdateUserRoleAsync(userId, request.Role);
            if (updated == null) return NotFound(new { message = "User not found" });
            return Ok(updated);
        }

        [HttpDelete("users/{userId}")]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {
            // Fix #3: Prevent admin from deleting their own account
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (currentUserId != null && Guid.TryParse(currentUserId, out var selfId) && selfId == userId)
            {
                return BadRequest(new { message = "Cannot delete your own account." });
            }

            var success = await _userService.DeleteUserAsync(userId);
            if (!success) return NotFound(new { message = "User not found" });
            return NoContent();
        }
    }

    public class UpdateRoleRequest
    {
        public string Role { get; set; } = string.Empty;
    }
}
