using System.Threading.Tasks;
using MusicApp.Api.DTOs;

namespace MusicApp.Api.Services
{
    public interface IRevenueService
    {
        Task<AdminRevenueDto> GetRevenueDashboardAsync();
    }
}
