using BikeRental.Bl.Interface;
using BikeRental.Bl.Services;
using BikeRental.Core;
using BikeRental.Dal.Context;
using BikeRental.Dal.Interface;
using BikeRental.Dal.Repository;
using BikeRental.Dal.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BikeRental.Infrastructure
{
    public static class ServiceInitializer
    {
        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IRepository<Bike>, Repository<Bike>>();
            
            services.AddScoped<IBikeService, BikeService>();

            var connection = configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));
        }
    }
}