using Microsoft.EntityFrameworkCore;

namespace AccountsReceivable.Data.Model
{
    public class Context : DbContext
    {
        public Context()
        {
        }

        public Context(DbContextOptions<Context> options) : base(options)
        {
        }

        public DbSet<Ar> Ar { get; set; }
        public DbSet<ScheduleAsset> ScheduleAsset { get; set; }
        public DbSet<ScheduleType> ScheduleType { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ar>().ToTable("Ar");
            modelBuilder.Entity<ScheduleAsset>().ToTable("ScheduleAsset");
            modelBuilder.Entity<ScheduleType>().ToTable("ScheduleType");
        }
    }
}
