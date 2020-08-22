using BikeRental.Core;
using Microsoft.EntityFrameworkCore;

namespace BikeRental.Dal.Context
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Bike> Bikes { get; set; }
        public DbSet<BikeType> BikeTypes { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bike>()
                .HasOne(x => x.BikeType)
                .WithMany(x => x.Bikes)
                .HasForeignKey(x => x.BikeTypeId);

            base.OnModelCreating(modelBuilder);
        }
    }
}