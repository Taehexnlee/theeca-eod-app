using Microsoft.EntityFrameworkCore;
using Theeca.EOD.API.Models;

namespace Theeca.EOD.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<EODReport> EODReports { get; set; }
    }
}