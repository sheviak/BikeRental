using System.ComponentModel.DataAnnotations;

namespace BikeRental.ViewModels.Auth
{
    public class LoginViewModel
    {
        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        [MaxLength(255)]
        public string Password { get; set; }
    }
}