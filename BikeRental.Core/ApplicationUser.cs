using Microsoft.AspNetCore.Identity;

namespace BikeRental.Core
{
    public class ApplicationUser : IdentityUser<int>
    {
        public string JwoToken { get; set; }
    }
}