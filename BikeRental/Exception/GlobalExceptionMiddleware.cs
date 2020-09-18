using BikeRental.ViewModels;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace BikeRental.Exception
{
    public class GlobalExceptionMiddleware
    {
        private readonly ILogger<GlobalExceptionMiddleware> logger;

        private readonly IWebHostEnvironment env;
        private readonly RequestDelegate next;

        public GlobalExceptionMiddleware(ILogger<GlobalExceptionMiddleware> logger, IWebHostEnvironment env, RequestDelegate next)
        {
            this.logger = logger;
            this.env = env;
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await this.next(context);
            }
            catch (System.Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        public async Task HandleExceptionAsync(HttpContext context, System.Exception ex)
        {
            var endpoint = context.GetEndpoint();
            if (endpoint != null)
            {
                var controllerActionDescriptor = endpoint.Metadata.GetMetadata<ControllerActionDescriptor>();
                if (controllerActionDescriptor != null)
                {
                    var controllerName = controllerActionDescriptor.ControllerName;
                    var actionName = controllerActionDescriptor.ActionName;
                    var place = controllerActionDescriptor.DisplayName;

                    var text =
                        $"Controller: {controllerName}\n" +
                        $"Action: {actionName}\n" +
                        $"Place: {place}\n" +
                        $"ExceptionMessage: {ex.Message}\n" +
                        $"StackTrace {ex.StackTrace}";

                    this.logger.LogDebug(text);
                }
            }

            var problemDetails = new ErrorViewModel
            {
                Title = "An unexpected error occurred!",
                Status = 500,
                StackTrace = env.IsDevelopment() ? ex.StackTrace : null
            };

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = problemDetails.Status.Value;
            await context.Response.WriteAsync(JsonConvert.SerializeObject(problemDetails));
        }
    }
}