using Microsoft.EntityFrameworkCore;

namespace PurchaseRequisitionsMock.Data.Model
{
    public class Context : DbContext
    {
        public Context()
        {
        }

        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public DbSet<Pr> Pr { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pr>().ToTable("Pr");
        }
    }
}