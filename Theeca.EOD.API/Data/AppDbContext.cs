using Microsoft.EntityFrameworkCore;
using Theeca.EOD.API.Models;

namespace Theeca.EOD.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<EODReport> EodReports { get; set; }
    }
}