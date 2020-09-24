using BikeRental.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BikeRental.Dal.Context
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, IdentityRole<int>, int>
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

            modelBuilder.Entity<Bike>()
                .Property(x => x.Status)
                .HasDefaultValue(Status.Free);

            modelBuilder.Entity<ApplicationUser>()
                .Property(x => x.Email)
                .HasMaxLength(255);

            modelBuilder.Entity<ApplicationUser>()
                .Property(x => x.NormalizedEmail)
                .HasMaxLength(255);

            base.OnModelCreating(modelBuilder);
        }
    }
}