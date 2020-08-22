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
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IRepository<Bike>, Repository<Bike>>();

            services.AddTransient<IBikeService, BikeService>();

            var connection = configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connection));
        }
    }
}