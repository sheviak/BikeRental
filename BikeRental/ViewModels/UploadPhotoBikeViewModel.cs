using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace BikeRental.ViewModels
{
    public class UploadPhotoBikeViewModel
    {
        [Required]
        public int BikeId { get; set; }

        [Required]
        public IFormFile Avatar { get; set; }
    }
}