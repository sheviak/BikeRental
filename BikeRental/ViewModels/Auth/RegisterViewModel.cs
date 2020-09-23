using System.ComponentModel.DataAnnotations;

namespace BikeRental.ViewModels.Auth
{
    public class RegisterViewModel
    {
        [Required]
        [MaxLength(255)]
        public string Email { get; set; }

        [Required]
        [MaxLength(255)]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        [MaxLength(255)]
        public string ConfirmPassword { get; set; }
    }
}