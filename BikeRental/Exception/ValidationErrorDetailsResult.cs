using BikeRental.ViewModels.ErrorModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;
using System.Threading.Tasks;

namespace BikeRental.Exception
{
    public class ValidationErrorDetailsResult : IActionResult
    {
        public Task ExecuteResultAsync(ActionContext context)
        {
            var errors = context.ModelState
                .Where(x => x.Value.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                );

            var problemDetails = new ValidationErrorViewModel
            {
                Status = 400,
                Title = "Request Validation Error",
                StackTrace = "See ValidationErrors for details",
                ValidationErrors = errors
            };

            context.HttpContext.Response.StatusCode = 400;
            context.HttpContext.Response.WriteAsync(JsonConvert.SerializeObject(problemDetails));
            return Task.CompletedTask;
        }
    }
}