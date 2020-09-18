using System.Collections.Generic;

namespace BikeRental.ViewModels.ErrorModels
{
    public class ValidationErrorViewModel : ErrorViewModel
    {
        public IDictionary<string, string[]> ValidationErrors { get; set; }
    }
}