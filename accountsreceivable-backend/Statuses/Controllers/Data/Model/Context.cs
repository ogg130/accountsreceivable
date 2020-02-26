using Microsoft.EntityFrameworkCore;

namespace Statuses.Data.Model
{
    public class Context : DbContext
    {
        public Context()
        {
        }

        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public DbSet<StatusHistory> StatusHistory { get; set; }
        public DbSet<StatusLevel> StatusLevel { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<StatusHistory>().ToTable("StatusHistory");
            modelBuilder.Entity<StatusLevel>().ToTable("StatusLevel");
        }
    }
}