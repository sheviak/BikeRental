using AutoMapper;
using BikeRental.Exception;
using BikeRental.Infrastructure;
using BikeRental.Mapping;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BikeRental
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            ServiceInitializer.ConfigureServices(services, Configuration);

            var mapper = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            })
            .CreateMapper();

            services.AddSingleton(mapper);
            services.AddCors();
            services.AddControllers(options =>
            {
                options.Filters.Add(typeof(GlobalExceptionFilter));
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
            );

            app.UseHttpsRedirection();
            app.UseStatusCodePages();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}