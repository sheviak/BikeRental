using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

namespace BikeRental.Exception
{
    public class GlobalExceptionFilter : IExceptionFilter
    {
        private readonly ILogger<GlobalExceptionFilter> logger;

        public GlobalExceptionFilter(ILogger<GlobalExceptionFilter> logger)
        {
            this.logger = logger;
        }

        public void OnException(ExceptionContext context)
        {
            var errorCode = 500;
            var mvcController = context.ActionDescriptor.RouteValues["controller"];
            var mvcAction = context.ActionDescriptor.RouteValues["action"];
            var errorMessage = $"{context.Exception.Message} {context.Exception.InnerException?.Message}";

            var text =
                $"Controller: {mvcController}\n" +
                $"Action: {mvcAction}\n" +
                $"Place: {context.ActionDescriptor.DisplayName}\n" +
                $"ExceptionMessage: {errorMessage} ";

            this.logger.LogDebug(text);

            context.Result = new JsonResult(new { errorCode, errorMessage });
        }
    }
}