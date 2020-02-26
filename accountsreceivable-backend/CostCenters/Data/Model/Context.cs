using Microsoft.EntityFrameworkCore;

namespace CostCenters.Data.Model
{
    public class Context : DbContext
    {
        public Context()
        {
        }

        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public DbSet<CostCenter> CostCenter { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CostCenter>().ToTable("CostCenter");
        }
    }
}