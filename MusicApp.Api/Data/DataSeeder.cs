using Microsoft.EntityFrameworkCore;
using MusicApp.Api.Entities;

namespace MusicApp.Api.Data
{
    public static class DataSeeder
    {
        public static async Task SeedDataAsync(MusicDbContext context, bool isDevelopment = false)
        {
            // Tự động Apply Migrations nếu chưa có
            await context.Database.MigrateAsync();

            // Seed or update Admin User
            var adminUser = await context.Users.FirstOrDefaultAsync(u => u.Email == "admin@sonicapp.com");
            if (adminUser == null)
            {
                await context.Users.AddAsync(new User
                {
                    Id = Guid.NewGuid(),
                    Email = "admin@sonicapp.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                    Role = "Admin"
                });
                await context.SaveChangesAsync();
            }
            else if (!adminUser.PasswordHash.StartsWith("$2"))
            {
                // If the admin user exists but the password is not hashed (from an earlier run), update it
                adminUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123");
                await context.SaveChangesAsync();
            }

            // --- Cleanup Virtual/Dummy Data (ONLY in Development) ---
            if (isDevelopment)
            {
                // Remove dummy transactions
                var dummyTransactions = await context.Transactions.ToListAsync();
                if (dummyTransactions.Any())
                {
                    context.Transactions.RemoveRange(dummyTransactions);
                }

                // Remove dummy subscriptions
                var dummySubscriptions = await context.Subscriptions.ToListAsync();
                if (dummySubscriptions.Any())
                {
                    context.Subscriptions.RemoveRange(dummySubscriptions);
                }

                // Remove dummy artist
                var dummyArtist = await context.Artists.FirstOrDefaultAsync(a => a.Name == "Universal Sync");
                if (dummyArtist != null)
                {
                    context.Artists.Remove(dummyArtist);
                }

                // Remove dummy regular user
                var dummyUser = await context.Users.FirstOrDefaultAsync(u => u.Email == "listener@sonicapp.com");
                if (dummyUser != null)
                {
                    context.Users.Remove(dummyUser);
                }
            }

            await context.SaveChangesAsync();
        }
    }
}
